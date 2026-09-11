// app/packages/page.tsx
import type { Metadata } from "next";
import PackagesClient from "./PackagesClient";
import { generateCanonical } from "../lib/canonical";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zoytours.com";
const SITE_NAME = "Zoy Tours";

export const metadata: Metadata = {
  title: "Explore Ooty, Valparai & Athirappilly Tour Packages | Zoy Tours",
  description:
    "Curated hill station holidays with comfortable stays, private transport, sightseeing & guided experiences. Tour packages to Ooty, Valparai & Athirappilly from ₹2,950. Stay, meals, transport and guide included.",
  keywords: [
    "Ooty Valparai Athirappilly packages",
    "tour packages Valparai",
    "Ooty tour packages",
    "Athirappilly packages",
    "Western Ghats tours",
    "Valparai Helpline packages",
    "family tour packages Tamil Nadu",
    "couple packages hill station",
    "corporate tour packages",
    "student tour packages",
    "1N 2D Valparai package",
    "2N 3D Ooty package",
    "4N 5D grand package",
    "Zoy Tours packages",
    "hill station tour packages",
    "private transport tour packages",
    "guided hill station tours",
    "curated tour packages Tamil Nadu",
  ].join(", "),
  alternates: {
    canonical: generateCanonical("/packages"),
  },
  openGraph: {
    title: "Explore Ooty, Valparai & Athirappilly Tour Packages | Zoy Tours",
    description:
      "Curated hill station holidays with comfortable stays, private transport, sightseeing & guided experiences.",
    url: generateCanonical("/packages"),
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-packages.jpg",
        width: 1200,
        height: 630,
        alt: "Zoy Tours - Ooty, Valparai & Athirappilly Tour Packages",
        type: "image/jpeg",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Ooty, Valparai & Athirappilly Tour Packages | Zoy Tours",
    description:
      "Curated hill station holidays with comfortable stays, private transport, sightseeing & guided experiences. From ₹2,950.",
    images: ["/og-packages.jpg"],
    site: "@zoytours",
    creator: "@zoytours",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Packages",
      item: generateCanonical("/packages"),
    },
  ],
};

// ✅ NEW: Tour Packages Schema (helps Google show rich results)
const tourPackagesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ooty, Valparai & Athirappilly Tour Packages",
  description:
    "Curated hill station holidays with comfortable stays, private transport, sightseeing & guided experiences.",
  url: generateCanonical("/packages"),
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "TouristTrip",
        name: "1N/2D Valparai Package",
        description:
          "Short hill station getaway with comfortable stay, sightseeing and private transport.",
        touristType: ["Families", "Couples", "Solo Travelers"],
        offers: {
          "@type": "Offer",
          price: "2950",
          priceCurrency: "INR",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "TouristTrip",
        name: "2N/3D Ooty & Valparai Package",
        description:
          "Explore Ooty and Valparai with guided sightseeing, private transport and comfortable stays.",
        touristType: ["Families", "Couples", "Corporate Groups"],
        offers: {
          "@type": "Offer",
          price: "4950",
          priceCurrency: "INR",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "TouristTrip",
        name: "4N/5D Ooty, Valparai & Athirappilly Grand Package",
        description:
          "Grand Western Ghats tour covering Ooty, Valparai and Athirappilly with all-inclusive arrangements.",
        touristType: ["Families", "Corporate Groups", "Student Groups"],
      },
    },
  ],
};

export default function PackagesPage() {
  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {/* Tour Packages Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tourPackagesSchema),
        }}
      />
      <PackagesClient />
    </>
  );
}