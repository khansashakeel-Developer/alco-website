"use client";

import { useRef } from "react";

export default function Tilt3D({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const card = useRef<HTMLDivElement>(null);

  // Only the glare follows the cursor. The card itself never rotates.
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = card.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className="group relative" onMouseMove={onMove}>
      {/* card edges behind, for thickness */}
      <div
        aria-hidden
        className="absolute inset-x-6 -bottom-3 top-4 rounded-2xl bg-[#0a2140] opacity-70 transition-all duration-500 group-hover:-bottom-4"
      />
      <div
        aria-hidden
        className="absolute inset-x-3 -bottom-1.5 top-2 rounded-2xl bg-[#0d2d55] opacity-80 transition-all duration-500 group-hover:-bottom-2"
      />

      <div
        ref={card}
        className={`relative overflow-hidden shadow-[0_24px_40px_-18px_rgba(11,37,69,0.6)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_34px_50px_-18px_rgba(11,37,69,0.7)] ${className}`}
      >
                {children}

        {/* soft glare following the cursor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--gx,30%) var(--gy,20%), rgba(255,255,255,0.13), transparent 60%)",
          }}
        />
      </div>
    </div>
  );
}