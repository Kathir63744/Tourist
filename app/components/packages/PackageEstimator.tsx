"use client";

import { PackageId, PACKAGES, CHILD_POLICY, PARTNER } from "@/app/data/tourPackage";
import {  SetStateAction, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useMemo, useState } from "react";


const inr = (n: number): string => "\u20B9" + n.toLocaleString("en-IN");

interface StepperProps {
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

function Stepper({
  label,
  hint,
  value,
  onChange,
  min = 0,
  max = 60,
}: StepperProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-[#17211D]">{label}</p>
        {hint && <p className="text-xs text-[#5C6B64]">{hint}</p>}
      </div>
      <div className="flex items-center gap-1 rounded-full border border-[#DCE5E0] bg-white p-1">
        <button
          type="button"
          aria-label={`Remove one ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="h-8 w-8 rounded-full text-lg leading-none text-[#0B3B2E] transition hover:bg-[#F2F5F3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6F52] disabled:opacity-30"
        >
          &minus;
        </button>
        <span className="w-8 text-center text-sm font-semibold tabular-nums text-[#0B3B2E]">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Add one ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="h-8 w-8 rounded-full text-lg leading-none text-[#0B3B2E] transition hover:bg-[#F2F5F3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6F52] disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}

interface PackageEstimatorProps {
  defaultPackageId?: PackageId;
}

export default function PackageEstimator({
  defaultPackageId = "2n3d",
}: PackageEstimatorProps) {
  const [packageId, setPackageId] = useState<PackageId>(defaultPackageId);
  const [destination, setDestination] = useState<string | null>(null);
  const [adults, setAdults] = useState(2);
  const [kidsMid, setKidsMid] = useState(0); // 4–8 yrs
  const [kidsFree, setKidsFree] = useState(0); // under 4 yrs

  const pkg = PACKAGES.find((p: { id: any; }) => p.id === packageId) ?? PACKAGES[0];
  const place = destination ?? pkg.destinations[0];

  const midRate = CHILD_POLICY.find((c: { rate: number; }) => c.rate === 0.6)?.rate ?? 0.6;

  const total = useMemo(
    () => Math.round(adults * pkg.price + kidsMid * pkg.price * midRate),
    [adults, kidsMid, pkg.price, midRate]
  );

  const heads = adults + kidsMid + kidsFree;

  const message = encodeURIComponent(
    `Hi ${PARTNER.name}, I'd like to book the ${pkg.duration} package for ${place}.\n` +
      `Guests: ${adults} adult(s)` +
      (kidsMid ? `, ${kidsMid} child (4-8 yrs)` : "") +
      (kidsFree ? `, ${kidsFree} child (below 4 yrs)` : "") +
      `\nEstimated cost: ${inr(total)}. Please confirm availability.`
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-[#DCE5E0] bg-[#F2F5F3] shadow-sm">
      <div className="grid gap-0 md:grid-cols-5">
        {/* Controls */}
        <div className="p-6 sm:p-8 md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1F6F52]">
            Estimate your trip
          </p>
          <h3 className="mt-2 font-serif text-2xl text-[#0B3B2E]">
            Pick a package, then add your people
          </h3>

          {/* Package choice */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-[#17211D]">Package</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {PACKAGES.map((p: { id: any; destinations: SetStateAction<string | null>[]; nights: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; days: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: number; }) => {
                const active = p.id === packageId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setPackageId(p.id);
                      setDestination(p.destinations[0]);
                    }}
                    aria-pressed={active}
                    className={`rounded-xl border px-3 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6F52] ${
                      active
                        ? "border-[#0B3B2E] bg-[#0B3B2E] text-white"
                        : "border-[#DCE5E0] bg-white text-[#17211D] hover:border-[#1F6F52]"
                    }`}
                  >
                    <span className="block text-sm font-semibold">
                      {p.nights}N / {p.days}D
                    </span>
                    <span
                      className={`block text-xs ${
                        active ? "text-white/70" : "text-[#5C6B64]"
                      }`}
                    >
                      from {inr(p.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Destination choice */}
          {pkg.destinations.length > 1 && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-[#17211D]">
                Destination
              </p>
              <div className="flex flex-wrap gap-2">
                {pkg.destinations.map((d: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | ((prevState: string | null) => string | null) | null | undefined) => {
                  const active = d === place;
                  return (
                    <button
                      
                      aria-pressed={active}
                      className={`rounded-full border px-4 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6F52] ${
                        active
                          ? "border-[#1F6F52] bg-[#1F6F52] text-white"
                          : "border-[#DCE5E0] bg-white text-[#17211D] hover:border-[#1F6F52]"
                      }`}
                    >
                      
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Guests */}
          <div className="mt-5 divide-y divide-[#DCE5E0] border-t border-[#DCE5E0]">
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

        {/* Summary */}
        <div className="flex flex-col justify-between border-t border-[#DCE5E0] bg-[#0B3B2E] p-6 text-white sm:p-8 md:col-span-2 md:border-l md:border-t-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E0A526]">
              Your estimate
            </p>
            <p className="mt-4 font-serif text-4xl leading-none">{inr(total)}</p>
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
                    {inr(Math.round(pkg.price * midRate))}
                  </dt>
                  <dd className="tabular-nums">
                    {inr(Math.round(kidsMid * pkg.price * midRate))}
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
            <a
              href={`https://wa.me/${PARTNER.whatsapp}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full bg-[#E0A526] px-6 py-3 text-center text-sm font-semibold text-[#17211D] transition hover:bg-[#c98f1c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Send this on WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-white/60">
              Indicative only. Final cost depends on dates, occupancy and
              vehicle type.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}