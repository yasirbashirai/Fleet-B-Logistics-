import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { FMT } from "@/lib/rates";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero } from "@/components/Sections";
import OnboardingWizard from "./OnboardingWizard";

export const metadata: Metadata = {
  title: "Online Onboarding Kit — Fill Out & Sign | Owner-Operators",
  description: `Complete the ${COMPANY.shortName} owner-operator onboarding kit online: FMCSA driver application, lease agreement (${FMT.split} split), direct deposit, NDA, and addendums — fill out and e-sign in one sitting.`,
};

export default function OnboardingPage() {
  return (
    <>
      <PageHero
        label="Owner-Operator Onboarding"
        title="Fill Out & Sign Your Kit"
        highlight="Online"
        subtitle="Every form from the official FBL onboarding kit, in one guided flow. Complete it in one sitting or download the PDF version below."
        image="/images/driver-cab.jpg"
      >
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="/documents/fbl-owner-operator-onboarding-kit.pdf"
            className="btn-outline !text-xs"
            download
          >
            <Icon name="download" className="h-4 w-4" /> Prefer paper? Download the PDF kit
          </a>
        </div>
      </PageHero>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <OnboardingWizard />
          </Reveal>
          <p className="mt-8 text-center text-xs leading-relaxed text-slate-400">
            Electronic signatures on this kit are intended to carry the same force as handwritten signatures under the
            U.S. E-SIGN Act. Original hard copies may still be requested by Safety and can be mailed to{" "}
            {COMPANY.address.full}. Questions? Call {COMPANY.phone} — 24/7.
          </p>
        </div>
      </section>
    </>
  );
}
