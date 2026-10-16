import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import { removeAdmin } from '@/app/admin/actions';
import AddAdminForm from '@/components/admin/AddAdminForm';
import ConfirmButton from '@/components/admin/ConfirmButton';

export const metadata = { title: 'Admin users' };

export default async function UsersPage() {
  const admin = await requireAdmin();
  const { data: rows } = await admin.supabase.from('admins').select('*').order('created_at');
  const isOwner = admin.role === 'owner';

  return (
    <>
      <div className="adm-head">
        <div>
          <Link href="/admin" className="crumb">Dashboard</Link>
          <h1>Admin users</h1>
          <p className="muted">People who can sign in with Google and edit the website. Owners can also add or remove people.</p>
        </div>
      </div>
      {isOwner ? <AddAdminForm /> : <p className="muted" style={{ marginBottom: 16 }}>Only owners can add or remove people.</p>}
      <div className="adm-card table-scroll" style={{ marginTop: 20 }}>
        <table className="adm-table">
          <thead><tr><th>Google email</th><th>Role</th><th>Added</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
          <tbody>
            {(rows ?? []).map((r) => (
              <tr key={r.email}>
                <td><b>{r.email}</b>{r.email.toLowerCase() === admin.email.toLowerCase() && <span className="muted"> (you)</span>}</td>
                <td>{r.role === 'owner' ? 'Owner' : 'Editor'}</td>
                <td>{new Date(r.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                <td>
                  <div className="actions">
                    {isOwner && r.email.toLowerCase() !== admin.email.toLowerCase() && (
                      <form action={removeAdmin.bind(null, r.email)}>
                        <ConfirmButton message={`Remove ${r.email}? They will no longer be able to sign in.`}>Remove</ConfirmButton>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
