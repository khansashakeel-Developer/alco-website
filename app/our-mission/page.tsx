import type { Metadata } from "next";
import Banner from "@/component/banner";
import ContactInfo from "@/component/contactInfo";
import { waLine } from "@/component/cta";
import EmpowerYourself from "@/component/empowerYourself";
import WhatWeDo from "@/component/whatWeDo";
import WhoThisIsFor from "@/component/whoThisIsFor";
import OurMissionBg from "@/assets/background/our-mission.webp";

// B 02 C step 1: this page had no metadata and inherited the homepage canonical.
const TITLE = "Mission, Vision and Values of Our NLP Institute | AL&CO";
const DESC = "The vision, mission and values of AL&CO, the Center for Human Brilliance and Behavioral Reengineering, and who our training is for. Find your place.";
const URL = "https://arslanlarik.com/our-mission";
// public/og/our-mission.jpg: interim 1200x630 crop of assets/background/our-mission.webp (WP3); Khansa may replace.
const OG_IMAGE = "https://arslanlarik.com/og/our-mission.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE, description: DESC, url: URL, siteName: "AL&CO", type: "website", locale: "en_PK",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "AL&CO mission, vision and values" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: [OG_IMAGE] },
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://arslanlarik.com/our-mission#webpage",
  url: "https://arslanlarik.com/our-mission",
  name: "Our Mission, Vision and Values",
  about: { "@id": "https://arslanlarik.com/#organization" },
  inLanguage: "en",
};

const bannerData = {
  title: {
    line1: "Our Mission, Vision and Values",
  },
  image: OurMissionBg.src
};

export default function OurMission() {
  return (
    <div className="">
      <Banner data={bannerData}/>
      <EmpowerYourself />
      <WhatWeDo />
      <WhoThisIsFor />
      {/* CTA plan: Our Mission is MoFu. Closing band C1 + C2. */}
      <ContactInfo
        primary={{ id: "C1", message: waLine("AL&CO's mission and training (Our Mission page)") }}
        secondary={{ id: "C2" }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
