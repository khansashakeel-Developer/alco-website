"use client";

import React from "react";
import Button from "./button";
import ArsalanLarik from "@/assets/intro-arsalan-larik/arsalan-larik-clean.webp";
// PHOTO: Bismillah Pervez portrait - Arslan to supply (assets/intro-bismillah-pervez/bismillah-pervez.webp,
// portrait, same ratio as arsalan-larik.webp, under 300KB). Until then the existing about-page banner
// is cropped to her figure so both cards stay the same size.
import BismillahPervez from "@/assets/about-us/bismillah-pervez-clean.webp";
import badgeABNLP from "@/assets/level-certificate/badges/abnlp.webp";
import badgeTLT from "@/assets/level-certificate/badges/tlta.webp";
import badgeCDAB from "@/assets/level-certificate/badges/cdab.webp";
import badgeABH from "@/assets/level-certificate/badges/abh.webp";
import badgeNGH from "@/assets/level-certificate/badges/ngh.webp";
import badgeNGHColor from "@/assets/level-certificate/badges/ngh-color.webp";
import badgeICFMCC from "@/assets/level-certificate/badges/icf-mcc.webp";
import badgeICFACTC from "@/assets/level-certificate/badges/icf-actc.webp";
import badgeANLP from "@/assets/level-certificate/badges/anlp.webp";
import badgeNLPU from "@/assets/level-certificate/badges/nlpu.webp";
import badgeABNLPColor from "@/assets/level-certificate/badges/ABNLP-color.webp";
import Image, { StaticImageData } from "next/image";

type TrainerCard = {
  name: string;
  position: string;
  credentials: string;
  image: StaticImageData;
  imageAlt: string;
  objectPosition: string;
  button: { text: string; link: string };
  logos: { image: StaticImageData; alt: string }[];
};

// Set to true once Bismillah's photo is a cutout with a transparent background (PNG or WebP).
// Then her card gets exactly the same blue and dark diagonal as Arslan's, drawn by the page, with no tint and no halo.
// While it is false her normal photo keeps the blue tint.
const BISMILLAH_IS_CUTOUT = false;

const title = "Meet Your Trainers: Arslan Larik and Bismillah Pervez";

// B 01 rows A13 to A18: two cards of equal weight.
const trainers: TrainerCard[] = [
  {
    name: "Arslan Larik",
    position: "Founder and Master Trainer",
    // The credentials text stays in the page (hidden) for search engines and screen readers.
    credentials:
      "Founder and Managing Director, Certified Master Trainer of NLP (ABNLP) and Hypnosis (ABH), ANLP Accredited Master Trainer (UK), and NLPU Master Trainer under Robert Dilts",
    image: ArsalanLarik,
    imageAlt: "Arslan Larik, Founder and Master Trainer at AL&CO",
    objectPosition: "center top",
    button: { text: "About Arslan", link: "/about-us/who-is-arslan-larik" },
    logos: [
      { image: badgeABNLP, alt: "ABNLP Certified Master Trainer of NLP" },
      { image: badgeTLT, alt: "Time Line Therapy Association Trainer" },
      {
        image: badgeCDAB,
        alt: "Coaching Division of ABNLP, Trainer of NLP Coaching",
      },
      { image: badgeANLP, alt: "ANLP Accredited Trainer (UK)" },
      { image: badgeNLPU, alt: "NLP University International Master Trainer" },
      { image: badgeNGH, alt: "National Guild of Hypnotists (NGH)" },
      { image: badgeABH, alt: "ABH Certified Master Trainer of Hypnosis" },
    ],
  },
  {
    name: "Bismillah Pervez",
    position: "CEO and Master Trainer",
    credentials:
      "CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK)",
    image: BismillahPervez,
    imageAlt: "Bismillah Pervez, CEO and co-trainer at AL&CO",
    objectPosition: "62% center",
    button: {
      text: "About Bismillah",
      link: "/about-us/who-is-bismillah-pervez",
    },
    logos: [
      { image: badgeABNLP, alt: "ABNLP Master Trainer of NLP" },
      { image: badgeABNLPColor, alt: "ABNLP Approved Training (colored logo)" },
      { image: badgeANLP, alt: "ANLP Accredited Trainer (UK)" },
      { image: badgeNGHColor, alt: "National Guild of Hypnotists (NGH)" },
      { image: badgeABH, alt: "ABH Trainer of Hypnosis" },
      { image: badgeICFMCC, alt: "ICF Master Certified Coach (MCC)" },
      {
        image: badgeICFACTC,
        alt: "ICF Advanced Certification in Team Coaching (ACTC)",
      },
    ],
  },
];

// SEO heading: one plain <h2>. Change the size here only (swap "h3" for "h2" or "h4", or add e.g. "text-[34px]").
const HEADING_CLASS = "h3 text-black text-center mb-6 lg:mb-5";

export default function AralanLarikIntro() {
  return (
    <section className="py-6 md:py-8 lg:py-6 xl:py-8 sm:px-4 bg-light-neutral bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <h2 className={HEADING_CLASS}>{title}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {trainers.map((t) => (
            <article
              key={t.name}
              className="group flex flex-col bg-white rounded-lg shadow-lg border border-primary/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Photo: same navy backdrop and same crop for both, so the two cards match. Name sits on a navy fade. */}
              <div
                className="relative w-full overflow-hidden aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9]"
                style={{ backgroundColor: "#1B507C" }}
              >
                {/* Arslan's photo already contains the dark diagonal. For a cutout without it, the page draws the same one. */}
                {t.name === "Bismillah Pervez" && BISMILLAH_IS_CUTOUT && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      backgroundColor: "#05284E",
                      clipPath: "polygon(8% 100%, 100% 3%, 100% 100%)",
                    }}
                  />
                )}

                {/* Hover zoom. Arslan's layer is taller and scaled from the top so he sits as far back as Bismillah. */}
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  style={{ transformOrigin: "50% 100%" }}
                >
                  <div
                    className="absolute left-0 top-0 w-full"
                    style={{
                      height: t.name === "Arslan Larik" ? "130%" : "100%",
                      transform:
                        t.name === "Arslan Larik" ? "scale(0.85)" : undefined,
                      transformOrigin: "50% 0%",
                    }}
                  >
                    <Image
                      src={t.image}
                      alt={t.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover"
                      style={{ objectPosition: t.objectPosition }}
                    />
                  </div>
                </div>

                {/* Bismillah's photo has a grey studio backdrop, so it gets the blue tint. Arslan's photo is a cutout and needs none (no tint, so no halo). */}
                {t.name === "Bismillah Pervez" && !BISMILLAH_IS_CUTOUT && (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 mix-blend-color"
                      style={{
                        background: "#1B507C",
                        WebkitMaskImage:
                          "radial-gradient(ellipse 24% 68% at 51% 58%, transparent 72%, #000 94%)",
                        maskImage:
                          "radial-gradient(ellipse 24% 68% at 51% 58%, transparent 72%, #000 94%)",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 mix-blend-screen opacity-60"
                      style={{
                        background: "#143F66",
                        WebkitMaskImage:
                          "radial-gradient(ellipse 24% 68% at 51% 58%, transparent 72%, #000 94%)",
                        maskImage:
                          "radial-gradient(ellipse 24% 68% at 51% 58%, transparent 72%, #000 94%)",
                      }}
                    />
                    {/* Lightens the dark glow behind the head, so it blends into the blue. Raise opacity-20 to make it lighter, lower it to make it darker. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 mix-blend-screen opacity-20"
                      style={{
                        background: "#286EAA",
                        WebkitMaskImage:
                          "radial-gradient(ellipse 24% 68% at 51% 58%, transparent 55%, #000 80%, #000 105%, transparent 150%)",
                        maskImage:
                          "radial-gradient(ellipse 24% 68% at 51% 58%, transparent 55%, #000 80%, #000 105%, transparent 150%)",
                      }}
                    />
                  </>
                )}

                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-darkest/90 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                  <h3 className="h4 font-semibold text-white text-start">
                    {t.name}
                  </h3>
                  <p className="mt-1 font-outfit text-sm lg:text-base font-medium uppercase tracking-[0.14em] text-secondary text-start">
                    {t.position}
                  </p>
                  <div className="w-10 h-1 bg-secondary mt-2" />
                </div>
              </div>

              <div className="flex flex-col flex-1 p-5 lg:px-6 lg:py-5">
                {/* Credentials as logos. The text stays in the page for search engines and screen readers. */}
                <div className="grid grid-cols-4 items-center justify-items-center gap-2 sm:grid-cols-8 sm:gap-1.5 min-h-[5.5rem]">
                  {t.logos.map((l) => (
                    <Image
                      key={l.alt}
                      src={l.image}
                      alt={l.alt}
                      title={l.alt}
                      width={80}
                      height={80}
                      className="relative h-auto w-full max-w-[80px] shrink-0 scale-105 object-contain transition-transform duration-300 hover:z-10 hover:scale-110"
                    />
                  ))}
                  <p className="sr-only">{t.credentials}</p>
                </div>
                <div className="mt-auto pt-4">
                  <Button
                    iconRight={true}
                    variant="primary"
                    size="medium"
                    text={t.button.text}
                    href={t.button.link}
                    className="my-auto"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
