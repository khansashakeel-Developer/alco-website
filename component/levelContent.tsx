"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "./button";
import { LevelContentType } from "@/type/levelContent";
import CurriculumRoute from "@/component/CurriculumRoute";

type Props = {
  data: LevelContentType;
};

// Layout: one 6-column grid on desktop, so every row spans the full container width and cards line up edge to edge.
// A long list (more than 10 items, e.g. the NLP card on Levels 1 and 2) gets a full-width card with the list in
// columns; the remaining cards share the next row equally. Every card has the same anatomy (image header with the
// title over it, then a numbered topic list). Topic numbers run on across the cards, so the curriculum reads as one journey.
const LONG_LIST = 10;

// Column span (out of 6) on xl for each non-featured card, so no row ends short: 3 cards -> 2+2+2, 2 or 4 -> 3 each,
// 5 -> 2+2+2 then 3+3, 1 -> full row.
function xlSpan(index: number, n: number) {
  if (n === 1) return "xl:col-span-6";
  if (n === 5) return index < 3 ? "xl:col-span-2" : "xl:col-span-3";
  if (n % 3 === 0) return "xl:col-span-2";
  return "xl:col-span-3";
}

type Point = LevelContentType["points"][number];

// One module card. Rises in when scrolled to (visible by default, so nothing is lost if the script fails),
// the photo drifts slowly, the gold line draws, the topics follow one by one, and a soft light follows the cursor.
function ModuleCard({
  point,
  index,
  offset,
  featured,
  span,
}: {
  point: Point;
  index: number;
  offset: number;
  featured: boolean;
  span: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"idle" | "hidden" | "shown">("idle");
  const hasItems = point.items.length > 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("hidden");
    // replays every time the card scrolls into view: shown once 15% is on screen, reset when it has fully left
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.15) setPhase("shown");
        else if (!e.isIntersecting) setPhase("hidden");
      },
      { threshold: [0, 0.15] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // scroll-linked movement: --p runs from -1 (card below the screen) to 1 (above it); the photo and number drift with it
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.setProperty("--p", String(Math.max(-1, Math.min(1, p))));
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

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className={`h-full ${span}`}>
      <article
        ref={ref}
        data-phase={phase}
        onPointerMove={onMove}
        style={{ transitionDelay: phase === "shown" ? `${index * 120}ms` : "0ms" }}
        className="lc-card group relative flex h-full min-h-[360px] flex-col justify-end overflow-hidden rounded-[28px] bg-[#071a33] text-white lg:min-h-[400px]"
      >
        {/* full-bleed photo */}
        <div
          className="lc-photo absolute bg-cover bg-center"
          style={{ backgroundImage: `url(${point?.image?.src})` }}
          role="img"
          aria-label={point?.image?.alt || point.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071a33] via-[#071a33]/75 to-[#071a33]/20" />
        <div className="lc-sheen absolute inset-0" />

        {/* module number */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 lg:p-6">
          <span className="font-outfit text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">
            Module {String(index + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden="true"
            className="lc-num select-none font-outfit text-6xl font-extrabold leading-none text-transparent lg:text-7xl"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="relative p-5 lg:p-6">
          <div className="flex items-end justify-between gap-3">
            <h3 className="font-outfit text-2xl font-semibold leading-tight">{point.title}</h3>
            {hasItems && (
              <span className="shrink-0 rounded-full border border-secondary/60 px-3 py-1 text-xs font-semibold text-secondary">
                {point.items.length} topics
              </span>
            )}
          </div>
          <span aria-hidden="true" className="lc-line mt-4 block h-px w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent" />

          {hasItems && (
            <ul className={`mt-3 ${featured ? "md:columns-2 xl:columns-3 md:gap-x-8" : ""}`}>
              {point.items.map((item, i) => (
                <li
                  key={i}
                  style={{ transitionDelay: phase === "shown" ? `${index * 120 + 350 + i * 90}ms` : "0ms" }}
                  className="lc-item group/row break-inside-avoid"
                >
                  <div className="flex items-start gap-3.5 rounded-xl px-2 py-2.5 font-outfit text-base leading-snug text-white/90 transition-colors duration-300 group-hover/row:bg-white/10">
                    <span
                      aria-hidden="true"
                      className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-secondary/70 text-[11px] font-bold text-secondary transition-all duration-300 group-hover/row:bg-secondary group-hover/row:text-[#071a33]"
                    >
                      {offset + i + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </div>
  );
}

export default function LevelContent({ data }: Props) {
  const routeTopics = (data?.points ?? []).reduce(
    (s, p) => s + p.items.length,
    0,
  );
  if (data && routeTopics >= 12) return <CurriculumRoute data={data} />;
  const points = data?.points ?? [];
  const isFeatured = (p: (typeof points)[number]) =>
    points.length > 1 && p.items.length > LONG_LIST;
  const rest = points.filter((p) => !isFeatured(p));
  // Running topic number: where each card's numbering starts.
  const offsets = points.map((_, i) =>
    points.slice(0, i).reduce((sum, p) => sum + p.items.length, 0),
  );
  const total = points.reduce((sum, p) => sum + p.items.length, 0);

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-gradient-light-neutral-lg bg-cover bg-top-left w-full">
      <style>{`
        .lc-card {
          translate: 0 0; scale: 1; rotate: 0deg;
          clip-path: inset(0 round 28px);
          box-shadow: 0 2px 4px rgba(7,26,51,.1), 0 18px 36px -18px rgba(7,26,51,.55);
          transition: opacity 1s ease, translate 1.1s cubic-bezier(.16,1,.3,1), scale 1.1s cubic-bezier(.16,1,.3,1), rotate 1.1s cubic-bezier(.16,1,.3,1), clip-path 1.2s cubic-bezier(.16,1,.3,1), box-shadow .6s cubic-bezier(.16,1,.3,1);
        }
        .lc-card[data-phase="hidden"] { opacity: 0; translate: 0 90px; scale: .92; rotate: -2.5deg; clip-path: inset(18% 8% 0 8% round 28px); }
        .lc-card:nth-child(even)[data-phase="hidden"] { rotate: 2.5deg; }
        .lc-card:hover { translate: 0 -5px; box-shadow: 0 0 0 1.5px rgba(249,184,30,.8), 0 40px 70px -26px rgba(7,26,51,.7); }
        .lc-sheen { pointer-events: none; opacity: 0; transition: opacity .5s ease;
          background: radial-gradient(340px circle at var(--mx, 50%) var(--my, 0px), rgba(249,184,30,.2), transparent 65%); }
        .lc-card:hover .lc-sheen { opacity: 1; }
        /* photo is oversized and slides against the scroll, so it moves inside its frame */
        .lc-photo { inset: -9% 0; translate: 0 calc(var(--p, 0) * -42px); scale: 1.06; transition: scale 1.8s cubic-bezier(.16,1,.3,1); }
        .lc-card:hover .lc-photo { scale: 1.14; }
        .lc-num { translate: calc(var(--p, 0) * 36px) 0; -webkit-text-stroke: 1px rgba(255,255,255,.4); transition: -webkit-text-stroke-color .5s ease; }
        .lc-card:hover .lc-num { -webkit-text-stroke-color: #F9B81E; }
        .lc-line { transform-origin: left; transition: transform 1.1s cubic-bezier(.16,1,.3,1) .3s; }
        .lc-card[data-phase="hidden"] .lc-line { transform: scaleX(0); }
        .lc-item { transition: opacity .7s ease, translate .8s cubic-bezier(.16,1,.3,1); translate: 0 0; }
        .lc-card[data-phase="hidden"] .lc-item { opacity: 0; translate: -28px 0; }

        @media (prefers-reduced-motion: reduce) {
          .lc-card, .lc-photo, .lc-num, .lc-line, .lc-item { transition: none !important; }
          .lc-card:hover { translate: 0 0; }
          .lc-card:hover .lc-photo { scale: 1.06; }
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center">
          <div>
            <h2 className="h3 text-start">
              <span className="text-primary">{data?.title?.line1}</span>
            </h2>
            {total > 0 && points.length > 1 && (
              <p className="mt-1 flex items-center gap-2 text-start font-outfit text-sm font-semibold uppercase tracking-widest text-primary/70">
                <span
                  aria-hidden="true"
                  className="h-1 w-8 rounded-full bg-secondary"
                />
                {points.length} modules · {total} topics
              </p>
            )}
          </div>
          {data?.button && (
            <div className="my-2">
              <Button
                iconRight
                variant="primary"
                size="medium"
                text={data?.button?.text}
                href={data?.button?.href}
                className="my-auto"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 lg:gap-6 py-4 lg:py-8 xl:py-10">
          {points.map((point, index) => {
            const featured = isFeatured(point);
            const restIndex = rest.indexOf(point);
            const span = featured
              ? "md:col-span-2 xl:col-span-6"
              : `${restIndex === rest.length - 1 && rest.length % 2 === 1 ? "md:col-span-2" : ""} ${xlSpan(restIndex, rest.length)}`;
            return (
              <ModuleCard
                key={index}
                point={point}
                index={index}
                offset={offsets[index]}
                featured={featured}
                span={span}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}