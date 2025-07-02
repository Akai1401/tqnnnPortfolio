import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import '@/styles/custom.css';
import LayoutClient from '@/Layouts';

import ContextStoreProvider from '@/context/store';
import { Suspense } from 'react';
import { INFO } from '@/constant/info';
import { COLOR } from '@/constant/color';
import Loading from './loading';

export const metadata: Metadata = {
  title: INFO.APP.NAME,
  description: INFO.APP.DESC,
  keywords: 'a, b, c',
  openGraph: {
    url: process.env.NEXT_PUBLIC_FE_URL,
    title: INFO.APP.NAME,
    description: INFO.APP.DESC,
    siteName: INFO.APP.NAME,
    images: [`${process.env.NEXT_PUBLIC_FE_URL}${INFO.APP.THUMBNAIL_URL}`],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: INFO.APP.NAME,
    description: INFO.APP.DESC,
    images: [`${process.env.NEXT_PUBLIC_FE_URL}${INFO.APP.THUMBNAIL_URL}`],
  },
  appleWebApp: {
    capable: true,
    title: INFO.APP.NAME,
    statusBarStyle: 'black' /* 'black-translucent' */,
  },
};

const InterFont = Inter({
  subsets: ['vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

const groteskFont = localFont({
  src: '../../public/fonts/grotesk.otf',
  variable: '--font-grotesk',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='vi'>
      <head>
        {/* <meta name='theme-color' content={COLOR.PRIMARY} /> */}
        {/* <link rel='apple-touch-icon' href={INFO.APP.DOMAIN} /> */}
      </head>
      <body
        className={`${InterFont.variable} ${groteskFont.variable} overflow-hidden font-grotesk`}
      >
        <ContextStoreProvider>
          <Suspense fallback={<Loading />}>
            <LayoutClient>{children}</LayoutClient>
          </Suspense>
        </ContextStoreProvider>
        {/* analytics */}
        {/* <GoogleAnalytics gaId='G-722Q2GE1J3' /> */}
        {/* end analytics */}
      </body>
    </html>
  );
}
