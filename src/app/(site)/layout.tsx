import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSettings, waLink } from '@/lib/content';

export const revalidate = 300;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <>
      <Header brandName={s.brand_name} logoUrl={s.logo_url} whatsappUrl={waLink(s)} />
      <main>{children}</main>
      <Footer s={s} />
    </>
  );
}
