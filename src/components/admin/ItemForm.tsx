'use client';
import Link from 'next/link';
import { useActionState } from 'react';
import { saveItem, type SaveState } from '@/app/admin/actions';
import type { Field } from '@/lib/admin/config';
import { FieldInput } from './Fields';

type Opt = { value: string; label: string };

export default function ItemForm({
  collection, id, fields, values, brands, phases, icons,
}: {
  collection: string; id: string | null; fields: Field[]; values: Record<string, unknown>;
  brands: Opt[]; phases: Opt[]; icons: Opt[];
}) {
  const [state, action, pending] = useActionState<SaveState, FormData>(saveItem.bind(null, collection, id), {});
  return (
    <form action={action} className="adm-card adm-pad adm-form">
      {fields.map((f) => (
        <FieldInput key={f.name} f={f} value={values[f.name]} brands={brands} phases={phases} icons={icons} />
      ))}
      {state.error && <p className="adm-error" role="alert">{state.error}</p>}
      <div className="form-actions">
        <button type="submit" className="adm-btn gold" disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>
        <Link href={`/admin/c/${collection}`} className="adm-btn ghost">Cancel</Link>
      </div>
    </form>
  );
}
