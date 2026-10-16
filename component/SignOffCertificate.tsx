"use client";

import { useEffect, useRef, useState } from "react";

// The sentences are taken from the section's own paragraph.
const T = {
  apply: "On completion you apply to the Board for Master Trainer level membership.",
  evidence: "You submit your evidence across all four pillars.",
  sig1: "Every AL&CO Master Trainer is signed off by two Master Trainers in good standing: Arslan Larik signs as one.",
  sig2: "The second is another certified Master Trainer appointed at our discretion.",
  rule: "Two recognised Master Trainer signatures on the certificate is a firm rule at AL&CO, a standard we hold ourselves to without exception, and that double, independent sign-off is exactly what makes the grade worth holding.",
};

const ROWS = [
  { n: "01", label: "Leadership", pending: "PENDING", done: "SUBMITTED" },
  { n: "02", label: "Mentorship", pending: "PENDING", done: "SUBMITTED" },
  { n: "03", label: "NLP training experience", pending: "PENDING", done: "SUBMITTED" },
  { n: "04", label: "Community", pending: "PENDING", done: "SUBMITTED" },
  { n: "S1", label: "Signature 1: Arslan Larik", pending: "PENDING", done: "SIGNED" },
  { n: "S2", label: "Signature 2: Master Trainer in good standing", pending: "PENDING", done: "SIGNED" },
];
const FINAL = { label: "Master Trainer certificate", pending: "WAITING", done: "MASTER TRAINER" };

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const COLORS = ["#F9B81E", "#FFE29D", "#F09623", "#FFFFFF", "#6FA8DC", "#12395c", "#FF6B6B", "#7ED957"];

type P = { x: number; y: number; vx: number; vy: number; w: number; h: number; r: number; vr: number; c: string; life: number; round: boolean };

// A departures-board style word: each letter flips through random letters, then settles on the right one.
function Flap({ text, width, gold = false }: { text: string; width: number; gold?: boolean }) {
  const padded = text.padEnd(width, " ").slice(0, width);
  const [cells, setCells] = useState<{ c: string; k: number }[]>(() => padded.split("").map((c) => ({ c, k: 0 })));
  const timers = useRef<number[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCells(padded.split("").map((c) => ({ c, k: 0 })));
      return;
    }
    padded.split("").forEach((target, i) => {
      const spins = 5 + (i % 4);
      for (let s = 0; s <= spins; s++) {
        const id = window.setTimeout(() => {
          setCells((prev) => {
            const next = prev.slice();
            const last = s === spins;
            next[i] = { c: last ? target : target === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)], k: (prev[i]?.k ?? 0) + 1 };
            return next;
          });
        }, i * 55 + s * 55);
        timers.current.push(id);
      }
    });
    return () => timers.current.forEach(clearTimeout);
  }, [padded]);

  return (
    <span className="inline-flex gap-[3px]" aria-hidden="true">
      {cells.map((cell, i) => (
        <span
          key={i}
          className={`relative inline-flex h-7 w-[1.05rem] sm:w-6 items-center justify-center overflow-hidden rounded-[3px] font-mono text-[13px] font-bold md:h-11 md:w-9 md:text-2xl ${cell.c === " " ? "bg-transparent" : gold ? "bg-secondary text-primary-darkest" : "bg-[#0d2a47] text-white"}`}
        >
          <span key={cell.k} className="so-flip block">{cell.c}</span>
          {cell.c !== " " && <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/40" />}
        </span>
      ))}
    </span>
  );
}

// A sign-off board: every step is a row that flips from PENDING as it is completed, in order.
// Click the row that is ready (or press Enter) to complete it. The final row flips once everything above is done.
export default function SignOffCertificate() {
  const [done, setDone] = useState(0);
  const total = ROWS.length;
  const certified = done === total;
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const parts = useRef<P[]>([]);
  const loop = useRef(0);
  const timeouts = useRef<number[]>([]);

  const frame = () => {
    const c = cv.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    parts.current = parts.current.filter((p) => p.life > 0 && p.y < c.height + 40);
    for (const p of parts.current) {
      p.vy += 0.16;
      p.vx *= 0.992;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.life -= 1;
      ctx.save();
      ctx.globalAlpha = Math.min(1, p.life / 40);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill(); }
      else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    loop.current = parts.current.length ? requestAnimationFrame(frame) : 0;
  };

  // Fire confetti from a point: angle in radians (0 = right, -PI/2 = up).
  const burst = (x: number, y: number, count: number, angle: number, spread: number, power: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let i = 0; i < count; i++) {
      const a = angle + (Math.random() - 0.5) * spread;
      const v = power * (0.45 + Math.random() * 0.75);
      parts.current.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, w: 6 + Math.random() * 7, h: 4 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: COLORS[Math.floor(Math.random() * COLORS.length)], life: 140 + Math.random() * 90, round: Math.random() < 0.25 });
    }
    if (!loop.current) loop.current = requestAnimationFrame(frame);
  };

  useEffect(() => {
    const fit = () => {
      const b = box.current, c = cv.current;
      if (b && c) { c.width = b.offsetWidth; c.height = b.offsetHeight; }
    };
    fit();
    window.addEventListener("resize", fit);
    return () => { window.removeEventListener("resize", fit); cancelAnimationFrame(loop.current); timeouts.current.forEach(clearTimeout); };
  }, []);

  const complete = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const bx = box.current, cn = cv.current;
    if (bx && cn && (cn.width !== bx.offsetWidth || cn.height !== bx.offsetHeight)) { cn.width = bx.offsetWidth; cn.height = bx.offsetHeight; }
    const b = box.current?.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    const last = i + 1 === total;
    if (b) burst(r.right - b.left - 60, r.top - b.top + r.height / 2, last ? 30 : 22, -Math.PI / 2, 1.6, last ? 7 : 5);
    setDone(i + 1);
    if (last && b) {
      const W = b.width, H = b.height;
      const wave = (delay: number, n: number) => timeouts.current.push(window.setTimeout(() => {
        burst(0, H, n, -Math.PI / 3, 0.7, 17);
        burst(W, H, n, (-2 * Math.PI) / 3, 0.7, 17);
      }, delay));
      wave(250, 70); wave(900, 60); wave(1700, 60);
      timeouts.current.push(window.setTimeout(() => burst(W / 2, 0, 90, Math.PI / 2, 2.6, 4), 1200));
    }
  };

  const reset = () => { setDone(0); parts.current = []; timeouts.current.forEach(clearTimeout); timeouts.current = []; };

  const caption = certified ? T.rule : done === 0 ? T.apply : done < 4 ? T.evidence : done === 4 ? T.sig1 : T.sig2;

  return (
    <div className="mx-auto my-10 w-full max-w-6xl text-start">
      <style>{`
        @keyframes so-flip { 0% { transform: rotateX(-90deg); opacity: .2 } 100% { transform: rotateX(0); opacity: 1 } }
        .so-flip { animation: so-flip .16s ease-out both; transform-origin: 50% 50% }
        @keyframes so-ping { 0% { box-shadow: 0 0 0 0 rgba(249,184,30,.6) } 100% { box-shadow: 0 0 0 14px rgba(249,184,30,0) } }
        .so-ping { animation: so-ping 1.4s ease-out infinite }
        @keyframes so-nudge { 0%,100% { transform: translateX(0) } 50% { transform: translateX(5px) } }
        .so-nudge { animation: so-nudge 1s ease-in-out infinite }
        @keyframes so-spin { to { transform: translate(-50%,-50%) rotate(360deg) } }
        .so-rays { background: repeating-conic-gradient(from 0deg, rgba(249,184,30,.55) 0deg 10deg, transparent 10deg 24deg); animation: so-spin 14s linear infinite; mask-image: radial-gradient(circle, #000 0, transparent 62%); -webkit-mask-image: radial-gradient(circle, #000 0, transparent 62%) }
        @keyframes so-sweep { 0% { transform: translateX(-130%) skewX(-12deg) } 100% { transform: translateX(380%) skewX(-12deg) } }
        .so-sweep { animation: so-sweep 2.4s ease-in-out .3s infinite }
        @keyframes so-glow { 0%,100% { box-shadow: 0 0 0 4px rgba(249,184,30,.35), 0 0 40px 6px rgba(249,184,30,.35) } 50% { box-shadow: 0 0 0 8px rgba(249,184,30,.2), 0 0 80px 18px rgba(249,184,30,.5) } }
        .so-glow { animation: so-glow 2s ease-in-out infinite }
        @keyframes so-win { 0% { transform: scale(.9) } 50% { transform: scale(1.06) } 100% { transform: scale(1.02) } }
        .so-win { animation: so-win .7s cubic-bezier(.2,.8,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .so-flip, .so-ping, .so-rays, .so-sweep, .so-glow, .so-win, .so-nudge { animation: none } }
      `}</style>

      <p className="sr-only">
        The Master Trainer certificate rests on four pillars: leadership, mentorship, NLP training experience and community. It carries two Master Trainer signatures.
      </p>

      <p aria-live="polite" className="mx-auto mb-4 min-h-[4.5rem] max-w-2xl text-center font-outfit text-base leading-relaxed text-primary md:text-lg">
        {caption}
      </p>

      {!certified && (
        <p className="mx-auto mb-3 flex w-fit max-w-full items-center gap-2 rounded-full bg-secondary px-4 py-2 text-center font-outfit text-sm font-bold text-primary-darkest shadow-md">
          <span aria-hidden="true" className="so-ping h-2.5 w-2.5 shrink-0 rounded-full bg-primary-darkest" />
          Tap the glowing row to complete each step
        </p>
      )}
      <div ref={box} className={`relative rounded-3xl bg-primary-darkest p-3 shadow-2xl ring-1 transition-shadow duration-700 md:p-5 ${certified ? "so-glow ring-secondary" : "ring-primary/30"}`}>
        <canvas ref={cv} aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 h-full w-full" />
        <div className="mb-3 flex items-center justify-between px-2 font-outfit">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-secondary">AL&amp;CO</span>
          <span className="text-xs font-semibold text-white/70">{done} / {total}</span>
        </div>
        <div className="mb-3 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-secondary transition-all duration-700" style={{ width: `${(done / total) * 100}%` }} />
        </div>

        <ol className="space-y-2">
          {ROWS.map((r, i) => {
            const isDone = done > i;
            const ready = done === i;
            return (
              <li key={r.n}>
                <button
                  type="button"
                  disabled={!ready}
                  onClick={(e) => complete(i, e)}
                  aria-label={`${r.label}: ${isDone ? r.done : r.pending}`}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-start outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-secondary md:gap-4 md:px-4 md:py-2.5 ${ready ? "so-ping cursor-pointer bg-white/15 ring-2 ring-secondary" : isDone ? "bg-white/5" : "bg-white/[0.03] opacity-60"}`}
                >
                  <span className={`w-7 shrink-0 font-outfit text-xs font-extrabold tracking-[0.2em] ${isDone || ready ? "text-secondary" : "text-white/40"}`}>{r.n}</span>
                  <span className="min-w-0 flex-1 font-outfit text-sm font-semibold leading-tight text-white md:text-base">{r.label}</span>
                  {ready && <span aria-hidden="true" className="so-nudge shrink-0 rounded-full bg-secondary px-3 py-1 font-outfit text-xs font-bold text-primary-darkest md:text-sm">Tap here ▸</span>}
                  <Flap text={isDone ? r.done : r.pending} width={9} gold={isDone} />
                </button>
              </li>
            );
          })}
        </ol>

        <div className={`relative mt-3 overflow-hidden rounded-2xl px-3 py-4 transition-all duration-700 md:px-4 ${certified ? "so-win scale-[1.02] bg-secondary/20 ring-2 ring-secondary" : "bg-white/5"}`}>
          {certified && <span aria-hidden="true" className="so-rays pointer-events-none absolute left-1/2 top-1/2 h-[220%] w-[160%] -translate-x-1/2 -translate-y-1/2 opacity-60" />}
          {certified && <span aria-hidden="true" className="so-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" />}
          <p className="relative mb-2 font-outfit text-sm font-semibold text-white md:text-base">{FINAL.label}</p>
          <div className="relative overflow-x-auto">
            <Flap text={certified ? FINAL.done : FINAL.pending} width={14} gold={certified} />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-primary/70">
        <span />
        {done > 0 && (
          <button type="button" onClick={reset} className="font-semibold text-primary underline-offset-4 hover:text-secondary-dark hover:underline">Start again ↺</button>
        )}
      </div>
    </div>
  );
}