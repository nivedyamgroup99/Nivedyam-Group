import Link from 'next/link';
import { redirect } from 'next/navigation';
import GoogleButton from './GoogleButton';
import { getAdmin } from '@/lib/admin/auth';
import { createClient } from '@/lib/supabase/server';
import { hasSupabase } from '@/lib/supabase/env';

export const metadata = { title: 'Sign in' };

const MESSAGES: Record<string, string> = {
  denied: 'This Google account is not allowed to manage the website. Ask an owner to add your email, or sign in with a different account.',
  failed: 'Sign-in did not complete. Please try again.',
  setup: 'The website is not connected to Supabase yet. Add the environment variables described in the README.',
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  let signedInAs = '';
  if (hasSupabase) {
    if (await getAdmin()) redirect('/admin');
    const { data } = await (await createClient()).auth.getUser();
    signedInAs = data.user?.email ?? '';
  }
  const message = !hasSupabase ? MESSAGES.setup : error ? MESSAGES[error] : '';

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo" aria-hidden="true">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#F4B942" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5C8 8 5.5 11.5 5.5 15a6.5 6.5 0 0 0 13 0c0-3.5-2.5-7-6.5-12.5z" /><path d="M9 15.5a3 3 0 0 0 3 3" /></svg>
        </div>
        <h1>Website admin</h1>
        <p className="muted">Sign in with your Google account to update the Nivedyam website.</p>
        {message && <p className="adm-error" role="alert">{message}</p>}
        {signedInAs && error === 'denied' && (
          <form action="/auth/signout" method="post" style={{ margin: '4px 0 12px' }}>
            <p className="muted" style={{ fontSize: 14 }}>Signed in as <b>{signedInAs}</b>.</p>
            <button className="adm-btn ghost" type="submit">Sign out</button>
          </form>
        )}
        {hasSupabase && <GoogleButton />}
        <Link href="/" className="back-link">← Back to the website</Link>
      </div>
    </div>
  );
}
