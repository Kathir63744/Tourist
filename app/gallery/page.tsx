// app/gallery/page.tsx
import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';
import { generateCanonical } from '../lib/canonical';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zoytours.com';
const SITE_NAME = 'Zoy Tours';

export const metadata: Metadata = {
  title: 'Gallery - Zoy Tours Resorts & Scenic Hill Station Views | Valparai & Kothagiri',
  description: 'Explore our photo gallery of premium resorts, mountain views, tea plantations, waterfalls, and breathtaking landscapes in Valparai & Kothagiri. See the beauty of Tamil Nadu\'s Western Ghats.',
  keywords: [
    'resort gallery',
    'Valparai photos',
    'Kothagiri images',
    'hill station photography',
    'mountain views',
    'tea plantation photos',
    'waterfall images',
    'Western Ghats pictures',
    'resort interiors',
    'Valparai scenery',
    'Kothagiri landscapes',
    'Valayar mountain range',
    'hill station resorts gallery',
    'South India hill station photos',
    'luxury resort images',
    'nature photography',
    'travel photography',
  ].join(', '),
  alternates: {
    canonical: generateCanonical('/gallery'), // ✅ Fixed: using helper function
  },
  openGraph: {
    title: 'Gallery - Zoy Tours Resorts & Scenic Hill Station Views',
    description: 'See the beauty of our resorts and the stunning hill station landscapes of Valparai & Kothagiri. Explore our photo gallery.',
    url: generateCanonical('/gallery'), // ✅ Added full URL
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-gallery.jpg',
        width: 1200,
        height: 630,
        alt: 'Zoy Tours Gallery - Resorts & Scenic Views in Valparai & Kothagiri',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery - Zoy Tours Resorts & Scenic Views',
    description: 'Explore our photo gallery of premium resorts and breathtaking hill station landscapes.',
    images: ['/og-gallery.jpg'],
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

// Gallery Page Schema
const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Zoy Tours Gallery - Resorts & Hill Station Views',
  description: 'Photo gallery of premium hill station resorts, mountain views, tea plantations, and waterfalls in Valparai & Kothagiri.',
  url: generateCanonical('/gallery'), // ✅ Using helper
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
        name: 'Gallery',
        item: generateCanonical('/gallery'), // ✅ Using helper
      },
    ],
  },
  mainEntity: {
    '@type': 'ImageGallery',
    name: 'Zoy Tours Resort Gallery',
    description: 'Stunning images of hill station resorts and landscapes',
  },
};

export default function Page() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gallerySchema),
        }}
      />
      <GalleryClient />
    </>
  );
}