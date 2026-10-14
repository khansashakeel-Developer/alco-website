"use client";

import Link from "next/link";
import { useState } from "react";

type Step = { num: string; kind: string; name: string; href: string; cta: string; badge?: string };

type Props = {
  current: { num: string; name: string };
  steps: Step[];
  note?: { label: string; text: string };
  cta?: { lead: string; rest: string; button: React.ReactNode };
};

const BASE = 150; // height of the lowest step (px)
const RISE = 70; // how much each step rises (px)

const COLS: Record<number, string> = {
  2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-5",
};

// brand blues, rising to the deepest navy at the top
const SHADES = ["#2B6CA3", "#1B507C", "#12395c", "#0b2545"];

export default function WhereItLeadsStairs({ current, steps, note, cta }: Props) {
  const [at, setAt] = useState(0); // where the ball is: 0 = your level
  const [hop, setHop] = useState(0);
  const n = steps.length + 1;
  const h = (i: number) => BASE + i * RISE;

  const go = (i: number) => {
    if (i === at) return;
    setAt(i);
    setHop((x) => x + 1);
  };

  return (
    <div className="mt-8">
      <style>{`
        @keyframes wl-hop { 0% { transform: translateY(0) } 45% { transform: translateY(-46px) } 100% { transform: translateY(0) } }
        @media (prefers-reduced-motion: reduce) { .wl-anim { animation: none !important } }
      `}</style>

      {/* the note */}
      {note && (
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border-t-4 border-secondary bg-gradient-to-br from-[#0b2545] to-[#1B507C] px-6 py-6 text-center shadow-xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-secondary">{note.label}</p>
          <p className="mt-3 text-base font-medium leading-relaxed text-white md:text-lg">{note.text}</p>
        </div>
      )}

      {/* the staircase */}
      <div
        className="relative mt-10 md:mt-14 md:h-[440px]"
        onMouseLeave={() => go(0)}
      >
        {/* the ball (desktop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute z-20 hidden md:block"
          style={{
            left: `${((at + 0.5) / n) * 100}%`,
            bottom: h(at) + 8,
            transform: "translateX(-50%)",
            transition: "left 750ms cubic-bezier(.45,.05,.3,1), bottom 750ms cubic-bezier(.3,1.35,.5,1)",
          }}
        >
          <span key={hop} className="wl-anim block" style={{ animation: "wl-hop 750ms ease-out" }}>
            <span className="block h-9 w-9 rounded-full shadow-[0_10px_14px_-4px_rgba(0,0,0,0.5)]" style={{ background: "radial-gradient(circle at 32% 28%, #FFE9A8 0%, #F9B81E 45%, #C98500 100%)" }} />
          </span>
        </div>

        <div className={`flex flex-col gap-3 md:absolute md:inset-x-0 md:bottom-0 md:grid md:items-end md:gap-3 ${COLS[n] ?? "md:grid-cols-4"}`}>
          {/* your level: the first step */}
          <div
            onMouseEnter={() => go(0)}
            className="flex flex-col justify-between rounded-t-2xl rounded-b-xl bg-secondary p-5 text-primary-darkest shadow-lg md:rounded-b-none"
            style={{ ["--h" as string]: `${h(0)}px` }}
          >
            <div className="md:h-[var(--h)] md:flex md:flex-col md:justify-between">
              <p className="text-5xl font-bold leading-none">{current.num}</p>
              <div className="mt-4 md:mt-0">
                <p className="text-[11px] font-bold uppercase tracking-widest opacity-70">You are here</p>
                <p className="mt-1 font-semibold">{current.name}</p>
              </div>
            </div>
          </div>

          {steps.map((s, k) => {
            const i = k + 1;
            return (
              <Link
                key={s.href}
                href={s.href}
                onMouseEnter={() => go(i)}
                onFocus={() => go(i)}
                className="group relative flex flex-col rounded-t-2xl rounded-b-xl p-5 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 md:rounded-b-none"
                style={{ background: SHADES[Math.min(k, SHADES.length - 1)], ["--h" as string]: `${h(i)}px` }}
              >
                <div className="md:flex md:h-[var(--h)] md:flex-col md:justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-5xl font-bold leading-none text-white/90">{s.num}</p>
                    {s.badge && (
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold text-primary-darkest">{s.badge}</span>
                    )}
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">{s.kind}</p>
                    <p className="mt-1 font-semibold leading-snug">{s.name}</p>
                    <p className="mt-3 text-sm font-semibold text-secondary">
                      {s.cta} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* the call to action */}
      {cta && (
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-dashed border-primary/30 bg-white px-6 py-6 text-center">
          <p className="text-primary-light">
            <strong className="text-primary">{cta.lead}</strong>{cta.rest}
          </p>
          <div className="mt-4 flex justify-center">{cta.button}</div>
        </div>
      )}
    </div>
  );
}