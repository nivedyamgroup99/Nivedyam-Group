import Link from 'next/link';
import { Lock } from './icons';
import { type Settings, telLink, waLink } from '@/lib/content';

export default function Footer({ s }: { s: Settings }) {
  return (
    <footer className="site-footer" id="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col" style={{ gap: 16 }}>
            <span className="foot-brand">{s.brand_name}</span>
            <p style={{ fontSize: 15, lineHeight: 1.7 }}>{s.footer_blurb}</p>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <Link href="/about">About us</Link>
            <Link href="/process">Our process</Link>
            <Link href="/products">Products</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="foot-col">
            <h4>Contact</h4>
            <a href={telLink(s)}>Call: {s.phone}</a>
            <a href={waLink(s)} target="_blank" rel="noopener noreferrer">WhatsApp: {s.whatsapp}</a>
            <a href={`mailto:${s.email}`}>{s.email}</a>
          </div>
          <div className="foot-col">
            <h4>Visit us</h4>
            <span style={{ lineHeight: 1.6 }}>{s.address}</span>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {s.company_name}. All rights reserved.</span>
          <Link href="/admin" className="login"><Lock /> Team login</Link>
        </div>
      </div>
    </footer>
  );
}
