// app/page.tsx
import HomePageClient from './HomePageClient';
import { generateCanonical } from './lib/canonical';

export const metadata = {
  title: 'Zoy Tours - Premium Hill Station Resorts in Valparai & Kothagiri',
  description: 'Book luxury hill station resorts in Valparai, Solaiyur & Kothagiri. Experience mountain views, premium rooms, and world-class hospitality in Tamil Nadu.',
  alternates: {
    canonical: generateCanonical('/'), // ✅ Added canonical for homepage
  },
  openGraph: {
    title: 'Zoy Tours - Premium Hill Station Resorts',
    description: 'Book luxury hill station resorts in Valparai & Kothagiri. Best price guaranteed.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://zoytours.com', // ✅ Added OG URL
    images: [{ url: '/og-home.jpg', width: 1200, height: 630, alt: 'Zoy Tours Resorts' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoy Tours - Premium Hill Station Resorts',
    description: 'Book luxury hill station resorts in Valparai & Kothagiri.',
    images: ['/og-home.jpg'],
  },
};

export default function Page() {
  return <HomePageClient />;
}