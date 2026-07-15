"use client";

import { useState } from "react";
import { FORM_API } from "@/lib/formApi";
import Link from "next/link";

// General contact form. If the sender selects "Owner-Operator, Lease On",
// it posts to /api/apply, which also auto-sends the welcome letter + kit link.
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [isDriver, setIsDriver] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const driver = data.topic === "Owner-Operator, Lease On";
    try {
      const res = await fetch(driver ? `${FORM_API}/apply` : `${FORM_API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setIsDriver(driver);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg bg-emerald-50 p-8 text-center text-emerald-900">
        <p className="font-heading text-xl font-bold">Message received! ✓</p>
        {isDriver ? (
          <>
            <p className="mt-2 text-sm">
              <strong>Check your inbox</strong>, your welcome letter from Fleet B Logistics is on its way, with the
              link to complete your onboarding kit online.
            </p>
            <Link href="/owner-operators#onboarding" className="btn-primary mt-5 !py-2.5 !text-xs">
              Start the Onboarding Kit Now
            </Link>
          </>
        ) : (
          <p className="mt-2 text-sm">We respond fast, usually within the hour, any hour.</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="cf-name">Name *</label>
          <input id="cf-name" name="name" required className="field" placeholder="Full name" />
        </div>
        <div>
          <label className="field-label" htmlFor="cf-phone">Phone *</label>
          <input id="cf-phone" name="phone" type="tel" required className="field" placeholder="(561) 000-0000" />
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="cf-email">Email *</label>
        <input id="cf-email" name="email" type="email" required className="field" placeholder="you@email.com" />
      </div>
      <div>
        <label className="field-label" htmlFor="cf-topic">I am contacting you about *</label>
        <select id="cf-topic" name="topic" required className="field">
          <option>Freight Quote / Shipping</option>
          <option>Owner-Operator, Lease On</option>
          <option>Existing Load / Dispatch</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="field-label" htmlFor="cf-message">Message *</label>
        <textarea id="cf-message" name="message" rows={5} required className="field" placeholder="How can we help?" />
      </div>
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-sm font-semibold text-brand-red">
          Something went wrong, call us 24/7 at (561) 460-5739.
        </p>
      )}
    </form>
  );
}
