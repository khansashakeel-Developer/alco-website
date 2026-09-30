// Type
import NextStepCards from "@/component/NextStepCards";
import { BannerType } from "@/type/bannerType";
import { whatsappHref, waLine } from "@/component/cta";
import { LevelIntroWithVideoType } from "@/type/levelIntroWithVideo";
import { ProgramType } from "@/type/programType";
import { LevelBenefitsTableType } from "@/type/levelBenefitsTable";
import { LevelProgramIncludesType } from "@/type/levelProgramIncludes";
import { LevelContentType } from "@/type/levelContent";
import { LevelGraduatesExperienceType } from "@/type/levelGraduatesExperience";
import ThumbnailIntro1 from "@/assets/thumbnail/intro/intro_level1.webp";
import ThumbnailIntro2 from "@/assets/thumbnail/intro/intro_level2.webp";
import ThumbnailIntro3 from "@/assets/thumbnail/intro/intro_level3.webp";
import ThumbnailIntro4 from "@/assets/thumbnail/intro/intro_level4.webp";
import ThumbnailIntro5 from "@/assets/thumbnail/intro/intro_level5.webp";
import ThumbnailIntro6 from "@/assets/thumbnail/intro/intro_level6.webp";
import ThumbnailReview1 from "@/assets/thumbnail/review/review_level1.webp";
import ThumbnailReview2 from "@/assets/thumbnail/review/review_level2.webp";
import ThumbnailReview3 from "@/assets/thumbnail/review/review_level3.webp";
import ThumbnailReview4 from "@/assets/thumbnail/review/review_level4.webp";
import ThumbnailReview5 from "@/assets/thumbnail/review/review_level5.webp";

// Images
import programLevel1 from "@/assets/background/program-level-1.webp"
import programLevel2 from "@/assets/background/program-level-2.webp"
import { LevelCertificationType } from "@/type/levelCertification";
import AccreditedBrand1 from "@/assets/accredited/accredited-1.webp"
import AccreditedBrand2 from "@/assets/accredited/accredited-2.webp"
import AccreditedBrand3 from "@/assets/accredited/accredited-3.webp"
import AccreditedBrand4 from "@/assets/accredited/accredited-4.webp"
import AccreditedBrand5 from "@/assets/accredited/accredited-5.webp"
import AccreditedBrand6 from "@/assets/accredited/accredited-6.webp"
import Certificate1Level1 from "@/assets/level-certificate/certificate-1-level-1.webp"
import Certificate2Level1 from "@/assets/level-certificate/certificate-2-level-1.webp"
import Certificate3Level1 from "@/assets/level-certificate/certificate-3-level-1.webp"
import Certificate1Level2 from "@/assets/level-certificate/certificate-1-level-2.webp"
import Certificate2Level2 from "@/assets/level-certificate/certificate-2-level-2.webp"
import Certificate3Level2 from "@/assets/level-certificate/certificate-3-level-2.webp"
import Certificate1Level3 from "@/assets/level-certificate/certificate-1-level-3.webp"
import Certificate2Level3 from "@/assets/level-certificate/certificate-2-level-3.webp"
import Certificate3Level3 from "@/assets/level-certificate/certificate-3-level-3.webp"
import Certificate4Level3 from "@/assets/level-certificate/certificate-4-level-3.webp"
import Certificate5Level3 from "@/assets/level-certificate/certificate-5-level-3.webp"
import Certificate1Level4 from "@/assets/level-certificate/certificate-1-level-4.webp"
import Certificate1Level5 from "@/assets/level-certificate/certificate-1-level-5.webp"
import Certificate1Level6 from "@/assets/level-certificate/certificate-1-level-6.webp"
import LevelProgram1 from "@/assets/level-program-included/program-1.webp"
import LevelProgram2 from "@/assets/level-program-included/program-2.webp"
import LevelProgram3 from "@/assets/level-program-included/program-3.webp"
import LevelProgram4 from "@/assets/level-program-included/program-4.webp"
import LevelProgram5 from "@/assets/level-program-included/program-5.webp"
import LevelProgram6 from "@/assets/level-program-included/program-6.webp"
import LevetContent1 from "@/assets/level-content/level-content-1.webp"
import LevetContent2 from "@/assets/level-content/level-content-2.webp"
import LevetContent3 from "@/assets/level-content/level-content-3.webp"
import { ContentSectionType } from "@/type/contentSection";
import Link from "next/link";
import BadgeCPD from "@/assets/level-certificate/badges/cpd.webp";
import type { LevelFaq, LevelNavType } from "@/type/programType";

// Level 1 Start

const bannerDataLevel1: BannerType = {
  level: "level 1",
  title: {
    line1: "NLP Practitioner Certification"
  },
  description: "Quad Certification plus UK ANLP CPD",
  image: programLevel1.src,
  // className: "bg-no-repeat bg-top-right bg-cover"
};

const LevelIntroWithVideoDataLevel1: LevelIntroWithVideoType = {
  title: {
    line1: "Quad Certification",
    line2: "Plus One CPD Accreditation"
  },
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774599136/Level1_Intro_pssnhq.mp4",
  thumbnail: ThumbnailIntro1,
  description:
    `<p><strong>Quick facts:</strong> 10 days, 130 credit hours, live on Zoom 8pm to 2am PKT, no prerequisite, cohorts of 20 to 25.</p>
    <p><strong>What it is.</strong> Ten consecutive evenings in which you learn the actual mechanics of how your mind builds your reality, and how to change it. It is not a lecture series you watch; from the first day you are practising on real people, guided and corrected in the room, until the skills are yours.</p>
    <p><strong>What it gives you.</strong> The tools to read another person and connect fast; the language to hold a room and defuse conflict; the ability to release emotions you have carried for years, at the root; a switch for your own state before any interview, stage or hard conversation; and a complete coaching toolkit, so you finish able to take a paying client through change and open a practice the week the training ends.</p>`,
}

// Quad = ABNLP + ABNLP Coaching Division + TLTA + AL&CO's own credential; ANLP is a separate CPD accreditation, never a board (DECISIONS v2 F4).
const LevelCertificationDataLevel1: LevelCertificationType = {
  title: {
    line1: "Certifications",
    line2: "Quad Certification plus UK ANLP CPD"
  },
  points: [
    {
      // LOGO: ABNLP - Khansa to supply approved artwork (accredited-1.webp is a placeholder until confirmed)
      title: "Certified Practitioner of NLP, American Board of NLP (ABNLP)",
      description: "From the American Board of NLP, the world's largest NLP authority. Internationally recognised, for use in coaching, training and personal development.",
      imageBrand: { src: AccreditedBrand1, alt: "American Board of NLP (ABNLP) seal" },
      imageCerficate: { src: Certificate1Level1, alt: "Sample ABNLP Certified Practitioner of NLP certificate" },
    },
    {
      // LOGO: TLTA - Khansa to supply approved artwork (accredited-2.webp is a placeholder until confirmed)
      title: "Certified Practitioner of Time Line Therapy® Techniques, Time Line Therapy Association (TLTA)",
      description: "The trademarked technique set acknowledged as the fastest way to release negative emotions, limiting beliefs and anxiety, at the unconscious level.",
      imageBrand: { src: AccreditedBrand2, alt: "Time Line Therapy Association (TLTA) seal" },
      imageCerficate: { src: Certificate2Level1, alt: "Sample TLTA Certified Practitioner of Time Line Therapy certificate" },
    },
    {
      // LOGO: ABNLP Coaching Division - Khansa to supply approved artwork (accredited-3.webp is a placeholder until confirmed)
      title: "Certified NLP Coach, Coaching Division of the ABNLP",
      description: "The Coaching Division of the ABNLP is a certifying board in its own right, so you are certified to coach, not only to practise techniques.",
      imageBrand: { src: AccreditedBrand3, alt: "Coaching Division of the American Board of NLP seal" },
      imageCerficate: { src: Certificate3Level1, alt: "Sample ABNLP Coaching Division Certified NLP Coach certificate" },
    },
    {
      // LOGO: AL&CO - Khansa to supply approved artwork (accredited-6.webp is a placeholder until confirmed)
      title: "AL&CO Certified Practitioner of Behavioral Reengineering",
      description: "Our own credential, earned through a short assignment and awarded only to AL&CO graduates.",
      imageBrand: { src: AccreditedBrand6, alt: "Arslan Larik & Company (AL&CO) seal" },
    },
    {
      // LOGO: ANLP CPD - Khansa to supply approved artwork (cpd.webp is a placeholder until confirmed). A CPD accreditation, not a certifying board
      title: "Plus a UK ANLP CPD Certificate",
      description: "Your 130 hours logged as continuing professional development against a UK standard, from ANLP in the United Kingdom. ANLP confers no title; it evidences your hours and your standard.",
      imageBrand: { src: BadgeCPD, alt: "ANLP (UK) CPD accreditation badge" },
    },
  ],
}

const LevelBenefitsTableDataLevel1: LevelBenefitsTableType = {
  title: {
    line1: "Benefits of Choosing",
    line2: "NLP Practitioner Training",
  },

  button: {
    text: "Learn More",
    href: "/program-detail/benefits-of-choosing-nlp-training-course"
  },

  headers: [
    "Content",
    "Benefits for Personal Development",
    "Benefits for Coaches",
  ],

  points: [
    {
      content: "Definition of NLP",
      values: [
        "Understand how your mind works, allowing you to break free from limiting beliefs.",
        "Equip yourself with foundational NLP knowledge to guide clients confidently.",
      ],
    },
    {
      content: "Themes of NLP",
      values: [
        "Develop clarity and alignment in thoughts and emotions.",
        "Use NLP principles to create structured, impactful coaching sessions that help clients achieve sustainable change.",
      ],
    },
    {
      content: "Ecology",
      values: [
        "Make decisions that align with your values and positively impact your life and relationships.",
        "Guide clients to assess the impact of their goals on their lives, relationships, and overall well-being, ensuring ethical and sustainable growth.",
      ],
    },
    {
      content: "NLP Communication Model",
      values: [
        "Improve your communication to connect with others deeply, reduce misunderstandings, and build stronger relationships.",
        "Teach clients how to communicate effectively and interpret verbal and non-verbal cues to build rapport and influence outcomes.",
      ],
    },
    {
      content: "Presuppositions of NLP",
      values: [
        "Reframe your mindset to embrace positive, empowering beliefs that transform your approach to challenges.",
        "Help clients adopt empowering perspectives that enable growth and dissolve self-limiting beliefs.",
      ],
    },
  ],
};

const LevelProgramIncludesDataLevel1: LevelProgramIncludesType = {
  title: {
    line1: "This Programme Includes",
    line2: "NLP Practitioner Training"
  },
  layout: "split",
  description: (
    <>
      <p className="my-4">
        The NLP Practitioner is Level 1 of AL&CO's six-level ladder, taught live and personally by Arslan Larik, Founder and Master Trainer, alongside Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK). It is open to everyone, including the complete beginner.
      </p>
      <p>
        You build practical skill in the core tools of NLP, coaching and Time Line Therapy® Techniques, including the Meta Model, the Milton Model, anchoring, submodality work and well-formed outcomes, practised on real people in every session. These skills apply straight away in coaching, leadership, sales, education and your own life.
      </p>
    </>
  ),
  points: [
    {
      title: "10 Days, 130 Hours, Live on Zoom",
      description: (
        <p>Ten consecutive evenings, 8pm to 2am PKT, live on Zoom in cohorts of 20 to 25. From the first day you practise on real people, guided and corrected in the room, until the skills are yours.</p>
      ),
      theme: "dark",
      image: {
        src: LevelProgram1,
        alt: "10 days, 130 hours, live on Zoom",
      },
    },
    {
      title: "A 500-Page Training Manual",
      description: (
        <p>Your training manual, about 500 pages, covers every technique in the programme. It is issued digitally and is yours to keep, so you can study back at home and revise every technique in your own time. We encourage the e-copy, which is kinder to the planet; a printed set is available at an additional charge.</p>
      ),
      theme: "light",
      image: {
        src: LevelProgram2,
        alt: "500-page NLP Practitioner training manual",
      },
    },
    {
      title: "222 Audio Files",
      description: (
        <p>222 audio files, mapped to your manual and provided through the AL&CO online learning portal, so you can study back at home and revise every technique in your own time.</p>
      ),
      theme: "yellow",
      image: {
        src: LevelProgram3,
        alt: "222 audio files on the AL&CO online learning portal",
      },
    },
    {
      title: "Quad Certification plus CPD",
      description: (
        <>
          <p className="mb-2">A true quad: three international board certifications plus AL&CO's own credential, and in addition a UK ANLP CPD accreditation (ANLP is a CPD accreditation, not a board):</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Certified Practitioner of NLP (ABNLP).</li>
            <li>Certified Practitioner of Time Line Therapy® Techniques (TLTA).</li>
            <li>Certified NLP Coach (Coaching Division of the ABNLP).</li>
            <li>AL&CO Certified Practitioner of Behavioral Reengineering.</li>
            <li>Plus a UK ANLP CPD certificate for your 130 hours.</li>
          </ul>
        </>
      ),
      theme: "yellow",
      image: {
        src: LevelProgram4,
        alt: "Quad certification plus UK ANLP CPD",
      },
    },
    {
      title: "Free Revisits for Five Years",
      description: (
        <p>A genuine 130 hours, and a door that stays open to revisit, free, for five years. Come back to a different room each time: change that is repeated is change that holds.</p>
      ),
      theme: "dark",
      image: {
        src: LevelProgram5,
        alt: "Free revisits for five years",
      },
    },
    {
      title: "A Global Support Network",
      description: (
        <>
          <p className="mb-2">Join a global community of 2,000+ AL&CO graduates across 20+ countries, a space where learning thrives beyond the training room. You'll:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Practice interventions with peers to sharpen your skills.</li>
            <li> Gain access to expert mentorship and guidance whenever you need it.</li>
            <li>Stay motivated and inspired through shared experiences and collaborative growth.</li>
          </ul>
        </>
      ),
      theme: "light",
      image: {
        src: LevelProgram6,
        alt: "Global community of AL&CO graduates",
      },
    },
  ],

  // pointsClass: "grid grid-col-1 lg:grid-cols-2 gap-4 lg:gap-8 py-2 md:py-4 lg:py-8 xl:py-12",
  textAlign: "text-start",
  // No prices, fees or payment plans anywhere (ruling 25 Sep 2026). US number is plain text, never a link.
  detailContent: (
    <NextStepCards
      cards={[
      { title: "What You Will Walk Away With", body: <>Upon completing this certification, you will be equipped to identify and shift limiting beliefs, communicate with precision and influence, facilitate powerful change conversations, and apply NLP methodologies within your professional practice.</> },
      { title: "Who This Programme Is For", body: <>Everyone, including the complete beginner. You leave able to coach professionally and change your own life.</> },
      { title: "Prerequisite", body: <>None. Level 1 is built for the complete beginner.</> },
      { title: "How to Join", body: <>Levels 1 and 2 are arranged by your relationship manager, who will confirm exactly what is included at your level and in your confirmed package. Call or WhatsApp <a href="tel:+923360082222" className="underline">+92 336 008 2222</a> (<a href="https://wa.me/923360082222" className="underline">WhatsApp</a>), or write to <a href="mailto:connect@arslanlarik.com" className="underline">connect@arslanlarik.com</a>. US and Canada: +1 (206) 614 0234.</> },
      { title: "Why You Will Not Find a Number Here", body: <>This is an investment in your future, and we treat it as one, so you will not see a figure in these pages. That is deliberate, and it is out of fairness to you. To print a single figure, we would have to quote you for every level at once, whether or not you need them all. We would rather understand what you actually want first, and then build a proposition around your own journey, only what serves you, and nothing that does not.</> },
      ]}
    />
  ),
};


const LevelContentDataLevel1: LevelContentType = {
  title: {
    line1: "The Full Curriculum",
    line2: ""
  },

  button: {
    text: "See the Detailed Course Outline",
    href: "/course-outline/nlp-practitioner"
  },

  // All 28 brochure bullets, verbatim, each once; the grouping into three cards is ours.
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
        "First Test of Elicitation, Root Cause, Gestalt",
        "Time Line Therapy® techniques for negative emotions (anger, sadness, fear, guilt, hurt)",
        "General Reframes, and TLT for Anxiety and Limiting Decisions",
        "Through-Time and In-Time",
      ],
      image: { src: LevetContent2.src, alt: "Time Line Therapy Techniques modules" },
    },
    {
      title: "NLP Coaching",
      items: [
        "SMART Goals and the Wheel of Life",
        "The Coaching Cycle and the Ultimate Success Formula",
        "Coaching Contract and Internal Drive History",
        "Five Principles for Success, State vs Goal, Well-Formed Outcomes",
      ],
      image: { src: LevetContent3.src, alt: "NLP coaching modules" },
    },
  ],
};

const LevelGraduatesExperienceDataLevel1: LevelGraduatesExperienceType = {
  title: {
    line1: "In Their Own Words",
    line2: "NLP Practitioner Graduates"
  },
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774599133/Level1_Review_f8fbjg.mp4",
  thumbnail: ThumbnailReview1,
}

// "Where It Leads" (no trademark attribution line: the ® carries it, DECISIONS v2 P5)
const WhereItLeadsDataLevel1: ContentSectionType = {
  title: "Where It Leads",
  TagType: "h2",
  textAlign: "text-start",
  fullBg: "bg-white",
  padding: "py-6 md:py-8 lg:py-12 xl:py-16",
  description: (
    <div className="max-w-5xl">
      <p className="my-4">
        Practitioner changes you, and for many that is enough. But if you feel the pull to make this a profession, Level 2 is built for exactly that.
      </p>
      <p className="mb-4">
        <strong>A note we make with pride, not apology.</strong> Hypnosis is not part of the Practitioner. We refuse to dilute. Our hypnotherapy is a full journey of its own at Level 3.
      </p>
      <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>Next level: <Link href="/program/nlp-master-practitioner" className="underline">Level 2, NLP Master Practitioner</Link></li>
        <li>Later: <Link href="/program/advanced-hypnotherapy-interventionist" className="underline">Level 3, Advanced Hypnotherapy and Interventionist</Link></li>
        <li>See the whole ladder: <Link href="/programs" className="underline">All programmes</Link></li>
        <li>Not sure yet? <Link href="/contact#form" className="underline" data-cta-id="C5" data-gtm-event="cta_click">Book a conversation</Link> or ask your relationship manager for the link to our free weekly introductory webinar.</li>
      </ul>
    </div>
  ),
};

// Plain strings: the same array feeds the visible accordion and the FAQPage JSON-LD.
const FaqDataLevel1: LevelFaq[] = [
  {
    question: "Four certifications in ten days sounds like a lot. Can a complete beginner really be ready to practise?",
    answer: "The quad is not marketing; it reflects four real, connected skills you build together: the language patterns of NLP, goal-focused coaching, the release work of Time Line Therapy® Techniques, and our own Behavioral Reengineering. And ten days here is not ten short sittings; it is a genuine 130 hours, most of it spent practising on real people under a trainer's eye. You leave with skill in your hands, not theory in a folder.",
  },
  {
    question: "Do I need any background to start?",
    answer: "None at all. Level 1 is built for the complete beginner. Think of it like learning to swim: we do not ask whether you already can, we get in the water with you and stay there until you are moving on your own.",
  },
  {
    question: "Is hypnosis part of the Practitioner?",
    answer: "No, and that is deliberate. Hypnosis is a full journey of its own at Level 3, taught properly, so we build hypnotists, not people reading from scripts.",
  },
  {
    question: "Is it really all online, and does that work?",
    answer: "Yes, fully live on Zoom, and it is nothing like watching a recording. You are in a real room with a real trainer and real classmates, practising on each other in every session. We were the first in the region to teach NLP this way, and our graduates now coach clients across the world because of it.",
  },
  {
    question: "I work full time. Can I keep up?",
    answer: "The trainings run live in the evenings on Zoom. Your manual is yours to keep, and your audio files are on the AL&CO online learning portal, so you can revisit both at your own pace. Because you can re-attend free for five years, you are never one missed evening away from falling behind. It is built to fit a working life.",
  },
];

const NavDataLevel1: LevelNavType = {
  next: { href: "/program/nlp-master-practitioner", label: "Level 2: NLP Master Practitioner" },
};

// Level 1 End


// Level 2 Start

const bannerDataLevel2: BannerType = {
  level: "level 2",
  title: {
    line1: "NLP Master Practitioner Certification"
  },
  description: "Quad Certification plus a Second UK ANLP CPD",
  image: programLevel2.src,
  className: "bg-center bg-no-repeat bg-primary"
};

const LevelIntroWithVideoDataLevel2: LevelIntroWithVideoType = {
  title: {
    line1: "Quad Certification Plus One CPD Accreditation",
    line2: "Building the Castle on the Foundation"
  },
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774599143/Level2_Intro_rhs6uo.mp4",
  thumbnail: ThumbnailIntro2,
  description:
    `<p><strong>Quick facts:</strong> 13 days, 140 hours, live on Zoom 8pm to 2am PKT, requires Level 1 (NLP Practitioner), cohorts of 20 to 25, includes a dedicated coach for your personal breakthrough.</p>
    <p><strong>What it is.</strong> The Master Practitioner picks up where the Practitioner ended and builds a castle on that foundation, with advanced tools that work at the conscious and unconscious level at once. At Practitioner you change yourself; here you gain a capability and a livelihood.</p>
    <p><strong>What you master.</strong> Reading people at depth; the language of a master; working at the level of values; the advanced change work that other coaches refer away; Modelling, the highest-paid skill in the field; and building the business, including your own eight-hour breakthrough session.</p>`,
};

// Quad = ABNLP + ABNLP Coaching Division + TLTA + AL&CO's own credential; ANLP is a separate CPD accreditation, never a board (DECISIONS v2 F4).
const LevelCertificationDataLevel2: LevelCertificationType = {
  title: {
    line1: "Certifications",
    line2: "Quad Certification plus a Second UK ANLP CPD"
  },
  points: [
    {
      // LOGO: ABNLP - Khansa to supply approved artwork (accredited-1.webp is a placeholder until confirmed)
      title: "Certified Master Practitioner of NLP, American Board of NLP (ABNLP)",
      description: "The senior international credential in the field, from the ABNLP, the world's largest NLP authority.",
      imageBrand: { src: AccreditedBrand1, alt: "American Board of NLP (ABNLP) seal" },
      imageCerficate: { src: Certificate1Level2, alt: "Sample ABNLP Certified Master Practitioner of NLP certificate" },
    },
    {
      // LOGO: TLTA - Khansa to supply approved artwork (accredited-2.webp is a placeholder until confirmed)
      title: "Master Practitioner of Time Line Therapy® Techniques, Time Line Therapy Association (TLTA)",
      description: "Mastery of the technique set, not familiarity with it.",
      imageBrand: { src: AccreditedBrand2, alt: "Time Line Therapy Association (TLTA) seal" },
      imageCerficate: { src: Certificate2Level2, alt: "Sample TLTA Master Practitioner of Time Line Therapy certificate" },
    },
    {
      // LOGO: ABNLP Coaching Division - Khansa to supply approved artwork (accredited-3.webp is a placeholder until confirmed)
      title: "Certified NLP Master Coach, Coaching Division of the ABNLP",
      description: "From the Coaching Division of the ABNLP, so you are a master coach, able to command a master-level investment and defend it.",
      imageBrand: { src: AccreditedBrand3, alt: "Coaching Division of the American Board of NLP seal" },
      imageCerficate: { src: Certificate3Level2, alt: "Sample ABNLP Coaching Division Certified NLP Master Coach certificate" },
    },
    {
      // LOGO: AL&CO - Khansa to supply approved artwork (accredited-6.webp is a placeholder until confirmed)
      title: "AL&CO Certified Practitioner of Behavioral Reengineering, at Master Level",
      description: "AL&CO's own credential at master level, awarded only to AL&CO graduates.",
      imageBrand: { src: AccreditedBrand6, alt: "Arslan Larik & Company (AL&CO) seal" },
    },
    {
      // LOGO: ANLP CPD - Khansa to supply approved artwork (cpd.webp is a placeholder until confirmed). A CPD accreditation, not a certifying board
      title: "Plus a Second UK ANLP CPD Certificate",
      description: "Your 140 hours logged as continuing professional development against the UK standard, from ANLP in the United Kingdom. ANLP confers no title; it evidences your hours and your standard.",
      imageBrand: { src: BadgeCPD, alt: "ANLP (UK) CPD accreditation badge" },
    },
  ],
};

const LevelBenefitsTableDataLevel2: LevelBenefitsTableType = {
  title: {
    line1: "Benefits of Choosing NLP",
    line2: "Master Practitioner Training",
  },

  button: {
    text: "Learn More",
    href: "/program-detail/how-nlp-master-practitioner-training-helps-you-in-your-life"
  },

  headers: [
    "Content",
    "Benefits for Personal Development",
    "Benefits for Coaches",
  ],

  points: [
    {
      content: "Prime Directives of the Unconscious Mind",
      values: [
        "Discover how your unconscious drives habits and emotions, helping you achieve personal breakthroughs.",
        "Leverage this understanding to create coaching strategies that lead to lasting results for clients.",
      ],
    },
    {
      content: "Quantum Linguistics",
      values: [
        "Change the way you think and speak to unlock new possibilities and overcome problems.",
        "Guide clients to use empowering language patterns to create positive change.",
      ],
    },
    {
      content: "Releasing Negative Emotions (TLT #1 & #2)",
      values: [
        "Let go of emotions like anger, sadness, and guilt that hold you back.",
        "Guide clients to release emotional burdens for lasting change.",
      ],
    },
    {
      content: "Emotional Chains",
      values: [
        "Break patterns of emotional reactions and create a calmer, more balanced mindset.",
        "Help clients identify triggers and replace them with empowering responses.",
      ],
    },
    {
      content: "Full Coaching Cycle with NLP & TLT",
      values: [
        "Achieve clarity on your goals and create actionable steps to reach them.",
        "Guide clients through a proven coaching process to help them achieve their goals.",
      ],
    },
    {
      content: "Client Agreements",
      values: [
        "Build trust and ensure clear communication in your relationships.",
        "Establish clear expectations and goals with clients to create productive sessions.",
      ],
    },
  ],
};

const LevelProgramIncludesDataLevel2: LevelProgramIncludesType = {
  title: {
    line1: "This Programme Includes",
    line2: ""
  },
  description: (
    <>
      <p className="my-4">
        The NLP Master Practitioner is Level 2 of AL&CO's six-level ladder, taught live and personally by Arslan Larik, Founder and Master Trainer, alongside Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK).
      </p>
      <p className="mb-4">
        At this level you work with values, advanced language patterns, Meta Programs, Modelling and advanced Time Line Therapy® Techniques, and you learn to build the business: how to position your work, design your packages, and run a practice that pays.
      </p>
    </>
  ),
  points: [
    {
      title: "13 Days, 140 Hours, Live on Zoom",
      description: (
        <p>Thirteen days and 140 hours, taught live on Zoom from 8pm to 2am PKT in cohorts of 20 to 25. You practise every tool on real people, guided and corrected in the room, at the conscious and unconscious level at once.</p>
      ),
      theme: "dark",
      image: { src: LevelProgram1, alt: "13 days, 140 hours, live on Zoom" },
    },
    {
      title: "Quad Certification plus CPD",
      description: (
        <>
          <p className="mb-2">Again a true quad: three international board certifications plus AL&CO's own credential, and in addition a second UK ANLP CPD accreditation (ANLP is a CPD accreditation, not a board):</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Certified Master Practitioner of NLP (ABNLP).</li>
            <li>Master Practitioner of Time Line Therapy® Techniques (TLTA).</li>
            <li>Certified NLP Master Coach (Coaching Division of the ABNLP).</li>
            <li>AL&CO Certified Practitioner of Behavioral Reengineering, at master level.</li>
            <li>Plus a second UK ANLP CPD certificate.</li>
          </ul>
        </>
      ),
      theme: "light",
      image: { src: LevelProgram2, alt: "Quad certification plus UK ANLP CPD" },
    },
    {
      title: "Your Second Training Manual",
      description: (
        <p>A second training manual of about 500 pages and a dedicated Time Line Therapy® companion, with worksheets and questionnaires to support every session. Your manuals are issued digitally and are yours to keep. We encourage the e-copy, which is kinder to the planet; a printed set is available at an additional charge.</p>
      ),
      theme: "yellow",
      image: { src: LevelProgram3, alt: "500-page Master Practitioner manual and Time Line Therapy companion" },
    },
    {
      title: "225 Audio Files",
      description: (
        <p>225 audio files, mapped to your manual and provided through the AL&CO online learning portal, so you can study at home and revise every technique in your own time.</p>
      ),
      theme: "yellow",
      image: { src: LevelProgram4, alt: "225 audio files on the AL&CO online learning portal" },
    },
    {
      title: "Free Revisits for Five Years",
      description: (
        <p>Come back and sit the Master Practitioner training again, free, for five years, in a different room each time. Change that is repeated is change that holds.</p>
      ),
      theme: "dark",
      image: { src: LevelProgram5, alt: "Free revisits for five years" },
    },
    {
      title: "A Dedicated Coach and a Global Network",
      description: (
        <>
          <p className="mb-2">Master Practitioner includes a dedicated coach for your personal breakthrough, and a place in a global community of 2,000+ AL&CO graduates across 20+ countries. You'll:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Practise advanced interventions with peers to refine your skills.</li>
            <li>Gain access to expert mentorship and guidance.</li>
            <li>Stay motivated through shared experiences and collaborative learning.</li>
          </ul>
        </>
      ),
      theme: "light",
      image: { src: LevelProgram6, alt: "Dedicated coach and global graduate network" },
    },
  ],
  textAlign: "text-start",
  // No prices, fees or payment plans anywhere (ruling 25 Sep 2026). US number is plain text, never a link.
  detailContent: (
    <div className="text-gray-600">
      <p className="mb-2"><strong>Who This Programme Is For</strong></p>
      <p className="mb-4">
        Graduates of Level 1 aiming for mastery and professional advancement. You leave able to take on the diverse cases and build authority. It is equally valuable if you only want to develop yourself: the deepest way to master this for your own life is to learn it to a professional standard.
      </p>
      <p className="mb-2"><strong>Prerequisite</strong></p>
      <p className="mb-4">Level 1, <a href="/program/nlp-practitioner" className="underline">NLP Practitioner</a>.</p>
      <p className="mb-2"><strong>How to Join</strong></p>
      <p className="mb-4">
        Levels 1 and 2 are arranged by your relationship manager, who will confirm exactly what is included at your level and in your confirmed package. Call or WhatsApp <a href="tel:+923360082222" className="underline">+92 336 008 2222</a> (<a href="https://wa.me/923360082222" className="underline">WhatsApp</a>), or write to <a href="mailto:connect@arslanlarik.com" className="underline">connect@arslanlarik.com</a>. US and Canada: +1 (206) 614 0234.
      </p>
      <p className="mb-2"><strong>Why You Will Not Find a Number Here</strong></p>
      <p className="mb-4">
        This is an investment in your future, and we treat it as one, so you will not see a figure in these pages. That is deliberate, and it is out of fairness to you. To print a single figure, we would have to quote you for every level at once, whether or not you need them all. We would rather understand what you actually want first, and then build a proposition around your own journey, only what serves you, and nothing that does not.
      </p>
    </div>
  ),
};

const LevelContentDataLevel2: LevelContentType = {
  title: {
    line1: "The Full Curriculum",
    line2: ""
  },

  button: {
    text: "See the Detailed Course Outline",
    href: "/course-outline/nlp-master-practitioner"
  },

  // All 25 brochure bullets, verbatim, each once; the grouping is ours.
  points: [
    {
      title: "Neuro-Linguistic Programming (NLP)",
      items: [
        "Definition and Themes of NLP (advanced)",
        "Interventions Guide to all challenges and problems",
        "Prime Directives of the Unconscious Mind, and Ecology",
        "RAS, the Reticular Activating System",
        "Quantum Linguistics: advanced presuppositions, Cartesian Coordinates, Meta Model III, modal operators, Time Scramble, the Limiting Decision Destroyer, Going Beyond Boundaries, Linguistic Re-Sourcing, De-Identification",
        "Values: Massey's developmental periods, sources of values, Clare Graves' 8 Values Levels, elicitation, alignment, conflict correction, changing values, corporate values alignment",
        "Basic Meta Programs (MBTI) and Complex Meta Programs (MPVI)",
        "Advanced NLP patterns and Modelling technology",
        "Advanced Submodality work and designer Swish patterns",
        "Reframing (advanced) and the 16 Sleight of Mouth patterns",
        "Logical Levels of Therapy and the Phobia Cure",
        "Strategies and Chaining Anchors",
        "PHQ, the detailed personal history questionnaire",
        "The 4-MAT System",
        "NLP and Quantum Physics, and Ultimate Influence",
      ],
      image: { src: LevetContent1.src, alt: "Advanced NLP modules" },
    },
    {
      title: "Time Line Therapy® Techniques",
      items: [
        "Advanced Time Line Therapy® techniques for major and minor emotions",
        "Emotional Chains 1 and 2, and the Drop-Down Through technique",
        "Handling association into traumatic memory, and Anxiety",
        "Changing the Time Line location and direction, and Creating Your Future",
        "Forensic and regression work with Time Line Therapy®",
        "Secondary gains, and the Pain Paradigm for pain management",
      ],
      image: { src: LevetContent2.src, alt: "Advanced Time Line Therapy Techniques modules" },
    },
    {
      title: "NLP Coaching and the Coaching Business",
      items: [
        "The full coaching cycle (NLP, TLT and Creating Your Future), client disclosure and agreements",
        "The 13 steps to breaking limiting beliefs",
        "Coaching Values Inventory and Logical Levels of Coaching",
        "How to get paid coaching clients and build a coaching business",
      ],
      image: { src: LevetContent3.src, alt: "NLP master coaching and business modules" },
    },
  ],
};

const LevelGraduatesExperienceDataLevel2: LevelGraduatesExperienceType = {
  title: {
    line1: "In Their Own Words",
    line2: "NLP Master Practitioner Graduates"
  },
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774599132/Level2_Review_psgcmr.mp4",
  thumbnail: ThumbnailReview2,
};

// "Where It Leads" (no trademark attribution line: the ® carries it, DECISIONS v2 P5)
const WhereItLeadsDataLevel2: ContentSectionType = {
  title: "Where It Leads",
  TagType: "h2",
  textAlign: "text-start",
  fullBg: "bg-white",
  padding: "py-6 md:py-8 lg:py-12 xl:py-16",
  description: (
    <div className="max-w-5xl">
      <p className="my-4">
        Master Practitioner makes you a master of the work. The next questions are whether you want the depth that hypnosis brings, and whether you want to teach, Levels 3 and 4.
      </p>
      <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>Previous level: <Link href="/program/nlp-practitioner" className="underline">Level 1, NLP Practitioner</Link></li>
        <li>Next level: <Link href="/program/advanced-hypnotherapy-interventionist" className="underline">Level 3, Advanced Hypnotherapy and Interventionist</Link></li>
        <li>Or teach: <Link href="/program/nlp-trainers-training-program" className="underline">Level 4, NLP Train the Trainer</Link></li>
        <li>See the whole ladder: <Link href="/programs" className="underline">All programmes</Link></li>
        <li>Ready to talk? <Link href="/contact#form" className="underline" data-cta-id="C5" data-gtm-event="cta_click">Book a conversation</Link></li>
      </ul>
    </div>
  ),
};

const FaqDataLevel2: LevelFaq[] = [
  {
    question: "I already have my toolkit from Level 1. Why another thirteen days?",
    answer: "Level 1 gives you the techniques of change; Level 2 gives you the architecture beneath them, how a person's values, patterns and deepest beliefs are organised, and how to model the strategies of people who excel. It is also where the livelihood is built: how to position your work, design your packages, and run a practice that pays. Practitioner changes you; Master Practitioner turns that into a profession.",
  },
  {
    question: "Will this really get me clients, or just give me a certificate?",
    answer: "A certificate does not generate a client; skill and clear positioning do, and both are built into the climb. You practise on many people before you ever meet a paying one, at Master Practitioner we teach the business itself, how to find, enrol and keep premium clients, and you join a global community that refers and mentors for years. We will be straight with you: it still takes your effort. But this is not a certificate for the wall. It is the thing you can earn from for the next twenty years.",
  },
  {
    question: "I only want to develop myself. I don't want to be a professional coach.",
    answer: "That is welcome, and you are far from alone. The deepest way to master this for your own life is to learn it to a professional standard. When you can read a room, calibrate what is not being said, and shift a pattern with precision, your command over your own decisions, relationships and leadership changes by an order of magnitude. Many who join us never intend to practise professionally at all; they come because it transforms how they parent, how they lead, and how they meet their own hard days.",
  },
  {
    question: "What certifications will I actually hold?",
    answer: "At Practitioner and Master Practitioner, a true quad of three international board certifications plus AL&CO's own credential: NLP from the ABNLP, NLP Coach from its Coaching Division, Time Line Therapy® Techniques from the TLTA, and AL&CO's own Behavioral Reengineering credential, plus a UK ANLP CPD accreditation, which is a CPD and not a board. At Level 3 you add ABH and NGH hypnosis credentials, with the exact hypnosis title matched to your qualifications and country.",
  },
  {
    question: "I work full time. Can I keep up?",
    answer: "The trainings run live in the evenings on Zoom. Your manual is yours to keep, and your audio files are on the AL&CO online learning portal, so you can revisit both at your own pace. Because you can re-attend free for five years, you are never one missed evening away from falling behind. It is built to fit a working life.",
  },
];

const NavDataLevel2: LevelNavType = {
  prev: { href: "/program/nlp-practitioner", label: "Level 1: NLP Practitioner" },
  next: { href: "/program/advanced-hypnotherapy-interventionist", label: "Level 3: Advanced Hypnotherapy and Interventionist" },
  more: [{ href: "/program/nlp-trainers-training-program", label: "Level 4: NLP Train the Trainer" }],
};

// Level 2 End


// Level 3 Start

const bannerDataLevel3: BannerType = {
  level: "level 3",
  title: {
    line1: "Advanced Hypnotherapy and Interventionist",
    line2: "Hypnotherapy Certification"
  },
  description: "ABH and NGH Hypnosis Certification",
  image: programLevel2.src,
  className: "bg-center bg-no-repeat bg-primary"
};

// DECISIONS v2 F1: Level 3 is 13 days, worded exactly as below. Level 3 has no audio files (P2).
const LevelIntroWithVideoDataLevel3: LevelIntroWithVideoType = {
  title: {
    line1: "Your Chance to Become ",
    line2: "a World-Class Interventionist."
  },
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774599141/Level3_Intro_w093ky.mp4",
  thumbnail: ThumbnailIntro3,
  description: `<p><strong>Quick facts:</strong> 13 days: 12 days of live teaching, plus one mandatory day in between for assignments set by AL&CO, held with breaks rather than back to back, live on Zoom, requires Level 2, entry by interview, never more than 20 participants, with a full professional library included.</p>
   <p><strong>What it is.</strong> The full hypnosis and hypnotherapy path, taught by a Master Trainer of Hypnosis. Hypnotherapy creates rapid change by working at the deepest level of the unconscious mind, reaching the root of a problem quickly. Here we build hypnotists, not scriptists, and the work changes you as much as it equips you, through learning self-hypnosis.</p>
   <p><strong>Firm boundaries.</strong> This is work for change, performance and habits, never the treatment of illness, and your exact hypnosis title is matched to the rules of your own country.</p>`
};

// Images verified: certificate-1/2-level-3 = ABH; certificate-3-level-3 = AL&CO Testament; certificate-4/5-level-3 = NGH.
// accredited-4 = ABH seal; accredited-5 = NGH seal; accredited-6 = AL&CO seal.
const LevelCertificationDataLevel3: LevelCertificationType = {
  title: {
    line1: "Certifications",
    line2: "ABH, NGH and the AL&CO Quintuple Certification"
  },
  points: [
    {
      // LOGO: ABH - Khansa to supply approved artwork (accredited-4.webp is a placeholder until confirmed)
      title: "Certified Practitioner of Hypnosis, American Board of Hypnotherapy (ABH)",
      description: "From AL&CO and the American Board of Hypnotherapy. Awarded by default to every Level 3 graduate.",
      imageBrand: { src: AccreditedBrand4, alt: "American Board of Hypnotherapy (ABH) seal" },
      imageCerficate: { src: Certificate1Level3, alt: "Sample ABH Certified Practitioner of Hypnosis certificate" },
    },
    {
      // LOGO: ABH - Khansa to supply approved artwork (accredited-4.webp is a placeholder until confirmed)
      title: "Certified Master Practitioner of Hypnosis, American Board of Hypnotherapy (ABH)",
      description: "From AL&CO and the American Board of Hypnotherapy. Awarded by default alongside the Practitioner of Hypnosis.",
      imageBrand: { src: AccreditedBrand4, alt: "American Board of Hypnotherapy (ABH) seal" },
      imageCerficate: { src: Certificate2Level3, alt: "Sample ABH Certified Master Practitioner of Hypnosis certificate" },
    },
    {
      // LOGO: NGH - Khansa to supply approved artwork (accredited-5.webp is a placeholder until confirmed)
      title: "NGH Hypnosis Certification, National Guild of Hypnotists (USA)",
      description: "Your NGH hypnosis certification, bearing the gold National Guild of Hypnotists seal. Whether you also hold the Hypnotherapist title, or the Hypnotist or Consulting Hypnotist designation, depends on your own qualifications and the rules of your country, which our trainers assess with each student, so the credential is always accurate to where you practise.",
      imageBrand: { src: AccreditedBrand5, alt: "National Guild of Hypnotists (NGH) seal" },
      imageCerficate: { src: Certificate4Level3, alt: "Sample NGH hypnosis certification" },
    },
    {
      // LOGO: NGH - Khansa to supply approved artwork (accredited-5.webp is a placeholder until confirmed)
      title: "NGH Member in Good Standing",
      description: "One year of National Guild of Hypnotists membership, with your NGH Member in Good Standing certificate and embossed membership card.",
      imageBrand: { src: AccreditedBrand5, alt: "National Guild of Hypnotists (NGH) seal" },
      imageCerficate: { src: Certificate5Level3, alt: "Sample NGH Member in Good Standing certificate" },
    },
    {
      // LOGO: AL&CO - Khansa to supply approved artwork (accredited-6.webp is a placeholder until confirmed)
      title: "AL&CO Testament to the Graduate: Quintuple Certification",
      description: "Recognising the full multi-disciplinary mastery you now hold across NLP, coaching, Time Line Therapy® Techniques and hypnosis. Because Levels 1 and 2 are prerequisites, you arrive already certified in those, so you finish holding a set of credentials few practitioners anywhere can match.",
      imageBrand: { src: AccreditedBrand6, alt: "Arslan Larik & Company (AL&CO) seal" },
      imageCerficate: { src: Certificate3Level3, alt: "Sample AL&CO Testament to the Graduate, Quintuple Certification" },
    },
  ],
};

const LevelBenefitsTableDataLevel3: LevelBenefitsTableType = {
  title: {
    line1: "Benefits of",
    line2: "Advanced Hypnotherapy & Interventionist Training",
  },

  button: {
    text: "Learn More",
    href: "/program-detail/benefits-of-advanced-hypnotherapy-interventionist-training"
  },

  headers: [
    "Content",
    "Benefits for Personal Development",
    "Benefits for Coaches",
  ],

  points: [
    {
      content: "History of Hypnosis",
      values: [
        "Discover how hypnosis evolved from ancient practice to the modern discipline you will practise, deepening self-awareness and unconscious mastery.",
        "Learn foundational principles that enhance your credibility and ability to explain hypnosis effectively to clients.",
      ],
    },
    {
      content: "Working with Abreaction and Secondary Gains",
      values: [
        "Release suppressed emotions and overcome self-sabotaging behaviors, at the root.",
        "Guide clients through emotional catharsis safely, addressing unconscious blocks for lasting change.",
      ],
    },
    {
      content: "Mastering Conversational Hypnosis",
      values: [
        "Enhance your ability to influence and communicate persuasively in everyday interactions, fostering deeper connections.",
        "Seamlessly induce trance states through conversation, bypassing conscious resistance and facilitating unconscious transformation.",
      ],
    },
    {
      content: "Fundamentals of Ericksonian Hypnosis",
      values: [
        "Develop mental flexibility, enhance problem-solving skills, and use metaphors for self-reprogramming.",
        "Master indirect suggestions and storytelling to create effortless, resistance-free hypnosis sessions.",
      ],
    },
    {
      content: "Hypnotic Patterns",
      values: [
        "Rewire thought processes for greater confidence, motivation, and personal growth.",
        "Apply structured language patterns to deepen trance, enhance suggestibility, and accelerate client breakthroughs.",
      ],
    },
  ],
};

const ContentSectionDataLevel3: ContentSectionType = {
  title: "Taught by a Master Trainer of Hypnosis",
  TagType: "h2",
  description: (
    <div className="max-w-7xl mx-auto">
      <p className="my-4">
        Level 3 is taught by <strong>Arslan Larik, Founder and Master Trainer of AL&CO</strong>, Pakistan's first Certified Master Trainer of NLP (ABNLP) and of Hypnosis (ABH). He is an ANLP Accredited Master Trainer (UK), a Master Trainer under Robert Dilts at NLP University, and the ANLP International Ambassador for Pakistan.
      </p>
      <p className="mt-4">
        He has trained and coached since 2010, with a lineage through The Tad James Company, and is the architect of the AL&CO curriculum. Level 3 and above are arranged directly with <strong>Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK)</strong>, and <strong>Arslan Larik</strong>.
      </p>
    </div>
  ),
  fullBg: "bg-slate-100 ",
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
}

const LevelProgramIncludesDataLevel3: LevelProgramIncludesType = {
  title: {
    line1: "This Programme Includes",
    line2: ""
  },
  description: (
    <>
      <p className="my-4">
        Advanced Hypnotherapy and Interventionist is Level 3 of AL&CO's six-level ladder: a highly specialised programme with a deliberately limited intake, certified through the American Board of Hypnotherapy (ABH) and the National Guild of Hypnotists (NGH, USA).
      </p>
      <p className="mb-4">
        Level 3 arrives as a genuine professional library, not a folder of notes, so you can open and fill a practice, not only pass a course.
      </p>
    </>
  ),
  // No audio card: Level 3 has no audio files (DECISIONS v2 P2). Book and manual titles kept, author names removed (P6).
  points: [
    {
      title: "13 Days, Live on Zoom",
      description: (
        <>
          <p className="mb-2">
            13 days: 12 days of live teaching, plus one mandatory day in between for assignments set by AL&CO. The days are held with breaks rather than back to back, live on Zoom. The intake is never more than twenty participants, so the days are scheduled by mutual arrangement once the cohort has been interviewed and confirmed, and every participant completes all thirteen.
          </p>
          <p>
            <strong className="me-1">Led by Arslan Larik,</strong>
            Master Trainer of Hypnosis (ABH).
          </p>
        </>
      ),
      theme: "dark",
      image: { src: LevelProgram1, alt: "13 days, live on Zoom" },
    },
    {
      title: "Your Manuals and Reference Library",
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>The ABH Practitioner of Hypnosis manual and the ABH Master Practitioner of Hypnosis manual.</li>
          <li>The National Guild of Hypnotists Certification Books 1 and 2, from suggestibility testing and classical inductions through to advanced clinical protocols, age regression, pain control and emergency hypnosis.</li>
          <li>A published reference library: Hypnotic Recollections, HYPNOmotivation, 7th Path Self-Hypnosis and The Secret Language of Feelings.</li>
        </ul>
      ),
      theme: "light",
      image: { src: LevelProgram2, alt: "ABH and NGH manuals and reference library" },
    },
    {
      title: "A Practice-Building and Marketing Pack",
      description: (
        <p>The Master Marketing Manual and From Scratch and On A Shoestring, plus a suite of ready-to-use, customisable advertising copy, session brochures and direct-mail templates, so you can open and fill a practice, not only pass a course.</p>
      ),
      theme: "yellow",
      image: { src: LevelProgram3, alt: "Practice-building and marketing pack" },
    },
    {
      title: "A Professional Tool Kit",
      description: (
        <p>Your own Chevreul's Pendulum for ideomotor and suggestibility work, and the National Guild's standardised clinical script packet.</p>
      ),
      theme: "yellow",
      image: { src: LevelProgram4, alt: "Chevreul's Pendulum and clinical script packet" },
    },
    {
      title: "One Year of NGH Membership",
      description: (
        <p>One year of National Guild of Hypnotists membership: your embossed NGH membership card, the members' portal, subscriptions to The Journal of Hypnotism and The Hypno-Gram, and continuing-education eligibility.</p>
      ),
      theme: "light",
      image: { src: LevelProgram5, alt: "One year of National Guild of Hypnotists membership" },
    },
    {
      title: "Free Revisits for Five Years",
      description: (
        <p>Like Levels 1 and 2, Level 3 comes with a free five-year revisit: come back to a different room each time, and keep refining your skill. Change that is repeated is change that holds.</p>
      ),
      theme: "dark",
      image: { src: LevelProgram6, alt: "Free revisits for five years" },
    },
  ],
  textAlign: "text-start",
  // No prices, fees or payment plans anywhere (ruling 25 Sep 2026). US number is plain text, never a link.
  detailContent: (
    <div className="text-gray-600">
      <p className="mb-2"><strong>Who This Programme Is For</strong></p>
      <p className="mb-4">
        Those who wish to pursue coaching as a full-time career. You leave able to work at the deepest unconscious level, with advanced modalities and tools for personal change. You are never pushed into clinical territory: we teach firm boundaries, and this is work for change, performance and habits, never the treatment of illness.
      </p>
      <p className="mb-2"><strong>Prerequisite</strong></p>
      <p className="mb-4">
        Level 2, <a href="/program/nlp-master-practitioner" className="underline">NLP Master Practitioner</a>, and an interview. The interview and the small cohort are matters of safety and quality, not scarcity: deep hypnotic work needs a trainer's eye on every participant.
      </p>
      <p className="mb-2"><strong>How to Join</strong></p>
      <p className="mb-4">
        Level 3 is arranged directly with Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK), and Arslan Larik. To request an interview, call or WhatsApp <a href="tel:+923360082222" className="underline">+92 336 008 2222</a> (<a href="https://wa.me/923360082222" className="underline">WhatsApp</a>), or write to <a href="mailto:connect@arslanlarik.com" className="underline">connect@arslanlarik.com</a>. US and Canada: +1 (206) 614 0234.
      </p>
      <p className="mb-2"><strong>Why You Will Not Find a Number Here</strong></p>
      <p className="mb-4">
        This is an investment in your future, and we treat it as one, so you will not see a figure in these pages. That is deliberate, and it is out of fairness to you. To print a single figure, we would have to quote you for every level at once, whether or not you need them all. We would rather understand what you actually want first, and then build a proposition around your own journey, only what serves you, and nothing that does not.
      </p>
    </div>
  ),
};

const LevelContentDataLevel3: LevelContentType = {
  title: {
    line1: "The Full Curriculum",
    line2: ""
  },

  button: {
    text: "See the Detailed Course Outline",
    href: "/course-outline/advanced-hypnotherapy-interventionist"
  },

  // All 23 brochure bullets, verbatim, each once; grouping and card titles are ours.
  points: [
    {
      title: "Foundations and Hypnotic Language",
      items: [
        "History of Hypnosis",
        "Working with abreaction and secondary gains",
        "Mastering conversational hypnosis",
        "Fundamentals of Ericksonian hypnosis",
        "Hypnotic patterns: direct and indirect suggestion, embedded commands, truisms, binds and double binds, multi-level communication",
        "Pre-induction and preparation for trance, and the hypnotic contract",
        "Stages of hypnosis, and suggestibility tests",
      ],
      image: { src: LevetContent1.src, alt: "Hypnosis foundations modules" },
    },
    {
      title: "Inductions, Deepening and Suggestion",
      items: [
        "Ericksonian inductions (1 and 2)",
        "The general pendulum paradigm",
        "Deepening techniques (direct and indirect)",
        "Multiple embedded metaphors, and contraindications",
        "Post-hypnotic and direct suggestions",
        "The direct-authoritarian approach (Estabrooks)",
        "Progressive test induction",
        "Elman inductions I and II, and the Elman pre-talk",
        "Convincers, basic to advanced, and the Krasner Method",
      ],
      image: { src: LevetContent2.src, alt: "Induction and deepening modules" },
    },
    {
      title: "Application, Self-Hypnosis and Breakthrough",
      items: [
        "Pain control: analgesia and anaesthesia",
        "Therapeutic scripts: habits, weight, smoking cessation, protective scripts, group induction",
        "Self-hypnosis using 7th Path, the 9 Recognitions (DELTA)",
        "Past-life and future regression, inner-child work, time-tunnelling",
        "Forgiveness of self and others",
        "Ernest Rossi's technique, and free-style hypnosis",
        "Achieving breakthrough with hypnosis, integrated with every intervention",
      ],
      image: { src: LevetContent3.src, alt: "Applied hypnosis and self-hypnosis modules" },
    },
  ],
};

const LevelGraduatesExperienceDataLevel3: LevelGraduatesExperienceType = {
  title: {
    line1: "In Their Own Words",
    line2: "Advanced Hypnotherapy Graduates"
  },
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774599132/Level3_Review_jzdltq.mp4",
  thumbnail: ThumbnailReview3,
};

// "Where It Leads" (no trademark attribution line: the ® carries it, DECISIONS v2 P5)
const WhereItLeadsDataLevel3: ContentSectionType = {
  title: "Where It Leads",
  TagType: "h2",
  textAlign: "text-start",
  fullBg: "bg-white",
  padding: "py-6 md:py-8 lg:py-12 xl:py-16",
  description: (
    <div className="max-w-5xl">
      <p className="my-4">
        With the full spectrum in hand, the ladder opens two ways: teach NLP through Train the Trainer, or teach hypnosis through the Hypnosis Trainer's Training.
      </p>
      <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>Previous level: <Link href="/program/nlp-master-practitioner" className="underline">Level 2, NLP Master Practitioner</Link></li>
        <li>Teach NLP: <Link href="/program/nlp-trainers-training-program" className="underline">Level 4, NLP Train the Trainer</Link></li>
        <li>Teach hypnosis: <Link href="/program/hypnosis-trainers-training-program" className="underline">Level 5, Hypnosis Train the Trainer</Link></li>
        <li>See the whole ladder: <Link href="/programs" className="underline">All programmes</Link></li>
        <li>Request an interview: <a href={whatsappHref(waLine("Level 3, Advanced Hypnotherapy and Interventionist"))} target="_blank" rel="noopener noreferrer" className="underline" data-cta-id="C1" data-gtm-event="whatsapp_click">Speak to a relationship manager</a></li>
      </ul>
    </div>
  ),
};

const FaqDataLevel3: LevelFaq[] = [
  {
    question: "Why the interview and the small cohort? And without a psychology degree, am I taking on too much?",
    answer: "The interview and a cohort of never more than twenty are matters of safety and quality, not scarcity; deep hypnotic work needs a trainer's eye on every participant. And you are never pushed into clinical territory: we teach firm boundaries, this is work for change, performance and habits, never the treatment of illness, and your exact hypnosis title is matched to the rules of your own country.",
  },
  {
    question: "Which hypnosis title will I hold?",
    answer: "By default the ABH awards Practitioner of Hypnosis and Master Practitioner of Hypnosis. Whether a graduate also holds the Hypnotherapist title, or the Hypnotist or Consulting Hypnotist designation, depends on their own qualifications and the rules of their country, which our trainers assess with each student, so the credential is always accurate to where you practise.",
  },
  {
    question: "How are the thirteen days scheduled?",
    answer: "Level 3 runs over 13 days: 12 days of live teaching, plus one mandatory day in between for assignments set by AL&CO. This is a highly specialised programme with a deliberately limited intake, never more than twenty participants, so the days are scheduled by mutual arrangement once the cohort has been interviewed and confirmed. The days are spread out with breaks rather than run back to back, and every participant completes all thirteen.",
  },
  {
    question: "Is this mind control?",
    answer: "No, and this matters, so let us be clear. All hypnosis is, in the end, self-hypnosis. Nobody can be made to act against their own values or beliefs, and we would never try. Far from surrendering your will, this work returns your awareness to you: it shows you the quiet suggestions you already meet every day, from media, from advertising, from the people around you, and hands you back the choice. It rests entirely on your conscious consent, and on the codes of ethics of the boards behind it.",
  },
];

const NavDataLevel3: LevelNavType = {
  prev: { href: "/program/nlp-master-practitioner", label: "Level 2: NLP Master Practitioner" },
  next: { href: "/program/nlp-trainers-training-program", label: "Level 4: NLP Train the Trainer" },
  more: [{ href: "/program/hypnosis-trainers-training-program", label: "Level 5: Hypnosis Train the Trainer" }],
};

// Level 3 End


// Level 4 Start

const bannerDataLevel4: BannerType = {
  level: "Level 4",
  title: {
    line1: "NLP Train the Trainer",
    line2: "NLP Trainer training: turn a master into a maker of masters",
  },
  image: programLevel2.src,
  className: "bg-center bg-no-repeat bg-primary",
  children: (
    <p className="custom-text1 text-white mt-4 max-w-2xl">
      Quick facts: 18 days (14 training and 4 evaluation), 120 hours, ABNLP accredited, fully live on Zoom, requires Level 2.
    </p>
  ),
};

const LevelIntroWithVideoDataLevel4: LevelIntroWithVideoType = {
  title: { line1: "What it is: ", line2: "from doing the work to teaching it" },
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774603562/Level4_Intro_otvc3u.mp4",
  thumbnail: ThumbnailIntro4,
  description: `<p><strong>What it is.</strong> The rung where you step from doing the work to teaching it. You are not certified until you have proven it, live, in front of evaluators.</p>
<p><strong>Entry is by interview.</strong> Every applicant meets Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK), in person before a place is offered. The Trainer’s Training is selective by design, and the interview is where fit is decided.</p>
<p><strong>Who trains you.</strong> This programme is delivered by a faculty of master trainers, supported by senior candidates from our Master Trainer programme. The trainer leading any given day is chosen for the subject that day demands, so you learn from more than one master rather than from one person alone.</p>`,
};

const LevelCertificationDataLevel4: LevelCertificationType = {
  title: { line1: "Your certification", line2: "Certified Trainer of NLP (ABNLP)" },
  points: [
    {
      title: `Certified Trainer of NLP via the American Board of Neuro-Linguistic Programming (ABNLP)`,
      description: "You may teach, evaluate and graduate Practitioners and Master Practitioners, register your business as an Approved NLP Training Institute, and issue ABNLP-sealed certificates.",
      // LOGO: ABNLP - Khansa to supply approved artwork (accredited-1.webp is a placeholder until confirmed; DECISIONS v2 P7)
      imageBrand: { src: AccreditedBrand1, alt: "ABNLP, American Board of Neuro-Linguistic Programming seal" },
      imageCerficate: { src: Certificate1Level4, alt: "Certified Trainer of NLP certificate issued through the ABNLP" },
    },
  ],
};

const ContentSectionDataLevel4: ContentSectionType = {
  title: "Your next step: board membership",
  TagType: "h2",
  description: (
    <NextStepCards
      intro={<>Certification is the first half of the journey. To train and certify under the ABNLP, you must then enrol as a member of the board, both as an organisation, registering your Approved NLP Training Institute in your organisation’s name, and as an individual first-time trainer member. Membership is compulsory: you cannot train until it is in place, and it begins only once we have certified you. It is a straightforward process, and guiding you through the application is part of our job. This is what makes “Approved NLP Training Institute” real and recognised.</>}
      cards={[
        { title: "A note on revisiting", body: <>The free five-year revisit that comes with Levels 1 to 3 does not apply to the Trainer’s Training. The only way to sit through this level again is to be enrolled in the Master Trainer programme and attend as a coaching assistant. For a trainer who wants to keep returning to the room and deepening the craft, that is one more reason to take the final step to Master Trainer.</> },
        { title: "Where it leads", body: <>Trainer produces practitioners; the final rung, <Link href="/program/nlp-master-trainer-program" className="underline">Master Trainer</Link>, produces trainers.</> },
      ]}
    />
  ),
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
  textAlign: "text-start",
  fullBg: "bg-slate-100 ",
};

const LevelProgramIncludesDataLevel4: LevelProgramIncludesType = {
  title: { line1: "Before you apply: what to expect", line2: "" },
  points: [
    {
      title: "What this level is, and what it is not",
      description: (<p>This is the one rung that is not about learning more content. Levels 1 to 3 fill your toolkit; here you prove you can teach it. You will not pick up a new coaching or therapeutic technique. Instead you gain everything a trainer needs: how to design and run a training, how to hold and simulate a room, how to work with the most difficult audience, and how to build and register your own training business. New tools appear only where they sharpen you as a trainer, and you leave a world-class one.</p>),
      theme: "dark",
      image: { src: LevelProgram1, alt: "Trainer reading the room" },
    },
    {
      title: "The mindset we look for",
      description: (<p>Because this is an evaluation, you are expected to arrive already able to demonstrate it. We look for someone operating at cause, holding the highest integrity, adhering to the ABNLP Code of Ethics, and living the NLP presuppositions rather than reciting them. This is assessed in the interview and, more importantly, throughout the training itself.</p>),
      theme: "light",
      image: { src: LevelProgram2, alt: "Trainer holding the ABNLP Code of Ethics" },
    },
    {
      title: "What your time will go into",
      description: (<p>Expect to work, and to work hard. Most of your hours are spent reading, completing and submitting homework, preparing for the written exam, and running demo simulations again and again, until you can hold a room and stay composed through the difficult moments every trainer eventually meets. This is why the final days are called evaluation, not tuition.</p>),
      theme: "yellow",
      image: { src: LevelProgram3, alt: "Candidate preparing homework and demo simulations" },
    },
    {
      title: "Why we say all this",
      description: (<p>People often arrive expecting to learn more, as they did at Practitioner, Master Practitioner and Advanced Hypnotherapy. Here the intention is different. Trainer’s Training is your doorway to the credentials that let you open a training business, and it is earned by demonstrating mastery you already hold. The same is true of the Hypnosis Trainer’s Training at Level 5.</p>),
      theme: "dark",
      image: { src: LevelProgram4, alt: "Trainer on the platform" },
    },
  ],
};

const LevelBenefitsTableDataLevel4: LevelBenefitsTableType = {
  title: { line1: "Level 4", line2: "at a glance" },
  headers: ["Detail", "NLP Train the Trainer"],
  points: [
    { content: "Duration", values: ["18 days, 14 training and 4 evaluation, 120 hours"] },
    { content: "Delivery", values: ["Fully live on Zoom"] },
    { content: "Prerequisite", values: ["Level 2, NLP Master Practitioner"] },
    { content: "Entry", values: ["By interview with Bismillah Pervez"] },
    { content: "How you are assessed", values: ["A closed-book written exam over the whole Practitioner and Master Practitioner syllabus, two thirty-minute platform presentations, and a live Demo Day on a real subject"] },
    { content: "Certification", values: ["Certified Trainer of NLP (ABNLP)"] },
    { content: "Revisit", values: ["The free five-year revisit for Levels 1 to 3 does not apply to this level"] },
    { content: "Arranged with", values: ["Bismillah Pervez and Arslan Larik"] },
  ],
};

const CurriculumDataLevel4: ContentSectionType = {
  title: "The full curriculum",
  TagType: "h2",
  textAlign: "text-start",
  description: (
    <ul className="list-disc pl-5 space-y-2 text-gray-700">
      <li>Platform mastery and the Trainer’s State (Uptime)</li>
      <li>Calibrating a whole room, and leading the unconscious room leaders</li>
      <li>Stage anchoring: spaces for content, metaphor, debrief and humour</li>
      <li>The 4-MAT design system: Why, What, How, What-if</li>
      <li>Designing exercises with overt and covert learning</li>
      <li>Platform Milton Model and hypnotic cadence</li>
      <li>Nested loops and multiple embedded metaphors</li>
      <li>Live unscripted demonstration, and modelling the self</li>
      <li>Group intervention and practicum supervision</li>
      <li>Behavioural, sensory-grounded feedback</li>
      <li>Building a board-compliant training business</li>
      <li>Enrolment standards and the ABNLP Code of Ethics</li>
    </ul>
  ),
  fullBg: "bg-slate-100 ",
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 px-4 ",
};

const LevelContentDataLevel4: LevelContentType = {
  title: { line1: "How you are assessed", line2: "" },
  points: [
    { title: "A closed-book written exam", items: ["Over the whole Practitioner and Master Practitioner syllabus."], image: { src: LevetContent1.src, alt: "" } },
    { title: "Two platform presentations", items: ["Two thirty-minute platform presentations."], image: { src: LevetContent2.src, alt: "" } },
    { title: "A live Demo Day", items: ["A live demonstration on a real subject."], image: { src: LevetContent3.src, alt: "" } },
  ],
};

const LevelGraduatesExperienceDataLevel4: LevelGraduatesExperienceType = {
  title: { line1: "Watch:", line2: "NLP Train the Trainer at AL&CO" },
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774603567/Level4_Review_jh6n5s.mp4",
  thumbnail: ThumbnailReview4,
};

const FaqDataLevel4: LevelFaq[] = [
  { question: "Eighteen days just to be evaluated, with no brand-new content? And what if I fail?", answer: "This is not a lecture series; it is where a capable practitioner becomes a stage-ready trainer. Understanding NLP from a chair and holding a room, reading it, anchoring it, meeting the hard question, are different skills, and those are what these days build and test. You are not investing in an exam; you are investing in the daily conditioning that makes you a trainer. And because you arrive already holding the mastery, passing is a matter of demonstrating what you know, not gambling on it." },
  { question: "Who can apply for NLP Train the Trainer?", answer: "You need Level 2, NLP Master Practitioner. Entry is by interview. Every applicant meets Bismillah Pervez in person before a place is offered. The Trainer’s Training is selective by design, and the interview is where fit is decided." },
  { question: "Can I re-attend the Trainer’s Training later?", answer: "The free five-year revisit that comes with Levels 1 to 3 does not apply to the Trainer’s Training. The only way to sit through this level again is to be enrolled in the Master Trainer programme and attend as a coaching assistant." },
  { question: "What happens after I am certified?", answer: "To train and certify under the ABNLP, you must then enrol as a member of the board, both as an organisation, registering your Approved NLP Training Institute in your organisation’s name, and as an individual first-time trainer member. Membership is compulsory: you cannot train until it is in place, and it begins only once we have certified you. Guiding you through the application is part of our job." },
  { question: "Why is there no price on this page?", answer: "This is an investment in your future, and we treat it as one, so you will not see a figure in these pages. That is deliberate, and it is out of fairness to you. We would rather understand what you actually want first, and then build a proposition around your own journey, only what serves you, and nothing that does not. All it takes to find out where you stand is a conversation: please contact us for details, and your relationship manager will take you through it." },
];

const NavDataLevel4: LevelNavType = {
  prev: { href: "/program/advanced-hypnotherapy-interventionist", label: "Level 3: Advanced Hypnotherapy and Interventionist" },
  prerequisite: { href: "/program/nlp-master-practitioner", label: "Prerequisite: Level 2, NLP Master Practitioner" },
  next: { href: "/program/hypnosis-trainers-training-program", label: "Level 5: Hypnosis Train the Trainer" },
};

// Level 4 End

// Level 5 Start

const bannerDataLevel5: BannerType = {
  level: "Level 5",
  title: {
    line1: "Hypnosis Train the Trainer",
    line2: "Hypnosis trainer certification: become a maker of hypnotists",
  },
  image: programLevel2.src,
  className: "bg-center bg-no-repeat bg-primary",
  children: (
    <p className="custom-text1 text-white mt-4 max-w-2xl">
      Quick facts: 8 days, ABH accredited, live on Zoom, requires Level 3.
    </p>
  ),
};

const LevelIntroWithVideoDataLevel5: LevelIntroWithVideoType = {
  title: { line1: "What it is: ", line2: "the trainer path for hypnosis" },
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774603567/Level5_intro_jy8cqr.mp4",
  thumbnail: ThumbnailIntro5,
  description: `<p><strong>What it is.</strong> The trainer path for hypnosis. You learn not only to practise hypnosis at depth but to teach it, and to certify the next generation under an internationally recognised board.</p>
<p><strong>Entry is by interview.</strong> Every applicant meets Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK), in person before a place is offered. Like the NLP Trainer’s Training, this is selective by design, and the interview is where fit is decided.</p>
<p><strong>Who trains you.</strong> This programme is delivered by a faculty of master trainers, supported by senior candidates from our Master Trainer programme. The trainer leading any given day is chosen for the subject that day demands, so you learn from more than one master rather than from one person alone.</p>`,
};

const LevelCertificationDataLevel5: LevelCertificationType = {
  title: { line1: "Your certification", line2: "Certified Hypnosis Trainer (ABH)" },
  points: [
    {
      title: `Certified Hypnosis Trainer via the American Board of Hypnotherapy (ABH)`,
      description: "You may train, examine and certify Hypnotists, register your organisation as an Approved School of Hypnosis, and issue ABH diplomas.",
      // LOGO: ABH - Khansa to supply approved artwork (accredited-4.webp is a placeholder until confirmed; DECISIONS v2 P7)
      imageBrand: { src: AccreditedBrand4, alt: "ABH, American Board of Hypnotherapy seal" },
      imageCerficate: { src: Certificate1Level5, alt: "Certified Hypnosis Trainer certificate issued through the ABH" },
    },
  ],
};

const ContentSectionDataLevel5: ContentSectionType = {
  title: "Your next step: board membership",
  TagType: "h2",
  description: (
    <NextStepCards
      intro={<>Certification is the first half of the journey. To train and certify under the ABH, you must then enrol as a member of the board, both as an organisation, registering your Approved School of Hypnosis, and as an individual first-time trainer member. Membership is compulsory: you cannot train until it is in place, and it begins only once we have certified you. It is a straightforward process, and guiding you through the application is part of our job. This is what makes “Approved School of Hypnosis” real and recognised.</>}
      cards={[
        { title: "A note on revisiting", body: <>The free five-year revisit that comes with Levels 1 to 3 does not apply to the Hypnosis Trainer’s Training. The only way to sit through this level again is to be enrolled in the Master Trainer programme and attend as a coaching assistant. For a trainer who wants to keep returning to the room and deepening the craft, that is one more reason to take the final step to <Link href="/program/nlp-master-trainer-program" className="underline">Master Trainer</Link>.</> },
        { title: "Where it leads", body: <>With both trainer paths in hand, NLP and hypnosis, you are running an institution of your own.</> },
      ]}
    />
  ),
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
  textAlign: "text-start",
  fullBg: "bg-slate-100 ",
};

const LevelProgramIncludesDataLevel5: LevelProgramIncludesType = {
  title: { line1: "Before you apply: what to expect", line2: "" },
  points: [
    {
      title: "What this level is, and what it is not",
      description: (<p>Like the NLP Trainer’s Training, this rung is not about learning more hypnosis technique for yourself. You proved that at Level 3. Here you prove you can teach it and certify others. You gain everything a hypnosis trainer needs: how to teach the full spectrum of inductions, how to hold and run a training room, how to keep a room safe, and how to build and register your own Approved School of Hypnosis.</p>),
      theme: "dark",
      image: { src: LevelProgram1, alt: "Hypnosis trainer teaching an induction" },
    },
    {
      title: "The mindset we look for",
      description: (<p>Because this is an evaluation, you are expected to arrive already able to demonstrate it. We look for someone operating at cause, holding the highest integrity, and adhering to the ABH Code of Ethics and its scope-of-practice and referral standards. This is assessed in the interview and, more importantly, throughout the training itself.</p>),
      theme: "light",
      image: { src: LevelProgram2, alt: "Trainer holding the ABH Code of Ethics" },
    },
    {
      title: "What your time will go into",
      description: (<p>Expect to work, and to work hard. Most of your hours are spent reading, completing and submitting homework, preparing for the examination, and running demo simulations again and again, until you can hold a room and stay composed through the difficult moments every trainer eventually meets. This is an evaluation, not tuition.</p>),
      theme: "yellow",
      image: { src: LevelProgram3, alt: "Candidate running a demo simulation" },
    },
    {
      title: "A requirement unique to this level",
      description: (<p>Unlike the NLP Trainer’s Training, this programme asks you to return to the source. You will study the classical literature of hypnosis, from Mesmer and Braid to Elman, Erickson and Krasner, and deliver a talk, as a master hypnotist, on the true and authentic history of the field. Carrying that lineage faithfully is part of what it means to teach hypnosis here.</p>),
      theme: "dark",
      image: { src: LevelProgram4, alt: "Classical literature of hypnosis" },
    },
  ],
};

const LevelBenefitsTableDataLevel5: LevelBenefitsTableType = {
  title: { line1: "Level 5", line2: "at a glance" },
  headers: ["Detail", "Hypnosis Train the Trainer"],
  points: [
    { content: "Duration", values: ["8 days"] },
    { content: "Delivery", values: ["Live on Zoom"] },
    { content: "Prerequisite", values: ["Level 3, Advanced Hypnotherapy and Interventionist"] },
    { content: "Entry", values: ["By interview with Bismillah Pervez"] },
    { content: "Certification", values: ["Certified Hypnosis Trainer (ABH)"] },
    { content: "Unique requirement", values: ["A talk, as a master hypnotist, on the true and authentic history of hypnosis"] },
    { content: "Revisit", values: ["The free five-year revisit for Levels 1 to 3 does not apply to this level"] },
    { content: "Arranged with", values: ["Bismillah Pervez and Arslan Larik"] },
  ],
};

const CurriculumDataLevel5: ContentSectionType = {
  title: "The full curriculum",
  TagType: "h2",
  textAlign: "text-start",
  description: (
    <ul className="list-disc pl-5 space-y-2 text-gray-700">
      <li>The lineage and pedagogy of hypnosis: Mesmer, Braid, Elman, Erickson, Krasner</li>
      <li>Teaching the full spectrum, from direct-authoritarian to indirect-permissive</li>
      <li>Teaching progressive, rapid and instant inductions</li>
      <li>Suggestibility tests and pattern interrupts</li>
      <li>Deep-trance phenomena: catalepsy, analgesia, regression</li>
      <li>Safety: abreaction management and dehypnotization</li>
      <li>Hypnotic voice and platform installation</li>
      <li>The five turn-key trainings you can then deliver: an introductory demonstration, a self-hypnosis seminar, an Ericksonian weekend, a direct-authoritarian weekend, and a full hypnosis certification</li>
      <li>Ethics, scope of practice and referral protocols</li>
    </ul>
  ),
  fullBg: "bg-slate-100 ",
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
};

const LevelContentDataLevel5: LevelContentType = {
  title: { line1: "Five turn-key trainings you can then deliver", line2: "" },
  points: [
    { title: "An introductory demonstration", items: [], image: { src: LevetContent1.src, alt: "" } },
    { title: "A self-hypnosis seminar", items: [], image: { src: LevetContent2.src, alt: "" } },
    { title: "An Ericksonian weekend", items: [], image: { src: LevetContent3.src, alt: "" } },
    { title: "A direct-authoritarian weekend", items: [], image: { src: LevetContent1.src, alt: "" } },
    { title: "A full hypnosis certification", items: [], image: { src: LevetContent2.src, alt: "" } },
  ],
};

const LevelGraduatesExperienceDataLevel5: LevelGraduatesExperienceType = {
  title: { line1: "Watch:", line2: "Hypnosis Train the Trainer at AL&CO" },
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774603571/Level5_Review_q1l8ff.mp4",
  thumbnail: ThumbnailReview5,
};

const FaqDataLevel5: LevelFaq[] = [
  { question: "I am already an NLP Trainer. Can I not just teach hypnosis inside my NLP courses?", answer: "NLP carries hypnotic language, but formal hypnosis is its own craft, with its own inductions and depth, and the ABH does not permit an NLP Trainer to certify hypnotists without this dedicated qualification. Beyond the rule, there is a real market: people increasingly seek focused hypnotic work for performance, calm and habits. An approved school of hypnosis opens an independent stream of your own, separate from your NLP training." },
  { question: "Who can apply for Hypnosis Train the Trainer?", answer: "You need Level 3, Advanced Hypnotherapy and Interventionist. Entry is by interview. Every applicant meets Bismillah Pervez in person before a place is offered. Like the NLP Trainer’s Training, this is selective by design, and the interview is where fit is decided." },
  { question: "Can I re-attend the Hypnosis Trainer’s Training later?", answer: "The free five-year revisit that comes with Levels 1 to 3 does not apply to the Hypnosis Trainer’s Training. The only way to sit through this level again is to be enrolled in the Master Trainer programme and attend as a coaching assistant." },
  { question: "What happens after I am certified?", answer: "To train and certify under the ABH, you must then enrol as a member of the board, both as an organisation, registering your Approved School of Hypnosis, and as an individual first-time trainer member. Membership is compulsory: you cannot train until it is in place, and it begins only once we have certified you. Guiding you through the application is part of our job." },
  { question: "Why is there no price on this page?", answer: "This is an investment in your future, and we treat it as one, so you will not see a figure in these pages. That is deliberate, and it is out of fairness to you. We would rather understand what you actually want first, and then build a proposition around your own journey, only what serves you, and nothing that does not. All it takes to find out where you stand is a conversation: please contact us for details, and your relationship manager will take you through it." },
];

const NavDataLevel5: LevelNavType = {
  prev: { href: "/program/nlp-trainers-training-program", label: "Level 4: NLP Train the Trainer" },
  prerequisite: { href: "/program/advanced-hypnotherapy-interventionist", label: "Prerequisite: Level 3, Advanced Hypnotherapy and Interventionist" },
  next: { href: "/program/nlp-master-trainer-program", label: "Level 6: NLP Master Trainer" },
};

// Level 5 End

// Level 6 Start

const bannerDataLevel6: BannerType = {
  level: "Level 6",
  title: { line1: "NLP Master Trainer", line2: "The summit: produce the trainers" },
  image: programLevel2.src,
  className: "bg-center bg-no-repeat bg-primary",
  children: (
    <p className="custom-text1 text-white mt-4 max-w-2xl">
      Quick facts: a supervised, mentored programme of three to five years, ABNLP, by application, interview and Board evaluation, prerequisite a Certified Trainer of NLP in good standing.
    </p>
  ),
};

const LevelIntroWithVideoDataLevel6: LevelIntroWithVideoType = {
  title: { line1: "What it is: ", line2: "the highest grade in NLP" },
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774603569/Level6_Intro_oscnrq.mp4",
  thumbnail: ThumbnailIntro6,
  description: `<p>A Trainer produces practitioners; a Master Trainer produces trainers. Certified through the ABNLP, it is the authority to train, evaluate and certify other NLP trainers, to run the Trainer’s Training and Evaluation, and to run your own Board-recognised Master Trainer Program. It is the exact standing Arslan holds.</p>`,
};

const LevelCertificationDataLevel6: LevelCertificationType = {
  title: { line1: "Your certification", line2: "Certified Master Trainer of NLP (ABNLP)" },
  points: [
    {
      title: `Certified Master Trainer of NLP via the American Board of Neuro-Linguistic Programming (ABNLP)`,
      description: "You may train, evaluate and certify NLP trainers, run the full Trainer’s Training and Evaluation, and run your own Board-recognised Master Trainer Program.",
      // LOGO: ABNLP - Khansa to supply approved artwork (accredited-1.webp is a placeholder until confirmed; DECISIONS v2 P7)
      imageBrand: { src: AccreditedBrand1, alt: "ABNLP, American Board of Neuro-Linguistic Programming seal" },
      imageCerficate: { src: Certificate1Level6, alt: "Certified Master Trainer of NLP certificate issued through the ABNLP" },
    },
  ],
};

const ContentSectionDataLevel6: ContentSectionType = {
  title: "Who may apply",
  TagType: "h2",
  description: (
    <div className="text-gray-600 max-w-4xl">
      <p className="my-4">You must already be a Certified Trainer of NLP in good standing, having completed the Trainer’s Training and holding current ABNLP Trainer membership. Once you do, you may apply to enrol. Entry is not automatic. Every candidate has an interview with Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK), and a direct conversation with the Board, and their standing is verified before admission. Even a trainer certified through the ABNLP is checked first, and a trainer arriving from another board is scrutinised more closely still. This is the highest level we offer, and the gate is set accordingly.</p>
      <p className="my-4">Throughout the programme you keep your Trainer membership current, renewing it each year and remaining an accredited Trainer of good standing. You apply for Master Trainer membership itself only once the programme is complete.</p>
    </div>
  ),
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
  textAlign: "text-start",
  fullBg: "bg-slate-100 ",
};

const LevelProgramIncludesDataLevel6: LevelProgramIncludesType = {
  title: { line1: "The standard you meet: four pillars", line2: "" },
  layout: "rows",
  description: (<p>The ABNLP Master Trainer grade rests on four pillars, and at AL&amp;CO we hold you to a full and demanding version of each, provided with evidence.</p>),
  points: [
    {
      title: "Leadership",
      description: (<p>High-level leadership in your trainings, your community and with the Boards, with exceptional conduct and ethics.</p>),
      theme: "dark",
      image: { src: LevelProgram1, alt: "Leadership pillar" },
    },
    {
      title: "Mentorship",
      description: (<p>Demonstrated mentoring of other trainers and of new training schools.</p>),
      theme: "light",
      image: { src: LevelProgram2, alt: "Mentorship pillar" },
    },
    {
      title: "NLP training experience",
      description: (
        <div className="space-y-2">
          <p>The heart of the standard, evidenced through four things:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>delivering or co-delivering a minimum of six NLP Practitioner and three NLP Master Practitioner trainings across the programme, evidenced through student testimonials, videos, social posts and short news articles shared with the Boards;</li>
            <li>development under the supervision of one or more NLP Master Trainers;</li>
            <li>completion of the requirements of your nominated Master Trainer Program, verified by sign-off, including project-based work that augments the application of NLP in the real world;</li>
            <li>compulsory participation as a Coaching Assistant or Trainer at a minimum of one NLP Practitioner, two NLP Master Practitioner and two NLP Trainer’s Trainings across the programme.</li>
          </ul>
        </div>
      ),
      theme: "yellow",
      image: { src: LevelProgram3, alt: "NLP training experience pillar" },
    },
    {
      title: "Community",
      description: (<p>Evidence of supporting your NLP and local communities to grow.</p>),
      theme: "dark",
      image: { src: LevelProgram4, alt: "Community pillar" },
    },
  ],
  detailContent: (
    <p className="mt-6">Alongside these, you contribute an original innovation to the development and application of NLP, shared with the Boards; you hold continuous Board membership in good standing, as a coach and a trainer, for at least two consecutive years; and you show evidence of further trainer-level trainings.</p>
  ),
};

const ContentSectionContentListData6: ContentSectionType = {
  title: "Two ways to complete it",
  TagType: "h2",
  description: `Both meet the very same requirements and reach the same grade; you choose the pace. The count begins the year you enrol: that is Year One, the next is Year Two, and the third is your graduating year.`,
  contentlist: [
    {
      title: "The three-year programme",
      TagType: "h3",
      description: (<p className="text-gray-600 my-4">Our standard AL&amp;CO Master Trainer Program, completed over three years from the year you enrol.</p>),
      textAlign: "text-start px-4",
    },
    {
      title: "The five-year programme",
      TagType: "h3",
      description: (<p className="text-gray-600 my-4">The very same requirements, nothing added and nothing removed, simply spread over five years. It is the gentler route on your calendar, and the more manageable one, because the commitment and its investment are carried across five years rather than three.</p>),
      textAlign: "text-start px-4",
    },
  ],
  contentlistColumn: "grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl",
  fullBg: "bg-slate-100 ",
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
};

const LevelBenefitsTableDataLevel6: LevelBenefitsTableType = {
  title: { line1: "Level 6", line2: "at a glance" },
  headers: ["Detail", "NLP Master Trainer"],
  points: [
    { content: "Length", values: ["Three or five years, by your choice; the same requirements either way"] },
    { content: "Format", values: ["A supervised, mentored programme"] },
    { content: "Prerequisite", values: ["Levels 1, 2 and 4; a Certified Trainer of NLP in good standing with current ABNLP Trainer membership"] },
    { content: "Entry", values: ["By application, an interview with Bismillah Pervez and a direct conversation with the Board"] },
    { content: "Standard", values: ["Four pillars: leadership, mentorship, NLP training experience and community"] },
    { content: "Sign-off", values: ["Two Master Trainers in good standing, one of them Arslan Larik (AL&CO's own standard)"] },
    { content: "Certification", values: ["Certified Master Trainer of NLP (ABNLP)"] },
    { content: "Arranged with", values: ["Arslan Larik and Bismillah Pervez"] },
  ],
};

const SignOffDataLevel6: ContentSectionType = {
  title: "How it is signed off, and why the rigour is the point",
  TagType: "h2",
  textAlign: "text-start",
  description: (
    <div className="text-gray-600 max-w-4xl">
      <p className="my-4">On completion you apply to the Board for Master Trainer level membership, submitting your evidence across all four pillars. Every AL&amp;CO Master Trainer is signed off by two Master Trainers in good standing: Arslan Larik signs as one, and the second is another certified Master Trainer appointed at our discretion. Two recognised Master Trainer signatures on the certificate is a firm rule at AL&amp;CO, a standard we hold ourselves to without exception, and that double, independent sign-off is exactly what makes the grade worth holding.</p>
      <h3 className="h5 text-primary font-semibold mt-6">A point of clarity on revisiting</h3>
      <p className="my-4">The free five-year revisit that comes with Levels 1 to 3 does not extend to the Trainer’s Trainings. Nobody re-attends the NLP Trainer’s Training or the Hypnosis Trainer’s Training simply to revise. The only people who return to those rooms are Master Trainer candidates, who attend as coaching assistants as part of this programme. That is by design: the trainer levels are earned once, and revisited only by those climbing to Master Trainer.</p>
      <h3 className="h5 text-primary font-semibold mt-6">Certifying other Master Trainers</h3>
      <p className="my-4">Producing Master Trainers of your own is a further step. To do it, you must be registered with the ABNLP in the capacity of a Master Trainer, and clear the Board’s scrutiny, an interview at the very least, before you may certify others at this grade. We facilitate this for you at the time of your graduation. It is a check that must be in place, and we make it straightforward.</p>
      <h3 className="h5 text-primary font-semibold mt-6">Where it leads</h3>
      <p className="my-4">Nowhere higher. From here your work outlives you, because the trainers you make will make practitioners long after you.</p>
      {/* Business in the Box "add-on" line removed: ruling 25 Sep 2026, Business in the Box is never presented as a level or product. */}
      {/* PLEASE CHECK: publish only after Bismillah Pervez approves */}
      <blockquote className="border-l-4 border-secondary pl-4 my-8 text-primary">
        <p className="italic">“I can vouch for every word of this personally, because I have lived it. I completed every programme at Arslan Larik &amp; Company, from Practitioner all the way through, and I did my Trainer’s Training with The Tad James Company, under the mentorship of Dr Adriana James. My standing as a Master Trainer was accredited through ANLP in the United Kingdom. I am proud to be the first Master Trainer this institution has produced, and prouder still of what that means: AL&amp;CO now grows its own.”</p>
        <p className="mt-2 font-semibold not-italic">Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK). Karachi, Pakistan.</p>
      </blockquote>
    </div>
  ),
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
};

const LevelContentDataLevel6: LevelContentType = {
  title: { line1: "Alongside the four pillars", line2: "" },
  points: [
    { title: "An original innovation", items: ["You contribute an original innovation to the development and application of NLP, shared with the Boards."], image: { src: LevetContent1.src, alt: "Original innovation in NLP" } },
    { title: "Continuous Board membership", items: ["You hold continuous Board membership in good standing, as a coach and a trainer, for at least two consecutive years."], image: { src: LevetContent2.src, alt: "Board membership in good standing" } },
    { title: "Further trainer-level trainings", items: ["You show evidence of further trainer-level trainings."], image: { src: LevetContent3.src, alt: "Further trainer-level trainings" } },
  ],
};

const LevelGraduatesExperienceDataLevel6: LevelGraduatesExperienceType = {
  title: { line1: "Watch:", line2: "NLP Master Trainer at AL&CO" },
  // video removed: the old WordPress URL is dead. Section is hidden until a real video is set.
};

const FaqDataLevel6: LevelFaq[] = [
  { question: "Three to five years is a long commitment. Why bind myself for so long when I already run a training business?", answer: "Because this is the highest grade in the discipline, and it cannot be bought in a workshop. The years are not waiting; they are the real work: delivering trainings, supervising and mentoring, completing your project, meeting a standard the board recognises, and being signed off under AL&CO's own two-signature rule. This path is not for someone wanting a quick badge. It is for the educator who intends to shape the profession and certify the next generation of trainers." },
  { question: "Who may apply for the NLP Master Trainer programme?", answer: "You must already be a Certified Trainer of NLP in good standing, having completed the Trainer’s Training and holding current ABNLP Trainer membership. Entry is not automatic. Every candidate has an interview with Bismillah Pervez and a direct conversation with the Board, and their standing is verified before admission." },
  { question: "What is the difference between the three-year and the five-year programme?", answer: "Both meet the very same requirements and reach the same grade; you choose the pace. The five-year programme has the very same requirements, nothing added and nothing removed, simply spread over five years." },
  { question: "Who signs off an AL&CO Master Trainer?", answer: "Every AL&CO Master Trainer is signed off by two Master Trainers in good standing: Arslan Larik signs as one, and the second is another certified Master Trainer appointed at our discretion. This two-signature sign-off is AL&CO's own standard, a rule we hold ourselves to without exception." },
  { question: "Why is there no price on this page?", answer: "This is an investment in your future, and we treat it as one, so you will not see a figure in these pages. That is deliberate, and it is out of fairness to you. We would rather understand what you actually want first, and then build a proposition around your own journey, only what serves you, and nothing that does not. All it takes to find out where you stand is a conversation: please contact us for details, and your relationship manager will take you through it." },
];

const NavDataLevel6: LevelNavType = {
  prev: { href: "/program/hypnosis-trainers-training-program", label: "Level 5: Hypnosis Train the Trainer" },
  prerequisite: { href: "/program/nlp-trainers-training-program", label: "Prerequisite: Level 4, NLP Train the Trainer" },
};

// Level 6 End

export const programs: ProgramType[] = [
  {
    slug: "nlp-practitioner",
    name: "NLP Practitioner",
    BannerData: bannerDataLevel1,
    LevelIntroWithVideoData: LevelIntroWithVideoDataLevel1,
    LevelCertificationData: LevelCertificationDataLevel1,
    LevelBenefitsTableData: LevelBenefitsTableDataLevel1,
    LevelProgramIncludesData: LevelProgramIncludesDataLevel1,
    LevelContentData: LevelContentDataLevel1,
    WhereItLeadsData: WhereItLeadsDataLevel1,
    LevelGraduatesExperienceData: LevelGraduatesExperienceDataLevel1,
    FaqData: FaqDataLevel1,
    NavData: NavDataLevel1,
  },
  {
    slug: "nlp-master-practitioner",
    name: "NLP Master Practitioner",
    BannerData: bannerDataLevel2,
    LevelIntroWithVideoData: LevelIntroWithVideoDataLevel2,
    LevelCertificationData: LevelCertificationDataLevel2,
    LevelBenefitsTableData: LevelBenefitsTableDataLevel2,
    LevelProgramIncludesData: LevelProgramIncludesDataLevel2,
    LevelContentData: LevelContentDataLevel2,
    WhereItLeadsData: WhereItLeadsDataLevel2,
    LevelGraduatesExperienceData: LevelGraduatesExperienceDataLevel2,
    FaqData: FaqDataLevel2,
    NavData: NavDataLevel2,
  },
  {
    slug: "advanced-hypnotherapy-interventionist",
    name: "Advanced Hypnotherapy and Interventionist",
    BannerData: bannerDataLevel3,
    LevelIntroWithVideoData: LevelIntroWithVideoDataLevel3,
    LevelCertificationData: LevelCertificationDataLevel3,
    ContentSectionData: ContentSectionDataLevel3,
    LevelProgramIncludesData: LevelProgramIncludesDataLevel3,
    LevelBenefitsTableData: LevelBenefitsTableDataLevel3,
    LevelContentData: LevelContentDataLevel3,
    WhereItLeadsData: WhereItLeadsDataLevel3,
    LevelGraduatesExperienceData: LevelGraduatesExperienceDataLevel3,
    FaqData: FaqDataLevel3,
    NavData: NavDataLevel3,
  },
  {
    slug: "nlp-trainers-training-program",
    name: "NLP Train the Trainer",
    BannerData: bannerDataLevel4,
    LevelIntroWithVideoData: LevelIntroWithVideoDataLevel4,
    LevelCertificationData: LevelCertificationDataLevel4,
    ContentSectionData: ContentSectionDataLevel4,
    LevelProgramIncludesData: LevelProgramIncludesDataLevel4,
    LevelBenefitsTableData: LevelBenefitsTableDataLevel4,
    ContentSectionImgContentListData: CurriculumDataLevel4,
    LevelContentData: LevelContentDataLevel4,
    LevelGraduatesExperienceData: LevelGraduatesExperienceDataLevel4,
    FaqData: FaqDataLevel4,
    NavData: NavDataLevel4,
  },
  {
    slug: "hypnosis-trainers-training-program",
    name: "Hypnosis Train the Trainer",
    BannerData: bannerDataLevel5,
    LevelIntroWithVideoData: LevelIntroWithVideoDataLevel5,
    LevelCertificationData: LevelCertificationDataLevel5,
    ContentSectionData: ContentSectionDataLevel5,
    LevelProgramIncludesData: LevelProgramIncludesDataLevel5,
    LevelBenefitsTableData: LevelBenefitsTableDataLevel5,
    ContentSectionImgContentListData: CurriculumDataLevel5,
    LevelContentData: LevelContentDataLevel5,
    LevelGraduatesExperienceData: LevelGraduatesExperienceDataLevel5,
    FaqData: FaqDataLevel5,
    NavData: NavDataLevel5,
  },
  {
    slug: "nlp-master-trainer-program",
    name: "NLP Master Trainer",
    BannerData: bannerDataLevel6,
    LevelIntroWithVideoData: LevelIntroWithVideoDataLevel6,
    LevelCertificationData: LevelCertificationDataLevel6,
    ContentSectionData: ContentSectionDataLevel6,
    LevelProgramIncludesData: LevelProgramIncludesDataLevel6,
    ContentSectionContentListData: ContentSectionContentListData6,
    LevelBenefitsTableData: LevelBenefitsTableDataLevel6,
    ContentSectionImgContentListData: SignOffDataLevel6,
    LevelContentData: LevelContentDataLevel6,
    LevelGraduatesExperienceData: LevelGraduatesExperienceDataLevel6,
    FaqData: FaqDataLevel6,
    NavData: NavDataLevel6,
  },
];