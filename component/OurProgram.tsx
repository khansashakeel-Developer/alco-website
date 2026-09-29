"use client";

import React from "react";
import CtaButton from "./CtaButton";
import Level1 from "@/assets/Untitled design/1.webp";
import Level2 from "@/assets/Untitled design/2.webp";
import Level3 from "@/assets/Untitled design/3.webp";
import Level4 from "@/assets/Untitled design/4.webp";
import Level5 from "@/assets/Untitled design/5.webp";
import Level6 from "@/assets/Untitled design/6.webp";
import { OurProgramData } from "@/type/ourProgram";
import OurProgramCarousel from "./our-program-carousel/ourProgramCarousel";


// B 01 rows A19 to A25; alts per A 09 C3.
const ourProgramData: OurProgramData = {
  title: "The Six-Level Ladder",

  description:
    "AL&CO is built as a ladder. Step on at the first rung and climb as far as you wish, from your own transformation to running your own training business. Each level is complete in itself, and each one opens the door to the next.",
  slides: [
    {
      title: "NLP Practitioner",
      description: "10 days, 130 hours, live on Zoom. No prerequisite. Quad certification (ABNLP, TLTA, ABNLP Coaching Division and AL&CO’s Behavioral Reengineering) plus a UK ANLP CPD certificate. Built for everyone, including the complete beginner.",
      href: "/program/nlp-practitioner",
      button: {
        text: "Learn More"
      },
      image: {
        src: Level1,
        alt: "Level 1: NLP Practitioner"
      }
    },
    {
      title: "NLP Master Practitioner",
      description: "13 days, 140 hours, live on Zoom. Requires Level 1. Quad certification at master level plus a second ANLP CPD certificate, and a dedicated coach for your own breakthrough.",
      href: "/program/nlp-master-practitioner",
      button: {
        text: "Learn More"
      },
      image: {
        src: Level2,
        alt: "Level 2: NLP Master Practitioner"
      }
    },
    {
      title: "Advanced Hypnotherapy and Interventionist",
      description: "13 days: 12 days of live teaching, plus one mandatory day in between for assignments set by AL&CO. Live on Zoom. Requires Level 2. ABH Certified Practitioner and Master Practitioner of Hypnosis, NGH certification and membership, and the AL&CO Quintuple Certification. Entry by interview, never more than 20 participants.",
      href: "/program/advanced-hypnotherapy-interventionist",
      button: {
        text: "Learn More"
      },
      image: {
        src: Level3,
        alt: "Level 3: Advanced Hypnotherapy and Interventionist"
      }
    },
    {
      title: "NLP Train the Trainer",
      description: "18 days (14 training and 4 evaluation), 120 hours. Requires Level 2. Become a Certified Trainer of NLP (ABNLP). Entry by interview with Bismillah Pervez.",
      href: "/program/nlp-trainers-training-program",
      button: {
        text: "Learn More"
      },
      image: {
        src: Level4,
        alt: "Level 4: NLP Train the Trainer"
      }
    },
    {
      title: "Hypnosis Train the Trainer",
      description: "8 days, live on Zoom. Requires Level 3. Become a Certified Hypnosis Trainer (ABH) and register your own Approved School of Hypnosis. Entry by interview with Bismillah Pervez.",
      href: "/program/hypnosis-trainers-training-program",
      button: {
        text: "Learn More"
      },
      image: {
        src: Level5,
        alt: "Level 5: Hypnosis Train the Trainer"
      }
    },
    {
      title: "NLP Master Trainer",
      description: "The summit: a supervised, mentored programme of three to five years, by application. Requires Levels 1, 2 and 4, as a Certified Trainer of NLP in good standing. Certified Master Trainer of NLP (ABNLP), signed off by two Master Trainers.",
      href: "/program/nlp-master-trainer-program",
      button: {
        text: "Learn More"
      },
      image: {
        src: Level6,
        alt: "Level 6: NLP Master Trainer"
      }
    },
  ]
}

export default function OurProgram() {
  const data = ourProgramData;

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-dark-primary bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12  gap-2 my-8">
          <div className="flex flex-col justify-start col-span-5">
            <h2 className="h3 text-white text-start">
              {data.title}
            </h2>
          </div>
          <div className="flex flex-col justify-center col-span-7 pt-1">
            <p className="custom-text2 font-light text-white text-start mb-8">
              {data.description}
            </p>
          </div>
        </div>
      </div>
      <div>
        <OurProgramCarousel slides={data.slides || []} />
      </div>
      {/* B 01 row A26: link to the /programs hub */}
      <div className="container mx-auto px-4 mt-8">
        <p className="custom-text2 font-light text-white mb-4">Levels 1 and 2 are arranged by your relationship manager. Levels 3 and above are arranged directly with Bismillah Pervez and Arslan Larik.</p>
        <CtaButton id="C3" variant="secondary" />
      </div>
    </section>
  );
}
