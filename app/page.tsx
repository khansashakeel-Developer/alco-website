import Hero from "@/component/Hero";
import Brand from "@/component/Brand";
import WhatIsNlp from "@/component/whatIsNlp";
import AralanLarikIntro from "@/component/AralanLarikIntro";
import OurProgram from "@/component/OurProgram";
import Benefits from "@/component/Benefits";
import Accredited from "@/component/Accredited";
import WhyTrainWithAL from "@/component/WhyTrainWithAL";
import ALCOCenter from "@/component/ALCOCenter";
import Testimonials from "@/component/testimonial";
import AtAGlance from "@/component/AtAGlance";
import { home } from "./data";
import LiveSessionsSection from "@/component/Livesessionssection";
import { Metadata } from "next";
import CtaBand from "@/component/CtaBand";
import { buildMetadata, fallbackMetadata } from "@/utils/buildMetadata";

const HOME_TITLE = "NLP Training in Pakistan, Certification Taught Live | AL&CO";
const HOME_DESCRIPTION =
  "NLP, hypnosis and coaching certification from AL&CO, Pakistan's Center for Human Brilliance. Six levels, taught live on Zoom. Book your conversation.";

// B 01 SEO: WebSite node (no prices, no phone numbers). Publisher is the root Organization @id.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://arslanlarik.com/#website",
  url: "https://arslanlarik.com",
  name: "Arslan Larik & Company (AL&CO)",
  alternateName: "AL&CO",
  description: "World-class NLP, hypnosis and coaching certification, taught live.",
  inLanguage: "en",
  publisher: { "@id": "https://arslanlarik.com/#organization" },
};

async function getSeoData() {
  try {
    // B 01 C1: env var instead of the hard-coded CRM host.
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/seo/page/home`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoData();
  return fallbackMetadata(HOME_TITLE, "/", HOME_DESCRIPTION);
}

export default async function Home() {

  return (
    <>
      {/* CMS structuredData is not injected: it can carry old prices or removed numbers (review 25 Sep). JSON-LD is built in code. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }}
      />
      <div>
        <Hero data={home.hero} />
        <AtAGlance />
        <Brand />
        <WhatIsNlp />
        <AralanLarikIntro />
        <OurProgram />
        <Benefits />
        <Accredited />
        <WhyTrainWithAL />
        <ALCOCenter />
        <LiveSessionsSection />
        <Testimonials />
        {/* Closing band (CTA plan rule 2): Home primary C1, secondary C2. */}
        <CtaBand
          title="Your Transformation Starts with One Conversation"
          text="Tell a relationship manager where you are and where you want to go, or come to a free webinar first and simply listen."
          primary={{ id: "C1", message: "Hi, I would like to know about AL&CO's NLP training (home page)" }}
          secondary={{ id: "C2" }}
        />
      </div>
    </>
  );
}
