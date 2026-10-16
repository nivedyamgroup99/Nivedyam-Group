'use client';
import { useState } from 'react';
import type { Brand, Product } from '@/lib/content';
import Bottle from './Bottle';

export default function ProductGrid({ products, brands, limit }: { products: Product[]; brands: Brand[]; limit?: number }) {
  const hasBulk = products.some((p) => p.is_bulk);
  const filters = ['All', ...brands.map((b) => b.name), ...(hasBulk ? ['Bulk'] : [])];
  const [f, setF] = useState('All');

  const matches = (p: Product) => {
    if (f === 'All') return true;
    if (f === 'Bulk') return p.is_bulk;
    const b = brands.find((x) => x.name === f);
    return !!b && p.brand_slug === b.slug && !p.is_bulk;
  };
  let shown = products.filter(matches);
  if (limit && f === 'All') shown = shown.filter((p) => p.featured).slice(0, limit);
  else if (limit) shown = shown.slice(0, limit);

  return (
    <>
      <div className="pills" role="group" aria-label="Filter products" style={{ marginBottom: 32 }}>
        {filters.map((l) => (
          <button key={l} type="button" className={`pill${l === f ? ' on' : ''}`} aria-pressed={l === f} onClick={() => setF(l)}>
            {l}
          </button>
        ))}
      </div>
      <div className="prod-grid">
        {shown.map((p, i) => {
          const b = brands.find((x) => x.slug === p.brand_slug);
          return (
            <article key={p.id ?? i} className="prod-card">
              <div className="prod-art">
                {p.tag && <span className="prod-tag">{p.tag}</span>}
                {p.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url} alt={p.name} />
                ) : (
                  <Bottle brand={b?.name ?? p.name} label={p.size} capColor={b?.cap_color ?? '#2346B5'} labelColor={b?.label_color ?? '#1E3FA8'} height={p.bottle_height} alt={`${p.name} bottle`} />
                )}
              </div>
              <div>
                <h3>{p.name}</h3>
                {p.pack && <p>{p.pack}</p>}
              </div>
            </article>
          );
        })}
        {shown.length === 0 && <p style={{ color: 'var(--muted)' }}>No products in this category yet.</p>}
      </div>
    </>
  );
}
