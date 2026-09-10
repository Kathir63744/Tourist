// app/page.tsx
import HomePageClient from './HomePageClient';
import { generateCanonical } from './lib/canonical';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.zoytours.com';
const SITE_NAME = 'Zoy Tours';

export const metadata = {
  title: 'Zoy Tours - Premium Hill Station Resorts in Valparai & Kothagiri',
  description: 'Book luxury hill station resorts in Valparai, Solaiyur & Kothagiri. Experience mountain views, premium rooms, and world-class hospitality in Tamil Nadu.',
  keywords: [
    'Valparai resorts',
    'Kothagiri resorts',
    'hill station resorts',
    'luxury resorts Tamil Nadu',
    'Valparai accommodation',
    'Kothagiri hotels',
    'Western Ghats resorts',
    'Solaiyur hill station',
    'premium resorts',
    'Zoy Tours',
  ].join(', '),
  alternates: {
    canonical: generateCanonical('/'),
  },
  openGraph: {
    title: 'Zoy Tours - Premium Hill Station Resorts',
    description: 'Book luxury hill station resorts in Valparai & Kothagiri. Best price guaranteed.',
    url: generateCanonical('/'), 
    siteName: SITE_NAME,
    images: [{ 
      url: '/og-home.jpg', 
      width: 1200, 
      height: 630, 
      alt: 'Zoy Tours Resorts',
      type: 'image/jpeg',
    }],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoy Tours - Premium Hill Station Resorts',
    description: 'Book luxury hill station resorts in Valparai & Kothagiri.',
    images: ['/og-home.jpg'],
    site: '@zoytours',
    creator: '@zoytours',
  },
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
};

export default function Page() {
  return <HomePageClient />;
}