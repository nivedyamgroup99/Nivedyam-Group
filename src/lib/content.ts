import { cache } from 'react';
import defaults from '@/content/defaults.json';
import { publicClient } from './supabase/public';

export type Settings = Record<string, string>;
export type Slide = {
  id?: string; sort: number; published?: boolean; eyebrow: string; title: string; body: string;
  cta_label: string; cta_link: string; image_url: string; bottle_brand: string; bottle_label: string;
  stat_value: string; stat_label: string;
};
export type Brand = { id?: string; sort: number; slug: string; name: string; description: string; label_color: string; cap_color: string; logo_url?: string };
export type Product = {
  id?: string; sort: number; published?: boolean; featured: boolean; brand_slug: string; name: string; size: string;
  pack: string; tag: string; is_bulk: boolean; image_url?: string; bottle_height: number;
};
export type Stat = { id?: string; sort: number; page: string; value: string; label: string };
export type Feature = { id?: string; sort: number; page: string; icon: string; title: string; body: string };
export type Mineral = { id?: string; sort: number; label: string; range: string; unit: string; note: string; highlight: boolean };
export type Phase = { id?: string; sort: number; name: string; intro: string; color: string; ink: string; tint: string };
export type Step = { id?: string; sort: number; phase_sort: number; title: string; short: string; body: string; spec: string };
export type Faq = { id?: string; sort: number; question: string; answer: string };
export type Review = { id?: string; sort: number; name: string; text: string; rating: number };

const D = defaults as unknown as {
  site_settings: Settings; slides: Slide[]; brands: Brand[]; products: Product[]; stats: Stat[];
  features: Feature[]; minerals: Mineral[]; process_phases: Phase[]; process_steps: Step[];
  faqs: Faq[]; reviews: Review[];
};

async function rows<T>(table: string, fallback: T[], filter?: (q: any) => any): Promise<T[]> {
  const sb = publicClient();
  if (!sb) return fallback;
  try {
    let query = sb.from(table).select('*').order('sort', { ascending: true });
    if (filter) query = filter(query);
    const { data, error } = await query;
    if (error || !data) return fallback;
    return data as T[];
  } catch {
    return fallback;
  }
}

export const getSettings = cache(async (): Promise<Settings> => {
  const sb = publicClient();
  const merged: Settings = { ...D.site_settings };
  if (!sb) return merged;
  try {
    const { data } = await sb.from('site_settings').select('key, value');
    for (const r of data ?? []) merged[r.key] = r.value;
  } catch {}
  return merged;
});

export const getSlides = cache(() =>
  rows<Slide>('slides', D.slides, (q) => q.eq('published', true)));
export const getBrands = cache(() => rows<Brand>('brands', D.brands));
export const getProducts = cache(() =>
  rows<Product>('products', D.products, (q) => q.eq('published', true)));
export const getStats = cache(async (page: string) =>
  (await rows<Stat>('stats', D.stats)).filter((s) => s.page === page));
export const getFeatures = cache(async (page: string) =>
  (await rows<Feature>('features', D.features)).filter((f) => f.page === page));
export const getMinerals = cache(() => rows<Mineral>('minerals', D.minerals));
export const getPhases = cache(() => rows<Phase>('process_phases', D.process_phases));
export const getSteps = cache(() => rows<Step>('process_steps', D.process_steps));
export const getFaqs = cache(() => rows<Faq>('faqs', D.faqs));
export const getReviews = cache(() => rows<Review>('reviews', D.reviews));

/** "8129 555 222" → "918129555222" for wa.me / tel links (assumes India +91 when 10 digits). */
export function intlDigits(phone: string) {
  const d = (phone || '').replace(/\D/g, '');
  return d.length === 10 ? '91' + d : d;
}
export const waLink = (s: Settings) => `https://wa.me/${intlDigits(s.whatsapp)}`;
export const telLink = (s: Settings) => `tel:+${intlDigits(s.phone)}`;
