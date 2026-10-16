"use client";
import { useEffect, useRef } from "react";

// Drop <RevealChildren /> anywhere inside a wrapper. Every section in that wrapper (except the banner, the breadcrumb and
// scripts) fades in and rises when it scrolls into view, every time, going down or up.
// Sections stay visible without JavaScript and for reduced motion.
export default function RevealChildren() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const parent = marker.current?.parentElement;
    if (!parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const kids = Array.from(parent.children).filter(
      (el) => el !== marker.current && !["SCRIPT", "NAV", "STYLE"].includes(el.tagName),
    ) as HTMLElement[];
    kids.shift(); // the banner at the top stays still

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle("rv-hide", !e.isIntersecting));
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    kids.forEach((el) => {
      el.classList.add("rv");
      io.observe(el);
    });
    return () => {
      io.disconnect();
      kids.forEach((el) => el.classList.remove("rv", "rv-hide"));
    };
  }, []);

  return (
    <>
      <style>{`
        .rv:not(.rv-hide) { transition: opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1); }
        .rv-hide { opacity: 0; transform: translateY(40px); transition: none; }
      `}</style>
      <span ref={marker} hidden />
    </>
  );
}