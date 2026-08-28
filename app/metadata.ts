// app/metadata.ts
import type { Metadata } from 'next';

export const homepageMetadata: Metadata = {
  title: 'Zoy Tours - Premium Hill Station Resorts in Valparai & Kothagiri',
  description: 'Book luxury hill station resorts in Valparai, Solaiyur & Kothagiri. Experience mountain views, premium rooms, and world-class hospitality in Tamil Nadu.',
  keywords: 'hill station resorts, Valparai resorts, Kothagiri resorts, luxury resorts Tamil Nadu, mountain view resorts, family resorts, honeymoon resorts, best resorts in Valparai',
  openGraph: {
    title: 'Zoy Tours - Premium Hill Station Resorts',
    description: 'Book luxury hill station resorts in Valparai & Kothagiri. Best price guaranteed.',
    url: '/',
    images: [{ url: '/og-home.jpg', width: 1200, height: 630, alt: 'Zoy Tours Resorts' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoy Tours - Premium Hill Station Resorts',
    description: 'Book luxury hill station resorts in Valparai & Kothagiri.',
    images: ['/og-home.jpg'],
  },
  alternates: { canonical: '/' },
};