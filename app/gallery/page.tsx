// app/gallery/page.tsx
import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery - HillEscape Resorts & Scenic Hill Station Views | Valparai & Kothagiri',
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
  openGraph: {
    title: 'Gallery - HillEscape Resorts & Scenic Hill Station Views',
    description: 'See the beauty of our resorts and the stunning hill station landscapes of Valparai & Kothagiri. Explore our photo gallery.',
    url: '/gallery',
    siteName: 'HillEscape',
    images: [
      {
        url: '/og-gallery.jpg',
        width: 1200,
        height: 630,
        alt: 'HillEscape Gallery - Resorts & Scenic Views in Valparai & Kothagiri',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery - HillEscape Resorts & Scenic Views',
    description: 'Explore our photo gallery of premium resorts and breathtaking hill station landscapes.',
    images: ['/og-gallery.jpg'],
    site: '@hillescape',
    creator: '@hillescape',
  },
  alternates: {
    canonical: '/gallery',
  },
};

// Gallery Page Schema
const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'HillEscape Gallery - Resorts & Hill Station Views',
  description: 'Photo gallery of premium hill station resorts, mountain views, tea plantations, and waterfalls in Valparai & Kothagiri.',
  url: 'https://hillescape.com/gallery',
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
        name: 'Gallery',
        item: 'https://hillescape.com/gallery',
      },
    ],
  },
  mainEntity: {
    '@type': 'ImageGallery',
    name: 'HillEscape Resort Gallery',
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