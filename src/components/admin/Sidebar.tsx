'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Item = { href: string; label: string; count?: number };
type Group = { title: string; items: Item[] };

export default function Sidebar({ groups, name, email, avatar, role }: { groups: Group[]; name: string; email: string; avatar: string; role: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const isOn = (href: string) => (href === '/admin' ? path === '/admin' : path.startsWith(href));

  return (
    <>
      <div className="adm-top">
        <b style={{ fontFamily: 'var(--font-display)' }}>Website admin</b>
        <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
      {open && <div className="adm-scrim" onClick={() => setOpen(false)} aria-hidden="true" />}
      <aside className={`adm-side${open ? ' open' : ''}`}>
        <div className="adm-brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F4B942" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2.5C8 8 5.5 11.5 5.5 15a6.5 6.5 0 0 0 13 0c0-3.5-2.5-7-6.5-12.5z" /></svg>
          <div><b>Nivedyam</b><small>Website admin</small></div>
        </div>
        <nav className="adm-nav" aria-label="Admin">
          {groups.map((g) => (
            <div key={g.title} style={{ display: 'contents' }}>
              <div className="grp">{g.title}</div>
              {g.items.map((it) => (
                <Link key={it.href} href={it.href} className={isOn(it.href) ? 'on' : ''} aria-current={isOn(it.href) ? 'page' : undefined}>
                  {it.label}
                  {it.count ? <span className="adm-count">{it.count}</span> : null}
                </Link>
              ))}
            </div>
          ))}
          <div className="grp">Website</div>
          <a href="/" target="_blank" rel="noopener noreferrer">View live site ↗</a>
        </nav>
        <div className="adm-user">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" referrerPolicy="no-referrer" />
          ) : <span className="ph" />}
          <div className="who"><b title={email}>{name}</b><span>{role === 'owner' ? 'Owner' : 'Editor'}</span></div>
          <form action="/auth/signout" method="post"><button type="submit">Sign out</button></form>
        </div>
      </aside>
    </>
  );
}
