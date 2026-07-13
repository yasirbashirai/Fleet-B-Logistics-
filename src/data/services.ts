export type Service = {
  slug: string;
  name: string;
  short: string; // card blurb
  hero: string; // page intro
  image: string;
  icon: string; // emoji-style icon key used by ServiceIcon
  bullets: string[];
  body: string[]; // paragraphs
  seoTitle: string;
  seoDescription: string;
};

export const SERVICES: Service[] = [
  {
    slug: "otr-trucking",
    name: "OTR Transportation",
    short:
      "Long-haul, over-the-road freight across the Southeast and nationwide — our core service, run by experienced owner-operators.",
    hero: "Coast-to-coast over-the-road trucking with asset-based reliability and 24/7 dispatch.",
    image: "/images/truck-blue-highway.jpg",
    icon: "route",
    bullets: [
      "Full truckload (FTL) OTR freight",
      "Southeast regional + 48-state coverage",
      "24/7 dispatch and load tracking",
      "Experienced CDL-A owner-operators only",
    ],
    body: [
      "Over-the-road transportation is what FLEET B LOGISTICS LLC was built on. From our West Palm Beach, Florida headquarters we move full truckload freight across the Southeast and into all 48 contiguous states, with disciplined dispatch, transparent communication, and delivery windows you can build a supply chain around.",
      "Because we are 100% owner-operated, the driver hauling your freight has a direct financial stake in every load delivered on time and damage-free. That's an accountability model no fleet of hourly drivers can match.",
      "Every truck in our network runs under our authority (USDOT #4109105, MC #1569108) with full primary auto liability and cargo insurance, ELD compliance, and forward-facing dashcams as standard.",
    ],
    seoTitle: "OTR Trucking Company in West Palm Beach, Florida | Fleet B Logistics",
    seoDescription:
      "Asset-based OTR transportation from West Palm Beach, FL. Full truckload freight across the Southeast and 48 states with 24/7 dispatch. Call (561) 460-5739.",
  },
  {
    slug: "dry-van-freight",
    name: "Dry Van Freight",
    short:
      "53' dry van capacity for palletized, boxed, and packaged freight — the workhorse of your supply chain.",
    hero: "Secure, weatherproof 53' dry van capacity for the Southeast and beyond.",
    image: "/images/truck-white.jpg",
    icon: "box",
    bullets: [
      "53' dry van trailers",
      "Palletized and floor-loaded freight",
      "Retail, manufacturing, and consumer goods",
      "Drop-and-hook capability on request",
    ],
    body: [
      "Dry van is the backbone of American freight — and the backbone of our fleet. FLEET B LOGISTICS moves palletized, boxed, and packaged commodities in secure 53-foot dry van trailers, protecting your product from weather, theft, and handling damage.",
      "Our owner-operators treat trailer condition and load securement as their own business, because it is. Expect clean equipment, correct load bars and straps, and photos on request at pickup and delivery.",
    ],
    seoTitle: "Dry Van Trucking & FTL Freight | Fleet B Logistics — Florida Carrier",
    seoDescription:
      "53' dry van truckload capacity from a Florida asset-based carrier. Secure, on-time dry freight across the Southeast US. Get a fast quote today.",
  },
  {
    slug: "expedited-freight",
    name: "Expedited & Time-Critical",
    short:
      "When the load absolutely cannot be late — team-style planning, priority dispatch, and constant communication.",
    hero: "Time-critical freight handled with priority dispatch and real-time updates.",
    image: "/images/truck-blue-reefer.jpg",
    icon: "clock",
    bullets: [
      "Priority dispatch, 24/7",
      "Real-time check calls and tracking",
      "Direct owner-operator accountability",
      "Weekend and holiday coverage",
    ],
    body: [
      "Production line down? Retail launch date locked? Some freight can't wait for a maybe. Our expedited service puts your load first in line: priority dispatch, aggressive but legal transit planning, and proactive check calls so you always know where your freight is.",
      "With dispatch answering 24/7, you'll never chase a voicemail while your load sits on a dock.",
    ],
    seoTitle: "Expedited Trucking & Time-Critical Freight | Fleet B Logistics",
    seoDescription:
      "Expedited, time-critical truckload freight from West Palm Beach, FL. Priority 24/7 dispatch and real-time tracking. Call (561) 460-5739 now.",
  },
  {
    slug: "regional-southeast",
    name: "Southeast Regional",
    short:
      "Dense lane coverage across Florida, Georgia, and the Carolinas — fast turns and reliable capacity where we live.",
    hero: "Home-field advantage across Florida and the Southeast corridor.",
    image: "/images/fleet-reefer-dock.jpg",
    icon: "map",
    bullets: [
      "Florida intrastate + Southeast lanes",
      "FL ⇄ GA ⇄ SC ⇄ NC ⇄ AL ⇄ TN corridors",
      "Consistent weekly capacity",
      "Local knowledge, local accountability",
    ],
    body: [
      "The Southeast is our home turf. From the Port of Palm Beach to Atlanta distribution corridors, we run the I-95, I-75, I-10, and I-4 lanes daily and know their docks, their traffic, and their timing.",
      "Shippers with recurring regional lanes get dedicated weekly capacity commitments — one call, the same reliable trucks, every week.",
    ],
    seoTitle: "Southeast Regional Trucking — FL, GA, SC, NC | Fleet B Logistics",
    seoDescription:
      "Regional truckload carrier covering Florida, Georgia, and the Carolinas. Consistent weekly capacity on I-95, I-75, I-10 and I-4 lanes.",
  },
];

// Equipment & capacity gallery — client-provided fleet photography.
// Shown on the Services page; capacity beyond dry van available on request
// through our owner-operator network.
export type Equipment = { name: string; image: string; note: string };

export const EQUIPMENT: Equipment[] = [
  { name: "53' Dry Van", image: "/images/truck-white.jpg", note: "Palletized & boxed freight — our core trailer" },
  { name: "Refrigerated (Reefer)", image: "/images/equip-reefer.jpg", note: "Temp-controlled capacity on request" },
  { name: "Flatbed", image: "/images/equip-flatbed.jpg", note: "Open-deck loads through our network" },
  { name: "End Dump", image: "/images/equip-dump.jpg", note: "Aggregates & bulk material moves" },
  { name: "Pneumatic Tank", image: "/images/equip-pneumatic.jpg", note: "Dry bulk capacity on request" },
  { name: "Power Only", image: "/images/truck-white-road.jpg", note: "Your trailer, our tractor & driver" },
];
