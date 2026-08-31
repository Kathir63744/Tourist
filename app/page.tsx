// app/page.tsx
import HomePageClient from './HomePageClient';

export const metadata = {
  title: 'Zoy Tours - Premium Hill Station Resorts in Valparai & Kothagiri',
  description: 'Book luxury hill station resorts in Valparai, Solaiyur & Kothagiri. Experience mountain views, premium rooms, and world-class hospitality in Tamil Nadu.',
  openGraph: {
    title: 'Zoy Tours - Premium Hill Station Resorts',
    description: 'Book luxury hill station resorts in Valparai & Kothagiri. Best price guaranteed.',
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