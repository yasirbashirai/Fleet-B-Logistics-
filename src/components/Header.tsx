"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/lib/company";
import { Icon } from "./Icons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/otr-trucking", label: "OTR Transportation" },
      { href: "/services/dry-van-freight", label: "Dry Van Freight" },
      { href: "/services/expedited-freight", label: "Expedited & Time-Critical" },
      { href: "/services/regional-southeast", label: "Southeast Regional" },
    ],
  },
  {
    href: "/owner-operators",
    label: "Owner-Operators",
    children: [
      { href: "/owner-operators", label: "20% Share Pool Program" },
      { href: "/apply", label: "Apply Now" },
      { href: "/onboarding", label: "Online Onboarding Kit" },
      { href: "/resources", label: "Driver Resources" },
    ],
  },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenSub(null);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-brand-navy text-white text-xs md:text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5">
          <p className="hidden sm:flex items-center gap-2 font-medium">
            <Icon name="badge" className="h-3.5 w-3.5 text-brand-red" />
            USDOT #{COMPANY.usdot} · MC #{COMPANY.mc} · Asset-Based Carrier
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-white/70">Dispatch 24/7</span>
            <a href={COMPANY.phoneHref} className="flex items-center gap-1.5 font-bold hover:text-brand-redLight">
              <Icon name="phone" className="h-3.5 w-3.5" />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`bg-white transition-shadow ${scrolled ? "shadow-lg" : "shadow-sm"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
          <Link href="/" className="flex items-center gap-3" aria-label={COMPANY.name}>
            <Image
              src="/images/fbl-logo.png"
              alt={`${COMPANY.name} logo`}
              width={110}
              height={64}
              className="h-12 w-auto md:h-14"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {NAV.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded px-3 py-2 font-heading text-[13px] font-bold uppercase tracking-wide transition-colors ${
                    pathname === item.href ? "text-brand-red" : "text-brand-navy hover:text-brand-red"
                  }`}
                >
                  {item.label}
                  {item.children && <span className="text-[9px]">▼</span>}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full min-w-60 rounded-b-md border-t-4 border-brand-red bg-white opacity-0 shadow-card transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    {item.children.map((c) => (
                      <Link
                        key={c.href + c.label}
                        href={c.href}
                        className="block px-4 py-3 text-sm font-semibold text-brand-navy hover:bg-slate-50 hover:text-brand-red"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/quote" className="btn-secondary !px-5 !py-2.5 !text-xs">
              Get a Quote
            </Link>
            <Link href="/apply" className="btn-primary !px-5 !py-2.5 !text-xs">
              Lease On
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden rounded p-2 text-brand-navy"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="lg:hidden border-t border-slate-200 bg-white px-4 pb-6 pt-2" aria-label="Mobile">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="block py-3 font-heading text-sm font-bold uppercase tracking-wide text-brand-navy"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      className="p-3 text-brand-navy"
                      onClick={() => setOpenSub(openSub === item.label ? null : item.label)}
                      aria-label={`Expand ${item.label}`}
                    >
                      {openSub === item.label ? "−" : "+"}
                    </button>
                  )}
                </div>
                {item.children && openSub === item.label && (
                  <div className="pb-2 pl-4">
                    {item.children.map((c) => (
                      <Link
                        key={c.href + c.label}
                        href={c.href}
                        className="block py-2 text-sm font-semibold text-slate-600"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/quote" className="btn-secondary">Get a Quote</Link>
              <Link href="/apply" className="btn-primary">Lease On With FBL</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
