export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMinutes: number;
  image: string;
  category: string;
  body: { heading?: string; paragraphs: string[] }[];
  seoTitle: string;
  seoDescription: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-a-20-percent-share-pool-program-trucking",
    title: "What Is a 20% Share Pool Program, and Why Owner-Operators Are Talking About Ours",
    excerpt:
      "Most carriers offer a percentage of the load. Fleet B Logistics offers a percentage of the company. Here's exactly how our 20% net revenue share pool works, who qualifies, and what it means for a driver's long-term wealth.",
    date: "2026-07-01",
    readMinutes: 6,
    image: "/images/truck-night.jpg",
    category: "Owner-Operators",
    body: [
      {
        paragraphs: [
          "In trucking, compensation conversations almost always stop at the load: cents per mile, percentage of linehaul, fuel surcharge pass-through. What almost no carrier talks about is ownership, sharing the company's success itself with the drivers who build it.",
          "That's what Fleet B Logistics LLC's 20% Share Pool Program does, and it's why owner-operators keep calling us about it.",
        ],
      },
      {
        heading: "The program in one sentence",
        paragraphs: [
          "After five years of continuous contracted service, our owner-operators qualify for an exclusive pool that distributes 20% of the company's net revenue, paid out monthly, split pro-rata among every qualified participant, verified by full audit rights.",
        ],
      },
      {
        heading: "How qualification works",
        paragraphs: [
          "Qualification is automatic when three conditions are met concurrently: five cumulative years of active leased-on service, continuous service (gaps can't exceed two cumulative months in any rolling 24-month window), and at least one fully operational commercial vehicle continuously leased to the fleet.",
          "A maintenance grace period protects drivers whose truck goes down for repairs: submit a verified repair-shop invoice within ten business days and you keep your pool status for up to three consecutive months while you fix your equipment.",
        ],
      },
      {
        heading: "Why we built it",
        paragraphs: [
          "Our tagline is 'Honesty is what we stand on.' The share pool is that tagline turned into structure: if drivers create the company's success, drivers should share the company's success. It also means our best partners have a real reason to stay, and shippers get the most experienced, most invested drivers in the market hauling their freight.",
          "Want the full legal detail? The complete program terms are written into our Owner-Operator Equipment Lease Agreement, available in our onboarding kit. Program details and five-year service eligibility subject to terms and conditions.",
        ],
      },
    ],
    seoTitle: "20% Share Pool Program Trucking Company, How It Works | Fleet B Logistics",
    seoDescription:
      "How Fleet B Logistics' 20% net revenue share pool works: 5-year qualification, monthly pro-rata payouts, full audit rights. The owner-operator program explained.",
  },
  {
    slug: "leasing-on-with-fleet-b-logistics-what-to-expect",
    title: "Leasing On With Fleet B Logistics: What to Expect From Application to First Dispatch",
    excerpt:
      "From the contact form to your first load: the exact onboarding steps, the documents you'll need, and how our 4-business-day settlement cycle works.",
    date: "2026-06-20",
    readMinutes: 5,
    image: "/images/truck-highway.jpg",
    category: "Owner-Operators",
    body: [
      {
        paragraphs: [
          "If you're an owner-operator considering leasing on with Fleet B Logistics LLC, here's the honest, step-by-step picture of what happens after you hit 'apply', no surprises, because surprises are exactly what we don't do.",
        ],
      },
      {
        heading: "Step 1, Apply online (5 minutes)",
        paragraphs: [
          "Fill out the application form on our Owner-Operators page. You'll immediately receive our welcome letter by email, along with a link to the complete onboarding kit you can fill out and sign online.",
        ],
      },
      {
        heading: "Step 2, Complete the onboarding kit",
        paragraphs: [
          "The kit covers everything FMCSA requires and everything we require: the Commercial Driver Application (49 CFR § 391.21), drug-testing consent, the Equipment Lease Agreement with our 89.5% gross revenue split, direct deposit authorization, NDA, and the ELD, fuel card, and factoring addendums.",
          "You can complete and sign the whole thing online, or download the PDF and return it by email.",
        ],
      },
      {
        heading: "Step 3, Documents and inspection",
        paragraphs: [
          "Have ready: CDL-A (front/back), current DOT medical card, truck registration, Form 2290 Schedule 1, annual DOT inspection, and your Certificate of Insurance showing bobtail and physical damage coverage with Fleet B Logistics listed as additional insured.",
          "Schedule your physical truck inspection at our West Palm Beach headquarters at least 24 hours ahead by calling (561) 460-5739.",
        ],
      },
      {
        heading: "Step 4, First dispatch and getting paid",
        paragraphs: [
          "Once safety clears your file, you're dispatched. After delivery, scan and email your signed BOL within 24 hours, settlements process within four business days. You keep 89.5% of gross freight revenue on every load, with every deduction itemized on your settlement sheet.",
        ],
      },
    ],
    seoTitle: "Lease On With a Florida Trucking Company, Onboarding Guide | Fleet B Logistics",
    seoDescription:
      "Step-by-step guide to leasing on with Fleet B Logistics: online application, onboarding kit, required documents, 89.5% split, 4-day settlements.",
  },
  {
    slug: "asset-based-carrier-vs-freight-broker",
    title: "Asset-Based Carrier vs. Freight Broker: Why the Difference Costs (or Saves) You Money",
    excerpt:
      "When you book with a broker, you're buying a promise. When you book with an asset-based carrier, you're buying a truck. Here's why that distinction matters for your freight budget and your blood pressure.",
    date: "2026-06-05",
    readMinutes: 4,
    image: "/images/hero-truck.jpg",
    category: "Shippers",
    body: [
      {
        paragraphs: [
          "Every shipper has lived this: the load was 'covered' Friday afternoon, and Monday morning the truck never shows. That gap between promised and delivered is usually the gap between a broker and an asset-based carrier.",
        ],
      },
      {
        heading: "What 'asset-based' actually means",
        paragraphs: [
          "An asset-based carrier owns or directly controls the trucks that haul your freight. Fleet B Logistics runs under its own authority, USDOT #4109105, MC #1569108, with owner-operators leased directly to our fleet. When we commit to your load, we're committing our own equipment, not shopping your freight on a load board.",
        ],
      },
      {
        heading: "The real-world differences",
        paragraphs: [
          "Accountability: with a carrier, one company is responsible from pickup to POD. With a broker, responsibility is contractually diffused across parties you've never met.",
          "Price stability: brokers price on the spot market's mood. Carriers price on their actual operating costs, which makes contract lanes steadier.",
          "Communication: our dispatch talks to our own drivers. No relay through a third party's third party.",
        ],
      },
      {
        heading: "Where brokers do fit",
        paragraphs: [
          "Brokers are useful for surge coverage and odd lanes, no carrier runs everywhere. But your core, repeating lanes belong with an asset-based carrier that answers for its own trucks. That's the freight we want: honest lanes, run honestly, every week.",
        ],
      },
    ],
    seoTitle: "Asset-Based Carrier vs Freight Broker, What Shippers Should Know | Fleet B Logistics",
    seoDescription:
      "The real differences between booking freight with an asset-based trucking company vs a broker: accountability, pricing, communication. From Fleet B Logistics.",
  },
  {
    slug: "no-forced-dispatch-owner-operator-freedom",
    title: "No Forced Dispatch: What Operational Freedom Really Means at FBL",
    excerpt:
      "Total freedom to run your own routes, while a growing freight network keeps your calendar full. How we balance owner-operator independence with consistent, high-paying loads.",
    date: "2026-05-18",
    readMinutes: 4,
    image: "/images/truck-red.jpg",
    category: "Owner-Operators",
    body: [
      {
        paragraphs: [
          "'No forced dispatch' appears in a lot of carrier recruiting ads. Then you lease on and discover that declining two loads puts you at the bottom of the board. That's not freedom, that's a leash with extra steps.",
        ],
      },
      {
        heading: "Our version, in writing",
        paragraphs: [
          "At Fleet B Logistics, operational freedom means exactly what our flyer says: total freedom to run your own routes without forced dispatch. You're an independent contractor with your own business strategy, home time, preferred lanes, freight preferences. Our dispatch works for you, presenting consistent, high-paying loads from our growing freight network.",
        ],
      },
      {
        heading: "Freedom needs freight to mean anything",
        paragraphs: [
          "Freedom without freight is just unemployment with a truck note. The reason our model works is the network behind it: steady Southeast lanes, growing shipper relationships, and fuel discount programs that keep operating costs down while you choose the loads that fit your business.",
          "Add the 89.5% gross split, 4-business-day settlements, and the 20% share pool at year five, and independence finally comes with a long-term upside. That's the whole point.",
        ],
      },
    ],
    seoTitle: "No Forced Dispatch Trucking Company, Owner-Operator Freedom | Fleet B Logistics",
    seoDescription:
      "What no-forced-dispatch really means at Fleet B Logistics: run your own routes, keep 89.5% of gross, and qualify for the 20% share pool at 5 years.",
  },
];
