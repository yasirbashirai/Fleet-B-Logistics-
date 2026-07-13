import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { FMT, RATES } from "@/lib/rates";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero, OwnerOperatorCTA } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Driver Resources — Onboarding Kit, Forms & Downloads",
  description: `Download the ${COMPANY.shortName} owner-operator onboarding kit, lease termination & equipment return checklist, and submission instructions. Or complete the kit online.`,
};

const DOWNLOADS = [
  {
    title: "Owner-Operator Onboarding Kit (Full PDF)",
    desc: "Every form in one packet: FMCSA driver application, drug-testing consent, equipment lease agreement, direct deposit, NDA, and Addendums A–C. Print, sign, and email back — or use the online version.",
    href: "/documents/fbl-owner-operator-onboarding-kit.pdf",
    tag: "Onboarding",
  },
  {
    title: "Lease Termination & Equipment Return Checklist",
    desc: "The official checklist used when a lease ends: ELD and dashcam hardware return, fuel card deactivation, IFTA decal removal, safety sign-off, and the escrow final release statement. Used in every termination process.",
    href: "/documents/fbl-lease-termination-equipment-return-checklist.pdf",
    tag: "Offboarding",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        label="Driver Resources"
        title="Forms, Kits &"
        highlight="Downloads"
        subtitle="Everything an FBL owner-operator needs — from first application to final escrow release."
        image="/images/warehouse-dock.jpg"
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-4">
          {/* Online kit callout */}
          <Reveal>
            <div className="mb-10 flex flex-col items-center justify-between gap-6 rounded-xl bg-navy-gradient p-8 text-white md:flex-row">
              <div>
                <h2 className="font-heading text-xl font-extrabold uppercase md:text-2xl">
                  Skip the printer — sign the kit <span className="hl-red">online</span>
                </h2>
                <p className="mt-2 max-w-xl text-sm text-white/75">
                  The complete onboarding kit as a guided web form: fill out every section, e-sign each agreement, and
                  submit straight to Safety in one sitting.
                </p>
              </div>
              <Link href="/onboarding" className="btn-primary whitespace-nowrap">Start Online Kit →</Link>
            </div>
          </Reveal>

          {/* Downloads */}
          <div className="grid gap-6 md:grid-cols-2">
            {DOWNLOADS.map((d, i) => (
              <Reveal key={d.href} delay={i * 100}>
                <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-7 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-red text-white shadow-card-red">
                      <Icon name="doc" className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                      {d.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-extrabold uppercase leading-snug text-brand-navy">
                    {d.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{d.desc}</p>
                  <a href={d.href} download className="btn-secondary mt-6 !py-2.5 !text-xs">
                    <Icon name="download" className="h-4 w-4" /> Download PDF
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Submission instructions */}
          <Reveal className="mt-12">
            <div className="rounded-xl bg-white p-8 shadow-card">
              <h2 className="font-heading text-xl font-extrabold uppercase text-brand-navy">
                Submission & Paperwork Instructions
              </h2>
              <div className="mt-6 grid gap-8 md:grid-cols-3">
                <div>
                  <p className="font-heading text-sm font-extrabold uppercase text-brand-red">📍 Mail & Inspections</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Original hard copies and physical truck inspections happen at our operational HQ:
                    <br />
                    <strong className="text-brand-navy">{COMPANY.address.full}</strong>
                    <br />
                    Schedule inspections 24h ahead: <a href={COMPANY.phoneHref} className="font-bold text-brand-red">{COMPANY.phone}</a>
                  </p>
                </div>
                <div>
                  <p className="font-heading text-sm font-extrabold uppercase text-brand-red">📱 ELD Setup</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Download your assigned ELD app (Motive, Samsara, or HOS247 per your fleet setup). Safety emails
                    your driver credentials once Phase 1 paperwork clears. Plug in the hardware, sync via Bluetooth,
                    and you&apos;re dispatch-ready.
                  </p>
                </div>
                <div>
                  <p className="font-heading text-sm font-extrabold uppercase text-brand-red">📄 BOL & Getting Paid</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Scan signed BOLs, lumper and fuel receipts with a mobile scanning app and email to{" "}
                    <a href={COMPANY.emailHref} className="font-bold text-brand-blue">{COMPANY.email}</a> within{" "}
                    {RATES.bolSubmitHours} hours of delivery — settlements process within {FMT.settlement}.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <OwnerOperatorCTA />
    </>
  );
}
