"use client";

import { useEffect, useRef, useState } from "react";

const HEADING = "Why You Will Not Find a Number Here";

const REASONS = [
  {
    n: "01",
    title: "Out of fairness to you",
    body: "This is an investment in your future, and we treat it as one, so you will not see a price in these pages. That is deliberate, and it is out of fairness to you. To print a single figure, we would have to quote you for every level at once, whether or not you need them all. We would rather understand what you actually want first, and then build a proposition around your own journey, only what serves you, and nothing that does not.",
  },
  {
    n: "02",
    title: "The deeper reason",
    body: "There is a deeper reason, and we will be honest about it. A number on a page makes people decide with the wrong question. Some assume they cannot afford this, and never discover that what it would resolve for them is worth far more than the investment itself. Others could invest many times over, and yet it may not truly serve what they are after, and in that case we would gently tell them so. We would rather be honest with you than simply take a payment. All it takes to find out where you stand is a conversation.",
  },
];

export default function WhyNoNumber() {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Reveal the heading when the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Light that follows the cursor
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const words = HEADING.split(" ");

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#071a33] to-[#12395c] py-16 md:py-24"
      style={{ ["--x" as string]: "50%", ["--y" as string]: "30%" }}
    >
      {/* cursor light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(420px circle at var(--x) var(--y), rgba(249,184,30,0.16), transparent 60%)" }}
      />

      <div className="relative container mx-auto max-w-5xl">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">
          The honest answer
        </p>

        <h2 className="h3 mt-3 text-center text-white" aria-label={HEADING}>
          {words.map((w, i) => (
            <span key={i} aria-hidden className="mr-[0.3em] inline-block overflow-hidden align-bottom">
              <span
                className="inline-block transition-transform duration-700 ease-out"
                style={{
                  transform: shown ? "translateY(0)" : "translateY(110%)",
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                {w}
              </span>
            </span>
          ))}
        </h2>
        <div
          className={`mx-auto mt-5 h-[3px] rounded bg-secondary transition-all duration-1000 ${shown ? "w-14" : "w-0"}`}
        />

        {/* Expanding panels */}
        <div
          className="mt-10 flex flex-col gap-3 md:h-[400px] md:flex-row"
          onMouseLeave={() => setActive(active)}
        >
          {REASONS.map((r, i) => {
            const open = active === i;
            return (
              <button
                key={r.n}
                type="button"
                aria-expanded={open}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group relative min-w-0 basis-0 overflow-hidden rounded-2xl border text-left shadow-xl transition-all duration-700 ease-in-out ${
  open
    ? "grow-[5] border-white bg-white"
    : "grow-[1] border-secondary/50 bg-[#071a33] hover:border-secondary"
}`}
              >
                <div className="flex h-full flex-col p-6 md:p-8">
                  <span
                    className={`font-bold leading-none transition-all duration-500 ${
  open ? "text-6xl text-secondary-dark" : "text-5xl text-secondary"
}`}
                  >
                    {r.n}
                  </span>
                  <h3
                    className={`mt-3 text-lg font-semibold transition-colors duration-500 ${
  open ? "text-primary" : "text-white"
}`}
                  >
                    {r.title}
                  </h3>

                  {/* body: always in the page for SEO, shown when open */}
                  <div
                    className={`grid transition-all duration-700 ease-in-out ${
                      open ? "grid-rows-[1fr] opacity-100 delay-200" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden pt-3 text-[15px] leading-7 text-gray-700 md:min-w-[340px]">
                      {r.body}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}