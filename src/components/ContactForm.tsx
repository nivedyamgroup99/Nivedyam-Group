'use client';
import { useActionState, useEffect, useState } from 'react';
import { sendEnquiry, type EnquiryState } from '@/app/actions/enquiry';
import { ArrowRight, Check } from './icons';

const TOPICS = [
  { label: 'General enquiry', subject: 'General enquiry', ph: 'How can we help?' },
  { label: 'Bulk / event order', subject: 'Bulk order enquiry', ph: 'Which sizes, how many cases, and the delivery date and place.' },
  { label: 'Distributorship', subject: 'Distributorship enquiry', ph: 'Your area, current business and the storage or transport you have.' },
  { label: 'Plant visit', subject: 'Plant visit request', ph: 'Your group or institution, number of visitors and preferred date.' },
];

export default function ContactForm({ whatsappUrl, phone }: { whatsappUrl: string; phone: string }) {
  const [topic, setTopic] = useState(0);
  const [subject, setSubject] = useState(TOPICS[0].subject);
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { ok: false });
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => { if (state.ok) setShowThanks(true); }, [state]);
  useEffect(() => {
    // "Apply to distribute" links here with ?topic=distributor: preselect that topic.
    const t = new URLSearchParams(location.search).get('topic');
    const k = t === 'distributor' ? 2 : t === 'bulk' ? 1 : t === 'visit' ? 3 : -1;
    if (k >= 0) { setTopic(k); setSubject(TOPICS[k].subject); }
  }, []);

  const choose = (k: number) => { setTopic(k); setSubject(TOPICS[k].subject); };

  if (showThanks) {
    return (
      <div className="pop" role="status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18, padding: '48px 12px' }}>
        <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check size={40} color="#0B7568" />
        </div>
        <h2 style={{ fontSize: 30 }}>Thank you, message sent</h2>
        <p className="lead" style={{ fontSize: 16, maxWidth: '26rem' }}>Our team will get back to you soon. For anything urgent, call {phone}.</p>
        <button type="button" className="btn" style={{ border: '1.5px solid var(--line)', background: '#fff', color: 'var(--navy)' }} onClick={() => setShowThanks(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="stack">
      <div className="stack" style={{ gap: 8 }}>
        <h2 style={{ fontSize: 32, letterSpacing: '-.01em' }}>Send us a message</h2>
        <p style={{ fontSize: 15, color: 'var(--muted)' }}>Fields marked * are required.</p>
      </div>
      <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
        <legend className="lbl">What is this about?</legend>
        <div className="pills" style={{ gap: 10 }}>
          {TOPICS.map((t, k) => (
            <button key={t.label} type="button" className={`pill${k === topic ? ' on' : ''}`} aria-pressed={k === topic} onClick={() => choose(k)}>{t.label}</button>
          ))}
        </div>
      </fieldset>
      <input type="hidden" name="topic" value={TOPICS[topic].label} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1 }} />
      <div className="field-row">
        <div><label className="lbl" htmlFor="c-name">Name</label><input className="inp" id="c-name" name="name" autoComplete="name" placeholder="Your name" /></div>
        <div><label className="lbl" htmlFor="c-phone">Phone</label><input className="inp" id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91" /></div>
      </div>
      <div className="field-row">
        <div><label className="lbl" htmlFor="c-email">Email *</label><input className="inp" id="c-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></div>
        <div><label className="lbl" htmlFor="c-subject">Subject *</label><input className="inp" id="c-subject" name="subject" required value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
      </div>
      <div>
        <label className="lbl" htmlFor="c-msg">Details *</label>
        <textarea className="inp" id="c-msg" name="message" rows={5} required placeholder={TOPICS[topic].ph} />
      </div>
      {state.error && <div className="form-error" role="alert">{state.error}</div>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <button type="submit" className="btn btn-navy" disabled={pending} style={{ minHeight: 54, padding: '0 32px', fontSize: 16 }}>
          {pending ? 'Sending…' : <>Send message <ArrowRight /></>}
        </button>
        <span style={{ fontSize: 14, color: 'var(--muted)' }}>Prefer chat? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700 }}>WhatsApp us</a></span>
      </div>
    </form>
  );
}
