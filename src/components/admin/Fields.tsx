'use client';
import { useState } from 'react';
import { FeatureIcon } from '@/components/icons';
import type { Field } from '@/lib/admin/config';

type Opt = { value: string; label: string };

export function ImageInput({ name, label, value, help }: { name: string; label: string; value: string; help?: string }) {
  const [preview, setPreview] = useState(value);
  const [remove, setRemove] = useState(false);
  const shown = remove ? '' : preview;
  return (
    <div className="adm-field">
      <span className="l" style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 7 }}>{label}</span>
      <div className="img-field">
        <div className="img-prev">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {shown ? <img src={shown} alt="" /> : 'No image'}
        </div>
        <div className="img-ctrls">
          <input type="hidden" name={name} value={value} />
          <label className="adm-btn ghost sm" style={{ alignSelf: 'flex-start' }}>
            {value ? 'Replace image' : 'Upload image'}
            <input
              type="file" name={`${name}__file`} accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif" hidden
              onChange={(e) => { const f = e.target.files?.[0]; if (f) { setPreview(URL.createObjectURL(f)); setRemove(false); } }}
            />
          </label>
          {value && (
            <label className="adm-check" style={{ fontWeight: 500, fontSize: 14 }}>
              <input type="checkbox" name={`${name}__remove`} checked={remove} onChange={(e) => setRemove(e.target.checked)} /> Remove image
            </label>
          )}
          <span className="help" style={{ fontSize: 13, color: 'var(--muted)' }}>{help ?? 'JPG, PNG or WebP, up to 4 MB.'}</span>
        </div>
      </div>
    </div>
  );
}

function ColorInput({ name, value }: { name: string; value: string }) {
  const [v, setV] = useState(value || '#2346B5');
  return (
    <div className="color-row">
      <input type="color" value={/^#[0-9a-f]{6}$/i.test(v) ? v : '#2346B5'} onChange={(e) => setV(e.target.value.toUpperCase())} aria-label="Pick colour" />
      <input type="text" name={name} value={v} onChange={(e) => setV(e.target.value)} style={{ maxWidth: 140 }} />
    </div>
  );
}

export function FieldInput({ f, value, brands, phases, icons }: { f: Field; value: unknown; brands: Opt[]; phases: Opt[]; icons: Opt[] }) {
  const id = `f-${f.name}`;
  const str = value === null || value === undefined ? '' : String(value);

  if (f.type === 'image') return <ImageInput name={f.name} label={f.label} value={str} help={f.help} />;
  if (f.type === 'boolean') {
    return (
      <div className="adm-field">
        <label className="adm-check"><input type="checkbox" name={f.name} defaultChecked={value === true || value === undefined && f.name === 'published'} /> {f.label}</label>
        {f.help && <p className="help">{f.help}</p>}
      </div>
    );
  }

  let control: React.ReactNode;
  switch (f.type) {
    case 'textarea':
      control = <textarea id={id} name={f.name} defaultValue={str} required={f.required} placeholder={f.placeholder} />;
      break;
    case 'number':
      control = <input id={id} type="number" name={f.name} defaultValue={str} required={f.required} min={f.min} max={f.max} />;
      break;
    case 'color':
      control = <ColorInput name={f.name} value={str} />;
      break;
    case 'select':
    case 'brand':
    case 'phase': {
      const opts = f.type === 'brand' ? brands : f.type === 'phase' ? phases : f.options ?? [];
      control = (
        <select id={id} name={f.name} defaultValue={str} required={f.required}>
          {!f.required && <option value="">None</option>}
          {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
      break;
    }
    case 'icon':
      control = (
        <div className="icon-pick" role="radiogroup" aria-label={f.label}>
          {icons.map((o) => (
            <span key={o.value} style={{ position: 'relative' }}>
              <input type="radio" id={`${id}-${o.value}`} name={f.name} value={o.value} defaultChecked={(str || 'drop') === o.value} />
              <label htmlFor={`${id}-${o.value}`} title={o.label}><FeatureIcon name={o.value} size={24} /></label>
            </span>
          ))}
        </div>
      );
      break;
    default:
      control = <input id={id} type="text" name={f.name} defaultValue={str} required={f.required} placeholder={f.placeholder} />;
  }

  return (
    <div className="adm-field">
      <label className="l" htmlFor={id}>{f.label}{f.required ? ' *' : ''}</label>
      {control}
      {f.help && <p className="help">{f.help}</p>}
    </div>
  );
}
