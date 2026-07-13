import { COMPANY, SITE_URL } from "@/lib/company";

// LocalBusiness / MovingCompany structured data for local SEO.
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MovingCompany"],
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.name,
    alternateName: [COMPANY.abbr, COMPANY.shortName],
    slogan: COMPANY.tagline,
    description: COMPANY.description,
    url: SITE_URL,
    logo: `${SITE_URL}/images/fbl-logo.png`,
    image: `${SITE_URL}/images/hero-truck.jpg`,
    telephone: "+15614605739",
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.stateAbbr,
      postalCode: COMPANY.address.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 26.7056, longitude: -80.0684 },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: [
      { "@type": "State", name: "Florida" },
      { "@type": "State", name: "Georgia" },
      { "@type": "Country", name: "United States" },
    ],
    sameAs: [COMPANY.social.facebook],
    founder: { "@type": "Person", name: COMPANY.owner.name },
    knowsAbout: [
      "OTR trucking",
      "dry van freight",
      "owner-operator lease programs",
      "20% share pool program",
      "Southeast regional trucking",
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
