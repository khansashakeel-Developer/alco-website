/* import React from "react";
import Image, { StaticImageData } from "next/image";
// Seal artwork: the repo's existing board badges (also used on the level pages).
// DECISIONS v2 P7: Khansa to confirm or replace each with the current approved artwork
// (target files assets/accredited/seal-*.webp, each under 100KB).
import sealABNLP from "@/assets/level-certificate/badges/abnlp.webp";
import sealABNLPCoaching from "@/assets/level-certificate/badges/cdab.webp";
import sealABH from "@/assets/level-certificate/badges/abh.webp";
import sealNGH from "@/assets/level-certificate/badges/ngh.webp";
import sealTLTA from "@/assets/level-certificate/badges/tlta.webp";
import sealANLP from "@/assets/level-certificate/badges/cpd.webp";
import sealALCO from "@/assets/level-certificate/badges/alco.webp";

type SealLine = {
  board: string;
  seal?: StaticImageData;
  text: string;
};

// B 01 rows A28 to A30. No trademark attribution line under the list (P5).
const title = "Certified Through International Boards";

const seals: SealLine[] = [
  // LOGO: ABNLP - Khansa to supply approved artwork
  {
    board: "ABNLP",
    seal: sealABNLP,
    text: "ABNLP: AL&CO is an ABNLP Approved Institute of NLP.",
  },
  // LOGO: ABNLP Coaching Division - Khansa to supply approved artwork
  {
    board: "ABNLP Coaching Division",
    seal: sealABNLPCoaching,
    text: "ABNLP Coaching Division: AL&CO is an Approved Institute of NLP Coaching.",
  },
  // LOGO: ABH - Khansa to supply approved artwork
  {
    board: "ABH",
    seal: sealABH,
    text: "ABH: AL&CO is an ABH Approved School of Hypnosis.",
  },

  {
    board: "TLTA",
    seal: sealTLTA,
    text: "TLTA: the Time Line Therapy Association, for your Time Line Therapy® Techniques credentials.",
  },
  // LOGO: NGH - Khansa to supply approved artwork
  {
    board: "NGH",
    seal: sealNGH,
    text: "NGH: the National Guild of Hypnotists (USA).",
  },
  // LOGO: ANLP (UK) - Khansa to supply approved artwork (the ANLP CPD badge is used until then)
  {
    board: "ANLP (UK)",
    seal: sealANLP,
    text: "ANLP (UK): accredits Arslan as a trainer, provides your CPD accreditation, and named Arslan its International Ambassador for Pakistan.",
  },
  // LOGO: AL&CO - Khansa to supply approved artwork
  {
    board: "AL&CO",
    seal: sealALCO,
    text: "AL&CO: our own Certified Practitioner of Behavioral Reengineering.",
  },
];

export default function Accredited() {
  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 bg-medium-primary bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4 sm:px-8">
        <h2 className="h2 text-center text-white mb-12">{title}</h2>

        <ul className="max-w-3xl mx-auto mt-8 space-y-4 text-white custom-text1 font-light">
          {seals.map((s) => (
            <li key={s.board} className="flex items-center gap-4">
              {s.seal ? (
                <span className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white">
                  <Image
                    src={s.seal}
                    alt={`${s.board} seal`}
                    width={64}
                    height={64}
                    className={`h-full w-full object-contain ${s.board === "AL&CO" ? "scale-[1.3]" : ""}`}
                  />
                </span>
              ) : (
                <span
                  className="shrink-0 w-16 h-16 rounded-full border border-white/40"
                  aria-hidden="true"
                />
              )}
              <span>{s.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
*/

"use client";
import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
// Seal artwork: the repo's existing board badges (also used on the level pages).
// DECISIONS v2 P7: Khansa to confirm or replace each with the current approved artwork
// (target files assets/accredited/seal-*.webp, each under 100KB).
import sealABNLP from "@/assets/level-certificate/badges/abnlp.webp";
import sealABNLPCoaching from "@/assets/level-certificate/badges/cdab.webp";
import sealABH from "@/assets/level-certificate/badges/abh.webp";
import sealNGH from "@/assets/level-certificate/badges/ngh.webp";
import sealTLTA from "@/assets/level-certificate/badges/tlta.webp";
import sealANLP from "@/assets/level-certificate/badges/cpd.webp";
import sealALCO from "@/assets/level-certificate/badges/alco.webp";

type SealLine = {
  board: string;
  seal?: StaticImageData;
  text: string;
};

// B 01 rows A28 to A30. No trademark attribution line under the list (P5).
const title = "Certified Through International Boards";

const seals: SealLine[] = [
  // LOGO: ABNLP - Khansa to supply approved artwork
  {
    board: "ABNLP",
    seal: sealABNLP,
    text: "ABNLP: AL&CO is an ABNLP Approved Institute of NLP.",
  },
  // LOGO: ABNLP Coaching Division - Khansa to supply approved artwork
  {
    board: "ABNLP Coaching Division",
    seal: sealABNLPCoaching,
    text: "ABNLP Coaching Division: AL&CO is an Approved Institute of NLP Coaching.",
  },
  // LOGO: ABH - Khansa to supply approved artwork
  {
    board: "ABH",
    seal: sealABH,
    text: "ABH: AL&CO is an ABH Approved School of Hypnosis.",
  },

  {
    board: "TLTA",
    seal: sealTLTA,
    text: "TLTA: the Time Line Therapy Association, for your Time Line Therapy® Techniques credentials.",
  },
  // LOGO: NGH - Khansa to supply approved artwork
  {
    board: "NGH",
    seal: sealNGH,
    text: "NGH: the National Guild of Hypnotists (USA).",
  },
  // LOGO: ANLP (UK) - Khansa to supply approved artwork (the ANLP CPD badge is used until then)
  {
    board: "ANLP (UK)",
    seal: sealANLP,
    text: "ANLP (UK): accredits Arslan as a trainer, provides your CPD accreditation, and named Arslan its International Ambassador for Pakistan.",
  },
  // LOGO: AL&CO - Khansa to supply approved artwork
  {
    board: "AL&CO",
    seal: sealALCO,
    text: "AL&CO: our own Certified Practitioner of Behavioral Reengineering.",
  },
];

export default function Accredited() {
  const listRef = useRef<HTMLUListElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 bg-medium-primary bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4 sm:px-8">
        <h2 className="h2 text-center text-secondary mb-12">{title}</h2>

                <ul ref={listRef} className="relative max-w-3xl mx-auto mt-8 space-y-4 text-white custom-text1 font-light">
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute left-8 top-8 bottom-8 w-px origin-top bg-gradient-to-b from-secondary/0 via-secondary/70 to-secondary/0 transition-transform duration-[1600ms] motion-reduce:hidden ${
              shown ? "scale-y-100" : "scale-y-0"
            }`}
          />
          {seals.map((s, i) => (
            <li
              key={s.board}
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`group relative flex items-center gap-4 transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {s.seal ? (
                <Image
                  src={s.seal}
                  alt={`${s.board} seal`}
                  width={64}
                  height={64}
                  className="relative shrink-0 rounded-full bg-white object-contain transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_0_4px_rgba(255,255,255,0.25)]"
                />
              ) : (
                <span className="shrink-0 w-16 h-16 rounded-full border border-white/40" aria-hidden="true" />
              )}
              <span className="transition-colors duration-300 group-hover:text-secondary">{s.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
