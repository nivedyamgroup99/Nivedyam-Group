import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { hasSupabase } from '@/lib/supabase/env';

export type AdminSession = {
  supabase: Awaited<ReturnType<typeof createClient>>;
  email: string;
  role: 'owner' | 'editor';
  name: string;
  avatar: string;
};

/** Returns the admin session, or null when not signed in / not on the allow-list. */
export async function getAdmin(): Promise<AdminSession | null> {
  if (!hasSupabase) return null;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return null;
  const { data } = await supabase.from('admins').select('role').ilike('email', user.email).maybeSingle();
  if (!data) return null;
  return {
    supabase,
    email: user.email,
    role: data.role === 'owner' ? 'owner' : 'editor',
    name: (user.user_metadata?.full_name as string) || user.email,
    avatar: (user.user_metadata?.avatar_url as string) || '',
  };
}

/** For pages: sends visitors to the login screen unless they are an allowed admin. */
export async function requireAdmin(): Promise<AdminSession> {
  if (!hasSupabase) redirect('/admin/login?error=setup');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const admin = await getAdmin();
  if (!admin) redirect('/admin/login?error=denied');
  return admin;
}

/** For server actions: throws instead of redirecting. */
export async function assertAdmin(): Promise<AdminSession> {
  const admin = await getAdmin();
  if (!admin) throw new Error('Not authorised');
  return admin;
}
