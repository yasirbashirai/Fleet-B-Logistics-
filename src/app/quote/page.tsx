import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { Icon } from "@/components/Icons";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import { PageHero, CredentialStrip } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Get a Freight Quote — Fast, Honest Truckload Rates",
  description: `Request a truckload freight quote from ${COMPANY.name}. Asset-based carrier rates with no broker margin. 24/7 dispatch: ${COMPANY.phone}.`,
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        label="Freight Quote"
        title="Honest Rates,"
        highlight="Fast"
        subtitle="Direct carrier pricing from our own fleet — reviewed by real dispatchers, 24/7."
        image="/images/truck-blue-highway.jpg"
      />
      <CredentialStrip />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="rounded-xl bg-white p-6 shadow-card md:p-9">
              <h2 className="font-heading text-2xl font-extrabold uppercase text-brand-navy">Tell Us About Your Load</h2>
              <p className="mb-6 mt-1 text-sm text-slate-500">The more detail, the sharper the number.</p>
              <QuoteForm />
            </div>
          </Reveal>
          <div className="space-y-6 lg:col-span-2">
            <Reveal delay={80}>
              <div className="rounded-xl bg-navy-gradient p-7 text-white">
                <h3 className="font-heading text-lg font-extrabold uppercase">Why our quotes hold</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  {[
                    "We quote our own trucks — not spot-market hopes",
                    "No broker margin stacked on your rate",
                    "Itemized pricing: linehaul, fuel, accessorials",
                    "If we can't cover it, we say so up front",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="rounded-xl bg-red-gradient p-7 text-center text-white shadow-card-red">
                <Icon name="phone" className="mx-auto h-9 w-9" />
                <p className="mt-3 font-heading text-lg font-extrabold uppercase">Hot load? Skip the form.</p>
                <a href={COMPANY.phoneHref} className="mt-3 inline-block rounded-md bg-white px-7 py-3 font-heading text-lg font-extrabold text-brand-red">
                  {COMPANY.phone}
                </a>
                <p className="mt-2 text-xs uppercase tracking-widest text-white/80">Dispatch answers 24/7</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
