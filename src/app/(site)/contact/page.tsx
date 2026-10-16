import type { Metadata } from 'next';
import Link from 'next/link';
import Waves from '@/components/Waves';
import ContactForm from '@/components/ContactForm';
import FaqList from '@/components/FaqList';
import { ArrowUpRight, Clock, Mail, Phone, Pin, WhatsApp } from '@/components/icons';
import { getFaqs, getSettings, telLink, waLink } from '@/lib/content';

export const revalidate = 300;
export const metadata: Metadata = { title: 'Contact', description: 'Call, WhatsApp, email or visit Nivedyam Group of Industries in Payyannur, Kannur.' };

export default async function ContactPage() {
  const [s, faqs] = await Promise.all([getSettings(), getFaqs()]);
  const wa = waLink(s);

  return (
    <>
      <section className="navy-band page-hero" style={{ paddingBottom: 180 }}>
        <Waves />
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="crumbs"><Link href="/">Home</Link> / <span className="cur">Contact</span></nav>
          <span className="eyebrow gold">Get in touch</span>
          <h1 className="page-title">{s.contact_hero_title}</h1>
          <p className="sub">{s.contact_hero_body}</p>
        </div>
      </section>

      <div className="wrap" style={{ position: 'relative', marginTop: -120 }}>
        <div className="quick">
          <a href={telLink(s)} className="qcard">
            <div className="icon-tile" style={{ background: 'var(--blue-tint)', borderRadius: 16 }}><Phone color="#2346B5" /></div>
            <small>Call us</small><b>{s.phone}</b><span className="go" style={{ color: 'var(--royal)' }}>Tap to call</span>
          </a>
          <a href={wa} className="qcard teal" target="_blank" rel="noopener noreferrer">
            <span style={{ position: 'absolute', top: 20, right: 20, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', background: 'var(--gold)', color: 'var(--navy)', borderRadius: 999, padding: '5px 10px' }}>Fastest</span>
            <div className="icon-tile" style={{ background: 'rgba(255,255,255,0.16)', borderRadius: 16 }}><WhatsApp size={26} color="#FFFFFF" /></div>
            <small>WhatsApp</small><b>{s.whatsapp}</b><span className="go">Start a chat</span>
          </a>
          <a href={`mailto:${s.email}`} className="qcard">
            <div className="icon-tile" style={{ background: 'var(--gold-tint)', borderRadius: 16 }}><Mail color="#B07A12" /></div>
            <small>Email</small><b style={{ fontSize: 16 }}>{s.email}</b><span className="go" style={{ color: 'var(--gold-ink)' }}>Write to us</span>
          </a>
          <a href={s.maps_url} className="qcard" target="_blank" rel="noopener noreferrer">
            <div className="icon-tile" style={{ borderRadius: 16 }}><Pin color="#0B7568" /></div>
            <small>Visit the plant</small><b style={{ fontSize: 18 }}>Payyannur, Kannur</b><span className="go" style={{ color: 'var(--teal)' }}>Get directions</span>
          </a>
        </div>
      </div>

      <section style={{ padding: '88px 0 96px' }}>
        <div className="wrap main-grid">
          <div className="card form-card" id="enquiry">
            <ContactForm whatsappUrl={wa} phone={s.phone} />
          </div>
          <div className="stack" style={{ gap: 20 }}>
            <div className="card" style={{ overflow: 'hidden' }}>
              <MapArt />
              <div className="stack" style={{ padding: '24px 28px', gap: 14 }}>
                <h3 style={{ fontSize: 20 }}>{s.company_name}</h3>
                <p className="lead" style={{ fontSize: 15 }}>{s.address}</p>
                <a href={s.maps_url} target="_blank" rel="noopener noreferrer" className="btn" style={{ alignSelf: 'flex-start', background: 'var(--mint)', color: 'var(--teal)', padding: '0 18px', minHeight: 44 }}>
                  Open in Google Maps <ArrowUpRight />
                </a>
              </div>
            </div>
            <div className="cta-band" style={{ padding: '26px 28px', borderRadius: 24, flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 18 }}>
              <div className="icon-tile" style={{ background: 'rgba(244,185,66,0.16)', width: 48, height: 48 }}><Clock color="#F4B942" /></div>
              <div><h3 style={{ fontSize: 18 }}>Working hours</h3><p style={{ fontSize: 15, marginTop: 6 }}>{s.hours}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="distributor" style={{ paddingBottom: 96 }}>
        <div className="wrap">
          <div className="cta-band" style={{ background: 'var(--royal-label)' }}>
            <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 64, color: 'var(--gold)', lineHeight: 1 }}>{s.distributor_count}</div>
              <div>
                <h2 style={{ fontSize: 30 }}>{s.distributor_title}</h2>
                <p style={{ color: 'var(--blue-tint)', marginTop: 8 }}>{s.distributor_body}</p>
              </div>
            </div>
            <a href="/contact?topic=distributor#enquiry" className="btn btn-gold" style={{ minHeight: 54, fontSize: 16 }}>Apply to distribute</a>
          </div>
        </div>
      </section>

      <section className="section white" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <div className="wrap faq-grid">
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">FAQ</span>
            <h2 style={{ fontSize: 40, lineHeight: 1.1, letterSpacing: '-.02em' }}>Common questions</h2>
            <p className="lead" style={{ fontSize: 16 }}>Can&apos;t find your answer? Call {s.phone} or message us on WhatsApp.</p>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>
    </>
  );
}

function MapArt() {
  return (
    <svg viewBox="0 0 480 260" role="img" aria-label="Map illustration of the plant location" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <rect width="480" height="260" fill="#E8EDFA" />
      <path d="M0 190 C 90 170, 150 220, 240 200 S 400 160, 480 180 L480 260 L0 260 Z" fill="#C8D6F5" />
      <path d="M-10 90 L 200 120 L 300 60 L 490 80" stroke="#FFFFFF" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M150 -10 L 210 120 L 190 270" stroke="#FFFFFF" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M300 60 L 340 270" stroke="#FFFFFF" strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="40" y="20" width="70" height="44" rx="8" fill="#D6EFE9" />
      <rect x="360" y="110" width="90" height="50" rx="8" fill="#D6EFE9" />
      <rect x="230" y="140" width="60" height="36" rx="8" fill="#DDE3F5" />
      <circle className="pulse" cx="262" cy="104" r="16" fill="#F4B942" />
      <path d="M262 118 c-10 -12 -18 -20 -18 -30 a18 18 0 0 1 36 0 c0 10 -8 18 -18 30z" fill="#0F1E5A" />
      <circle cx="262" cy="88" r="7" fill="#F4B942" />
      <rect x="282" y="66" width="150" height="34" rx="10" fill="#FFFFFF" />
      <text x="294" y="88" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="13" fill="#0F1E5A">Nivedyam plant</text>
    </svg>
  );
}
