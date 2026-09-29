import type { Metadata } from "next";
import OurFaqs from "@/component/faqs";
import { faqGroups } from "@/app/faqs/data";
import programLevel1 from "@/assets/background/program-level-1.webp";
import Banner from "@/component/banner";
import ContactUS from "@/component/contact";
import CtaBand from "@/component/CtaBand";
import { waLine } from "@/component/cta";
import { DEFAULT_OG_IMAGE } from "@/utils/buildMetadata";

const PAGE_URL = "https://arslanlarik.com/faqs";
const TITLE = "NLP and Hypnosis Certification FAQs: Honest Answers | AL&CO";
const DESCRIPTION =
  "Honest answers about AL&CO's live NLP and hypnosis certification: background, certificates, training times, cost and results. Join our free webinar.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "AL&CO",
    locale: "en_PK",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

const bannerData = {
  title: {
    line1: "Frequently Asked Questions",
    line2: "about NLP and Hypnosis Certification",
    align: "text-center mx-auto",
  },
  image: programLevel1.src,
};

// FAQPage structured data, built from the same data the page renders. No prices.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  url: PAGE_URL,
  mainEntity: faqGroups
    .flatMap((g) => g.items)
    .filter((f) => f.question && f.schemaText)
    .map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.schemaText },
    })),
};

const afterTraining: [string, string][] = [
  [
    "A global community of coaches, from every walk of life",
    "You join thousands of certified coaches from this institution, and they are not all psychologists and doctors. They are homemakers, brand managers, entrepreneurs, and people from finance, marketing and sales. That range is a gift: it is how you find your specialisation, ask sharper questions, and stay current with the fraternity. It is a room you belong to for good.",
  ],
  [
    "Coach, and be coached",
    "A certificate does not stop life from happening. On our platform you practise coaching other members, and you choose members to coach you in return, so you never have to get back up alone.",
  ],
  [
    "Come back, as many times as you like, for five years",
    "Re-attend, revise and recap our live Practitioner, Master Practitioner and Advanced Hypnotherapy trainings, free. The content is the same, but the room is not: a new trainer demonstration, a client from a completely different background, new people to practise on. That is how mastery and real confidence are built, by repetition, not by a single pass.",
  ],
  [
    "Return as a coaching assistant",
    "When you come back, you can assist in a live batch, managing small coaching groups and supervising demonstrations. This is where you step into the spotlight, lead, and make newcomers feel at home, and it is the first rung toward becoming a senior and a master coach. It is also how this institution grows its own.",
  ],
  [
    "The whole library, always in your hands",
    "Your manual, about 500 pages per level, issued digitally and yours to keep (we encourage e-copies, which are kinder to the planet; a printed set is available at an additional charge), your audio library on AL&CO’s online learning portal, aligned to that manual, with the deeper explanations and the golden nuggets, and your cohort’s support groups, where live notes and extra content are shared and any question you forgot to ask still gets answered.",
  ],
  [
    "And a promise",
    "Exceptional customer service, and results. It is what we are known for. Your success matters to us, because the coaches we send out are meant to go and inspire millions of their own.",
  ],
];

export default function Faqs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <Banner data={bannerData} />

      {faqGroups.map((group) => (
        <OurFaqs key={group.id} id={group.id} title={group.title} data={group.items} />
      ))}

      {/* After the training: brochure-long p.31, verbatim */}
      <section id="after-the-training" className="w-full bg-white py-4 px-4 sm:px-20 my-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="h4 text-primary font-bold font-outfit text-center mb-6">
            After the training: the support that never stops
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-outfit mb-6">
            Most trainings end when the Zoom closes. Ours is where it begins. Almost nobody becomes a coach in ten days, and we have never pretended otherwise, so everything below is built to carry you long after your cohort finishes. This is the part of AL&amp;CO that our graduates talk about most, and it is the real reason to train here rather than anywhere else.
          </p>
          {afterTraining.map(([heading, text]) => (
            <div key={heading} className="mb-6">
              <h3 className="text-xl text-primary font-outfit mb-2">{heading}</h3>
              <p className="text-gray-600 text-sm md:text-base font-outfit">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactUS />
      {/* Closing band (CTA plan): FAQs is MoFu. Primary C1, secondary C2. */}
      <CtaBand
        title="Still Have a Question?"
        text="A relationship manager will answer it personally, or come to a free webinar and ask it live."
        primary={{ id: "C1", message: waLine("AL&CO's training (I have a question from the FAQs page)") }}
        secondary={{ id: "C2" }}
      />
    </>
  );
}
