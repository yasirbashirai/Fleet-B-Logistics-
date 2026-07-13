"use client";

import { useState } from "react";

export default function ApplyForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/apply", {
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

  if (status === "sent") {
    return (
      <div className="rounded-lg bg-emerald-50 p-8 text-center text-emerald-900">
        <p className="font-heading text-2xl font-extrabold">Application received! 🚛</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed">
          <strong>Check your email</strong>, your official FBL welcome letter is on its way with your next steps.
          You can start the onboarding kit right now:
        </p>
        <a href="#onboarding" className="btn-primary mt-6">Fill Out &amp; Sign the Kit Online →</a>
        <p className="mt-4 text-xs text-emerald-700">
          Prefer paper? <a href="/documents/fbl-owner-operator-onboarding-kit.pdf" className="underline">Download the PDF kit</a> and email it back.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="ap-name">Full Name *</label>
          <input id="ap-name" name="name" required className="field" placeholder="Full legal name" />
        </div>
        <div>
          <label className="field-label" htmlFor="ap-phone">Phone *</label>
          <input id="ap-phone" name="phone" type="tel" required className="field" placeholder="(561) 000-0000" />
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="ap-email">Email *</label>
        <input id="ap-email" name="email" type="email" required className="field" placeholder="you@email.com" />
        <p className="mt-1 text-xs text-slate-400">Your welcome packet goes here, double-check it.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="ap-cdl">CDL-A Experience *</label>
          <select id="ap-cdl" name="cdlExperience" required className="field">
            <option value="">Select…</option>
            <option>1–2 years</option>
            <option>3–5 years</option>
            <option>5–10 years</option>
            <option>10+ years</option>
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="ap-truck">Equipment *</label>
          <select id="ap-truck" name="equipment" required className="field">
            <option value="">Select…</option>
            <option>I own my truck</option>
            <option>I lease my truck</option>
            <option>Purchasing soon</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="ap-truckinfo">Truck Year / Make / Model</label>
          <input id="ap-truckinfo" name="truckInfo" className="field" placeholder="e.g. 2021 Freightliner Cascadia" />
        </div>
        <div>
          <label className="field-label" htmlFor="ap-location">Home Base (City, State) *</label>
          <input id="ap-location" name="homeBase" required className="field" placeholder="West Palm Beach, FL" />
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="ap-record">Safety Record *</label>
        <select id="ap-record" name="safetyRecord" required className="field">
          <option value="">Select…</option>
          <option>Clean, no accidents/violations (3 yrs)</option>
          <option>Minor violations only</option>
          <option>Prefer to discuss</option>
        </select>
      </div>
      <div>
        <label className="field-label" htmlFor="ap-notes">Anything we should know?</label>
        <textarea id="ap-notes" name="notes" rows={3} className="field" placeholder="Preferred lanes, home time needs, questions about the 20% pool…" />
      </div>
      <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-500">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-brand-red" value="yes" />
        I agree to be contacted by Fleet B Logistics LLC about my application and understand the 20% share pool
        program is subject to the terms of the Owner-Operator Equipment Lease Agreement. *
      </label>
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "Submitting…" : "Submit Application & Get Welcome Packet"}
      </button>
      {status === "error" && (
        <p className="text-sm font-semibold text-brand-red">
          Something went wrong, call recruiting 24/7 at (561) 460-5739.
        </p>
      )}
    </form>
  );
}
