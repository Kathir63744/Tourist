// app/resorts/page.tsx
import type { Metadata } from 'next';
import ResortsClient from './ResortsClient';
import { generateCanonical } from '../lib/canonical';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zoytours.com';
const SITE_NAME = 'Zoy Tours';

export const metadata: Metadata = {
  title: 'Premium Resorts in Valparai & Kothagiri - Book Luxury Hill Station Stays | Zoy Tours',
  description: 'Browse and book premium hill station resorts in Valparai, Solaiyur & Kothagiri. Compare room types, amenities, prices, and read guest reviews. Your perfect mountain getaway awaits.',
  keywords: [
    'resorts in Valparai',
    'resorts in Kothagiri',
    'luxury resorts Tamil Nadu',
    'hill station hotels',
    'best resorts in Valparai',
    'eco resorts in Western Ghats',
    'family resorts',
    'couple resorts',
    'budget resorts Kothagiri',
    'resorts with mountain view',
    'Valparai accommodation',
    'Kothagiri hotels',
    'premium hill stays',
    'luxury family rooms',
    'one bedroom house resorts',
    'resorts with balcony',
    'Valparai Solaiyur resorts',
  ].join(', '),
  alternates: {
    canonical: generateCanonical('/resorts'), // ✅ Fixed: using helper function
  },
  openGraph: {
    title: 'Premium Resorts in Valparai & Kothagiri - Book Luxury Stays',
    description: 'Browse our premium hill station resorts. Compare room types, amenities, and prices. Book your luxury stay today!',
    url: generateCanonical('/resorts'), // ✅ Added full URL
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-resorts.jpg',
        width: 1200,
        height: 630,
        alt: 'Zoy Tours Premium Resorts in Valparai & Kothagiri',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Resorts in Valparai & Kothagiri',
    description: 'Browse and book luxury hill station resorts. Find the perfect stay for your mountain getaway.',
    images: ['/og-resorts.jpg'],
    site: '@zoytours',
    creator: '@zoytours',
  },
};

// Breadcrumb Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Resorts',
      item: generateCanonical('/resorts'), // ✅ Using full URL
    },
  ],
};

export default function Page() {
  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <ResortsClient />
    </>
  );
}