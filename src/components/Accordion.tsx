"use client";

import { useState } from "react";

// Simple accordion used to fold long-form insight content into pages.
export default function Accordion({
  items,
}: {
  items: { title: string; content: React.ReactNode }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
      {items.map((it, i) => (
        <div key={i}>
          <button
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-slate-50"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-heading text-sm font-extrabold uppercase text-brand-navy md:text-base">
              {it.title}
            </span>
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-lg font-extrabold transition ${
                open === i ? "bg-brand-red text-white" : "bg-slate-100 text-brand-navy"
              }`}
            >
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div className="space-y-4 px-6 pb-6 text-sm leading-relaxed text-slate-600">{it.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
