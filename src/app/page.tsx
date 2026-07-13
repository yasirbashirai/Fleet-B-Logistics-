import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { FMT } from "@/lib/rates";
import { SERVICES } from "@/data/services";
import { INDUSTRIES } from "@/data/industries";
import { REGIONS } from "@/data/regions";
import { REVIEWS } from "@/data/reviews";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { MetricsBand, QuoteSection, OwnerOperatorCTA, CredentialStrip } from "@/components/Sections";

export const metadata: Metadata = {
  title: `${COMPANY.shortName}, Asset-Based OTR Trucking Company in West Palm Beach, FL`,
  description: `${COMPANY.description} Call ${COMPANY.phone}, dispatch 24/7.`,
};

const WHY = [
  {
    icon: "shield",
    title: "Honesty Is What We Stand On",
    text: "Our tagline is our operating system: transparent rates for shippers, audited settlements for drivers, zero games.",
  },
  {
    icon: "truck",
    title: "100% Owner-Operated Fleet",
    text: "Every truck is driven by an owner with skin in the game, accountability no hourly fleet can match.",
  },
  {
    icon: "dollar",
    title: `${FMT.pool} Net Revenue Share Pool`,
    text: `The industry's boldest loyalty program: after ${FMT.poolYears} of service, our owner-operators share ${FMT.pool} of company net revenue.`,
  },
  {
    icon: "clock",
    title: "24/7 Dispatch & Support",
    text: "Freight doesn't keep office hours and neither do we. A real person answers, day or night.",
  },
  {
    icon: "badge",
    title: "Asset-Based Authority",
    text: `USDOT #${COMPANY.usdot} · MC #${COMPANY.mc}. We commit our own equipment, not promises shopped on a load board.`,
  },
  {
    icon: "eye",
    title: "Total Transparency",
    text: "Rated freight bills open to inspection, itemized settlements, and full pool audit rights. See everything.",
  },
];

const STEPS = [
  { n: "01", title: "Request Your Quote", text: "60-second form or one call to 24/7 dispatch. Real numbers, fast." },
  { n: "02", title: "We Assign the Truck", text: "An owner-operator from our own fleet is committed to your load, no reselling." },
  { n: "03", title: "Track to Delivery", text: "Proactive check calls and ELD tracking from pickup to signed POD." },
  { n: "04", title: "Clean Paperwork", text: "POD and invoicing within 24 hours. Your freight file, closed clean." },
];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO, flyer-style ============ */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <Image
          src="/images/truck-blue-highway.jpg"
          alt="Fleet B Logistics semi truck on the highway"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-blueDark/40" />
        {/* Diagonal accents from the flyer geometry */}
        <div className="absolute -right-24 bottom-0 hidden h-[130%] w-64 -skew-x-12 bg-brand-blue/20 lg:block" />
        <div className="absolute -right-44 bottom-0 hidden h-[130%] w-24 -skew-x-12 bg-brand-red/70 lg:block" />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 md:pb-32 md:pt-24">
          <p className="flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-[0.3em] text-brand-redLight md:text-sm">
            <span className="h-px w-10 bg-brand-red" /> Asset-Based Carrier · West Palm Beach, FL
          </p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-extrabold uppercase leading-[1.08] md:text-6xl">
            Navigate Your <span className="hl-red">Logistics</span>
            <br />
            With <span className="hl-red">FBL</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            Over-the-road freight moved by a <strong>100% owner-operated</strong> fleet, with 24/7 dispatch,
            transparent pricing, and delivery discipline your supply chain can build on.
          </p>
          <p className="mt-3 font-heading text-sm font-bold uppercase tracking-widest text-brand-blueLight">
            “{COMPANY.tagline}”
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href="/quote" className="btn-primary">
              Get an Instant Quote <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href="/owner-operators" className="btn-secondary">
              Join the {FMT.pool} Share Pool
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-wider text-white/70">
            <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-red" /> 24/7 Dispatch</span>
            <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-red" /> Fully Insured</span>
            <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-red" /> USDOT #{COMPANY.usdot}</span>
            <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-red" /> Southeast + 48 States</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-2 w-full bg-red-gradient" />
      </section>

      <CredentialStrip />

      {/* ============ SERVICES, dark band like the flyer ============ */}
      <section className="bg-brand-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="section-label">What We Move</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase md:text-4xl">
              Freight <span className="hl-blue">Solutions</span> Built for Shippers
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 90}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group block h-full overflow-hidden rounded-lg bg-brand-navyLight ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-brand-red"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navyLight to-transparent" />
                    <span className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded bg-brand-red text-white shadow-card-red">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-extrabold uppercase leading-snug">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{s.short}</p>
                    <p className="mt-4 flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-brand-redLight">
                      Learn more <Icon name="arrow" className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MetricsBand />

      {/* ============ WHY PARTNER, blue gradient panel like the flyer ============ */}
      <section className="relative overflow-hidden bg-blue-gradient py-20 text-white">
        <div className="absolute -left-16 top-0 h-full w-48 -skew-x-12 bg-white/5" />
        <div className="relative mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="section-label !text-white/80">The FBL Difference</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase md:text-4xl">
              Why Partner With <span className="hl-red">FBL</span>?
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 70} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white/15 ring-1 ring-white/25">
                  <Icon name={w.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-extrabold uppercase">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/80">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 20% SHARE POOL feature ============ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
          <Reveal>
            <p className="section-label">For Owner-Operators</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase leading-tight text-brand-navy md:text-4xl">
              Drive Your Success.
              <br />
              <span className="hl-red">Share Our Growth.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              We&apos;re not hiring drivers, we&apos;re building partners. Lease on with FBL, keep{" "}
              <strong className="text-brand-navy">{FMT.split} of gross revenue</strong>, get settled in{" "}
              <strong className="text-brand-navy">{FMT.settlement}</strong>, and after {FMT.poolYears} of service,
              earn your seat in our exclusive pool sharing{" "}
              <strong className="text-brand-red">{FMT.pool} of company net revenue, every month.</strong>
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                `Exclusive pool access, ${FMT.pool} of net revenue after ${FMT.poolYears}`,
                "Operational freedom, run your routes, no forced dispatch",
                "Consistent freight from a strong, growing network",
                "Heavy fleet fuel discount programs",
                "Total transparency, full company audit rights",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red">
                    <Icon name="check" className="h-3 w-3 text-white" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/owner-operators#apply" className="btn-primary">Apply Today</Link>
              <Link href="/owner-operators" className="btn-secondary">Program Details</Link>
            </div>
          </Reveal>

          {/* 20% seal card, the flyer's badge, rebuilt in brand colors */}
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-2xl bg-navy-gradient p-8 text-white shadow-card md:p-10">
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-brand-red/20 blur-2xl" />
              <div className="mx-auto flex h-48 w-48 flex-col items-center justify-center rounded-full border-4 border-brand-red bg-brand-navy text-center shadow-card-red">
                <p className="font-heading text-5xl font-extrabold text-white">{FMT.pool}</p>
                <p className="mt-1 px-4 font-heading text-[11px] font-bold uppercase tracking-widest text-brand-blueLight">
                  Net Revenue Share
                </p>
              </div>
              <p className="mt-6 text-center font-heading text-sm font-bold uppercase tracking-[0.25em] text-brand-redLight">
                After {FMT.poolYears} of Service
              </p>
              <div className="mt-8 rounded-lg bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-brand-blueLight">
                  Qualifications Box, Who We&apos;re Looking For
                </p>
                <ul className="mt-3 space-y-2 text-sm font-semibold">
                  {[
                    "Clean CDL-A safety record",
                    "Commitment to long-term partnership",
                    "Reliable owned or leased equipment",
                    "Commitment to professionalism",
                  ].map((q) => (
                    <li key={q} className="flex items-center gap-2.5">
                      <Icon name="check" className="h-4 w-4 shrink-0 text-brand-red" /> {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ HOW IT WORKS (shipper journey) ============ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="text-center">
            <p className="section-label">Simple by Design</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase text-brand-navy md:text-4xl">
              From Quote to <span className="hl-blue">Delivered</span> in 4 Steps
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="relative h-full rounded-lg border-t-4 border-brand-red bg-white p-6 shadow-card">
                  <span className="font-heading text-4xl font-extrabold text-slate-200">{s.n}</span>
                  <h3 className="mt-2 font-heading text-base font-extrabold uppercase text-brand-navy">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
                  {i < STEPS.length - 1 && (
                    <span className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-brand-red md:block">
                      <Icon name="arrow" className="h-6 w-6" />
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INDUSTRIES + AREAS strip ============ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-14 lg:grid-cols-2">
            <Reveal>
              <p className="section-label">Industries We Serve</p>
              <h2 className="mt-3 font-heading text-2xl font-extrabold uppercase text-brand-navy md:text-3xl">
                Built Around <span className="hl-red">Your</span> Supply Chain
              </h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {INDUSTRIES.map((ind) => (
                  <Link
                    key={ind.slug}
                    href="/services#industries"
                    className="group flex items-center justify-between rounded-md border border-slate-200 px-4 py-3.5 text-sm font-bold text-brand-navy transition hover:border-brand-red hover:bg-brand-red hover:text-white"
                  >
                    {ind.name}
                    <Icon name="arrow" className="h-4 w-4 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="section-label">Where We Run</p>
              <h2 className="mt-3 font-heading text-2xl font-extrabold uppercase text-brand-navy md:text-3xl">
                Florida Roots. <span className="hl-blue">Regional</span> Power.
              </h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {REGIONS.map((r) => (
                  <Link
                    key={r.slug}
                    href="/services#areas"
                    className="group flex items-center gap-3 rounded-md border border-slate-200 px-4 py-3.5 text-sm font-bold text-brand-navy transition hover:border-brand-blue hover:bg-brand-blue hover:text-white"
                  >
                    <Icon name="pin" className="h-4 w-4 text-brand-red transition group-hover:text-white" />
                    {r.name}
                    {r.state !== "Regional" && <span className="opacity-50">· {r.state === "Florida" ? "FL" : "GA"}</span>}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ REVIEWS teaser ============ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-label">Reviews</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase text-brand-navy md:text-4xl">
                Trusted by <span className="hl-red">Shippers</span> & Drivers
              </h2>
            </div>
            <Link href="/about#reviews" className="btn-secondary !py-2.5 !text-xs">All Reviews</Link>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {REVIEWS.slice(0, 3).map((r, i) => (
              <Reveal key={r.name} delay={i * 90}>
                <figure className="flex h-full flex-col rounded-lg bg-white p-6 shadow-card">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Icon key={j} name="star" className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">“{r.text}”</blockquote>
                  <figcaption className="mt-5 border-t border-slate-100 pt-4">
                    <p className="font-heading text-sm font-extrabold uppercase text-brand-navy">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <OwnerOperatorCTA />
      <QuoteSection />
    </>
  );
}
