"use client";
// Private coaching page (/one-on-one-coaching-sessions), redesigned: no wall of cards.
// Same approved wording as before (DECISIONS v2 G1/G2). Buttons are passed in from the server page as slots,
// so every CTA still comes from CtaButton and keeps its data-cta-id and data-gtm-event.
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, HeartHandshake } from "lucide-react";
import LevelProgram1 from "@/assets/level-program-included/program-1.webp";
import { CTA, ctaDataAttrs } from "@/component/cta";

/* ---------- small helpers ---------- */

// Fades and lifts into view every time it scrolls on screen. Visible without JavaScript or with reduced motion.
function Rise({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [st, setSt] = useState<"idle" | "hidden" | "shown">("idle");
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setSt(e.isIntersecting ? "shown" : "hidden"), { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={
        st === "hidden"
          ? { opacity: 0, transform: "translateY(32px)" }
          : { opacity: 1, transform: "none", transition: `opacity .8s ease ${delay}ms, transform .8s cubic-bezier(.16,1,.3,1) ${delay}ms` }
      }
    >
      {children}
    </div>
  );
}

const Styles = () => (
  <style>{`
    @keyframes cx-fade { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
    .cx-fade { animation: cx-fade .5s cubic-bezier(.16,1,.3,1) both }
    @keyframes cx-pop { 0% { transform: scale(.7); opacity: 0 } 60% { transform: scale(1.06) } 100% { transform: scale(1); opacity: 1 } }
    .cx-pop { animation: cx-pop .6s cubic-bezier(.2,.8,.2,1) both }
    @keyframes cx-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
    .cx-float { animation: cx-float 5s ease-in-out infinite }
    @media (prefers-reduced-motion: reduce) { .cx-fade, .cx-pop, .cx-float { animation: none } }
  `}</style>
);

/* ---------- 1. the four facts, one slim band ---------- */

const FACTS = [
  { big: "A full year", small: "alongside one person" },
  { big: "A handful", small: "of private clients each year, by design" },
  { big: "By application", small: "places offered at Arslan’s discretion" },
  { big: "One window", small: "a single, coordinated place of support" },
];

// One band. A gold-edged marker slides from fact to fact by itself (a thin line along the bottom shows the time left),
// follows the cursor when you move over a fact, and a soft light trails the mouse across the whole band.
// Every fact keeps its own fixed cell, so nothing moves or re-wraps while it plays.
const HOLD = 3.2; // seconds each fact is lit when it plays by itself

export function CoachingFacts() {
  const [on, setOn] = useState(0);
  const [paused, setPaused] = useState(false);
  const auto = true; // it plays by itself; hovering a fact pauses it
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setReduced(true);
  }, []);

  const pick = (i: number) => {
    setOn(i);
  };

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section aria-label="Private coaching at a glance" className="relative z-10 -mt-10 px-4">
      <Styles />
      <style>{`
        .cf-sel { width: 50%; height: 50%; transform: translate(calc(var(--c) * 100%), calc(var(--r) * 100%)); transition: transform .7s cubic-bezier(.16,1,.3,1); }
        @media (min-width: 1024px) { .cf-sel { width: 25%; height: 100%; transform: translate(calc(var(--i) * 100%), 0); } }
        @keyframes cf-line { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        .cf-line { transform-origin: left; animation: cf-line ${HOLD}s linear both }
        .cf-band::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .5s ease; border-radius: inherit;
          background: radial-gradient(380px circle at var(--mx, 50%) var(--my, 0px), rgba(249,184,30,.14), transparent 65%); }
        .cf-band:hover::before { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .cf-sel { transition: none } .cf-line { animation: none } }
      `}</style>
      <div className="container mx-auto max-w-6xl">
        <Rise>
          <div
            onPointerMove={onMove}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="cf-band relative overflow-hidden rounded-2xl bg-primary-darkest bg-dark-primary bg-cover shadow-2xl ring-1 ring-secondary/40"
          >
            {/* the sliding marker */}
            <span
              aria-hidden="true"
              className="cf-sel absolute left-0 top-0 p-1.5"
              style={{ ["--i" as string]: on, ["--c" as string]: on % 2, ["--r" as string]: Math.floor(on / 2) } as React.CSSProperties}
            >
              <span className="relative block h-full w-full rounded-xl bg-white/10 ring-1 ring-secondary/70">
                <span className="absolute inset-x-6 bottom-0 h-0.5 rounded-full bg-secondary shadow-[0_0_12px_rgba(249,184,30,.9)]" />
              </span>
            </span>

            <dl className="relative grid grid-cols-2 lg:grid-cols-4">
              {FACTS.map((f, i) => {
                const lit = on === i;
                return (
                  <div
                    key={f.big}
                    tabIndex={0}
                    onMouseEnter={() => pick(i)}
                    onFocus={() => pick(i)}
                    onClick={() => pick(i)}
                    className="relative flex min-h-[112px] cursor-default flex-col items-center justify-center px-3 py-5 text-center outline-none sm:px-5"
                  >
                    <span className={`font-outfit text-[10px] font-bold tracking-[0.35em] transition-colors duration-500 ${lit ? "text-secondary" : "text-white/35"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <dt className={`mt-1 font-outfit text-lg font-semibold transition-colors duration-500 sm:text-2xl ${lit ? "text-secondary" : "text-white/70"}`}>{f.big}</dt>
                    <dd className={`mt-1 font-outfit text-xs transition-colors duration-500 sm:text-sm ${lit ? "text-white" : "text-white/50"}`}>{f.small}</dd>
                  </div>
                );
              })}
            </dl>

            {/* time left on this fact */}
            {auto && !reduced && (
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
                <span
                  key={on}
                  className="cf-line block h-full bg-secondary/70"
                  style={{ animationPlayState: paused ? "paused" : "running" }}
                  onAnimationEnd={() => setOn((v) => (v + 1) % FACTS.length)}
                />
              </span>
            )}
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* ---------- 2. the story: three statements that light up as you read, credentials as one slim list ---------- */

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

export function CoachingStory() {
  const [topic, setTopic] = useState(0);
  const [tab, setTab] = useState<"about" | "how">("about");
  const list = tab === "about" ? ABOUT : HOWITWORKS;

  return (
    <section className="bg-white py-10 md:py-14 lg:py-20 sm:px-4">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* left: the story, as a vertical list you open */}
          <div className="font-outfit lg:col-span-7">
            <Rise>
              <h2 className="h4 text-start font-semibold text-primary">A full year, alongside one person</h2>
              <span aria-hidden="true" className="mt-3 block h-1 w-16 rounded-full bg-secondary" />
            </Rise>

            <ul className="mt-8">
              {TOPICS.map((t, i) => {
                const open = topic === i;
                return (
                  <li key={t.label} className="border-b border-primary/10 first:border-t">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setTopic(i)}
                      onMouseEnter={() => window.matchMedia("(min-width:1024px)").matches && setTopic(i)}
                      className="group flex w-full items-center gap-5 py-5 text-start outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                    >
                      <span className={`font-outfit text-4xl font-extrabold leading-none transition-colors duration-500 md:text-5xl ${open ? "text-secondary" : "text-primary/15 group-hover:text-primary/30"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`flex-1 font-outfit text-xl font-semibold transition-colors duration-300 md:text-2xl ${open ? "text-primary" : "text-primary/60 group-hover:text-primary"}`}>{t.label}</span>
                      <ChevronRight aria-hidden="true" size={22} className={`shrink-0 text-secondary-dark transition-transform duration-500 ${open ? "rotate-90" : ""}`} />
                    </button>
                    <div className={`grid transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="pb-6 pl-0 text-base leading-relaxed text-gray-700 md:pl-[4.5rem] md:text-lg">{t.text}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Rise delay={100}>
              <p className="mt-8 border-l-4 border-secondary pl-5 text-lg font-semibold leading-relaxed text-primary">
                This is Arslan’s own work. Where it serves a case, he brings in members of his team, at his own discretion.
              </p>
            </Rise>
          </div>

          {/* right: working with Arslan, compact: title band, a two-way switch, only the open list, one footer */}
          <Rise delay={150} className="lg:col-span-5 lg:sticky lg:top-28">
            <aside className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-primary/10">
              <div className="relative flex items-center gap-4 bg-primary-darkest bg-dark-primary bg-cover px-5 py-4 text-white lg:px-6">
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-secondary-dark via-secondary to-[#FFE29D]" />
                <div className="h-12 w-12 shrink-0 rounded-xl bg-primary p-2.5">
                  <Image src={LevelProgram1} alt="Arslan Larik, private coaching" width={100} height={100} className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-outfit text-xl font-semibold leading-tight text-secondary">Working with Arslan</h2>
                  <p className="font-outfit text-sm text-white/80">Private coaching with Arslan Larik</p>
                </div>
                <span className="hidden shrink-0 rounded-full border border-secondary/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary sm:block">By application only</span>
              </div>

              <div className="px-5 pb-4 pt-4 font-outfit lg:px-6">
                <p className="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary-darkest sm:hidden">By application only</p>

                <div role="tablist" aria-label="Working with Arslan" className="relative grid grid-cols-2 rounded-full bg-primary/10 p-1 text-sm font-semibold">
                  <span aria-hidden="true" className="absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-primary-darkest shadow transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]" style={{ transform: `translateX(${tab === "about" ? 0 : 100}%)` }} />
                  {([["about", "About Arslan"], ["how", "How it works"]] as const).map(([key, label]) => (
                    <button key={key} role="tab" type="button" aria-selected={tab === key} onClick={() => setTab(key)} className={`relative z-10 rounded-full py-2 transition-colors duration-300 ${tab === key ? "text-secondary" : "text-primary/70 hover:text-primary"}`}>
                      {label}
                    </button>
                  ))}
                </div>

                <ul key={tab} className="cx-fade mt-3 space-y-0.5">
                  {list.map((line) => (
                    <li key={line} className="group relative rounded-lg py-2 pl-4 pr-2 text-sm leading-snug text-gray-700 transition-colors duration-300 hover:bg-secondary/10 hover:text-primary-darkest">
                      <span aria-hidden="true" className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-secondary/60 transition-all duration-300 group-hover:w-1 group-hover:bg-secondary" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-primary/10 bg-[#FAF8EC] px-5 py-3 font-outfit text-sm lg:px-6">
                <dl className="flex flex-wrap gap-x-8 gap-y-1">
                  <div className="flex gap-2">
                    <dt className="text-primary/60">Length</dt>
                    <dd className="font-semibold text-primary">A full year</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-primary/60">Investment</dt>
                    <dd className="font-semibold text-primary">By discussion</dd>
                  </div>
                </dl>
                <p className="mt-2 text-primary-darkest">
                  <strong>How to apply:</strong>{" "}
                  <a className="font-semibold underline decoration-secondary decoration-2 underline-offset-2" href={CTA.C7.href} {...ctaDataAttrs("C7")}>{CTA.C7.label}</a> (connect@arslanlarik.com)
                </p>
              </div>
            </aside>
          </Rise>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. how to apply: one road with three stops, then two halves ---------- */

const STEPS = [
  { title: "Write to us", text: "If you feel this is for you, write to our official company account, connect@arslanlarik.com, and make your case." },
  { title: "Set out your situation", text: "Arslan needs full context before he can decide, so the work begins with you: set out your situation, in your own words, as fully as you can, before you submit." },
  { title: "Arslan decides", text: "Places are offered entirely at Arslan’s discretion, and subject to his time and availability." },
];

export function CoachingApply({ applyButton, startButton }: { applyButton: React.ReactNode; startButton: React.ReactNode }) {
  const road = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0); // 0..1 how far the gold line has run

  useEffect(() => {
    const el = road.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      setP(Math.min(1, Math.max(0, (window.innerHeight * 0.75 - r.top) / (r.height + window.innerHeight * 0.2))));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-neutral-light py-10 md:py-14 lg:py-20 sm:px-4">
      <div className="container mx-auto max-w-6xl px-4 font-outfit">
        <Rise>
          <h2 className="h4 text-start font-semibold text-primary">How to apply, and who it is for</h2>
          <span aria-hidden="true" className="mt-3 block h-1 w-16 rounded-full bg-secondary" />
        </Rise>

        {/* the road */}
        <ol ref={road} className="relative mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* phone: a vertical line down the left; desktop: a line across, behind the three circles */}
          <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-1 rounded-full bg-primary/15 md:hidden">
            <span className="block w-full rounded-full bg-gradient-to-b from-secondary to-secondary-dark shadow-[0_0_12px_rgba(249,184,30,.7)]" style={{ height: `${p * 100}%` }} />
          </span>
          <span aria-hidden="true" className="absolute left-[16.66%] right-[16.66%] top-[27px] hidden h-1 rounded-full bg-primary/15 md:block">
            <span className="block h-full rounded-full bg-gradient-to-r from-secondary to-secondary-dark shadow-[0_0_12px_rgba(249,184,30,.7)]" style={{ width: `${p * 100}%` }} />
          </span>
          {STEPS.map((s, i) => {
            const reached = p > (i + 0.35) / 3;
            return (
              <li key={s.title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
                <span
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-outfit text-xl font-bold ring-8 ring-neutral-light transition-all duration-700 ${
                    reached ? "scale-110 bg-secondary text-primary-darkest shadow-[0_0_0_6px_rgba(249,184,30,.3)]" : "bg-primary text-white"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="md:mt-5">
                  <h3 className="text-xl font-semibold text-primary">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-gray-700">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <Rise delay={100} className="mt-10 flex flex-col gap-4 text-gray-700 sm:flex-row sm:items-center md:justify-center">
          {applyButton}
          <span>or write to connect@arslanlarik.com</span>
        </Rise>

        {/* the fork: two halves of one band */}
        <Rise delay={100}>
          <div className="mt-14 grid overflow-hidden rounded-3xl shadow-2xl md:grid-cols-2">
            <div className="bg-white p-6 lg:p-10">
              <h3 className="text-xl font-semibold text-primary md:text-2xl">Please read this in the spirit it is meant</h3>
              <p className="mt-4 leading-relaxed text-gray-700">
                Arslan works with a very specific and specialised few, most often the hardest cases, or those that call for genuine research and documentation, so that the work can stand as a case study and contribute to the literature. The scrutiny is deliberately intense, and if a place is not offered, it is never a judgement of you, and never arrogance. It simply means this particular door was not the right one at this time.
              </p>
            </div>
            <div className="relative flex flex-col bg-primary-darkest bg-dark-primary bg-cover p-6 text-white lg:p-10">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-1 bg-gradient-to-b from-secondary to-secondary-dark md:block" />
              <h3 className="text-xl font-semibold text-secondary md:text-2xl">The honest, generous truth</h3>
              <p className="mt-4 leading-relaxed text-white/90">
                If you are not in the depths of a real and heavy struggle, Arslan would rather you joined him on the{" "}
                <Link href="/programs" className="text-secondary underline" {...ctaDataAttrs("C3")}>training adventure</Link>{" "}
                instead. It asks a fraction of the investment of private coaching, you are coached and supported through your own transformation as you go, and, above all, you walk away able to coach others. For most people that is the richer path, and its door is wide open.
              </p>
              <div className="mt-auto pt-6">{startButton}</div>
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* ---------- 4. what we address: a stage and a cloud of topics ---------- */

export type AddressItem = { title: string; src: string; text: string };

// A big reading stage on top, every topic as a pill underneath. Pick a pill and the stage changes: the title
// rises word by word. Left alone, it walks through the topics by itself (a thin line shows the time left);
// the moment you touch anything it stops and leaves the choice to you. It also pauses while the cursor is on the stage.
const STAY = 9; // seconds each topic stays when it plays by itself

export function CoachingAddress({ items, note }: { items: AddressItem[]; note: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(false); // starts when the section is on screen
  const [paused, setPaused] = useState(false);
  const n = items.length;

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setAuto(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pick = (i: number) => {
    setAuto(false); // the visitor is in charge now
    setCur((i + n) % n);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className="relative overflow-hidden bg-primary-darkest bg-dark-primary bg-cover py-12 text-white md:py-16 lg:py-24 sm:px-4">
      <style>{`
        @keyframes cx-word { from { transform: translateY(105%) } to { transform: none } }
        .cx-word { animation: cx-word .7s cubic-bezier(.16,1,.3,1) both }
        @keyframes cx-prog { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        .cx-prog { transform-origin: left; animation: cx-prog ${STAY}s linear both }
        @keyframes cx-aurora { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(40px,-30px) scale(1.15) } }
        .cx-aurora { animation: cx-aurora 14s ease-in-out infinite }
        .cx-stage::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .5s ease; border-radius: inherit;
          background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 0px), rgba(249,184,30,.16), transparent 65%); }
        .cx-stage:hover::before { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .cx-word, .cx-prog, .cx-aurora { animation: none } }
      `}</style>
      <span aria-hidden="true" className="cx-aurora pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      <span aria-hidden="true" className="cx-aurora pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-primary-light/20 blur-3xl" style={{ animationDelay: "-6s" }} />

      <div ref={root} className="container relative mx-auto max-w-6xl px-4 font-outfit">
        <Rise>
          <h2 className="h3 text-center text-white">What We Address</h2>
          <span aria-hidden="true" className="mx-auto mt-3 block h-1 w-16 rounded-full bg-secondary" />
          <div className="mx-auto mt-6 flex max-w-4xl items-start gap-3 rounded-xl border-l-4 border-secondary bg-white p-4 text-start shadow-sm">
            <HeartHandshake aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <p className="text-base text-gray-700">{note}</p>
          </div>
        </Rise>

        {/* the stage */}
        <Rise delay={100} className="mt-10">
          <div
            onPointerMove={onMove}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="cx-stage relative overflow-hidden rounded-3xl bg-[#FAF8EC] p-6 text-primary shadow-2xl ring-1 ring-secondary/50 md:p-10 lg:p-14"
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary-dark via-secondary to-[#FFE29D]" />

            <div className="flex items-center gap-4">
              <span className="font-outfit text-sm font-semibold tracking-[0.3em] text-secondary-dark">
                {String(cur + 1).padStart(2, "0")} / {n}
              </span>
              <span aria-hidden="true" className="h-0.5 flex-1 overflow-hidden rounded-full bg-primary/15">
                {auto && (
                  <span
                    key={cur}
                    className="cx-prog block h-full bg-secondary-dark"
                    style={{ animationPlayState: paused ? "paused" : "running" }}
                    onAnimationEnd={() => setCur((c) => (c + 1) % n)}
                  />
                )}
              </span>
              <div className="flex gap-2">
                <button type="button" aria-label="Previous topic" onClick={() => pick(cur - 1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 text-primary transition hover:bg-primary/10">
                  <ArrowLeft size={16} aria-hidden="true" />
                </button>
                <button type="button" aria-label="Next topic" onClick={() => pick(cur + 1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary-darkest shadow-md transition hover:-translate-y-0.5">
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {items.map((it, i) => (
              <div key={it.title} role="tabpanel" id={`cx-panel-${i}`} aria-labelledby={`cx-tab-${i}`} hidden={cur !== i} className={cur === i ? "block" : "hidden"}>
                <h3 className="relative mt-8 text-3xl font-semibold leading-[1.1] text-primary md:text-5xl lg:text-6xl">
                  {cur === i
                    ? it.title.split(" ").map((w, k) => (
                        <span key={k} className="inline-block overflow-hidden align-bottom">
                          <span className="cx-word inline-block pb-1" style={{ animationDelay: `${k * 70}ms` }}>{w}&nbsp;</span>
                        </span>
                      ))
                    : it.title}
                </h3>
                <p key={`t-${cur}`} className={`relative mt-6 max-w-3xl text-base leading-relaxed text-gray-700 md:text-xl ${cur === i ? "cx-fade" : ""}`} style={{ animationDelay: "300ms" }}>
                  {it.text}
                </p>
              </div>
            ))}
          </div>
        </Rise>

        {/* every topic */}
        <Rise delay={150}>
          <div role="tablist" aria-label="What we address" className="mt-8 flex flex-wrap justify-center gap-2.5">
            {items.map((it, i) => {
              const on = cur === i;
              return (
                <button
                  key={it.title}
                  type="button"
                  role="tab"
                  id={`cx-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`cx-panel-${i}`}
                  onClick={() => pick(i)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-secondary ${
                    on
                      ? "border-secondary bg-secondary text-primary-darkest shadow-[0_0_24px_rgba(249,184,30,.5)]"
                      : "border-white/25 bg-white/5 text-white/85 hover:-translate-y-0.5 hover:border-secondary hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className={`text-xs tabular-nums ${on ? "text-primary-darkest/70" : "text-secondary"}`}>{String(i + 1).padStart(2, "0")}</span>
                  {it.title}
                </button>
              );
            })}
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* ---------- 5. methodology: three phases on one line ---------- */

const METHOD = [
  { title: "Tailored Assessment:", points: ["Identify your unique challenges, goals, and aspirations.", "Establish clear objectives to guide your coaching journey."] },
  { title: "Exploration and Breakthroughs:", points: ["Uncover deep-rooted beliefs and emotional barriers using advanced NLP, Time Line Therapy® Techniques and hypnosis.", "Gain clarity on patterns and obstacles holding you back"] },
  { title: "Empowerment and Accountability:", points: ["Ensure consistent progress through follow-ups and accountability frameworks.", "Foster sustainable strategies for long-term success."] },
];

export function CoachingMethod() {
  const [on, setOn] = useState(0);
  return (
    <section className="bg-white py-10 md:py-14 lg:py-20 sm:px-4">
      <div className="container mx-auto max-w-6xl px-4 font-outfit">
        <Rise>
          <h2 className="h4 text-start font-semibold text-primary">Coaching Methodology</h2>
          <span aria-hidden="true" className="mt-3 block h-1 w-16 rounded-full bg-secondary" />
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-gray-700 md:text-lg">
            At <strong>Arslan Larik &amp; Company,</strong> we follow a structured yet personalized approach to ensure meaningful outcomes. Sessions are conducted via Zoom, offering flexibility and accessibility for clients worldwide.
          </p>
          <p className="mb-6 mt-6 text-lg"><strong>How We Work:</strong></p>
        </Rise>

        {/* three phases that open as you hover or tap them */}
        <Rise delay={100}>
          <ol className="grid gap-4 lg:grid-cols-3 lg:gap-6">
            {METHOD.map((m, i) => {
              const open = on === i;
              return (
                <li
                  key={m.title}
                  onMouseEnter={() => window.matchMedia("(min-width:1024px)").matches && setOn(i)}
                  onClick={() => setOn(i)}
                  className={`relative cursor-pointer overflow-hidden rounded-3xl p-6 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] lg:p-8 ${
                    open ? "-translate-y-1.5 bg-primary-darkest bg-dark-primary bg-cover text-white shadow-2xl ring-1 ring-secondary/50" : "bg-primary/5 text-primary"
                  }`}
                >
                  <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-secondary-dark via-secondary to-[#FFE29D] transition-transform duration-700 ${open ? "scale-x-100" : "scale-x-0"}`} />
                  <span aria-hidden="true" className={`absolute -right-2 -top-4 select-none font-outfit text-8xl font-extrabold leading-none ${open ? "text-secondary/25" : "text-primary/10"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={`relative text-xl font-semibold ${open ? "text-secondary" : "text-primary"}`}>{m.title}</h3>
                  <ul className={`relative mt-4 space-y-3 leading-relaxed transition-colors duration-500 ${open ? "text-white/90" : "text-gray-700"}`}>
                    {m.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </Rise>

        <Rise delay={100}>
          <p className="mt-8 border-l-4 border-secondary pl-5 leading-relaxed text-gray-700">
            Private coaching with Arslan is a year-long engagement, built as its own framework, with sessions arranged around your case.
          </p>
        </Rise>
      </div>
    </section>
  );
}