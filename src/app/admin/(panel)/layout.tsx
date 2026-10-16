import Sidebar from '@/components/admin/Sidebar';
import { requireAdmin } from '@/lib/admin/auth';
import { ADMIN_PAGES } from '@/lib/admin/config';

export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const { count } = await admin.supabase.from('enquiries').select('id', { count: 'exact', head: true }).eq('status', 'new');

  const groups = [
    { title: 'Overview', items: [
      { href: '/admin', label: 'Dashboard' },
      { href: '/admin/enquiries', label: 'Enquiries', count: count ?? 0 },
    ] },
    { title: 'Pages', items: ADMIN_PAGES.map((p) => ({ href: `/admin/p/${p.id}`, label: p.label })) },
    { title: 'Settings', items: [
      { href: '/admin/site', label: 'Logo & footer' },
      { href: '/admin/users', label: 'Admin users' },
    ] },
  ];

  return (
    <div className="adm-shell">
      <Sidebar groups={groups} name={admin.name} email={admin.email} avatar={admin.avatar} role={admin.role} />
      <main className="adm-main">{children}</main>
    </div>
  );
}
