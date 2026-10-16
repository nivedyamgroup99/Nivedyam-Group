import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import ProductGrid from '@/components/ProductGrid';
import MineralCard from '@/components/MineralCard';
import { ArrowRight, FeatureIcon, WhatsApp } from '@/components/icons';
import {
  getBrands, getFeatures, getMinerals, getProducts, getSettings, getSlides, getStats, waLink,
} from '@/lib/content';

export const revalidate = 300;

export default async function HomePage() {
  const [s, slides, brands, products, stats, features, minerals] = await Promise.all([
    getSettings(), getSlides(), getBrands(), getProducts(), getStats('home'), getFeatures('home_features'), getMinerals(),
  ]);

  return (
    <>
      <HeroSlider slides={slides} brands={brands} />

      {/* Details */}
      <section className="section" id="about" style={{ paddingBottom: 96 }}>
        <div className="wrap">
          <div className="detail-grid">
            <MineralCard id="quality" title={s.minerals_title} note={s.minerals_note} minerals={minerals} />
            <div className="stack">
              <span className="eyebrow">{s.home_details_eyebrow}</span>
              <h2 className="h2">{s.home_details_title}</h2>
              <p className="lead">{s.home_details_body}</p>
              <div className="inline-stats">
                {stats.map((x, i) => (
                  <div key={x.id ?? i}><b>{x.value}</b><span>{x.label}</span></div>
                ))}
              </div>
            </div>
          </div>
          <div className="feat-grid">
            {features.map((f, i) => (
              <div key={f.id ?? i} className="feat">
                <div className="icon-tile"><FeatureIcon name={f.icon} /></div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section white" id="products" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className="wrap">
          <div className="stack" style={{ gap: 12, marginBottom: 24 }}>
            <span className="eyebrow">{s.products_eyebrow}</span>
            <h2 className="h2">{s.products_title}</h2>
          </div>
          <ProductGrid products={products} brands={brands} limit={4} />
          <div className="center-cta">
            <Link href="/products" className="btn btn-gold" style={{ fontSize: 16, padding: '16px 32px' }}>
              View all products <ArrowRight color="#0F1E5A" />
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery band */}
      <section style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>{s.delivery_title}</h2>
              <p>{s.delivery_body}</p>
            </div>
            <div className="btns">
              <Link href="/contact" className="btn btn-gold" style={{ padding: '16px 28px' }}>Enquire now</Link>
              <a href={waLink(s)} className="btn btn-ghost" target="_blank" rel="noopener noreferrer" style={{ padding: '16px 28px' }}>
                <WhatsApp /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
