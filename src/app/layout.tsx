import type { Metadata, Viewport } from 'next';
import '@fontsource/sora/latin-400.css';
import '@fontsource/sora/latin-600.css';
import '@fontsource/sora/latin-700.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-700.css';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Nivedyam Group | Gangothri & Ifthaar Drinking Water', template: '%s | Nivedyam Group' },
  description: 'Gangothri and Ifthaar drinking water from Nivedyam Group of Industries, Kannur, Kerala. Filtered through 14 stages and bottled without a human touch.',
};

export const viewport: Viewport = { themeColor: '#0F1E5A' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
