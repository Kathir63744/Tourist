// app/tours/page.tsx
import ToursClient from './ToursClient';
import { generateCanonical } from '../lib/canonical';

export const metadata = {
  title: 'Tours & Activities - Explore Valparai, Solaiyur & Kothagiri | HillEscape',
  description: 'Book guided tours, treks, safaris, and cultural experiences in Valparai, Solaiyur & Kothagiri. Explore tea plantations, wildlife sanctuaries, waterfalls, and local heritage with expert guides.',
  keywords: 'guided tours Valparai, trekking Solaiyur, wildlife safari Valparai, tea plantation tour, waterfall tours Kothagiri, adventure activities, cultural tours, Anamalai tiger reserve, nature walks, bird watching tours, heritage walks, Valparai activities',
  alternates: {
    canonical: generateCanonical('/tours'), // ✅ Fixed: using helper function
  },
  openGraph: {
    title: 'Tours & Activities - Explore Valparai, Solaiyur & Kothagiri',
    description: 'Experience the best adventures in Tamil Nadu\'s hill stations. Book guided tours, treks, safaris, and cultural experiences.',
    url: generateCanonical('/tours'), // ✅ Added full URL for OG
    images: [{ 
      url: '/og-tours.jpg', 
      width: 1200, 
      height: 630, 
      alt: 'HillEscape Tours & Activities - Valparai & Kothagiri' 
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tours & Activities - Explore Valparai & Kothagiri',
    description: 'Experience the best adventures in Tamil Nadu\'s hill stations. Book your tour today.',
    images: ['/og-tours.jpg'],
  },
};

export default function Page() {
  return <ToursClient />;
}