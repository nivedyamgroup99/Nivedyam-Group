'use client';
import { useState } from 'react';
import type { Phase, Step } from '@/lib/content';
import { ChevronLeft, ChevronRight, Drop } from './icons';

export default function ProcessExplorer({ phases, steps }: { phases: Phase[]; steps: Step[] }) {
  const [sel, setSel] = useState(0);
  const n = steps.length;
  if (n === 0) return null;
  const cur = steps[sel];
  const phaseOf = (st: Step) => phases.find((p) => p.sort === st.phase_sort) ?? phases[0];
  const cp = phaseOf(cur);
  const go = (k: number) => setSel((k + n) % n);

  return (
    <section aria-label={`Explore all ${n} stages`} style={{ padding: '96px 0 88px' }}>
      <div className="wrap">
        <div className="section-head">
          <div className="stack" style={{ gap: 12 }}>
            <span className="eyebrow">Explore the journey</span>
            <h2 className="h2">Tap any stage to see what happens</h2>
          </div>
          <div className="pills" aria-label="Phases">
            {phases.map((p) => {
              const first = steps.findIndex((s) => s.phase_sort === p.sort);
              return (
                <button key={p.id ?? p.sort} type="button" className={`pill${cp?.sort === p.sort ? ' on' : ''}`} onClick={() => first >= 0 && go(first)}>
                  <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="explorer">
          <div className="card" style={{ padding: 32 }}>
            <div className="nodes" role="group" aria-label="Process stages">
              {steps.map((st, i) => {
                const p = phaseOf(st);
                const on = i === sel;
                const style = on
                  ? { background: p.color, color: p.ink, borderColor: p.color, boxShadow: `0 0 0 4px #fff, 0 0 0 6px ${p.color}` }
                  : { background: p.tint };
                return (
                  <button key={st.id ?? i} type="button" className={`node${!on && p.sort !== cp.sort ? ' dim' : ''}`} style={style}
                    aria-pressed={on} aria-label={`Stage ${i + 1}: ${st.title}`} onClick={() => go(i)}>
                    <b>{String(i + 1).padStart(2, '0')}</b>
                    <span>{st.short || st.title}</span>
                  </button>
                );
              })}
            </div>
            <svg viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true" style={{ display: 'block', width: '100%', height: 40, marginTop: 18 }}>
              <path d="M10 20 H590" stroke="#C8D1EE" strokeWidth="6" strokeLinecap="round" />
              <path className="flow" d="M10 20 H590" stroke="#2346B5" strokeWidth="3" strokeDasharray="12 12" strokeLinecap="round" />
              <path d="M580 12 l12 8 -12 8" fill="none" stroke="#2346B5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
              <span>Raw water in</span><span>Sealed bottle out</span>
            </div>
          </div>

          <div className="detail-panel pop" key={sel} aria-live="polite">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <span className="chip" style={{ background: cp.color, color: cp.ink, border: cp.color === '#0F1E5A' ? '1px solid rgba(255,255,255,0.4)' : 'none' }}>{cp.name}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--on-navy)' }}>Stage {String(sel + 1).padStart(2, '0')} of {n}</span>
            </div>
            <h3>{cur.title}</h3>
            <p>{cur.body}</p>
            {cur.spec && <div className="spec"><Drop size={18} color="#F4B942" /> {cur.spec}</div>}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button type="button" className="icon-btn" aria-label="Previous stage" onClick={() => go(sel - 1)} style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff' }}>
                <ChevronLeft />
              </button>
              <button type="button" className="btn btn-gold" onClick={() => go(sel + 1)}>
                Next stage <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
