"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fades and lifts its content in every time it scrolls into view (down or up).
// Visible by default (no JavaScript or reduce-motion). When the section is off screen it is reset,
// so the animation plays again the next time it comes into view.
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting ? "shown" : "hidden");
      },
            { threshold: 0, rootMargin: "0px 0px -8% 0px" }
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