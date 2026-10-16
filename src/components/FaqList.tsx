'use client';
import { useState } from 'react';
import type { Faq } from '@/lib/content';
import { Plus } from './icons';

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="stack" style={{ gap: 12 }}>
      {faqs.map((f, i) => {
        const on = i === open;
        return (
          <div key={f.id ?? i} className={`faq${on ? ' open' : ''}`}>
            <button type="button" aria-expanded={on} aria-controls={`faq-${i}`} onClick={() => setOpen(on ? -1 : i)}>
              <span>{f.question}</span>
              <span className="plus" aria-hidden="true"><Plus /></span>
            </button>
            {on && <p id={`faq-${i}`} className="pop">{f.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
