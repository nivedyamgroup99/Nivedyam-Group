import Link from 'next/link';
import type { AdminSession } from '@/lib/admin/auth';
import { getCollection } from '@/lib/admin/config';
import { deleteItem, moveItem } from '@/app/admin/actions';
import ConfirmButton from './ConfirmButton';

type Row = Record<string, unknown> & { id: string };

/** A list of one collection, optionally limited to one page's rows (scope). */
export default async function CollectionTable({
  admin, collectionKey, scope, title, note, back,
}: {
  admin: AdminSession; collectionKey: string; scope?: string; title?: string; note?: string; back: string;
}) {
  const col = getCollection(collectionKey);
  if (!col) return null;

  let q = admin.supabase.from(col.table).select('*').order('sort');
  if (scope && col.groupBy) q = q.eq(col.groupBy, scope);
  const [{ data, error }, { data: brands }, { data: phases }] = await Promise.all([
    q,
    admin.supabase.from('brands').select('slug, name'),
    admin.supabase.from('process_phases').select('sort, name'),
  ]);
  const rows = (data ?? []) as Row[];

  const columns = col.columns.filter((c) => !(scope && c === col.groupBy));
  const fieldOf = (name: string) => col.fields.find((f) => f.name === name);
  const display = (name: string, v: unknown) => {
    const f = fieldOf(name);
    if (typeof v === 'boolean') return <span className={v ? 'yes' : 'no'}>{v ? 'Yes' : 'No'}</span>;
    if (f?.type === 'brand') return brands?.find((b) => b.slug === v)?.name ?? (v ? String(v) : '—');
    if (f?.type === 'phase') return phases?.find((p) => p.sort === v)?.name ?? String(v ?? '');
    if (f?.type === 'select') return f.options?.find((o) => o.value === v)?.label ?? String(v ?? '');
    if (f?.type === 'color') return <><span className="swatch" style={{ background: String(v) }} />{String(v)}</>;
    const s = String(v ?? '');
    return s.length > 80 ? s.slice(0, 80) + '…' : s || '—';
  };

  const qs = new URLSearchParams({ back });
  if (scope) qs.set('scope', scope);
  const editHref = (id: string) => `/admin/c/${col.key}/${id}?${qs.toString()}`;

  return (
    <section className="adm-card" style={{ overflow: 'hidden' }}>
      <div className="block-head">
        <div>
          <h2>{title ?? col.label}</h2>
          <p className="muted" style={{ marginTop: 4, fontSize: 14 }}>{note ?? col.description}</p>
        </div>
        <Link href={editHref('new')} className="adm-btn gold sm">+ Add {col.singular}</Link>
      </div>
      {error && <p className="adm-error" style={{ margin: '0 24px 16px' }}>Could not load: {error.message}</p>}
      <div className="table-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              {columns.map((c) => <th key={c}>{fieldOf(c)?.label ?? (c === 'sort' ? 'Number' : c)}</th>)}
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="muted">Nothing here yet. Use “Add {col.singular}”.</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.id}>
                {columns.map((c, k) => (
                  <td key={c}>{k === 0 ? <Link className="title" href={editHref(r.id)}>{display(c, r[c])}</Link> : display(c, r[c])}</td>
                ))}
                <td>
                  <div className="actions">
                    {col.orderable !== false && (
                      <>
                        <form action={moveItem.bind(null, col.key, r.id, 'up')}><button className="adm-btn ghost sm icon-only" aria-label="Move up" title="Move up">↑</button></form>
                        <form action={moveItem.bind(null, col.key, r.id, 'down')}><button className="adm-btn ghost sm icon-only" aria-label="Move down" title="Move down">↓</button></form>
                      </>
                    )}
                    <Link href={editHref(r.id)} className="adm-btn ghost sm">Edit</Link>
                    <form action={deleteItem.bind(null, col.key, r.id)}>
                      <ConfirmButton message={`Delete this ${col.singular}? This cannot be undone.`}>Delete</ConfirmButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
