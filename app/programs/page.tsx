import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/component/banner";
import HowToEnrol from "@/component/HowToEnrol";
import programLevel1 from "@/assets/background/program-level-1.webp";
// P7 board seals: the repo already holds these badge files (assets/level-certificate/badges).
// LOGO markers below: Khansa to confirm or replace with the current approved artwork.
import SealABNLP from "@/assets/level-certificate/badges/abnlp.webp";
import SealABNLPCoaching from "@/assets/level-certificate/badges/cdab.webp";
// tlta.webp not imported: that seal prints an expiry date (F6). LOGO: TLTA - Khansa to supply approved artwork.
import SealABH from "@/assets/level-certificate/badges/abh.webp";
import SealNGH from "@/assets/level-certificate/badges/ngh.webp";
import SealANLP from "@/assets/level-certificate/badges/cpd.webp";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/utils/buildMetadata";
import { CTA, ctaDataAttrs, whatsappHref } from "@/component/cta";

const PAGE_URL = `${SITE_URL}/programs`;
const TITLE = "NLP and Hypnosis Certification Programmes Online | AL&CO";
const DESCRIPTION =
  "Six levels of NLP and hypnosis certification, from NLP Practitioner to NLP Master Trainer, taught live on Zoom. Compare the ladder and book a conversation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "AL&CO",
    locale: "en_PK",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

type Level = {
  level: number;
  slug: string;
  name: string;
  summary: string;
  // "At a glance" table (brochure long p13, verbatim)
  days: string;
  earn: string;
  forWhom: string;
  leaveAble: string;
  // Card detail (brochure long p14-27, short p3-5)
  duration: string;
  prerequisite: string;
  certification: string;
  entry: string;
};

// No prices anywhere on this page, in metadata or in JSON-LD (website rule).
const LEVELS: Level[] = [
  {
    level: 1,
    slug: "nlp-practitioner",
    name: "NLP Practitioner",
    summary: "Your foundation.",
    days: "10",
    earn: "Quad certification plus ANLP CPD",
    forWhom: "Everyone, including the complete beginner",
    leaveAble: "Coach professionally and change your own life",
    duration: "10 days, 130 hours",
    prerequisite: "None. Open to everyone, including the complete beginner.",
    certification:
      "Quad certification: Certified Practitioner of NLP (ABNLP); Practitioner of Time Line Therapy® Techniques (TLTA); Certified NLP Coach (ABNLP Coaching Division); AL&CO Certified Practitioner of Behavioral Reengineering. Plus a UK ANLP CPD certificate.",
    entry: "Arranged by your relationship manager. Free revisits for five years.",
  },
  {
    level: 2,
    slug: "nlp-master-practitioner",
    name: "NLP Master Practitioner",
    summary: "Mastery of the craft.",
    days: "13",
    earn: "Quad certification plus ANLP CPD",
    forWhom: "Graduates aiming for mastery and professional advancement",
    leaveAble: "Take on the diverse cases and build authority",
    duration: "13 days, 140 hours",
    prerequisite: "Level 1: NLP Practitioner.",
    certification:
      "Quad certification at master level: Certified Master Practitioner of NLP (ABNLP); Master Practitioner of Time Line Therapy® Techniques (TLTA); Certified NLP Master Coach (ABNLP Coaching Division); AL&CO Certified Practitioner of Behavioral Reengineering at master level. Plus a second ANLP CPD certificate and a dedicated coach for your breakthrough.",
    entry: "Arranged by your relationship manager. Free revisits for five years.",
  },
  {
    level: 3,
    slug: "advanced-hypnotherapy-interventionist",
    name: "Advanced Hypnotherapy and Interventionist",
    summary: "Advanced hypnosis and intervention.",
    // DECISIONS v2 F1: Level 3 is shown as 13 days.
    days: "13",
    earn: "ABH and NGH hypnosis credentials",
    forWhom: "Those who wish to pursue coaching as a full-time career",
    leaveAble:
      "Work at the deepest unconscious level, with advanced modalities and tools for personal change",
    duration:
      "13 days: 12 days of live teaching, plus one mandatory day in between for assignments set by AL&CO.",
    prerequisite: "Level 2: NLP Master Practitioner.",
    certification:
      "Certified Practitioner and Master Practitioner of Hypnosis (ABH), NGH hypnosis certification with one year of NGH membership, and the AL&CO Quintuple Certification, the Testament to the Graduate.",
    entry:
      "By interview, in a small cohort of never more than 20. Arranged directly with Bismillah Pervez and Arslan Larik. Free revisits for five years.",
  },
  {
    level: 4,
    slug: "nlp-trainers-training-program",
    name: "NLP Train the Trainer",
    summary: "The authority to train and certify practitioners.",
    days: "18",
    earn: "Certified Trainer of NLP (ABNLP)",
    forWhom: "Those called to teach",
    leaveAble:
      "Train and certify Practitioners and Master Practitioners in NLP, and run an institute",
    duration: "18 days (14 training and 4 evaluation), 120 hours",
    prerequisite: "Level 2: NLP Master Practitioner.",
    certification: "Certified Trainer of NLP (ABNLP).",
    entry:
      "By interview with Bismillah Pervez. Arranged directly with Bismillah Pervez and Arslan Larik.",
  },
  {
    level: 5,
    slug: "hypnosis-trainers-training-program",
    name: "Hypnosis Train the Trainer",
    summary: "The authority to train hypnosis.",
    days: "8",
    earn: "Certified Hypnosis Trainer (ABH)",
    forWhom: "Advanced Hypnotists",
    leaveAble: "Train and certify Hypnotists, and run a school",
    duration: "8 days",
    prerequisite: "Level 3: Advanced Hypnotherapy and Interventionist.",
    certification: "Certified Hypnosis Trainer (ABH).",
    entry:
      "By interview with Bismillah Pervez. Arranged directly with Bismillah Pervez and Arslan Larik.",
  },
  {
    level: 6,
    slug: "nlp-master-trainer-program",
    name: "NLP Master Trainer",
    summary: "The summit: produce trainers of your own.",
    days: "3 to 5 years",
    earn: "Certified Master Trainer of NLP (ABNLP)",
    forWhom: "Established trainers",
    leaveAble: "Certify other trainers and shape the field",
    duration: "3 to 5 years, supervised and mentored, by application",
    prerequisite:
      "Levels 1, 2 and 4. You must be a Certified Trainer of NLP in good standing.",
    // DECISIONS v2 F4: the two-signature sign-off is AL&CO's own standard, not a board requirement.
    certification:
      "Certified Master Trainer of NLP (ABNLP). By AL&CO's own standard, two Master Trainers in good standing sign off your certification.",
    entry:
      "By application, an interview with Bismillah Pervez and Board evaluation. Arranged directly with Arslan Larik and Bismillah Pervez.",
  },
];

const levelUrl = (slug: string) => `/program/${slug}`;

// DECISIONS v2 P7: board seals where the PDF brochure shows them (cover seal row, same order).
// Existing repo badge files are used; Khansa confirms each is the current approved artwork.
const BOARD_SEALS = [
  { src: SealABNLP, alt: "ABNLP seal" },                                   // LOGO: ABNLP - Khansa to supply approved artwork
  { src: SealABNLPCoaching, alt: "ABNLP Coaching Division seal" },         // LOGO: ABNLP Coaching Division - Khansa to supply approved artwork
  // LOGO: TLTA - Khansa to supply approved artwork without an expiry date, then add it back here.
  { src: SealABH, alt: "American Board of Hypnotherapy (ABH) seal" },      // LOGO: ABH - Khansa to supply approved artwork
  { src: SealNGH, alt: "National Guild of Hypnotists (NGH) seal" },        // LOGO: NGH - Khansa to supply approved artwork
  { src: SealANLP, alt: "ANLP (UK) CPD accreditation seal" },              // LOGO: ANLP (UK) - Khansa to supply approved artwork
];

// CTA plan (24 Sep 2026), /programs is MoFu: primary C1, secondary C2. Labels exactly as the CTA library.
// C1 and C2 come from the shared CTA library (component/cta.ts).
const WHATSAPP_C1 = whatsappHref(
  "Hi, I would like to know which AL&CO programme is right for me (All Programmes page)"
);
const WEBINAR_C2 = CTA.C2.href;

const BTN_BASE = "inline-flex items-center justify-center rounded-md font-medium transition font-outfit px-6 py-2";
const BTN_PRIMARY = `${BTN_BASE} bg-secondary hover:bg-secondary-600 text-black`;
const BTN_OUTLINE_WHITE = `${BTN_BASE} border border-white text-white hover:bg-white hover:text-gray-900`;
const BTN_OUTLINE_PRIMARY = `${BTN_BASE} border border-primary text-primary hover:bg-primary hover:text-white`;

function SpeakToManager({ className = BTN_PRIMARY }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_C1}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...ctaDataAttrs("C1")}
    >
      {CTA.C1.label}
    </a>
  );
}

function JoinWebinar({ className = BTN_OUTLINE_WHITE }: { className?: string }) {
  return (
    <Link href={WEBINAR_C2} className={className} {...ctaDataAttrs("C2")}>
      {CTA.C2.label}
    </Link>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "All Programmes", item: PAGE_URL },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${PAGE_URL}#programmes`,
      name: "AL&CO NLP and hypnosis certification programmes",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: LEVELS.length,
      itemListElement: LEVELS.map((l, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${levelUrl(l.slug)}`,
        name: `Level ${l.level}: ${l.name}`,
      })),
    },
  ],
};

const SECTION = "py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 w-full";

export default function ProgrammesHubPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Banner
        data={{
          title: { line1: "NLP and Hypnosis Certification Programmes", align: "text-center mx-auto" },
          image: programLevel1.src,
          children: (
            <>
            <p className="custom-text1 font-light text-white text-center mt-4 max-w-3xl mx-auto">
              Transform your own life, and learn to transform the lives of others. Six levels of
              internationally certified NLP, hypnosis and coaching training, all delivered live on
              Zoom and taught personally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <SpeakToManager />
              <JoinWebinar />
            </div>
            </>
          ),
        }}
      />

      {/* Breadcrumb (visible, matches the JSON-LD) */}
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-4 text-sm text-primary-light">
        <ol className="flex gap-2">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">All Programmes</li>
        </ol>
      </nav>

      {/* The Learning Journey */}
      <section className={SECTION}>
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="h3 text-primary text-center">The Learning Journey: Six Levels, One Ladder</h2>
          <p className="custom-text1 text-primary-light text-center mt-4">
            AL&CO is built as a ladder. Step on at the first rung and climb as far as you wish, from
            your own transformation to running your own training business. Each level is complete
            in itself, and each one opens the door to the next.
          </p>
          <p className="custom-text1 text-primary-light text-center mt-4">
            Every level is backed by international certification boards: the ABNLP and its NLP
            Coaching Division, the ABH, the TLTA and the NGH (USA), together with a UK ANLP CPD
            accreditation and AL&CO’s own credential. These are real, recognised qualifications,
            not a certificate for the wall.
          </p>
          {/* P7 seal row. Every entry is a LOGO marker: artwork from Khansa. */}
          <ul aria-label="Certification boards and CPD accreditation" className="flex flex-wrap justify-center items-center gap-6 mt-6">
            {BOARD_SEALS.map((seal) => (
              <li key={seal.alt}>
                <Image src={seal.src} alt={seal.alt} width={96} height={96} className="object-contain h-20 w-20" />
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-8">
            {[
              "Live on Zoom, taught personally",
              "Sessions run 8:00pm to 2:00am PKT",
              "Cohorts of 20 to 25 (Level 3: never more than 20)",
              "Free revisits for five years at Levels 1 to 3",
              "2,000+ graduates across 20+ countries",
            ].map((fact) => (
              <li key={fact} className="rounded-xl bg-slate-200/60 drop-shadow-sm px-4 py-4 text-center text-primary font-medium">
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* At a glance table */}
      <section className={`${SECTION} bg-dark-primary bg-cover bg-top-left`}>
        <div className="container mx-auto px-4">
          <h2 className="h3 text-start">
            <span className="text-secondary mr-2">The Six Levels</span>
            <span className="text-white">at a Glance</span>
          </h2>
          <div className="overflow-x-auto rounded-xl shadow-lg mt-8">
            <table className="w-full border-collapse min-w-[760px]">
              <caption className="sr-only">
                The six AL&CO levels: days, what you earn, who it is for and what you leave able to do
              </caption>
              <thead>
                <tr className="bg-primary text-white text-left">
                  <th scope="col" className="px-6 py-5 h6">Level</th>
                  <th scope="col" className="px-6 py-5 h6">Days</th>
                  <th scope="col" className="px-6 py-5 h6">You earn</th>
                  <th scope="col" className="px-6 py-5 h6">For whom</th>
                  <th scope="col" className="px-6 py-5 h6">You leave able to</th>
                </tr>
              </thead>
              <tbody>
                {LEVELS.map((l, index) => (
                  <tr
                    key={l.slug}
                    className={index % 2 === 0 ? "bg-white" : "bg-blue-50 border-y border-primary"}
                  >
                    <th scope="row" className="px-6 py-5 text-left font-semibold text-primary">
                      <Link href={levelUrl(l.slug)} className="hover:underline">
                        {l.level}. {l.name}
                      </Link>
                    </th>
                    <td className="px-6 py-5 text-gray-700">{l.days}</td>
                    <td className="px-6 py-5 text-gray-700">{l.earn}</td>
                    <td className="px-6 py-5 text-gray-700">{l.forWhom}</td>
                    <td className="px-6 py-5 text-gray-700">{l.leaveAble}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Level cards */}
      <section className={SECTION}>
        <div className="container mx-auto px-4">
          <h2 className="h3 text-primary text-center">Explore Each Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {LEVELS.map((l) => (
              <article key={l.slug} className="flex flex-col rounded-xl bg-slate-200/60 drop-shadow-sm px-6 py-8">
                <div className="flex mb-4">
                  <span className="bg-gradient-secondary-to-light-secondary bg-cover text-black px-4 py-1">
                    Level {l.level}
                  </span>
                </div>
                <h3 className="h5 font-semibold text-primary">
                  Level {l.level}: {l.name}
                </h3>
                <p className="text-primary-light mt-2">{l.summary}</p>
                <dl className="mt-4 space-y-3 text-gray-700 text-base">
                  <div>
                    <dt className="font-semibold text-primary">Duration</dt>
                    <dd>{l.duration}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-primary">Prerequisite</dt>
                    <dd>{l.prerequisite}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-primary">Certification</dt>
                    <dd>{l.certification}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-primary">Entry and arrangement</dt>
                    <dd>{l.entry}</dd>
                  </div>
                </dl>
                <div className="mt-auto pt-6">
                  <Link
                    href={levelUrl(l.slug)}
                    className="inline-flex items-center justify-center rounded-md font-medium transition bg-primary hover:bg-primary-600 text-white px-4 py-2"
                  >
                    Explore Level {l.level}: {l.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who arranges your place */}
      <section className={`${SECTION} bg-light-neutral bg-cover bg-top-left`}>
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="h3 text-primary">Who Arranges Your Place</h2>
          <p className="custom-text1 text-primary-light mt-4">
            Levels 1 and 2 are arranged by your relationship manager. Levels 3 and above are
            arranged directly with Bismillah Pervez and Arslan Larik. One conversation is all it
            takes to find the pathway that fits you.
          </p>
          <p className="custom-text1 text-primary-light mt-4">
            Our relationship managers walk beside you from your very first question to the day you
            graduate and long after. Most of them come from psychology themselves, so they
            understand your journey from the inside.
          </p>
          <div className="flex justify-center mt-6">
            <SpeakToManager />
          </div>
          <p className="mt-4">
            <Link href="/about-us/why-train-with-alco" className="text-primary underline font-medium">
              Meet the team behind every promise
            </Link>
          </p>
        </div>
      </section>

      {/* Why you will not find a number here (approved wording, brochure long p37) */}
      <section className={SECTION}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="h3 text-primary text-center">Why You Will Not Find a Number Here</h2>
          <p className="custom-text1 text-primary-light mt-4">
            This is an investment in your future, and we treat it as one, so you will not see a
            price in these pages. That is deliberate, and it is out of fairness to you. To print a
            single figure, we would have to quote you for every level at once, whether or not you
            need them all. We would rather understand what you actually want first, and then build
            a proposition around your own journey, only what serves you, and nothing that does not.
          </p>
          <p className="custom-text1 text-primary-light mt-4">
            There is a deeper reason, and we will be honest about it. A number on a page makes
            people decide with the wrong question. Some assume they cannot afford this, and never
            discover that what it would resolve for them is worth far more than the investment
            itself. Others could invest many times over, and yet it may not truly serve what they
            are after, and in that case we would gently tell them so. We would rather be honest
            with you than simply take a payment. All it takes to find out where you stand is a
            conversation.
          </p>
        </div>
      </section>

      {/* How to enrol + training times (shared with /enroll) */}
      <HowToEnrol />

      {/* Free weekly webinar (brochure long p36) */}
      <section className={`${SECTION} bg-light-neutral bg-cover bg-top-left`}>
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="h3 text-primary">Start with a Free Webinar</h2>
          <p className="custom-text1 text-primary-light mt-4">
            Not sure yet? That is exactly what our weekly webinar is for. Once a week we open a
            free, live introductory session for anyone exploring this world, a relaxed hour to
            understand what NLP really is, to feel the way we teach, and to ask anything you like
            before you decide a single thing.
          </p>
          <p className="custom-text1 text-primary-light mt-4">
            It is hosted by our relationship managers, the same people who walk beside our
            students from the first hello. So you meet a real person, in a real room, not a sales
            page. There is no pressure and no obligation. Come to listen, come with your questions,
            come simply to see whether this is for you.
          </p>
          <p className="custom-text1 text-primary-light mt-4">
            These sessions are for those still deciding. The moment you enrol, a far richer world
            opens to you: the full programme, the global community, the live trainings and years of
            support. So think of the webinar as the doorway, a first, easy step towards the version
            of yourself you have been curious about.
          </p>
          <p className="custom-text1 text-primary-light mt-4">
            The webinar is for people new to AL&CO. Sign up and we will email you the joining
            link. Already an AL&CO graduate? You do not need it: you can revisit your trainings free,
            and your relationship manager will be glad to arrange it.
          </p>
          <div className="flex justify-center pt-6">
            {/* DECISIONS v2 G7: one public sign-up page (spec 10). The Zoom link is emailed, never shown here. */}
            <JoinWebinar className={BTN_OUTLINE_PRIMARY} />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className={`${SECTION} bg-dark-primary bg-cover bg-top-left`}>
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="h3 text-white">Your Transformation Starts with One Conversation</h2>
          {/* CTA plan: the closing band uses C1 (primary) and C2 (secondary). */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <SpeakToManager />
            <JoinWebinar />
          </div>
          <ul className="mt-6 space-y-1 text-white custom-text1">
            <li>
              Call or WhatsApp:{" "}
              <a href="tel:+923360082222" className="underline" data-cta-id="C6" data-gtm-event="phone_click">+92 336 008 2222</a>{" "}
              (<a href="https://wa.me/923360082222" target="_blank" rel="noopener noreferrer" className="underline" data-cta-id="C1" data-gtm-event="whatsapp_click">WhatsApp</a>)
            </li>
            <li>US and Canada: +1 (206) 614 0234</li>
            <li>
              <a href="mailto:connect@arslanlarik.com" className="underline">connect@arslanlarik.com</a>
            </li>
          </ul>
        </div>
      </section>

      {/* DECISIONS v2 P5: no trademark attribution line; the ® on "Time Line Therapy®" carries it. */}
    </div>
  );
}
