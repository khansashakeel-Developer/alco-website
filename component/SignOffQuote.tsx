"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  name: string;
  credentials: string[];
  caption: string; // the full original caption, kept for screen readers and search engines
  photo: string;
  tailWords?: number; // how many closing words glow gold
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export default function SignOffQuote({ text, name, credentials, caption, photo, tailWords = 6 }: Props) {
  const ref = useRef<HTMLQuoteElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      if (reduce) {
        setP(1);
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(clamp((vh * 0.85 - r.top) / (vh * 0.6)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const words = text.split(" ");
  const n = words.length;

  return (
    <figure className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl bg-[#071a33] bg-dark-primary bg-cover bg-top-left text-left shadow-[0_40px_80px_-30px_rgba(7,26,51,0.7)] md:grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr]">
      {/* photo */}
      <div className="relative p-4 md:p-6">
        <div className="relative h-[300px] overflow-hidden rounded-2xl ring-2 ring-secondary/70 shadow-[0_0_0_6px_rgba(249,184,30,0.12)] md:h-full md:min-h-[420px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt={name} className="absolute inset-0 h-full w-full object-cover object-top" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#071a33]/90 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-outfit text-lg font-bold text-white">{name}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">CEO</p>
          </div>
        </div>
      </div>

      {/* quote */}
      <div className="relative flex flex-col justify-center px-6 pb-8 pt-2 md:px-10 md:py-12">
        <span aria-hidden className="pointer-events-none absolute -top-2 right-4 select-none font-serif text-[160px] leading-none text-secondary/20 md:text-[200px]">“</span>

        <blockquote ref={ref} className="relative font-outfit text-lg italic leading-relaxed md:text-[22px] md:leading-[1.65]">
          {words.map((w, i) => {
            const lit = (i + 1) / n <= p * 1.04;
            const tail = i >= n - tailWords;
            return (
              <span
                key={i}
                className={`inline transition-colors duration-300 ${
                  lit ? (tail ? "font-semibold text-secondary" : "text-white") : "text-white/25"
                }`}
              >
                {w}{" "}
              </span>
            );
          })}
        </blockquote>

        <span aria-hidden className="mt-7 block h-0.5 w-16 bg-secondary" />

        <div className="mt-5 flex flex-wrap gap-2" aria-hidden>
          {credentials.map((c, i) => (
            <span
              key={c}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                i === 0 ? "bg-secondary text-[#0b2545]" : "border border-secondary/40 bg-white/5 text-white/90"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        <figcaption className="sr-only">{caption}</figcaption>
      </div>
    </figure>
  );
}