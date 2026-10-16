import { requireAdmin } from '@/lib/admin/auth';
import { getSettingGroup } from '@/lib/admin/config';
import SettingsForm from '@/components/admin/SettingsForm';
import defaults from '@/content/defaults.json';

export const metadata = { title: 'Logo & footer' };

export default async function SiteSettingsPage() {
  const admin = await requireAdmin();
  const { data } = await admin.supabase.from('site_settings').select('key, value');
  const values: Record<string, string> = { ...(defaults.site_settings as Record<string, string>) };
  for (const r of data ?? []) values[r.key] = r.value;
  const g = getSettingGroup('brand')!;

  return (
    <>
      <div className="adm-head">
        <div>
          <span className="crumb">Settings</span>
          <h1>Logo & footer</h1>
          <p className="muted">Shown on every page. Phone, WhatsApp and address are under Pages → Contact.</p>
        </div>
      </div>
      <div className="tab-body">
        <SettingsForm groupId={g.id} title={g.title} description={g.description} fields={g.fields} values={values} />
      </div>
    </>
  );
}
