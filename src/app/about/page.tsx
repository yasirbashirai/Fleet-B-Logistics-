import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { FMT } from "@/lib/rates";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero, MetricsBand, QuoteSection, OwnerOperatorCTA } from "@/components/Sections";

export const metadata: Metadata = {
  title: "About Us — Asset-Based Florida Carrier Built on Honesty",
  description: `${COMPANY.name}: 100% owner-operated OTR trucking company in West Palm Beach, FL. USDOT #${COMPANY.usdot}. Our story, our values, and the ${FMT.pool} share pool that makes us different.`,
};

const VALUES = [
  {
    icon: "shield",
    title: "Honesty",
    text: "It's our tagline because it's our filter for every decision: honest rates, honest timelines, honest settlements. If we can't do it, we say so before you book.",
  },
  {
    icon: "users",
    title: "Partnership Over Payroll",
    text: "FBL is 100% owner-operated. Our drivers are contractors building their own businesses — and after five years, literal stakeholders in ours.",
  },
  {
    icon: "wheel",
    title: "Operational Discipline",
    text: "FMCSA-compliant from ELDs to drug-and-alcohol policy, with structured onboarding, escrow accounting, and paperwork standards that keep freight moving clean.",
  },
  {
    icon: "eye",
    title: "Transparency",
    text: "Percentage-pay drivers see the rated freight bill. Pool participants get audit rights. Shippers get itemized pricing. Everyone sees the same numbers we do.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="An Asset-Based Carrier Built on"
        highlight="Honesty"
        subtitle={`${COMPANY.name} is a 100% owner-operated OTR trucking company headquartered in West Palm Beach, Florida — moving freight across the Southeast and all 48 states.`}
        image="/images/driver-cab.jpg"
      />

      {/* Story */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
          <Reveal>
            <p className="section-label">Our Story</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase text-brand-navy">
              Regional Powerhouse. <span className="hl-blue">Infrastructure</span> Mindset.
            </h2>
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
              <p>
                Fleet B Logistics LLC was founded in West Palm Beach by{" "}
                <strong className="text-brand-navy">{COMPANY.owner.name}</strong> on a conviction that's rare in
                trucking: the people who move the freight should share in what the freight builds.
              </p>
              <p>
                That conviction became our structure. We run a <strong className="text-brand-navy">100% owner-operated
                fleet</strong> — professional CDL-A contractors who own their equipment, choose their routes, and keep{" "}
                {FMT.split} of gross revenue on every load. And after {FMT.poolYears} of partnership, they qualify for
                our {FMT.pool} net revenue share pool: a real, audited stake in the company's success.
              </p>
              <p>
                For shippers, that model is your guarantee. The driver on your dock isn't a number in a fleet — they're
                a business owner whose reputation and future earnings ride on your freight arriving on time,
                intact, and documented.
              </p>
              <p className="font-heading font-bold uppercase text-brand-red">“{COMPANY.tagline}”</p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-card">
                <Image
                  src="/images/truck-red.jpg"
                  alt="Fleet B Logistics tractor-trailer"
                  width={800}
                  height={500}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 rounded-lg bg-brand-red px-6 py-4 text-white shadow-card-red md:-left-8">
                <p className="font-heading text-2xl font-extrabold">USDOT #{COMPANY.usdot}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-white/80">MC #{COMPANY.mc} · Our Own Authority</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <MetricsBand />

      {/* Values */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="text-center">
            <p className="section-label">What We Stand On</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase text-brand-navy md:text-4xl">
              Values With <span className="hl-red">Structure</span> Behind Them
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="flex h-full gap-5 rounded-lg border-l-4 border-brand-red bg-white p-7 shadow-card">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-brand-navy text-white">
                    <Icon name={v.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-extrabold uppercase text-brand-navy">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership + compliance */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl bg-navy-gradient p-8 text-white md:p-10">
              <p className="section-label">Leadership</p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold uppercase">{COMPANY.owner.name}</h3>
              <p className="font-heading text-sm font-bold uppercase tracking-widest text-brand-blueLight">
                {COMPANY.owner.title}
              </p>
              <p className="mt-5 leading-relaxed text-white/80">
                Bendy built FBL around a simple promise — treat drivers like partners and shippers like neighbors, and
                growth takes care of itself. He personally oversees safety, onboarding, and the share-pool program,
                and he answers to every driver's audit rights, not the other way around.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <a href={COMPANY.phoneHref} className="flex items-center gap-2 font-bold hover:text-brand-redLight">
                  <Icon name="phone" className="h-4 w-4 text-brand-red" /> {COMPANY.phone}
                </a>
                <a href={COMPANY.emailHref} className="flex items-center gap-2 font-bold hover:text-brand-redLight">
                  <Icon name="mail" className="h-4 w-4 text-brand-red" /> {COMPANY.email}
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-2xl border border-slate-200 p-8 md:p-10">
              <p className="section-label">Compliance & Credentials</p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold uppercase text-brand-navy">
                Built to Federal Standards
              </h3>
              <ul className="mt-6 space-y-4">
                {[
                  `Operating authority: USDOT #${COMPANY.usdot} · MC #${COMPANY.mc}`,
                  "Primary auto liability & cargo insurance under dispatch",
                  "FMCSA drug & alcohol program (49 CFR Part 382) with Clearinghouse reporting",
                  "ELD hours-of-service compliance + forward-facing dashcams fleet-wide",
                  "Driver files onboarded per 49 CFR § 391.21 / § 376.12 leasing regulations",
                  "24/7 dispatch, West Palm Beach operational headquarters",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue">
                      <Icon name="check" className="h-3 w-3 text-white" />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-secondary mt-8">Talk to Our Team</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <OwnerOperatorCTA />
      <QuoteSection />
    </>
  );
}
