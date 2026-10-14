"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { title: "Book a conversation.", text: "A short call to understand what you want and which level fits." },
  { title: "Choose your pathway.", text: "We guide you to the right rung to step on, and show you where it can lead." },
  { title: "Confirm your place.", text: "Cohorts are capped, so your place is held once you confirm." },
  {
    title: "Receive your joining pack and begin.",
    text: "Your manual, your audio library and your schedule, and your transformation starts.",
  },
];

const STEP_MS = 2800;

export default function EnrolSteps() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(id);
  }, [active, paused]);

  const pct = (active / (STEPS.length - 1)) * 100; // 0, 33, 66, 100

    return (
    <div className="relative mt-10" onMouseLeave={() => setPaused(false)}>
      <style>{`
        @keyframes es-meridian { 0% { transform: scaleX(1) } 50% { transform: scaleX(0.06) } 100% { transform: scaleX(1) } }
        @keyframes es-spin { from { transform: rotateY(0deg) } to { transform: rotateY(360deg) } }
        @media (prefers-reduced-motion: reduce) { .es-anim { animation: none !important } }
      `}</style>
      {/* Desktop: horizontal line, gold fill and the travelling ball */}
      <div className="absolute left-[12.5%] right-[12.5%] top-9 hidden h-[3px] -translate-y-1/2 rounded bg-slate-200 md:block">
        <div
          className="h-full rounded bg-secondary transition-all duration-[1400ms] ease-in-out"
          style={{ width: `${pct}%` }}
        />
        <span
          aria-hidden
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_0_6px_rgba(249,184,30,0.25),0_0_18px_6px_rgba(249,184,30,0.55)] transition-all duration-[1400ms] ease-in-out"
          style={{ left: `${pct}%` }}
        />
      </div>

      {/* Phone: vertical line with gold fill */}
      <div className="absolute bottom-10 left-9 top-9 w-[3px] -translate-x-1/2 rounded bg-slate-200 md:hidden">
        <div
          className="w-full rounded bg-secondary transition-all duration-[1400ms] ease-in-out"
          style={{ height: `${pct}%` }}
        />
      </div>

      <ol className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-4">
        {STEPS.map((s, i) => {
          const on = active === i;
          const done = i < active;
          return (
            <li
              key={s.title}
              onMouseEnter={() => { setActive(i); setPaused(true); }}
              className="flex cursor-default items-start gap-4 text-left md:flex-col md:items-center md:gap-0 md:text-center"
            >
              <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center [perspective:600px]">
  {on && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-secondary/40" />}

  {/* ground shadow */}
  <span
    aria-hidden
    className={`absolute -bottom-3 left-1/2 h-3 -translate-x-1/2 rounded-full bg-black/25 blur-md transition-all duration-500 ${on ? "w-[70%]" : "w-[55%]"}`}
  />

  {/* the sphere */}
  <span
    className={`relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full ring-4 ring-white transition-all duration-500 shadow-[inset_-7px_-9px_16px_rgba(0,0,0,0.35),0_14px_22px_-8px_rgba(11,37,69,0.55)] ${
      on ? "scale-110" : ""
    }`}
    style={{
      background: on
        ? "radial-gradient(circle at 32% 28%, #FFE9A8 0%, #F9B81E 45%, #C98500 100%)"
        : done
        ? "radial-gradient(circle at 32% 28%, #6C9CC8 0%, #1B507C 50%, #0b2545 100%)"
        : "radial-gradient(circle at 32% 28%, #4E7FAB 0%, #1B507C 45%, #08203a 100%)",
    }}
  >
    {/* meridian lines turning like a globe */}
    <span
      aria-hidden
      className="es-anim absolute inset-[5%] rounded-full border border-white/30"
      style={{ animation: `es-meridian ${on ? 2 : 7}s linear infinite` }}
    />
    <span
      aria-hidden
      className="es-anim absolute inset-[5%] rounded-full border border-white/30"
      style={{ animation: `es-meridian ${on ? 2 : 7}s linear infinite`, animationDelay: on ? "-1s" : "-3.5s" }}
    />

    {/* glossy highlight */}
    <span aria-hidden className="absolute left-[16%] top-[9%] h-[28%] w-[40%] -rotate-[25deg] rounded-full bg-white/55 blur-[3px]" />

    {/* number: spins once on its vertical axis when this step becomes active */}
    <span
      key={on ? `spin-${active}` : "still"}
      className={`es-anim relative text-2xl font-bold ${on ? "text-primary-darkest" : "text-white"}`}
      style={on ? { animation: "es-spin 1.4s ease-in-out 1" } : undefined}
    >
      {i + 1}
    </span>
  </span>
</div>

              <div className="md:mt-5">
                <p className={`font-semibold transition-colors duration-500 ${on ? "text-primary-darkest" : "text-primary"}`}>
                  {s.title}
                </p>
                <p className={`mt-1 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-60"} text-primary-light`}>
                  {s.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}