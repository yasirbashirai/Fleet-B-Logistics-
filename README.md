# FLEET B LOGISTICS LLC — Website

Conversion-focused, enterprise-grade website for **FLEET B LOGISTICS LLC** ("FBL"), an asset-based,
100% owner-operated OTR trucking company in West Palm Beach, Florida.

> “Honesty is what we stand on!” — USDOT #4109105 · MC #1569108

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, designed on the company's main
flyer (red `#ed1d26` / blue `#29689a` / navy, Montserrat + Inter).

## What the site does

**Shipper funnel (SEO + quoting)**
- Home page funnel: hero → services → metrics → why-FBL → 20% pool → process → reviews → quote
- Services: OTR, Dry Van, Expedited, Southeast Regional (`/services/*`)
- Regional SEO pages: West Palm Beach, Miami, Orlando, Tampa, Jacksonville, Atlanta, Southeast (`/areas/*`)
- Industry SEO pages: Retail, Manufacturing, Food & Beverage, Construction, E-commerce/3PL (`/industries/*`)
- Quote form on every major page → emails dispatch (`/api/quote`)
- Blog with 4 SEO articles, LocalBusiness JSON-LD, sitemap.xml, robots.txt

**Owner-operator funnel (recruiting + automation)**
- `/owner-operators` — the 20% share pool program page (flyer content + interactive settlement calculator)
- `/apply` — application form → **automatically emails the applicant the official welcome letter**
  with the onboarding-kit link + PDF (the automated flow requested)
- `/onboarding` — the **full onboarding kit as a guided online form**: FMCSA driver application,
  drug-testing consent, equipment lease, direct deposit, NDA, Addendums A–C — fillable and e-signable,
  submitted to the company by email
- `/resources` — PDF downloads: onboarding kit + lease termination & equipment return checklist

## ⭐ Changing a price or rate (the one-file rule)

Every rate on the site AND inside the online forms comes from **`src/lib/rates.ts`**:
89.5% split, 4-day settlements, 20% pool rules, escrow ($250/wk → $2,500), 3% factoring, ELD fees, etc.

**Change a number there once → the entire website and all forms update automatically.**
Company info (phone, address, USDOT…) lives in `src/lib/company.ts` the same way.

## Email setup (required for live forms)

Copy `.env.example` → `.env.local` (or set in the hosting dashboard):

```
SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / SMTP_FROM
NOTIFY_EMAIL   ← where form submissions arrive
NEXT_PUBLIC_SITE_URL
```

For Gmail use an App Password (Google Account → Security → 2-Step Verification → App passwords).
Until SMTP is configured, submissions succeed but are logged to the server console instead of emailed.

## Develop / build / deploy

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (43 pages)
npm start
```

Deploy to Vercel: `vercel --prod` (remember to add the SMTP env vars in the Vercel dashboard).

## Structure

```
src/lib/company.ts      ← all company info (single source of truth)
src/lib/rates.ts        ← ⭐ ALL rates/prices — edit here only
src/lib/mailer.ts       ← email templates incl. automated welcome letter
src/data/               ← services, regions, industries, blog, reviews content
src/components/         ← header, footer, quote form, calculator, sections
src/app/                ← pages + /api routes
public/documents/       ← onboarding kit PDF + termination checklist PDF
public/images/          ← logo + freight photography
```
