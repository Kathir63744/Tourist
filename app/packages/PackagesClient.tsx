"use client";

// app/packages/PackagesClient.tsx
// Self-contained: data, estimator, enquiry form and all page sections.
//
// ── LOOK ─────────────────────────────────────────────────────────────────
// Background: /public/ba.jpg, fixed, with a dark overlay. Content sits on
// translucent glass panels so the photo stays visible throughout.
//
// Fonts: NO font-family classes anywhere — headings and body inherit
// whatever layout.tsx sets, so this page matches the rest of the site.
//
// Enquiries go to EMAIL ONLY, via POST to /api/packages/enquiry.
// No WhatsApp anywhere on this page.
// ─────────────────────────────────────────────────────────────────────────

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import TouristFooter from "../components/Footer";
import { Mountain } from "lucide-react";

/* ── DATA ──────────────────────────────────────────────────────────────── */

type PackageId = "1n2d" | "2n3d" | "4n5d";

interface TourPackage {
  id: PackageId;
  nights: number;
  days: number;
  duration: string;
  title: string;
  badge?: string;
  destinations: string[];
  price: number;
  featured?: boolean;
  blurb: string;
  highlights: string[];
}

interface Quote {
  packageId: string;
  destination: string;
  adults: number;
  children: number;
}

const PARTNER = {
  name: "Zoy Tours",
  tagline: "Discover the Beauty of the Western Ghats",
  subline:
    "Explore Ooty, Valparai & Athirappilly with Comfort, Safety & Great Hospitality",
  phone: "+91 90000 00000", // TODO: real number
  email: "bookings@valparaihelpline.com", // TODO: real address
};

const PACKAGES: TourPackage[] = [
  {
    id: "1n2d",
    nights: 1,
    days: 2,
    duration: "1 Night / 2 Days",
    title: "Valparai or Ooty",
    destinations: ["Valparai", "Ooty"],
    price: 2950,
    blurb:
      "A short, well-paced first taste of the hills — pickup, sightseeing, stay and meals handled end to end.",
    highlights: [
      "Pickup from Coimbatore or Pollachi (Valparai)",
      "Pickup from Coimbatore or Mettupalayam (Ooty)",
      "Private transportation",
      "Standard/Deluxe accommodation",
      "Professional tour guide",
      "Sightseeing",
      "All meals included",
    ],
  },
  {
    id: "2n3d",
    nights: 2,
    days: 3,
    duration: "2 Nights / 3 Days",
    title: "Valparai or Ooty",
    destinations: ["Valparai", "Ooty"],
    price: 4950,
    blurb:
      "Enjoy a relaxed holiday with additional sightseeing, more leisure time, and comfortable accommodation while exploring the scenic beauty of the Nilgiris and Anamalai Hills.",
    highlights: [
      "Everything in the 1 Night / 2 Days package",
      "Extended sightseeing across both days",
      "More leisure time between viewpoints",
      "Standard/Deluxe accommodation for two nights",
      "Private transportation throughout",
      "All meals included",
    ],
  },
  {
    id: "4n5d",
    nights: 4,
    days: 5,
    duration: "4 Nights / 5 Days",
    title: "Ooty + Valparai + Athirappilly",
    badge: "Grand Package",
    destinations: ["Ooty + Valparai + Athirappilly"],
    price: 9999,
    featured: true,
    blurb:
      "Experience the best of South India's hill stations and waterfalls in one unforgettable journey.",
    highlights: [
      "Three destinations in one continuous route",
      "Nilgiris, Anamalai Hills and the Chalakudy waterfalls",
      "Standard/Deluxe accommodation for four nights",
      "Private transportation throughout",
      "Professional driver and tour guide",
      "All meals included",
    ],
  },
];

const ATTRACTIONS: { id: string; label: string; places: string[] }[] = [
  {
    id: "valparai",
    label: "Valparai & Athirappilly",
    places: [
      "Aliyar Dam",
      "Monkey Falls",
      "40 Hairpin Bends",
      "Loam's View Point",
      "Nallamudi View Point",
      "Tea Estates",
      "Balaji Temple",
      "Hornbill View Point (Attakatti)",
      "Sholayar Dam",
      "Thalanar View Point",
      "Chinnakallar",
      "Athirappilly Waterfalls",
      "Vazhachal Waterfalls",
      "Charpa Waterfalls",
      "Malakkappara",
    ],
  },
  {
    id: "ooty",
    label: "Ooty",
    places: [
      "Botanical Garden",
      "Rose Garden",
      "Doddabetta Peak",
      "Tea Factory & Tea Museum",
      "Ooty Lake",
      "Pine Forest",
      "Shooting Point",
      "Pykara Lake",
      "Pykara Waterfalls",
      "Wenlock Downs",
      "Emerald Lake",
      "Avalanche",
      "Coonoor",
      "Sim's Park",
      "Dolphin's Nose",
      "Lamb's Rock",
      "Tea Gardens",
    ],
  },
];

const INCLUSIONS: string[] = [
  "Standard or Deluxe accommodation (4-sharing basis)",
  "Private Cab / SUV / Tempo Traveller / Coach Bus",
  "Pickup & Drop",
  "Professional Driver",
  "Professional Tour Guide",
  "Welcome Drink",
  "Vegetarian Breakfast",
  "Vegetarian & Non-Vegetarian Lunch",
  "Vegetarian & Non-Vegetarian Dinner",
  "Evening Tea & Snacks",
  "Fuel Charges",
  "Toll Charges",
  "Parking Charges",
  "Driver Allowance",
  "Sightseeing as per itinerary",
  "Vehicle Taxes",
];

const EXCLUSIONS: string[] = [
  "Entry tickets to tourist attractions",
  "Boating & Safari charges",
  "Adventure activities",
  "Camera fees",
  "Personal expenses",
  "Laundry & Room Service",
  "Shopping expenses",
  "Travel Insurance",
  "Medical expenses",
  "Expenses arising due to weather, landslides, road closures, strikes, or other unforeseen circumstances",
  'Anything not mentioned under "Package Inclusions"',
];

const CHILD_POLICY: { range: string; rule: string; rate: number }[] = [
  {
    range: "Below 4 years",
    rule: "Complimentary (without separate bed/seat)",
    rate: 0,
  },
  { range: "4 to 8 years", rule: "60% of the adult package cost", rate: 0.6 },
  { range: "8 years and above", rule: "Full adult charges", rate: 1 },
];

const HOTEL_POLICY = {
  checkIn: "12:00 PM",
  checkOut: "11:00 AM",
  note: "Room allocation is on a 4-sharing basis. Double and triple occupancy can be arranged at additional cost, subject to availability.",
};

const GOOD_FOR: string[] = [
  "Families",
  "Couples",
  "Friends",
  "Corporate Tours",
  "School & College Trips",
  "Pilgrimage Groups",
  "Adventure Enthusiasts",
];

const WHY_US: string[] = [
  "Carefully planned itineraries",
  "Comfortable and hygienic accommodation",
  "Delicious home-style meals",
  "Experienced local guides",
  "Safe and reliable transportation",
  "Transparent pricing with no hidden charges",
  "Suitable for groups of 5 to 100+ guests",
];

const RAW_API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const API = RAW_API.replace(/\/+$/, "").replace(/\/api$/, "");
const MID_RATE = 0.6;
const inr = (n: number): string => "\u20B9" + n.toLocaleString("en-IN");

/* Reused surface styles */
const GLASS =
  "rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md";
const CHIP =
  "rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-sm text-white/85";

/* ── BACKGROUND ────────────────────────────────────────────────────────── */
/* If layout.tsx already renders ba.jpg site-wide, delete this component and
   its <PageBackground /> usage below — otherwise you'll stack two copies. */
function PageBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10">
      <Image
        src="/ba.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
    </div>
  );
}

/* ── SHARED BITS ───────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E0A526]">
      {children}
    </p>
  );
}

function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-white/70">{lead}</p>}
    </div>
  );
}

/* The road to Valparai has 40 hairpin bends — the one motif on the page. */
function HairpinRule() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      className="h-6 w-full text-white/20"
    >
      <path
        d="M0 20 L20 4 L40 20 L60 4 L80 20 L100 4 L120 20 L140 4 L160 20 L180 4 L200 20 L220 4 L240 20 L260 4 L280 20 L300 4 L320 20 L340 4 L360 20 L380 4 L400 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function PackageCard({ pkg }: { pkg: TourPackage }) {
  const f = pkg.featured;
  return (
    <article
      className={`flex flex-col rounded-2xl border p-6 backdrop-blur-md transition sm:p-8 ${
        f
          ? "border-[#E0A526]/45 bg-[#E0A526]/[0.12]"
          : "border-white/15 bg-white/[0.07] hover:border-white/30"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-2xl font-bold text-white">{pkg.duration}</p>
          <p className="mt-1 text-sm text-white/65">{pkg.title}</p>
        </div>
        {pkg.badge && (
          <span className="shrink-0 rounded-full bg-[#E0A526] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-black">
            {pkg.badge}
          </span>
        )}
      </div>

      <div className="mt-6 border-t border-white/15 pt-5">
        <p className="text-xs uppercase tracking-wide text-white/55">
          Starting from
        </p>
        <p className="mt-1 text-4xl font-bold leading-none text-white">
          {inr(pkg.price)}
          <span className="ml-2 align-middle text-sm font-normal text-white/55">
            per person
          </span>
        </p>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-white/70">{pkg.blurb}</p>

      <ul className="mt-5 space-y-2 text-sm">
        {pkg.highlights.map((h: string) => (
          <li key={h} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#E0A526]"
            />
            <span className="text-white/85">{h}</span>
          </li>
        ))}
      </ul>

      <a
        href="#plan"
        className={`mt-7 block rounded-full px-5 py-3 text-center text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          f
            ? "bg-[#E0A526] text-black hover:bg-[#c98f1c]"
            : "border border-white/25 text-white hover:bg-white/10"
        }`}
      >
        Check price for your group
      </a>
    </article>
  );
}

/* ── ESTIMATOR ─────────────────────────────────────────────────────────── */

function Stepper({
  label,
  hint,
  value,
  onChange,
  min = 0,
  max = 60,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const btn =
    "h-8 w-8 rounded-full text-lg leading-none text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0A526] disabled:opacity-30";
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        {hint && <p className="text-xs text-white/55">{hint}</p>}
      </div>
      <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.06] p-1">
        <button
          type="button"
          aria-label={`Remove one ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={btn}
        >
          &minus;
        </button>
        <span className="w-8 text-center text-sm font-semibold tabular-nums text-white">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Add one ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={btn}
        >
          +
        </button>
      </div>
    </div>
  );
}

function PackageEstimator({
  onContinue,
}: {
  onContinue: (quote: Quote) => void;
}) {
  const [packageId, setPackageId] = useState<PackageId>("2n3d");
  const [destination, setDestination] = useState<string | null>(null);
  const [adults, setAdults] = useState(2);
  const [kidsMid, setKidsMid] = useState(0);
  const [kidsFree, setKidsFree] = useState(0);

  const pkg =
    PACKAGES.find((p: TourPackage) => p.id === packageId) ?? PACKAGES[0];
  const place = destination ?? pkg.destinations[0];

  const total = useMemo(
    () => Math.round(adults * pkg.price + kidsMid * pkg.price * MID_RATE),
    [adults, kidsMid, pkg.price]
  );

  const heads = adults + kidsMid + kidsFree;

  function handleContinue() {
    onContinue({
      packageId,
      destination: place,
      adults,
      children: kidsMid + kidsFree,
    });
    document
      .getElementById("enquire")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={`overflow-hidden ${GLASS}`}>
      <div className="grid md:grid-cols-5">
        <div className="p-6 sm:p-8 md:col-span-3">
          <Eyebrow>Estimate your trip</Eyebrow>
          <h3 className="mt-2 text-2xl font-bold text-white">
            Pick a package, then add your people
          </h3>

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-white">Package</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {PACKAGES.map((p: TourPackage) => {
                const on = p.id === packageId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setPackageId(p.id);
                      setDestination(p.destinations[0]);
                    }}
                    className={`rounded-xl border px-3 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0A526] ${
                      on
                        ? "border-[#E0A526] bg-[#E0A526] text-black"
                        : "border-white/20 bg-white/[0.06] text-white hover:border-white/40"
                    }`}
                  >
                    <span className="block text-sm font-semibold">
                      {p.nights}N / {p.days}D
                    </span>
                    <span
                      className={`block text-xs ${
                        on ? "text-black/70" : "text-white/60"
                      }`}
                    >
                      from {inr(p.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {pkg.destinations.length > 1 && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-white">Destination</p>
              <div className="flex flex-wrap gap-2">
                {pkg.destinations.map((d: string) => {
                  const on = d === place;
                  return (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setDestination(d)}
                      className={`rounded-full border px-4 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0A526] ${
                        on
                          ? "border-[#E0A526] bg-[#E0A526] text-black"
                          : "border-white/20 bg-white/[0.06] text-white hover:border-white/40"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-5 divide-y divide-white/10 border-t border-white/15">
            <Stepper
              label="Adults"
              hint="8 years and above"
              value={adults}
              min={1}
              onChange={setAdults}
            />
            <Stepper
              label="Children"
              hint="4 to 8 years — 60% of adult cost"
              value={kidsMid}
              onChange={setKidsMid}
            />
            <Stepper
              label="Infants"
              hint="Below 4 years — complimentary, no separate bed or seat"
              value={kidsFree}
              onChange={setKidsFree}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between border-t border-white/15 bg-black/35 p-6 text-white sm:p-8 md:col-span-2 md:border-l md:border-t-0">
          <div>
            <Eyebrow>Your estimate</Eyebrow>
            <p className="mt-4 text-4xl font-bold leading-none">{inr(total)}</p>
            <p className="mt-2 text-sm text-white/70">
              {heads} {heads === 1 ? "guest" : "guests"} &middot; {pkg.nights}{" "}
              {pkg.nights === 1 ? "night" : "nights"} &middot; {place}
            </p>

            <dl className="mt-6 space-y-2 border-t border-white/15 pt-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-white/70">
                  Adults &times; {inr(pkg.price)}
                </dt>
                <dd className="tabular-nums">{inr(adults * pkg.price)}</dd>
              </div>
              {kidsMid > 0 && (
                <div className="flex justify-between gap-4">
                  <dt className="text-white/70">
                    Children (4&ndash;8) &times;{" "}
                    {inr(Math.round(pkg.price * MID_RATE))}
                  </dt>
                  <dd className="tabular-nums">
                    {inr(Math.round(kidsMid * pkg.price * MID_RATE))}
                  </dd>
                </div>
              )}
              {kidsFree > 0 && (
                <div className="flex justify-between gap-4">
                  <dt className="text-white/70">Infants (below 4)</dt>
                  <dd className="tabular-nums">Free</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleContinue}
              className="w-full rounded-full bg-[#E0A526] px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-[#c98f1c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Continue to enquiry
            </button>
            <p className="mt-3 text-center text-xs text-white/55">
              Indicative only. Final cost depends on dates, occupancy and
              vehicle type.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── ENQUIRY FORM (email only) ─────────────────────────────────────────── */

type Status = "idle" | "sending" | "sent" | "error";

const fieldCls =
  "w-full rounded-lg border border-white/20 bg-black/30 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#E0A526] focus:ring-1 focus:ring-[#E0A526]";
const labelCls =
  "block text-xs font-medium uppercase tracking-wide text-white/60";

function EnquiryForm({ quote }: { quote: Quote }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Controlled so the estimator can fill these in when the user continues.
  const [packageId, setPackageId] = useState(quote.packageId);
  const [adults, setAdults] = useState(quote.adults);
  const [children, setChildren] = useState(quote.children);

  useEffect(() => {
    setPackageId(quote.packageId);
    setAdults(quote.adults);
    setChildren(quote.children);
  }, [quote]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // capture before await
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");

    try {
      const res = await fetch(`${API}/api/packages/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          message?: string;
        };
        throw new Error(body.message ?? "Request failed");
      }
      form.reset();
      setStatus("sent");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(
        msg === "Failed to fetch"
          ? "Couldn't reach the server. Check your connection and try again."
          : msg
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={`${GLASS} p-8 text-center`}>
        <p className="text-2xl font-bold text-white">Enquiry sent</p>
        <p className="mt-3 text-sm text-white/70">
          It&rsquo;s in our inbox. Our team will reply with a day-wise itinerary
          and a firm quote.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-[#E0A526] underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${GLASS} p-6 sm:p-8`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={`mt-1.5 ${fieldCls}`}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            
            autoComplete="tel"
            placeholder="10-digit mobile number"
            className={`mt-1.5 ${fieldCls}`}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={`mt-1.5 ${fieldCls}`}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="packageId">
            Package
          </label>
          <select
            id="packageId"
            name="packageId"
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
            className={`mt-1.5 ${fieldCls} [&>option]:text-black`}
          >
            {PACKAGES.map((p: TourPackage) => (
              <option key={p.id} value={p.id}>
                {p.duration} — {p.title}
              </option>
            ))}
            <option value="custom">Custom itinerary</option>
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="travelDate">
            Travel date
          </label>
          <input
            id="travelDate"
            name="travelDate"
            type="date"
            required
            className={`mt-1.5 scheme-dark ${fieldCls}`}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="adults">
            Adults
          </label>
          <input
            id="adults"
            name="adults"
            type="number"
            min="1"
            max="200"
            required
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className={`mt-1.5 ${fieldCls}`}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="children">
            Children
          </label>
          <input
            id="children"
            name="children"
            type="number"
            min="0"
            max="200"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className={`mt-1.5 ${fieldCls}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="message">
            Anything we should know
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Pickup point, dietary needs, vehicle preference…"
            className={`mt-1.5 resize-none ${fieldCls}`}
          />
        </div>
      </div>

      {/* Carried over from the estimator */}
      <input type="hidden" name="destination" value={quote.destination} />

      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-[#FFB4A2]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full bg-[#E0A526] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#c98f1c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      <p className="mt-3 text-center text-xs text-white/50">
        Goes straight to our booking inbox. We reply by email or phone.
      </p>
    </form>
  );
}

/* ── PAGE ──────────────────────────────────────────────────────────────── */

export default function PackagesClient() {
  const [quote, setQuote] = useState<Quote>({
    packageId: "2n3d",
    destination: "Valparai",
    adults: 2,
    children: 0,
  });

  return (
    <main className="relative min-h-screen text-white">
      <PageBackground />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">


        <p className="mt-6 text-3xl font-bold uppercase tracking-[0.2em] text-[#E0A526] sm:text-4xl">
          {PARTNER.name}
        </p>

        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] text-white sm:text-6xl">
          {PARTNER.tagline}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/80">
          {PARTNER.subline}
        </p>
        <p className="mt-6 max-w-3xl text-white/65">
          Whether you&rsquo;re planning a family vacation, a romantic getaway, a
          friends&rsquo; trip, a corporate outing, or a school or college
          excursion, {PARTNER.name} offers carefully curated travel packages
          that combine breathtaking landscapes, comfortable accommodation,
          delicious food, and hassle-free transportation.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#packages"
            className="rounded-full bg-[#E0A526] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#c98f1c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            See the packages
          </a>
          <a
            href={`tel:${PARTNER.phone.replace(/\s/g, "")}`}
            className="rounded-full border border-white/30 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Call {PARTNER.phone}
          </a>
        </div>

        <dl
          className={`mt-14 grid overflow-hidden ${GLASS} divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0`}
        >
          {PACKAGES.map((p: TourPackage) => (
            <div key={p.id} className="px-5 py-4">
              <dt className="text-xs uppercase tracking-wide text-white/55">
                {p.duration}
              </dt>
              <dd className="mt-1 text-2xl font-bold text-white">
                {inr(p.price)}
                <span className="ml-1.5 text-xs font-normal text-white/55">
                  / person
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <HairpinRule />
      </div>

      {/* PACKAGES */}
      <section id="packages" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <SectionHead
          eyebrow={`${PARTNER.name} tour packages`}
          title="Three routes through the Western Ghats"
          lead="Pricing is per person and covers stay, meals, private transport and a guide. Nothing is added at the end of the trip."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((p: TourPackage) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </section>

      {/* ESTIMATOR */}
      <section
        id="plan"
        className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-16 sm:px-8"
      >
        <PackageEstimator onContinue={setQuote} />
      </section>

      {/* ATTRACTIONS */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <SectionHead
          eyebrow="Where you'll go"
          title="Places covered on these routes"
          lead="Sightseeing follows the itinerary for your package and the season. Your guide will confirm the day-wise plan before you travel."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {ATTRACTIONS.map(
            (group: { id: string; label: string; places: string[] }) => (
              <div key={group.id} className={`${GLASS} p-6 sm:p-8`}>
                <h3 className="text-2xl font-bold text-white">{group.label}</h3>
                <p className="mt-1 text-sm text-white/55">
                  {group.places.length} stops
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.places.map((place: string) => (
                    <li key={place} className={CHIP}>
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </section>

      {/* INCLUSIONS / EXCLUSIONS */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <SectionHead
          eyebrow="What the price covers"
          title="Included, and not included"
          lead="Read both columns before you book. Everything outside the left column is paid on the spot."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E0A526]/35 bg-[#E0A526]/[0.09] p-6 backdrop-blur-md sm:p-8">
            <h3 className="text-xl font-bold text-white">Package inclusions</h3>
            <ul className="mt-5 space-y-3">
              {INCLUSIONS.map((item: string) => (
                <li key={item} className="flex gap-3 text-sm text-white/85">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E0A526] text-[11px] font-bold text-black"
                  >
                    &#10003;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${GLASS} p-6 sm:p-8`}>
            <h3 className="text-xl font-bold text-white">Package exclusions</h3>
            <ul className="mt-5 space-y-3">
              {EXCLUSIONS.map((item: string) => (
                <li key={item} className="flex gap-3 text-sm text-white/60">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/25 text-[11px] font-bold text-white/50"
                  >
                    &#10005;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* POLICIES */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <SectionHead eyebrow="Before you book" title="Child and hotel policy" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className={`${GLASS} p-6 sm:p-8`}>
            <h3 className="text-xl font-bold text-white">Child policy</h3>
            <dl className="mt-5 divide-y divide-white/10">
              {CHILD_POLICY.map(
                (c: { range: string; rule: string; rate: number }) => (
                  <div
                    key={c.range}
                    className="flex flex-wrap items-baseline justify-between gap-2 py-3"
                  >
                    <dt className="text-sm font-medium text-white">
                      {c.range}
                    </dt>
                    <dd className="text-sm text-white/65">{c.rule}</dd>
                  </div>
                )
              )}
            </dl>
          </div>

          <div className={`${GLASS} p-6 sm:p-8`}>
            <h3 className="text-xl font-bold text-white">Hotel policy</h3>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-wide text-white/55">
                  Check-in
                </p>
                <p className="mt-1 text-2xl font-bold text-white">
                  {HOTEL_POLICY.checkIn}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-wide text-white/55">
                  Check-out
                </p>
                <p className="mt-1 text-2xl font-bold text-white">
                  {HOTEL_POLICY.checkOut}
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              {HOTEL_POLICY.note}
            </p>
          </div>
        </div>
      </section>

      {/* PERFECT FOR + WHY US */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Perfect for</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Groups of 5 to 100+ guests
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {GOOD_FOR.map((g: string) => (
                <li key={g} className={`${CHIP} px-4 py-2`}>
                  {g}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Eyebrow>Why choose {PARTNER.name}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Local knowledge, transparent pricing
            </h2>
            <ul className="mt-6 space-y-3">
              {WHY_US.map((w: string) => (
                <li key={w} className="flex gap-3 text-sm text-white/85">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#E0A526]"
                  />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ENQUIRY / CTA */}
      <section
        id="enquire"
        className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-8"
      >
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div>
            <Eyebrow>Book your next adventure with {PARTNER.name}</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-tight text-white">
              Travel. Explore. Experience.
              <br />
              Create memories that last a lifetime.
            </h2>
            <p className="mt-5 text-white/70">
              Tell us your dates and group size. We&rsquo;ll come back with a
              day-wise itinerary, vehicle option and a firm quote &mdash;
              usually within a few hours.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${PARTNER.email}`}
                className="rounded-full border border-white/30 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Email us directly
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-white/30 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact page
              </Link>
            </div>
          </div>

          <EnquiryForm quote={quote} />
        </div>
      </section>

{/* Footer */}
<footer className="py-12 border-t border-white/10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <div className="flex items-center gap-2 mb-2">
          <Mountain className="w-6 h-6 text-teal-400" />
          <span className="text-xl font-bold text-white">Zoy Tours</span>
        </div>
        <p className="text-white/70 text-sm">Luxury hill station experiences redefined</p>
      </div>
      
      <div className="flex items-center gap-6">
        <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Privacy Policy</a>
        <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Terms of Service</a>
        <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Contact Us</a>
      </div>
      
      <div className="text-white/70 text-sm">
        Designed By{" "}
        <a 
          href="https://blackstoneinfomatics.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
        >
          Blackstone Infomatics
        </a>
      </div>
    </div>
  </div>
</footer>
    </main>
  );
}