import type { Metadata } from "next";
import ConditionalLayout from "./conditional-layout/conditionalLayout";
import { Lexend, Outfit } from "next/font/google";
import "@/styles/globals.css";
import Trackers from "@/component/Trackers";
import CookieConsent from "@/component/CookieConsent";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/utils/buildMetadata";
import AnnouncementLoader from "@/component/announcements/AnnouncementLoader";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

// T4: the site's `font-outfit` class (tailwind.config.js) was never loaded.
// next/font self-hosts it (no request to Google at runtime) and exposes a CSS variable
// that tailwind.config.js now reads (spec 09 C5).
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // No "%s | AL&CO" template on purpose: CMS titles and page titles already
  // carry the brand suffix, so a template would double it.
  title: "NLP and Hypnosis Certification, Taught Live | AL&CO",
  description:
    "Arslan Larik & Company (AL&CO): internationally certified NLP, hypnosis and coaching training, taught live on Zoom. Explore the six levels and enrol today.",
  applicationName: "AL&CO",

  // Icons: served automatically from app/favicon.ico, app/icon.png and
  // app/apple-icon.png (Next.js file conventions). No `icons` override here.

  other: {
    "facebook-domain-verification": "yi9ep7s1xi6v5r5sn01f1mxwc3cgvu",
  },

  // No `alternates.canonical` here. Every page sets its own canonical.
  openGraph: {
    siteName: "AL&CO",
    locale: "en_PK",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },

  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE.url],
  },

  robots: {
    index: true,
    follow: true,
  },
};

// The single canonical Organization entity, referenced elsewhere via
// "@id": "https://arslanlarik.com/#organization" (Course provider, Blog publisher).
// No prices or offers, ever (website rule). The +1 (206) number is display-only
// and must never be added here.
function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "Arslan Larik & Company",
    alternateName: ["AL&CO", "Center for Human Brilliance and Behavioral Reengineering"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo-512.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/og-default.jpg`,
    description:
      "Arslan Larik & Company (AL&CO), the Center for Human Brilliance and Behavioral Reengineering: world-class NLP, hypnosis and coaching certification, taught live.",
    slogan: "World-class NLP, hypnosis and coaching certification, taught live.",
    foundingDate: "2018",
    email: "connect@arslanlarik.com",
    telephone: "+923360082222",
    address: {
      "@type": "PostalAddress",
      streetAddress: "D86/1, Gulshan-e-Iqbal, Block 7",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      postalCode: "75300",
      addressCountry: "PK",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+923360082222",
        email: "connect@arslanlarik.com",
        contactType: "customer service",
        availableLanguage: ["English"],
      },
    ],
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/about-us/who-is-arslan-larik#person`,
      name: "Arslan Larik",
      jobTitle: "Founder and Master Trainer",
      // Rulings of 25 Sep 2026: Arslan's current master-trainer credentials.
      // NLPU is Arslan's personal credential only: AL&CO is not an NLPU affiliate
      // and students do not receive NLPU certificates. ICF never appears here.
      description:
        "Arslan Larik, Founder and Master Trainer of AL&CO: Master Trainer of NLP (ABNLP), Hypnosis Master Trainer (ABH), Master Trainer of NLP University (NLPU), ANLP Accredited Master Trainer and ANLP International Ambassador for Pakistan.",
      url: `${SITE_URL}/about-us/who-is-arslan-larik`,
    },
    employee: [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/about-us/who-is-bismillah-pervez#person`,
        name: "Bismillah Pervez",
        // DECISIONS v2 F2: jobTitle matches B 04 exactly; the standard line goes in description.
        // Credentials (MCC, ACTC, ANLP Accredited Master Trainer) are on the B 04 Person node (same @id).
        // Never "ABNLP Master Trainer", never "Master Trainer" without ANLP.
        jobTitle: "Chief Executive Officer",
        description: "Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK)",
        url: `${SITE_URL}/about-us/who-is-bismillah-pervez`,
      },
    ],
    // DECISIONS v2 T5: approved-institute status, only where the brochure states it
    // (long brochure p28). TLTA, NGH and ANLP are deliberately not listed here.
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "ABNLP Approved Institute of NLP",
        credentialCategory: "Approved training institute",
        recognizedBy: { "@type": "Organization", name: "American Board of Neuro-Linguistic Programming (ABNLP)" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Approved Institute of NLP Coaching",
        credentialCategory: "Approved training institute",
        recognizedBy: { "@type": "Organization", name: "ABNLP Coaching Division" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "ABH Approved School of Hypnosis",
        credentialCategory: "Approved training institute",
        recognizedBy: { "@type": "Organization", name: "American Board of Hypnotherapy (ABH)" },
      },
    ],
    // Approved institutes are enrolled with each board as an organisation (long brochure p21, p23).
    memberOf: [
      { "@type": "Organization", name: "American Board of Neuro-Linguistic Programming (ABNLP)" },
      { "@type": "Organization", name: "ABNLP Coaching Division" },
      { "@type": "Organization", name: "American Board of Hypnotherapy (ABH)" },
    ],
    sameAs: [
      "https://www.facebook.com/arslanlariknlp/",
      "https://www.instagram.com/arslanlariknlp/",
      "https://www.linkedin.com/company/arslanlarikco/",
      "https://www.youtube.com/channel/UCEwzXP7OMPUvxFgTr2H5p_w/videos",
    ],
  };
}

// Escape "<" so a value can never close the script tag.
const orgJsonLd = JSON.stringify(buildOrganizationJsonLd()).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        {/* Videos come from Cloudinary: open that connection early so they start faster. */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      </head>
      <body className={lexend.className}>
        {/* Plain <script>, not next/script: this puts the JSON-LD in the server HTML. */}
        <script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: orgJsonLd }}
        />

                <Trackers />
        <ConditionalLayout>
          {/* Announcement window: webinar and upcoming trainings from the CMS. Renders nothing when there is nothing to announce. */}
          <AnnouncementLoader />
          <main className="pt-[72px]">{children}</main>
        </ConditionalLayout>

        {/* T3: the chat widget waits until the browser is idle, so it never competes with hydration (INP). */}
        <Script
          src="/widget.js"
          data-api-url={process.env.NEXT_PUBLIC_ALCO_CHATBOT_API_URL}
          data-avatar-url="/sarah-avatar.webp"
          strategy="lazyOnload"
        />

                <CookieConsent />
        <SpeedInsights />
        <Analytics />
      </body>
      {/* <GoogleAnalytics gaId="G-G4W2XBWFX5" /> */}
      
    </html>
  );
}
