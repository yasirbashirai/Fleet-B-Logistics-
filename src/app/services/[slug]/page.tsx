import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import { REGIONS } from "@/data/regions";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero, QuoteSection, OwnerOperatorCTA, CredentialStrip } from "@/components/Sections";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = SERVICES.find((x) => x.slug === params.slug);
  if (!s) return {};
  return { title: s.seoTitle, description: s.seoDescription };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const s = SERVICES.find((x) => x.slug === params.slug);
  if (!s) notFound();

  const words = s.name.split(" ");
  const last = words.pop() as string;

  return (
    <>
      <PageHero label="Services" title={words.join(" ")} highlight={last} subtitle={s.hero} image={s.image} />
      <CredentialStrip />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {s.body.map((p, i) => (
              <Reveal key={i}>
                <p className="leading-relaxed text-slate-600">{p}</p>
              </Reveal>
            ))}
            <Reveal>
              <div className="rounded-lg bg-slate-50 p-7">
                <h2 className="font-heading text-lg font-extrabold uppercase text-brand-navy">
                  What&apos;s included
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal>
              <div className="rounded-lg border-l-4 border-brand-blue bg-brand-blue/5 p-6">
                <h2 className="font-heading text-base font-extrabold uppercase text-brand-navy">Coverage</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Available across all our service areas:
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {REGIONS.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/areas/${r.slug}`}
                      className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-brand-blue ring-1 ring-brand-blue/30 hover:bg-brand-blue hover:text-white"
                    >
                      {r.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar: other services + CTA */}
          <aside className="space-y-6">
            <Reveal>
              <div className="rounded-lg bg-brand-navy p-6 text-white">
                <h3 className="font-heading text-base font-extrabold uppercase">All Services</h3>
                <ul className="mt-4 space-y-1">
                  {SERVICES.map((x) => (
                    <li key={x.slug}>
                      <Link
                        href={`/services/${x.slug}`}
                        className={`flex items-center gap-2 rounded px-3 py-2.5 text-sm font-semibold transition ${
                          x.slug === s.slug ? "bg-brand-red text-white" : "text-white/75 hover:bg-white/10"
                        }`}
                      >
                        <Icon name={x.icon} className="h-4 w-4" /> {x.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-lg bg-red-gradient p-6 text-center text-white shadow-card-red">
                <Icon name="phone" className="mx-auto h-8 w-8" />
                <p className="mt-3 font-heading text-lg font-extrabold uppercase">Need it moved?</p>
                <p className="mt-1 text-sm text-white/85">Dispatch answers 24/7.</p>
                <a
                  href="tel:+15614605739"
                  className="mt-4 inline-block rounded-md bg-white px-6 py-3 font-heading text-sm font-extrabold uppercase text-brand-red"
                >
                  (561) 460-5739
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <OwnerOperatorCTA />
      <QuoteSection title={`Quote Your ${s.name} Load`} />
    </>
  );
}
