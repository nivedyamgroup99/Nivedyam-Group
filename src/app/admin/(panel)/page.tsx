import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import { COLLECTIONS } from '@/lib/admin/config';

export const metadata = { title: 'Dashboard' };

export default async function Dashboard() {
  const admin = await requireAdmin();
  const sb = admin.supabase;
  const [{ count: newCount }, { count: totalCount }, { data: latest }] = await Promise.all([
    sb.from('enquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    sb.from('enquiries').select('id', { count: 'exact', head: true }),
    sb.from('enquiries').select('id, created_at, name, email, subject, topic, status').order('created_at', { ascending: false }).limit(5),
  ]);

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Hello, {admin.name.split(' ')[0]}</h1>
          <p className="muted">Update any part of the website here. Changes appear on the live site within a few seconds.</p>
        </div>
        <a className="adm-btn gold" href="/" target="_blank" rel="noopener noreferrer">View live site ↗</a>
      </div>

      <div className="adm-grid" style={{ marginBottom: 28 }}>
        <Link href="/admin/enquiries?status=new" className="adm-card tile">
          <span>New enquiries</span><span className="num">{newCount ?? 0}</span><span>{totalCount ?? 0} in total</span>
        </Link>
        <Link href="/admin/settings" className="adm-card tile">
          <b>Texts & contact details</b><span>Phone, WhatsApp, address, logo and page headings.</span>
        </Link>
      </div>

      <div className="adm-card" style={{ marginBottom: 28 }}>
        <div className="adm-pad" style={{ paddingBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h2>Latest enquiries</h2>
          <Link href="/admin/enquiries" className="adm-btn ghost sm">See all</Link>
        </div>
        {latest && latest.length > 0 ? (
          <div className="table-scroll">
            <table className="adm-table">
              <thead><tr><th>From</th><th>Subject</th><th>Received</th><th>Status</th></tr></thead>
              <tbody>
                {latest.map((e) => (
                  <tr key={e.id}>
                    <td><b>{e.name || e.email}</b><div className="muted" style={{ fontSize: 13 }}>{e.email}</div></td>
                    <td>{e.subject}<div className="muted" style={{ fontSize: 13 }}>{e.topic}</div></td>
                    <td>{new Date(e.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })}</td>
                    <td><span className={`status ${e.status}`}>{e.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="muted adm-pad" style={{ paddingTop: 8 }}>No enquiries yet. Messages from the contact form will appear here.</p>}
      </div>

      <h2 style={{ marginBottom: 14 }}>Website content</h2>
      <div className="adm-grid">
        {COLLECTIONS.map((c) => (
          <Link key={c.key} href={`/admin/c/${c.key}`} className="adm-card tile">
            <b>{c.label}</b><span>{c.description}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
