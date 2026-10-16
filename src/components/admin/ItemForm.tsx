'use client';
import Link from 'next/link';
import { useActionState } from 'react';
import { saveItem, type SaveState } from '@/app/admin/actions';
import type { Field } from '@/lib/admin/config';
import { FieldInput } from './Fields';

type Opt = { value: string; label: string };

export default function ItemForm({
  collection, id, back, fields, values, fixed, brands, phases, icons,
}: {
  collection: string; id: string | null; back: string; fields: Field[]; values: Record<string, unknown>;
  fixed?: { name: string; value: string }; brands: Opt[]; phases: Opt[]; icons: Opt[];
}) {
  const [state, action, pending] = useActionState<SaveState, FormData>(saveItem.bind(null, collection, id, back), {});
  return (
    <form action={action} className="adm-card adm-pad adm-form">
      {fixed && <input type="hidden" name={fixed.name} value={fixed.value} />}
      {fields.filter((f) => f.name !== fixed?.name).map((f) => (
        <FieldInput key={f.name} f={f} value={values[f.name]} brands={brands} phases={phases} icons={icons} />
      ))}
      {state.error && <p className="adm-error" role="alert">{state.error}</p>}
      <div className="form-actions">
        <button type="submit" className="adm-btn gold" disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>
        <Link href={back} className="adm-btn ghost">Cancel</Link>
      </div>
    </form>
  );
}
