import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { clinic } from "@/content/clinic";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { DentalCursor } from "@/components/layout/DentalCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd, personJsonLd } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: {
    default:
      "Dr. Sibi's Dental Care and Implant Center | Dentist & Implantologist in Palani",
    template: "%s | Dr. Sibi's Dental Care",
  },
  description:
    "Premium dental care and implant expertise in Palani. Prosthodontist and implantologist Dr. V. Sibikumar (MDS). Book an appointment, call or WhatsApp the clinic.",
  applicationName: clinic.name,
  authors: [{ name: clinic.credit.name }],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101314",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-sm focus:text-text-light"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <PageTransition>
            <main id="main">{children}</main>
          </PageTransition>
          <Footer />
          <MobileActionBar />
          <DentalCursor />
        </Providers>
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={personJsonLd()} />
      </body>
    </html>
  );
}
