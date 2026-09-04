// app/contact/page.tsx
import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { generateCanonical } from '../lib/canonical';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zoytours.com';
const SITE_NAME = 'Zoy Tours';

export const metadata: Metadata = {
  title: 'Contact Zoy Tours - Resort Bookings & Travel Inquiries | Valparai & Kothagiri',
  description: 'Contact Zoy Tours for resort bookings, tour packages, or travel inquiries. Call +91 98765 43210, WhatsApp, or email us for quick assistance. We\'re here to help plan your perfect hill station getaway.',
  keywords: [
    'contact Zoy Tours',
    'resort booking contact',
    'tour package inquiries',
    'Valparai resort contact',
    'Kothagiri resort contact',
    'travel assistance',
    'customer support',
    'book resort',
    'Valparai Helpline',
    'Zoy Tours contact',
    'hill station resort booking',
    'Tamil Nadu resort contact',
  ].join(', '),
  alternates: {
    canonical: generateCanonical('/contact'), // ✅ Fixed: using helper function
  },
  openGraph: {
    title: 'Contact Zoy Tours - Resort Bookings & Travel Inquiries',
    description: 'Contact us for resort bookings, tour packages, or travel inquiries. Call, WhatsApp, or email us for quick assistance.',
    url: generateCanonical('/contact'), // ✅ Added full URL
    siteName: SITE_NAME,
    images: [
      {
        url: '/valparai_logo_3.png',
        width: 1200,
        height: 630,
        alt: 'Contact Zoy Tours - Resort Bookings & Travel Inquiries',
        type: 'image/png',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Zoy Tours - Resort Bookings & Travel Inquiries',
    description: 'Contact us for resort bookings, tour packages, or travel inquiries. Quick assistance guaranteed.',
    images: ['/valparai_logo_3.png'], // ✅ Using consistent image
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

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Zoy Tours - Resort Bookings & Travel Inquiries',
  description: 'Contact Zoy Tours for resort bookings, tour packages, or travel inquiries.',
  url: generateCanonical('/contact'), // ✅ Using helper
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
        name: 'Contact',
        item: generateCanonical('/contact'), // ✅ Using helper
      },
    ],
  },
  mainEntity: {
    '@type': 'Organization',
    name: SITE_NAME,
    description: 'Premium hill station resorts in Valparai and Kothagiri',
    telephone: '+91 98765 43210',
    email: 'support@zoytours.com', // ✅ Updated email
    url: SITE_URL,
    logo: `${SITE_URL}/valparai_logo_3.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91 98765 43210',
        contactType: 'reservations',
        availableLanguage: ['English', 'Tamil'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91 98765 43211',
        contactType: 'emergency',
        availableLanguage: ['English', 'Tamil'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Valparai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    location: [
      {
        '@type': 'Place',
        name: 'Valparai-Solaiyur',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Valparai',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 10.3266,
          longitude: 76.9510,
        },
      },
      {
        '@type': 'Place',
        name: 'Kothagiri',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kothagiri',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 11.4161,
          longitude: 76.8186,
        },
      },
    ],
    sameAs: [
      'https://www.facebook.com/zoytours',
      'https://www.instagram.com/zoytours',
      'https://www.youtube.com/zoytours',
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema),
        }}
      />
      <ContactClient />
    </>
  );
}