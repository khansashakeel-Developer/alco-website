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
  {
    board: "ABNLP",
    seal: sealABNLP,
    text: "ABNLP: AL&CO is an ABNLP Approved Institute of NLP.",
  },
  {
    board: "ABNLP Coaching Division",
    seal: sealABNLPCoaching,
    text: "ABNLP Coaching Division: AL&CO is an Approved Institute of NLP Coaching.",
  },
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
  {
    board: "NGH",
    seal: sealNGH,
    text: "NGH: the National Guild of Hypnotists (USA).",
  },
  {
    board: "ANLP (UK)",
    seal: sealANLP,
    text: "ANLP (UK): accredits Arslan as a trainer, provides your CPD accreditation, and named Arslan its International Ambassador for Pakistan.",
  },
  {
    board: "AL&CO",
    seal: sealALCO,
    text: "AL&CO: our own Certified Practitioner of Behavioral Reengineering.",
  },
];

export default function Accredited() {
  const listRef = useRef<HTMLUListElement>(null);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState(0);

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
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#1B507C] via-[#0E3556] to-[#09263D] py-10 md:py-14 lg:py-16 xl:py-20">
      <style>{`@keyframes accFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}.acc-fade{animation:accFade .3s ease both}@media (prefers-reduced-motion:reduce){.acc-fade{animation:none}}`}</style>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">Certifications</p>
          <h2 className="h2 mt-3 text-white">{title}</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-16 rounded-full bg-secondary" />
        </div>

        {/* All seals in one line (scrolls sideways on small phones) */}
        <ul
          ref={listRef}
          className="mx-auto mt-12 flex max-w-6xl snap-x items-start gap-4 overflow-x-auto px-1 pb-4 md:overflow-visible md:pb-0"
        >
          {seals.map((s, i) => (
            <li
              key={s.board}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`w-28 shrink-0 snap-center transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none md:w-auto md:flex-1 ${
                shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                aria-label={s.board}
                className="group flex w-full flex-col items-center text-center focus:outline-none"
              >
                                {s.seal && (
                  <span
                    className={`block h-24 w-24 shrink-0 overflow-hidden rounded-full bg-white shadow-xl ring-4 transition-all duration-300 md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32 ${
                      active === i
                        ? "-translate-y-2 scale-110 ring-secondary"
                        : "ring-white/10 group-hover:-translate-y-1 group-hover:ring-secondary/60"
                    }`}
                  >
                    <Image
                      src={s.seal}
                      alt={`${s.board} seal`}
                      width={160}
                      height={160}
                      className={`h-full w-full object-contain ${s.board === "AL&CO" ? "scale-[1.3]" : ""}`}
                    />
                  </span>
                )}
                <span
                  className={`mt-4 font-outfit text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
                    active === i ? "text-secondary" : "text-white/60 group-hover:text-white"
                  }`}
                >
                  {s.board}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* One shared description line */}
        <div className="mx-auto mt-8 max-w-3xl border-t border-white/15 pt-6 text-center" aria-live="polite">
          <p key={active} className="acc-fade font-light text-lg leading-relaxed text-white md:text-xl">
            {seals[active].text}
          </p>
        </div>
      </div>
    </section>
  );
}