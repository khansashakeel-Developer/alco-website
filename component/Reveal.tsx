"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fades and lifts its content in the first time it scrolls into view.
// Visible by default (no JavaScript, reduce-motion, or already on screen): it only hides content that is
// below the fold, just before it is about to be revealed.
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"visible" | "hidden" | "shown">("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already on screen at load

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style =
    state === "hidden"
      ? { opacity: 0, transform: "translateY(28px)" }
      : {
          opacity: 1,
          transform: "none",
          transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}