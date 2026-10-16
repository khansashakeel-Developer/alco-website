"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Wrapper: the connecting line draws down as you scroll */
export function RouteList({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.min(1, Math.max(0, (vh * 0.8 - r.top) / r.height)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <span
        aria-hidden="true"
        style={{ transform: `scaleY(${p})` }}
        className="absolute left-7 top-10 bottom-16 w-0.5 origin-top bg-gradient-to-b from-secondary to-white/30 motion-reduce:transform-none"
      />
      {children}
    </div>
  );
}

/* One step: slides in from the right when it scrolls into view */
export function RouteStep({
  className = "",
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group/step ${className} transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}