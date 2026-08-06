"use client";

import { PACKAGES } from "@/app/data/tourPackage";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState, type FormEvent } from "react";


const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#E0A526] focus:ring-1 focus:ring-[#E0A526]";
const labelClass =
  "block text-xs font-medium uppercase tracking-wide text-white/60";

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Capture the form now — after `await`, currentTarget is null.
    const form = e.currentTarget;
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
      <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center">
        <p className="font-serif text-2xl text-white">Enquiry received</p>
        <p className="mt-3 text-sm text-white/70">
          Our team will call you with a day-wise itinerary and a firm quote.
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
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={`mt-1.5 ${field}`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            pattern="[0-9+\s-]{10,15}"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            className={`mt-1.5 ${field}`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email <span className="normal-case text-white/40">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`mt-1.5 ${field}`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="packageId">
            Package
          </label>
          <select
            id="packageId"
            name="packageId"
            defaultValue="2n3d"
            className={`mt-1.5 ${field} [&>option]:text-[#17211D]`}
          >
            {PACKAGES.map((p: { id: Key | readonly string[] | null | undefined; duration: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
              <option>
                {p.duration} — {p.title}
              </option>
            ))}
            <option value="custom">Custom itinerary</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="travelDate">
            Travel date
          </label>
          <input
            id="travelDate"
            name="travelDate"
            type="date"
            required
            className={`mt-1.5 scheme-dark ${field}`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="adults">
            Adults
          </label>
          <input
            id="adults"
            name="adults"
            type="number"
            min="1"
            max="200"
            defaultValue="2"
            required
            className={`mt-1.5 ${field}`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="children">
            Children
          </label>
          <input
            id="children"
            name="children"
            type="number"
            min="0"
            max="200"
            defaultValue="0"
            className={`mt-1.5 ${field}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">
            Anything we should know
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Pickup point, dietary needs, vehicle preference…"
            className={`mt-1.5 resize-none ${field}`}
          />
        </div>
      </div>

      {/* honeypot — hidden from people, filled by bots */}
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
        className="mt-6 w-full rounded-full bg-[#E0A526] px-6 py-3 text-sm font-semibold text-[#17211D] transition hover:bg-[#c98f1c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a quote"}
      </button>
    </form>
  );
}