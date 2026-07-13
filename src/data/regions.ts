export type Region = {
  slug: string;
  name: string;
  state: string;
  headline: string;
  intro: string[];
  lanes: string[];
  localNote: string;
  seoTitle: string;
  seoDescription: string;
};

export const REGIONS: Region[] = [
  {
    slug: "west-palm-beach-fl",
    name: "West Palm Beach",
    state: "Florida",
    headline: "Trucking Company in West Palm Beach, FL",
    intro: [
      "FLEET B LOGISTICS LLC is headquartered in West Palm Beach, Florida — our trucks, our dispatch, and our safety operation live here. When you book freight out of Palm Beach County, you're working with a local asset-based carrier, not a broker reselling your load.",
      "We serve shippers across West Palm Beach, Riviera Beach, Lake Worth, Boynton Beach, and the Port of Palm Beach corridor with OTR and regional truckload capacity, 24/7.",
    ],
    lanes: [
      "West Palm Beach → Atlanta, GA",
      "West Palm Beach → Charlotte, NC",
      "Port of Palm Beach → Orlando / Tampa",
      "South Florida → Jacksonville → I-95 North",
    ],
    localNote:
      "Minutes from I-95 and the Port of Palm Beach, with same-day equipment availability for Palm Beach County shippers.",
    seoTitle: "Trucking Company in West Palm Beach, FL | Fleet B Logistics",
    seoDescription:
      "Asset-based trucking company headquartered in West Palm Beach, Florida. OTR & regional truckload, 24/7 dispatch. USDOT 4109105. Call (561) 460-5739.",
  },
  {
    slug: "miami-fl",
    name: "Miami",
    state: "Florida",
    headline: "Truckload Carrier Serving Miami & South Florida",
    intro: [
      "Miami-Dade moves some of the densest freight volume in the Southeast — and FLEET B LOGISTICS covers it daily from our West Palm Beach base, under an hour up I-95.",
      "From PortMiami drayage-adjacent truckload moves to Doral and Medley distribution centers, we provide reliable FTL capacity for South Florida's import/export economy.",
    ],
    lanes: [
      "Miami → Orlando / Tampa",
      "Miami → Atlanta, GA",
      "Doral / Medley DCs → Southeast US",
      "Miami → Jacksonville → Northeast lanes",
    ],
    localNote: "Daily coverage of Miami-Dade, Broward, and Palm Beach counties.",
    seoTitle: "Miami Truckload Carrier — FTL Trucking South Florida | Fleet B Logistics",
    seoDescription:
      "Full truckload carrier serving Miami and South Florida. Asset-based, 24/7 dispatch, OTR and regional lanes from a Florida trucking company.",
  },
  {
    slug: "orlando-fl",
    name: "Orlando",
    state: "Florida",
    headline: "Orlando & Central Florida Truckload Services",
    intro: [
      "Central Florida's distribution hubs along I-4 count on dependable truckload capacity. FLEET B LOGISTICS runs Orlando lanes weekly, connecting Central Florida shippers to the Southeast and beyond.",
    ],
    lanes: [
      "Orlando → Miami / South Florida",
      "Orlando → Atlanta, GA",
      "Lakeland / I-4 corridor → Southeast US",
      "Orlando → Jacksonville",
    ],
    localNote: "Weekly capacity on the I-4 corridor from Daytona to Tampa.",
    seoTitle: "Orlando Trucking & FTL Freight Services | Fleet B Logistics",
    seoDescription:
      "Truckload freight carrier serving Orlando and Central Florida's I-4 corridor. Asset-based Florida trucking company with 24/7 dispatch.",
  },
  {
    slug: "tampa-fl",
    name: "Tampa",
    state: "Florida",
    headline: "Tampa Bay Truckload & OTR Freight",
    intro: [
      "From Port Tampa Bay to the manufacturing and food-grade shippers of Hillsborough and Pinellas counties, FLEET B LOGISTICS provides steady truckload capacity across Tampa Bay.",
    ],
    lanes: [
      "Tampa → Miami / South Florida",
      "Tampa → Jacksonville",
      "Tampa → Atlanta, GA",
      "I-75 corridor → Midwest lanes",
    ],
    localNote: "Regular I-75 and I-4 lane coverage for Tampa Bay shippers.",
    seoTitle: "Tampa Truckload Carrier — OTR Trucking | Fleet B Logistics",
    seoDescription:
      "Asset-based truckload carrier serving Tampa Bay. OTR and Southeast regional freight with 24/7 dispatch from a Florida trucking company.",
  },
  {
    slug: "jacksonville-fl",
    name: "Jacksonville",
    state: "Florida",
    headline: "Jacksonville Freight & I-95 North Lanes",
    intro: [
      "Jacksonville is Florida's gateway to the entire Eastern Seaboard. FLEET B LOGISTICS moves freight through JAXPORT-area facilities and Northeast Florida DCs onto I-95 and I-10 lanes daily.",
    ],
    lanes: [
      "Jacksonville → Savannah / Charleston",
      "Jacksonville → Atlanta, GA",
      "Jacksonville → South Florida",
      "I-10 West → Gulf Coast lanes",
    ],
    localNote: "Strategic position for Southeast-to-Northeast and Gulf Coast freight.",
    seoTitle: "Jacksonville Trucking Company — FTL Carrier | Fleet B Logistics",
    seoDescription:
      "Full truckload carrier covering Jacksonville and Northeast Florida. I-95 and I-10 lane coverage from an asset-based Florida carrier.",
  },
  {
    slug: "atlanta-ga",
    name: "Atlanta",
    state: "Georgia",
    headline: "Atlanta & Georgia Truckload Lanes",
    intro: [
      "Atlanta is the distribution heart of the Southeast, and it's one of our most-run destinations. FLEET B LOGISTICS connects Florida shippers to metro Atlanta DCs — and brings Georgia freight south — every week.",
    ],
    lanes: [
      "Atlanta → South Florida",
      "Atlanta → Orlando / Tampa",
      "Savannah port corridor → Florida",
      "Atlanta → Carolinas",
    ],
    localNote: "Consistent Florida ⇄ Georgia round-trip capacity keeps rates sharp.",
    seoTitle: "Atlanta–Florida Truckload Lanes | Fleet B Logistics",
    seoDescription:
      "Weekly truckload capacity between Atlanta, Georgia and Florida. Asset-based Southeast regional carrier with 24/7 dispatch.",
  },
  {
    slug: "southeast-us",
    name: "Southeast US",
    state: "Regional",
    headline: "Southeast Regional Trucking — FL · GA · SC · NC · AL · TN",
    intro: [
      "The Southeast corridor is where FLEET B LOGISTICS runs deepest. Florida, Georgia, South Carolina, North Carolina, Alabama, and Tennessee form our core regional network, served by owner-operators who run these lanes week in, week out.",
      "For shippers scaling beyond the region, the same fleet extends to full 48-state OTR coverage.",
    ],
    lanes: [
      "I-95: Miami → Jacksonville → Savannah → Charlotte",
      "I-75: Tampa → Atlanta → Chattanooga",
      "I-10: Jacksonville → Tallahassee → Mobile",
      "I-4: Tampa → Orlando → Daytona",
    ],
    localNote: "Regional density means better equipment availability and honest transit times.",
    seoTitle: "Southeast Regional Trucking Company | Fleet B Logistics",
    seoDescription:
      "Regional truckload carrier covering FL, GA, SC, NC, AL, TN. Asset-based fleet, 24/7 dispatch, honest service. Get a Southeast freight quote.",
  },
];
