'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { assertAdmin, type AdminSession } from '@/lib/admin/auth';
import { getCollection, getSettingGroup, safeBack, type Field } from '@/lib/admin/config';

const MAX_UPLOAD = 4 * 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];

function refreshSite() {
  revalidatePath('/', 'layout');
}

/** Uploads an image from the form (field "<name>__file") and returns its public URL, or null. */
async function uploadImage(admin: AdminSession, form: FormData, name: string, folder: string): Promise<string | null> {
  const file = form.get(`${name}__file`);
  if (!(file instanceof File) || file.size === 0) return null;
  if (file.size > MAX_UPLOAD) throw new Error('Image is larger than 4 MB. Please use a smaller image.');
  if (!IMAGE_TYPES.includes(file.type)) throw new Error('Please upload a JPG, PNG, WebP, GIF or SVG image.');
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await admin.supabase.storage.from('media').upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error('Upload failed: ' + error.message);
  return admin.supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
}

async function readField(admin: AdminSession, form: FormData, f: Field, folder: string) {
  const raw = form.get(f.name);
  switch (f.type) {
    case 'boolean':
      return raw === 'on';
    case 'number':
    case 'phase': {
      const n = parseInt(String(raw ?? ''), 10);
      if (Number.isNaN(n)) return f.min ?? 0;
      return Math.min(f.max ?? n, Math.max(f.min ?? n, n));
    }
    case 'image': {
      if (form.get(`${f.name}__remove`) === 'on') return '';
      const uploaded = await uploadImage(admin, form, f.name, folder);
      return uploaded ?? String(raw ?? '').trim();
    }
    default:
      return String(raw ?? '').trim().slice(0, 5000);
  }
}

export type SaveState = { error?: string };

export async function saveItem(collectionKey: string, id: string | null, back: string, _prev: SaveState, form: FormData): Promise<SaveState> {
  const col = getCollection(collectionKey);
  if (!col) return { error: 'Unknown section.' };
  let admin: AdminSession;
  try { admin = await assertAdmin(); } catch { return { error: 'Your session has ended. Please sign in again.' }; }

  const payload: Record<string, unknown> = {};
  try {
    for (const f of col.fields) {
      const v = await readField(admin, form, f, col.key);
      if (f.required && (v === '' || v === null)) return { error: `“${f.label}” is required.` };
      payload[f.name] = v;
    }
  } catch (e) {
    return { error: (e as Error).message };
  }
  if (col.key === 'brands') payload.slug = String(payload.slug).toLowerCase().replace(/[^a-z0-9-]/g, '-');

  if (id) {
    const { error } = await admin.supabase.from(col.table).update(payload).eq('id', id);
    if (error) return { error: error.message };
  } else {
    if (col.orderable !== false) {
      let q = admin.supabase.from(col.table).select('sort').order('sort', { ascending: false }).limit(1);
      if (col.groupBy) q = q.eq(col.groupBy, payload[col.groupBy] as string);
      const { data } = await q;
      payload.sort = ((data?.[0]?.sort as number) ?? 0) + 1;
    }
    const { error } = await admin.supabase.from(col.table).insert(payload);
    if (error) return { error: error.message };
  }
  refreshSite();
  const dest = safeBack(back);
  redirect(dest + (dest.includes('?') ? '&' : '?') + 'saved=1');
}

export async function deleteItem(collectionKey: string, id: string) {
  const col = getCollection(collectionKey);
  if (!col) return;
  const admin = await assertAdmin();
  await admin.supabase.from(col.table).delete().eq('id', id);
  refreshSite();
  revalidatePath('/admin', 'layout');
}

export async function moveItem(collectionKey: string, id: string, dir: 'up' | 'down') {
  const col = getCollection(collectionKey);
  if (!col || col.orderable === false) return;
  const admin = await assertAdmin();
  const { data: rows } = await admin.supabase.from(col.table).select('*').order('sort', { ascending: true });
  if (!rows) return;
  const me = rows.find((r) => r.id === id);
  if (!me) return;
  const peers = col.groupBy ? rows.filter((r) => r[col.groupBy!] === me[col.groupBy!]) : rows;
  const idx = peers.findIndex((r) => r.id === id);
  const other = peers[dir === 'up' ? idx - 1 : idx + 1];
  if (!other) return;
  // Re-number the group 1..n with the two swapped, so equal sort values can't get stuck.
  const ordered = [...peers];
  ordered[idx] = other;
  ordered[dir === 'up' ? idx - 1 : idx + 1] = me;
  await Promise.all(ordered.map((r, k) => admin.supabase.from(col.table).update({ sort: k + 1 }).eq('id', r.id)));
  refreshSite();
  revalidatePath('/admin', 'layout');
}

export async function saveSettings(_prev: SaveState & { ok?: boolean }, form: FormData): Promise<SaveState & { ok?: boolean }> {
  let admin: AdminSession;
  try { admin = await assertAdmin(); } catch { return { error: 'Your session has ended. Please sign in again.' }; }
  const group = getSettingGroup(String(form.get('__group') ?? ''));
  if (!group) return { error: 'Unknown settings group.' };
  try {
    const rows = [];
    for (const f of group.fields) {
      let value = String(form.get(f.key) ?? '').trim();
      if (f.type === 'image') {
        if (form.get(`${f.key}__remove`) === 'on') value = '';
        const up = await uploadImage(admin, form, f.key, 'settings');
        if (up) value = up;
      }
      rows.push({ key: f.key, value, updated_at: new Date().toISOString() });
    }
    const { error } = await admin.supabase.from('site_settings').upsert(rows);
    if (error) return { error: error.message };
  } catch (e) {
    return { error: (e as Error).message };
  }
  refreshSite();
  return { ok: true };
}

export async function setEnquiryStatus(id: string, status: 'new' | 'read' | 'done') {
  const admin = await assertAdmin();
  await admin.supabase.from('enquiries').update({ status }).eq('id', id);
  revalidatePath('/admin', 'layout');
}

export async function deleteEnquiry(id: string) {
  const admin = await assertAdmin();
  await admin.supabase.from('enquiries').delete().eq('id', id);
  revalidatePath('/admin', 'layout');
}

export async function addAdmin(_prev: SaveState & { ok?: boolean }, form: FormData): Promise<SaveState & { ok?: boolean }> {
  const admin = await assertAdmin();
  if (admin.role !== 'owner') return { error: 'Only owners can add people.' };
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  const role = form.get('role') === 'owner' ? 'owner' : 'editor';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Enter a valid Google email address.' };
  const { error } = await admin.supabase.from('admins').upsert({ email, role });
  if (error) return { error: error.message };
  revalidatePath('/admin/users');
  return { ok: true };
}

export async function removeAdmin(email: string) {
  const admin = await assertAdmin();
  if (admin.role !== 'owner' || email.toLowerCase() === admin.email.toLowerCase()) return;
  await admin.supabase.from('admins').delete().eq('email', email);
  revalidatePath('/admin/users');
}
