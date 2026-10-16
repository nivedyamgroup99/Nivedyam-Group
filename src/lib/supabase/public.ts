import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, hasSupabase } from './env';

/** Anonymous, cookie-free client for reading public content (lets pages be cached). */
export function publicClient() {
  if (!hasSupabase) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
