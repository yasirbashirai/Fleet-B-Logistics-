import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { INDUSTRIES } from "@/data/industries";
import { Icon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { PageHero, QuoteSection } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Industries We Serve — Retail, Manufacturing, Food & Beverage, 3PL",
  description:
    "Fleet B Logistics hauls for retail & distribution, manufacturing, food & beverage, construction materials, and e-commerce/3PL shippers across the Southeast.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        label="Industries"
        title="Freight Expertise by"
        highlight="Industry"
        subtitle="Different freight, different rules. We run each vertical the way its receivers demand."
        image="/images/warehouse-dock.jpg"
      />
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-card transition hover:-translate-y-1"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={ind.image}
                      alt={ind.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
                    <h2 className="absolute bottom-4 left-5 font-heading text-lg font-extrabold uppercase text-white">
                      {ind.name}
                    </h2>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex-1 text-sm leading-relaxed text-slate-600">{ind.short}</p>
                    <p className="mt-4 flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-brand-red">
                      Industry details <Icon name="arrow" className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <QuoteSection />
    </>
  );
}
