"use client";

import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { Icon } from "./Icons";

// Mobile-only bottom action bar: call + quote + apply, always in reach
export default function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-slate-200 bg-white shadow-[0_-4px_20px_rgba(16,28,46,0.15)] lg:hidden">
      <a
        href={COMPANY.phoneHref}
        className="flex items-center justify-center gap-1.5 py-3 font-heading text-xs font-bold uppercase text-brand-navy"
      >
        <Icon name="phone" className="h-4 w-4 text-brand-red" /> Call 24/7
      </a>
      <Link
        href="/quote"
        className="flex items-center justify-center gap-1.5 bg-brand-blue py-3 font-heading text-xs font-bold uppercase text-white"
      >
        <Icon name="doc" className="h-4 w-4" /> Get Quote
      </Link>
      <Link
        href="/apply"
        className="flex items-center justify-center gap-1.5 bg-brand-red py-3 font-heading text-xs font-bold uppercase text-white"
      >
        <Icon name="truck" className="h-4 w-4" /> Lease On
      </Link>
    </div>
  );
}
