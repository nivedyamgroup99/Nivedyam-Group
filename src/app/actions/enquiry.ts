'use server';
import { publicClient } from '@/lib/supabase/public';

export type EnquiryState = { ok: boolean; error?: string };

const clip = (v: FormDataEntryValue | null, max: number) => String(v ?? '').trim().slice(0, max);

export async function sendEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never fill this hidden field.
  if (clip(form.get('website'), 200)) return { ok: true };

  const email = clip(form.get('email'), 200);
  const subject = clip(form.get('subject'), 200);
  const message = clip(form.get('message'), 5000);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Please enter a valid email address.' };
  if (!subject) return { ok: false, error: 'Please add a subject.' };
  if (message.length < 5) return { ok: false, error: 'Please tell us a little more in the details box.' };

  const sb = publicClient();
  if (!sb) return { ok: false, error: 'The form is not connected yet. Please call or WhatsApp us.' };

  const { error } = await sb.from('enquiries').insert({
    topic: clip(form.get('topic'), 80) || 'General enquiry',
    name: clip(form.get('name'), 120),
    phone: clip(form.get('phone'), 40),
    email, subject, message, status: 'new',
  });
  if (error) return { ok: false, error: 'Sorry, your message could not be sent. Please call or WhatsApp us.' };
  return { ok: true };
}
