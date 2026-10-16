"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import ArslanPhoto from "@/assets/intro-arsalan-larik/arsalan-larik-clean.webp";
import BismillahPhoto from "@/assets/about-us/bismillah-pervez-clean.webp";
import { Award, Check, FileText, KeyRound, Mic, PenLine, Repeat, Trophy, Video } from "lucide-react";

type Props = { kind: string; text: string; light?: boolean; compact?: boolean };

const GOLD = "#F9B81E";
const NAVY = "#071a33";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function useCount(to: number, ms = 1100) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / ms, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return v;
}

const bigText = "gv-big text-xl font-semibold leading-snug md:text-2xl";

function Plain({ text }: { text: string }) {
  return (
    <div>
      <p className="gv-big text-xl font-semibold leading-snug md:text-2xl">{text}</p>
      <span aria-hidden="true" className="mt-3 block h-[3px] w-12 rounded-full" style={{ background: GOLD }} />
    </div>
  );
}

/* Duration: a count-up and one tile per day. The tiles ripple like a wave; hover one to read what that day is. */
function Duration({ text }: { text: string }) {
  const days = Number(text.match(/(\d+)\s*days?/i)?.[1] ?? 0);
  const train = Number(text.match(/(\d+)\s*training/i)?.[1] ?? 0);
  const evalD = Number(text.match(/(\d+)\s*evaluation/i)?.[1] ?? 0);
  const hours = text.match(/(\d+)\s*hours?/i)?.[1];
  const n = useCount(days);
  const [hover, setHover] = useState<number | null>(null);
  if (!days) return <Plain text={text} />;
  const isEval = (i: number) => train > 0 && i >= train;
  return (
    <div>
      <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className="gv-num text-6xl font-extrabold leading-none tabular-nums md:text-7xl" style={{ color: GOLD }}>
          {n}
        </span>
        <span className="pb-1 text-xl font-semibold">days</span>
        {hours && (
          <span className="mb-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold" style={{ background: GOLD, color: NAVY }}>
            {hours} hours
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5" onMouseLeave={() => setHover(null)}>
        {Array.from({ length: days }).map((_, i) => (
          <span
            key={i}
            onMouseEnter={() => setHover(i)}
            className="gv-tile gv-day flex h-7 w-7 cursor-default items-center justify-center rounded-md text-[10px] font-bold"
            style={{
              ["--d" as string]: `${i * 60}ms`,
              ...(isEval(i) ? { border: `2px dashed ${GOLD}` } : { background: GOLD, color: NAVY }),
            }}
          >
            {i + 1}
          </span>
        ))}
      </div>
      {train > 0 && (
        <p className="mt-3 flex min-h-[1.25rem] flex-wrap gap-x-5 gap-y-1 text-xs font-medium opacity-85">
          {hover !== null ? (
            <span className="font-semibold">
              Day {hover + 1}: {isEval(hover) ? "evaluation day" : "training day"}
            </span>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: GOLD }} /> {train} training
              </span>
              {evalD > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ border: `2px dashed ${GOLD}` }} /> {evalD} evaluation
                </span>
              )}
            </>
          )}
        </p>
      )}
    </div>
  );
}

/* Delivery: a live room (a different tile lights up as if each person speaks) and a moving sound meter. */
function Delivery({ text, soft, line }: { text: string; soft: string; line: string }) {
  return (
    <div>
      <div className={`rounded-xl border p-2 ${soft} ${line}`}>
        <div className="flex items-center gap-1.5 px-1 pb-2">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
          <span className="h-2 w-2 rounded-full bg-green-400/80" />
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
            <span className="gv-blink h-1.5 w-1.5 rounded-full bg-white" /> LIVE
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="gv-speak flex aspect-[16/7] items-center justify-center rounded-md bg-black/10"
              style={{ animationDelay: `${i * 0.9}s` }}
            >
              <Video className="h-3.5 w-3.5 opacity-40" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span aria-hidden="true" className="flex h-5 items-end gap-[3px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="gv-eq w-[3px] rounded-full" style={{ background: GOLD, animationDelay: `${i * 0.17}s` }} />
          ))}
        </span>
        <p className={bigText}>{text}</p>
      </div>
    </div>
  );
}

/* Prerequisite: the six-level ladder; the required rung pulses. */
function Prerequisite({ text }: { text: string }) {
  const m = text.match(/Levels?\s+([\d,\sand]+)/i);
  const req = m ? (m[1].match(/\d/g) ?? []).map(Number) : [];
  return (
    <div>
      <div className="flex items-start">
        {[1, 2, 3, 4, 5, 6].map((lv, i) => {
          const on = req.includes(lv);
          return (
            <Fragment key={lv}>
              {i > 0 && (
                <span className="relative mt-[17px] h-0.5 flex-1 overflow-hidden rounded-full bg-current/15">
                  {req.includes(lv) && <span className="gv-flow absolute inset-y-0 left-0 w-full" style={{ background: GOLD }} />}
                </span>
              )}
              <span className="gv-tile gv-pop flex flex-col items-center gap-1" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${on ? "gv-ring" : ""}`}
                  style={on ? { background: GOLD, color: NAVY } : { border: "2px solid currentColor", opacity: 0.3 }}
                >
                  {on ? <Check className="h-4 w-4" aria-hidden="true" /> : lv}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={on ? { color: GOLD } : { opacity: 0.4 }}>
                  {on ? "Required" : `L${lv}`}
                </span>
              </span>
            </Fragment>
          );
        })}
      </div>
      <p className={`mt-3 ${bigText}`}>{text}</p>
    </div>
  );
}

/* Entry: the route in, step by step; each marker bobs gently. */
function Entry({ text }: { text: string }) {
  const steps = text
    .replace(/^By\s+/i, "")
    .split(/,\s*(?:and\s+)?|\s+and\s+(?=a |an |the )/i)
    .map((s) => s.trim())
    .filter(Boolean);
  return (
    <ol>
      {steps.map((s, i) => (
        <li key={i} className="gv-rise relative flex gap-3 pb-4 last:pb-0" style={{ animationDelay: `${i * 160}ms` }}>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="absolute left-[17px] top-9 h-[calc(100%-2.25rem)] w-0.5 rounded-full opacity-25" style={{ background: GOLD }} />
          )}
          <span
            className="gv-bob flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
            style={{ background: GOLD, color: NAVY, animationDelay: `${i * 0.4}s` }}
          >
            {steps.length === 1 ? <KeyRound className="h-4 w-4" aria-hidden="true" /> : i + 1}
          </span>
          <span className={`pt-1 ${steps.length === 1 ? bigText : "text-lg font-semibold leading-snug"}`}>{cap(s)}</span>
        </li>
      ))}
    </ol>
  );
}

/* Assessed / Standard: one card per part; hover lifts it. */
function Assessed({ text, soft, line }: { text: string; soft: string; line: string }) {
  let lead = "";
  let body = text;
  if (text.includes(":")) {
    lead = text.split(":")[0];
    body = text.split(":").slice(1).join(":");
  }
  const parts = body
    .split(lead ? /,\s*|\s+and\s+/i : /,\s*(?:and\s+)?/i)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length < 2) return <Plain text={text} />;
  const icons = [PenLine, Mic, Trophy, FileText];
  return (
    <div>
      {lead && <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{lead}</p>}
      <div className="grid gap-2.5 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]" style={{ ["--n" as string]: parts.length } as React.CSSProperties}>
        {parts.map((p, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={i}
              className={`gv-rise gv-tile group relative overflow-hidden rounded-xl border p-3.5 ${soft} ${line}`}
              style={{ animationDelay: `${i * 140}ms` }}
            >
              <span aria-hidden="true" className="absolute -right-1 -top-2 select-none text-5xl font-extrabold leading-none opacity-[0.08]">
                {i + 1}
              </span>
              <span className="gv-wiggle relative flex h-8 w-8 items-center justify-center rounded-full" style={{ background: GOLD, color: NAVY }}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="relative mt-2.5 text-sm font-semibold leading-snug md:text-base">{cap(p)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Certification: a gold seal with a slow sheen. */
function Certification({ text }: { text: string }) {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <div className="gv-tile relative h-28 w-28 shrink-0">
        <span className="gv-spin absolute inset-0 rounded-full" style={{ border: `2px dashed ${GOLD}` }} />
        <span
          className="absolute inset-2.5 overflow-hidden rounded-full shadow-xl"
          style={{ background: `linear-gradient(145deg,#FFD66B,${GOLD} 55%,#E39B00)` }}
        >
          <span className="gv-shine absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/50" />
          <Award className="absolute inset-0 m-auto h-10 w-10" style={{ color: NAVY }} aria-hidden="true" />
        </span>
      </div>
      <p className={`min-w-[10rem] flex-1 ${bigText}`}>{text}</p>
    </div>
  );
}

/* Revisit: five year-dots around a loop; struck through when the revisit does not apply. */
function Revisit({ text }: { text: string }) {
  const negated = /not apply|does not|no revisit/i.test(text);
  return (
    <div className="flex flex-wrap items-center gap-5">
      <div className="relative h-28 w-28 shrink-0">
        <Repeat className="gv-spin-slow absolute inset-0 m-auto h-12 w-12" style={{ color: GOLD }} aria-hidden="true" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 -ml-1 -mt-1 h-2 w-2 rounded-full"
            style={{ background: GOLD, opacity: negated ? 0.45 : 1, transform: `rotate(${i * 72}deg) translateY(-48px)` }}
          />
        ))}
        {negated && (
          <span className="absolute left-1/2 top-1/2 w-[125%] -translate-x-1/2 -translate-y-1/2 -rotate-45">
            <span className="gv-draw block h-[3px] rounded-full bg-red-500" />
          </span>
        )}
      </div>
      <p className={`min-w-[10rem] flex-1 ${bigText}`}>{text}</p>
    </div>
  );
}

/* Arranged with: each person as a pill with their photo; a fine gold link between them. */
const PHOTOS: { test: RegExp; src: typeof ArslanPhoto }[] = [
  { test: /bismillah/i, src: BismillahPhoto },
  { test: /arslan/i, src: ArslanPhoto },
];

function Arranged({ text }: { text: string }) {
  const names = text.split(/\s+and\s+|,\s*/).map((s) => s.trim()).filter(Boolean);
  return (
    <div className="flex flex-wrap items-center gap-y-3">
      {names.map((nm, i) => {
        const photo = PHOTOS.find((p) => p.test.test(nm))?.src;
        const initials = nm.split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
        return (
          <Fragment key={nm}>
            {i > 0 && (
              <span aria-hidden="true" className="relative mx-1 hidden h-px w-10 sm:block" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}>
                <span className="gv-blink absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: GOLD }} />
              </span>
            )}
            <div
              className="gv-rise group flex items-center gap-3 rounded-full border border-[#071a33]/10 bg-white py-1.5 pl-1.5 pr-5 shadow-[0_8px_20px_-12px_rgba(7,26,51,.45)] transition-shadow duration-500 hover:shadow-[0_14px_28px_-12px_rgba(7,26,51,.55)]"
              style={{ animationDelay: `${i * 160}ms` }}
            >
              <span
                className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-white transition-all duration-500 group-hover:ring-4"
                style={{ background: `linear-gradient(160deg,#FFD66B,${GOLD})`, ["--tw-ring-color" as string]: GOLD }}
              >
                {photo ? (
                  <Image src={photo} alt={nm} fill sizes="48px" className="object-cover object-top" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-base font-extrabold" style={{ color: NAVY }}>{initials}</span>
                )}
              </span>
              <span className="text-base font-semibold leading-tight md:text-lg">{nm}</span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default function GlanceVisual({ kind, text, light = false, compact = false }: Props) {
  const s = kind.toLowerCase();
  const soft = light ? "bg-white/10" : "bg-[#071a33]/[0.05]";
  const line = light ? "border-white/25" : "border-[#071a33]/15";

  let body: React.ReactNode;
  if (/duration|^length/.test(s)) body = <Duration text={text} />;
  else if (/delivery/.test(s) || (/^format/.test(s) && /zoom|live/i.test(text))) body = <Delivery text={text} soft={soft} line={line} />;
  else if (/prerequisite|requirement$/.test(s) && !/unique/.test(s)) body = <Prerequisite text={text} />;
  else if (/^entry|apply|application/.test(s)) body = <Entry text={text} />;
  else if (/assess|^standard/.test(s)) body = <Assessed text={text} soft={soft} line={line} />;
  else if (/certif/.test(s)) body = <Certification text={text} />;
  else if (/revisit|repeat/.test(s)) body = <Revisit text={text} />;
  else if (/arranged|mentor/.test(s)) body = <Arranged text={text} />;
  else body = <Plain text={text} />;

  return (
    <>
      <style>{`
        @keyframes gv-pop { from { opacity: 0; transform: scale(.6) } to { opacity: 1; transform: none } }
        @keyframes gv-rise { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        @keyframes gv-spin { to { transform: rotate(360deg) } }
        @keyframes gv-blink { 0%,100% { opacity: 1 } 50% { opacity: .25 } }
        @keyframes gv-speak { 0%,16%,100% { box-shadow: none; transform: none } 8% { box-shadow: 0 0 0 2px ${GOLD}; transform: scale(1.05) } }
        @keyframes gv-shine { 0%,55% { left: -60% } 100% { left: 130% } }
        @keyframes gv-draw { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes gv-wave { 0%,55%,100% { transform: none } 25% { transform: translateY(-5px) } }
        @keyframes gv-eq { 0%,100% { height: 4px } 50% { height: 18px } }
        @keyframes gv-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
        @keyframes gv-float { 0%,100% { transform: translateY(0) rotate(0) } 50% { transform: translateY(-5px) rotate(2deg) } }
        @keyframes gv-ring { 0% { box-shadow: 0 0 0 0 ${GOLD}aa } 100% { box-shadow: 0 0 0 10px ${GOLD}00 } }
        @keyframes gv-flow { 0% { transform: translateX(-100%) } 60%,100% { transform: translateX(0) } }
        .gv-pop { animation: gv-pop .5s cubic-bezier(.2,.8,.2,1) both; animation-delay: var(--d, 0ms) }
        .gv-rise { animation: gv-rise .6s cubic-bezier(.2,.8,.2,1) both }
        .gv-day { animation: gv-pop .45s cubic-bezier(.2,.8,.2,1) both, gv-wave 3.6s ease-in-out infinite; animation-delay: var(--d), calc(var(--d) + 1.4s) }
        .gv-tile { transition: translate .25s ease, scale .25s ease, box-shadow .25s ease }
        .gv-tile:hover { translate: 0 -3px; scale: 1.1 }
        .gv-spin { animation: gv-spin 22s linear infinite }
        .gv-spin-slow { animation: gv-spin 14s linear infinite }
        .gv-blink { animation: gv-blink 1.4s ease-in-out infinite }
        .gv-speak { animation: gv-speak 5.4s ease-in-out infinite }
        .gv-shine { animation: gv-shine 3.2s ease-in-out infinite }
        .gv-draw { animation: gv-draw .7s .5s ease-out both; transform-origin: left }
        .gv-eq { height: 4px; animation: gv-eq 1s ease-in-out infinite }
        .gv-bob { animation: gv-bob 2.6s ease-in-out infinite }
        .gv-float { animation: gv-float 4.5s ease-in-out infinite }
        .gv-ring { animation: gv-ring 1.8s ease-out infinite }
        .gv-flow { animation: gv-flow 2.4s ease-in-out infinite }
        .gv-wiggle { transition: rotate .3s ease }
        .group:hover .gv-wiggle { rotate: 12deg }
        .gv-sm .gv-big { font-size: 1.05rem !important; line-height: 1.35 !important }
        .gv-sm .gv-num { font-size: 3rem !important }
        @media (prefers-reduced-motion: reduce) {
          .gv-pop, .gv-rise, .gv-day, .gv-spin, .gv-spin-slow, .gv-blink, .gv-speak, .gv-shine, .gv-draw, .gv-eq, .gv-bob, .gv-float, .gv-ring, .gv-flow { animation: none !important; opacity: 1 !important; transform: none !important }
          .gv-eq { height: 10px }
        }
      `}</style>
      <div className={compact ? "gv-sm" : undefined}>{body}</div>
    </>
  );
}