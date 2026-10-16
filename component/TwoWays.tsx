"use client";
import React, { useEffect, useRef, useState } from "react";
import { Check, GraduationCap, RotateCcw } from "lucide-react";

type Option = { title: string; body: React.ReactNode };

const NAMES = ["Year One", "Year Two", "Year Three", "Year Four"];
const COUNTS = [3, 5];
const SPARKS = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2;
  const r = 46 + (i % 3) * 14;
  return { dx: Math.cos(a) * r, dy: Math.sin(a) * r };
});

// Two big panels side by side, like two doors. Hover or tap one and it opens wide (the other folds to a slim card).
// Inside, the same total of requirements is cut into 3 or 5 blocks. Tap blocks to tick the years off one by one;
// finish the last one and the graduation cap bursts. It plays itself once when first scrolled to.
export default function TwoWays({
  intro,
  options,
  caption,
}: {
  intro: React.ReactNode;
  options: [Option, Option]; // [three-year, five-year]
  caption: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState<[number, number]>([0, 0]);
  const [burst, setBurst] = useState<[number, number]>([0, 0]); // changes each time a panel is completed

  const setFillFor = (p: number, n: number) => {
    setFill((f) => {
      const next: [number, number] = [f[0], f[1]];
      next[p] = n;
      return next;
    });
    if (n === COUNTS[p]) setBurst((b) => (p === 0 ? [b[0] + 1, b[1]] : [b[0], b[1] + 1]));
  };

  // plays once on first view so it is clear the blocks are live
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        for (let k = 1; k <= 3; k++) timers.push(setTimeout(() => !touched.current && setFillFor(0, k), 900 + k * 650));
        timers.push(setTimeout(() => !touched.current && setFillFor(0, 0), 5200));
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={root} className="mx-auto max-w-6xl text-center">
      <style>{`
        @keyframes tw-spark { from { transform: translate(-50%,-50%) scale(1); opacity: 1 } to { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0); opacity: 0 } }
        .tw-spark { animation: tw-spark .9s cubic-bezier(.2,.8,.2,1) both }
        @keyframes tw-pop { 0% { transform: scale(.6) } 60% { transform: scale(1.18) } 100% { transform: scale(1) } }
        .tw-pop { animation: tw-pop .5s cubic-bezier(.2,.8,.2,1) both }
        @keyframes tw-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
        .tw-bob { animation: tw-bob 2.2s ease-in-out infinite }
        .tw-panel::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .5s ease; border-radius: inherit;
          background: radial-gradient(380px circle at var(--mx, 50%) var(--my, 0px), rgba(249,184,30,.16), transparent 65%); }
        .tw-panel:hover::before { opacity: 1; }
        @media (prefers-reduced-motion: reduce) { .tw-spark, .tw-pop, .tw-bob { animation: none } }
      `}</style>

      <p className="mx-auto max-w-3xl text-base leading-relaxed text-primary">{intro}</p>

      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:gap-5">
        {options.map((o, p) => {
          const open = active === p;
          const n = COUNTS[p];
          const f = fill[p];
          const complete = f === n;
          const status = f === 0 ? null : f === n ? "Graduating year" : NAMES[f - 1];
          return (
            <article
              key={p}
              onPointerMove={onMove}
              onMouseEnter={() => setActive(p)}
              onClick={() => setActive(p)}
              className={`tw-panel relative min-w-0 cursor-pointer overflow-hidden rounded-[28px] p-6 text-start transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] md:p-8 ${
                open
                  ? "bg-primary-darkest bg-dark-primary bg-cover text-white shadow-2xl ring-1 ring-secondary/60 lg:-translate-y-1"
                  : "bg-white text-primary shadow-lg ring-1 ring-primary/10 hover:ring-secondary/60"
              }`}
              style={{ flexGrow: open ? 1.7 : 1, flexBasis: 0 }}
            >
              {/* giant number */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -right-2 -top-6 select-none font-outfit text-[190px] font-extrabold leading-none text-transparent transition-all duration-700 md:text-[230px] ${
                  open ? "opacity-100" : "opacity-60"
                }`}
                style={{ WebkitTextStroke: open ? "1.5px rgba(249,184,30,.55)" : "1.5px rgba(18,57,92,.18)" }}
              >
                {n}
              </span>

              <div className="relative">
                <h3 className={`font-outfit text-2xl font-semibold md:text-3xl ${open ? "text-white" : "text-primary"}`}>{o.title}</h3>
                <span aria-hidden="true" className={`mt-3 block h-1 rounded-full bg-secondary transition-all duration-700 ${open ? "w-24" : "w-10"}`} />

                {/* the text opens with the panel */}
                <div className={`grid transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">{o.body}</p>
                  </div>
                </div>

                {/* the same requirements, cut into n blocks */}
                <p className={`mt-7 font-outfit text-xs font-semibold uppercase tracking-[0.22em] ${open ? "text-secondary" : "text-primary/60"}`}>{caption}</p>
                <div className="mt-3 flex gap-1.5">
                  {Array.from({ length: n }, (_, i) => {
                    const done = i < f;
                    const last = i === n - 1;
                    return (
                      <button
                        key={i}
                        type="button"
                        aria-label={last ? "Graduating year" : NAMES[i]}
                        aria-pressed={done}
                        onClick={(e) => {
                          if (!open) return; // the first tap just opens the panel
                          e.stopPropagation();
                          touched.current = true;
                          setFillFor(p, f === i + 1 ? i : i + 1);
                        }}
                        className={`relative flex h-14 min-w-0 flex-1 items-center justify-center rounded-xl text-sm font-bold outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-secondary md:h-16 ${
                          done
                            ? "bg-gradient-to-br from-secondary to-secondary-dark text-primary-darkest shadow-[0_0_18px_rgba(249,184,30,.5)]"
                            : open
                              ? "border border-white/20 bg-white/10 text-white/70 hover:-translate-y-1 hover:bg-white/20"
                              : "border border-primary/15 bg-primary/5 text-primary/60"
                        }`}
                        style={{ transitionDelay: done ? `${i * 40}ms` : "0ms" }}
                      >
                        {last ? (
                          <span key={`${done}-${burst[p]}`} className={done ? "tw-pop" : "tw-bob"}>
                            <GraduationCap size={22} aria-hidden="true" />
                          </span>
                        ) : done ? (
                          <span key="c" className="tw-pop"><Check size={20} aria-hidden="true" /></span>
                        ) : (
                          i + 1
                        )}
                        {last && complete && (
                          <span key={burst[p]} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
                            {SPARKS.map((s, k) => (
                              <span
                                key={k}
                                className="tw-spark absolute h-2 w-2 rounded-full bg-secondary"
                                style={{ ["--dx" as string]: `${s.dx}px`, ["--dy" as string]: `${s.dy}px` } as React.CSSProperties}
                              />
                            ))}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex h-8 items-center justify-between gap-3">
                  <span key={status ?? "none"} className={`tw-pop font-outfit text-sm font-semibold ${open ? "text-secondary" : "text-primary/60"}`}>
                    {status}
                  </span>
                  {f > 0 && open && (
                    <button
                      type="button"
                      aria-label="Reset"
                      onClick={(e) => {
                        e.stopPropagation();
                        touched.current = true;
                        setFillFor(p, 0);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-white/80 transition hover:bg-white/15 hover:text-white"
                    >
                      <RotateCcw size={14} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}