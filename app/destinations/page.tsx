// app/destinations/page.tsx
import type { Metadata } from 'next';
import DestinationsClient from './DestinationsClient';
import { generateCanonical } from '../lib/canonical';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zoytours.com';
const SITE_NAME = 'Zoy Tours';

export const metadata: Metadata = {
  title: 'Hill Station Destinations - Valparai, Solaiyur & Kothagiri | Zoy Tours',
  description: 'Explore Valparai, Solaiyur & Kothagiri - three beautiful hill stations in Tamil Nadu\'s Western Ghats. Discover tea plantations, waterfalls, wildlife sanctuaries, and colonial heritage.',
  keywords: [
    'Valparai hill station',
    'Solaiyur travel',
    'Kothagiri tourism',
    'Tamil Nadu hill stations',
    'Western Ghats destinations',
    'tea plantations tour',
    'waterfall destinations',
    'Anamalai hills',
    'Nilgiris travel',
    'Valparai tourism',
    'Kothagiri attractions',
    'hill station guide',
    'South India hill stations',
    'Anaimalai Hills',
    'Nilgiri hills',
  ].join(', '),
  alternates: {
    canonical: generateCanonical('/destinations'), // ✅ Fixed: using helper function
  },
  openGraph: {
    title: 'Hill Station Destinations - Valparai, Solaiyur & Kothagiri | Zoy Tours',
    description: 'Discover the beauty of Tamil Nadu\'s hill stations. Plan your perfect getaway to Valparai, Solaiyur & Kothagiri.',
    url: generateCanonical('/destinations'), // ✅ Added full URL
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-destinations.jpg',
        width: 1200,
        height: 630,
        alt: 'Zoy Tours Destinations - Valparai, Solaiyur & Kothagiri',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hill Station Destinations - Valparai, Solaiyur & Kothagiri',
    description: 'Discover the beauty of Tamil Nadu\'s hill stations. Plan your perfect getaway today.',
    images: ['/og-destinations.jpg'],
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

const destinationsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Hill Station Destinations - Valparai, Solaiyur & Kothagiri',
  description: 'Explore three beautiful hill stations in Tamil Nadu\'s Western Ghats - Valparai, Solaiyur & Kothagiri.',
  url: generateCanonical('/destinations'), // ✅ Using helper
  breadcrumb: {
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
        name: 'Destinations',
        item: generateCanonical('/destinations'), // ✅ Using helper
      },
    ],
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Valparai',
        description: 'A breathtaking hill station in the Anaimalai Hills with tea estates and wildlife.',
        url: generateCanonical('/destinations/valparai'), // ✅ Using helper
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Solaiyur',
        description: 'A hidden gem nestled in dense forests offering pristine nature experiences.',
        url: generateCanonical('/destinations/solaiyur'), // ✅ Using helper
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Kothagiri',
        description: 'A colonial hill station in the Nilgiris with panoramic views and pleasant climate.',
        url: generateCanonical('/destinations/kothagiri'), // ✅ Using helper
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(destinationsSchema),
        }}
      />
      <DestinationsClient />
    </>
  );
}