import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { getAdminPage, getSettingGroup } from '@/lib/admin/config';
import CollectionTable from '@/components/admin/CollectionTable';
import SettingsForm from '@/components/admin/SettingsForm';
import defaults from '@/content/defaults.json';

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  return { title: `${getAdminPage(page)?.label ?? 'Page'} page` };
}

export default async function AdminPageEditor({ params, searchParams }: {
  params: Promise<{ page: string }>; searchParams: Promise<{ tab?: string; saved?: string }>;
}) {
  const { page: pageId } = await params;
  const sp = await searchParams;
  const page = getAdminPage(pageId);
  if (!page) notFound();
  const admin = await requireAdmin();
  const tab = page.tabs.find((t) => t.id === sp.tab) ?? page.tabs[0];
  const back = `/admin/p/${page.id}?tab=${tab.id}`;

  const needsSettings = tab.blocks.some((b) => b.kind === 'settings');
  const values: Record<string, string> = { ...(defaults.site_settings as Record<string, string>) };
  if (needsSettings) {
    const { data } = await admin.supabase.from('site_settings').select('key, value');
    for (const r of data ?? []) values[r.key] = r.value;
  }

  return (
    <>
      <div className="adm-head">
        <div>
          <span className="crumb">Pages</span>
          <h1>{page.label} page</h1>
          <p className="muted">{page.description}</p>
        </div>
        <a className="adm-btn ghost" href={page.path} target="_blank" rel="noopener noreferrer">View page ↗</a>
      </div>

      <nav className="page-tabs" aria-label={`${page.label} page sections`}>
        {page.tabs.map((t) => (
          <Link key={t.id} href={`/admin/p/${page.id}?tab=${t.id}`} className={t.id === tab.id ? 'on' : ''} aria-current={t.id === tab.id ? 'page' : undefined}>
            {t.label}
          </Link>
        ))}
      </nav>

      {sp.saved && <p className="adm-ok" style={{ marginBottom: 16 }}>Saved. The website has been updated.</p>}

      <div className="tab-body">
        {tab.blocks.map((b, i) => {
          if (b.kind === 'settings') {
            const g = getSettingGroup(b.group);
            if (!g) return null;
            return <SettingsForm key={`s-${g.id}`} groupId={g.id} title={g.title} description={g.description} fields={g.fields} values={values} />;
          }
          return <CollectionTable key={`c-${b.key}-${i}`} admin={admin} collectionKey={b.key} scope={b.scope} title={b.title} note={b.note} back={back} />;
        })}
      </div>
    </>
  );
}
