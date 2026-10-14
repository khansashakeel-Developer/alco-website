"use client";

import { useEffect, useState } from "react";

// If your old file had different wording for items 2-4, paste it here.
const ITEMS = [
  {
    label: "Not sure yet?",
    text: "Not sure yet? That is exactly what our weekly webinar is for. Once a week we open a free, live introductory session for anyone exploring this world, a relaxed hour to understand what NLP really is, to feel the way we teach, and to ask anything you like before you decide a single thing.",
  },
  {
    label: "A real person, in a real room",
    text: "The webinar is hosted live by a real person, not a recording. You hear the questions, you see how a session runs, and you get a true feel for how we teach before you commit to anything.",
  },
  {
    label: "For those still deciding",
    text: "If you are still weighing things up, come along first. There is nothing to prepare, and you can ask whatever you need to before choosing a level.",
  },
  {
    label: "New to AL&CO?",
    text: "If you have never heard of us, this is the easiest place to start. You will meet the people behind the programmes and see how a session really feels.",
  },
];

const QUESTIONS = [
  "What is NLP, really?",
  "How do you teach, exactly?",
  "Is this right for me?",
  "Which level should I start with?",
];

// Illustrative sample names only (not real attendees). Edit freely.
const GUESTS = [
  { name: "Sara", avatar: "bg-[#F9B81E] text-[#071a33]" },
  { name: "James", avatar: "bg-[#2B6CA3] text-white" },
  { name: "Priya", avatar: "bg-[#8fc1e8] text-[#071a33]" },
  { name: "Omar", avatar: "bg-white text-[#1B507C]" },
];

// who: 0 = host, 1-4 = guests (index + 1 in GUESTS)
const SCRIPT = [
  { who: 0, caption: "Welcome. A relaxed hour, no jargon." },
  { who: 1, caption: `Sara: ${QUESTIONS[0]}` },
  { who: 0, caption: "This is how we teach." },
  { who: 3, caption: `Priya: ${QUESTIONS[2]}` },
  { who: 0, caption: "Take your time to decide." },
  { who: 4, caption: `Omar: ${QUESTIONS[3]}` },
  { who: 0, caption: "Ask anything you like." },
  { who: 2, caption: `James: ${QUESTIONS[1]}` },
];

const TILE_BG = [
  "from-[#1B507C] to-[#0b2545]",
  "from-[#12395c] to-[#2B6CA3]",
  "from-[#0b2545] to-[#1B507C]",
  "from-[#2B6CA3] to-[#12395c]",
  "from-[#12395c] to-[#0b2545]",
];

function Person({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <circle cx="50" cy="36" r="17" />
      <path d="M16 100c0-24 15-36 34-36s34 12 34 36z" />
    </svg>
  );
}

function Wave() {
  return (
    <span aria-hidden className="flex h-4 items-end gap-[3px]">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-[#F9B81E]"
          style={{ animation: `ww-bar 0.9s ease-in-out ${i * 0.12}s infinite` }}
        />
      ))}
    </span>
  );
}

function Ctl({
  children,
  gold = false,
}: {
  children: React.ReactNode;
  gold?: boolean;
}) {
  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-full ${
        gold ? "bg-[#F9B81E] text-[#071a33]" : "bg-white/10 text-white/80"
      }`}
    >
      {children}
    </span>
  );
}

function WebinarWindow({ cta }: { cta: React.ReactNode }) {
  const [s, setS] = useState(0);
  const [q, setQ] = useState(0);
  const [typed, setTyped] = useState(QUESTIONS[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setS((n) => (n + 1) % SCRIPT.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const full = QUESTIONS[q];
    let i = 0;
    let hold: ReturnType<typeof setTimeout>;
    setTyped("");
    const t = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(t);
        hold = setTimeout(() => setQ((n) => (n + 1) % QUESTIONS.length), 2200);
      }
    }, 55);
    return () => {
      clearInterval(t);
      clearTimeout(hold);
    };
  }, [q]);

  const speaking = SCRIPT[s].who;
  const ring = "ring-2 ring-[#F9B81E] shadow-[0_0_0_4px_rgba(249,184,30,0.18)]";

  return (
    <div className="mx-auto w-full max-w-[540px] lg:ml-auto">
      <style>{`
        @keyframes ww-bar { 0%,100% { height: 20% } 50% { height: 100% } }
        @keyframes ww-cap { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
      `}</style>

      <div className="overflow-hidden rounded-2xl border border-[#0b2545]/15 bg-white shadow-[0_30px_60px_-20px_rgba(7,26,51,0.45)]">
        {/* window bar */}
        <div className="flex items-center gap-3 bg-[#071a33] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          </div>
          <p className="flex-1 truncate text-center text-xs font-semibold tracking-wide text-white/80">
            AL&amp;CO · Free weekly webinar
          </p>
          <span className="flex items-center gap-1.5 rounded-full bg-[#F9B81E] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#071a33]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#071a33]/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#071a33]" />
            </span>
            Live
          </span>
        </div>

        {/* the room */}
        <div className="bg-[#071a33] px-3 pb-3 pt-1 md:px-4">
          {/* host */}
          <div
            className={`relative flex h-[170px] items-end justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1B507C] to-[#0b2545] transition-all duration-500 md:h-[200px] ${
              speaking === 0 ? ring : "ring-1 ring-white/10"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/og/bismillah-pervez.webp"
              alt="Bismillah, your webinar host"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#071a33]/70 to-transparent"
            />
            <span className="absolute left-3 top-3 rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
              Bismillah · Your host
            </span>
            {speaking === 0 && (
              <span className="absolute right-3 top-3 rounded-full bg-black/35 p-2 backdrop-blur-sm">
                <Wave />
              </span>
            )}
          </div>

          {/* guests, cameras off: initials + names */}
          <div className="mt-2 grid grid-cols-4 gap-2">
            {GUESTS.map((g, i) => {
              const n = i + 1;
              return (
                <div
                  key={g.name}
                  className={`relative flex h-[74px] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br transition-all duration-500 md:h-[84px] ${TILE_BG[n]} ${
                    speaking === n ? ring : "ring-1 ring-white/10"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold md:h-10 md:w-10 md:text-base ${g.avatar}`}
                  >
                    {g.name[0]}
                  </span>
                  <span className="absolute bottom-1 left-1.5 rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {g.name}
                  </span>
                  {speaking === n && (
                    <span className="absolute right-1.5 top-1.5 rounded-full bg-black/35 p-1">
                      <Wave />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* live caption */}
          <div className="mt-3 flex min-h-[44px] items-center justify-center rounded-lg bg-black/30 px-4 py-2">
            <p
              key={s}
              className="text-center text-sm font-medium text-white"
              style={{ animation: "ww-cap 0.5s ease forwards" }}
            >
              {SCRIPT[s].caption}
            </p>
          </div>

          {/* controls */}
          <div className="mt-3 flex items-center justify-center gap-3">
            <Ctl>
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
              </svg>
            </Ctl>
            <Ctl>
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="6" width="12" height="12" rx="2" />
                <path d="M15 10l6-3v10l-6-3z" strokeLinejoin="round" />
              </svg>
            </Ctl>
            <Ctl>
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 5h16v11H9l-5 4z" strokeLinejoin="round" />
              </svg>
            </Ctl>
            <Ctl gold>
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M8 13V6a1.5 1.5 0 0 1 3 0v5m0-6a1.5 1.5 0 0 1 3 0v6m0-4a1.5 1.5 0 0 1 3 0v7a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-3a1.5 1.5 0 0 1 2.5-1.5L8 15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Ctl>
          </div>
        </div>

        {/* ask anything + CTA */}
        <div className="space-y-4 bg-white p-4 md:p-5">
          <div
            aria-hidden
            className="flex items-center gap-3 rounded-xl border border-[#1B507C]/20 bg-[#f3f7fb] px-4 py-3"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B507C]/60">
              Ask
            </span>
            <p className="min-h-[1.25rem] flex-1 truncate text-sm text-[#0b2545]">
              {typed}
              <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-[#1B507C]" />
            </p>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1B507C] text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1B507C]/70">
              A first, easy step
            </p>
            {cta}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WebinarDoor({ cta }: { cta: React.ReactNode }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="w-full bg-gradient-light-neutral-lg bg-cover bg-top-left px-4 py-12 sm:px-20 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-secondary">
            Free · Live · Once a week
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-primary md:text-5xl">
            Start with a Free Webinar
          </h2>
          <div className="mt-4 h-[3px] w-16 rounded-full bg-secondary" />

          <ul className="mt-10 space-y-3">
            {ITEMS.map((it, i) => {
              const active = i === open;
              return (
                <li
                  key={it.label}
                  className={`rounded-2xl transition-all duration-500 ${active ? "bg-white shadow-xl" : "bg-transparent"}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    onMouseEnter={() => setOpen(i)}
                    aria-expanded={active}
                    className="flex w-full items-center gap-4 px-4 py-3 text-left"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-500 ${
                        active
                          ? "bg-secondary text-primary-darkest"
                          : "bg-slate-200 text-primary"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`text-base font-semibold transition-colors duration-500 ${active ? "text-primary" : "text-primary/60"}`}
                    >
                      {it.label}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ${active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-5 pl-16 text-sm leading-7 text-primary md:text-[15px]">
                        {it.text}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <WebinarWindow cta={cta} />
      </div>
    </section>
  );
}
