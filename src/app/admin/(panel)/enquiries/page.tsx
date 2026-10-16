import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import { deleteEnquiry, setEnquiryStatus } from '@/app/admin/actions';
import ConfirmButton from '@/components/admin/ConfirmButton';

export const metadata = { title: 'Enquiries' };

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'read', label: 'Read' },
  { key: 'done', label: 'Done' },
];

export default async function EnquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status = 'all' } = await searchParams;
  const admin = await requireAdmin();
  let q = admin.supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(200);
  if (status !== 'all') q = q.eq('status', status);
  const { data: rows } = await q;

  return (
    <>
      <div className="adm-head">
        <div>
          <Link href="/admin" className="crumb">Dashboard</Link>
          <h1>Enquiries</h1>
          <p className="muted">Messages sent from the contact form.</p>
        </div>
      </div>
      <nav className="tabs" aria-label="Filter enquiries">
        {FILTERS.map((f) => (
          <Link key={f.key} href={`/admin/enquiries?status=${f.key}`} className={status === f.key ? 'on' : ''}>{f.label}</Link>
        ))}
      </nav>
      <div className="adm-card">
        {(rows ?? []).length === 0 && <p className="muted adm-pad">No enquiries here.</p>}
        {(rows ?? []).map((e) => (
          <article key={e.id} className="enq">
            <div className="enq-top">
              <div>
                <b style={{ fontSize: 16 }}>{e.subject}</b>{' '}
                <span className={`status ${e.status}`}>{e.status}</span>
              </div>
              <span className="muted" style={{ fontSize: 13 }}>
                {new Date(e.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })}
              </span>
            </div>
            <div className="enq-meta">
              <span>{e.topic}</span>
              {e.name && <span>{e.name}</span>}
              <a href={`mailto:${e.email}?subject=${encodeURIComponent('Re: ' + e.subject)}`}>{e.email}</a>
              {e.phone && <a href={`tel:${e.phone.replace(/[^\d+]/g, '')}`}>{e.phone}</a>}
            </div>
            <div className="enq-msg">{e.message}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a className="adm-btn sm" href={`mailto:${e.email}?subject=${encodeURIComponent('Re: ' + e.subject)}`}>Reply by email</a>
              {e.status !== 'read' && <form action={setEnquiryStatus.bind(null, e.id, 'read')}><button className="adm-btn ghost sm">Mark read</button></form>}
              {e.status !== 'done' && <form action={setEnquiryStatus.bind(null, e.id, 'done')}><button className="adm-btn ghost sm">Mark done</button></form>}
              {e.status !== 'new' && <form action={setEnquiryStatus.bind(null, e.id, 'new')}><button className="adm-btn ghost sm">Mark new</button></form>}
              <form action={deleteEnquiry.bind(null, e.id)}><ConfirmButton message="Delete this enquiry?">Delete</ConfirmButton></form>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
