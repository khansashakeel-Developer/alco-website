"use client";
// Interactive version of the intro on /one-on-one-coaching-sessions.
// Same approved wording as PrivateCoachingSections.tsx. Left: three clickable topics. Right: a two-tab credentials card.
import React, { useState } from "react";
import Image from "next/image";
import { CTA, ctaDataAttrs } from "@/component/cta";
import LevelProgram1 from "@/assets/level-program-included/program-1.webp";

const TOPICS = [
  {
    label: "A handful, by design",
    text: "Separate from every programme we teach, Arslan takes a very small number of private coaching clients each year, only a handful, by design. This is his most intensive work: a full year alongside one person, for the most complex, high-stakes personal transformations.",
  },
  {
    label: "One window",
    text: "What makes it rare is the way it is held. Arslan’s own role is coaching, guiding and steering, and where a case calls for expertise beyond coaching, a panel of independent, qualified professionals, which can include psychiatrists, psychologists, psychotherapists and counsellors, is engaged alongside him, each with the client’s consent and proper referral. The result is one window: the client is supported in a single, coordinated place, and never left to run from one professional to another.",
  },
  {
    label: "Your own framework",
    text: "Every engagement is built as its own framework, underpinned by structured documentation and research, and begins with a personal conversation to establish fit. Places are strictly limited, and the investment is by discussion.",
  },
];

const ABOUT = [
  "Pakistan’s first Certified Master Trainer of NLP (ABNLP) and of Hypnosis (ABH)",
  "ANLP Accredited Master Trainer (UK), and Master Trainer under Robert Dilts at NLP University",
];

const HOWITWORKS = [
  "A full year alongside one person, for the most complex, high-stakes personal transformations",
  "A panel of independent, qualified professionals engaged alongside him where a case calls for it, with your consent and proper referral",
  "Members of his team brought in at his own discretion, where it serves the case",
  "Only a handful of clients each year, at Arslan’s discretion",
];

export default function CoachingIntro() {
  const [topic, setTopic] = useState(0);
  const [tab, setTab] = useState<"about" | "how">("about");
  const list = tab === "about" ? ABOUT : HOWITWORKS;

  return (
    <section className="bg-white py-8 md:py-12 lg:py-16 sm:px-4">
      <style>{`@keyframes pcFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.pc-fade{animation:pcFade .35s ease both}@media (prefers-reduced-motion:reduce){.pc-fade{animation:none}}`}</style>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: clickable topics */}
          <div className="lg:col-span-7 font-outfit text-gray-700 text-base md:text-lg leading-relaxed">
            <h2 className="h4 font-semibold text-start text-primary">A full year, alongside one person</h2>

            <div role="tablist" aria-label="About private coaching" className="mt-5 flex flex-wrap gap-2">
              {TOPICS.map((t, i) => (
                <button
                  key={t.label}
                  role="tab"
                  type="button"
                  aria-selected={topic === i}
                  onClick={() => setTopic(i)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    topic === i
                      ? "border-secondary bg-secondary text-primary-darkest shadow-md"
                      : "border-primary/20 bg-white text-primary hover:border-secondary hover:-translate-y-0.5"
                  }`}
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${topic === i ? "bg-primary-darkest text-white" : "bg-primary/10"}`}>{i + 1}</span>
                  {t.label}
                </button>
              ))}
            </div>

            <div key={topic} role="tabpanel" className="pc-fade mt-5 min-h-[180px] border-l-4 border-secondary pl-5">
              <p>{TOPICS[topic].text}</p>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => setTopic((topic + 1) % TOPICS.length)}
                  className="font-semibold text-primary underline-offset-4 hover:text-secondary-dark hover:underline"
                >
                  {topic === TOPICS.length - 1 ? "Back to the start ↺" : "Next →"}
                </button>
                <span className="text-gray-400">{topic + 1} of {TOPICS.length}</span>
              </div>
            </div>

            <p className="mt-6 border-l-4 border-secondary bg-primary/5 rounded-r-lg px-5 py-4 font-semibold text-primary">
              This is Arslan’s own work. Where it serves a case, he brings in members of his team, at his own discretion.
            </p>
          </div>

          {/* Right: credentials card with two tabs */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-primary-darkest text-white shadow-xl p-6 lg:p-7">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 shrink-0 p-3 bg-primary rounded-lg">
                  <Image src={LevelProgram1} alt="Arslan Larik, private coaching" width={100} height={100} className="object-cover" />
                </div>
                <div>
                  <h2 className="font-outfit text-2xl font-semibold text-secondary leading-tight">Working with Arslan</h2>
                  <p className="font-outfit text-sm text-white/80">Private coaching with Arslan Larik</p>
                </div>
              </div>

              <p className="mt-5 inline-block rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-primary-darkest">By application only</p>

              {/* Segmented switch */}
              <div role="tablist" aria-label="Working with Arslan" className="mt-4 grid grid-cols-2 rounded-full bg-white/10 p-1 text-sm font-semibold">
                {([["about", "About Arslan"], ["how", "How it works"]] as const).map(([key, label]) => (
                  <button
                    key={key}
                    role="tab"
                    type="button"
                    aria-selected={tab === key}
                    onClick={() => setTab(key)}
                    className={`rounded-full py-2 transition-all duration-300 ${tab === key ? "bg-secondary text-primary-darkest shadow" : "text-white/80 hover:text-white"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <ul key={tab} className="pc-fade mt-4 min-h-[210px] space-y-3 font-outfit text-sm md:text-base leading-relaxed">
                {list.map((line) => (
                  <li key={line} className="group flex gap-3 transition-transform duration-300 hover:translate-x-1">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary transition-transform group-hover:scale-150" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/20 pt-4 font-outfit text-sm">
                <div>
                  <dt className="text-white/70">Length</dt>
                  <dd className="font-semibold">A full year</dd>
                </div>
                <div>
                  <dt className="text-white/70">Investment</dt>
                  <dd className="font-semibold">By discussion</dd>
                </div>
              </dl>

              <p className="mt-4 font-outfit text-sm">
                <strong>How to apply:</strong>{" "}
                <a className="underline text-secondary" href={CTA.C7.href} {...ctaDataAttrs("C7")}>{CTA.C7.label}</a> (connect@arslanlarik.com)
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}