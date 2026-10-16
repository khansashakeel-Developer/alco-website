"use client";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Lock, LockOpen, MessagesSquare, ShieldCheck, UserCheck, type LucideIcon } from "lucide-react";

type Step = { title: string; body: React.ReactNode };

const ICONS: LucideIcon[] = [UserCheck, MessagesSquare, ShieldCheck];

// Three checkpoints you click through. Tap a step (or use the arrows) and its text opens in the big panel;
// every step you reach is ticked off, the gold line fills, and once all three are passed the lock on the gate opens.
export default function WhoMayApply({
  steps,
  gate,
  footer,
}: {
  steps: Step[];
  gate: React.ReactNode;
  footer: React.ReactNode;
}) {
  const n = steps.length;
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const [passed, setPassed] = useState<boolean[]>(() => steps.map((_, i) => i === 0));
  const open = passed.every(Boolean);

  const go = (i: number) => {
    if (i < 0 || i >= n) return;
    setDir(i >= cur ? 1 : -1);
    setCur(i);
    setPassed((p) => p.map((v, k) => v || k <= i)); // reaching a step passes all before it
  };

  const fill = Math.max(0, passed.lastIndexOf(true)) / (n - 1);

  return (
    <div className="mx-auto max-w-5xl text-start">
      <style>{`
        @keyframes wma-in-r { from { opacity: 0; transform: translateX(36px) } to { opacity: 1; transform: none } }
        @keyframes wma-in-l { from { opacity: 0; transform: translateX(-36px) } to { opacity: 1; transform: none } }
        .wma-in-r { animation: wma-in-r .55s cubic-bezier(.16,1,.3,1) both }
        .wma-in-l { animation: wma-in-l .55s cubic-bezier(.16,1,.3,1) both }
        @keyframes wma-pop { 0% { transform: scale(.6) } 60% { transform: scale(1.2) } 100% { transform: scale(1) } }
        .wma-pop { animation: wma-pop .5s cubic-bezier(.2,.8,.2,1) both }
        @keyframes wma-shine { from { background-position: -200% 0 } to { background-position: 200% 0 } }
        .wma-shine { background-image: linear-gradient(100deg, transparent 35%, rgba(249,184,30,.35) 50%, transparent 65%); background-size: 200% 100%; animation: wma-shine 3s linear infinite }
        @keyframes wma-hint { 0%,100% { box-shadow: 0 0 0 0 rgba(249,184,30,.6) } 50% { box-shadow: 0 0 0 12px rgba(249,184,30,0) } }
        .wma-hint { animation: wma-hint 1.8s ease-out infinite }
        @media (prefers-reduced-motion: reduce) { .wma-in-r, .wma-in-l, .wma-pop, .wma-shine, .wma-hint { animation: none } }
      `}</style>

      {/* the checkpoints */}
      <div className="relative mx-auto mt-10 max-w-3xl">
        <span aria-hidden="true" className="absolute left-[calc(100%/6)] right-[calc(100%/6)] top-7 h-1 rounded-full bg-primary/15" />
        <span
          aria-hidden="true"
          className="absolute left-[calc(100%/6)] top-7 h-1 rounded-full bg-gradient-to-r from-secondary to-secondary-dark shadow-[0_0_12px_rgba(249,184,30,.7)] transition-all duration-700 ease-out"
          style={{ width: `calc((100% - 100% / 3) * ${fill})` }}
        />
        <div role="tablist" aria-label="Who may apply" className="relative grid grid-cols-3">
          {steps.map((st, i) => {
            const Icon = ICONS[i % ICONS.length];
            const here = cur === i;
            const done = passed[i] && !here;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                id={`wma-tab-${i}`}
                aria-selected={here}
                aria-controls={`wma-panel-${i}`}
                onClick={() => go(i)}
                className="group flex flex-col items-center gap-3 outline-none"
              >
                <span
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full ring-8 ring-slate-100 transition-all duration-500 group-focus-visible:ring-secondary ${
                    here
                      ? "scale-110 bg-secondary text-primary-darkest shadow-[0_0_0_6px_rgba(249,184,30,.3)]"
                      : done
                        ? "bg-primary-darkest text-secondary"
                        : "bg-primary text-white group-hover:scale-105"
                  } ${i === 1 && cur === 0 && !passed[1] ? "wma-hint" : ""}`}
                >
                  {done ? <Check size={24} aria-hidden="true" className="wma-pop" /> : <Icon size={24} aria-hidden="true" />}
                </span>
                <span className={`font-outfit text-sm font-semibold leading-tight transition-colors md:text-base ${here ? "text-primary-darkest" : "text-primary/70 group-hover:text-primary"}`}>
                  {st.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* the open step */}
      <div className="mt-8 overflow-hidden rounded-3xl bg-white p-6 shadow-xl ring-1 ring-primary/10 md:p-10">
        {steps.map((st, i) => (
          <div
            key={i}
            role="tabpanel"
            id={`wma-panel-${i}`}
            aria-labelledby={`wma-tab-${i}`}
            hidden={cur !== i}
            className={cur === i ? (dir > 0 ? "wma-in-r" : "wma-in-l") : ""}
          >
            <div className="flex items-start gap-5 md:gap-8">
              <span aria-hidden="true" className="select-none font-outfit text-7xl font-extrabold leading-none text-secondary md:text-8xl">
                {i + 1}
              </span>
              <div>
                <h3 className="font-outfit text-xl font-semibold text-primary md:text-3xl">{st.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg">{st.body}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 flex items-center justify-between border-t border-primary/10 pt-5">
          <button
            type="button"
            aria-label="Previous step"
            onClick={() => go(cur - 1)}
            disabled={cur === 0}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 text-primary transition hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2" aria-hidden="true">
            {steps.map((_, i) => (
              <span key={i} className={`h-2 rounded-full transition-all duration-500 ${cur === i ? "w-8 bg-secondary" : passed[i] ? "w-2 bg-primary-darkest" : "w-2 bg-primary/20"}`} />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next step"
            onClick={() => go(cur + 1)}
            disabled={cur === n - 1}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary-darkest shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-30 disabled:hover:translate-y-0"
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* the gate */}
      <div className="relative mt-10 overflow-hidden rounded-3xl bg-primary-darkest bg-dark-primary bg-cover p-6 text-center shadow-2xl md:p-10">
        {open && <span aria-hidden="true" className="wma-shine pointer-events-none absolute inset-0" />}
        <button
          type="button"
          onClick={() => go(n - 1)}
          aria-label={open ? "Gate open" : "Go to the last step"}
          className={`relative mx-auto flex h-14 w-14 items-center justify-center rounded-full transition-all duration-500 ${
            open ? "scale-110 bg-secondary text-primary-darkest" : "border-2 border-secondary text-secondary hover:scale-105"
          }`}
        >
          <span key={String(open)} className="wma-pop">{open ? <LockOpen size={24} aria-hidden="true" /> : <Lock size={24} aria-hidden="true" />}</span>
        </button>
        <p className="relative mx-auto mt-5 max-w-2xl font-outfit text-xl font-semibold text-white md:text-2xl">{gate}</p>
        <span aria-hidden="true" className="relative mx-auto my-5 block h-px w-24 bg-secondary" />
        <p className="relative mx-auto max-w-3xl text-base leading-relaxed text-white/80">{footer}</p>
      </div>
    </div>
  );
}