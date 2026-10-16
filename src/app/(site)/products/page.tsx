import type { Metadata } from 'next';
import Link from 'next/link';
import Bottle from '@/components/Bottle';
import ProductGrid from '@/components/ProductGrid';
import Waves from '@/components/Waves';
import { WhatsApp } from '@/components/icons';
import { getBrands, getProducts, getSettings, waLink } from '@/lib/content';

export const revalidate = 300;
export const metadata: Metadata = { title: 'Products', description: 'Gangothri and Ifthaar drinking water in every size, from single-serve bottles to 20-litre jars.' };

export default async function ProductsPage() {
  const [s, brands, products] = await Promise.all([getSettings(), getBrands(), getProducts()]);
  return (
    <>
      <section className="navy-band page-hero">
        <Waves />
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="crumbs"><Link href="/">Home</Link> / <span className="cur">Products</span></nav>
          <span className="eyebrow gold">{s.products_eyebrow}</span>
          <h1 className="page-title">{s.products_title}</h1>
          <p className="sub">Every size of {brands.map((b) => b.name).join(' and ')}, from single servings to jars for home and office.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ProductGrid products={products} brands={brands} />
        </div>
      </section>

      <section className="section white" style={{ paddingTop: 88 }}>
        <div className="wrap">
          <div className="center-head">
            <span className="eyebrow">Our brands</span>
            <h2 className="h2">Two names you can trust</h2>
          </div>
          <div className="brand-grid">
            {brands.map((b, i) => (
              <article key={b.id ?? i} className="brand-card lift" style={{ background: b.label_color }}>
                <Bottle brand={b.name} capColor={b.cap_color} labelColor="rgba(0,0,0,0.25)" height={220} variant="glass" />
                <div>
                  <h3>{b.name}</h3>
                  <p>{b.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Need a bulk or regular supply?</h2>
              <p>Tell us the sizes and quantities you need and our team will get back to you.</p>
            </div>
            <div className="btns">
              <Link href="/contact" className="btn btn-gold">Send an enquiry</Link>
              <a href={waLink(s)} className="btn btn-ghost" target="_blank" rel="noopener noreferrer"><WhatsApp /> WhatsApp us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
