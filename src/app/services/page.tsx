import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/data/services";
import { INDUSTRIES } from "@/data/industries";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero, QuoteSection, OwnerOperatorCTA, CredentialStrip } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Trucking & Freight Services — OTR, Dry Van, Expedited, Regional",
  description:
    "Fleet B Logistics services: OTR transportation, dry van freight, expedited time-critical loads, and Southeast regional trucking from West Palm Beach, FL.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Freight Services Run by"
        highlight="Owners"
        subtitle="Every FBL service is delivered by owner-operators with a direct stake in your freight arriving on time and intact."
        image="/images/hero-truck.jpg"
      />
      <CredentialStrip />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl space-y-16 px-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug}>
              <div className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative h-72 overflow-hidden rounded-2xl shadow-card lg:h-80">
                  <Image src={s.image} alt={s.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                  <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded bg-brand-red text-white shadow-card-red">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-extrabold uppercase text-brand-navy md:text-3xl">{s.name}</h2>
                  <p className="mt-4 leading-relaxed text-slate-600">{s.body[0]}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-4">
                    <Link href={`/services/${s.slug}`} className="btn-secondary !py-2.5 !text-xs">
                      Full Details
                    </Link>
                    <Link href="/quote" className="btn-primary !py-2.5 !text-xs">
                      Quote This Service
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Industry cross-links for SEO */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="text-center">
            <h2 className="font-heading text-2xl font-extrabold uppercase text-brand-navy md:text-3xl">
              Specialized by <span className="hl-red">Industry</span>
            </h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-brand-navy transition hover:border-brand-red hover:bg-brand-red hover:text-white"
              >
                {ind.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <OwnerOperatorCTA />
      <QuoteSection />
    </>
  );
}
