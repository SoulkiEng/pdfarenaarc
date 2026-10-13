import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

export const metadata: Metadata = {
  metadataBase: new URL('https://pdfarenaarc.com'),
  title: {
    default: 'PDFArenaArc - Free Online PDF Tools: Merge, Split, Compress & Convert',
    template: '%s | PDFArenaArc',
  },
  description:
    'Every tool you need to work with PDFs in one place. 100% free, fast, and secure client-side PDF editor: merge, split, compress, convert, rotate, protect, and watermark PDFs.',
  keywords: [
    'pdfarenaarc',
    'pdf tools',
    'merge pdf',
    'split pdf',
    'compress pdf',
    'jpg to pdf',
    'free pdf converter',
    'pdf editor online',
    'secure pdf tools',
  ],
  authors: [{ name: 'PDFArenaArc Team' }],
  creator: 'PDFArenaArc',
  publisher: 'PDFArenaArc',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pdfarenaarc.com',
    title: 'PDFArenaArc - Online PDF Tools for PDF Lovers',
    description:
      'Completely free, fast, and secure online PDF tools. Merge, split, compress, convert, rotate, and protect PDFs directly in your browser without file limits.',
    siteName: 'PDFArenaArc',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFArenaArc - Online PDF Tools',
    description: '100% free client-side PDF tools: merge, split, compress, and edit PDFs safely.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* AdSense Verification Tag Placeholder */}
        {/* <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" /> */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
