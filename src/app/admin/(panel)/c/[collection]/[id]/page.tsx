import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { getCollection, ICON_OPTIONS } from '@/lib/admin/config';
import ItemForm from '@/components/admin/ItemForm';

export const metadata = { title: 'Edit' };

export default async function EditItemPage({ params }: { params: Promise<{ collection: string; id: string }> }) {
  const { collection, id } = await params;
  const col = getCollection(collection);
  if (!col) notFound();
  const admin = await requireAdmin();
  const isNew = id === 'new';

  let values: Record<string, unknown> = {};
  if (!isNew) {
    const { data } = await admin.supabase.from(col.table).select('*').eq('id', id).maybeSingle();
    if (!data) notFound();
    values = data;
  }

  const [{ data: brands }, { data: phases }] = await Promise.all([
    admin.supabase.from('brands').select('slug, name').order('sort'),
    admin.supabase.from('process_phases').select('sort, name').order('sort'),
  ]);

  return (
    <>
      <div className="adm-head">
        <div>
          <Link href={`/admin/c/${col.key}`} className="crumb">← {col.label}</Link>
          <h1>{isNew ? `Add ${col.singular}` : `Edit ${col.singular}`}</h1>
        </div>
      </div>
      <div style={{ maxWidth: 760 }}>
        <ItemForm
          collection={col.key}
          id={isNew ? null : id}
          fields={col.fields}
          values={values}
          brands={(brands ?? []).map((b) => ({ value: b.slug, label: b.name }))}
          phases={(phases ?? []).map((p) => ({ value: String(p.sort), label: `${p.sort}. ${p.name}` }))}
          icons={ICON_OPTIONS}
        />
      </div>
    </>
  );
}
