import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

const DESCRIPTION = 'AIDQA automatically audits AI-generated interfaces for layout drift, hierarchy issues, spacing inconsistency, and accessibility risk. Get prioritized findings and repair guidance before you ship.';

export const metadata: Metadata = {
  metadataBase: new URL('https://aidesignqa.com'),
  title: 'Design QA for AI-Generated UI | AIDQA',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://aidesignqa.com',
  },
  openGraph: {
    title: 'Design QA for AI-Generated UI | AIDQA',
    description: DESCRIPTION,
    url: 'https://aidesignqa.com',
    siteName: 'AIDQA',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AIDQA — Design QA for AI-Generated UI' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design QA for AI-Generated UI | AIDQA',
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AIDQA',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  url: 'https://aidesignqa.com',
  description: DESCRIPTION,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    description: 'Free plan — 7 scans per month',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
