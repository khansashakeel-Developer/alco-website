"use client";
// B 01 row A9 / C step 7. Copy is canon and verbatim (F3): only layout and grouping live here.
// Compact layout: slim stats strip + one tabbed card. All panels stay in the DOM (hidden, not removed) so the text is crawlable.
// Styling follows the existing homepage sections: bg-dark-primary, two-tone h2 (as WhatWeDo), white rounded-lg shadow-lg card,
// navy/gold accents, and the original gold left-bar bullets.
import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import { Landmark, Users, GraduationCap, DoorOpen } from "lucide-react";

type Tab = { id: string; label: string; icon: React.ReactNode; facts: string[] };

const tabs: Tab[] = [
  {
    id: "who",
    label: "Who we are",
    icon: <Landmark size={18} />,
    facts: [
      "Pakistan’s pioneering NLP, hypnosis and coaching training institution, the Center for Human Brilliance and Behavioral Reengineering.",
      "Led by Arslan Larik, who has trained and coached since 2010. Arslan Larik & Company was established as an institution in 2018.",
      "We produce not only practitioners and trainers, but master trainers.",
    ],
  },
  {
    id: "leadership",
    label: "Our leadership",
    icon: <Users size={18} />,
    facts: [
      "The first in Pakistan: the first to hold Master Trainer of NLP (ABNLP) and Master Trainer of Hypnosis (ABH), an ANLP Accredited Master Trainer (UK), and a Master Trainer of NLP University (NLPU) under Robert Dilts. He holds the ANLP International Ambassadorship for Pakistan.",
      "Led alongside Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK), who teaches beside Arslan as co-trainer. She is the first woman in Pakistan to hold the MCC, the ACTC and her ANLP credential together, a documented first. Learning from a male and a female Master Coach means the work lands for everyone in the room.",
    ],
  },
  {
    id: "learn",
    label: "How you learn",
    icon: <GraduationCap size={18} />,
    facts: [
      "Delivery: live on Zoom, taught personally, most evenings of the year. Sessions run 8:00pm to 2:00am Pakistan time (PKT).",
      "The ladder: six levels, NLP Practitioner to NLP Master Trainer.",
      "Certifications you earn: through international boards, ABNLP, its NLP Coaching Division, ABH, TLTA and NGH (USA), plus a UK ANLP CPD accreditation, and AL&CO’s own credential.",
    ],
  },
  {
    id: "after",
    label: "After you graduate",
    icon: <DoorOpen size={18} />,
    facts: [
      "The door never closes: revisit our trainings, step back in as a coaching assistant, and keep learning from an approved curriculum and its companion audio, watching Arslan and Bismillah teach live, year in and year out.",
    ],
  },
];

// Static class names so Tailwind keeps them.
const cols: Record<number, string> = { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3" };

// SEO heading: one plain <h2> text node. Change the size here only (swap "h3" for "h2" or "h4", or add e.g. "text-[34px]").
// Keep it an <h2>: the page's single <h1> lives in the Hero.
const HEADING_TEXT = "AL&CO at a Glance";
const HEADING_CLASS = "h3 text-white text-start mb-4 lg:mb-6";

// Figures are styled, the sentences are unchanged.
const num = "font-outfit font-semibold text-secondary text-[26px] md:text-[30px] leading-none";

// Counts up once when scrolled into view. The final number is always in the page text (the invisible
// sizer), so crawlers and screen readers read it, and the layout never jumps while counting.
function CountUp({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  const final = `${to.toLocaleString("en-US")}${suffix}`;

    useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        if (entry.isIntersecting) {
          const start = performance.now();
          const duration = 1600;
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          setValue(0);
          raf = requestAnimationFrame(tick);
        } else {
          setValue(0);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [to]);

  return (
    <span ref={ref} className={`inline-grid ${className ?? ""}`}>
      <span className="invisible col-start-1 row-start-1">{final}</span>
      <span className="col-start-1 row-start-1" aria-hidden="true">
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}

export default function AtAGlance() {
  const [active, setActive] = useState(0);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setActive(next);
    document.getElementById(`glance-tab-${tabs[next].id}`)?.focus();
  };

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-primary-darkest bg-dark-primary bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <h2 className={HEADING_CLASS}>{HEADING_TEXT}</h2>

        {/* Canon stats strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg border border-white/20 bg-white/10 mb-4 lg:mb-6">
          <p className="custom-text1 font-light text-white p-4 lg:p-5">
            <CountUp to={2000} suffix="+" className={num} /> graduates across <CountUp to={20} suffix="+" className={num} /> countries. Nearing{" "}
            <CountUp to={100} className={num} /> batches delivered, and counting.
          </p>
          <p className="custom-text1 font-light text-white p-4 lg:p-5 border-t border-white/20 md:border-t-0 md:border-l">
            Our work has inspired <span className={num}>over a million lives</span>, across the nation and around the
            world.
          </p>
        </div>

        {/* Tabbed card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div
            role="tablist"
            aria-label="AL&CO at a Glance"
            onKeyDown={onKeyDown}
            className="grid grid-cols-2 sm:grid-cols-4 bg-neutral-light"
          >
            {tabs.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.id}
                  id={`glance-tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`glance-panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`flex items-center justify-center gap-2 px-3 py-3 font-outfit font-medium text-[15px] md:text-[16px] border-b-4 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary ${
                    selected
                      ? "bg-primary text-white border-secondary"
                      : "text-primary border-transparent hover:bg-secondary/30 hover:border-secondary/60 hover:-translate-y-px"
                  }`}
                >
                  <span className={selected ? "text-secondary" : "text-primary"} aria-hidden="true">
                    {t.icon}
                  </span>
                  {t.label}
                </button>
              );
            })}
          </div>

          {tabs.map((t, i) => (
            <div
              key={t.id}
              id={`glance-panel-${t.id}`}
              role="tabpanel"
              aria-labelledby={`glance-tab-${t.id}`}
              hidden={i !== active}
              className="p-6 lg:p-8"
            >
              <ul className={`grid grid-cols-1 gap-5 lg:gap-8 ${cols[t.facts.length]}`}>
                {t.facts.map((f) => (
                  <li key={f} className="custom-text1 font-light text-black/80 border-l-4 border-secondary pl-4">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}