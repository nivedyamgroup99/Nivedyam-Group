import Sidebar from '@/components/admin/Sidebar';
import { requireAdmin } from '@/lib/admin/auth';

export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const { count } = await admin.supabase.from('enquiries').select('id', { count: 'exact', head: true }).eq('status', 'new');

  const groups = [
    { title: 'Overview', items: [
      { href: '/admin', label: 'Dashboard' },
      { href: '/admin/enquiries', label: 'Enquiries', count: count ?? 0 },
    ] },
    { title: 'Home page', items: [
      { href: '/admin/c/slides', label: 'Slider' },
      { href: '/admin/c/minerals', label: 'Mineral standards' },
      { href: '/admin/c/stats', label: 'Numbers & stats' },
      { href: '/admin/c/features', label: 'Feature cards' },
    ] },
    { title: 'Products', items: [
      { href: '/admin/c/products', label: 'Products' },
      { href: '/admin/c/brands', label: 'Brands' },
    ] },
    { title: 'Pages', items: [
      { href: '/admin/c/process_steps', label: 'Process stages' },
      { href: '/admin/c/process_phases', label: 'Process phases' },
      { href: '/admin/c/faqs', label: 'FAQs' },
      { href: '/admin/c/reviews', label: 'Reviews' },
      { href: '/admin/settings', label: 'Texts & contact details' },
    ] },
    { title: 'Team', items: [{ href: '/admin/users', label: 'Admin users' }] },
  ];

  return (
    <div className="adm-shell">
      <Sidebar groups={groups} name={admin.name} email={admin.email} avatar={admin.avatar} role={admin.role} />
      <main className="adm-main">{children}</main>
    </div>
  );
}
