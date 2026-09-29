import { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, fallbackMetadata } from "@/utils/buildMetadata";
import Banner from "@/component/banner";
import ContentSection from "@/component/contentSection";
import { ContentSectionType } from "@/type/contentSection";
import programLevel1 from "@/assets/background/program-level-1.webp";
import ContactUS from "@/component/contact";
import HowToEnrol from "@/component/HowToEnrol";
import FreeWebinar from "@/component/freeWebinar";
import CtaButton from "@/component/CtaButton";
import { waLine } from "@/component/cta";

const CONTACT_TITLE = "Contact AL&CO: NLP and Hypnosis Training Enquiries | AL&CO";
const CONTACT_DESCRIPTION =
  "Call or WhatsApp +92 336 008 2222 or email connect@arslanlarik.com. See live training times in your region and how to enrol. Book a conversation.";

// B 07 §B: ContactPage JSON-LD. Only the Pakistani number, never the +1 206; no prices.
const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://arslanlarik.com/contact#webpage",
  url: "https://arslanlarik.com/contact",
  name: "Contact AL&CO",
  mainEntity: {
    "@type": "EducationalOrganization",
    "@id": "https://arslanlarik.com/#organization",
    name: "Arslan Larik & Company",
    alternateName: "AL&CO",
    email: "connect@arslanlarik.com",
    telephone: "+923360082222",
    address: {
      "@type": "PostalAddress",
      streetAddress: "D86/1, Gulshan-e-Iqbal, Block 7",
      addressLocality: "Karachi",
      postalCode: "75300",
      addressRegion: "Sindh",
      addressCountry: "PK",
    },
    contactPoint: [
      { "@type": "ContactPoint", telephone: "+923360082222", email: "connect@arslanlarik.com", contactType: "admissions", availableLanguage: ["English"], areaServed: "Worldwide" },
    ],
  },
};

const bannerData = {
  title: {
    line1: "Contact AL&CO",
    align: "text-center mx-auto"
  },
  image: programLevel1.src
}

const ContentSectionData: ContentSectionType = {
  title: "Get in Touch",
  TagType: "h2",
  description: (
    <>
      <p className="text-gray-600 mb-4">
        Your transformation starts with one conversation. Tell us where you are and where you want to go next, and we will help you find <Link href="/programs" className="underline">the level that fits</Link>, and show you where it can lead. Levels 1 and 2 are arranged by your relationship manager. Levels 3 and above are arranged directly with Bismillah Pervez and Arslan Larik.
      </p>
    </>
  ),
  underline: false,
  miniTitle: "The Gold Standard for NLP Training Globally",
  MiniTagType: "h3",
  detailContent: (
    <>
      <ul className="list-disc pl-5 space-y-1 text-gray-600 my-4">
        <li>Best-in-Class Coaching</li>
        <li>Most Practical NLP Program</li>
        <li>Free revisits of Levels 1 to 3 for five years</li>
        <li>Knowledge Center & Community</li>
      </ul>
      <p className="text-gray-600">
        2,000+ graduates across 20+ countries, nearing 100 batches delivered, and work that has inspired over a million lives.
      </p>
    </>
  ),
  textAlign: "text-start",
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 "
}

async function getSeoData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/seo/page/contact`,
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
  return fallbackMetadata(CONTACT_TITLE, "/contact", CONTACT_DESCRIPTION);
}

export default async function Contact() {
  return (
    <>
      {/* CMS structuredData is not injected: it can carry old prices or removed numbers (review 25 Sep). JSON-LD is built in code. */}
      <Banner data={bannerData} />
      <ContentSection data={ContentSectionData} />
      {/* CTA plan: Contact is BoFu. Primary C5 Book a conversation (the form below, /contact#form),
          with C1 WhatsApp and C6 call shown beside it. */}
      <div className="max-w-7xl mx-auto px-4 pb-6 md:pb-8 flex flex-col sm:flex-row flex-wrap gap-4">
        <CtaButton id="C5" variant="secondary" className="px-6" />
        <CtaButton id="C1" message={waLine("booking a conversation (Contact page)")} variant="outlinePrimary" className="px-6" />
        <CtaButton id="C6" variant="outlinePrimary" className="px-6" iconRight={false} />
      </div>
      <ContactUS />
      <HowToEnrol showEnrolButton />
      <FreeWebinar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
};
