"use client";

import { useEffect, useRef, useState } from "react";

type Item = { n: string; title: string; text: string };

export default function SignOffPoints({ items = [] }: { items?: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-14 grid gap-12 text-start md:grid-cols-3 md:gap-8 lg:gap-12">
      <style>{`
        @keyframes sp-ring { 0% { box-shadow: 0 0 0 0 rgba(249,184,30,.7) } 100% { box-shadow: 0 0 0 16px rgba(249,184,30,0) } }
        @media (prefers-reduced-motion: reduce) { .sp-fx { animation: none !important; transition: none !important } }
      `}</style>

      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <div key={it.n} className="group relative">
            {/* node + line that draws across */}
            <div className="flex items-center gap-3">
              <span
                className="sp-fx flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-secondary bg-gradient-to-br from-[#1B507C] to-[#0b2545] text-sm font-extrabold text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-white group-hover:bg-secondary group-hover:from-secondary group-hover:to-secondary group-hover:text-[#0b2545]"
                style={{
                  opacity: seen ? 1 : 0,
                  transform: seen ? undefined : "scale(.4)",
                  transitionDelay: `${i * 350}ms`,
                  animation: seen ? `sp-ring 1.2s ease-out ${i * 0.35 + 0.2}s 1` : "none",
                }}
              >
                {it.n}
              </span>
              <span className="relative block h-[3px] flex-1 overflow-hidden rounded-full bg-primary/10" aria-hidden>
                <span
                  className="sp-fx absolute inset-0 origin-left rounded-full bg-gradient-to-r from-secondary to-secondary-dark transition-transform duration-[1300ms] ease-out"
                  style={{ transform: seen ? "scaleX(1)" : "scaleX(0)", transitionDelay: `${i * 350 + 250}ms` }}
                />
              </span>
              {last && (
                <span
                  aria-hidden
                  className="sp-fx text-xl text-secondary transition-all duration-700"
                  style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(10px)", transitionDelay: `${i * 350 + 1300}ms` }}
                >
                  ★
                </span>
              )}
            </div>

            <h3
              className="sp-fx mt-5 font-outfit text-lg font-semibold text-primary transition-all duration-700 group-hover:text-secondary-dark xl:text-xl"
              style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(14px)", transitionDelay: `${i * 350 + 400}ms` }}
            >
              {it.title}
            </h3>
            <p
              className="sp-fx mt-3 text-gray-600 transition-all duration-700"
              style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(14px)", transitionDelay: `${i * 350 + 550}ms` }}
            >
              {it.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}