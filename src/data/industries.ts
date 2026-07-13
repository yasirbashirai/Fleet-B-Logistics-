export type Industry = {
  slug: string;
  name: string;
  headline: string;
  short: string;
  intro: string[];
  needs: string[]; // what this industry needs from a carrier
  image: string;
  seoTitle: string;
  seoDescription: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "retail-distribution",
    name: "Retail & Distribution",
    headline: "Retail Freight & Distribution Center Trucking",
    short: "On-time DC deliveries, appointment discipline, and OTIF-friendly performance.",
    intro: [
      "Retail freight lives and dies by the appointment. Missed delivery windows mean chargebacks, OTIF penalties, and empty shelves. FLEET B LOGISTICS runs retail and distribution freight with the appointment discipline big-box receivers demand.",
      "Our owner-operators arrive checked in, on time, and with clean paperwork — because their own revenue depends on it.",
    ],
    needs: [
      "Strict delivery appointment compliance",
      "Real-time in-transit visibility",
      "Clean POD paperwork within 24 hours",
      "Drop trailer options for high-volume shippers",
    ],
    image: "/images/warehouse-dock.jpg",
    seoTitle: "Retail & Distribution Trucking Services | Fleet B Logistics",
    seoDescription:
      "Retail freight carrier for distribution centers across Florida and the Southeast. OTIF-friendly, appointment-disciplined truckload service.",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    headline: "Manufacturing & Industrial Freight",
    short: "Inbound raw materials and outbound finished goods that keep production lines moving.",
    intro: [
      "A stopped production line burns money by the minute. Manufacturers count on FLEET B LOGISTICS for dependable inbound raw material deliveries and outbound finished-goods distribution across the Southeast.",
      "We coordinate directly with plant shipping offices, honor dock schedules, and communicate proactively when conditions change — no surprises.",
    ],
    needs: [
      "Reliable inbound JIT deliveries",
      "Flexible pickup windows around production schedules",
      "Load securement expertise",
      "Consistent weekly lane capacity",
    ],
    image: "/images/containers.jpg",
    seoTitle: "Manufacturing & Industrial Trucking | Fleet B Logistics",
    seoDescription:
      "Truckload carrier for manufacturers: inbound materials, outbound finished goods, JIT discipline. Florida-based, Southeast coverage.",
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage",
    headline: "Food-Grade Dry Freight Transportation",
    short: "Clean, food-grade dry van capacity for shelf-stable products and beverages.",
    intro: [
      "Shelf-stable food and beverage freight demands clean trailers, pest-free equipment, and carriers who understand food-safety expectations. Our dry van fleet serves food and beverage shippers across Florida and the Southeast with equipment maintained to food-grade standards.",
    ],
    needs: [
      "Clean, odor-free, food-grade trailers",
      "Temperature-aware routing for sensitive dry goods",
      "Fast turnarounds for high-velocity DCs",
      "Full documentation and traceability",
    ],
    image: "/images/hero-truck.jpg",
    seoTitle: "Food & Beverage Trucking — Food-Grade Dry Van | Fleet B Logistics",
    seoDescription:
      "Food-grade dry van carrier serving food & beverage shippers in Florida and the Southeast. Clean equipment, reliable delivery windows.",
  },
  {
    slug: "construction-building-materials",
    name: "Construction & Building Materials",
    headline: "Building Materials & Construction Freight",
    short: "Palletized building products delivered to yards, stores, and staging sites on schedule.",
    intro: [
      "Florida builds year-round, and construction supply chains need carriers who deliver on schedule — because crews, cranes, and concrete don't wait. We haul palletized building materials, fixtures, and supplies to distribution yards and job-site staging across the region.",
    ],
    needs: [
      "On-schedule deliveries to yards and DCs",
      "Proper load securement for heavy product",
      "Flexible delivery windows",
      "Regional surge capacity during peak season",
    ],
    image: "/images/truck-night.jpg",
    seoTitle: "Construction & Building Materials Trucking | Fleet B Logistics",
    seoDescription:
      "Truckload carrier for building materials and construction freight across Florida and the Southeast. Reliable, scheduled deliveries.",
  },
  {
    slug: "ecommerce-3pl",
    name: "E-Commerce & 3PL",
    headline: "E-Commerce, Fulfillment & 3PL Trucking",
    short: "Middle-mile truckload capacity connecting fulfillment centers, ports, and parcel networks.",
    intro: [
      "E-commerce freight never sleeps — and neither does our dispatch. FLEET B LOGISTICS provides middle-mile truckload capacity for 3PLs and fulfillment operations: FC-to-FC transfers, port-to-warehouse moves, and injection runs into parcel networks.",
      "24/7 dispatch and honest, direct communication make us an easy carrier to build automated workflows around.",
    ],
    needs: [
      "24/7 dispatch responsiveness",
      "FC-to-FC and middle-mile transfers",
      "Peak-season surge capacity",
      "Clean EDI-ready documentation",
    ],
    image: "/images/warehouse-dock.jpg",
    seoTitle: "E-Commerce & 3PL Truckload Carrier | Fleet B Logistics",
    seoDescription:
      "Middle-mile truckload capacity for 3PLs and e-commerce fulfillment. 24/7 dispatch, Florida base, Southeast + national lanes.",
  },
];
