'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Brand, Slide } from '@/lib/content';
import Bottle from './Bottle';
import { ChevronLeft, ChevronRight } from './icons';

export default function HeroSlider({ slides, brands }: { slides: Slide[]; brands: Brand[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  useEffect(() => {
    if (n < 2 || paused) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n, paused]);

  if (n === 0) return null;
  const s = slides[i];
  const go = (k: number) => setI((k + n) % n);
  const brand = brands.find((b) => b.slug === s.bottle_brand);

  return (
    <section
      className="navy-band hero"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <svg className="waves" aria-hidden="true" viewBox="0 0 1440 640" preserveAspectRatio="none" style={{ top: 0, height: '100%', opacity: 0.5 }}>
        <path d="M0 520 C 240 470, 480 590, 720 540 S 1200 470, 1440 520 L1440 640 L0 640 Z" fill="#1C3392" />
        <path d="M0 580 C 300 540, 560 630, 860 590 S 1260 550, 1440 590 L1440 640 L0 640 Z" fill="#0B7568" />
      </svg>
      <div className="wrap">
        <div className="hero-grid slide-in" key={i} aria-live="polite">
          <div className="stack" style={{ gap: 24 }}>
            {s.eyebrow && <span className="eyebrow gold">{s.eyebrow}</span>}
            <h1 className="hero-title">{s.title}</h1>
            {s.body && <p className="hero-text">{s.body}</p>}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
              {s.cta_label && <Link href={s.cta_link || '/products'} className="btn btn-gold">{s.cta_label}</Link>}
              <Link href="/about" className="btn btn-ghost">Discover our source</Link>
            </div>
          </div>
          <div className="hero-art">
            <div className="ring" style={{ width: 340, height: 340, border: '1px solid rgba(244,185,66,0.35)' }} />
            <div className="ring" style={{ width: 440, height: 440, border: '1px solid rgba(244,185,66,0.15)' }} />
            {s.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="hero-photo" src={s.image_url} alt={s.title} style={{ maxWidth: 620 }} />
            ) : brand ? (
              <Bottle className="bottle-float" brand={brand.name} label={s.bottle_label} capColor={brand.cap_color} labelColor={brand.label_color} height={400} variant="glass" />
            ) : null}
            {s.stat_value && (
              <div className="stat-badge">
                <small>{s.stat_label}</small>
                <b>{s.stat_value}</b>
              </div>
            )}
          </div>
        </div>

        {n > 1 && (
          <div className="slider-controls">
            <div className="dots">
              {slides.map((_, k) => (
                <button key={k} type="button" className={`dot${k === i ? ' on' : ''}`} aria-label={`Go to slide ${k + 1}`} aria-current={k === i} onClick={() => go(k)} />
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--on-navy)' }}>
                {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </span>
              <button type="button" className="icon-btn" aria-label="Previous slide" onClick={() => go(i - 1)} style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff' }}>
                <ChevronLeft />
              </button>
              <button type="button" className="icon-btn" aria-label="Next slide" onClick={() => go(i + 1)} style={{ border: 'none', background: 'var(--gold)', color: 'var(--navy)' }}>
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
