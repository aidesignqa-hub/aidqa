import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://aidesignqa.com'),
  title: 'AIDQA — Automated Visual Regression Testing',
  description:
    'Monitor your web app UI with pixel-perfect screenshots and GPT-4o Vision. Catch visual regressions before your users do.',
  openGraph: {
    title: 'AIDQA — Automated Visual Regression Testing',
    description: 'Catch visual regressions before your users do.',
    url: 'https://aidesignqa.com',
    siteName: 'AIDQA',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIDQA — Automated Visual Regression Testing',
    description: 'Catch visual regressions before your users do.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
