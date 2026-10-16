"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Award,
  Users,
  ListChecks,
  PhoneCall,
  Gem,
  Sparkles,
  ChevronDown,
  Building2,
  Lock,
  LockOpen,
  Check,
  type LucideIcon,
} from "lucide-react";

type Card = { title: string; body: React.ReactNode };

// Icon picked from the card title, so the data files do not need to change. Unknown titles get a sparkle.
const iconFor = (title: string): LucideIcon => {
  const t = title.toLowerCase();
  if (/join|apply|enrol/.test(t)) return PhoneCall;
  if (/prerequisite|require/.test(t)) return ListChecks;
  if (/number|price|fee|invest/.test(t)) return Gem;
  if (/walk away|outcome|achieve|learn/.test(t)) return Award;
  if (/who|is for/.test(t)) return Users;
  return Sparkles;
};

// Brand accents, same palette as the home page "at a glance" tabs. ink = readable text colour on that accent.
const ACCENTS = [
  { color: "#F9B81E", ink: "#09263D" },
  { color: "#FFE29D", ink: "#09263D" },
  { color: "#FFFFFF", ink: "#09263D" },
  { color: "#346B96", ink: "#FFFFFF" },
  { color: "#F9B81E", ink: "#09263D" },
  { color: "#FFE29D", ink: "#09263D" },
];

const ROAD = [
  { Icon: Award, title: "Certification", sub: "The first half of the journey" },
  { Icon: Building2, title: "Board membership", sub: "As an organisation, and as an individual first-time trainer member" },
  { Icon: Lock, title: "Train", sub: "You cannot train until it is in place" },
] as const;

// Three-step roadmap beside the intro. Loops while on screen (and stays still for reduced motion):
// 0 = step 1 current, 1 = step 1 done, 2 = step 2 done (lock about to open), 3 = all done (lock open).
function Roadmap() {
  const ref = useRef<HTMLOListElement>(null);
  const [s, setS] = useState(1);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!run || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setS((v) => (v + 1) % 4), 2200);
    return () => clearInterval(id);
  }, [run]);

  return (
    <ol ref={ref} className="space-y-6 self-center">
      <style>{`
        @keyframes nsc-pop { 0% { transform: scale(.6); opacity: .4 } 60% { transform: scale(1.18) } 100% { transform: scale(1); opacity: 1 } }
        .nsc-pop { animation: nsc-pop .55s cubic-bezier(.2,.8,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .nsc-pop { animation: none } }
      `}</style>
      {ROAD.map(({ Icon, title, sub }, i) => {
        const done = i < s;
        const now = i === s;
        const open = i === 2 && done;
        return (
          <li key={title} className="relative flex gap-4">
            {i < ROAD.length - 1 && (
              <>
                <span aria-hidden="true" className="absolute -bottom-6 left-[19px] top-11 w-0.5 bg-primary/15" />
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-6 left-[19px] top-11 w-0.5 origin-top bg-secondary transition-transform duration-700 ${
                    done ? "scale-y-100" : "scale-y-0"
                  }`}
                />
              </>
            )}
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              {now && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-secondary/50" />}
              <span
                key={`${i}-${done ? "d" : now ? "n" : "x"}`}
                className={`nsc-pop relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 ${
                  done
                    ? "bg-secondary text-primary-darkest"
                    : now
                      ? "bg-primary-darkest text-secondary ring-4 ring-secondary"
                      : "border-2 border-dashed border-primary/30 text-primary/40"
                }`}
              >
                {open ? (
                  <LockOpen size={18} aria-hidden="true" />
                ) : done ? (
                  <Check size={18} aria-hidden="true" />
                ) : (
                  <Icon size={18} aria-hidden="true" />
                )}
              </span>
            </span>
            <span>
              <span
                className={`block font-outfit text-base font-semibold transition-colors duration-500 ${
                  done || now ? "text-primary-darkest" : "text-primary/50"
                }`}
              >
                {i + 1}. {title}
              </span>
              <span className="block text-sm leading-snug text-gray-600">{sub}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

// Intro card on top, then a dark band with pill tabs on the left and one white panel on the right
// (the home page "at a glance" pattern). All panels stay in the page (hidden, not removed), so the text and
// links are always crawlable.
export default function NextStepCards({ intro, cards }: { intro?: React.ReactNode; cards: Card[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="text-start">
      {intro && (
        <div className="my-6 grid gap-8 rounded-3xl border border-primary/10 bg-white p-6 shadow-xl lg:grid-cols-[1fr_300px] lg:gap-12 lg:p-8">
          <div className="border-l-4 border-secondary pl-5">
            <div className="custom-text1 font-light leading-relaxed text-gray-700">{intro}</div>
          </div>
          <Roadmap />
        </div>
      )}

      <style>{`
        @keyframes nscPanel{from{opacity:0;transform:translateX(24px) scale(.98)}to{opacity:1;transform:none}}
        @media (prefers-reduced-motion:no-preference){ .nsc-panel:not([hidden]){animation:nscPanel .45s cubic-bezier(.2,.8,.2,1) both} }
        @media (min-width:1024px){ .nsc-panel{grid-column:2;grid-row:1 / -1} }
      `}</style>

      <div
        className={`rounded-3xl bg-primary-darkest bg-dark-primary bg-cover bg-top-left p-5 shadow-2xl sm:p-6 lg:p-10 ${intro ? "mt-6" : "mt-4 lg:mt-6"}`}
        style={{ ["--nsc-n" as string]: cards.length } as React.CSSProperties}
      >
        <div className="lg:grid lg:grid-cols-[minmax(280px,360px)_1fr] lg:[grid-template-rows:repeat(var(--nsc-n),auto)_1fr] lg:items-stretch lg:gap-x-10 lg:gap-y-4">
          {cards.map((card, i) => {
            const open = i === active;
            const { color, ink } = ACCENTS[i % ACCENTS.length];
            const Icon = iconFor(card.title);
            return (
              <div key={i} className="mb-4 lg:mb-0 lg:contents">
                <h3 className="lg:col-start-1">
                  <button
                    type="button"
                    id={`nsc-tab-${i}`}
                    aria-expanded={open}
                    aria-controls={`nsc-panel-${i}`}
                    onClick={() => setActive(i)}
                    style={open ? { backgroundColor: color, color: ink, borderColor: color } : { borderColor: `${color}99` }}
                    className={`group flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-3.5 text-start font-outfit text-[15px] font-semibold leading-tight transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-white lg:py-4 ${
                      open ? "scale-[1.02] shadow-lg lg:translate-x-2" : "bg-white/10 text-white hover:bg-white/20 hover:lg:translate-x-1"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      style={open ? { backgroundColor: ink, color } : { backgroundColor: color, color: ink }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-12"
                    >
                      <Icon size={18} />
                    </span>
                    <span className="flex-1">{card.title}</span>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={`shrink-0 transition-transform lg:-rotate-90 ${open ? "rotate-180 lg:rotate-0" : ""}`}
                    />
                  </button>
                </h3>

                <div
                  id={`nsc-panel-${i}`}
                  role="region"
                  aria-labelledby={`nsc-tab-${i}`}
                  hidden={!open}
                  style={{ borderTopColor: color === "#FFFFFF" ? "#F9B81E" : color }}
                  className={`nsc-panel ${open ? "flex" : "hidden"} mt-3 flex-col justify-center rounded-2xl border-t-8 bg-white p-6 shadow-2xl md:p-8 lg:mt-0 lg:p-10`}
                >
                  <div className="mb-5 flex items-center gap-4 lg:mb-6">
                    <span
                      aria-hidden="true"
                      style={{ backgroundColor: color === "#FFFFFF" ? "#F9B81E" : color, color: color === "#FFFFFF" ? "#09263D" : ink }}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-md ring-2 ring-primary/20"
                    >
                      <Icon size={26} />
                    </span>
                    <p className="font-outfit text-xl font-semibold text-primary md:text-2xl">{card.title}</p>
                  </div>
                  <div className="custom-text1 font-light leading-relaxed text-black/80 [&_a]:font-medium [&_a]:text-primary [&_a]:underline">
                    {card.body}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}