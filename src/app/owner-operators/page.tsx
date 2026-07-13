import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { FMT, RATES } from "@/lib/rates";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import PoolCalculator from "@/components/PoolCalculator";
import { PageHero, CredentialStrip } from "@/components/Sections";

export const metadata: Metadata = {
  title: `Owner-Operators — ${FMT.pool} Share Pool Program | Lease On in Florida`,
  description: `Lease on with ${COMPANY.shortName}: keep ${FMT.split} of gross, ${FMT.settlement} settlements, no forced dispatch, fuel discounts — and ${FMT.pool} of company net revenue after ${FMT.poolYears}. Apply today.`,
};

const BENEFITS = [
  {
    icon: "dollar",
    title: "Exclusive Pool Access",
    text: `Full eligibility for the exclusive ${FMT.pool} net revenue share pool after ${FMT.poolYears} — paid monthly, split pro-rata among qualified partners.`,
  },
  {
    icon: "route",
    title: "Operational Freedom",
    text: "Total freedom to run your own routes — no forced dispatch, ever. You're a business owner; we act like it.",
  },
  {
    icon: "truck",
    title: "Consistent Freight",
    text: "A strong, growing freight network backed by consistent, high-paying loads across the Southeast and OTR lanes.",
  },
  {
    icon: "fuel",
    title: "Fuel Discount Programs",
    text: "Access to heavy fleet fuel discounts across approved networks to keep your operating costs low.",
  },
  {
    icon: "eye",
    title: "Total Transparency",
    text: `Full company audit rights (after ${FMT.poolYears}) to verify pool earnings — plus rated freight bill access on every percentage-paid load.`,
  },
  {
    icon: "clock",
    title: `${FMT.settlement.replace(" business days", "-Day")} Settlements`,
    text: `Submit clean paperwork; get paid within ${FMT.settlement}. Keep ${FMT.split} of gross freight revenue on every load.`,
  },
];

const QUALS = [
  "Clean CDL-A safety record",
  "Commitment to long-term partnership",
  "Reliable, owned or leased equipment",
  "Commitment to professionalism",
];

const POOL_RULES = [
  {
    title: "Service longevity",
    text: `Complete ${RATES.revenuePool.qualifyingYears} cumulative years of active contracted service under a valid lease-on agreement.`,
  },
  {
    title: "Continuous service",
    text: `Service gaps can't exceed ${RATES.revenuePool.maxServiceGapMonths} cumulative months in any rolling 24-month window across the qualification period.`,
  },
  {
    title: "Active equipment",
    text: "Keep at least one fully operational commercial vehicle continuously leased to the fleet (maintenance grace period applies).",
  },
  {
    title: "Monthly payouts",
    text: `Pool distributions are calculated and paid within ${RATES.revenuePool.payoutDaysAfterMonthClose} days after each month closes — split equally among all qualified participants.`,
  },
  {
    title: "Breakdown protection",
    text: `Truck down for repairs? Submit a certified shop invoice within ${RATES.revenuePool.invoiceSubmitBusinessDays} business days and keep your pool status for up to ${RATES.revenuePool.maintenanceGraceMonths} months.`,
  },
  {
    title: "Shareholder agreement",
    text: "On qualification, a separate Corporate Shareholder & Profit-Sharing Agreement (Florida corporate law) governs voting rights, payouts, and tax reporting (K-1/1099).",
  },
];

export default function OwnerOperatorsPage() {
  return (
    <>
      {/* Hero — the recruiting flyer, as a webpage */}
      <PageHero
        label="Owner-Operators"
        title="Drive Your Success."
        highlight="Share Our Growth."
        subtitle={`Partner with us & earn your place in our exclusive revenue share pool — ${FMT.pool} of company net revenue after ${FMT.poolYears} of service.`}
        image="/images/truck-night.jpg"
      >
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link href="/apply" className="btn-primary">
            Apply Today <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link href="/onboarding" className="btn-outline">Fill Out the Onboarding Kit</Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-wider text-white/75">
          <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-red" /> {FMT.split} of Gross</span>
          <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-red" /> {FMT.settlement} Pay</span>
          <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-red" /> No Forced Dispatch</span>
          <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-red" /> 100% Owner-Operated</span>
        </div>
      </PageHero>
      <CredentialStrip />

      {/* Core benefits + qualifications box (flyer layout) */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="section-label">The Core Benefits</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase text-brand-navy md:text-4xl">
              Built for <span className="hl-red">Partners</span>, Not Payroll
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={i * 70}>
                  <div className="flex h-full gap-4 rounded-lg border border-slate-200 p-6 transition hover:border-brand-red hover:shadow-card">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-red text-white shadow-card-red">
                      <Icon name={b.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-sm font-extrabold uppercase text-brand-navy">{b.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{b.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Qualifications box — straight from the flyer */}
            <Reveal delay={200}>
              <div className="sticky top-32 overflow-hidden rounded-xl bg-navy-gradient text-white shadow-card">
                <div className="bg-brand-red px-6 py-4">
                  <h3 className="font-heading text-lg font-extrabold uppercase">Qualifications Box</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/80">Who we&apos;re looking for</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {QUALS.map((q) => (
                      <li key={q} className="flex items-center gap-3 text-sm font-semibold">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white/15 ring-1 ring-white/30">
                          <Icon name="check" className="h-3.5 w-3.5 text-brand-redLight" />
                        </span>
                        {q}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 rounded-lg bg-white/10 p-5 text-center ring-1 ring-white/15">
                    <p className="font-heading text-4xl font-extrabold text-brand-redLight">{FMT.pool}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-brand-blueLight">
                      Net Revenue Share<br />After {RATES.revenuePool.qualifyingYears} Years of Service
                    </p>
                  </div>
                  <Link href="/apply" className="btn-primary mt-6 w-full">Apply Today</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
          <Reveal>
            <p className="section-label">Do the Math</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase text-brand-navy md:text-4xl">
              {FMT.split} of Gross. <span className="hl-blue">Your</span> Numbers.
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              No smoke, no mirror math. You keep {FMT.split} of gross freight revenue on every load. Because you&apos;re
              paid on percentage, federal law gives you the right to see the rated freight bill — so you can verify
              every settlement against the real number the shipper paid.
            </p>
            <ul className="mt-6 space-y-3 text-sm font-semibold text-slate-700">
              <li className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                Settlements processed within {FMT.settlement} of clean paperwork
              </li>
              <li className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                Escrow builds at {FMT.escrowWeekly} to a {FMT.escrowCap} cap — returned with interest per 49 CFR § 376.12(k)
              </li>
              <li className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                Every deduction itemized on your weekly settlement sheet
              </li>
            </ul>
          </Reveal>
          <Reveal delay={130}>
            <PoolCalculator />
          </Reveal>
        </div>
      </section>

      {/* Pool rules — transparency section */}
      <section className="bg-brand-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="text-center">
            <p className="section-label">Full Transparency</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase md:text-4xl">
              How the <span className="hl-red">{FMT.pool} Pool</span> Actually Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Most programs hide the rules. We publish them. Here are the exact mechanics from our lease agreement —
              the same document you&apos;ll sign.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POOL_RULES.map((r, i) => (
              <Reveal key={r.title} delay={i * 60}>
                <div className="h-full rounded-lg bg-brand-navyLight p-6 ring-1 ring-white/10">
                  <span className="font-heading text-3xl font-extrabold text-brand-red">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-heading text-base font-extrabold uppercase">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-white/40">
            Program details and {RATES.revenuePool.qualifyingYears}-year service eligibility subject to terms and conditions in the Owner-Operator Equipment Lease Agreement.
          </p>
        </div>
      </section>

      {/* Onboarding steps */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="text-center">
            <p className="section-label">Getting Started</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase text-brand-navy md:text-4xl">
              From Application to <span className="hl-blue">First Dispatch</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { n: "1", t: "Apply Online", d: "5-minute form. Your welcome letter + onboarding kit link arrive by email instantly." },
              { n: "2", t: "Sign the Kit", d: "Complete the full onboarding kit online — or download the PDF and email it back." },
              { n: "3", t: "Inspection", d: "Bring your truck to our West Palm Beach HQ (schedule 24h ahead) with your documents." },
              { n: "4", t: "Roll", d: "Safety clears your file, ELD gets synced, and dispatch puts you on your first load." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="relative h-full rounded-lg bg-slate-50 p-7 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-gradient font-heading text-2xl font-extrabold text-white shadow-card-red">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-heading text-base font-extrabold uppercase text-brand-navy">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <div className="inline-flex flex-col items-center gap-4 sm:flex-row">
              <Link href="/apply" className="btn-primary">Ready? Apply Today</Link>
              <Link href="/resources" className="btn-secondary">Download Forms & Kit</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final flyer-style banner */}
      <section className="bg-red-gradient py-14 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-2xl font-extrabold uppercase leading-tight md:text-3xl">
            Ready to be part of a winning team and share the rewards?
          </h2>
          <p className="mt-2 font-heading text-lg font-bold uppercase tracking-wide text-white/90">
            Apply today to join our profit-sharing pool!
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-md bg-brand-navy px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-card transition-transform hover:scale-[1.03] md:text-base"
            >
              Apply Now <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a href={COMPANY.phoneHref} className="btn-outline">
              <Icon name="phone" className="h-4 w-4" /> {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
