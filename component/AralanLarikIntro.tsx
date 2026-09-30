"use client";

import React from "react";
import Button from "./button";
import ArsalanLarik from "@/assets/intro-arsalan-larik/arsalan-larik.webp";
// PHOTO: Bismillah Pervez portrait - Arslan to supply (assets/intro-bismillah-pervez/bismillah-pervez.webp,
// portrait, same ratio as arsalan-larik.webp, under 300KB). Until then the existing about-page banner
// is cropped to her figure so both cards stay the same size.
import BismillahPervez from "@/assets/about-us/who-is-bismillah-pervez.webp";
import badgeICFMCC from "@/assets/level-certificate/badges/icf-mcc.webp";
import Image, { StaticImageData } from "next/image";

type TrainerCard = {
  name: string;
  role: string;
  specification: string;
  image: StaticImageData;
  imageAlt: string;
  objectPosition: string;
  button: { text: string; link: string };
  seal?: { image: StaticImageData; alt: string };
};

const title = "Meet Your Trainers: Arslan Larik and Bismillah Pervez";

// B 01 rows A13 to A18: two cards of equal weight.
const trainers: TrainerCard[] = [
  {
    name: "Arslan Larik",
    role: "Founder and Master Trainer",
    specification: `
  <p>Arslan Larik is Pakistan’s first Certified Master Trainer of NLP (ABNLP) and of Hypnosis (ABH), an ANLP Accredited Master Trainer in the United Kingdom, a Master Trainer of NLP University (NLPU) in California, under Robert Dilts, and ANLP’s International Ambassador for Pakistan. He is the founder and Managing Director of AL&CO and the architect of its curriculum.</p>
  <p>His lineage runs to the source of the field. His master-trainer standing was earned through The Tad James Company, in the direct tradition of Dr Tad James and Dr Adriana James. He teaches personally, live, most nights of the year.</p>
  `,
    image: ArsalanLarik,
    imageAlt: "Arslan Larik, Founder and Master Trainer at AL&CO",
    objectPosition: "center top",
    button: { text: "About Arslan", link: "/about-us/who-is-arslan-larik" },
  },
  {
    name: "Bismillah Pervez",
    role: "CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK)",
    specification: `
  <p>Bismillah Pervez is the Chief Executive of AL&CO and an established trainer at the front of the room. She is an ICF Master Certified Coach (MCC), the highest coaching designation the International Coaching Federation awards, and she holds its Advanced Certification in Team Coaching (ACTC).</p>
  <p>She is the first woman in Pakistan to hold the ICF Master Certified Coach designation, its Advanced Certification in Team Coaching, and her ANLP accredited trainer standing, all three together. She is also the first Master Trainer AL&CO has produced.</p>
  `,
    image: BismillahPervez,
    imageAlt: "Bismillah Pervez, CEO and co-trainer at AL&CO",
    objectPosition: "62% center",
    button: { text: "About Bismillah", link: "/about-us/who-is-bismillah-pervez" },
    // LOGO: ICF MCC - shown once, on her card only. Khansa to confirm the current approved artwork.
    seal: { image: badgeICFMCC, alt: "ICF Master Certified Coach (MCC) seal" },
  },
];

// SEO heading: one plain <h2>. Change the size here only (swap "h3" for "h2" or "h4", or add e.g. "text-[34px]").
const HEADING_CLASS = "h3 text-black text-center mb-8 lg:mb-10";

export default function AralanLarikIntro() {
  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-light-neutral bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <h2 className={HEADING_CLASS}>{title}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {trainers.map((t) => (
            <article
              key={t.name}
              className="flex flex-col bg-white rounded-lg shadow-lg border border-primary/10 overflow-hidden"
            >
              {/* Photo: same navy backdrop and same crop for both, so the two cards match. Name sits on a navy fade. */}
              <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-primary-darkest">
                <Image
                  src={t.image}
                  alt={t.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                  style={{ objectPosition: t.objectPosition }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary-darkest/90 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                  <h3 className="h4 font-semibold text-white text-start">{t.name}</h3>
                  <div className="w-10 h-1 bg-secondary mt-2" />
                </div>
              </div>

              <div className="flex flex-col flex-1 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  {t.seal && (
                    <Image src={t.seal.image} alt={t.seal.alt} width={56} height={56} className="shrink-0" />
                  )}
                  <p className="h5 font-semibold text-primary text-start">{t.role}</p>
                </div>
                <div
                  className="custom-text1 font-light text-black/80 space-y-4 flex-1"
                  dangerouslySetInnerHTML={{ __html: t.specification }}
                />
                <div className="mt-6">
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

        {/* Closing line: its own navy band with the gold accent, so it no longer floats under one card. */}
        <div className="mt-6 lg:mt-8 rounded-lg bg-primary-darkest border-l-4 border-secondary px-6 py-5 lg:px-8">
          <p className="custom-text1 font-light text-white text-start max-w-4xl">
            When you train at AL&amp;CO you learn inside an institution led by two certified trainers, which is what makes it a school and not one person with a following.
          </p>
        </div>
      </div>
    </section>
  );
}