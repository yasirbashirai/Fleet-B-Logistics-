export type Review = {
  name: string;
  role: string;
  rating: number;
  text: string;
};

// Placeholder testimonials — replace with real client reviews as they come in.
export const REVIEWS: Review[] = [
  {
    name: "Marcus D.",
    role: "Owner-Operator, leased on 2026",
    rating: 5,
    text: "The 85.5% split is real and settlements actually hit in four days like they promise. No forced dispatch, no games. First carrier I've leased to that runs completely transparent.",
  },
  {
    name: "Sandra K.",
    role: "Logistics Manager, Retail Distribution",
    rating: 5,
    text: "Fleet B picked up when our regular carrier fell off a Friday load. On time, clean paperwork, driver communicated the whole way. They've been on our routing guide since.",
  },
  {
    name: "James T.",
    role: "Owner-Operator, leased on 2026",
    rating: 5,
    text: "I've driven for carriers that talk 'family' and pay like strangers. Bendy runs this one on honesty — you see the rated freight bill, you know your math. The 20% share pool after five years is why I'm staying.",
  },
  {
    name: "Luis R.",
    role: "Shipping Supervisor, Building Materials",
    rating: 5,
    text: "Dependable on our Florida-to-Atlanta lane every single week. Same communication, same professionalism. Honest carrier — their tagline isn't marketing.",
  },
  {
    name: "Denise W.",
    role: "3PL Capacity Manager",
    rating: 4,
    text: "Responsive 24/7 dispatch, which matters when you're covering loads at 9pm. Straight shooters on transit times — they tell you what they can actually do.",
  },
  {
    name: "Antoine P.",
    role: "Owner-Operator applicant",
    rating: 5,
    text: "The onboarding was the smoothest I've experienced — filled out the whole kit online, got the welcome packet by email the same hour I applied.",
  },
];
