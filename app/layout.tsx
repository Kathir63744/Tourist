// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Providers from "./components/Providers";
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

export const metadata: Metadata = {
  title: "HillEscape - Luxury Hill Station Resorts",
  description:
    "Experience world-class hospitality in our carefully curated resorts across Valparai, Solaiyur, and Kothagiri",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
