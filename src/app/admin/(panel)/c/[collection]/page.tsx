import { redirect } from 'next/navigation';
import { ADMIN_PAGES } from '@/lib/admin/config';

// Old address: each list now lives in a tab of its page.
export default async function OldCollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  for (const p of ADMIN_PAGES) {
    const t = p.tabs.find((tab) => tab.blocks.some((b) => b.kind === 'collection' && b.key === collection));
    if (t) redirect(`/admin/p/${p.id}?tab=${t.id}`);
  }
  redirect('/admin');
}
