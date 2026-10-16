import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import { SETTING_GROUPS } from '@/lib/admin/config';
import SettingsForm from '@/components/admin/SettingsForm';
import defaults from '@/content/defaults.json';

export const metadata = { title: 'Texts & contact details' };

export default async function SettingsPage() {
  const admin = await requireAdmin();
  const { data } = await admin.supabase.from('site_settings').select('key, value');
  const values: Record<string, string> = { ...(defaults.site_settings as Record<string, string>) };
  for (const r of data ?? []) values[r.key] = r.value;

  return (
    <>
      <div className="adm-head">
        <div>
          <Link href="/admin" className="crumb">Dashboard</Link>
          <h1>Texts & contact details</h1>
          <p className="muted">Each section saves on its own.</p>
        </div>
      </div>
      <div className="tabs">
        {SETTING_GROUPS.map((g) => <a key={g.title} href={`#${g.title.toLowerCase().replace(/\W+/g, '-')}`}>{g.title}</a>)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 820 }}>
        {SETTING_GROUPS.map((g) => (
          <SettingsForm key={g.title} title={g.title} description={g.description} fields={g.fields} values={values} />
        ))}
      </div>
    </>
  );
}
