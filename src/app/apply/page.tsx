import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { FMT } from "@/lib/rates";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero } from "@/components/Sections";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply — Lease On With Fleet B Logistics (Owner-Operators)",
  description: `Owner-operator application: ${FMT.split} of gross, ${FMT.settlement} settlements, no forced dispatch, ${FMT.pool} share pool after ${FMT.poolYears}. Apply in 5 minutes — welcome packet sent instantly.`,
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        label="Owner-Operator Application"
        title="Your Seat in the Pool Starts"
        highlight="Here"
        subtitle="Five minutes now — your welcome packet and onboarding kit link arrive by email the moment you submit."
        image="/images/truck-highway.jpg"
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="rounded-xl bg-white p-6 shadow-card md:p-9">
              <h2 className="font-heading text-2xl font-extrabold uppercase text-brand-navy">Owner-Operator Application</h2>
              <p className="mb-6 mt-1 text-sm text-slate-500">
                Quick pre-qualification — the full FMCSA application is in the onboarding kit.
              </p>
              <ApplyForm />
            </div>
          </Reveal>

          <div className="space-y-6 lg:col-span-2">
            <Reveal delay={80}>
              <div className="rounded-xl bg-navy-gradient p-7 text-white">
                <h3 className="font-heading text-lg font-extrabold uppercase">What you get</h3>
                <ul className="mt-4 space-y-3.5 text-sm">
                  {[
                    `${FMT.split} of gross freight revenue — every load`,
                    `Settlements in ${FMT.settlement}`,
                    "No forced dispatch — run your routes",
                    "Heavy fleet fuel discounts",
                    `${FMT.pool} net revenue share pool after ${FMT.poolYears}`,
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2.5 font-semibold">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="rounded-xl border-2 border-dashed border-brand-blue/40 bg-white p-7">
                <h3 className="font-heading text-base font-extrabold uppercase text-brand-navy">
                  📬 Instant welcome packet
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Submit this form and our system automatically emails you the official FBL welcome letter, your
                  next steps, and the link to complete the full onboarding kit online.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="rounded-xl bg-red-gradient p-7 text-center text-white shadow-card-red">
                <p className="font-heading text-base font-extrabold uppercase">Questions first?</p>
                <a href={COMPANY.phoneHref} className="mt-2 inline-block font-heading text-2xl font-extrabold">
                  {COMPANY.phone}
                </a>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/80">Recruiting & Safety — 24/7</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
