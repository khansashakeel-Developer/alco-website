import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Banner from "@/component/banner";
import HowToEnrol from "@/component/HowToEnrol";
import programLevel1 from "@/assets/background/program-level-1.webp";
// P7 board seals: the repo already holds these badge files (assets/level-certificate/badges).
// LOGO markers below: Khansa to confirm or replace with the current approved artwork.
import SealABNLP from "@/assets/level-certificate/badges/abnlp.webp";
import SealABNLPCoaching from "@/assets/level-certificate/badges/cdab.webp";
import SealTLTA from "@/assets/level-certificate/badges/tlta.webp";
import SealABH from "@/assets/level-certificate/badges/abh.webp";
import SealNGH from "@/assets/level-certificate/badges/ngh.webp";
import SealANLP from "@/assets/level-certificate/badges/cpd.webp";
// LOGO: AL&CO seal - existing repo file, Khansa to confirm it is the current approved artwork.
import SealALCO from "@/assets/level-certificate/badges/alco.webp";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/utils/buildMetadata";
import { CTA, ctaDataAttrs, whatsappHref } from "@/component/cta";
import LevelsExpandGallery from "@/component/LevelsExpandGallery";
import WhyNoNumber from "@/component/WhyNoNumber";
import LearningJourney from "@/component/LearningJourney";
import WebinarDoor from "@/component/WebinarDoor";

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
    entry:
      "Arranged by your relationship manager. Free revisits for five years.",
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
    entry:
      "Arranged by your relationship manager. Free revisits for five years.",
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

// Certification shown as a checklist. ... split at the semicolons and
// commas so each credential is its own line ...
type CertItem = { text: string; seal?: StaticImageData };
type CertBlock = { lead?: string; items: CertItem[]; note?: CertItem };

const CERTS: Record<string, CertBlock> = {
  "nlp-practitioner": {
    lead: "Quad certification:",
    items: [
      { text: "Certified Practitioner of NLP (ABNLP)", seal: SealABNLP },
      {
        text: "Practitioner of Time Line Therapy® Techniques (TLTA)",
        seal: SealTLTA,
      },
      {
        text: "Certified NLP Coach (ABNLP Coaching Division)",
        seal: SealABNLPCoaching,
      },
      {
        text: "AL&CO Certified Practitioner of Behavioral Reengineering",
        seal: SealALCO,
      },
    ],
    note: { text: "Plus a UK ANLP CPD certificate.", seal: SealANLP },
  },
  "nlp-master-practitioner": {
    lead: "Quad certification at master level:",
    items: [
      { text: "Certified Master Practitioner of NLP (ABNLP)", seal: SealABNLP },
      {
        text: "Master Practitioner of Time Line Therapy® Techniques (TLTA)",
        seal: SealTLTA,
      },
      {
        text: "Certified NLP Master Coach (ABNLP Coaching Division)",
        seal: SealABNLPCoaching,
      },
      {
        text: "AL&CO Certified Practitioner of Behavioral Reengineering at master level",
        seal: SealALCO,
      },
    ],
    note: {
      text: "Plus a second ANLP CPD certificate and a dedicated coach for your breakthrough.",
      seal: SealANLP,
    },
  },
  "advanced-hypnotherapy-interventionist": {
    items: [
      {
        text: "Certified Practitioner and Master Practitioner of Hypnosis (ABH)",
        seal: SealABH,
      },
      {
        text: "NGH hypnosis certification with one year of NGH membership",
        seal: SealNGH,
      },
      {
        text: "The AL&CO Quintuple Certification, the Testament to the Graduate",
        seal: SealALCO,
      },
    ],
  },
  "nlp-trainers-training-program": {
    items: [{ text: "Certified Trainer of NLP (ABNLP)", seal: SealABNLP }],
  },
  "hypnosis-trainers-training-program": {
    items: [{ text: "Certified Hypnosis Trainer (ABH)", seal: SealABH }],
  },
  "nlp-master-trainer-program": {
    items: [
      { text: "Certified Master Trainer of NLP (ABNLP)", seal: SealABNLP },
    ],
    note: {
      text: "By AL&CO's own standard, two Master Trainers in good standing sign off your certification.",
    },
  },
};

function CertIcon({ seal }: { seal?: StaticImageData }) {
  return (
    <span
      className="shrink-0 w-10 h-10 flex items-center justify-center"
      aria-hidden="true"
    >
      {seal ? (
        <Image
          src={seal}
          alt=""
          width={40}
          height={40}
          className="object-contain"
        />
      ) : (
        <span className="w-6 h-6 rounded-full bg-secondary text-black flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
      )}
    </span>
  );
}

const levelUrl = (slug: string) => `/program/${slug}`;

// DECISIONS v2 P7: board seals where the PDF brochure shows them (cover seal row, same order).
// Existing repo badge files are used; Khansa confirms each is the current approved artwork.
const BOARD_SEALS = [
  { src: SealABNLP, alt: "ABNLP seal" }, // LOGO: ABNLP - Khansa to supply approved artwork
  { src: SealABNLPCoaching, alt: "ABNLP Coaching Division seal" }, // LOGO: ABNLP Coaching Division - Khansa to supply approved artwork
  { src: SealTLTA, alt: "Time Line Therapy Association (TLTA) seal" },
  { src: SealABH, alt: "American Board of Hypnotherapy (ABH) seal" }, // LOGO: ABH - Khansa to supply approved artwork
  { src: SealNGH, alt: "National Guild of Hypnotists (NGH) seal" }, // LOGO: NGH - Khansa to supply approved artwork
  { src: SealANLP, alt: "ANLP (UK) CPD accreditation seal" }, // LOGO: ANLP (UK) - Khansa to supply approved artwork
];

// CTA plan (24 Sep 2026), /programs is MoFu: primary C1, secondary C2. Labels exactly as the CTA library.
// C1 and C2 come from the shared CTA library (component/cta.ts).
const WHATSAPP_C1 = whatsappHref(
  "Hi, I would like to know which AL&CO programme is right for me (All Programmes page)",
);
const WEBINAR_C2 = CTA.C2.href;

const BTN_BASE =
  "inline-flex items-center justify-center rounded-md font-medium transition font-outfit px-6 py-2";
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

function JoinWebinar({
  className = BTN_OUTLINE_WHITE,
}: {
  className?: string;
}) {
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
        {
          "@type": "ListItem",
          position: 2,
          name: "All Programmes",
          item: PAGE_URL,
        },
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Banner
        data={{
          title: {
            line1: "NLP and Hypnosis Certification Programmes",
            align: "text-center mx-auto",
          },
          image: programLevel1.src,
          bgVideo: "/videos/program-level-1.mp4",
          children: (
            <>
              <p className="custom-text1 font-light text-white text-center mt-4 max-w-3xl mx-auto">
                Transform your own life, and learn to transform the lives of
                others. Six levels of internationally certified NLP, hypnosis
                and coaching training, all delivered live on Zoom and taught
                personally.
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
      <nav
        aria-label="Breadcrumb"
        className="container mx-auto px-4 pt-4 text-sm text-primary-light"
      >
        <ol className="flex gap-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">All Programmes</li>
        </ol>
      </nav>

      {/* The Learning Journey */}
      <LearningJourney seals={BOARD_SEALS} />

      <section className="w-full bg-white py-10 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-center text-2xl md:text-4xl font-bold italic uppercase tracking-wide text-[#2B527D]">
            Six Levels at a Glance
          </h2>

          <ol className="relative mt-10 md:mt-14 before:absolute before:top-0 before:bottom-0 before:left-8 md:before:left-11 before:w-1.5 before:-translate-x-1/2 before:rounded-full before:bg-[#0C2565]">
            {LEVELS.map((l) => {
              const base = l.name.replace(/^NLP\s+/, "");
              const tag = /^Hypnosis/.test(l.name) ? "Hypnosis" : "NLP";
              const shown = /^Hypnosis\s/.test(l.name)
                ? l.name.replace(/^Hypnosis\s+/, "")
                : base;
              return (
                <li
                  key={l.level}
                  className="relative grid grid-cols-[64px_1fr] md:grid-cols-[88px_1fr] gap-x-4 md:gap-x-6 pb-10 md:pb-14 last:pb-0"
                >
                  {/* number circle */}
                  <div className="relative z-10 flex h-16 w-16 md:h-[88px] md:w-[88px] items-center justify-center rounded-full bg-[#0F2763] text-2xl md:text-4xl font-bold text-white ring-4 ring-white">
                    {String(l.level).padStart(2, "0")}
                  </div>

                  <div>
                    {/* icon + pill row (same height for every level) */}
                    <Link
                      href={levelUrl(l.slug)}
                      className="group flex h-16 md:h-[88px] items-center"
                    >
                      {/* water drop icon */}
                      <div className="relative h-[52px] w-[67px] md:h-[92px] md:w-[118px] shrink-0">
                        <svg
                          viewBox="0 0 128 100"
                          className="absolute inset-0 h-full w-full"
                          aria-hidden
                        >
                          <path
                            d="M128 50 L79.5 87.8 A48 48 0 1 1 79.5 12.2 Z"
                            fill="#344887"
                          />
                          <circle cx="48" cy="50" r="42" fill="#FAF8EC" />
                        </svg>
                        <div
                          role="img"
                          aria-label={`Level ${l.level} icon`}
                          className="absolute rounded-full"
                          style={{
                            left: "4.7%",
                            top: "8%",
                            width: "65.6%",
                            height: "84%",
                            backgroundImage: `url(/images/levels/level-${l.level}-icon.png)`,
                            backgroundSize: "115%",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        />
                      </div>

                      {/* pill with the white ">" notch */}
                      <div className="flex h-full flex-1 items-center rounded-r-full bg-[#152757] pr-6 shadow-lg transition-transform duration-300 group-hover:translate-x-1 [--n:32px] md:[--n:44px] ml-[calc(var(--n)*-0.77)] pl-[calc(var(--n)+14px)] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,var(--n)_50%)]">
                        <div className="leading-tight">
                          <p className="text-xs md:text-base font-bold uppercase tracking-wide text-secondary">
                            {tag}
                          </p>
                          <p className="text-base md:text-2xl font-semibold text-white">
                            {shown}
                          </p>
                        </div>
                      </div>
                    </Link>

                    {/* text under the pill */}
                    <p className="mt-3 md:mt-4 text-sm md:text-base font-semibold text-gray-800">
                      {l.summary} {l.earn}. {l.days}
                    </p>
                    <p className="mt-1 text-xs md:text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">
                        For whom:
                      </span>{" "}
                      {l.forWhom}
                    </p>
                    <p className="mt-0.5 text-xs md:text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">
                        You leave able to:
                      </span>{" "}
                      {l.leaveAble}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 md:mt-14 rounded-full bg-secondary px-6 py-3 text-center text-sm md:text-lg font-semibold text-primary-darkest">
            All programmes are delivered live on Zoom, taught personally.
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-b from-slate-50 to-white py-10 md:py-16 px-4">
  <div className="container mx-auto max-w-6xl">
    <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-secondary-dark">
      Find your place
    </p>
    <h2 className="h3 mt-2 text-center text-primary">Choose Your Level</h2>
    <div className="mx-auto mt-4 h-[3px] w-14 rounded bg-secondary" />
    <p className="mx-auto mt-4 mb-10 max-w-2xl text-center text-gray-600">
      Hover a level to see where it takes you.
    </p>
    <LevelsExpandGallery
      levels={LEVELS.map((l) => ({
        level: l.level,
        name: l.name,
        summary: l.summary,
        href: levelUrl(l.slug),
      }))}
    />
  </div>
</section>

      {/* Who arranges your place */}
      <section className={`${SECTION} bg-light-neutral bg-cover bg-top-left`}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            {/* Left: message and buttons */}
            <div className="text-center md:text-start">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary-dark">
                Your place
              </p>
              <h2 className="h3 mt-2 text-primary">Who Arranges Your Place</h2>
              <span
                aria-hidden="true"
                className="mx-auto mt-4 block h-1 w-16 rounded-full bg-secondary md:mx-0"
              />
              <p className="custom-text1 mt-5 text-primary-light">
                Our relationship managers walk beside you from your very first
                question to the day you graduate and long after. Most of them
                come from psychology themselves, so they understand your journey
                from the inside.
              </p>
              <div className="mt-6 flex justify-center md:justify-start">
                <SpeakToManager />
              </div>
              <p className="mt-4">
                <Link
                  href="/about-us/why-train-with-alco"
                  className="font-medium text-primary underline underline-offset-4 hover:text-secondary-dark"
                >
                  Meet the team behind every promise
                </Link>
              </p>
            </div>

            {/* Right: two routes joined by a line */}
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute left-7 top-10 bottom-16 w-0.5 bg-gradient-to-b from-secondary to-primary/30"
              />

              <div className="group relative flex items-start gap-5 pb-8">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-lg ring-4 ring-secondary/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-primary-darkest">
                  1–2
                </span>
                <div className="pt-1">
                  <h3 className="font-outfit text-lg font-semibold text-primary">
                    Levels 1 and 2
                  </h3>
                  <p className="mt-1 text-primary-light">
                    Arranged by your relationship manager.
                  </p>
                </div>
              </div>

              <div className="group relative flex items-start gap-5 pb-8">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-lg ring-4 ring-secondary/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-primary-darkest">
                  3+
                </span>
                <div className="pt-1">
                  <h3 className="font-outfit text-lg font-semibold text-primary">
                    Levels 3 and above
                  </h3>
                  <p className="mt-1 text-primary-light">
                    Arranged directly with Bismillah Pervez and Arslan Larik.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-5">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-2xl text-primary-darkest shadow-lg">
                  ✓
                </span>
                <p className="pt-3 font-outfit text-lg font-semibold text-primary">
                  One conversation is all it takes to find the pathway that fits
                  you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why you will not find a number here (approved wording, brochure long p37) */}
      <WhyNoNumber />

      {/* How to enrol + training times (shared with /enroll) */}
      <HowToEnrol />

     {/* Free weekly webinar (brochure long p36) */}
<WebinarDoor
  cta={
    <JoinWebinar
      className={`${BTN_BASE} bg-primary-darkest text-white shadow-xl hover:bg-primary`}
    />
  }
/>

      {/* Closing CTA */}
      <section className={`${SECTION} bg-dark-primary bg-cover bg-top-left`}>
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="h3 text-white">
            Your Transformation Starts with One Conversation
          </h2>
          {/* CTA plan: the closing band uses C1 (primary) and C2 (secondary). */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <SpeakToManager />
            <JoinWebinar />
          </div>
          <ul className="mt-6 space-y-1 text-white custom-text1">
            <li>
              Call or WhatsApp:{" "}
              <a
                href="tel:+923360082222"
                className="underline"
                data-cta-id="C6"
                data-gtm-event="phone_click"
              >
                +92 336 008 2222
              </a>{" "}
              (
              <a
                href="https://wa.me/923360082222"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                data-cta-id="C1"
                data-gtm-event="whatsapp_click"
              >
                WhatsApp
              </a>
              )
            </li>
            <li>International: +1 (206) 614 0234</li>
            <li>
              <a href="mailto:connect@arslanlarik.com" className="underline">
                connect@arslanlarik.com
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* DECISIONS v2 P5: no trademark attribution line; the ® on "Time Line Therapy®" carries it. */}
    </div>
  );
}
