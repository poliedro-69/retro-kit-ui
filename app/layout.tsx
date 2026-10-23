import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans, Press_Start_2P, VT323 } from 'next/font/google'
import { site } from '@/lib/site'
import './globals.css'

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
})

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-press-start',
})

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-plex-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: 'RetroKit - Free retro UI kits for React and Tailwind',
    template: '%s | RetroKit',
  },
  description:
    'Free Windows 3.1 and Mac System 7 inspired UI kits. React and Web Components with Tailwind CSS, classic bevels and modern focus states.',
  applicationName: site.productName,
  authors: [{ name: site.author.name, url: site.author.url }],
  keywords: [
    'retro ui kit',
    'windows 3.1 ui',
    'system 7 ui',
    'tailwind css components',
    'react retro components',
    'web components',
    'free ui kit',
    'pixel ui',
    '90s ui',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.productName,
    title: 'RetroKit - Free retro UI kits',
    description: 'Windows 3.1 and Mac System 7 UI kits for React and Tailwind CSS.',
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#167a84',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable} ${vt323.variable} ${pressStart.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
