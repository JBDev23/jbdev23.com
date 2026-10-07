import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import StructuredData from "@/components/seo/StructuredData";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Toaster } from 'sonner';
import "../globals.css";
import IntroAnimation from "@/components/ui/IntroAnimation";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  
  return {
    title: {
      template: '%s | JBDEV23',
      default: t('title'),
    },
    description: t('description'),
    metadataBase: new URL('https://jbdev23.com'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: 'JBDEV23 Portfolio',
      locale: locale,
      type: 'website',
      images: [
        {
          url: 'https://jbdev23.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'JBDEV23 Portfolio Preview',
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://jbdev23.com/og-image.jpg'],
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
  };
}

import GlobalSpotlight from "@/components/ui/GlobalSpotlight";
import Header3 from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimationProvider from "@/components/providers/AnimationProvider";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-mono relative overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <StructuredData />
          <AnimationProvider>
            <GlobalSpotlight />
            <IntroAnimation />
            <Header3 />
            <div className="flex-1 flex flex-col pt-[10dvh]">
              {children}
            </div>
            <Footer />
          </AnimationProvider>
          <Toaster 
            position="bottom-right" 
            toastOptions={{ 
              className: 'bg-background border-4 border-foreground rounded-none shadow-[4px_4px_0_var(--foreground)] text-foreground font-mono font-bold uppercase',
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
