import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/company";
import { FMT, RATES } from "@/lib/rates";
import { Icon } from "./Icons";
import Counter from "./Counter";
import QuoteForm from "./QuoteForm";
import Reveal from "./Reveal";

/* ---------- Page hero (inner pages) ---------- */
export function PageHero({
  label,
  title,
  highlight,
  subtitle,
  image = "/images/truck-blue-highway.jpg",
  children,
}: {
  label: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <Image src={image} alt="" fill priority className="object-cover opacity-25" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-blueDark/60" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
        <p className="section-label">{label}</p>
        <h1 className="mt-3 max-w-4xl font-heading text-4xl font-extrabold uppercase leading-tight md:text-5xl">
          {title} {highlight && <span className="hl-red">{highlight}</span>}
        </h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-white/80">{subtitle}</p>}
        {children}
      </div>
      <div className="absolute bottom-0 left-0 h-2 w-full bg-red-gradient" />
    </section>
  );
}

/* ---------- Infrastructure metrics band ---------- */
export function MetricsBand() {
  const metrics = [
    { end: 100, suffix: "%", label: "Owner-Operated Fleet" },
    { end: RATES.grossRevenueSplit, suffix: "%", decimals: 1, label: "Gross Revenue to Drivers" },
    { end: RATES.settlementDays, suffix: "-Day", label: "Settlement Turnaround" },
    { end: 24, suffix: "/7", label: "Dispatch & Support" },
    { end: 48, suffix: "", label: "States Covered OTR" },
  ];
  return (
    <section className="bg-brand-navy py-12 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center md:grid-cols-5">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 80}>
            <p className="font-heading text-4xl font-extrabold text-white md:text-5xl">
              <Counter end={m.end} suffix={m.suffix} decimals={m.decimals ?? 0} />
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-brand-blueLight">{m.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Quote form section (used on every major page) ---------- */
export function QuoteSection({
  title = "Get an Instant Freight Quote",
  sub = "Tell us about your load, our 24/7 dispatch team responds fast, with honest numbers.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section id="quote" className="relative overflow-hidden bg-navy-gradient py-20 text-white">
      <Image src="/images/fleet-lineup.jpg" alt="" fill className="object-cover opacity-10" sizes="100vw" />
      <div className="absolute -right-20 top-0 h-full w-1/3 -skew-x-12 bg-brand-blue/10" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        <div>
          <p className="section-label">Freight Quote</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold uppercase leading-tight md:text-4xl">
            {title.split(" ").slice(0, -1).join(" ")} <span className="hl-red">{title.split(" ").slice(-1)}</span>
          </h2>
          <p className="mt-4 max-w-md text-white/75">{sub}</p>
          <ul className="mt-8 space-y-4">
            {[
              "Direct carrier rates, no broker margin stacking",
              "Asset-based: we quote trucks we actually control",
              "24/7 response from real dispatchers",
              "Transparent, itemized pricing",
            ].map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm font-semibold">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red">
                  <Icon name="check" className="h-3.5 w-3.5 text-white" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur">
            <Icon name="phone" className="h-8 w-8 text-brand-redLight" />
            <div>
              <p className="text-xs uppercase tracking-wider text-white/60">Prefer to talk? Call dispatch 24/7</p>
              <a href={COMPANY.phoneHref} className="font-heading text-xl font-extrabold hover:text-brand-redLight">
                {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-card md:p-8">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

/* ---------- Owner-operator CTA banner ---------- */
export function OwnerOperatorCTA() {
  return (
    <section className="relative overflow-hidden bg-red-gradient py-16 text-white">
      <div className="absolute -left-10 top-0 h-full w-40 -skew-x-12 bg-white/10" />
      <div className="absolute right-10 top-0 h-full w-20 -skew-x-12 bg-brand-navy/20" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center lg:flex-row lg:text-left">
        <div className="flex-1">
          <h2 className="font-heading text-3xl font-extrabold uppercase leading-tight md:text-4xl">
            Owner-Operators: Drive Your Success. <span className="text-brand-navy">Share Our Growth.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-white/90">
            Earn your place in our exclusive revenue share pool, {FMT.pool} of company net revenue after{" "}
            {FMT.poolYears} of service. Keep {FMT.split} of gross on every load, paid in {FMT.settlement}.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/owner-operators" className="btn-outline whitespace-nowrap">
            See the Program
          </Link>
          <Link
            href="/owner-operators#apply"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-brand-navy px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-card transition-transform hover:scale-[1.03] md:text-base"
          >
            Apply Today <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust / credential strip ---------- */
export function CredentialStrip() {
  const items = [
    { icon: "badge", text: `USDOT #${COMPANY.usdot}` },
    { icon: "doc", text: `MC #${COMPANY.mc}` },
    { icon: "shield", text: "Fully Insured, Liability & Cargo" },
    { icon: "wheel", text: "FMCSA / ELD Compliant" },
    { icon: "clock", text: "24/7 Dispatch" },
  ];
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-4">
        {items.map((it) => (
          <span key={it.text} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Icon name={it.icon} className="h-4 w-4 text-brand-red" />
            {it.text}
          </span>
        ))}
      </div>
    </div>
  );
}
