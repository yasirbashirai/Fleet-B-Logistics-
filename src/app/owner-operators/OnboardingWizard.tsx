"use client";

import { useRef, useState } from "react";
import { FORM_API } from "@/lib/formApi";
import { COMPANY } from "@/lib/company";
import { RATES, FMT } from "@/lib/rates";

// ---------------------------------------------------------------
// Online Onboarding Kit, the full FBL kit as a guided, signable
// multi-step form. All rates/percentages render from lib/rates.ts,
// so changing a price there updates this kit automatically.
// ---------------------------------------------------------------

const STEPS = [
  "Applicant Profile",
  "Driver Application",
  "Drug Testing Consent",
  "Equipment Lease",
  "Direct Deposit",
  "NDA",
  "Addendums A · B · C",
  "Review & Sign",
];

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="border-b border-slate-200 pb-4">
      <p className="section-label">{kicker}</p>
      <h2 className="mt-1 font-heading text-xl font-extrabold uppercase text-brand-navy md:text-2xl">{title}</h2>
    </div>
  );
}

function SignBlock({
  id,
  label = "Sign by typing your full legal name",
  value,
  onChange,
}: {
  id: string;
  label?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rounded-lg border-2 border-dashed border-brand-blue/50 bg-brand-blue/5 p-5">
      <label className="field-label" htmlFor={id}>✍️ {label} *</label>
      <input
        id={id}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field !border-brand-blue/40 !bg-white"
        placeholder="Full legal name"
        autoComplete="name"
      />
      {value && (
        <p className="mt-3 border-b border-slate-300 pb-1 font-serif text-3xl italic text-brand-navy">{value}</p>
      )}
      <p className="mt-2 text-xs text-slate-400">Date signed: {new Date().toLocaleDateString("en-US")}</p>
    </div>
  );
}

function Field({
  label,
  name,
  required = false,
  type = "text",
  placeholder = "",
  className = "",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="field-label" htmlFor={`f-${name}`}>
        {label} {required && "*"}
      </label>
      <input id={`f-${name}`} name={name} type={type} required={required} className="field" placeholder={placeholder} />
    </div>
  );
}

function Agree({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <label className="flex items-start gap-3 rounded-md bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
      <input type="checkbox" name={name} required value="agreed" className="mt-0.5 h-4 w-4 shrink-0 accent-brand-red" />
      <span>{children} *</span>
    </label>
  );
}

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const all = useRef<Record<string, unknown>>({});
  const wrapRef = useRef<HTMLDivElement>(null);

  // Bring the user to the top of the kit (not the top of the page) when the step changes,
  // offset for the sticky header + anchor nav.
  function scrollToKit() {
    const el = wrapRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 170;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
  // signatures per component
  const [sigApp, setSigApp] = useState("");
  const [sigDrug, setSigDrug] = useState("");
  const [sigLease, setSigLease] = useState("");
  const [sigBank, setSigBank] = useState("");
  const [sigNda, setSigNda] = useState("");
  const [sigAddendums, setSigAddendums] = useState("");
  const [sigFinal, setSigFinal] = useState("");

  function collect(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    all.current = { ...all.current, ...data };
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollToKit();
  }

  async function submitAll(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload = {
      ...all.current,
      ...data,
      signature: sigFinal,
      signatures: {
        driverApplication: sigApp,
        drugTestingConsent: sigDrug,
        equipmentLease: sigLease,
        directDeposit: sigBank,
        nda: sigNda,
        addendumsABC: sigAddendums,
        finalAcknowledgement: sigFinal,
      },
      signedDate: new Date().toISOString(),
      kitVersion: "web-v1",
    };
    try {
      const res = await fetch(`${FORM_API}/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      scrollToKit();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div ref={wrapRef} className="rounded-xl bg-white p-10 text-center shadow-card">
        <p className="text-5xl">🚛</p>
        <h2 className="mt-4 font-heading text-2xl font-extrabold uppercase text-brand-navy">
          Kit submitted & signed!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
          Your completed onboarding kit is with our Safety department. Next step: gather your documents (CDL-A, DOT
          medical card, registration, Form 2290, annual inspection, insurance certificate) and call{" "}
          <a href={COMPANY.phoneHref} className="font-bold text-brand-red">{COMPANY.phone}</a> to schedule your truck
          inspection at our West Palm Beach HQ, at least 24 hours ahead.
        </p>
        <p className="mt-6 text-xs text-slate-400">Welcome to the fleet. “{COMPANY.tagline}”</p>
      </div>
    );
  }

  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    scrollToKit();
  };

  return (
    <div ref={wrapRef} className="overflow-hidden rounded-xl bg-white shadow-card">
      {/* Progress */}
      <div className="bg-brand-navy px-6 py-5">
        <div className="flex items-center justify-between">
          <p className="font-heading text-sm font-extrabold uppercase tracking-wider text-white">
            {COMPANY.abbr} Onboarding Kit
          </p>
          <p className="text-xs font-bold text-brand-blueLight">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-red-gradient transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        <p className="mt-2 font-heading text-xs font-bold uppercase tracking-widest text-white/60">
          {STEPS[step]}
        </p>
      </div>

      <div className="p-6 md:p-9">
        {/* ---------- STEP 0: Applicant profile ---------- */}
        {step === 0 && (
          <form onSubmit={collect} className="space-y-6">
            <SectionTitle kicker="Kit Component 1" title="Applicant Personal Profile" />
            <p className="text-sm leading-relaxed text-slate-500">
              Welcome! This guided kit walks you through every form in the official {COMPANY.name} onboarding
              packet, compliant with FMCSA 49 CFR § 391.21. Your progress moves forward step by step; nothing is submitted
              until you sign at the end.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Legal Name" name="fullLegalName" required placeholder="As on your CDL" />
              <Field label="Date of Birth" name="dateOfBirth" required type="date" />
              <Field label="Phone Number" name="phone" required type="tel" placeholder="(561) 000-0000" />
              <Field label="Email" name="email" required type="email" placeholder="you@email.com" />
            </div>
            <Field label="Current Address" name="currentAddress" required placeholder="Street, City, State, ZIP" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Time at Current Address" name="timeAtAddress" required placeholder="e.g. 4 years" />
              <Field label="SSN (last 4 only, full SSN collected at inspection)" name="ssnLast4" placeholder="####" />
            </div>
            <Field label="Previous Addresses (past 3 years, if any)" name="previousAddresses" placeholder="Address, duration; Address, duration" />
            <div className="flex justify-end">
              <button className="btn-primary">Continue →</button>
            </div>
          </form>
        )}

        {/* ---------- STEP 1: Driver application ---------- */}
        {step === 1 && (
          <form onSubmit={collect} className="space-y-6">
            <SectionTitle kicker="Kit Component 2 · 49 CFR § 391.21" title="Commercial Driver Application" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="CDL State" name="cdlState" required placeholder="FL" />
              <Field label="CDL Number" name="cdlNumber" required />
              <Field label="CDL Class" name="cdlClass" required placeholder="A" />
              <Field label="Endorsements" name="cdlEndorsements" placeholder="e.g. None / Hazmat" />
              <Field label="CDL Expiration Date" name="cdlExpiration" required type="date" />
              <Field label="Years of CDL-A Experience" name="cdlYears" required placeholder="e.g. 8" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="f-denied">License ever denied, suspended, or revoked? *</label>
                <select id="f-denied" name="licenseDeniedOrRevoked" required className="field">
                  <option value="">Select…</option>
                  <option>No</option>
                  <option>Yes, details below</option>
                </select>
              </div>
              <Field label="If yes, provide details" name="licenseDetails" />
            </div>
            <div>
              <label className="field-label" htmlFor="f-exp">Driving Experience & Equipment (types, dates, approx. miles) *</label>
              <textarea
                id="f-exp"
                name="drivingExperience"
                required
                rows={3}
                className="field"
                placeholder="e.g. Tractor & semi-trailer, Dry Van, 2016 to present, ~800,000 miles"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="f-mvr">Accidents & Violations, past 3 years (write NONE if none) *</label>
              <textarea id="f-mvr" name="accidentsViolations" required rows={2} className="field" placeholder="NONE" />
            </div>
            <div>
              <label className="field-label" htmlFor="f-hist">Employment / Contract History, past 10 years (carrier, position, dates, reason for leaving) *</label>
              <textarea
                id="f-hist"
                name="employmentHistory"
                required
                rows={4}
                className="field"
                placeholder={"Carrier name, position, from/to, reason for leaving\nCarrier name, position, from/to, reason for leaving"}
              />
            </div>
            <SignBlock id="sig-app" value={sigApp} onChange={setSigApp}
              label="Certification: all entries are true and complete, sign by typing your full legal name" />
            <div className="flex justify-between">
              <button type="button" onClick={back} className="btn-secondary">← Back</button>
              <button className="btn-primary">Continue →</button>
            </div>
          </form>
        )}

        {/* ---------- STEP 2: Drug testing consent ---------- */}
        {step === 2 && (
          <form onSubmit={collect} className="space-y-6">
            <SectionTitle kicker="Kit Component 3 · FMCSA § 382.301" title="Pre-Employment Drug Testing Consent" />
            <div className="space-y-3 rounded-lg bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
              <p>By signing below, I voluntarily consent to a pre-employment controlled substance test (urine collection, SAMHSA-certified laboratory analysis, MRO review) as required by DOT/FMCSA regulations, and I acknowledge:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li><strong>Condition of contract:</strong> a verified negative result is an absolute condition of lease or employment with {COMPANY.name}.</li>
                <li><strong>Refusal to test</strong> (or tampering/failing to complete) carries the same federal penalties as a positive result.</li>
                <li><strong>Clearinghouse reporting:</strong> positives and refusals are reported to the FMCSA CDL Drug & Alcohol Clearinghouse as mandated by federal law.</li>
                <li><strong>Disqualification:</strong> a positive result or refusal immediately disqualifies me from consideration.</li>
                <li>I authorize release of results to the Designated Employer Representative of {COMPANY.name} solely to determine my qualification status.</li>
              </ul>
            </div>
            <Agree name="drugConsentAgree">
              I have read and agree to the Pre-Employment Drug Testing Consent & Acknowledgement above.
            </Agree>
            <SignBlock id="sig-drug" value={sigDrug} onChange={setSigDrug} />
            <div className="flex justify-between">
              <button type="button" onClick={back} className="btn-secondary">← Back</button>
              <button className="btn-primary">Continue →</button>
            </div>
          </form>
        )}

        {/* ---------- STEP 3: Equipment lease ---------- */}
        {step === 3 && (
          <form onSubmit={collect} className="space-y-6">
            <SectionTitle kicker="Kit Component 4 · 49 CFR Part 376" title="Owner-Operator Equipment Lease Agreement" />
            <p className="text-sm text-slate-500">
              Parties: <strong>{COMPANY.name}</strong> (USDOT #{COMPANY.usdot}, MC #{COMPANY.mc}) and you, the Lessor.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business Name (if any)" name="lessorBusinessName" placeholder="Your LLC (or personal name)" />
              <Field label="EIN or SSN for 1099/W-9" name="einOrSsn" placeholder="EIN preferred" />
              <Field label="Tractor Make / Model / Year" name="tractorMakeModelYear" required placeholder="2021 Freightliner Cascadia" />
              <Field label="VIN (full 17 digits)" name="vin" required placeholder="1FUJH…" />
              <Field label="License Plate / State" name="plateState" required placeholder="ABC1234 / FL" />
              <Field label="Requested Lease Start Date" name="leaseStartDate" type="date" />
            </div>
            <div className="space-y-3 rounded-lg bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
              <p className="font-heading font-extrabold uppercase text-brand-navy">Key terms you are agreeing to:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li><strong>Compensation:</strong> {FMT.split} of gross freight revenue per load; right to inspect the rated freight bill (§ 376.12(d),(f),(g)).</li>
                <li><strong>Settlements:</strong> processed within {FMT.settlement} of complete delivery paperwork.</li>
                <li><strong>Escrow:</strong> {FMT.escrowWeekly} deducted to a {FMT.escrowCap} cap; interest paid annually; returned within {RATES.escrow.refundDays} days of termination with final accounting (§ 376.12(k)).</li>
                <li><strong>Insurance:</strong> Carrier maintains primary auto liability & cargo under dispatch; you maintain bobtail + physical damage listing {COMPANY.name} as additional insured (§ 376.12(j)).</li>
                <li><strong>Termination:</strong> either party, any time, with {RATES.terminationNoticeDays} days written notice (§ 376.12(b)).</li>
                <li><strong>{FMT.pool} Revenue Share Pool:</strong> qualification after {FMT.poolYears} continuous service per the program rules (service gaps ≤ {RATES.revenuePool.maxServiceGapMonths} months per rolling 24-month window; active equipment; monthly pro-rata payouts within {RATES.revenuePool.payoutDaysAfterMonthClose} days of month close; maintenance grace period with verified invoice).</li>
                <li><strong>Drug & alcohol policy:</strong> full compliance with 49 CFR Part 382; a failed or refused test = immediate, permanent pool removal and lease termination.</li>
              </ul>
            </div>
            <Agree name="leaseAgree">
              I have read and agree to the Owner-Operator Equipment Lease Agreement terms, including the compensation
              split, escrow, insurance responsibilities, and the {FMT.pool} Revenue Share Program rules. I understand a
              copy of the signed lease must be carried in the cab at all times.
            </Agree>
            <SignBlock id="sig-lease" value={sigLease} onChange={setSigLease} />
            <div className="flex justify-between">
              <button type="button" onClick={back} className="btn-secondary">← Back</button>
              <button className="btn-primary">Continue →</button>
            </div>
          </form>
        )}

        {/* ---------- STEP 4: Direct deposit ---------- */}
        {step === 4 && (
          <form onSubmit={collect} className="space-y-6">
            <SectionTitle kicker="Kit Component 5" title="Direct Deposit Authorization (ACH)" />
            <p className="text-sm text-slate-500">
              Settlements route to this account within {FMT.settlement} of paperwork submission.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Account Holder / Business Name" name="bankAccountName" required />
              <Field label="Bank Name" name="bankName" required />
              <Field label="Routing Number (9 digits)" name="routingNumber" required placeholder="#########" />
              <Field label="Account Number" name="accountNumber" required />
              <div>
                <label className="field-label" htmlFor="f-acct">Account Type *</label>
                <select id="f-acct" name="accountType" required className="field">
                  <option value="">Select…</option>
                  <option>Business Checking</option>
                  <option>Personal Checking</option>
                  <option>Savings</option>
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="f-verif">Verification document you will provide *</label>
                <select id="f-verif" name="bankVerification" required className="field">
                  <option value="">Select…</option>
                  <option>Voided check (bring to inspection / email)</option>
                  <option>Official bank letter</option>
                </select>
              </div>
            </div>
            <Agree name="achAgree">
              I authorize {COMPANY.name} to initiate ACH credit entries for weekly settlements (and correcting debits
              if an error occurs) to the account above, until I revoke this authorization in writing with reasonable
              notice. Hand-written account numbers without a voided check or bank letter will not be processed.
            </Agree>
            <SignBlock id="sig-bank" value={sigBank} onChange={setSigBank} />
            <div className="flex justify-between">
              <button type="button" onClick={back} className="btn-secondary">← Back</button>
              <button className="btn-primary">Continue →</button>
            </div>
          </form>
        )}

        {/* ---------- STEP 5: NDA ---------- */}
        {step === 5 && (
          <form onSubmit={collect} className="space-y-6">
            <SectionTitle kicker="Kit Component 6" title="Mutual Non-Disclosure Agreement" />
            <div className="space-y-3 rounded-lg bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
              <p>Between {COMPANY.name} (“Carrier”) and you (“Lessor”). In summary:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li><strong>Confidential information</strong> includes freight rate structures, lane quotes, shipper/broker identities and contracts, and internal logistics systems.</li>
                <li><strong>Restricted use:</strong> confidential information is used solely to execute loads dispatched by {COMPANY.shortName}.</li>
                <li><strong>No back-solicitation:</strong> you will not bypass the Carrier to solicit or accept freight from shippers/brokers disclosed through this relationship during the lease and for 12 months after termination.</li>
                <li><strong>Survival:</strong> confidentiality obligations survive for {RATES.ndaSurvivalYears} years after lease termination.</li>
                <li><strong>Breach remedies</strong> include injunctive relief and recovery of damages and attorney fees.</li>
              </ul>
            </div>
            <Agree name="ndaAgree">I have read and agree to the Independent Contractor Mutual Non-Disclosure Agreement.</Agree>
            <SignBlock id="sig-nda" value={sigNda} onChange={setSigNda} />
            <div className="flex justify-between">
              <button type="button" onClick={back} className="btn-secondary">← Back</button>
              <button className="btn-primary">Continue →</button>
            </div>
          </form>
        )}

        {/* ---------- STEP 6: Addendums ---------- */}
        {step === 6 && (
          <form onSubmit={collect} className="space-y-6">
            <SectionTitle kicker="Kit Components 7–9" title="Addendums A, B & C" />
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 p-5">
                <h3 className="font-heading text-sm font-extrabold uppercase text-brand-navy">
                  Addendum A, ELD Device & Dashcam Policy
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  All vehicles under {COMPANY.abbr} authority must run an approved ELD and forward-facing dashcam.
                  Hardware remains Carrier property; service fees per the current hardware fee schedule are deducted
                  from weekly settlements (49 CFR § 376.12(h)). Equipment must be returned within {RATES.eld.returnDays}{" "}
                  days of lease termination.
                </p>
                <div className="mt-3">
                  <Agree name="addendumA">I agree to Addendum A, ELD Device & Dashcam Policy.</Agree>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-5">
                <h3 className="font-heading text-sm font-extrabold uppercase text-brand-navy">
                  Addendum B, Fuel Card Usage & Deduction Policy
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  A company fuel card gives you access to corporate fuel discounts. It is a cash-advance mechanism:
                  fuel purchases, cash advances, and transaction fees are deducted in full from the following
                  settlement, with network discounts passed through on your itemized sheet. Unauthorized purchases
                  deactivate the card and may terminate the lease.
                </p>
                <div className="mt-3">
                  <Agree name="addendumB">I agree to Addendum B, Fuel Card Usage & Deduction Policy.</Agree>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-5">
                <h3 className="font-heading text-sm font-extrabold uppercase text-brand-navy">
                  Addendum C, Invoice Factoring Fee & Deduction Agreement
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  To fund {FMT.settlement} settlements, invoices are factored through a commercial finance partner. A
                  fixed {FMT.factoring} factoring fee is assessed on each load&apos;s gross revenue before your{" "}
                  {FMT.split} split (example: $1,000 gross − {FMT.factoring} = $970, then split). BOL/POD scans must be
                  emailed to {COMPANY.email} within {RATES.bolSubmitHours} hours of delivery to avoid settlement holds.
                </p>
                <div className="mt-3">
                  <Agree name="addendumC">I agree to Addendum C, Invoice Factoring Fee & Deduction Agreement.</Agree>
                </div>
              </div>
            </div>
            <SignBlock id="sig-add" value={sigAddendums} onChange={setSigAddendums}
              label="Sign once to execute Addendums A, B, and C" />
            <div className="flex justify-between">
              <button type="button" onClick={back} className="btn-secondary">← Back</button>
              <button className="btn-primary">Continue →</button>
            </div>
          </form>
        )}

        {/* ---------- STEP 7: Review & final sign ---------- */}
        {step === 7 && (
          <form onSubmit={submitAll} className="space-y-6">
            <SectionTitle kicker="Final Step" title="Review & Execute Your Kit" />
            <div className="rounded-lg bg-slate-50 p-5 text-sm text-slate-600">
              <p className="font-heading font-extrabold uppercase text-brand-navy">You have completed and signed:</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  ["Driver Application", sigApp],
                  ["Drug Testing Consent", sigDrug],
                  ["Equipment Lease Agreement", sigLease],
                  ["Direct Deposit (ACH)", sigBank],
                  ["Mutual NDA", sigNda],
                  ["Addendums A · B · C", sigAddendums],
                ].map(([label, sig]) => (
                  <li key={label as string} className="flex items-center gap-2">
                    <span className={sig ? "text-emerald-600" : "text-brand-red"}>{sig ? "✓" : "✗"}</span>
                    {label}
                    {sig ? <span className="truncate font-serif italic text-slate-400">, {sig}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-brand-blue bg-brand-blue/5 p-5 text-sm leading-relaxed text-slate-600">
              <p className="font-heading font-extrabold uppercase text-brand-navy">📎 Still needed (bring or email):</p>
              <p className="mt-2">
                CDL-A (front/back) · DOT medical card · tractor registration · Form 2290 Schedule 1 · annual DOT
                inspection · certificate of insurance (bobtail + physical damage, {COMPANY.abbr} as additional insured)
                · voided check or bank letter · W-9.
              </p>
              <p className="mt-2">
                Email to <a href={COMPANY.emailHref} className="font-bold text-brand-blue">{COMPANY.email}</a> or bring
                them to your inspection.
              </p>
            </div>
            <Agree name="finalAgree">
              I certify that all information provided throughout this onboarding kit is true and complete, and I agree
              that my typed signatures execute each listed agreement with {COMPANY.name} (USDOT #{COMPANY.usdot}, MC
              #{COMPANY.mc}) as of today&apos;s date.
            </Agree>
            <SignBlock id="sig-final" value={sigFinal} onChange={setSigFinal}
              label="Master signature, type your full legal name to execute the kit" />
            <div className="flex justify-between">
              <button type="button" onClick={back} className="btn-secondary">← Back</button>
              <button disabled={status === "sending"} className="btn-primary disabled:opacity-60">
                {status === "sending" ? "Submitting…" : "Submit Signed Kit ✓"}
              </button>
            </div>
            {status === "error" && (
              <p className="text-sm font-semibold text-brand-red">
                Submission failed, call {COMPANY.phone} or email the PDF kit to {COMPANY.email}.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
