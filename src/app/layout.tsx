import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCallBar from "@/components/StickyCallBar";
import JsonLd from "@/components/JsonLd";
import { COMPANY, SITE_URL } from "@/lib/company";

const heading = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-heading",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.shortName} | Asset-Based OTR Trucking Company in West Palm Beach, Florida`,
    template: `%s | ${COMPANY.shortName}`,
  },
  description: COMPANY.description,
  keywords: [...COMPANY.keywords],
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    title: `${COMPANY.name}, ${COMPANY.tagline}`,
    description: COMPANY.description,
    images: ["/images/hero-truck.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        <JsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
