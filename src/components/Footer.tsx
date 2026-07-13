import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/company";
import { FMT } from "@/lib/rates";
import { SERVICES } from "@/data/services";
import { Icon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      {/* Red accent line */}
      <div className="h-1.5 bg-red-gradient" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="inline-block rounded bg-white p-2">
            <Image src="/images/fbl-logo.png" alt={`${COMPANY.name} logo`} width={140} height={80} className="h-14 w-auto" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {COMPANY.name}, asset-based, 100% owner-operated OTR trucking company in West Palm Beach, Florida.
          </p>
          <p className="mt-3 font-heading text-sm font-bold uppercase tracking-wider text-brand-redLight">
            “{COMPANY.tagline}”
          </p>
          <p className="mt-3 text-xs text-white/50">
            USDOT #{COMPANY.usdot} · MC #{COMPANY.mc}
          </p>
          <a
            href={COMPANY.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded border border-white/30 px-3 py-1.5 text-xs font-semibold hover:bg-white/10"
          >
            Follow us on Facebook
          </a>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="hover:text-brand-redLight">
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services#industries" className="hover:text-brand-redLight">Industries We Serve</Link>
            </li>
            <li>
              <Link href="/services#areas" className="hover:text-brand-redLight">Service Areas</Link>
            </li>
            <li>
              <Link href="/quote" className="font-semibold text-brand-blueLight hover:text-white">
                Request a Freight Quote →
              </Link>
            </li>
          </ul>
        </div>

        {/* Owner-operators + company */}
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Owner-Operators</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link href="/owner-operators#program" className="hover:text-brand-redLight">{FMT.pool} Share Pool Program</Link></li>
            <li><Link href="/owner-operators#apply" className="hover:text-brand-redLight">Apply to Lease On</Link></li>
            <li><Link href="/owner-operators#onboarding" className="hover:text-brand-redLight">Online Onboarding Kit</Link></li>
            <li><Link href="/owner-operators#resources" className="hover:text-brand-redLight">Driver Resources & Forms</Link></li>
            <li><Link href="/owner-operators#faq" className="hover:text-brand-redLight">Owner-Operator FAQ</Link></li>
          </ul>

          <h3 className="mt-8 font-heading text-sm font-bold uppercase tracking-widest text-white">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link href="/about" className="hover:text-brand-redLight">About Us</Link></li>
            <li><Link href="/about#reviews" className="hover:text-brand-redLight">Reviews</Link></li>
            <li><Link href="/contact" className="hover:text-brand-redLight">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Contact Us</h3>
          <ul className="mt-4 space-y-4 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <a href={COMPANY.phoneHref} className="font-bold hover:text-brand-redLight">{COMPANY.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <a href={COMPANY.emailHref} className="hover:text-brand-redLight">{COMPANY.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span>{COMPANY.address.full}</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span>Open 24/7, dispatch & support</span>
            </li>
          </ul>
          <Link href="/contact" className="btn-primary mt-6 w-full">Contact Us</Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>
            {FMT.pool} share pool program details and {FMT.poolYears} service eligibility subject to terms and conditions.
          </p>
        </div>
      </div>
    </footer>
  );
}
