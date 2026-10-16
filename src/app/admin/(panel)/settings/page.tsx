import { redirect } from 'next/navigation';

// Old address: texts and contact details now live under Pages.
export default function OldSettingsPage() {
  redirect('/admin/p/contact?tab=details');
}
