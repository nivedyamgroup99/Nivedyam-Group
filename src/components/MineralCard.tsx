import type { Mineral } from '@/lib/content';

export default function MineralCard({ title, note, minerals, id }: { title: string; note?: string; minerals: Mineral[]; id?: string }) {
  return (
    <div className="card mineral-card" id={id}>
      <div className="mineral-head">
        <h3 style={{ fontSize: 20 }}>{title}</h3>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Permitted range</span>
      </div>
      <div className="mineral-grid">
        {minerals.map((m, i) => (
          <div key={m.id ?? i} className={`mineral${m.highlight ? ' dark wide' : ''}${!m.highlight && minerals.length % 2 === 0 && i === minerals.length - 1 && minerals.filter((x) => x.highlight).length % 2 === 1 ? ' wide' : ''}`}>
            <small>{m.label}</small>
            <b>{m.range} {m.unit ? <em>{m.unit}</em> : null}</b>
            {m.note ? <div className="note">{m.note}</div> : null}
          </div>
        ))}
      </div>
      {note ? <p style={{ marginTop: 20, fontSize: 13, color: 'var(--muted)' }}>{note}</p> : null}
    </div>
  );
}
