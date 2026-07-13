import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/data/industries";
import { SERVICES } from "@/data/services";
import { COMPANY, SITE_URL } from "@/lib/company";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero, QuoteSection, CredentialStrip } from "@/components/Sections";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ind = INDUSTRIES.find((x) => x.slug === params.slug);
  if (!ind) return {};
  return {
    title: ind.seoTitle,
    description: ind.seoDescription,
    alternates: { canonical: `${SITE_URL}/industries/${ind.slug}` },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const ind = INDUSTRIES.find((x) => x.slug === params.slug);
  if (!ind) notFound();

  const words = ind.name.split(" ");
  const last = words.pop() as string;

  return (
    <>
      <PageHero
        label="Industries We Serve"
        title={words.join(" ") || "Freight for"}
        highlight={last}
        subtitle={ind.short}
        image={ind.image}
      />
      <CredentialStrip />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {ind.intro.map((p, i) => (
              <Reveal key={i}>
                <p className="leading-relaxed text-slate-600">{p}</p>
              </Reveal>
            ))}
            <Reveal>
              <div className="rounded-lg bg-slate-50 p-7">
                <h2 className="font-heading text-lg font-extrabold uppercase text-brand-navy">
                  What {ind.name.toLowerCase()} shippers need — and get
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {ind.needs.map((n) => (
                    <li key={n} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> {n}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal>
              <div className="overflow-hidden rounded-xl">
                <Image src={ind.image} alt={ind.name} width={900} height={480} className="h-64 w-full object-cover" />
              </div>
            </Reveal>
          </div>
          <aside className="space-y-6">
            <Reveal>
              <div className="rounded-lg bg-brand-navyLight p-6 text-white">
                <h3 className="font-heading text-base font-extrabold uppercase">All Industries</h3>
                <ul className="mt-4 space-y-1">
                  {INDUSTRIES.map((x) => (
                    <li key={x.slug}>
                      <Link
                        href={`/industries/${x.slug}`}
                        className={`block rounded px-3 py-2.5 text-sm font-semibold transition ${
                          x.slug === ind.slug ? "bg-brand-red text-white" : "text-white/75 hover:bg-white/10"
                        }`}
                      >
                        {x.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="rounded-lg border border-slate-200 p-6">
                <h3 className="font-heading text-base font-extrabold uppercase text-brand-navy">Relevant Services</h3>
                <ul className="mt-3 space-y-2">
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-red">
                        <Icon name={s.icon} className="h-4 w-4" /> {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="rounded-lg bg-red-gradient p-6 text-center text-white shadow-card-red">
                <p className="font-heading text-base font-extrabold uppercase">Move {last.toLowerCase()} freight?</p>
                <a href={COMPANY.phoneHref} className="mt-3 inline-block rounded-md bg-white px-6 py-3 font-heading text-base font-extrabold text-brand-red">
                  {COMPANY.phone}
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <QuoteSection title={`Quote Your ${ind.name} Freight`} />
    </>
  );
}
