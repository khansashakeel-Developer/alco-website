"use client";

import { useState } from "react";

type Props = {
  headers: string[];
  points: { content: string; values: string[] }[];
  light?: boolean; // true when the section background is light
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

  // colours switch with the section background
  const listOn = light ? "bg-primary text-white" : "bg-white/10 text-white";
  const listOff = light ? "text-primary hover:bg-primary/5" : "text-white/70 hover:bg-white/5";
  const panel = light
    ? "bg-gradient-to-br from-[#0b2545] to-[#1B507C] text-white"
    : "bg-white text-primary-darkest";
  const track = light ? "bg-white/15" : "bg-slate-200";
  const thumb = "bg-secondary text-primary-darkest";
  const lensOff = light ? "text-white/80" : "text-primary";

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
        @keyframes bx-next { from { opacity: 0; transform: translateX(36px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes bx-prev { from { opacity: 0; transform: translateX(-36px) } to { opacity: 1; transform: translateX(0) } }
        @media (prefers-reduced-motion: reduce) { .bx-anim { animation: none !important } }
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
      <div aria-hidden className={`relative overflow-hidden rounded-3xl p-6 shadow-2xl md:p-10 ${panel}`}>
        <span className="pointer-events-none absolute -right-2 -top-10 select-none text-[200px] font-bold leading-none text-secondary/10">”</span>

        {/* sliding switch */}
        {n > 1 && (
          <div className={`relative grid rounded-2xl p-1 ${track}`} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
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
        <div key={`${topic}-${lens}`} className="bx-anim mt-8 min-h-[180px]" style={{ animation: `${dir > 0 ? "bx-next" : "bx-prev"} .55s cubic-bezier(.2,.8,.2,1) both` }}>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary-dark">{cur.content}</p>
          <p className="mt-4 text-xl font-semibold leading-snug md:text-3xl md:leading-snug">{cur.values[lens]}</p>
        </div>

        {/* footer: other lens + prev/next */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-current/10 pt-5">
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