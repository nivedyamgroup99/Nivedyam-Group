'use client';
import { useActionState } from 'react';
import { saveSettings } from '@/app/admin/actions';
import type { SettingField } from '@/lib/admin/config';
import { ImageInput } from './Fields';

export default function SettingsForm({ title, description, fields, values }: {
  title: string; description: string; fields: SettingField[]; values: Record<string, string>;
}) {
  const [state, action, pending] = useActionState(saveSettings, {});
  return (
    <form action={action} className="adm-card adm-pad adm-form" id={title.toLowerCase().replace(/\W+/g, '-')}>
      <input type="hidden" name="__group" value={title} />
      <div>
        <h2>{title}</h2>
        <p className="muted" style={{ marginTop: 4 }}>{description}</p>
      </div>
      {fields.map((f) => {
        const v = values[f.key] ?? '';
        if (f.type === 'image') return <ImageInput key={f.key} name={f.key} label={f.label} value={v} help={f.help} />;
        return (
          <div key={f.key} className="adm-field">
            <label className="l" htmlFor={`s-${f.key}`}>{f.label}</label>
            {f.type === 'textarea'
              ? <textarea id={`s-${f.key}`} name={f.key} defaultValue={v} />
              : <input id={`s-${f.key}`} type="text" name={f.key} defaultValue={v} />}
            {f.help && <p className="help">{f.help}</p>}
          </div>
        );
      })}
      {state.error && <p className="adm-error" role="alert">{state.error}</p>}
      <div className="form-actions">
        <button type="submit" className="adm-btn gold" disabled={pending}>{pending ? 'Saving…' : `Save ${title.toLowerCase()}`}</button>
        {state.ok && !pending && <span className="yes" role="status">Saved. The website has been updated.</span>}
      </div>
    </form>
  );
}
