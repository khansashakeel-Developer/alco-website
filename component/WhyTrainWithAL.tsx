/** 
"use client";

import React from "react";
import Button from "./button";
import { WhyTrainWithALData } from "@/type/whyTrainWithAL";
// images
import Train1 from '@/assets/whyTrainWithAL/Train1.webp';
import Train2 from '@/assets/whyTrainWithAL/Train2.webp';
import Train3 from '@/assets/whyTrainWithAL/Train3.webp';
import Train4 from '@/assets/whyTrainWithAL/Train4.webp';
import Train5 from '@/assets/whyTrainWithAL/Train5.webp';
import Train6 from '@/assets/whyTrainWithAL/Train6.webp';
import Image from "next/image";

const whyTrainWithALData: WhyTrainWithALData = {
  title: "Why Train with Arslan Larik & Company (AL&CO)?",

  description:
    "Choosing where to train is a decision about the rest of your life. Here is what sets AL&CO apart.",
  points: [
    {
      title: "Two Masters, One Institution: Arslan Larik and Bismillah Pervez",
      image: {
        src: Train1,
        alt: "Two Masters, One Institution: Arslan Larik and Bismillah Pervez"
      },
    },
    {
      title: "Pioneers of Online NLP Training",
      image: {
        src: Train2,
        alt: "Pioneers of Online NLP Training"
      },
    },
    {
      title: "Free Revisits for Five Years (Levels 1 to 3)",
      image: {
        src: Train3,
        alt: "Free Revisits for Five Years (Levels 1 to 3)"
      },
    },
    {
      title: "An Audio Library Mapped to Your Manual",
      image: {
        src: Train4,
        alt: "An Audio Library Mapped to Your Manual"
      },
    },
    {
      title: "A Global Network of 2,000+ Graduates",
      image: {
        src: Train5,
        alt: "A Global Network of 2,000+ Graduates"
      },
    },
    {
      title: "Lifetime Support from Experts",
      image: {
        src: Train6,
        alt: "Lifetime Support from Experts"
      },
    }
  ]
}

export default function WhyTrainWithAL() {
  const data = whyTrainWithALData;

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-light-neutral bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 my-8">
          <div className="flex flex-col justify-start ">
            <h2 className="h3 text-black text-start">
              {data.title}
            </h2>
          </div>
          <div className="flex flex-col justify-center pt-3">
            <p className="custom-text1 font-light text-black text-start ">
              {data.description}
            </p>
            <div className="mt-4">
              <Button
                iconRight={true}
                variant="primary"
                size="medium"
                text="More about us"
                href="/about-us/why-train-with-alco"
                className='my-auto' />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 my-12">

          {data.points.map((point, index) => (
            <div key={index} className="flex items-center text-center gap-4 p-6 border rounded-lg shadow-md">
              {/* <img src={point.image.src} alt={point.image.alt} className="w-16 h-16 object-cover " /> }*/
             /* {point.image && (
                <div className="w-16 h-16 relative">
                  <Image
                    src={point.image.src}          // must be defined
                    alt={point.image.alt}
                    fill                            // makes it fill the parent div
                    className="object-contain "
                    // sizes="48px"                    // optional, since w-12 h-12 = 48px
                  />
                </div>
              )}
              <p className="text-md lg:text-lg font-medium text-black/85 text-start font-outfit">
                {point.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
*/




"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "./button";

const data = {
  title: "Why Train with Arslan Larik & Company (AL&CO)?",
  description:
    "Choosing where to train is a decision about the rest of your life. Here is what sets AL&CO apart.",
  points: [
    "Two Masters, One Institution: Arslan Larik and Bismillah Pervez",
    "Pioneers of Online NLP Training",
    "Free Revisits for Five Years (Levels 1 to 3)",
    "An Audio Library Mapped to Your Manual",
    "A Global Network of 2,000+ Graduates",
    "Lifetime Support from Experts",
  ],
};

export default function WhyTrainWithAL() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  // pop the cards up once, when the panel scrolls into view
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setShown(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative py-8 md:py-12 lg:py-16 px-4 bg-light-neutral w-full">
      <style>{`
        @keyframes wtPan   { 0% { background-position: 100% 0% } 50% { background-position: 60% 40% } 100% { background-position: 100% 0% } }
        @keyframes wtBob   { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        @keyframes wtPulse { 0%,100% { opacity:.55 } 50% { opacity:1 } }
        @keyframes wtGlow  { 0%,100% { box-shadow: 0 0 0 0 rgba(249,184,30,.55) } 50% { box-shadow: 0 0 0 10px rgba(249,184,30,0) } }
        .wt-brain { animation: wtPan 20s ease-in-out infinite; }
        .wt-bob   { animation: wtBob 4.5s ease-in-out infinite; }
        .wt-dot   { animation: wtPulse 2s ease-in-out infinite; }
        .wt-badge { animation: wtGlow 2.4s ease-out infinite; }
        .wt-card:hover .wt-bob { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .wt-brain, .wt-bob, .wt-dot, .wt-badge { animation: none !important; }
          .wt-card, .wt-card * { transition: none !important; }
        }
      `}</style>

      <div className="container mx-auto">
        {/* one big panel: heading and cards belong to the same design */}
        <div ref={panelRef} className="relative overflow-hidden rounded-3xl bg-primary-darkest px-5 py-8 md:px-10 md:py-8 lg:px-12 lg:py-8 shadow-2xl">
          {/* brain pattern, clearly visible and slowly moving */}
          <span aria-hidden="true" className="wt-brain pointer-events-none absolute inset-0 bg-medium-primary bg-[length:90%_auto] bg-no-repeat opacity-70" style={{ WebkitMaskImage: "radial-gradient(ellipse at top right, #000 30%, transparent 75%)", maskImage: "radial-gradient(ellipse at top right, #000 30%, transparent 75%)" }} />
          {/* gold glow in the corner */}
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-secondary/25 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-5 items-end">
            <div>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-secondary mb-3">
                <span className="wt-dot h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
                The AL&amp;CO difference
              </span>
              <h2 className="h3 text-white text-start">{data.title}</h2>
            </div>
            <div className="flex flex-col justify-end">
              <p className="custom-text1 font-light text-white/90 text-start">{data.description}</p>
              <div className="mt-4">
                <Button
                  iconRight={true}
                  variant="secondary"
                  size="medium"
                  text="More about us"
                  href="/about-us/why-train-with-alco"
                  className="my-auto" />
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7 lg:gap-x-6 lg:gap-y-6 mt-10 lg:mt-9 mb-0">
            {data.points.map((title, index) => (
              <div
                key={index}
                style={{ transitionDelay: shown ? `${index * 110}ms` : "0ms" }}
                className={`wt-card group relative transition-all duration-700 ease-out
                  ${shown ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"}`}
              >
                {/* floating wrapper keeps bobbing, staggered per card */}
                <div>
                  {/* gold number badge pops out over the card edge */}
                  <span aria-hidden="true" className="wt-badge absolute -top-5 left-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-outfit text-base font-bold text-primary-darkest shadow-lg transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* solid white card: the point is the hero, big and dark on white */}
                  <div className="relative flex min-h-[110px] lg:min-h-[120px] items-center rounded-2xl border-l-8 border-secondary bg-white px-6 pb-6 pt-9 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.55)] transition-all duration-300 group-hover:scale-[1.06] group-hover:bg-secondary group-hover:shadow-[0_24px_50px_-8px_rgba(249,184,30,0.55)]">
                    <p
                      className="font-outfit font-semibold leading-snug text-primary-darkest text-start"
                      style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.55rem)" }}
                    >
                      {title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}