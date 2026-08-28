import type { Metadata } from 'next';
import { SITE_ORIGIN } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BizDrive Marketing Plan Lab',
    template: '%s | BizDrive Marketing Plan Lab',
  },
  description: 'Evidence-led marketing plan simulations by BizDrive.',
  metadataBase: new URL(SITE_ORIGIN),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
