"use client";

import { useEffect, useRef, useState } from "react";
import {
  Award,
  Clock,
  Handshake,
  KeyRound,
  Layers,
  ListChecks,
  PenLine,
  Repeat,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import GlanceVisual from "./GlanceVisual";

type Props = {
  headers: string[];
  points: { content: string; values: string[] }[];
  light?: boolean;
};

const iconFor = (title: string): LucideIcon => {
  const s = title.toLowerCase();
  if (/length|duration|time|hours/.test(s)) return Clock;
  if (/format|delivery/.test(s)) return Layers;
  if (/prerequisite|requirement/.test(s)) return ListChecks;
  if (/entry|apply|application/.test(s)) return KeyRound;
  if (/standard|assess/.test(s)) return ShieldCheck;
  if (/sign-off|signoff|agreement/.test(s)) return PenLine;
  if (/certif/.test(s)) return Award;
  if (/arranged|mentor/.test(s)) return Handshake;
  if (/revisit|repeat/.test(s)) return Repeat;
  return Sparkles;
};

// How many of the 6 columns a card wants, by what it shows.
const want = (kind: string, text: string) => {
  const s = kind.toLowerCase();
  if (/duration|^length/.test(s)) return 4;
  if (/delivery/.test(s)) return 2;
  if (/assess|^standard/.test(s)) return 6;
  if (/prerequisite|^entry|certif|revisit|arranged/.test(s)) return 3;
  return text.length > 100 ? 6 : 3;
};

// Fill every row: when the next card does not fit, the last card of the row grows to take the space left.
const pack = (spans: number[]) => {
  const out = [...spans];
  let row: number[] = [];
  let sum = 0;
  const flush = () => {
    if (row.length) out[row[row.length - 1]] += 6 - sum;
    row = [];
    sum = 0;
  };
  spans.forEach((sp, i) => {
    if (sum + sp > 6) flush();
    row.push(i);
    sum += sp;
    if (sum === 6) flush();
  });
  flush();
  return out;
};

const SPAN: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
};

// A fact board for the "at a glance" sections of Levels 4 to 6: every fact visible at once, each in a compact card.
// Cards rise in when scrolled to, tilt toward the cursor and light up under it.
export default function GlanceBoard({ headers = [], points = [] }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "hidden" | "shown">("idle"); // idle = visible, so nothing is lost if the script fails
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("hidden");
    let t: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPhase("shown");
          t = setTimeout(() => setSettled(true), 1800);
          io.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (t) clearTimeout(t);
    };
  }, []);

  const spans = pack(points.map((p) => want(p.content, p.values?.[0] ?? "")));

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={root} data-phase={phase} className="gb mt-6">
      {/* full table for screen readers and search engines */}
      <table className="sr-only">
        <thead>
          <tr>{(headers ?? []).map((h) => <th key={h} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {points.map((p) => (
            <tr key={p.content}>
              <th scope="row">{p.content}</th>
              {(p.values ?? []).map((v, i) => <td key={i}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .gb-card {
          position: relative;
          translate: 0 0;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.7), 0 1px 2px rgba(7,26,51,.25), 0 14px 30px -16px rgba(0,0,0,.5);
          transition: opacity .7s ease, translate .6s cubic-bezier(.16,1,.3,1), box-shadow .5s cubic-bezier(.16,1,.3,1);
        }
        .gb[data-phase="hidden"] .gb-card { opacity: 0; translate: 0 24px; }
        .gb-card:hover {
          translate: 0 -3px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.8), 0 0 0 1px rgba(249,184,30,.6), 0 2px 4px rgba(7,26,51,.2), 0 34px 60px -26px rgba(0,0,0,.7);
        }
        .gb-card::after {
          content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .5s ease;
          background: radial-gradient(300px circle at var(--mx, 50%) var(--my, 0px), rgba(249,184,30,.16), transparent 65%);
        }
        .gb-card:hover::after { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .gb-card { transition: none } }
      `}</style>

      <div aria-hidden="true" className="grid grid-cols-1 gap-3 md:grid-cols-6 lg:gap-4">
        {points.map((p, i) => {
          const Icon = iconFor(p.content);
          return (
            <div
              key={p.content}
              onPointerMove={onMove}
              className={`gb-card overflow-hidden rounded-2xl border border-white/70 bg-[#FAF8EC] p-4 text-primary-darkest shadow-xl md:p-5 ${SPAN[spans[i]]}`}
              style={{ transitionDelay: phase === "shown" && !settled ? `${i * 90}ms` : "0ms" }}
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-1 -top-3 select-none text-[64px] font-extrabold leading-none text-primary-darkest/[0.06]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative mb-3 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/25 text-secondary-dark">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary-dark">{p.content}</p>
              </div>
              <div className="relative">
                <GlanceVisual kind={p.content} text={p.values?.[0] ?? ""} light={false} compact={spans[i] <= 3} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}