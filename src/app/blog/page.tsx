import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blog";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero, QuoteSection, OwnerOperatorCTA } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Blog — Trucking Insights for Shippers & Owner-Operators",
  description:
    "The Fleet B Logistics blog: the 20% share pool explained, lease-on guides, asset-based carrier vs broker, and honest trucking industry insight.",
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <>
      <PageHero
        label="Blog"
        title="Straight Talk From the"
        highlight="Road"
        subtitle="Guides and honest insight for shippers and owner-operators — no fluff, no filler."
        image="/images/driver-cab.jpg"
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          {/* Featured */}
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-xl bg-white shadow-card transition hover:-translate-y-1 lg:grid-cols-2"
            >
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <span className="absolute left-5 top-5 rounded bg-brand-red px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-white">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                  {featured.category} · {new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {featured.readMinutes} min read
                </p>
                <h2 className="mt-3 font-heading text-2xl font-extrabold uppercase leading-tight text-brand-navy group-hover:text-brand-red md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{featured.excerpt}</p>
                <p className="mt-5 flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-brand-red">
                  Read article <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-card transition hover:-translate-y-1"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <span className="absolute left-4 top-4 rounded bg-brand-navy/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {p.readMinutes} min
                    </p>
                    <h2 className="mt-2 flex-1 font-heading text-base font-extrabold uppercase leading-snug text-brand-navy group-hover:text-brand-red">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">{p.excerpt}</p>
                  </div>
                </Link>
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
