"use client";
// B 01 row A9 / C step 7. Copy is canon and verbatim (F3): only layout and grouping live here.
// Compact layout: slim stats strip + one tabbed card. All panels stay in the DOM (hidden, not removed) so the text is crawlable.
// Styling follows the existing homepage sections: bg-dark-primary, two-tone h2 (as WhatWeDo), white rounded-lg shadow-lg card,
// navy/gold accents, and the original gold left-bar bullets.
import { useState, useEffect, useRef } from "react";
import { Landmark, Users, GraduationCap, DoorOpen, ChevronDown } from "lucide-react";

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

// SEO heading: one plain <h2> text node. Change the size here only (swap "h3" for "h2" or "h4", or add e.g. "text-[34px]").
// Keep it an <h2>: the page's single <h1> lives in the Hero.
const HEADING_TEXT = "AL&CO at a Glance";
const HEADING_CLASS = "h3 text-white text-start mb-4 lg:mb-6";

const bigNum = "font-outfit font-bold text-[44px] md:text-[56px] leading-none bg-gradient-to-b from-secondary to-white bg-clip-text text-transparent";
const STATS = [
  { to: 2000, suffix: "+", label: "graduates" },
  { to: 20, suffix: "+", label: "countries" },
  { to: 100, suffix: "", label: "batches delivered" },
  { to: 1, suffix: "M+", label: "lives inspired" },
];

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

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-primary-darkest bg-dark-primary bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <h2 className={HEADING_CLASS}>{HEADING_TEXT}</h2>

        {/* Bar 1: figures only, label underneath */}
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 rounded-lg border border-white/20 bg-white/10 px-4 py-8 lg:py-10 mb-8 lg:mb-10 text-center">
          {STATS.map((st) => (
            <div key={st.label} className="flex flex-col items-center">
              <dt className="order-2 mt-2 font-outfit text-base md:text-lg font-light text-white">{st.label}</dt>
              <dd className="order-1">
                <CountUp to={st.to} suffix={st.suffix} className={bigNum} />
              </dd>
            </div>
          ))}
        </dl>

        {/* Bar 2: vertical headings. Click a heading to open its details (all panels stay in the DOM, hidden, so the text is crawlable). */}
        <div className="lg:grid lg:grid-cols-[minmax(260px,340px)_1fr] lg:gap-x-8 lg:items-start">
          {tabs.map((t, i) => {
            const open = i === active;
            return (
              <div key={t.id} className="mb-3 lg:mb-3 lg:contents">
                <h3 className="lg:col-start-1">
                  <button
                    type="button"
                    id={`glance-tab-${t.id}`}
                    aria-expanded={open}
                    aria-controls={`glance-panel-${t.id}`}
                    onClick={() => setActive(i)}
                    className={`w-full flex items-center gap-3 rounded-full px-5 py-4 text-start font-outfit font-medium text-[16px] md:text-[18px] border transition-colors focus-visible:ring-2 focus-visible:ring-secondary ${
                      open
                        ? "bg-secondary text-primary-darkest border-secondary"
                        : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                    }`}
                  >
                    <span aria-hidden="true">{t.icon}</span>
                    <span className="flex-1">{t.label}</span>
                    <ChevronDown size={18} aria-hidden="true" className={`transition-transform lg:-rotate-90 ${open ? "rotate-180 lg:rotate-0" : ""}`} />
                  </button>
                </h3>
                <div
                  id={`glance-panel-${t.id}`}
                  role="region"
                  aria-labelledby={`glance-tab-${t.id}`}
                  hidden={!open}
                  className="mt-3 lg:mt-0 lg:col-start-2 lg:row-start-1 lg:row-span-4 bg-white rounded-lg shadow-lg p-6 lg:p-8"
                >
                  <ul className="grid grid-cols-1 gap-5">
                    {t.facts.map((f) => (
                      <li key={f} className="custom-text1 font-light text-black/80 border-l-4 border-secondary pl-4">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}