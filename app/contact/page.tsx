// app/contact/page.tsx
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact HillEscape - Resort Bookings & Travel Inquiries | Valparai & Kothagiri',
  description: 'Contact HillEscape for resort bookings, tour packages, or travel inquiries. Call +91 98765 43210, WhatsApp, or email us for quick assistance. We\'re here to help plan your perfect hill station getaway.',
  keywords: [
    'contact HillEscape',
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
  openGraph: {
    title: 'Contact HillEscape - Resort Bookings & Travel Inquiries',
    description: 'Contact us for resort bookings, tour packages, or travel inquiries. Call, WhatsApp, or email us for quick assistance.',
    url: '/contact',
    siteName: 'HillEscape',
    images: [
      {
        url: '/valparai_logo_3.png',
        width: 1200,
        height: 630,
        alt: 'Contact HillEscape - Resort Bookings & Travel Inquiries',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact HillEscape - Resort Bookings & Travel Inquiries',
    description: 'Contact us for resort bookings, tour packages, or travel inquiries. Quick assistance guaranteed.',
    images: ['/og-contact.jpg'],
    site: '@hillescape',
    creator: '@hillescape',
  },
  alternates: {
    canonical: '/contact',
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact HillEscape - Resort Bookings & Travel Inquiries',
  description: 'Contact HillEscape for resort bookings, tour packages, or travel inquiries.',
  url: 'https://hillescape.com/contact',
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
        name: 'Contact',
        item: 'https://hillescape.com/contact',
      },
    ],
  },
  mainEntity: {
    '@type': 'Organization',
    name: 'HillEscape',
    description: 'Premium hill station resorts in Valparai and Kothagiri',
    telephone: '+91 98765 43210',
    email: 'support@hillescape.com',
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