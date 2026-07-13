import type { Metadata } from "next";
import Link from "next/link";
import { REVIEWS } from "@/data/reviews";
import { COMPANY } from "@/lib/company";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero, QuoteSection, OwnerOperatorCTA } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Reviews — What Shippers & Owner-Operators Say",
  description: `Reviews of ${COMPANY.name} from shippers and leased-on owner-operators. Honest service, honest settlements — see what partners say.`,
};

export default function ReviewsPage() {
  const avg = REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length;
  return (
    <>
      <PageHero
        label="Reviews"
        title="Judged by the People We"
        highlight="Serve"
        subtitle="Shippers on our lanes and owner-operators on our fleet — in their own words."
        image="/images/truck-night.jpg"
      >
        <div className="mt-6 flex items-center gap-3">
          <div className="flex gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon key={i} name="star" className="h-6 w-6" />
            ))}
          </div>
          <p className="font-heading text-xl font-extrabold">{avg.toFixed(1)} / 5</p>
          <p className="text-sm text-white/60">average partner rating</p>
        </div>
      </PageHero>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 90}>
                <figure className="flex h-full flex-col rounded-lg bg-white p-7 shadow-card">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Icon key={j} name="star" className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">“{r.text}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy font-heading text-sm font-extrabold text-white">
                      {r.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-heading text-sm font-extrabold uppercase text-brand-navy">{r.name}</p>
                      <p className="text-xs text-slate-400">{r.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 rounded-xl bg-navy-gradient p-8 text-center text-white md:p-10">
            <h2 className="font-heading text-2xl font-extrabold uppercase md:text-3xl">
              Worked with us? <span className="hl-red">Tell us how it went.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/75">
              Honest feedback is how we stay honest. Leave a review on our Facebook page or send it straight to the owner.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Review on Facebook
              </a>
              <Link href="/contact" className="btn-outline">Send Direct Feedback</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <OwnerOperatorCTA />
      <QuoteSection />
    </>
  );
}
