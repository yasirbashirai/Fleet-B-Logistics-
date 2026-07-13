import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero } from "@/components/Sections";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — 24/7 Dispatch | West Palm Beach, FL",
  description: `Contact ${COMPANY.name}: ${COMPANY.phone} (24/7), ${COMPANY.email}, ${COMPANY.address.full}. Freight quotes, owner-operator applications, and general inquiries.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Talk to a Real Person,"
        highlight="24/7"
        subtitle="Freight quote, lease-on question, or load update — dispatch answers around the clock."
        image="/images/truck-red.jpg"
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-5">
          {/* Contact channels */}
          <div className="space-y-5 lg:col-span-2">
            <Reveal>
              <a href={COMPANY.phoneHref} className="flex items-center gap-5 rounded-lg border-l-4 border-brand-red bg-slate-50 p-6 transition hover:shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-red text-white"><Icon name="phone" className="h-6 w-6" /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Call Dispatch — 24/7</p>
                  <p className="font-heading text-xl font-extrabold text-brand-navy">{COMPANY.phone}</p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={70}>
              <a href={COMPANY.emailHref} className="flex items-center gap-5 rounded-lg border-l-4 border-brand-blue bg-slate-50 p-6 transition hover:shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-blue text-white"><Icon name="mail" className="h-6 w-6" /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Us</p>
                  <p className="font-heading text-lg font-extrabold text-brand-navy break-all">{COMPANY.email}</p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={140}>
              <div className="flex items-center gap-5 rounded-lg border-l-4 border-brand-navy bg-slate-50 p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-navy text-white"><Icon name="pin" className="h-6 w-6" /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Operational Headquarters</p>
                  <p className="font-semibold leading-snug text-brand-navy">{COMPANY.address.full}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={210}>
              <div className="rounded-lg bg-navy-gradient p-6 text-white">
                <p className="font-heading text-sm font-extrabold uppercase tracking-widest">Business Hours</p>
                <p className="mt-2 flex items-center gap-2 text-2xl font-heading font-extrabold">
                  <Icon name="clock" className="h-6 w-6 text-brand-red" /> Open 24/7
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Truck inspections at HQ: schedule 24 hours ahead by phone.
                </p>
                <p className="mt-4 text-xs text-white/50">USDOT #{COMPANY.usdot} · MC #{COMPANY.mc}</p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={100} className="lg:col-span-3">
            <div className="rounded-xl border border-slate-200 p-6 shadow-card md:p-9">
              <h2 className="font-heading text-2xl font-extrabold uppercase text-brand-navy">Send a Message</h2>
              <p className="mt-1 text-sm text-slate-500">
                Owner-operators: use this form and we&apos;ll email you the welcome packet + onboarding kit automatically.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 w-full">
        <iframe
          title="Fleet B Logistics location — West Palm Beach, FL"
          src="https://www.google.com/maps?q=730+Malibu+Bay+Dr,+West+Palm+Beach,+FL+33401&output=embed"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
