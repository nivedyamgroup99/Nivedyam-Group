import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { getCollection } from '@/lib/admin/config';
import { deleteItem, moveItem } from '@/app/admin/actions';
import ConfirmButton from '@/components/admin/ConfirmButton';

type Row = Record<string, unknown> & { id: string };

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  return { title: getCollection(collection)?.label ?? 'Content' };
}

export default async function CollectionPage({ params, searchParams }: {
  params: Promise<{ collection: string }>; searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const { collection } = await params;
  const sp = await searchParams;
  const col = getCollection(collection);
  if (!col) notFound();
  const admin = await requireAdmin();

  const { data, error } = await admin.supabase.from(col.table).select('*').order(col.groupBy ?? 'sort').order('sort');
  const rows = (data ?? []) as Row[];

  // Labels for brand/phase/select columns.
  const [{ data: brands }, { data: phases }] = await Promise.all([
    admin.supabase.from('brands').select('slug, name'),
    admin.supabase.from('process_phases').select('sort, name'),
  ]);
  const fieldOf = (name: string) => col.fields.find((f) => f.name === name);
  const display = (name: string, v: unknown) => {
    const f = fieldOf(name);
    if (typeof v === 'boolean') return <span className={v ? 'yes' : 'no'}>{v ? 'Yes' : 'No'}</span>;
    if (f?.type === 'brand') return brands?.find((b) => b.slug === v)?.name ?? (v ? String(v) : '—');
    if (f?.type === 'phase' || name === 'phase_sort') return phases?.find((p) => p.sort === v)?.name ?? String(v ?? '');
    if (f?.type === 'select') return f.options?.find((o) => o.value === v)?.label ?? String(v ?? '');
    if (f?.type === 'color') return <><span className="swatch" style={{ background: String(v) }} />{String(v)}</>;
    const s = String(v ?? '');
    return s.length > 80 ? s.slice(0, 80) + '…' : s || '—';
  };

  let lastGroup: unknown = Symbol('none');

  return (
    <>
      <div className="adm-head">
        <div>
          <Link href="/admin" className="crumb">Dashboard</Link>
          <h1>{col.label}</h1>
          <p className="muted">{col.description}</p>
        </div>
        <Link href={`/admin/c/${col.key}/new`} className="adm-btn gold">+ Add {col.singular}</Link>
      </div>
      {sp.saved && <p className="adm-ok" style={{ marginBottom: 16 }}>Saved. The website has been updated.</p>}
      {sp.deleted && <p className="adm-ok" style={{ marginBottom: 16 }}>Deleted.</p>}
      {error && <p className="adm-error">Could not load: {error.message}</p>}

      <div className="adm-card table-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              {col.columns.map((c) => <th key={c}>{fieldOf(c)?.label ?? (c === 'sort' ? 'Number' : c)}</th>)}
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={col.columns.length + 1} className="muted">Nothing here yet. Use “Add {col.singular}”.</td></tr>
            )}
            {rows.map((r) => {
              const groupVal = col.groupBy ? r[col.groupBy] : null;
              const showGroup = col.groupBy && groupVal !== lastGroup;
              lastGroup = groupVal;
              return [
                showGroup ? (
                  <tr key={`g-${String(groupVal)}`} className="group-row"><td colSpan={col.columns.length + 1}>{display(col.groupBy!, groupVal)}</td></tr>
                ) : null,
                <tr key={r.id}>
                  {col.columns.map((c, k) => (
                    <td key={c}>{k === 0 ? <Link className="title" href={`/admin/c/${col.key}/${r.id}`}>{display(c, r[c])}</Link> : display(c, r[c])}</td>
                  ))}
                  <td>
                    <div className="actions">
                      {col.orderable !== false && (
                        <>
                          <form action={moveItem.bind(null, col.key, r.id, 'up')}><button className="adm-btn ghost sm icon-only" aria-label="Move up" title="Move up">↑</button></form>
                          <form action={moveItem.bind(null, col.key, r.id, 'down')}><button className="adm-btn ghost sm icon-only" aria-label="Move down" title="Move down">↓</button></form>
                        </>
                      )}
                      <Link href={`/admin/c/${col.key}/${r.id}`} className="adm-btn ghost sm">Edit</Link>
                      <form action={deleteItem.bind(null, col.key, r.id)}>
                        <ConfirmButton message={`Delete this ${col.singular}? This cannot be undone.`}>Delete</ConfirmButton>
                      </form>
                    </div>
                  </td>
                </tr>,
              ];
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
