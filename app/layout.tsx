// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Providers from "./components/Providers";
import TouristNavbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const thunder = localFont({
  src: "../public/fonts/Thunder-BlackLC.ttf",
  variable: "--font-thunder",
  display: "swap",
});

const monument = localFont({
  src: "../public/fonts/MonumentExtended-Ultrabold.otf",
  variable: "--font-monument",
  display: "swap",
});

const chillout = localFont({
  src: "../public/fonts/chillout update dafont.otf",
  variable: "--font-chillout",
  display: "swap",
});

const chrono = localFont({
  src: "../public/fonts/Chrono Demo.ttf",
  variable: "--font-chrono",
  display: "swap",
});

const migra = localFont({
  src: "../public/fonts/Migra-Extrabold.otf",
  variable: "--font-migra",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://valparaihelpline.com";
const SITE_NAME = "Valparai Helpline";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  
  title: {
    default: `${SITE_NAME} - Premium Hill Station Resorts in Valparai & Kothagiri`,
    template: `%s | ${SITE_NAME}`,
  },
  
  description:
    "Experience curated resorts across Valparai, Solaiyur, and Kothagiri. Book premium hill station stays, explore tea plantations, waterfalls, and wildlife in Tamil Nadu's Western Ghats.",
  
  keywords: [
    "Valparai Helpline",
    "Valparai resorts",
    "Kothagiri resorts",
    "Solaiyur hill station",
    "hill station resorts Tamil Nadu",
    "premium resorts Western Ghats",
    "Valparai travel guide",
    "Kothagiri tourism",
    "tea plantation stays",
    "eco-friendly resorts",
    "family resorts",
    "honeymoon resorts",
    "best resorts in Valparai",
    "Anamalai hills resorts",
    "Nilgiris accommodation",
  ].join(", "),
  
  authors: [{ name: "Zoy Tours Team" }],
  creator: "Zoy Tours",
  publisher: "Zoy Tours",
  
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
  
  openGraph: {
    title: `${SITE_NAME} - Premium Hill Station Resorts in Valparai & Kothagiri`,
    description: "Experience curated resorts across Valparai, Solaiyur, and Kothagiri. Book premium hill station stays.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/valparai_logo_3.png", // ✅ Now using same image for both
        width: 1200,
        height: 630,
        alt: "Valparai Helpline - Premium Hill Station Resorts",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Premium Hill Station Resorts`,
    description: "Experience curated resorts across Valparai, Solaiyur, and Kothagiri.",
    images: ["/valparai_logo_3.png"], // ✅ Now using same image as Open Graph
  },
  
  icons: {
    icon: [
      {
        url: "/valparai_logo_3.png",
        sizes: "any",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/valparai_logo_3.png",
      },
    ],
  },
  
  alternates: {
    canonical: SITE_URL,
  },
  
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
};

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_NAME,
  description: "Experience curated resorts across Valparai, Solaiyur, and Kothagiri",
  url: SITE_URL,
  logo: `${SITE_URL}/valparai_logo_3.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91 98765 43210",
    contactType: "reservations",
    availableLanguage: ["English", "Tamil"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Valparai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  priceRange: "₹2,000 - ₹15,000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${thunder.variable} ${migra.variable} ${monument.variable} ${chillout.variable} ${chrono.variable}`}
    >
      <head>
        <link 
          rel="icon" 
          href="/zoy_tours_whatsapp_dp.png" 
          type="image/png"
        />
        <link 
          rel="shortcut icon" 
          href="/zoy_tours_whatsapp_dp.png" 
          type="image/png"
        />
        <link 
          rel="apple-touch-icon" 
          href="/zoy_tours_whatsapp_dp.png"
        />
        <link 
          rel="apple-touch-icon-precomposed" 
          href="/zoy_tours_whatsapp_dp.png"
        />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <TouristNavbar 
            logoImage="/zoy_tours_whatsapp_dp.png"
            logoText="Zoy Tours"
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}