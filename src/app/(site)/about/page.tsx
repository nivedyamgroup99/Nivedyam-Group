import type { Metadata } from 'next';
import Link from 'next/link';
import Bottle from '@/components/Bottle';
import Waves from '@/components/Waves';
import { FeatureIcon, Quote, Star, WhatsApp } from '@/components/icons';
import {
  getBrands, getFeatures, getReviews, getSettings, getStats, telLink, waLink,
} from '@/lib/content';

export const revalidate = 300;
export const metadata: Metadata = { title: 'About us', description: 'The reservoir, the land and the people behind Gangothri and Ifthaar drinking water.' };

const valueColors = ['#2346B5', '#0E8A7B', '#F4B942', '#0F1E5A'];

export default async function AboutPage() {
  const [s, stats, source, steps, values, brands, reviews] = await Promise.all([
    getSettings(), getStats('about'), getFeatures('about_source'), getFeatures('about_steps'),
    getFeatures('about_values'), getBrands(), getReviews(),
  ]);

  return (
    <>
      <section className="navy-band page-hero" style={{ paddingBottom: 200 }}>
        <Waves height={300} />
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="crumbs"><Link href="/">Home</Link> / <span className="cur">About us</span></nav>
          <span className="eyebrow gold">About {s.company_name}</span>
          <h1 className="page-title">{s.about_hero_title}</h1>
          <p className="sub">{s.about_hero_body}</p>
        </div>
      </section>

      {s.about_hero_image && (
        <div className="wrap overlap-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.about_hero_image} alt={`${brands.map((b) => b.name).join(' and ')} bottles`} />
        </div>
      )}

      {/* Story */}
      <section style={{ padding: '104px 0 88px' }}>
        <div className="wrap two-col">
          <div className="stack">
            <span className="eyebrow">Our story</span>
            <h2 className="h2">{s.about_story_title}</h2>
            <p className="lead">{s.about_story_p1}</p>
            {s.about_story_p2 && <p className="lead">{s.about_story_p2}</p>}
          </div>
          <figure className="card quote-card">
            <Quote />
            <blockquote>{s.about_quote}</blockquote>
            <figcaption>
              <div className="avatar">{(s.about_quote_name || 'N').replace(/[^A-Za-z]/g, '').charAt(0) || 'N'}</div>
              <div>
                <div style={{ fontWeight: 700 }}>{s.about_quote_name}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>{s.about_quote_role}</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="In numbers" style={{ paddingBottom: 104 }}>
        <div className="wrap">
          <div className="stat-grid">
            {stats.map((x, i) => (
              <div key={x.id ?? i} className="stat-cell"><b>{x.value}</b><span>{x.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* Source */}
      <section style={{ paddingBottom: 104 }}>
        <div className="wrap two-col">
          <div className="card" style={{ padding: 24 }}>
            <ReservoirDiagram />
          </div>
          <div className="stack">
            <span className="eyebrow">The source</span>
            <h2 className="h2">{s.about_source_title}</h2>
            <p className="lead">{s.about_source_body}</p>
            <div className="stack" style={{ gap: 14 }}>
              {source.map((f, i) => (
                <div key={f.id ?? i} className="check-row">
                  <div className="icon-tile"><FeatureIcon name={f.icon} size={18} /></div>
                  <div><b>{f.title}</b>{f.body ? `, ${f.body}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process summary */}
      <section className="section white" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className="wrap">
          <div className="center-head" style={{ marginBottom: 56 }}>
            <span className="eyebrow">Our process</span>
            <h2 className="h2">From monsoon rain to sealed bottle</h2>
            <p className="lead" style={{ maxWidth: '36rem' }}>Not one step involves a human hand touching the water. <Link href="/process">See all 14 stages</Link>.</p>
          </div>
          <div className="steps" style={{ '--cols': Math.min(Math.max(steps.length, 1), 5) } as React.CSSProperties}>
            <div className="step-line" aria-hidden="true" />
            {steps.map((st, i) => (
              <div key={st.id ?? i} className="step">
                <div className="step-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="step-card lift"><h3>{st.title}</h3><p>{st.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="section">
        <div className="wrap">
          <div className="stack" style={{ gap: 12, marginBottom: 40 }}>
            <span className="eyebrow">Our brands</span>
            <h2 className="h2">Two names you can trust</h2>
          </div>
          <div className="brand-grid">
            {brands.map((b, i) => (
              <article key={b.id ?? i} className="brand-card lift" style={{ background: b.label_color }}>
                <Bottle brand={b.name} capColor={b.cap_color} labelColor="rgba(0,0,0,0.25)" height={220} variant="glass" />
                <div>
                  <h3>
                    {b.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="brand-logo" src={b.logo_url} alt={b.name} />
                    ) : b.name}
                  </h3>
                  <p>{b.description}</p>
                  <Link href="/products">See {b.name} sizes</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ paddingBottom: 104 }}>
        <div className="wrap">
          <div className="center-head">
            <span className="eyebrow">What we stand for</span>
            <h2 className="h2">Pure. Safe. Trusted.</h2>
          </div>
          <div className="val-grid">
            {values.map((v, i) => (
              <div key={v.id ?? i} className="val" style={{ borderTopColor: valueColors[i % valueColors.length] }}>
                <FeatureIcon name={v.icon} size={32} color={i === 2 ? '#B07A12' : valueColors[i % valueColors.length]} />
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="section" style={{ background: 'var(--mint)', paddingTop: 96, paddingBottom: 96 }}>
          <div className="wrap">
            <div className="stack" style={{ gap: 12, marginBottom: 40 }}>
              <span className="eyebrow">What customers say</span>
              <h2 className="h2">Trusted in every home</h2>
            </div>
            <div className="rev-grid">
              {reviews.map((r, i) => (
                <figure key={r.id ?? i} className="review lift">
                  <div style={{ display: 'flex', gap: 4 }} role="img" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: r.rating }).map((_, k) => <Star key={k} />)}
                  </div>
                  <blockquote>{r.text}</blockquote>
                  <figcaption>
                    <div className="avatar">{r.name.charAt(0)}</div>
                    <div><div style={{ fontWeight: 700 }}>{r.name}</div><div style={{ fontSize: 13, color: 'var(--muted)' }}>Customer</div></div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Want to become a distributor?</h2>
              <p>Talk to our team on WhatsApp or call us directly.</p>
            </div>
            <div className="btns">
              <a href={waLink(s)} className="btn btn-gold" target="_blank" rel="noopener noreferrer"><WhatsApp color="#0F1E5A" /> WhatsApp us</a>
              <a href={telLink(s)} className="btn btn-ghost">Call {s.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ReservoirDiagram() {
  return (
    <svg viewBox="0 0 560 420" role="img" aria-label="Cross-section of the reservoir: a granite-lined tank ten metres underground with a glass roof and a viewing port" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <rect x="0" y="0" width="560" height="120" rx="18" fill="#E8EDFA" />
      <rect x="0" y="100" width="560" height="320" rx="18" fill="#D9E0F2" />
      <path d="M0 132 h560" stroke="#B8C6EC" strokeWidth="2" strokeDasharray="4 6" />
      <path d="M0 200 h560 M0 270 h560 M0 340 h560" stroke="#C8D1EE" strokeWidth="1.5" />
      <rect x="130" y="112" width="300" height="10" rx="3" fill="#BFD0F7" stroke="#2346B5" strokeWidth="2" />
      <path d="M150 116 l40 0 M220 116 l18 0" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <rect x="120" y="122" width="320" height="260" rx="10" fill="#8C97B8" />
      <rect x="140" y="132" width="280" height="236" rx="6" fill="#F5F7FC" />
      <g className="ripple"><path d="M140 200 q 20 -8 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 v 168 h -320 z" fill="#2346B5" /></g>
      <path d="M170 250 q 16 -6 32 0 M260 290 q 16 -6 32 0 M330 240 q 16 -6 32 0" stroke="#9FB4F0" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="380" cy="80" r="26" fill="#FFFFFF" stroke="#0B7568" strokeWidth="2" />
      <path d="M366 80 s6 -9 14 -9 14 9 14 9 -6 9 -14 9 -14 -9 -14 -9z" fill="none" stroke="#0B7568" strokeWidth="2" />
      <circle cx="380" cy="80" r="4" fill="#0B7568" />
      <text x="416" y="74" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="14" fill="#0F1E5A">Viewing port</text>
      <text x="416" y="92" fontSize="12" fill="#4A5578">tank 01</text>
      <text x="150" y="90" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="14" fill="#0F1E5A">Glass roof</text>
      <path d="M190 98 v 10" stroke="#0F1E5A" strokeWidth="1.5" />
      <path d="M486 122 v 260" stroke="#0F1E5A" strokeWidth="1.5" />
      <path d="M480 128 l6 -6 6 6 M480 376 l6 6 6 -6" stroke="#0F1E5A" strokeWidth="1.5" fill="none" />
      <text x="500" y="258" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="15" fill="#0F1E5A">10 m</text>
      <text x="40" y="250" fontSize="12" fill="#3D4870">Granite</text>
      <text x="40" y="266" fontSize="12" fill="#3D4870">lining</text>
      <path d="M88 256 h 30" stroke="#3D4870" strokeWidth="1.5" />
      <text x="226" y="330" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="15" fill="#FFFFFF">Monsoon water</text>
    </svg>
  );
}
