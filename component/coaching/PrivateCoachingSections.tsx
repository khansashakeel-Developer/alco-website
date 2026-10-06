// Layout sections for the private coaching page (/one-on-one-coaching-sessions).
// Server components: no hooks and no "use client", so none of this adds to the JavaScript the browser must run.
// The wording is the approved copy from the page, unchanged (DECISIONS v2 G1: exclusive to Arslan, no prices;
// G2: sensitive topics always framed as working alongside the person's medical practitioner, with proper referral).
// Only the layout is new. Every button comes from CtaButton, so it carries data-cta-id and data-gtm-event.
import React from "react";
import Link from "next/link";
import Image from "next/image";
import CtaButton from "@/component/CtaButton";
import { CTA, ctaDataAttrs } from "@/component/cta";
import LevelProgram1 from "@/assets/level-program-included/program-1.webp";

const FACTS = [
  { big: "A full year", small: "alongside one person" },
  { big: "A handful", small: "of private clients each year, by design" },
  { big: "By application", small: "places offered at Arslan’s discretion" },
  { big: "One window", small: "a single, coordinated place of support" },
];

/** Four quick facts that overlap the bottom of the banner. */
export function CoachingKeyFacts() {
  return (
    <section aria-label="Private coaching at a glance" className="relative z-10 -mt-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {FACTS.map((fact) => (
            <div key={fact.big} className="rounded-xl bg-white shadow-lg border-t-4 border-secondary p-4 sm:p-5 text-center">
              <dt className="font-outfit text-lg sm:text-2xl font-semibold text-primary">{fact.big}</dt>
              <dd className="font-outfit text-xs sm:text-sm text-gray-600 mt-1">{fact.small}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** The story on the left, and the "Working with Arslan" credentials card on the right (sticky on large screens). */
export function CoachingIntro() {
  return (
    <section className="bg-white py-8 md:py-12 lg:py-16 sm:px-4">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 font-outfit text-gray-700 text-base md:text-lg leading-relaxed">
            <h2 className="h4 font-semibold text-start text-primary">A full year, alongside one person</h2>
            <p className="mt-4">
              Separate from every programme we teach, Arslan takes a very small number of private coaching clients each year, only a handful, by design. This is his most intensive work: a full year alongside one person, for the most complex, high-stakes personal transformations.
            </p>
            <p className="mt-4">
              What makes it rare is the way it is held. Arslan’s own role is coaching, guiding and steering, and where a case calls for expertise beyond coaching, a panel of independent, qualified professionals, which can include psychiatrists, psychologists, psychotherapists and counsellors, is engaged alongside him, each with the client’s consent and proper referral. The result is one window: the client is supported in a single, coordinated place, and never left to run from one professional to another.
            </p>
            <p className="mt-4">
              Every engagement is built as its own framework, underpinned by structured documentation and research, and begins with a personal conversation to establish fit. Places are strictly limited, and the investment is by discussion.
            </p>
            <p className="mt-6 border-l-4 border-secondary bg-primary/5 rounded-r-lg px-5 py-4 font-semibold text-primary">
              This is Arslan’s own work. Where it serves a case, he brings in members of his team, at his own discretion.
            </p>
          </div>

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

              <ul className="mt-4 space-y-3 font-outfit text-sm md:text-base leading-relaxed">
                {[
                  "Pakistan’s first Certified Master Trainer of NLP (ABNLP) and of Hypnosis (ABH)",
                  "ANLP Accredited Master Trainer (UK), and Master Trainer under Robert Dilts at NLP University",
                  "A full year alongside one person, for the most complex, high-stakes personal transformations",
                  "A panel of independent, qualified professionals engaged alongside him where a case calls for it, with your consent and proper referral",
                  "Members of his team brought in at his own discretion, where it serves the case",
                  "Only a handful of clients each year, at Arslan’s discretion",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
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

const STEPS = [
  {
    title: "Write to us",
    text: "If you feel this is for you, write to our official company account, connect@arslanlarik.com, and make your case.",
  },
  {
    title: "Set out your situation",
    text: "Arslan needs full context before he can decide, so the work begins with you: set out your situation, in your own words, as fully as you can, before you submit.",
  },
  {
    title: "Arslan decides",
    text: "Places are offered entirely at Arslan’s discretion, and subject to his time and availability.",
  },
];

/** How to apply as three steps, then the fork: private coaching, or the training path. */
export function CoachingHowToApply() {
  return (
    <section className="bg-neutral-light py-8 md:py-12 lg:py-16 sm:px-4">
      <div className="container mx-auto px-4 max-w-6xl font-outfit">
        <h2 className="h4 font-semibold text-start text-primary">How to apply, and who it is for</h2>

        <ol className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {STEPS.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl bg-white p-6 shadow-md border border-primary/10">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-outfit text-lg font-bold text-primary-darkest"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-primary">{step.title}</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>

        {/* CTA plan: C7 Apply for private coaching (mailto with subject). */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 text-gray-700">
          <CtaButton id="C7" variant="secondary" className="px-6" />
          <span>or write to connect@arslanlarik.com</span>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-md border border-primary/10">
            <h3 className="text-xl font-semibold text-primary">Please read this in the spirit it is meant</h3>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Arslan works with a very specific and specialised few, most often the hardest cases, or those that call for genuine research and documentation, so that the work can stand as a case study and contribute to the literature. The scrutiny is deliberately intense, and if a place is not offered, it is never a judgement of you, and never arrogance. It simply means this particular door was not the right one at this time.
            </p>
          </div>

          <div className="flex flex-col rounded-2xl bg-primary-darkest p-6 lg:p-8 shadow-lg text-white">
            <h3 className="text-xl font-semibold text-secondary">The honest, generous truth</h3>
            <p className="mt-3 leading-relaxed text-white/90">
              If you are not in the depths of a real and heavy struggle, Arslan would rather you joined him on the{" "}
              <Link href="/programs" className="underline text-secondary" {...ctaDataAttrs("C3")}>training adventure</Link>{" "}
              instead. It asks a fraction of the investment of private coaching, you are coached and supported through your own transformation as you go, and, above all, you walk away able to coach others. For most people that is the richer path, and its door is wide open.
            </p>
            <div className="mt-auto pt-5">
              <CtaButton id="C9" label="Start with Level 1: NLP Practitioner" href="/program/nlp-practitioner" variant="secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const METHOD = [
  {
    title: "Tailored Assessment:",
    points: [
      "Identify your unique challenges, goals, and aspirations.",
      "Establish clear objectives to guide your coaching journey.",
    ],
  },
  {
    title: "Exploration and Breakthroughs:",
    points: [
      "Uncover deep-rooted beliefs and emotional barriers using advanced NLP, Time Line Therapy® Techniques and hypnosis.",
      "Gain clarity on patterns and obstacles holding you back",
    ],
  },
  {
    title: "Empowerment and Accountability:",
    points: [
      "Ensure consistent progress through follow-ups and accountability frameworks.",
      "Foster sustainable strategies for long-term success.",
    ],
  },
];

/** "Coaching Methodology" as three step cards instead of one long bullet list. */
export function CoachingMethodology() {
  return (
    <section className="bg-white py-8 md:py-12 lg:py-16 sm:px-4">
      <div className="container mx-auto px-4 max-w-6xl font-outfit">
        <h2 className="h4 font-semibold text-start text-primary">Coaching Methodology</h2>
        <p className="mt-4 text-gray-700 text-base md:text-lg leading-relaxed">
          At <strong>Arslan Larik &amp; Company,</strong> we follow a structured yet personalized approach to ensure meaningful outcomes. Sessions are conducted via Zoom, offering flexibility and accessibility for clients worldwide.
        </p>
        <p className="mt-6 mb-4 text-lg"><strong>How We Work:</strong></p>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {METHOD.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-primary/10 bg-primary/5 p-6">
              <span aria-hidden="true" className="font-outfit text-sm font-semibold tracking-widest text-primary/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-primary">{step.title}</h3>
              <ul className="mt-3 space-y-3 text-gray-700 leading-relaxed">
                {step.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="mt-6 rounded-xl border-l-4 border-secondary bg-neutral-light px-5 py-4 text-gray-700 leading-relaxed">
          Private coaching with Arslan is a year-long engagement, built as its own framework, with sessions arranged around your case.
        </p>
      </div>
    </section>
  );
}