"use client";
// B 01 row A9 / C step 7. Copy is canon and verbatim (F3): only layout and grouping live here.
// Compact layout: slim stats strip + one tabbed card. All panels stay in the DOM (hidden, not removed) so the text is crawlable.
// Styling follows the existing homepage sections: bg-dark-primary, two-tone h2 (as WhatWeDo), white rounded-lg shadow-lg card,
// navy/gold accents, and the original gold left-bar bullets.
import { useState, useEffect, useRef } from "react";
import { Landmark, Users, GraduationCap, DoorOpen, ChevronDown, Check } from "lucide-react";

// color = brand accent (brand palette only: gold #F9B81E, light gold #FFE29D and blue #346B96 from tailwind.config.js, plus white) for this heading, ink = readable text colour on that accent.
type Tab = { id: string; label: string; icon: React.ReactNode; facts: string[]; color: string; ink: string };

const tabs: Tab[] = [
  {
    id: "who",
    color: "#F9B81E",
    ink: "#09263D",
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
    color: "#FFE29D",
    ink: "#09263D",
    label: "Our leadership",
    icon: <Users size={18} />,
    facts: [
      "The first in Pakistan: the first to hold Master Trainer of NLP (ABNLP) and Master Trainer of Hypnosis (ABH), an ANLP Accredited Master Trainer (UK), and a Master Trainer under Robert Dilts at NLP University. He holds the ANLP International Ambassadorship for Pakistan.",
      "Led alongside Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK), who teaches beside Arslan as co-trainer. She is the first woman in Pakistan to hold the MCC, the ACTC and her ANLP credential together, a documented first. Learning from a male and a female Master Coach means the work lands for everyone in the room.",
    ],
  },
  {
    id: "learn",
    color: "#FFFFFF",
    ink: "#09263D",
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
    color: "#346B96",
    ink: "#FFFFFF",
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
const HEADING_CLASS = "h3 text-white text-start";

const bigNum = "font-outfit font-bold text-[44px] md:text-[56px] leading-none bg-gradient-to-b from-secondary to-white bg-clip-text text-transparent";
const STATS = [
  { to: 2000, suffix: "+", label: "graduates" },
  { to: 20, suffix: "+", label: "countries" },
  { to: 100, suffix: "", label: "batches delivered, and counting", pre: "Nearing" },
];

// Splits each fact into separate points (one per sentence, wording untouched). A leading "Label:" becomes a bold lead-in.
function toPoints(facts: string[]) {
  return facts.flatMap((f) =>
    f.split(/(?<=\.)\s+(?=[A-Z])/).map((text, i) => {
      const m = i === 0 ? text.match(/^([^:]{3,40}):\s+(.*)$/s) : null;
      return m ? { lead: m[1] + ":", text: m[2] } : { lead: "", text };
    })
  );
}

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
        <style>{`
          @keyframes glanceUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
          @keyframes glancePanel{from{opacity:0;transform:translateX(24px) scale(.98)}to{opacity:1;transform:none}}
          @media (prefers-reduced-motion:no-preference){
            .glance-stat{animation:glanceUp .7s ease-out both}
            .glance-panel:not([hidden]){animation:glancePanel .45s cubic-bezier(.2,.8,.2,1) both}
            .glance-fact{animation:glanceUp .55s ease-out both}
          }
        `}</style>
        {/* Heading on the left, the "million lives" line on the same row at the right */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-8 mb-5 lg:mb-6">
          <h2 className={HEADING_CLASS}>{HEADING_TEXT}</h2>
          <p className="glance-stat custom-text1 font-light text-white md:text-end md:max-w-xl lg:max-w-none lg:whitespace-nowrap">
            Our work has inspired <strong className="font-semibold">over a million lives</strong>, across the nation and around the world.
          </p>
        </div>

        <p className="sr-only">2,000+ graduates across 20+ countries. Nearing 100 batches delivered, and counting.</p>
        <dl aria-hidden="true" className="grid grid-cols-3 gap-x-4 rounded-lg border border-white/20 bg-white/10 px-4 py-10 lg:py-14 mb-12 lg:mb-16 text-center">
          {STATS.map((st, i) => (
            <div key={st.label} className="glance-stat flex flex-col items-center" style={{ animationDelay: `${i * 120}ms` }}>
              <span className="order-0 mb-1 h-5 font-outfit text-sm font-light uppercase tracking-widest text-white/80">{st.pre ?? ""}</span>
              <dt className="order-2 mt-2 font-outfit text-sm sm:text-base md:text-lg font-light text-white">{st.label}</dt>
              <dd className="order-1">
                <CountUp to={st.to} suffix={st.suffix} className={bigNum} />
              </dd>
            </div>
          ))}
        </dl>

        {/* Bar 2: vertical headings. Click a heading to open its details (all panels stay in the DOM, hidden, so the text is crawlable). */}
        <div className="lg:grid lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-x-10 lg:gap-y-5 lg:items-stretch">
          {tabs.map((t, i) => {
            const open = i === active;
            return (
              <div key={t.id} className="mb-5 lg:mb-0 lg:contents">
                <h3 className="lg:col-start-1">
                  <button
                    type="button"
                    id={`glance-tab-${t.id}`}
                    aria-expanded={open}
                    aria-controls={`glance-panel-${t.id}`}
                    onClick={() => setActive(i)}
                    style={open ? { backgroundColor: t.color, color: t.ink, borderColor: t.color } : { borderColor: `${t.color}99` }}
                    className={`group w-full flex items-center gap-4 rounded-full px-4 py-4 lg:py-5 text-start font-outfit font-semibold text-[16px] md:text-[18px] border-2 transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-white ${
                      open
                        ? "shadow-lg lg:translate-x-2 scale-[1.02]"
                        : "bg-white/5 text-white hover:bg-white/15 hover:lg:translate-x-1"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      style={open ? { backgroundColor: t.ink, color: t.color } : { backgroundColor: t.color, color: t.ink }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-12"
                    >
                      {t.icon}
                    </span>
                    <span className="flex-1">{t.label}</span>
                    <ChevronDown size={18} aria-hidden="true" className={`transition-transform lg:-rotate-90 ${open ? "rotate-180 lg:rotate-0" : ""}`} />
                  </button>
                </h3>
                <div
                  id={`glance-panel-${t.id}`}
                  role="region"
                  aria-labelledby={`glance-tab-${t.id}`}
                  hidden={!open}
                  style={{ borderTopColor: t.color }}
                  className={`glance-panel ${open ? "flex" : "hidden"} flex-col justify-center mt-4 lg:mt-0 lg:col-start-2 lg:row-start-1 lg:row-span-4 bg-white rounded-2xl border-t-8 shadow-2xl p-6 md:p-8 lg:p-10`}
                >
                  <div className="flex items-center gap-4 mb-6 lg:mb-8">
                    <span
                      aria-hidden="true"
                      style={{ backgroundColor: t.color, color: t.ink }}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-md ring-2 ring-primary/20 [&>svg]:h-7 [&>svg]:w-7"
                    >
                      {t.icon}
                    </span>
                    <p aria-hidden="true" className="font-outfit text-xl md:text-2xl font-semibold text-primary">{t.label}</p>
                  </div>
                  {t.id === "who" ? (
                    <p style={{ animationDelay: "150ms" }} className="glance-fact custom-text1 font-light text-black/80 leading-relaxed">
                      {t.facts.join(" ")}
                    </p>
                  ) : (
                    <ul className="grid grid-cols-1 gap-5 lg:gap-6">
                      {toPoints(t.facts).map((pt, n) => (
                        <li key={pt.text} style={{ animationDelay: `${150 + n * 140}ms` }} className="glance-fact flex items-start gap-3 custom-text1 font-light text-black/80">
                          <span
                            aria-hidden="true"
                            style={{ backgroundColor: t.color, color: t.ink }}
                            className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1 ring-primary/20"
                          >
                            <Check size={14} strokeWidth={3} />
                          </span>
                          <span>
                            {pt.lead && <strong className="font-semibold text-primary">{pt.lead} </strong>}
                            {pt.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}