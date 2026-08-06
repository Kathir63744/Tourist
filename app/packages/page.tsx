// app/packages/page.tsx
import type { Metadata } from "next";
import PackagesClient from "./PackagesClient";


export const metadata: Metadata = {
  title: "Tour Packages — Ooty, Valparai & Athirappilly | Valparai Helpline",
  description:
    "Curated Western Ghats tour packages with Zoy Tours. 1N/2D from ₹2,950, 2N/3D from ₹4,950 and a 4N/5D grand package covering Ooty, Valparai and Athirappilly. Stay, meals, transport and guide included.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Tour Packages — Ooty, Valparai & Athirappilly",
    description:
      "Comfortable, transparently priced hill station packages for families, couples, corporate groups and student trips.",
    url: "/packages",
    type: "website",
  },
};

export default function PackagesPage() {
  return <PackagesClient />;
}