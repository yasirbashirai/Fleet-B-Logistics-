import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { REGIONS } from "@/data/regions";
import { SERVICES } from "@/data/services";
import { COMPANY, SITE_URL } from "@/lib/company";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero, QuoteSection, OwnerOperatorCTA, CredentialStrip } from "@/components/Sections";

export function generateStaticParams() {
  return REGIONS.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = REGIONS.find((x) => x.slug === params.slug);
  if (!r) return {};
  return {
    title: r.seoTitle,
    description: r.seoDescription,
    alternates: { canonical: `${SITE_URL}/areas/${r.slug}` },
  };
}

export default function AreaPage({ params }: { params: { slug: string } }) {
  const r = REGIONS.find((x) => x.slug === params.slug);
  if (!r) notFound();

  return (
    <>
      <PageHero
        label={`Service Area · ${r.state}`}
        title={r.headline.replace(/,?\s*(FL|Florida|GA)?$/i, "")}
        highlight={r.state === "Regional" ? "Southeast" : r.name}
        subtitle={r.localNote}
        image="/images/truck-highway.jpg"
      />
      <CredentialStrip />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {r.intro.map((p, i) => (
              <Reveal key={i}>
                <p className="leading-relaxed text-slate-600">{p}</p>
              </Reveal>
            ))}
            <Reveal>
              <div className="rounded-lg bg-brand-navy p-7 text-white">
                <h2 className="flex items-center gap-3 font-heading text-lg font-extrabold uppercase">
                  <Icon name="route" className="h-5 w-5 text-brand-red" /> Popular lanes we run
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {r.lanes.map((l) => (
                    <li key={l} className="flex items-center gap-2.5 rounded bg-white/10 px-4 py-3 text-sm font-semibold">
                      <Icon name="truck" className="h-4 w-4 shrink-0 text-brand-redLight" /> {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal>
              <div className="rounded-lg bg-slate-50 p-7">
                <h2 className="font-heading text-lg font-extrabold uppercase text-brand-navy">
                  Services available in {r.name}
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group flex items-center gap-3 rounded-md bg-white px-4 py-3.5 text-sm font-bold text-brand-navy ring-1 ring-slate-200 transition hover:bg-brand-red hover:text-white"
                    >
                      <Icon name={s.icon} className="h-4 w-4 text-brand-red transition group-hover:text-white" />
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal>
              <p className="text-sm leading-relaxed text-slate-500">
                {COMPANY.name} is an asset-based motor carrier (USDOT #{COMPANY.usdot}, MC #{COMPANY.mc}) headquartered
                at {COMPANY.address.full}. Dispatch is available 24/7 at{" "}
                <a href={COMPANY.phoneHref} className="font-bold text-brand-red">{COMPANY.phone}</a>.
              </p>
            </Reveal>
          </div>

          <aside className="space-y-6">
            <Reveal>
              <div className="rounded-lg bg-brand-navyLight p-6 text-white">
                <h3 className="font-heading text-base font-extrabold uppercase">All Service Areas</h3>
                <ul className="mt-4 space-y-1">
                  {REGIONS.map((x) => (
                    <li key={x.slug}>
                      <Link
                        href={`/areas/${x.slug}`}
                        className={`flex items-center gap-2 rounded px-3 py-2.5 text-sm font-semibold transition ${
                          x.slug === r.slug ? "bg-brand-red text-white" : "text-white/75 hover:bg-white/10"
                        }`}
                      >
                        <Icon name="pin" className="h-4 w-4" /> {x.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-lg bg-red-gradient p-6 text-center text-white shadow-card-red">
                <p className="font-heading text-base font-extrabold uppercase">Ship from {r.name}?</p>
                <a href={COMPANY.phoneHref} className="mt-3 inline-block rounded-md bg-white px-6 py-3 font-heading text-base font-extrabold text-brand-red">
                  {COMPANY.phone}
                </a>
                <p className="mt-2 text-xs uppercase tracking-widest text-white/80">24/7 Dispatch</p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <OwnerOperatorCTA />
      <QuoteSection title={`Quote Freight from ${r.name} Today`} />
    </>
  );
}
