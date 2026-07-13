"use client";

import { useState } from "react";

// Instant freight quote request form, placed on every major page.
// variant="light" for white cards, "dark" for navy sections.
export default function QuoteForm({
  variant = "light",
  compact = false,
}: {
  variant?: "light" | "dark";
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const dark = variant === "dark";

  if (status === "sent") {
    return (
      <div className={`rounded-lg p-8 text-center ${dark ? "bg-white/10 text-white" : "bg-emerald-50 text-emerald-900"}`}>
        <p className="font-heading text-xl font-bold">Quote request received! ✓</p>
        <p className="mt-2 text-sm opacity-80">
          Our dispatch team reviews quotes 24/7, expect a call or email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={`field-label ${dark ? "!text-white/80" : ""}`} htmlFor="qf-name">Name *</label>
          <input id="qf-name" name="name" required className="field" placeholder="Full name" />
        </div>
        <div>
          <label className={`field-label ${dark ? "!text-white/80" : ""}`} htmlFor="qf-company">Company</label>
          <input id="qf-company" name="company" className="field" placeholder="Company name" />
        </div>
        <div>
          <label className={`field-label ${dark ? "!text-white/80" : ""}`} htmlFor="qf-email">Email *</label>
          <input id="qf-email" name="email" type="email" required className="field" placeholder="you@company.com" />
        </div>
        <div>
          <label className={`field-label ${dark ? "!text-white/80" : ""}`} htmlFor="qf-phone">Phone *</label>
          <input id="qf-phone" name="phone" type="tel" required className="field" placeholder="(561) 000-0000" />
        </div>
        <div>
          <label className={`field-label ${dark ? "!text-white/80" : ""}`} htmlFor="qf-origin">Pickup City / ZIP *</label>
          <input id="qf-origin" name="origin" required className="field" placeholder="West Palm Beach, FL" />
        </div>
        <div>
          <label className={`field-label ${dark ? "!text-white/80" : ""}`} htmlFor="qf-destination">Delivery City / ZIP *</label>
          <input id="qf-destination" name="destination" required className="field" placeholder="Atlanta, GA" />
        </div>
        {!compact && (
          <>
            <div>
              <label className={`field-label ${dark ? "!text-white/80" : ""}`} htmlFor="qf-equipment">Equipment</label>
              <select id="qf-equipment" name="equipment" className="field">
                <option>53&apos; Dry Van</option>
                <option>Expedited</option>
                <option>Other / Not sure</option>
              </select>
            </div>
            <div>
              <label className={`field-label ${dark ? "!text-white/80" : ""}`} htmlFor="qf-date">Pickup Date</label>
              <input id="qf-date" name="pickupDate" type="date" className="field" />
            </div>
          </>
        )}
      </div>
      <div>
        <label className={`field-label ${dark ? "!text-white/80" : ""}`} htmlFor="qf-details">Freight Details</label>
        <textarea
          id="qf-details"
          name="details"
          rows={compact ? 2 : 3}
          className="field"
          placeholder="Commodity, weight, pallet count, special requirements…"
        />
      </div>
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Get My Freight Quote"}
      </button>
      {status === "error" && (
        <p className="text-sm font-semibold text-brand-red">
          Something went wrong. Please call us at (561) 460-5739, we answer 24/7.
        </p>
      )}
      <p className={`text-xs ${dark ? "text-white/50" : "text-slate-400"}`}>
        Quotes reviewed around the clock. No spam, ever.
      </p>
    </form>
  );
}
