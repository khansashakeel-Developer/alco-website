"use client";

import { useEffect, useRef, useState } from "react";

const PILLARS = ["Leadership", "Mentorship", "NLP training experience", "Community"];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

function Seal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <radialGradient id="pd-gold" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#FFE29D" />
          <stop offset=".55" stopColor="#F9B81E" />
          <stop offset="1" stopColor="#F09623" />
        </radialGradient>
      </defs>
      <polygon
        fill="url(#pd-gold)"
        points="50,2 58,12 70,6 74,19 87,18 86,31 98,36 91,47 98,58 86,64 87,77 74,76 70,89 58,84 50,96 42,84 30,89 26,76 13,77 14,64 2,58 9,47 2,36 14,31 13,18 26,19 30,6 42,12"
      />
      <circle cx="50" cy="50" r="31" fill="none" stroke="#0b2545" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="50" y="49" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0b2545" fontFamily="inherit">AL&amp;CO</text>
      <text x="50" y="62" textAnchor="middle" fontSize="6.5" fontWeight="700" letterSpacing="1.4" fill="#0b2545" fontFamily="inherit">MASTER</text>
    </svg>
  );
}

function PenIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export default function SignOffCertificate() {
  const stage = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = stage.current;
      if (!el) return;
      if (reduce) {
        setP(1);
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(clamp((vh * 0.92 - r.top) / (vh * 0.78)));
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

  const col = (i: number) => ease(clamp((p - i * 0.07) / 0.28));
  const lintel = ease(clamp((p - 0.42) / 0.16));
  const m1 = ease(clamp((p - 0.6) / 0.12));
  const m2 = ease(clamp((p - 0.7) / 0.12));
  const crown = ease(clamp((p - 0.82) / 0.16));
  const done = p >= 0.98;

  const medallion = (side: "l" | "r", m: number, label: string) => (
    <div
      className="flex items-center gap-2 md:gap-3"
      style={{
        opacity: m,
        transform: `translateX(${(side === "l" ? -1 : 1) * (1 - m) * 60}px) scale(${0.6 + 0.4 * m})`,
        flexDirection: side === "l" ? "row" : "row-reverse",
      }}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FFE29D] via-[#F9B81E] to-[#F09623] text-[#0b2545] shadow-[0_0_0_3px_rgba(249,184,30,0.25),0_6px_16px_rgba(0,0,0,0.35)] md:h-14 md:w-14">
        <PenIcon className="h-5 w-5 md:h-6 md:w-6" />
      </span>
      <span className={`hidden text-[10px] font-bold uppercase leading-tight tracking-[0.18em] text-secondary md:block ${side === "r" ? "text-right" : ""}`}>
        {label}
      </span>
    </div>
  );

  return (
    <div ref={stage} className="relative mx-auto my-12 max-w-4xl px-2">
      <style>{`
        @keyframes pd-sweep { from { transform: translateX(-120%) skewX(-20deg) } to { transform: translateX(260%) skewX(-20deg) } }
        @media (prefers-reduced-motion: reduce) { .pd-fx { animation: none !important } }
      `}</style>

      <p className="sr-only">
        The Master Trainer certificate rests on four pillars: leadership, mentorship, NLP training experience and community. It carries two signatures: Arslan Larik and Bismillah Pervez.
      </p>

      {/* pediment with the seal */}
      <div
        className="relative mx-auto w-[98%]"
        style={{ opacity: crown, transform: `translateY(${(1 - crown) * -36}px)` }}
        aria-hidden
      >
        <div className="relative h-[78px] w-full md:h-[104px]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F9B81E] to-[#F09623] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
          <div className="absolute inset-x-[5px] bottom-0 top-[7px] bg-gradient-to-b from-[#1B507C] to-[#0b2545] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
          <Seal className="absolute bottom-1 left-1/2 h-[58px] w-[58px] -translate-x-1/2 drop-shadow-lg md:h-[76px] md:w-[76px]" />
        </div>
      </div>

      {/* lintel */}
      <div
        className="relative z-10 overflow-hidden rounded-md bg-gradient-to-b from-[#12395c] to-[#071a33] px-3 py-3 shadow-[0_18px_30px_-12px_rgba(7,26,51,0.6)] ring-1 ring-[#F9B81E]/50 md:px-8 md:py-4"
        style={{ opacity: lintel, transform: `translateY(${(1 - lintel) * -70}px)` }}
      >
        <div className="relative flex items-center justify-between gap-2">
          {medallion("l", m1, "Signature 1")}
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-secondary">AL&amp;CO</p>
            <p className="font-outfit text-base font-bold leading-tight text-white md:text-2xl">Master Trainer certificate</p>
          </div>
          {medallion("r", m2, "Signature 2")}
        </div>
        {done && (
          <span
            aria-hidden
            className="pd-fx pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            style={{ animation: "pd-sweep 1.6s ease-in-out 1" }}
          />
        )}
      </div>

      {/* pillars */}
      <div className="relative mx-auto grid w-[94%] grid-cols-4 gap-2 md:gap-6">
        {PILLARS.map((name, i) => {
          const g = col(i);
          return (
            <div key={name} className="group flex flex-col items-center">
              {/* capital */}
              <div
                className="w-full transition-transform duration-500 group-hover:-translate-y-1"
                style={{ opacity: g > 0.9 ? 1 : 0, transform: g > 0.9 ? undefined : "translateY(-8px)" }}
                aria-hidden
              >
                <div className="mx-auto h-2 w-[108%] -translate-x-[4%] rounded-sm bg-gradient-to-b from-white to-slate-300 shadow md:h-3" />
                <div className="mx-auto h-1.5 w-[88%] bg-gradient-to-b from-slate-200 to-slate-300 md:h-2" />
              </div>

              {/* shaft grows from the base */}
              <div
                className="relative h-[170px] w-[72%] transition-transform duration-500 group-hover:-translate-y-1 md:h-[240px]"
                style={{ clipPath: `inset(${(1 - g) * 100}% 0 0 0)` }}
                aria-hidden
              >
                <div
                  className="absolute inset-0 shadow-inner"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg,#cbd9e8 0,#e9f0f7 5px,#ffffff 9px,#e9f0f7 13px,#b9cadb 18px)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1B507C]/25 via-transparent to-[#0b2545]/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F9B81E]/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* base */}
              <div className="w-full" aria-hidden style={{ opacity: g > 0.1 ? 1 : 0 }}>
                <div className="mx-auto h-1.5 w-[88%] bg-gradient-to-b from-slate-300 to-slate-200 md:h-2" />
                <div className="mx-auto h-2 w-[108%] -translate-x-[4%] rounded-sm bg-gradient-to-b from-slate-200 to-slate-400 shadow md:h-3" />
              </div>

              {/* plaque */}
              <div className="mt-3 text-center transition-all duration-700" style={{ opacity: g, transform: `translateY(${(1 - g) * 10}px)` }}>
                <span className="block text-xs font-extrabold text-secondary-dark">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-0.5 block font-outfit text-[11px] font-semibold leading-tight text-primary md:text-sm">{name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* the two signatures, spelled out */}
      <div
        className="mx-auto mt-8 grid max-w-2xl gap-3 text-center md:grid-cols-2"
        style={{ opacity: ease(clamp((p - 0.62) / 0.2)) }}
      >
        <p className="rounded-full border border-primary/15 bg-white px-5 py-2.5 shadow-sm">
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-dark">Signature 1</span>
          <span className="font-outfit text-sm font-semibold text-primary">Arslan Larik</span>
        </p>
        <p className="rounded-full border border-primary/15 bg-white px-5 py-2.5 shadow-sm">
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-dark">Signature 2</span>
          <span className="font-outfit text-sm font-semibold text-primary">Bismillah Pervez</span>
        </p>
      </div>
    </div>
  );
}