// app/destinations/page.tsx
import type { Metadata } from 'next';
import DestinationsClient from './DestinationsClient';

export const metadata: Metadata = {
  title: 'Hill Station Destinations - Valparai, Solaiyur & Kothagiri | HillEscape',
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
  openGraph: {
    title: 'Hill Station Destinations - Valparai, Solaiyur & Kothagiri',
    description: 'Discover the beauty of Tamil Nadu\'s hill stations. Plan your perfect getaway to Valparai, Solaiyur & Kothagiri.',
    url: '/destinations',
    siteName: 'HillEscape',
    images: [
      {
        url: '/og-destinations.jpg',
        width: 1200,
        height: 630,
        alt: 'HillEscape Destinations - Valparai, Solaiyur & Kothagiri',
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
    site: '@hillescape',
    creator: '@hillescape',
  },
  alternates: {
    canonical: '/destinations',
  },
};

const destinationsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Hill Station Destinations - Valparai, Solaiyur & Kothagiri',
  description: 'Explore three beautiful hill stations in Tamil Nadu\'s Western Ghats - Valparai, Solaiyur & Kothagiri.',
  url: 'https://hillescape.com/destinations',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hillescape.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Destinations',
        item: 'https://hillescape.com/destinations',
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
        url: 'https://hillescape.com/destinations/valparai',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Solaiyur',
        description: 'A hidden gem nestled in dense forests offering pristine nature experiences.',
        url: 'https://hillescape.com/destinations/solaiyur',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Kothagiri',
        description: 'A colonial hill station in the Nilgiris with panoramic views and pleasant climate.',
        url: 'https://hillescape.com/destinations/kothagiri',
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