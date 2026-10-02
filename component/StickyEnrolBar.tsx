"use client";

import { useEffect, useState } from "react";
import CtaButton from "@/component/CtaButton";

// Phones only. Appears after the hero and slides away near the end of the page.
export default function StickyEnrolBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 700;
      setShow(y > 700 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur border-t border-primary/15 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.12)] transition-[transform,visibility] duration-300 ${
        show ? "translate-y-0 visible" : "translate-y-full invisible"
      }`}
    >
      <CtaButton id="C4" fullWidth />
    </div>
  );
}