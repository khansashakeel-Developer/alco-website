"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { LevelProgramIncludesType } from "@/type/levelProgramIncludes";

// "Four pillars", drawn as four pillars. Hover or tap one and it widens to show its text while the others narrow to
// slim columns (title stays horizontal). On a phone they stack and open like an accordion.
export default function PillarsBoard({ data }: { data: LevelProgramIncludesType }) {
  const root = useRef<HTMLDivElement>(null);
  const points = data.points ?? [];
  // the pillar with the most to read starts open
  const heaviest = Math.max(0, points.findIndex((p) => /training/i.test(p.title)));
  const [active, setActive] = useState(heaviest);
  const [phase, setPhase] = useState<"idle" | "hidden" | "shown">("idle"); // idle = visible, so nothing is lost if the script fails

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("hidden");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className="w-full bg-gradient-light-neutral-lg bg-cover bg-top-left py-6 sm:px-4 md:py-8 lg:py-12 xl:py-16">
      <style>{`
        .pb-col { transition: flex-grow .8s cubic-bezier(.16,1,.3,1), background-color .5s ease, box-shadow .6s ease, opacity .8s ease, translate .9s cubic-bezier(.16,1,.3,1); translate: 0 0; }
        .pb[data-phase="hidden"] .pb-col { opacity: 0; translate: 0 48px; }
        .pb-col::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .5s ease;
          background: radial-gradient(340px circle at var(--mx, 50%) var(--my, 0px), rgba(249,184,30,.16), transparent 65%); }
        .pb-col:hover::before { opacity: 1; }
        @keyframes pb-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
        .pb-float { animation: pb-float 3s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .pb-col { transition: none } .pb-float { animation: none } }
      `}</style>

      <div className="container mx-auto px-4">
        <h2 className="h3 text-start">
          <span className="text-primary">{data.title.line1}</span>
        </h2>
        {data.description && <div className="custom-text1 text-start font-light text-gray-600">{data.description}</div>}

        <div ref={root} data-phase={phase} className="pb mt-8 flex flex-col gap-3 lg:min-h-[460px] lg:flex-row lg:gap-4">
          {points.map((p, i) => {
            const open = active === i;
            return (
              <article
                key={i}
                onPointerMove={onMove}
                onMouseEnter={() => window.matchMedia("(min-width:1024px)").matches && setActive(i)}
                style={{ flexGrow: open ? 4.2 : 1, flexBasis: 0, transitionDelay: phase === "shown" ? `0ms, 0ms, 0ms, ${i * 110}ms, ${i * 110}ms` : "0ms" }}
                className={`pb-col group relative min-w-0 overflow-hidden rounded-3xl lg:min-w-[92px] ${
                  open
                    ? "bg-primary-darkest bg-dark-primary bg-cover shadow-2xl ring-1 ring-secondary/60"
                    : "bg-white shadow-lg ring-1 ring-primary/10 hover:ring-secondary/60"
                }`}
              >
                {/* capital */}
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-secondary-dark via-secondary to-[#FFE29D] transition-opacity duration-500 ${open ? "opacity-100" : "opacity-40"}`} />

                {/* giant number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 bottom-[-18px] select-none font-outfit text-[150px] font-extrabold leading-none text-transparent lg:text-[200px]"
                  style={{ WebkitTextStroke: open ? "1.5px rgba(249,184,30,.35)" : "1.5px rgba(18,57,92,.10)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setActive(i)}
                  className="relative flex w-full items-center gap-4 p-5 text-start outline-none focus-visible:ring-2 focus-visible:ring-secondary lg:flex-col lg:items-start lg:gap-5 lg:p-6"
                >
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl p-3 transition-colors duration-500 ${open ? "bg-primary" : "bg-primary-darkest"}`}>
                    {p.image?.src && <Image src={p.image.src} alt={p.image.alt || ""} width={100} height={100} className="object-cover" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-outfit text-sm font-semibold tracking-[0.3em] ${open ? "text-white/60" : "text-primary/50"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className={`break-words font-outfit text-xl font-semibold leading-tight xl:text-2xl ${open ? "text-secondary" : "text-primary"}`}>{p.title}</h3>
                  </span>
                  <ChevronDown aria-hidden="true" size={20} className={`shrink-0 transition-transform duration-500 lg:hidden ${open ? "rotate-180 text-secondary" : "text-primary/60"}`} />
                </button>

                {/* the text */}
                <div className={`grid transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] lg:grid-rows-[1fr] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 lg:opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="relative px-5 pb-6 font-outfit text-base leading-relaxed text-white/90 [&_li]:marker:text-secondary [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_p+ul]:mt-2 lg:w-[460px] lg:px-6 xl:w-[560px]">
                      {p.description}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {data.detailContent && (
          <div className={`${data.textAlign ? data.textAlign : "text-center"} custom-text1 mx-auto text-primary-light`}>{data.detailContent}</div>
        )}
      </div>
    </section>
  );
}