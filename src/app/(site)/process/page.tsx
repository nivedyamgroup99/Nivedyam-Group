import type { Metadata } from 'next';
import Link from 'next/link';
import Waves from '@/components/Waves';
import ProcessExplorer from '@/components/ProcessExplorer';
import MineralCard from '@/components/MineralCard';
import { FeatureIcon, Flask, WhatsApp } from '@/components/icons';
import { getMinerals, getPhases, getSettings, getStats, getSteps, waLink } from '@/lib/content';

export const revalidate = 300;
export const metadata: Metadata = { title: 'Our process', description: 'From monsoon rain to sealed bottle: the 14 automated stages behind every bottle of Gangothri.' };

const scale = [
  { label: 'Human hair', note: '~70 µm', w: 100, c: 'rgba(255,255,255,0.35)' },
  { label: 'Pre-micron filter', note: '10 µm', w: 64, c: '#9FB4F0' },
  { label: 'Pre-micron filter', note: '5 µm', w: 51, c: '#5C7FE0' },
  { label: 'Post-micron filter', note: '0.5 µm', w: 9, c: '#F4B942' },
];

export default async function ProcessPage() {
  const [s, stats, phases, steps, minerals] = await Promise.all([
    getSettings(), getStats('process'), getPhases(), getSteps(), getMinerals(),
  ]);
  const numbered = steps.map((st, i) => ({ ...st, n: i + 1 }));

  return (
    <>
      <section className="navy-band page-hero">
        <Waves />
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="crumbs"><Link href="/">Home</Link> / <span className="cur">Our process</span></nav>
          <span className="eyebrow gold">Our process</span>
          <h1 className="page-title">{s.process_hero_title}</h1>
          <p className="sub">{s.process_hero_body}</p>
          <div className="hero-stats">
            {stats.map((x, i) => (
              <div key={x.id ?? i} className="hero-stat"><b>{x.value}</b><span>{x.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <ProcessExplorer phases={phases} steps={steps} />

      <div>
        {phases.map((p, k) => {
          const list = numbered.filter((st) => st.phase_sort === p.sort);
          if (list.length === 0) return null;
          return (
            <section key={p.id ?? k} className="phase">
              <div className="wrap phase-head">
                <div className="phase-intro">
                  <span className="badge" style={{ background: p.color, color: p.ink }}>Phase {String(k + 1).padStart(2, '0')}</span>
                  <h2 style={{ fontSize: 36, lineHeight: 1.12, letterSpacing: '-.02em' }}>{p.name}</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--body)' }}>{p.intro}</p>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--muted)' }}>
                    Stages {String(list[0].n).padStart(2, '0')} – {String(list[list.length - 1].n).padStart(2, '0')}
                  </span>
                </div>
                <div className="step-grid">
                  {list.map((st) => (
                    <article key={st.id ?? st.n} className="stage-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                        <span className="num" style={{ background: p.tint }}>{String(st.n).padStart(2, '0')}</span>
                        {st.spec && <span className="tagx">{st.spec}</span>}
                      </div>
                      <h3>{st.title}</h3>
                      <p>{st.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Micron scale */}
      <section className="navy-band" style={{ padding: '96px 0' }}>
        <div className="wrap qa-grid" style={{ alignItems: 'center' }}>
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow gold">Finer at every step</span>
            <h2 style={{ fontSize: 40, lineHeight: 1.12, letterSpacing: '-.02em' }}>Each filter catches what the last one let through.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--on-navy)' }}>Cartridge filters step down from 10 microns to 0.5 microns before the water reaches ultraviolet light and ozone. A human hair is roughly 70 microns wide.</p>
          </div>
          <div className="scale-box">
            {scale.map((m, i) => (
              <div key={i} className="stack" style={{ gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <b>{m.label}</b><span style={{ color: 'var(--on-navy)' }}>{m.note}</span>
                </div>
                <div className="bar-track"><div className="bar" style={{ width: `${m.w}%`, background: m.c }} /></div>
              </div>
            ))}
            <p style={{ fontSize: 12, color: 'var(--on-navy)' }}>Bar length shows pore size on a log scale.</p>
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="section">
        <div className="wrap">
          <div className="center-head">
            <span className="eyebrow">Quality assurance</span>
            <h2 className="h2">Tested twice before it leaves</h2>
          </div>
          <div className="qa-grid">
            <div className="card stack" style={{ padding: 36 }}>
              <div className="check-row">
                <div className="icon-tile" style={{ width: 56, height: 56, borderRadius: 16 }}><Flask color="#0B7568" /></div>
                <div><h3 style={{ fontSize: 20, marginBottom: 6 }}>In-house QC lab</h3><p className="lead" style={{ fontSize: 15 }}>Our own laboratory tests the water at the plant before any batch is released.</p></div>
              </div>
              <div className="check-row">
                <div className="icon-tile" style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--blue-tint)' }}><FeatureIcon name="shield" size={28} color="#2346B5" /></div>
                <div><h3 style={{ fontSize: 20, marginBottom: 6 }}>BIS-approved external lab</h3><p className="lead" style={{ fontSize: 15 }}>Samples are also verified by an independent laboratory approved by the Bureau of Indian Standards.</p></div>
              </div>
            </div>
            <MineralCard title="Mineral standards we meet" minerals={minerals} />
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 88 }}>
        <div className="wrap">
          <div className="cta-band" style={{ background: 'var(--teal)' }}>
            <div>
              <h2>Questions about our process?</h2>
              <p style={{ color: 'var(--mint)' }}>Our team is happy to explain how every bottle is made.</p>
            </div>
            <div className="btns">
              <a href={waLink(s)} className="btn btn-gold" target="_blank" rel="noopener noreferrer"><WhatsApp color="#0F1E5A" /> WhatsApp us</a>
              <Link href="/about" className="btn btn-ghost" style={{ borderColor: 'rgba(255,255,255,.5)' }}>Our story</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
