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
import GlanceBoard from "./GlanceBoard";

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

const STEP_MS = 7000; // how long each topic shows while it plays by itself

export default function BenefitsExplorer({
  headers,
  points,
  light = false,
}: Props) {
  const [topic, setTopic] = useState(0);
  const [lens, setLens] = useState(0);
  const [anim, setAnim] = useState<"up" | "next" | "prev">("up");
  const [auto, setAuto] = useState(true); // plays by itself until the visitor takes control
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lenses = headers.slice(1);
  const n = lenses.length;
  const total = points.length;
  const cur = points[topic];
  if (!cur || n === 0) return null;
    if (n === 1) return <GlanceBoard headers={headers} points={points} light={light} />;

  const go = (t: number, manual = true) => {
    if (t === topic || t < 0 || t >= total) return;
    setAnim(t > topic ? "next" : "prev");
    setTopic(t);
    if (manual) setAuto(false);
  };
  const pickLens = (l: number) => {
    setAnim("up");
    setLens(l);
    setAuto(false);
  };
  const advance = () => {
    setAnim("next");
    setTopic((t) => (t + 1) % total);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      go(Math.min(topic + 1, total - 1));
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      go(Math.max(topic - 1, 0));
    }
  };

  const other = n > 1 ? (lens + 1) % n : null;
  const Icon = iconFor(cur.content);
  const playing = auto && inView && !hovered;

  // colours switch with the section background
  const listOn = "border-secondary bg-secondary text-primary-darkest shadow-lg";
  const listOff = light
    ? "border-primary/20 text-primary hover:bg-primary/5"
    : "border-white/20 text-white/85 hover:bg-white/10";
  const panel = light
    ? "bg-gradient-to-br from-[#0b2545] to-[#1B507C] text-white"
    : "bg-[#FAF8EC] text-primary-darkest";
  const track = light ? "bg-white/10" : "bg-slate-100";
  const lensOff = light ? "text-white/70" : "text-primary/70";
  const muted = light ? "text-white/55" : "text-primary-darkest/50";
  const railOff = light ? "bg-white/15" : "bg-slate-200";

  const statementAnim =
    anim === "next" ? "bx-next" : anim === "prev" ? "bx-prev" : "bx-up";

  return (
    <div
      ref={root}
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="mt-8 grid gap-6 outline-none md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] lg:gap-12"
    >
      {/* full table for screen readers and search engines */}
      <table className="sr-only">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {points.map((p) => (
            <tr key={p.content}>
              <th scope="row">{p.content}</th>
              {p.values.map((v, i) => (
                <td key={i}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        @keyframes bx-up { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
        @keyframes bx-next { from { opacity: 0; transform: translateX(28px) } to { opacity: 1; transform: none } }
        @keyframes bx-prev { from { opacity: 0; transform: translateX(-28px) } to { opacity: 1; transform: none } }
        @keyframes bx-fill { from { width: 0% } to { width: 100% } }
        @keyframes bx-nudge { 0%,100% { transform: translateX(0) } 50% { transform: translateX(4px) } }
        .bx-up { animation: bx-up .5s ease both }
        .bx-next { animation: bx-next .5s cubic-bezier(.2,.8,.2,1) both }
        .bx-prev { animation: bx-prev .5s cubic-bezier(.2,.8,.2,1) both }
        @media (prefers-reduced-motion: reduce) {
          .bx-up, .bx-next, .bx-prev { animation: none !important; opacity: 1 !important; transform: none !important }
          .bx-fill { animation: none !important }
        }
      `}</style>

      {/* ---- topics ---- */}
      <ul
        aria-hidden
        className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 md:mx-0 md:block md:space-y-2 md:overflow-visible md:px-0"
      >
        {points.map((p, i) => {
          const on = i === topic;
          return (
            <li key={p.content} className="shrink-0 md:shrink">
              <button
                type="button"
                onClick={() => go(i)}
                className={`relative flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${on ? listOn : listOff}`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${on ? "bg-primary-darkest text-secondary" : "bg-secondary/15 text-secondary"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-sm font-semibold md:text-[15px]">
                  {p.content}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* ---- the statement ---- */}
      <div
        aria-hidden
        className={`relative flex min-h-[430px] flex-col overflow-hidden rounded-2xl border-t-4 border-secondary p-6 pb-24 shadow-xl md:p-10 md:pb-24 ${panel}`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -top-4 right-4 select-none text-[150px] font-extrabold leading-none ${light ? "text-white/[0.06]" : "text-primary-darkest/[0.06]"}`}
        >
          {String(topic + 1).padStart(2, "0")}
        </span>
        {/* progress rail: click a segment to jump; the current one fills while it plays by itself */}
        <div className="flex gap-1.5">
          {points.map((p, i) => (
            <button
              key={p.content}
              type="button"
              tabIndex={-1}
              title={p.content}
              onClick={() => go(i)}
              className="group flex h-4 flex-1 items-center"
            >
              <span
                className={`relative h-[3px] w-full overflow-hidden rounded-full transition-all duration-300 group-hover:h-[5px] ${i < topic ? "bg-secondary" : railOff}`}
              >
                {i === topic && (
                  <span
                    key={`${topic}-${auto}`}
                    className={`bx-fill absolute inset-y-0 left-0 rounded-full bg-secondary ${auto ? "" : "w-full"}`}
                    style={
                      auto
                        ? {
                            animation: `bx-fill ${STEP_MS}ms linear forwards`,
                            animationPlayState: playing ? "running" : "paused",
                          }
                        : undefined
                    }
                    onAnimationEnd={() => auto && advance()}
                  />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* switch between the two views */}
        {n > 1 && (
          <div
            className={`mt-5 inline-flex w-full rounded-full p-1 md:w-auto ${track}`}
          >
            {lenses.map((h, i) => (
              <button
                key={h}
                type="button"
                onClick={() => pickLens(i)}
                className={`flex-1 rounded-full px-3 py-2 text-center text-xs font-semibold transition-all duration-300 md:text-sm ${
                  i === lens
                    ? "bg-secondary text-primary-darkest shadow-sm"
                    : `${lensOff} hover:bg-white/10`
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        )}

        {/* topic + statement: slides in from the direction you are moving */}
        <div
          key={`${topic}-${lens}`}
          className={`${statementAnim} mt-8 flex flex-1 flex-col justify-center`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/15 text-secondary-dark">
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-dark">
              {cur.content}
            </p>
          </div>

          <p className="mt-5 text-3xl font-semibold leading-snug md:text-[44px] md:leading-[1.2]">
            {cur.values[lens]}
          </p>
          <span
            aria-hidden="true"
            className="mt-5 block h-[3px] w-14 rounded-full bg-secondary"
          />
        </div>

        {/* footer: other view + prev/next */}
        <div className="absolute inset-x-6 bottom-5 flex items-center justify-between gap-3 border-t border-current/10 pt-4 md:inset-x-10">
          {other !== null ? (
            <button
              type="button"
              onClick={() => pickLens(other)}
              className="text-sm font-semibold text-secondary-dark transition-transform hover:translate-x-1"
            >
              Also see: {lenses[other]} →
            </button>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-2">
            <span className={`mr-2 text-xs font-medium ${muted}`}>
              {topic + 1} of {total}
            </span>
            <button
              type="button"
              aria-label="Previous topic"
              disabled={topic === 0}
              onClick={() => go(topic - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-current/20 transition hover:scale-110 hover:bg-secondary hover:text-primary-darkest disabled:opacity-30 disabled:hover:scale-100"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next topic"
              disabled={topic === total - 1}
              onClick={() => go(topic + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-current/20 transition hover:scale-110 hover:bg-secondary hover:text-primary-darkest disabled:opacity-30 disabled:hover:scale-100"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
