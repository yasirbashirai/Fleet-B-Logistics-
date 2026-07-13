import type { Metadata } from "next";
import Link from "next/link";
import { REGIONS } from "@/data/regions";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero, QuoteSection } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Service Areas — Florida & Southeast Trucking Coverage",
  description:
    "Fleet B Logistics service areas: West Palm Beach, Miami, Orlando, Tampa, Jacksonville, Atlanta, and the full Southeast — plus 48-state OTR coverage.",
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        label="Service Areas"
        title="Florida Roots,"
        highlight="48-State Reach"
        subtitle="Dense coverage where we live, dependable OTR lanes everywhere else."
        image="/images/truck-highway.jpg"
      />
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REGIONS.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/areas/${r.slug}`}
                  className="group flex h-full flex-col rounded-lg border-t-4 border-brand-red bg-white p-7 shadow-card transition hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-navy text-white">
                      <Icon name="pin" className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-heading text-lg font-extrabold uppercase text-brand-navy">{r.name}</h2>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{r.state}</p>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{r.intro[0].slice(0, 140)}…</p>
                  <p className="mt-4 flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-brand-red">
                    View coverage <Icon name="arrow" className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <QuoteSection />
    </>
  );
}
