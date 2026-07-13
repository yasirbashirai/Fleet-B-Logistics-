import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { FMT, RATES } from "@/lib/rates";
import { BLOG_POSTS } from "@/data/blog";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import PoolCalculator from "@/components/PoolCalculator";
import Accordion from "@/components/Accordion";
import ApplyForm from "./ApplyForm";
import OnboardingWizard from "./OnboardingWizard";
import { PageHero, CredentialStrip } from "@/components/Sections";

export const metadata: Metadata = {
  title: `Owner-Operators, ${FMT.pool} Share Pool Program, Apply & Onboard Online`,
  description: `Lease on with ${COMPANY.shortName}: keep ${FMT.split} of gross, ${FMT.settlement} settlements, no forced dispatch, and ${FMT.pool} of company net revenue after ${FMT.poolYears}. Apply, fill out, and sign the onboarding kit online.`,
};

const BENEFITS = [
  {
    icon: "dollar",
    title: "Exclusive Pool Access",
    text: `Full eligibility for the exclusive ${FMT.pool} net revenue share pool after ${FMT.poolYears}, paid monthly, split pro-rata among qualified partners.`,
  },
  {
    icon: "route",
    title: "Operational Freedom",
    text: "Total freedom to run your own routes, no forced dispatch, ever. You're a business owner; we act like it.",
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
    text: `Full company audit rights (after ${FMT.poolYears}) to verify pool earnings, plus rated freight bill access on every percentage-paid load.`,
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
    text: `Pool distributions are calculated and paid within ${RATES.revenuePool.payoutDaysAfterMonthClose} days after each month closes, split equally among all qualified participants.`,
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

const DOWNLOADS = [
  {
    title: "Owner-Operator Onboarding Kit (Full PDF)",
    desc: "Every form in one packet: FMCSA driver application, drug-testing consent, equipment lease agreement, direct deposit, NDA, and Addendums A–C. Print, sign, and email back, or use the online version above.",
    href: "/documents/fbl-owner-operator-onboarding-kit.pdf",
    tag: "Onboarding",
  },
  {
    title: "Lease Termination & Equipment Return Checklist",
    desc: "The official checklist used when a lease ends: ELD and dashcam hardware return, fuel card deactivation, IFTA decal removal, safety sign-off, and the escrow final release statement.",
    href: "/documents/fbl-lease-termination-equipment-return-checklist.pdf",
    tag: "Offboarding",
  },
];

export default function OwnerOperatorsPage() {
  const faqPosts = BLOG_POSTS.filter((p) => p.category === "Owner-Operators");

  return (
    <>
      {/* Hero, the recruiting flyer, as a webpage */}
      <PageHero
        label="Owner-Operators"
        title="Drive Your Success."
        highlight="Share Our Growth."
        subtitle={`Partner with us & earn your place in our exclusive revenue share pool, ${FMT.pool} of company net revenue after ${FMT.poolYears} of service.`}
        image="/images/truck-blue-reefer.jpg"
      >
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a href="#apply" className="btn-primary">
            Apply Today <Icon name="arrow" className="h-4 w-4" />
          </a>
          <a href="#onboarding" className="btn-outline">Fill Out the Onboarding Kit</a>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-wider text-white/75">
          <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-red" /> {FMT.split} of Gross</span>
          <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-red" /> {FMT.settlement} Pay</span>
          <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-red" /> No Forced Dispatch</span>
          <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand-red" /> 100% Owner-Operated</span>
        </div>
      </PageHero>
      <CredentialStrip />

      {/* Quick anchor nav */}
      <div className="sticky top-[104px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur md:top-[112px]">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 text-xs font-bold uppercase tracking-wider">
          {[
            ["#program", "The Program"],
            ["#calculator", "Your Numbers"],
            ["#pool-rules", "Pool Rules"],
            ["#apply", "Apply"],
            ["#onboarding", "Onboarding Kit"],
            ["#resources", "Downloads"],
            ["#faq", "FAQ"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="whitespace-nowrap rounded-full px-4 py-2 text-slate-500 transition hover:bg-brand-red hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Core benefits + qualifications box (flyer layout) */}
      <section id="program" className="scroll-mt-44 bg-white py-20">
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

            {/* Qualifications box, straight from the flyer */}
            <Reveal delay={200}>
              <div className="sticky top-44 overflow-hidden rounded-xl bg-navy-gradient text-white shadow-card">
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
                  <a href="#apply" className="btn-primary mt-6 w-full">Apply Today</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="scroll-mt-44 bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
          <Reveal>
            <p className="section-label">Do the Math</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase text-brand-navy md:text-4xl">
              {FMT.split} of Gross. <span className="hl-blue">Your</span> Numbers.
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              No smoke, no mirror math. You keep {FMT.split} of gross freight revenue on every load. Because you&apos;re
              paid on percentage, federal law gives you the right to see the rated freight bill, so you can verify
              every settlement against the real number the shipper paid.
            </p>
            <ul className="mt-6 space-y-3 text-sm font-semibold text-slate-700">
              <li className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                Settlements processed within {FMT.settlement} of clean paperwork
              </li>
              <li className="flex items-start gap-3">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                Escrow builds at {FMT.escrowWeekly} to a {FMT.escrowCap} cap, returned with interest per 49 CFR § 376.12(k)
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

      {/* Pool rules, transparency section */}
      <section id="pool-rules" className="scroll-mt-44 bg-brand-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="text-center">
            <p className="section-label">Full Transparency</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase md:text-4xl">
              How the <span className="hl-red">{FMT.pool} Pool</span> Actually Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Most programs hide the rules. We publish them. Here are the exact mechanics from our lease agreement,
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
              { n: "1", t: "Apply Below", d: "5-minute form. Your welcome letter + onboarding kit link arrive by email instantly." },
              { n: "2", t: "Sign the Kit", d: "Complete the full onboarding kit online right on this page, or download the PDF." },
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
        </div>
      </section>

      {/* ============ APPLY ============ */}
      <section id="apply" className="scroll-mt-44 bg-slate-50 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="rounded-xl bg-white p-6 shadow-card md:p-9">
              <p className="section-label">Step 1</p>
              <h2 className="mt-2 font-heading text-2xl font-extrabold uppercase text-brand-navy">Owner-Operator Application</h2>
              <p className="mb-6 mt-1 text-sm text-slate-500">
                Quick pre-qualification, the full FMCSA application is in the onboarding kit below.
              </p>
              <ApplyForm />
            </div>
          </Reveal>
          <div className="space-y-6 lg:col-span-2">
            <Reveal delay={80}>
              <div className="rounded-xl border-2 border-dashed border-brand-blue/40 bg-white p-7">
                <h3 className="font-heading text-base font-extrabold uppercase text-brand-navy">
                  📬 Instant welcome packet
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Submit this form and our system automatically emails you the official FBL welcome letter, your next
                  steps, and the link back to the onboarding kit below.
                </p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="rounded-xl bg-red-gradient p-7 text-center text-white shadow-card-red">
                <p className="font-heading text-base font-extrabold uppercase">Questions first?</p>
                <a href={COMPANY.phoneHref} className="mt-2 inline-block font-heading text-2xl font-extrabold">
                  {COMPANY.phone}
                </a>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/80">Recruiting & Safety, 24/7</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ ONBOARDING KIT ============ */}
      <section id="onboarding" className="scroll-mt-44 bg-white py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal className="text-center">
            <p className="section-label">Step 2</p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold uppercase text-brand-navy md:text-4xl">
              Fill Out & Sign Your Kit <span className="hl-red">Online</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Every form from the official FBL onboarding kit in one guided flow, complete it in one sitting, or{" "}
              <a href="/documents/fbl-owner-operator-onboarding-kit.pdf" download className="font-bold text-brand-blue underline">
                download the PDF version
              </a>{" "}
              instead.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <OnboardingWizard />
          </Reveal>
          <p className="mt-8 text-center text-xs leading-relaxed text-slate-400">
            Electronic signatures on this kit are intended to carry the same force as handwritten signatures under the
            U.S. E-SIGN Act. Original hard copies may still be requested by Safety and can be mailed to{" "}
            {COMPANY.address.full}. Questions? Call {COMPANY.phone}, 24/7.
          </p>
        </div>
      </section>

      {/* ============ RESOURCES / DOWNLOADS ============ */}
      <section id="resources" className="scroll-mt-44 bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <p className="section-label">Driver Resources</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase text-brand-navy md:text-4xl">
              Forms & <span className="hl-blue">Downloads</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {DOWNLOADS.map((d, i) => (
              <Reveal key={d.href} delay={i * 100}>
                <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-7 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-red text-white shadow-card-red">
                      <Icon name="doc" className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                      {d.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-extrabold uppercase leading-snug text-brand-navy">
                    {d.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{d.desc}</p>
                  <a href={d.href} download className="btn-secondary mt-6 !py-2.5 !text-xs">
                    <Icon name="download" className="h-4 w-4" /> Download PDF
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Submission instructions */}
          <Reveal className="mt-10">
            <div className="rounded-xl bg-white p-8 shadow-card">
              <h3 className="font-heading text-xl font-extrabold uppercase text-brand-navy">
                Submission & Paperwork Instructions
              </h3>
              <div className="mt-6 grid gap-8 md:grid-cols-3">
                <div>
                  <p className="font-heading text-sm font-extrabold uppercase text-brand-red">📍 Mail & Inspections</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Original hard copies and physical truck inspections happen at our operational HQ:
                    <br />
                    <strong className="text-brand-navy">{COMPANY.address.full}</strong>
                    <br />
                    Schedule inspections 24h ahead: <a href={COMPANY.phoneHref} className="font-bold text-brand-red">{COMPANY.phone}</a>
                  </p>
                </div>
                <div>
                  <p className="font-heading text-sm font-extrabold uppercase text-brand-red">📱 ELD Setup</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Download your assigned ELD app (Motive, Samsara, or HOS247 per your fleet setup). Safety emails
                    your driver credentials once Phase 1 paperwork clears. Plug in the hardware, sync via Bluetooth,
                    and you&apos;re dispatch-ready.
                  </p>
                </div>
                <div>
                  <p className="font-heading text-sm font-extrabold uppercase text-brand-red">📄 BOL & Getting Paid</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Scan signed BOLs, lumper and fuel receipts with a mobile scanning app and email to{" "}
                    <a href={COMPANY.emailHref} className="font-bold text-brand-blue">{COMPANY.email}</a> within{" "}
                    {RATES.bolSubmitHours} hours of delivery, settlements process within {FMT.settlement}.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ / insights from the blog ============ */}
      <section id="faq" className="scroll-mt-44 bg-white py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <p className="section-label">Straight Talk</p>
            <h2 className="mt-3 font-heading text-2xl font-extrabold uppercase text-brand-navy md:text-3xl">
              Owner-Operator <span className="hl-red">FAQ</span> & Insights
            </h2>
          </Reveal>
          <Reveal className="mt-8">
            <Accordion
              items={faqPosts.map((p) => ({
                title: p.title,
                content: (
                  <>
                    <p className="font-semibold text-slate-700">{p.excerpt}</p>
                    {p.body.map((sec, i) => (
                      <div key={i} className="space-y-3">
                        {sec.heading && (
                          <p className="font-heading font-extrabold uppercase text-brand-navy">{sec.heading}</p>
                        )}
                        {sec.paragraphs.map((para, j) => (
                          <p key={j}>{para}</p>
                        ))}
                      </div>
                    ))}
                  </>
                ),
              }))}
            />
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
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-md bg-brand-navy px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-card transition-transform hover:scale-[1.03] md:text-base"
            >
              Apply Now <Icon name="arrow" className="h-4 w-4" />
            </a>
            <a href={COMPANY.phoneHref} className="btn-outline">
              <Icon name="phone" className="h-4 w-4" /> {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
