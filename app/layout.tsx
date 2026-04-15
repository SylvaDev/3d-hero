import type { Metadata } from 'next';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import './globals.css';

export const metadata: Metadata = {
  title: 'Exovara Labs — Luxury scroll experience',
  description:
    'A premium scroll-driven showcase built by Exovara Labs — cinematic motion, Next.js performance, and conversion-ready presentation.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-pt-20">
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
