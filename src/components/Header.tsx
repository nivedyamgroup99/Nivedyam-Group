'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Drop, Menu, Close, WhatsApp } from './icons';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

export default function Header({ brandName, logoUrl, whatsappUrl }: { brandName: string; logoUrl: string; whatsappUrl: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const isActive = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));

  return (
    <header className="site-header">
      <nav className="wrap site-nav" aria-label="Main">
        <Link href="/" className="logo" aria-label={`${brandName} home`}>
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={brandName} />
          ) : (
            <>
              <Drop size={30} color="#F4B942" />
              <span>{brandName}</span>
            </>
          )}
        </Link>
        <div className="navlinks">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`nl${isActive(l.href) ? ' active' : ''}`} aria-current={isActive(l.href) ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
          <a href={whatsappUrl} className="btn btn-gold" target="_blank" rel="noopener noreferrer">
            <WhatsApp color="#0F1E5A" /> WhatsApp us
          </a>
        </div>
        <button className="burger" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <Close /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="mobile-menu">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`ml${isActive(l.href) ? ' active' : ''}`}>
              {l.label}
            </Link>
          ))}
          <a href={whatsappUrl} className="btn btn-gold" target="_blank" rel="noopener noreferrer">
            <WhatsApp color="#0F1E5A" /> WhatsApp us
          </a>
        </div>
      )}
    </header>
  );
}
