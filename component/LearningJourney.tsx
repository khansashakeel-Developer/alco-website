"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type Seal = { src: StaticImageData; alt: string };

const INTRO =
  "AL&CO is built as a ladder. Step on at the first rung and climb as far as you wish, from your own transformation to running your own training business. Each level is complete in itself, and each one opens the door to the next.";

const BOARDS =
  "Every level is backed by international certification boards: the ABNLP and its NLP Coaching Division, the ABH, the TLTA and the NGH (USA), together with a UK ANLP CPD accreditation and AL&CO’s own credential. These are real, recognised qualifications, not a certificate for the wall.";

/* ---------- helpers ---------- */
function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

function Count({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1800, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n.toLocaleString("en-US")}</>;
}

/* Words fill in as the section scrolls through the screen */
function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const prog = (vh * 0.85 - r.top) / (r.height + vh * 0.3);
      setP(Math.min(1, Math.max(0, prog)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  const words = text.split(" ");
  return (
    <p ref={ref} className="text-xl font-medium leading-snug md:text-3xl md:leading-snug">
      {words.map((w, i) => (
        <span
          key={i}
          className={`transition-colors duration-300 ${i / words.length < p ? "text-primary" : "text-primary/20"}`}
        >
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

/* A tile with a soft light that follows the cursor */
function Tile({
  className = "",
  children,
  seen,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  seen: boolean;
  delay?: number;
}) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={onMove}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative overflow-hidden rounded-3xl p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-2xl ${
        seen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(260px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.18), transparent 70%)" }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/* ---------- main ---------- */
export default function LearningJourney({ seals }: { seals: Seal[] }) {
  const [gridRef, seen] = useInView<HTMLDivElement>(0.15);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section className="w-full bg-slate-50 px-4 py-10 md:py-16">
      <div className="container mx-auto max-w-6xl">
        {/* Heading + scroll-filled intro */}
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-secondary-dark">Six levels, one ladder</p>
        <h2 className="mt-2 text-3xl font-bold leading-tight text-primary md:text-6xl">
          The Learning Journey: Six Levels, One Ladder
        </h2>
        <div className="mt-6 h-[4px] w-16 rounded bg-secondary" />
        <div className="mt-8 max-w-4xl md:mt-12">
          <ScrollText text={INTRO} />
        </div>

        {/* Bento grid */}
        <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:gap-5 lg:grid-cols-6">
          {/* Boards */}
          <Tile seen={seen} className="bg-gradient-to-br from-[#0b2545] to-[#1B507C] text-white lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary">Backed by international boards</p>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/90">{BOARDS}</p>
           <ul
  aria-label="Certification boards and CPD accreditation"
  className="mt-6 grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-3"
  onMouseLeave={() => setHover(null)}
>
  {seals.map((s, i) => (
    <li
      key={s.alt}
      onMouseEnter={() => setHover(i)}
      className={`aspect-square w-full overflow-hidden rounded-full shadow-lg transition-all duration-300 ${
        hover === i ? "scale-110" : ""
      } ${hover !== null && hover !== i ? "opacity-50" : "opacity-100"}`}
    >
      <Image
        src={s.src}
        alt={s.alt}
        width={160}
        height={160}
        className="h-full w-full rounded-full object-cover"
      />
    </li>
  ))}
</ul>
            <p aria-hidden className="mt-4 h-5 text-sm font-medium text-secondary">
              {hover !== null ? seals[hover].alt : ""}
            </p>
          </Tile>

          {/* Graduates */}
          {/* Graduates */}
<Tile seen={seen} delay={120} className="bg-secondary text-primary-darkest lg:col-span-2">
  {/* faint globe behind */}
  <svg
    aria-hidden
    viewBox="0 0 200 200"
    className="pointer-events-none absolute -bottom-10 -right-10 h-60 w-60 text-primary-darkest opacity-[0.12]"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <circle cx="100" cy="100" r="90" />
    <ellipse cx="100" cy="100" rx="40" ry="90" />
    <ellipse cx="100" cy="100" rx="75" ry="90" />
    <line x1="10" y1="100" x2="190" y2="100" />
    <path d="M20 60 Q100 80 180 60" />
    <path d="M20 140 Q100 120 180 140" />
  </svg>

  <div className="relative flex h-full flex-col justify-between gap-6">
    <span className="text-xs font-bold uppercase tracking-widest opacity-70">Graduates</span>

    <div>
      <p className="text-6xl font-bold leading-none md:text-7xl">
        <Count to={2000} run={seen} />+
      </p>
      <p className="mt-3 text-lg font-semibold leading-snug">
        graduates across <Count to={20} run={seen} />+ countries
      </p>
    </div>

    {/* 20 dots, one per country, lighting up in turn */}
    <div className="grid grid-cols-10 gap-1.5" aria-hidden>
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          style={{ transitionDelay: `${700 + i * 90}ms` }}
          className={`aspect-square rounded-full transition-all duration-500 ${
            seen ? "scale-100 bg-primary-darkest" : "scale-0 bg-primary-darkest"
          }`}
        />
      ))}
    </div>
  </div>
</Tile>

          {/* Live */}
          <Tile seen={seen} delay={200} className="bg-white text-primary shadow-md lg:col-span-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-600">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              Live
            </span>
            <p className="mt-6 text-xl font-semibold leading-snug">Live on Zoom, taught personally</p>
          </Tile>

          {/* Sessions: 24 hour bar */}
          {/* Sessions: evening to morning window */}
<Tile seen={seen} delay={280} className="bg-white text-primary shadow-md lg:col-span-2">
  <p className="text-xl font-semibold leading-snug">Sessions run 8:00pm to 2:00am PKT</p>

  <div className="relative mt-10">
    {/* start and end flags */}
    <div className="absolute -top-7 text-[11px] font-bold text-primary" style={{ left: "16.67%", transform: "translateX(-50%)" }}>
      Starts 8:00pm
    </div>
    <div className="absolute -top-7 text-[11px] font-bold text-primary" style={{ left: "66.67%", transform: "translateX(-50%)" }}>
      Ends 2:00am
    </div>

    {/* the night window, with the session as one gold block */}
    <div className="relative h-9 rounded-full bg-slate-200">
      <div
        className="absolute flex h-9 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary-darkest transition-all delay-700 duration-1000"
        style={{ left: "16.67%", width: seen ? "50%" : "0%", overflow: "hidden" }}
      >
        {seen && "6 hours"}
      </div>
    </div>

    {/* hour ticks */}
    <div className="relative mt-2 h-4 text-[10px] font-medium text-slate-500">
      {[
        { t: "6pm", p: 0 },
        { t: "8pm", p: 16.67 },
        { t: "12am", p: 50 },
        { t: "2am", p: 66.67 },
        { t: "6am", p: 100 },
      ].map((x) => (
        <span
          key={x.t}
          className="absolute"
          style={{ left: `${x.p}%`, transform: x.p === 0 ? "none" : x.p === 100 ? "translateX(-100%)" : "translateX(-50%)" }}
        >
          {x.t}
        </span>
      ))}
    </div>
  </div>
</Tile>
          {/* Cohort: 25 dots */}
          <Tile seen={seen} delay={360} className="bg-white text-primary shadow-md lg:col-span-2">
            <p className="text-xl font-semibold leading-snug">Cohorts of 20 to 25 (Level 3: never more than 20)</p>
            <div className="mt-5 grid grid-cols-10 gap-1.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <span
                  key={i}
                  style={{ transitionDelay: `${600 + i * 40}ms` }}
                  className={`aspect-square rounded-full transition-all duration-500 ${
                    seen ? (i < 20 ? "scale-100 bg-primary" : "scale-100 bg-primary/20") : "scale-0 bg-primary"
                  }`}
                />
              ))}
            </div>
          </Tile>

          {/* Revisits: 5 years */}
          <Tile seen={seen} delay={440} className="bg-gradient-to-r from-[#1B507C] to-[#0b2545] text-white lg:col-span-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <p className="text-xl font-semibold md:max-w-xs">Free revisits for five years at Levels 1 to 3</p>
              <div className="flex flex-1 gap-2 md:max-w-xl">
                {[1, 2, 3, 4, 5].map((y) => (
                  <div key={y} className="flex-1">
                    <div className="h-3 overflow-hidden rounded-full bg-white/15">
                      <div
                        className="h-full rounded-full bg-secondary transition-all duration-700"
                        style={{ width: seen ? "100%" : "0%", transitionDelay: `${700 + y * 250}ms` }}
                      />
                    </div>
                    <p className="mt-1 text-center text-[11px] font-medium text-white/70">Year {y}</p>
                  </div>
                ))}
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}