import type { Metadata } from "next";
import { SITE_URL } from "@/utils/buildMetadata";
import type { LevelFaq } from "@/type/programType";

type ProgramSeo = {
  level: number;
  /** Short name, used as "Level N: name" in Course, breadcrumb and OG alt. */
  name: string;
  title: string;         // 50 to 60 characters
  description: string;   // 140 to 155 characters, one call to action, no prices
  keywords?: string[];
  ogImage: string;       // file in /public, 1200x630 JPG (step 10)
  courseDescription: string;
  credential: string;
  prerequisite: string;
  workload?: string;     // ISO 8601 duration; omitted where the brochure gives no hours
  timeToComplete?: string; // ISO 8601 duration of the programme in days; omitted for Level 6 (3 to 5 years)
};

// Rule: no "offers", no "price", no currency, no phone number anywhere in this file.
export const PROGRAM_SEO: Record<string, ProgramSeo> = {
  "nlp-practitioner": {
    level: 1,
    name: "NLP Practitioner",
    title: "NLP Practitioner Certification Online, Pakistan | AL&CO",
    description:
      "Earn quad NLP Practitioner certification plus UK ANLP CPD: 10 days, 130 hours, live on Zoom, no background needed. Book a conversation to enrol today.",
    ogImage: "/og/nlp-practitioner.jpg",
    courseDescription:
      "Level 1 of AL&CO's six-level ladder: 10 days and 130 hours of live NLP, coaching and Time Line Therapy® Techniques training on Zoom, with quad certification (ABNLP, TLTA, ABNLP Coaching Division, AL&CO) plus a UK ANLP CPD certificate.",
    credential:
      "ABNLP Certified Practitioner of NLP; TLTA Certified Practitioner of Time Line Therapy® Techniques; ABNLP Coaching Division Certified NLP Coach; AL&CO Certified Practitioner of Behavioral Reengineering; UK ANLP CPD certificate",
    prerequisite: "None. Built for the complete beginner.",
    workload: "PT130H",
    timeToComplete: "P10D",
  },
  "nlp-master-practitioner": {
    level: 2,
    name: "NLP Master Practitioner",
    title: "NLP Master Practitioner Certification, Live Online | AL&CO",
    description:
      "Quad NLP Master Practitioner certification plus a second UK ANLP CPD: 13 days, 140 hours live on Zoom, with a dedicated coach. Book a conversation today.",
    ogImage: "/og/nlp-master-practitioner.jpg",
    courseDescription:
      "Level 2 of AL&CO's six-level ladder: 13 days and 140 hours of live advanced NLP, Time Line Therapy® Techniques and master coaching training on Zoom, with quad certification at master level plus a second UK ANLP CPD certificate and a dedicated coach for your breakthrough.",
    credential:
      "ABNLP Certified Master Practitioner of NLP; TLTA Master Practitioner of Time Line Therapy® Techniques; ABNLP Coaching Division Certified NLP Master Coach; AL&CO Certified Practitioner of Behavioral Reengineering (master level); UK ANLP CPD certificate",
    prerequisite: "Level 1, NLP Practitioner",
    workload: "PT140H",
    timeToComplete: "P13D",
  },
  "advanced-hypnotherapy-interventionist": {
    level: 3,
    name: "Advanced Hypnotherapy and Interventionist",
    title: "Hypnotherapy Certification and Advanced Hypnosis | AL&CO",
    // DECISIONS v2 F1: Level 3 is shown as 13 days (150 characters).
    description:
      "Advanced hypnosis training certified through ABH and NGH: 13 days live on Zoom, never more than 20 per cohort, Level 2 required. Request an interview.",
    ogImage: "/og/advanced-hypnotherapy-interventionist.jpg",
    courseDescription:
      "Level 3 of AL&CO's six-level ladder: advanced hypnosis and hypnotherapy training live on Zoom, over 13 days: 12 days of live teaching, plus one mandatory day in between for assignments set by AL&CO. Certified through the American Board of Hypnotherapy and the National Guild of Hypnotists (USA). Requires Level 2 and an interview; never more than 20 participants.",
    credential:
      "ABH Certified Practitioner of Hypnosis; ABH Certified Master Practitioner of Hypnosis; NGH hypnosis certification and Member in Good Standing; AL&CO Testament to the Graduate (Quintuple Certification)",
    prerequisite: "Level 2, NLP Master Practitioner, and an interview",
    timeToComplete: "P13D",
  },
  "nlp-trainers-training-program": {
    level: 4,
    name: "NLP Train the Trainer",
    title: "NLP Trainer Training: Level 4 Train the Trainer | AL&CO",
    description:
      "NLP Trainer training at AL&CO: 18 days live on Zoom, leading to Certified Trainer of NLP (ABNLP). Entry by interview. Apply to speak with our team today.",
    keywords: ["NLP trainer training", "NLP train the trainer", "certified NLP trainer", "ABNLP trainer certification", "NLP trainer course online"],
    ogImage: "/og/nlp-trainers-training-program.jpg",
    courseDescription:
      "NLP Trainer training: 18 days (14 training and 4 evaluation), 120 hours, live on Zoom, leading to Certified Trainer of NLP (ABNLP). Entry by interview with Bismillah Pervez. Requires Level 2, NLP Master Practitioner.",
    credential: "Certified Trainer of NLP (ABNLP)",
    prerequisite: "Level 2, NLP Master Practitioner, and an interview",
    workload: "PT120H",
    timeToComplete: "P18D",
  },
  "hypnosis-trainers-training-program": {
    level: 5,
    name: "Hypnosis Train the Trainer",
    title: "Hypnosis Trainer Certification: Level 5 Programme | AL&CO",
    description:
      "Hypnosis trainer certification at AL&CO: 8 days live on Zoom, leading to Certified Hypnosis Trainer (ABH). Entry by interview. Apply to speak with us.",
    keywords: ["hypnosis trainer certification", "hypnosis train the trainer", "ABH certified hypnosis trainer", "approved school of hypnosis", "hypnosis trainer course online"],
    ogImage: "/og/hypnosis-trainers-training-program.jpg",
    courseDescription:
      "Hypnosis trainer certification: 8 days, live on Zoom, leading to Certified Hypnosis Trainer (ABH) and the right to register an Approved School of Hypnosis. Entry by interview with Bismillah Pervez. Requires Level 3.",
    credential: "Certified Hypnosis Trainer (ABH)",
    prerequisite: "Level 3, Advanced Hypnotherapy and Interventionist, and an interview",
    timeToComplete: "P8D",
  },
  "nlp-master-trainer-program": {
    level: 6,
    name: "NLP Master Trainer",
    title: "NLP Master Trainer Programme: Level 6 by Application | AL&CO",
    description:
      "Become an NLP Master Trainer with AL&CO: a mentored three to five year path to ABNLP certification, with AL&CO's own two-signature sign-off. Apply today.",
    keywords: ["NLP Master Trainer", "NLP Master Trainer programme", "ABNLP Master Trainer", "NLP Master Trainer certification"],
    ogImage: "/og/nlp-master-trainer-program.jpg",
    courseDescription:
      "The highest grade in NLP: a supervised, mentored programme of three to five years, by application, interview and Board evaluation, leading to Certified Master Trainer of NLP (ABNLP). The sign-off by two Master Trainers is AL&CO's own standard.",
    credential: "Certified Master Trainer of NLP (ABNLP)",
    prerequisite: "A Certified Trainer of NLP in good standing (AL&CO Levels 1, 2 and 4)",
  },
};

export const programUrl = (slug: string) => `${SITE_URL}/program/${slug}`;
const levelLabel = (s: ProgramSeo) => `Level ${s.level}: ${s.name}`;

/** Metadata for a level page. Code is the single source; the CMS SeoMeta is not read. */
export function programMetadata(slug: string): Metadata {
  const s = PROGRAM_SEO[slug];
  const url = programUrl(slug);
  if (!s) {
    // Unreachable while dynamicParams = false, kept as a safe default.
    return { title: "All Programmes | AL&CO", alternates: { canonical: url }, robots: { index: false, follow: true } };
  }
  const alt = `${levelLabel(s)}, AL&CO`;
  return {
    title: s.title,
    description: s.description,
    keywords: s.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: s.title,
      description: s.description,
      url,
      siteName: "AL&CO",
      locale: "en_PK",
      type: "website",
      images: [{ url: s.ogImage, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: s.title,
      description: s.description,
      images: [s.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

/** Course + EducationalOccupationalProgram + BreadcrumbList (+ FAQPage when the page has FAQs)
 *  in one @graph. No offers, no price (BRIEF rule 1; DECISIONS v2 T2). */
export function programJsonLd(slug: string, faqs?: LevelFaq[]) {
  const s = PROGRAM_SEO[slug];
  if (!s) return null;
  const url = programUrl(slug);
  const name = levelLabel(s);

  const course = {
    "@type": "Course",
    "@id": `${url}#course`,
    name,
    description: s.courseDescription,
    url,
    image: `${SITE_URL}${s.ogImage}`,
    inLanguage: "en",
    provider: {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: "Arslan Larik & Company",
      url: SITE_URL,
    },
    educationalCredentialAwarded: s.credential,
    coursePrerequisites: s.prerequisite,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      ...(s.workload ? { courseWorkload: s.workload } : {}),
    },
    // No "offers" and no "price": BRIEF rule 1.
  };

  // DECISIONS v2 T2: the programme node sits alongside the Course and points at it.
  // Deliberately no "offers", "offerDetails", "salaryUponCompletion" or any price field.
  const program = {
    "@type": "EducationalOccupationalProgram",
    "@id": `${url}#program`,
    name,
    description: s.courseDescription,
    url,
    inLanguage: "en",
    provider: course.provider,
    educationalProgramMode: "online",
    educationalCredentialAwarded: s.credential,
    programPrerequisites: s.prerequisite,
    ...(s.timeToComplete ? { timeToComplete: s.timeToComplete } : {}),
    hasCourse: { "@id": `${url}#course` },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "All Programmes", item: `${SITE_URL}/programs` },
      { "@type": "ListItem", position: 3, name, item: url },
    ],
  };

  const graph: object[] = [course, program, breadcrumb];
  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
