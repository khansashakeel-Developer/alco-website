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
import Reveal from "@/component/Reveal";
/*import StickyEnrolBar from "@/component/StickyEnrolBar";*/
import StickyEnrolBar from "@/component/StickyEnrolBar";
import Link from "next/link";

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
        <Reveal><AtAGlance /></Reveal>
        <Reveal><Brand /></Reveal>
        <Reveal><WhatIsNlp /></Reveal>
        <Reveal><AralanLarikIntro /></Reveal>
                <Reveal><OurProgram /></Reveal>
                <Reveal>
          <section
            aria-labelledby="find-your-level"
            className="bg-[#EAF1F8] px-4 py-10 md:py-12"
          >
            <div className="container mx-auto">
              <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#1B507C]/15 bg-white px-6 py-7 text-center shadow-sm md:flex-row md:px-10 md:text-left">
                <div className="border-secondary md:border-l-4 md:pl-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#1B507C]">
                    Find your starting point
                  </p>
                  <h2 id="find-your-level" className="h3 mt-1 text-[#09263D]">
                    Not sure which level fits you?
                  </h2>
                  <p className="mt-1 text-[#09263D]/70">
                    Answer a few quick questions and see where to start.
                  </p>
                </div>
                <Link
                  href="/start"
                  className="inline-flex shrink-0 items-center justify-center rounded-md bg-secondary px-7 py-3 font-semibold text-[#09263D] transition hover:brightness-110"
                >
                  Find my level
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
        <Reveal><Benefits /></Reveal>
        <Reveal><Accredited /></Reveal>
        <Reveal><WhyTrainWithAL /></Reveal>
        <Reveal><ALCOCenter /></Reveal>
        <Reveal><LiveSessionsSection /></Reveal>
        <Reveal><Testimonials /></Reveal>
        {/* Closing band (CTA plan rule 2): Home primary C1, secondary C2. */}
        <CtaBand
          title="Your Transformation Starts with One Conversation"
          text="Tell a relationship manager where you are and where you want to go, or come to a free webinar first and simply listen."
          primary={{ id: "C1", message: "Hi, I would like to know about AL&CO's NLP training (home page)" }}
          secondary={{ id: "C2" }}
        />
        <StickyEnrolBar />
      </div>
    </>
  );
}
