"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Dest = {
  level: number;
  kind: string; // e.g. "Teach NLP"
  title: string; // e.g. "Level 4, NLP Train the Trainer"
  href: string;
  cta: string; // e.g. "Explore Level 4"
  next?: boolean;
};

type Props = {
  current: { level: number; name: string };
  previous?: Dest;
  forks: Dest[]; // 1-3 destinations
  children?: React.ReactNode; // your "Ready for the next step?" box goes here
};

function DestCard({ d, delay, seen }: { d: Dest; delay: number; seen: boolean }) {
  return (
    <Link
      href={d.href}
      className={`group relative block overflow-hidden rounded-2xl bg-white p-5 shadow-[0_10px_30px_-12px_rgba(11,37,69,0.35)] ring-1 ring-[#1B507C]/10 transition-all duration-700 hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-14px_rgba(11,37,69,0.45)] ${
        seen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* big outline numeral */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-4 select-none text-[110px] font-extrabold leading-none text-[#1B507C]/[0.07] transition-colors duration-500 group-hover:text-[#F9B81E]/25"
      >
        {d.level}
      </span>

      {d.next && (
        <span className="absolute right-3 top-3 rounded-full bg-[#F9B81E] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#071a33]">
          Next
        </span>
      )}

      <p className="relative text-[11px] font-bold uppercase tracking-[0.18em] text-[#F09623]">
        {d.kind}
      </p>
      <h3 className="relative mt-1.5 text-lg font-bold leading-snug text-[#1B507C]">
        {d.title}
      </h3>
      <p className="relative mt-4 flex items-center gap-2 text-sm font-bold text-[#0b2545]">
        {d.cta}
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
      </p>

      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#F9B81E] transition-transform duration-500 group-hover:scale-x-100" />
    </Link>
  );
}

export default function WhereItLeadsPath({ current, previous, forks, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const n = forks.length;
  // y positions (0-100) of each fork target in the svg
  const ys = forks.map((_, i) => ((i + 0.5) / n) * 100);

  return (
    <div ref={ref} className="mx-auto w-full max-w-6xl">
      <style>{`
        @keyframes wl-pulse { 0% { transform: scale(1); opacity: .55 } 100% { transform: scale(1.9); opacity: 0 } }
        @keyframes wl-flow { to { stroke-dashoffset: -24 } }
      `}</style>

      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_auto_1.25fr] lg:gap-0">
        {/* previous (behind you) */}
        <div className={`transition-all duration-700 ${seen ? "opacity-100" : "opacity-0"}`}>
          {previous && (
            <Link
              href={previous.href}
              className="group block rounded-2xl bg-white/70 p-5 ring-1 ring-[#1B507C]/10 transition-all duration-300 hover:bg-white hover:shadow-lg"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1B507C]/50">
                {previous.kind}
              </p>
              <p className="mt-1.5 text-base font-bold leading-snug text-[#1B507C]/80 group-hover:text-[#1B507C]">
                {previous.title}
              </p>
              <p className="mt-3 text-sm font-bold text-[#0b2545]/70">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">←</span>{" "}
                {previous.cta}
              </p>
            </Link>
          )}
        </div>

        {/* connector: previous -> you */}
        <div className="hidden w-12 lg:block" aria-hidden>
          <svg viewBox="0 0 48 4" className="h-1 w-full">
            <line x1="0" y1="2" x2="48" y2="2" stroke="#1B507C" strokeOpacity=".3" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* you are here */}
        <div className="flex flex-col items-center">
          <div className="relative flex h-28 w-28 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-[#F9B81E]/50" style={{ animation: "wl-pulse 2.4s ease-out infinite" }} />
            <span className="absolute inset-0 rounded-full bg-[#F9B81E]/40" style={{ animation: "wl-pulse 2.4s ease-out 1.2s infinite" }} />
            <span className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#1B507C] to-[#0b2545] text-white shadow-xl ring-4 ring-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F9B81E]">Level</span>
              <span className="text-4xl font-extrabold leading-none">{current.level}</span>
            </span>
          </div>
          <p className="mt-3 rounded-full bg-[#F9B81E] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#071a33]">
            You are here
          </p>
          <p className="mt-2 max-w-[11rem] text-center text-xs font-semibold text-[#1B507C]">
            {current.name}
          </p>
        </div>

        {/* fork road + destinations */}
        <div className="grid items-stretch gap-4 lg:grid-cols-[88px_1fr] lg:gap-0">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="hidden h-full w-full lg:block"
          >
            {ys.map((y, i) => (
              <path
                key={i}
                d={`M0 50 C 55 50, 45 ${y}, 100 ${y}`}
                fill="none"
                stroke="#F9B81E"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={seen ? 0 : 1}
                style={{ transition: `stroke-dashoffset 1.2s ease ${0.4 + i * 0.25}s` }}
              />
            ))}
            {/* flowing dashes on top */}
            {ys.map((y, i) => (
              <path
                key={`f${i}`}
                d={`M0 50 C 55 50, 45 ${y}, 100 ${y}`}
                fill="none"
                stroke="#fff"
                strokeOpacity=".9"
                strokeWidth="1.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="2 22"
                style={{ animation: "wl-flow 1.4s linear infinite", opacity: seen ? 1 : 0, transition: "opacity .6s ease 1.6s" }}
              />
            ))}
          </svg>

          <div className="space-y-4">
            {forks.map((d, i) => (
              <DestCard key={d.level} d={d} delay={500 + i * 250} seen={seen} />
            ))}
          </div>
        </div>
      </div>

      {children && <div className="mt-10">{children}</div>}
    </div>
  );
}