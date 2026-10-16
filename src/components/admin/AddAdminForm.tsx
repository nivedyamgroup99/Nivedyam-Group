'use client';
import { useActionState, useEffect, useRef } from 'react';
import { addAdmin } from '@/app/admin/actions';

export default function AddAdminForm() {
  const [state, action, pending] = useActionState(addAdmin, {});
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state.ok) ref.current?.reset(); }, [state]);
  return (
    <form ref={ref} action={action} className="adm-card adm-pad adm-form" style={{ maxWidth: 820 }}>
      <h2>Add a person</h2>
      <div className="two">
        <div className="adm-field">
          <label className="l" htmlFor="a-email">Google email *</label>
          <input id="a-email" type="email" name="email" required placeholder="name@gmail.com" />
        </div>
        <div className="adm-field">
          <label className="l" htmlFor="a-role">Role</label>
          <select id="a-role" name="role" defaultValue="editor">
            <option value="editor">Editor: can change website content</option>
            <option value="owner">Owner: can also manage admin users</option>
          </select>
        </div>
      </div>
      {state.error && <p className="adm-error" role="alert">{state.error}</p>}
      <div className="form-actions">
        <button className="adm-btn gold" disabled={pending}>{pending ? 'Adding…' : 'Add person'}</button>
        {state.ok && <span className="yes" role="status">Added. They can now sign in with Google.</span>}
      </div>
    </form>
  );
}
