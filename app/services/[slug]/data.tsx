import { BannerType } from "@/type/bannerType";
import { servicesType } from "@/type/servicesType";
import programLevel2 from "@/assets/background/program-level-2.webp"
import FourCloudsModel from "@/assets/background/four-clouds-model.webp"
import FourCloudsModelEnroll1 from "@/assets/services/four-clouds-model/four-cloud-model-1.webp"
import FourCloudsModelEnroll2 from "@/assets/services/four-clouds-model/four-cloud-model-2.webp"
import FourCloudsModelEnroll3 from "@/assets/services/four-clouds-model/four-cloud-model-3.webp"
import FourCloudsModelEnroll4 from "@/assets/services/four-clouds-model/four-cloud-model-4.webp"
import { ContentSectionType } from "@/type/contentSection";
import ResourcesBook1 from "@/assets/services/resources/book-1.webp"
import ResourcesBook2 from "@/assets/services/resources/book-2.webp"
import ResourcesBook3 from "@/assets/services/resources/book-3.webp"
import ResourcesBook4 from "@/assets/services/resources/book-4.webp"
import ResourcesBook5 from "@/assets/services/resources/book-5.webp"
import ResourcesBook6 from "@/assets/services/resources/book-6.webp"
import ResourcesBook7 from "@/assets/services/resources/book-7.webp"
import LevelProgram1 from "@/assets/level-program-included/program-1.webp"
import LevelProgram2 from "@/assets/level-program-included/program-2.webp"
import LevelProgram3 from "@/assets/level-program-included/program-3.webp"
import LevelProgram4 from "@/assets/level-program-included/program-4.webp"
import LevelProgram5 from "@/assets/level-program-included/program-5.webp"
import LevelProgram6 from "@/assets/level-program-included/program-6.webp"
import { LevelProgramIncludesType } from "@/type/levelProgramIncludes";
import Link from "next/link";


const bannerDataRE: BannerType = {
  title: {
    line1: "Free NLP Resources and eBooks",
    align: "text-center mx-auto"
  },
  image: programLevel2.src,
  className: "bg-center bg-cover bg-no-repeat bg-primary"
};

const ContentSectionData1RE: ContentSectionType = {

  title: "Empower Your Journey",
  TagType: "h2",
  description: (
    <div className="text-gray-600">
      <h3 className="h4 text-secondary">Free eBooks for growth, mastery and transformation</h3>
      <p className="my-4">
        At AL&CO, we believe that the right knowledge can transform lives and legacies.
        That’s why we’ve curated a collection of exclusive free eBooks, thoughtfully designed for:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Coaches and Therapists seeking proven, practical strategies.</li>
        <li>Individuals committed to personal and professional mastery.</li>
        <li>Curious minds eager to explore the profound benefits of Neuro-Linguistic Programming (NLP).</li>
      </ul>
      <p className="my-4">
        Each eBook blends cutting-edge insights with real-world application, empowering you to:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Deepen your understanding of human behavior.</li>
        <li>Master tools for emotional and mental well-being.</li>
        <li>Elevate your coaching and therapeutic impact.</li>
      </ul>
      <p className="my-4">
        And ignite lasting transformation in yourself and those you serve.
      </p>
      <p>
        Crafted by globally certified NLP trainers at AL&CO, these resources are more than just reading material; they’re your first step toward excellence.
      </p>
    </div>
  ),
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
  textAlign: "text-start",
  fullBg: "bg-neutral-100"
}

export const ContentSectionImgContentListDataRE: ContentSectionType = {
  title: "Explore. Learn. Evolve.",
  TagType: "h2",
  titleColor: "text-white",
  contentlist: [
    {
      title: "Create Your Own Future With NLP",
      TagType: "h3",
      height: "h-80",
      position: "object-contain lg:object-cover",
      src: ResourcesBook1.src,
      alt: "Create Your Own Future With NLP",
    },
    {
      title: "Relationship Mastery Through NLP",
      TagType: "h3",
      height: "h-80",
      position: "object-contain lg:object-cover",
      src: ResourcesBook2.src,
      alt: "Relationship Mastery Through NLP",
    },
    {
      title: "Emotional Mastery With NLP",
      TagType: "h3",
      height: "h-80",
      position: "object-contain lg:object-cover",
      src: ResourcesBook3.src,
      alt: "Emotional Mastery With NLP",
    },
    {
      title: "I Am Not Good Enough",
      TagType: "h3",
      height: "h-80",
      position: "object-contain lg:object-cover",
      src: ResourcesBook4.src,
      alt: "I Am Not Good Enough",
    },
    {
      title: "101 Powerful Coaching Questions",
      TagType: "h3",
      height: "h-80",
      position: "object-contain lg:object-cover",
      src: ResourcesBook5.src,
      alt: "101 Powerful Coaching Questions",
    },
    {
      title: "How To Get Your First Coaching Client",
      TagType: "h3",
      height: "h-80",
      position: "object-contain lg:object-cover",
      src: ResourcesBook6.src,
      alt: "How To Get Your First Coaching Client",
    },
    {
      title: "Financial Freedom Through NLP",
      TagType: "h3",
      height: "h-80",
      position: "object-contain lg:object-cover",
      src: ResourcesBook7.src,
      alt: "Financial Freedom Through NLP",
    },
  ],
  fullBg: "bg-primary",
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
  contentlisItemClass: "w-full sm:w-[48%] lg:w-[23%] rounded-xl bg-slate-200/30 drop-shadow-sm ",
  contentlistClass: "flex flex-wrap justify-center gap-4 max-w-6xl mx-auto pt-6 md:pt-8 lg:pt-12 xl:pt-16",
  contentlistTitle: "text-lg font-semibold text-center text-white mb-4 min-h-12 px-4",
  detailContent: (
    <div className="pt-6 md:pt-8 lg:pt-12 xl:pt-16">
      <p className="text-white text-xl font-outfit">
        Your next breakthrough is just a few pages away.
      </p>
      <p className="text-secondary text-2xl font-semibold font-outfit">
        Download now and start creating the life, business,<br />
        and impact you deserve.
      </p>
    </div>
  ),
}

// D 06 row 4 (DECISIONS v2 P2, P3): audio is a library on the AL&CO online learning portal; no creator or narrator named.
const ContentSectionData2RE: ContentSectionType = {
  title: "Premium Resources For Graduates",
  TagType: "h2",
  description: (
    <div className="max-w-6xl mx-auto">
      <p className="my-4">Every AL&amp;CO student is provided with a library of audio files on the AL&amp;CO online learning portal, aligned to the manual, with the deeper explanations and the golden nuggets. <Link href="/program/nlp-practitioner" className="underline">Level 1: NLP Practitioner</Link> has 222 audio files and <Link href="/program/nlp-master-practitioner" className="underline">Level 2: NLP Master Practitioner</Link> has 225. Level 3 has no audio library.</p>
      <p className="my-4">Every programme also includes a comprehensive training manual, around 500 pages per level, issued digitally and yours to keep. We encourage e-copies, because they are kinder to the planet; a printed set is available and charged separately.</p>
      <p className="mt-4">If you are a student or graduate of Level 1 or Level 2, request access to your audio library below. And remember, you can come back: re-attend, revise and recap our live Practitioner, Master Practitioner and Advanced Hypnotherapy trainings, free, for five years.</p>
    </div>
  ),
  fullBg: "bg-neutral-100 ",
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
};

const ContentSectionContentListDataRE: ContentSectionType = {
  contentlist: [
    {
      title: "Level 1: NLP Practitioner",
      TagType: "h3",
      programId: "69d88bcd3b3f401bb2e711bc",
      description: (
        <div className="text-gray-600">
          <p className="text-lg px-4 mb-4">Audio library, 222 files</p>
        </div>
      ),
    },
    {
      title: "Level 2: NLP Master Practitioner",
      TagType: "h3",
      programId: "69d8a8ed06f01d73ae725722",
      description: (
        <div className="text-gray-600">
          <p className="text-lg px-4 mb-4">Audio library, 225 files</p>
        </div>
      ),
    },
  ],
  contentlistColumn: "grid-cols-2 gap-6 max-w-2xl",
  contentlisItemClass: "rounded-xl bg-white drop-shadow-sm px-4 py-6",
  fullBg: "bg-primary",
}

// D 05: Four Clouds Model copy from the long brochure p.6.
const bannerDataFCM: BannerType = {
  title: { line1: "The Four Clouds Model", align: "text-center mx-auto" },
  image: FourCloudsModel.src,
  className: "bg-center bg-cover bg-no-repeat bg-primary ",
};

const ContentSectionData1FCM: ContentSectionType = {
  title: "Only four things hold you back",
  TagType: "h2",
  description: (
    <div className="max-w-7xl mx-auto">
      <p className="mb-4">There are only four things that hold a person back. Only four that stand between you and an extraordinary life, in your career and your business, your health and your wealth, your relationships and your emotional intelligence. Once you can see them, you can move them.</p>
      <p>Let us show you with the sun. Look up at it, and what comes to mind? Light. Warmth. Energy. Power. Now let a cloud drift across it. The sun has not moved and it has lost none of its power, yet the light, the warmth and the energy are blocked from reaching you. You cannot see the clouds in your own life, but they are there, and there are four of them.</p>
    </div>
  ),
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
  textAlign: "text-start",
  fullBg: "bg-neutral-100",
};

const ContentSectionImgContentListDataFCM: ContentSectionType = {
  title: "The four clouds",
  TagType: "h2",
  titleColor: "text-white",
  contentlist: [
    { title: "Limiting Beliefs", height: "h-40", position: "object-contain lg:object-cover", src: FourCloudsModelEnroll3.src, alt: "Limiting beliefs: a man dragging a weight labelled I am not good enough" },
    { title: "Negative Emotions", height: "h-40", position: "object-contain lg:object-cover", src: FourCloudsModelEnroll2.src, alt: "Negative emotions: a woman surrounded by angry and sad faces" },
    { title: "Negative Thinking", height: "h-40", position: "object-contain lg:object-cover", src: FourCloudsModelEnroll1.src, alt: "Negative thinking: a woman with thought bubbles saying I am a loser" },
    { title: "Inner Conflict", height: "h-40", position: "object-contain lg:object-cover", src: FourCloudsModelEnroll4.src, alt: "Inner conflict: a woman between two versions of herself" },
  ],
  fullBg: "bg-primary",
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
  contentlisItemClass: "w-full sm:w-[48%] lg:w-[23%] rounded-xl bg-slate-200/30 drop-shadow-sm py-6 px-4",
  contentlistClass: "flex flex-wrap justify-center gap-4 max-w-6xl mx-auto pt-6 md:pt-8 lg:pt-12 xl:pt-16",
  contentlistTitle: "text-lg font-semibold text-center text-white min-h-12 px-4 mt-4",
};

const LevelProgramIncludesDataLevel1: LevelProgramIncludesType = {
  title: { line1: "What each cloud does" },
  points: [
    {
      title: "The first cloud: Limiting Beliefs",
      description: (<p>The quiet sentences you tell yourself about who you are. “I am too young.” “I am too old.” Some people spend the first half of their lives believing they are too young to succeed, and the second half believing they are too old, and both halves are wasted. “I don’t have enough money.” “I don’t have enough time.” “I am not good enough.” None of them are true. We have taught people from fourteen years of age to their sixties in the same room, and watched the youngest outshine everyone else. All limiting beliefs are lies, and the moment you see that, they lose their grip.</p>),
      theme: "light",
      image: { src: LevelProgram2, alt: "Limiting beliefs" },
    },
    {
      title: "The second cloud: Negative Emotions",
      description: (<p>Anger. Sadness. Fear. Guilt. Hurt. Everyone has felt them, and there is nothing wrong with feeling. But when they gather and begin to run you, they disempower you, because when emotion goes up, intelligence goes down, and a low emotional intelligence makes even brilliant people do the wrong thing.</p>),
      theme: "yellow",
      image: { src: LevelProgram3, alt: "Negative emotions" },
    },
    {
      title: "The third cloud: Negative Thinking",
      description: (<p>A negative thought is simply an opinion about an event, and whatever you focus on grows. Focus on the negative and you attract more of it, and gather more challenge around you. Focus on the positive and you attract more of that, and the more positive you carry, the more you grow. It is a simple law, and most people never learn to use it on purpose.</p>),
      theme: "dark",
      image: { src: LevelProgram1, alt: "Negative thinking" },
    },
    {
      title: "The fourth cloud: Inner Conflict",
      description: (<p>When one part of you wants one thing and another part wants the opposite. A part of you wants to be financially free; another part wants to be on a beach, travelling the world. A part of you wants to marry and build a family; another wants to stay free a while longer. While the two pull against each other, you cannot move. Imagine walking through every day with the road forever splitting in two, this way or that, this way or that. You lose your direction. Choose one road, commit fully, and nothing can knock you off it. That is why inner conflict is the mother of the other clouds, and why resolving it changes everything.</p>),
      theme: "dark",
      image: { src: LevelProgram4, alt: "Inner conflict" },
    },
  ],
  pointsClass: "grid grid-col-1 lg:grid-cols-2 gap-4 lg:gap-8 py-2 md:py-4 lg:py-8 xl:py-12",
  textAlign: "text-start",
  detailContent: (
    <div className="text-primary">
      <p className="my-4">In our trainings we work directly with you and your four clouds. Limiting beliefs are dissolved at the root and empowering ones put in their place. Negative emotions are released and turned into learning. Negative thinking is retrained into a habit of growth. Inner conflict is resolved by bringing your values back into alignment. The clouds part, and you step into your own light.</p>
      <p className="my-4 flex flex-wrap gap-4">
        <Link href="/program/nlp-practitioner" className="underline font-semibold">Start with Level 1: NLP Practitioner</Link>
        <Link href="/programs" className="underline font-semibold" data-cta-id="C3" data-gtm-event="cta_click">See all six levels</Link>
      </p>
    </div>
  ),
};


export const services: servicesType[] = [
  {
    slug: "resources",
    BannerData: bannerDataRE,
    ContentSectionData1: ContentSectionData1RE,
    // ContentSectionImgContentListData: ContentSectionImgContentListDataRE,
    ContentSectionData2: ContentSectionData2RE,
    ContentSectionContentListData: ContentSectionContentListDataRE,
  },
  {
    slug: "four-clouds-model",
    BannerData: bannerDataFCM,
    ContentSectionData1: ContentSectionData1FCM,
    ContentSectionImgContentListData: ContentSectionImgContentListDataFCM,
    LevelProgramIncludesData: LevelProgramIncludesDataLevel1,
  }
];