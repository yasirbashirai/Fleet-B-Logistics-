import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SERVICES, EQUIPMENT } from "@/data/services";
import { INDUSTRIES } from "@/data/industries";
import { REGIONS } from "@/data/regions";
import { BLOG_POSTS } from "@/data/blog";
import { COMPANY } from "@/lib/company";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import { PageHero, OwnerOperatorSpotlight, CredentialStrip } from "@/components/Sections";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Trucking & Freight Services, OTR, Dry Van, Expedited, Regional",
  description:
    "Fleet B Logistics services: OTR transportation, dry van freight, expedited time-critical loads, and Southeast regional trucking, plus the industries and areas we serve. West Palm Beach, FL.",
};

export default function ServicesPage() {
  const shipperPost = BLOG_POSTS.find((p) => p.slug === "asset-based-carrier-vs-freight-broker");

  return (
    <>
      <PageHero
        label="Services"
        title="Freight Services Run by"
        highlight="Owners"
        subtitle="Every FBL service is delivered by owner-operators with a direct stake in your freight arriving on time and intact."
        subtitleClassName="text-justify md:text-left"
        image="/images/truck-blue-highway.jpg"
      />
      <CredentialStrip />

      {/* Quick anchor nav */}
      <div className="sticky top-[104px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur md:top-[112px]">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-1 px-4 py-2 text-xs font-bold uppercase tracking-wider md:flex-nowrap md:justify-start md:overflow-x-auto">
          {[
            ["#services", "Our Services"],
            ["#equipment", "Equipment"],
            ["#industries", "Industries"],
            ["#areas", "Service Areas"],
            ["#insights", "Carrier vs Broker"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="whitespace-nowrap rounded-full px-4 py-2 text-slate-500 transition hover:bg-brand-red hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ============ FULL SERVICE SECTIONS ============ */}
      <section id="services" className="scroll-mt-40 bg-white py-20">
        <div className="mx-auto max-w-7xl space-y-20 px-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug}>
              <div
                id={s.slug}
                className={`grid scroll-mt-44 items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative h-72 overflow-hidden rounded-2xl shadow-card lg:h-96">
                  <Image src={s.image} alt={s.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                  <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded bg-brand-red text-white shadow-card-red">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                </div>
                <div>
                  <p className="section-label">Service {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 font-heading text-2xl font-extrabold uppercase text-brand-navy md:text-3xl">
                    {s.name}
                  </h2>
                  <div className="mt-4 space-y-3">
                    {s.body.map((p, j) => (
                      <p key={j} className="leading-relaxed text-slate-600">{p}</p>
                    ))}
                  </div>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <Link href="/contact" className="btn-primary !py-2.5 !text-xs">
                      Talk to Our Team
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EQUIPMENT GALLERY ============ */}
      <section id="equipment" className="scroll-mt-40 bg-brand-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="section-label">Equipment & Capacity</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase md:text-4xl">
              The Right <span className="hl-red">Trailer</span> for the Load
            </h2>
            <p className="mt-4 max-w-2xl text-white/70">
              Dry van is our backbone, and through our owner-operator network we cover specialized capacity on
              request. Ask dispatch what&apos;s available on your lane.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EQUIPMENT.map((e, i) => (
              <Reveal key={e.name} delay={(i % 3) * 80}>
                <div className="group overflow-hidden rounded-lg bg-brand-navyLight ring-1 ring-white/10 transition hover:ring-brand-red">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={e.image}
                      alt={e.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navyLight/90 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-base font-extrabold uppercase">{e.name}</h3>
                    <p className="mt-1 text-sm text-white/65">{e.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section id="industries" className="scroll-mt-40 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="section-label">Industries We Serve</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase text-brand-navy md:text-4xl">
              Built Around <span className="hl-red">Your</span> Supply Chain
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 3) * 80}>
                <div className="flex h-full flex-col rounded-lg bg-white p-7 shadow-card">
                  <h3 className="font-heading text-lg font-extrabold uppercase text-brand-navy">{ind.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{ind.intro[0]}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {ind.needs.map((n) => (
                      <li key={n} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> {n}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICE AREAS ============ */}
      <section id="areas" className="scroll-mt-40 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="section-label">Where We Run</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase text-brand-navy md:text-4xl">
              Florida Roots. <span className="hl-blue">48-State</span> Reach.
            </h2>
            <p className="mt-4 max-w-2xl text-slate-600">
              Headquartered in West Palm Beach with dense Southeast coverage, and OTR lanes into all 48 contiguous
              states.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REGIONS.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 3) * 70}>
                <div className="h-full rounded-lg border-t-4 border-brand-red bg-slate-50 p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-navy text-white">
                      <Icon name="pin" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-extrabold uppercase text-brand-navy">{r.name}</h3>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{r.state}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {r.lanes.map((l) => (
                      <li key={l} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <Icon name="truck" className="h-3.5 w-3.5 shrink-0 text-brand-red" /> {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CARRIER vs BROKER insight (from blog) ============ */}
      {shipperPost && (
        <section id="insights" className="scroll-mt-40 bg-slate-50 py-20">
          <div className="mx-auto max-w-4xl px-4">
            <Reveal>
              <p className="section-label">Straight Talk</p>
              <h2 className="mt-3 font-heading text-2xl font-extrabold uppercase text-brand-navy md:text-3xl">
                {shipperPost.title.split(":")[0]}
              </h2>
              <p className="mt-3 text-slate-600">{shipperPost.excerpt}</p>
              <div className="mt-8">
                <Accordion
                  items={shipperPost.body
                    .filter((sec) => sec.heading)
                    .map((sec) => ({
                      title: sec.heading as string,
                      content: sec.paragraphs.map((p, i) => <p key={i}>{p}</p>),
                    }))}
                />
              </div>
              <p className="mt-6 text-center text-sm text-slate-500">
                Questions about your lane? Call dispatch 24/7:{" "}
                <a href={COMPANY.phoneHref} className="font-bold text-brand-red">{COMPANY.phone}</a>
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <OwnerOperatorSpotlight />
    </>
  );
}
