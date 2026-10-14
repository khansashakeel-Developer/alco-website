"use client";

import { useState } from "react";
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

type Props = {
  headers: string[];
  points: { content: string; values: string[] }[];
  light?: boolean; // true when the section background is light
};

// Icon picked from the topic name, so the data files do not need to change.
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

export default function BenefitsExplorer({ headers, points, light = false }: Props) {
  const [topic, setTopic] = useState(0);
  const [lens, setLens] = useState(0);
  const [dir, setDir] = useState(1);

  const lenses = headers.slice(1);
  const n = lenses.length;
  const cur = points[topic];
  if (!cur || n === 0) return null;

  const pickLens = (l: number) => {
    setDir(l >= lens ? 1 : -1);
    setLens(l);
  };
  const pickTopic = (t: number) => {
    setDir(t >= topic ? 1 : -1);
    setTopic(t);
  };

  const other = n > 1 ? (lens + 1) % n : null;
  const next = points[topic + 1] ?? points[0];
  const nextIndex = topic + 1 < points.length ? topic + 1 : 0;
  const Icon = iconFor(cur.content);
  const NextIcon = iconFor(next.content);
  const words = (cur.values[lens] ?? "").split(" ");

  // colours switch with the section background
  const listOn = light ? "bg-primary text-white" : "bg-white/10 text-white";
  const listOff = light ? "text-primary hover:bg-primary/5" : "text-white/70 hover:bg-white/5";
  const panel = light
    ? "bg-gradient-to-br from-[#0b2545] to-[#1B507C] text-white"
    : "bg-white text-primary-darkest";
  const track = light ? "bg-white/15" : "bg-slate-200";
  const railOff = light ? "bg-white/20" : "bg-slate-200";
  const thumb = "bg-secondary text-primary-darkest";
  const lensOff = light ? "text-white/80" : "text-primary";
  const muted = light ? "text-white/60" : "text-primary-darkest/55";
  const chip = light ? "bg-white/10 hover:bg-white/15" : "bg-primary/5 hover:bg-primary/10";
  const ghost = light ? "text-white/[0.05]" : "text-primary/[0.06]";

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] lg:gap-10">
      {/* full table for screen readers and search engines */}
      <table className="sr-only">
        <thead>
          <tr>{headers.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {points.map((p) => (
            <tr key={p.content}>
              <th scope="row">{p.content}</th>
              {p.values.map((v, i) => <td key={i}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        @keyframes bx-word { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        @keyframes bx-pop { from { opacity: 0; transform: scale(.6) rotate(-12deg) } to { opacity: 1; transform: none } }
        @keyframes bx-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-5px) } }
        @media (prefers-reduced-motion: reduce) { .bx-anim, .bx-w { animation: none !important; opacity: 1 !important; transform: none !important } }
      `}</style>

      {/* ---- topics ---- */}
      <ul aria-hidden className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:block md:space-y-1.5 md:overflow-visible md:px-0">
        {points.map((p, i) => {
          const on = i === topic;
          return (
            <li key={p.content} className="shrink-0 md:shrink">
              <button
                type="button"
                onClick={() => pickTopic(i)}
                onMouseEnter={() => pickTopic(i)}
                className={`relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                  on ? `${listOn} md:translate-x-2` : listOff
                }`}
              >
                <span className={`absolute inset-y-0 left-0 w-1.5 bg-secondary transition-all duration-300 ${on ? "opacity-100" : "opacity-0"}`} />
                <span className={`text-xs font-bold ${on ? "text-secondary" : "text-secondary/60"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold md:text-[15px]">{p.content}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* ---- the statement ---- */}
      <div aria-hidden className={`relative flex flex-col overflow-hidden rounded-3xl p-6 shadow-2xl md:p-10 ${panel}`}>
        {/* ghost number + quote mark */}
        <span className={`pointer-events-none absolute -bottom-10 -right-2 select-none text-[240px] font-extrabold leading-none ${ghost}`}>
          {String(topic + 1).padStart(2, "0")}
        </span>
        <span className="pointer-events-none absolute -right-2 -top-10 select-none text-[200px] font-bold leading-none text-secondary/10">”</span>

        {/* progress rail: one segment per topic */}
        <div className="relative flex gap-1.5">
          {points.map((p, i) => (
            <button
              key={p.content}
              type="button"
              tabIndex={-1}
              onClick={() => pickTopic(i)}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= topic ? "bg-secondary" : railOff}`}
              style={{ opacity: i === topic ? 1 : i < topic ? 0.8 : 1 }}
            />
          ))}
        </div>

        {/* sliding switch (only when there is more than one lens) */}
        {n > 1 && (
          <div className={`relative mt-6 grid rounded-2xl p-1 ${track}`} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
            <span
              className={`absolute inset-y-1 rounded-xl shadow-md transition-transform duration-500 ease-[cubic-bezier(.6,.05,.2,1)] ${thumb}`}
              style={{ width: `calc(${100 / n}% - 4px)`, left: 4, transform: `translateX(calc(${lens * 100}% + ${lens * 0}px))` }}
            />
            {lenses.map((h, i) => (
              <button
                key={h}
                type="button"
                onClick={() => pickLens(i)}
                className={`relative z-10 px-3 py-2.5 text-center text-xs font-bold leading-tight transition-colors duration-300 md:text-sm ${
                  i === lens ? "text-primary-darkest" : lensOff
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        )}

        {/* topic + statement */}
        <div key={`${topic}-${lens}`} className="relative mt-7 flex-1">
          <div className="flex items-center gap-4">
            <span
              className="bx-anim flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary-darkest shadow-lg md:h-16 md:w-16"
              style={{ animation: "bx-pop .5s cubic-bezier(.2,.8,.2,1) both, bx-float 4s ease-in-out .6s infinite" }}
            >
              <Icon className="h-7 w-7 md:h-8 md:w-8" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary-dark">{cur.content}</p>
              <p className={`mt-1 text-xs font-semibold ${muted}`}>
                {String(topic + 1).padStart(2, "0")} / {String(points.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          <div className="mt-3 h-[3px] w-16 rounded-full bg-secondary" />

          <p className="mt-6 text-2xl font-semibold leading-snug md:text-[34px] md:leading-[1.25]">
            {words.map((w, i) => (
              <span
                key={i}
                className="bx-w mr-[0.28em] inline-block"
                style={{ animation: `bx-word .55s cubic-bezier(.2,.8,.2,1) ${i * 35}ms both` }}
              >
                {w}
              </span>
            ))}
          </p>
        </div>

        {/* up next */}
        <button
          type="button"
          onClick={() => pickTopic(nextIndex)}
          className={`relative mt-8 flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300 hover:translate-x-1 ${chip}`}
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${light ? "bg-white/15 text-secondary" : "bg-primary/10 text-primary"}`}>
            <NextIcon className="h-4 w-4" />
          </span>
          <span className="flex-1">
            <span className={`block text-[10px] font-bold uppercase tracking-[0.2em] ${muted}`}>
              {topic + 1 < points.length ? "Up next" : "Back to the start"}
            </span>
            <span className="block text-sm font-semibold">{next.content}</span>
          </span>
          <span className="text-secondary-dark">→</span>
        </button>

        {/* footer: other lens + prev/next */}
        <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-current/10 pt-5">
          {other !== null ? (
            <button
              type="button"
              onClick={() => pickLens(other)}
              className="text-sm font-semibold text-secondary-dark transition-transform hover:translate-x-1"
            >
              Also see: {lenses[other]} →
            </button>
          ) : <span />}
          <div className="flex items-center gap-2">
            <span className="mr-2 text-xs font-medium opacity-60">{topic + 1} of {points.length}</span>
            <button type="button" aria-label="Previous topic" disabled={topic === 0} onClick={() => pickTopic(topic - 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-current/20 transition hover:bg-secondary hover:text-primary-darkest disabled:opacity-30">←</button>
            <button type="button" aria-label="Next topic" disabled={topic === points.length - 1} onClick={() => pickTopic(topic + 1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-current/20 transition hover:bg-secondary hover:text-primary-darkest disabled:opacity-30">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}