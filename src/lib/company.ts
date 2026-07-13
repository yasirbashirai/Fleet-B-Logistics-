// ---------------------------------------------------------------
// FLEET B LOGISTICS LLC — single source of truth for company info.
// Edit here once; every page, form, and email updates automatically.
// ---------------------------------------------------------------

export const COMPANY = {
  name: "FLEET B LOGISTICS LLC",
  shortName: "Fleet B Logistics",
  abbr: "FBL",
  tagline: "Honesty is what we stand on!",
  description:
    "Asset-based, 100% owner-operated OTR trucking company headquartered in West Palm Beach, Florida. Reliable over-the-road freight transportation with full transparency and a one-of-a-kind 20% net revenue share pool for our owner-operators.",

  usdot: "4109105",
  mc: "1569108",

  owner: {
    name: "Bendy Jean Baptiste",
    title: "Company Owner",
    email: "fleetblogistics@gmail.com",
  },

  phone: "+1 (561) 460-5739",
  phoneHref: "tel:+15614605739",
  email: "fleetblogistics@gmail.com",
  emailHref: "mailto:fleetblogistics@gmail.com",

  address: {
    street: "730 Malibu Bay Dr, Apt 106",
    city: "West Palm Beach",
    state: "Florida",
    stateAbbr: "FL",
    zip: "33401",
    full: "730 Malibu Bay Dr, Apt 106, West Palm Beach, FL 33401",
  },

  hours: "24/7 — Dispatch & Support Around the Clock",

  social: {
    facebook: "https://www.facebook.com/share/1E1Bzc34La/?mibextid=wwXIfr",
  },

  // Primary market focus
  serviceArea: "West Palm Beach, Florida — serving the Southeast and OTR lanes nationwide",

  // SEO keyword targets
  keywords: [
    "FBL",
    "Fleet B Logistics",
    "20% share pool program",
    "20% share pool programs trucking company",
    "owner-operator company",
    "trucking company in Florida",
    "OTR trucking West Palm Beach",
    "asset-based carrier Florida",
    "lease on owner operator Florida",
  ],
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.fleetblogistics.com";
