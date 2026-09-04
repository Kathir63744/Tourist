// app/packages/page.tsx
import type { Metadata } from "next";
import PackagesClient from "./PackagesClient";
import { generateCanonical } from "../lib/canonical";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zoytours.com";
const SITE_NAME = "Zoy Tours";

export const metadata: Metadata = {
  title: "Tour Packages — Ooty, Valparai & Athirappilly | Zoy Tours",
  description:
    "Curated Western Ghats tour packages with Zoy Tours. 1N/2D from ₹2,950, 2N/3D from ₹4,950 and a 4N/5D grand package covering Ooty, Valparai and Athirappilly. Stay, meals, transport and guide included.",
  keywords: [
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
  ].join(", "),
  alternates: {
    canonical: generateCanonical("/packages"), // ✅ Fixed: using helper function
  },
  openGraph: {
    title: "Tour Packages — Ooty, Valparai & Athirappilly | Zoy Tours",
    description:
      "Comfortable, transparently priced hill station packages for families, couples, corporate groups and student trips.",
    url: generateCanonical("/packages"), // ✅ Added full URL
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-packages.jpg",
        width: 1200,
        height: 630,
        alt: "Zoy Tours - Tour Packages for Ooty, Valparai & Athirappilly",
        type: "image/jpeg",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Packages — Ooty, Valparai & Athirappilly | Zoy Tours",
    description:
      "Curated Western Ghats packages from ₹2,950. Stay, meals, transport and guide included.",
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
      <PackagesClient />
    </>
  );
}