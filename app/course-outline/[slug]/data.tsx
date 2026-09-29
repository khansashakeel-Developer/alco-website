import Link from "next/link";
import { BannerType } from "@/type/bannerType";
import { ContentSectionType } from "@/type/contentSection";
import { LevelContentType } from "@/type/levelContent";
import { CourseTypeInnerDetail } from "@/type/programType";

// Images
import programLevel1 from "@/assets/background/program-level-1.webp"
import LevetContent1 from "@/assets/level-content/level-content-1.webp"
import LevetContent2 from "@/assets/level-content/level-content-2.webp"
import LevetContent3 from "@/assets/level-content/level-content-3.webp"

// Level 1 Start

const bannerDataLevel1: BannerType = {
  level: "level 1",
  title: {
    line1: "NLP Practitioner Course Outline"
  },
  description: "Quad Certification plus UK ANLP CPD",
  image: programLevel1.src
};

const IntroDataLevel1: ContentSectionType = {
  title: "Programme at a Glance",
  TagType: "h2",
  textAlign: "text-start",
  padding: "py-6 md:py-8 lg:py-12",
  description: (
    <div className="max-w-5xl">
      <p className="my-4">
        <strong>Quick facts:</strong> 10 days, 130 credit hours, live on Zoom 8pm to 2am PKT, no prerequisite, cohorts of 20 to 25. Quad certification: three international board certifications (ABNLP, ABNLP Coaching Division, TLTA) plus AL&CO&apos;s own credential, and in addition a UK ANLP CPD certificate.
      </p>
      <p className="mb-4">
        This is the detailed outline of Level 1. For the certifications, what you take home and how to join, see the <Link href="/program/nlp-practitioner" className="underline">NLP Practitioner programme page</Link>, or <Link href="/programs" className="underline">all programmes</Link>.
      </p>
    </div>
  ),
};

// Brochure wording first; text in brackets is the website's existing finer detail.
const OutlineDataLevel1: LevelContentType = {
  title: { line1: "Detailed Course Outline", line2: "" },
  button: { text: "Back to NLP Practitioner", href: "/program/nlp-practitioner" },
  points: [
    {
      title: "Neuro-Linguistic Programming (NLP)",
      items: [
        "Definition and Themes of NLP",
        "Ecology",
        "The NLP Communication Model",
        "The Presuppositions of NLP",
        "Sensory Acuity (observing other people)",
        "Rapport",
        "Representational Systems (Preference Test)",
        "Predicates and Eye Patterns",
        "Submodalities, Like-to-Dislike, the Swish Pattern",
        "Anchoring, Stacking and Collapsing Anchors",
        "The Milton Model (hypnotic language)",
        "The Meta Model and Meta Model III",
        "Hierarchy of Ideas",
        "Linguistic Presuppositions and Metaphors",
        "Reframing, Cause and Effect",
        "Physiology of Excellence",
        "Perceptual Positions",
        "Parts Integration",
      ],
      image: { src: LevetContent1.src, alt: "Neuro-Linguistic Programming modules" },
    },
    {
      title: "Time Line Therapy® Techniques",
      items: [
        "Prime Directives of the Unconscious Mind",
        "Elicitation of the Time Line (1 and 2)",
        "First Test of Elicitation, Root Cause, Gestalt (discovering the root cause)",
        "Time Line Therapy® techniques for negative emotions (anger, sadness, fear, guilt, hurt)",
        "General Reframes, and TLT for Anxiety and Limiting Decisions",
        "Through-Time and In-Time (the classic Through-Time and In-Time)",
      ],
      image: { src: LevetContent2.src, alt: "Time Line Therapy Techniques modules" },
    },
    {
      title: "NLP Coaching",
      items: [
        "SMART Goals and the Wheel of Life",
        "The Coaching Cycle and the Ultimate Success Formula (starting the coaching cycle; the Ultimate Success Formula coaching method)",
        "Coaching Contract and Internal Drive History",
        "Five Principles for Success, State vs Goal, Well-Formed Outcomes (keys to an achievable outcome; well-formed conditions for coaching)",
      ],
      image: { src: LevetContent3.src, alt: "NLP coaching modules" },
    },
  ],
};

// Level 1 End

// Level 2 Start

const bannerDataLevel2: BannerType = {
  level: "level 2",
  title: {
    line1: "NLP Master Practitioner Course Outline"
  },
  description: "Quad Certification plus a Second UK ANLP CPD",
  image: programLevel1.src
};

const IntroDataLevel2: ContentSectionType = {
  title: "Programme at a Glance",
  TagType: "h2",
  textAlign: "text-start",
  padding: "py-6 md:py-8 lg:py-12",
  description: (
    <div className="max-w-5xl">
      <p className="my-4">
        <strong>Quick facts:</strong> 13 days, 140 hours, live on Zoom 8pm to 2am PKT, requires Level 1 (NLP Practitioner), includes a dedicated coach for your personal breakthrough. Quad certification at master level: three international board certifications (ABNLP, ABNLP Coaching Division, TLTA) plus AL&CO&apos;s own credential, and in addition a second UK ANLP CPD certificate.
      </p>
      <p className="mb-4">
        This is the detailed outline of Level 2. For the certifications, what you take home and how to join, see the <Link href="/program/nlp-master-practitioner" className="underline">NLP Master Practitioner programme page</Link>, or <Link href="/programs" className="underline">all programmes</Link>.
      </p>
    </div>
  ),
};

const OutlineDataLevel2: LevelContentType = {
  title: { line1: "Detailed Course Outline", line2: "" },
  button: { text: "Back to NLP Master Practitioner", href: "/program/nlp-master-practitioner" },
  points: [
    {
      title: "Neuro-Linguistic Programming (NLP)",
      items: [
        "Definition and Themes of NLP (advanced): what NLP really is, in advanced detail",
        "Interventions Guide to all challenges and problems",
        "Prime Directives of the Unconscious Mind, and Ecology",
        "RAS, the Reticular Activating System",
        "Quantum Linguistics: advanced presuppositions, Cartesian Coordinates, Meta Model III, modal operators, Time Scramble, the Limiting Decision Destroyer, Going Beyond Boundaries, Linguistic Re-Sourcing, De-Identification",
        "Values: Massey's developmental periods, sources of values, Clare Graves' 8 Values Levels, elicitation, alignment, conflict correction, changing values, corporate values alignment (including the three parts to a values level, and advanced values and beliefs)",
        "Basic Meta Programs (MBTI) and Complex Meta Programs (MPVI)",
        "Advanced NLP patterns and Modelling technology",
        "Advanced Submodality work and designer Swish patterns",
        "Reframing (advanced) and the 16 Sleight of Mouth patterns",
        "Logical Levels of Therapy and the Phobia Cure",
        "Strategies and Chaining Anchors (spelling, buying, motivation, learning, negotiation and relationship strategies)",
        "PHQ, the detailed personal history questionnaire",
        "The 4-MAT System",
        "NLP and Quantum Physics, and Ultimate Influence",
      ],
      image: { src: LevetContent1.src, alt: "Advanced NLP modules" },
    },
    {
      title: "Time Line Therapy® Techniques",
      items: [
        "Advanced Time Line Therapy® techniques for major and minor emotions (including General Reframes I and II)",
        "Emotional Chains 1 and 2, and the Drop-Down Through technique",
        "Handling association into traumatic memory, and Anxiety",
        "Changing the Time Line location and direction, and Creating Your Future (setting a goal and inserting it into the future)",
        "Forensic and regression work with Time Line Therapy®",
        "Secondary gains, and the Pain Paradigm for pain management",
      ],
      image: { src: LevetContent2.src, alt: "Advanced Time Line Therapy Techniques modules" },
    },
    {
      title: "NLP Coaching and the Coaching Business",
      items: [
        "The full coaching cycle (NLP, TLT and Creating Your Future), client disclosure and agreements (including assigning coaching tasks)",
        "The 13 steps to breaking limiting beliefs (working with limiting beliefs)",
        "Coaching Values Inventory and Logical Levels of Coaching",
        "How to get paid coaching clients and build a coaching business",
      ],
      image: { src: LevetContent3.src, alt: "NLP master coaching and business modules" },
    },
  ],
};

// Level 2 End

// Level 3 Start

const bannerDataLevel3: BannerType = {
  level: "level 3",
  title: {
    line1: "Advanced Hypnotherapy and Interventionist Course Outline"
  },
  description: "ABH and NGH Hypnosis Certification",
  image: programLevel1.src
};

// DECISIONS v2 F1: Level 3 is 13 days, worded exactly as below.
const IntroDataLevel3: ContentSectionType = {
  title: "Programme at a Glance",
  TagType: "h2",
  textAlign: "text-start",
  padding: "py-6 md:py-8 lg:py-12",
  description: (
    <div className="max-w-5xl">
      <p className="my-4">
        <strong>Quick facts:</strong> 13 days: 12 days of live teaching, plus one mandatory day in between for assignments set by AL&CO, held with breaks rather than back to back, live on Zoom, requires Level 2, entry by interview, never more than 20 participants. Certified through the American Board of Hypnotherapy (ABH) and the National Guild of Hypnotists (NGH, USA).
      </p>
      <p className="mb-4">
        This is the detailed outline of Level 3. For the certificates, the professional library you receive and how to request an interview, see the <Link href="/program/advanced-hypnotherapy-interventionist" className="underline">Advanced Hypnotherapy and Interventionist programme page</Link>, or <Link href="/programs" className="underline">all programmes</Link>.
      </p>
    </div>
  ),
};

const OutlineDataLevel3: LevelContentType = {
  title: { line1: "Detailed Course Outline", line2: "" },
  button: { text: "Back to Advanced Hypnotherapy", href: "/program/advanced-hypnotherapy-interventionist" },
  points: [
    {
      title: "Foundations and Hypnotic Language",
      items: [
        "History of Hypnosis",
        "Working with abreaction and secondary gains",
        "Mastering conversational hypnosis",
        "Fundamentals of Ericksonian hypnosis",
        "Hypnotic patterns: direct and indirect suggestion, embedded commands, truisms, binds and double binds, multi-level communication (including truisms about sensations and about time; not knowing, not doing; open-ended and compound suggestions; covering all possibilities of response; focusing attention; facilitating internal change; implication and implied directives)",
        "Pre-induction and preparation for trance, and the hypnotic contract",
        "Stages of hypnosis, and suggestibility tests",
      ],
      image: { src: LevetContent1.src, alt: "Hypnosis foundations modules" },
    },
    {
      title: "Inductions, Deepening and Suggestion",
      items: [
        "Ericksonian inductions (1 and 2)",
        "The general pendulum paradigm (including the pendulum chart and the analog pendulum chart)",
        "Deepening techniques (direct and indirect)",
        "Multiple embedded metaphors, and contraindications",
        "Post-hypnotic and direct suggestions",
        "The direct-authoritarian approach (Estabrooks), including Estabrooks' induction and combining Ericksonian indirect suggestion with the direct-authoritarian approach",
        "Progressive test induction",
        "Elman inductions I and II, and the Elman pre-talk (the requisites for hypnosis)",
        "Convincers, basic to advanced, and the Krasner Method (including R.E.D.+ and working with imagination)",
      ],
      image: { src: LevetContent2.src, alt: "Induction and deepening modules" },
    },
    {
      title: "Application, Self-Hypnosis and Breakthrough",
      items: [
        "Pain control: analgesia and anaesthesia (including the pain control format)",
        "Therapeutic scripts: habits, weight, smoking cessation, protective scripts, group induction (including the universal script for overeating, nail biting and bad habits; the High Road to Success; Water off a Duck's Back; the weight loss universal pattern; pre-qualifying techniques for smokers)",
        "Self-hypnosis using 7th Path, the 9 Recognitions (DELTA), and the Flow of Perception",
        "Past-life and future regression, inner-child work, time-tunnelling",
        "Forgiveness of self and others",
        "Ernest Rossi's technique, and free-style hypnosis",
        "Achieving breakthrough with hypnosis, integrated with every intervention",
      ],
      image: { src: LevetContent3.src, alt: "Applied hypnosis and self-hypnosis modules" },
    },
  ],
};

// Level 3 End

export const courseInnerDetail: CourseTypeInnerDetail[] = [
  {
    slug: "nlp-practitioner",
    seo: {
      title: "NLP Practitioner Course Outline and Syllabus | AL&CO",
      description: "The detailed NLP Practitioner syllabus: NLP, Time Line Therapy® Techniques and NLP coaching over 130 live hours. Read the outline, then book a call.",
      canonicalPath: "/program/nlp-practitioner",
      ogImage: "https://arslanlarik.com/og/nlp-practitioner.jpg",
    },
    BannerData: bannerDataLevel1,
    IntroData: IntroDataLevel1,
    OutlineData: OutlineDataLevel1,
  },
  {
    slug: "nlp-master-practitioner",
    seo: {
      title: "NLP Master Practitioner Course Outline and Syllabus | AL&CO",
      description: "The detailed NLP Master Practitioner syllabus: values, Modelling, advanced Time Line Therapy® and the coaching business. Read it, then book a call.",
      canonicalPath: "/program/nlp-master-practitioner",
      ogImage: "https://arslanlarik.com/og/nlp-master-practitioner.jpg",
    },
    BannerData: bannerDataLevel2,
    IntroData: IntroDataLevel2,
    OutlineData: OutlineDataLevel2,
  },
  {
    slug: "advanced-hypnotherapy-interventionist",
    seo: {
      title: "Advanced Hypnotherapy Course Outline and Syllabus | AL&CO",
      description: "The detailed Level 3 hypnosis syllabus: Ericksonian and Elman inductions, deepening, suggestion and self-hypnosis. Read it, then request an interview.",
      canonicalPath: "/program/advanced-hypnotherapy-interventionist",
      ogImage: "https://arslanlarik.com/og/advanced-hypnotherapy-interventionist.jpg",
    },
    BannerData: bannerDataLevel3,
    IntroData: IntroDataLevel3,
    OutlineData: OutlineDataLevel3,
  },
];
