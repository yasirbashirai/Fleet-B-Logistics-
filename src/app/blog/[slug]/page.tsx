import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog";
import { COMPANY, SITE_URL } from "@/lib/company";
import { Icon } from "@/components/Icons";
import { QuoteSection, OwnerOperatorCTA } from "@/components/Sections";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = BLOG_POSTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: `${SITE_URL}/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, images: [p.image] },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = BLOG_POSTS.find((x) => x.slug === params.slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    image: `${SITE_URL}${p.image}`,
    author: { "@type": "Organization", name: COMPANY.name },
    publisher: { "@type": "Organization", name: COMPANY.name },
  };

  const others = BLOG_POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        {/* Article hero */}
        <header className="relative overflow-hidden bg-brand-navy text-white">
          <Image src={p.image} alt="" fill className="object-cover opacity-25" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-blueDark/60" />
          <div className="relative mx-auto max-w-4xl px-4 py-20 md:py-24">
            <p className="section-label">
              {p.category} · {new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {p.readMinutes} min read
            </p>
            <h1 className="mt-4 font-heading text-3xl font-extrabold uppercase leading-tight md:text-4xl">{p.title}</h1>
          </div>
          <div className="absolute bottom-0 left-0 h-2 w-full bg-red-gradient" />
        </header>

        <div className="bg-white py-16">
          <div className="mx-auto max-w-3xl space-y-8 px-4">
            <p className="border-l-4 border-brand-red pl-5 text-lg font-medium leading-relaxed text-slate-700">
              {p.excerpt}
            </p>
            {p.body.map((sec, i) => (
              <section key={i} className="space-y-4">
                {sec.heading && (
                  <h2 className="font-heading text-xl font-extrabold uppercase text-brand-navy md:text-2xl">
                    {sec.heading}
                  </h2>
                )}
                {sec.paragraphs.map((para, j) => (
                  <p key={j} className="leading-relaxed text-slate-600">{para}</p>
                ))}
              </section>
            ))}

            <div className="rounded-xl bg-navy-gradient p-8 text-center text-white">
              <p className="font-heading text-lg font-extrabold uppercase">
                Questions? Talk to us — <span className="text-brand-redLight">24/7</span>
              </p>
              <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={COMPANY.phoneHref} className="btn-primary !py-2.5 !text-xs">{COMPANY.phone}</a>
                <Link href="/apply" className="btn-secondary !py-2.5 !text-xs">Owner-Operators: Apply</Link>
              </div>
            </div>
          </div>
        </div>

        {/* More posts */}
        <div className="bg-slate-50 py-14">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-heading text-xl font-extrabold uppercase text-brand-navy">Keep Reading</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/blog/${o.slug}`}
                  className="group rounded-lg bg-white p-6 shadow-card transition hover:-translate-y-1"
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{o.category}</p>
                  <h3 className="mt-2 font-heading text-sm font-extrabold uppercase leading-snug text-brand-navy group-hover:text-brand-red">
                    {o.title}
                  </h3>
                  <p className="mt-3 flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-brand-red">
                    Read <Icon name="arrow" className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      <OwnerOperatorCTA />
      <QuoteSection />
    </>
  );
}
