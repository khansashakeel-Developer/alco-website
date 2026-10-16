"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/component/button";
import type { LevelContentType } from "@/type/levelContent";

function useSeen<T extends HTMLElement>(margin = "0px 0px -18% 0px", repeat = false) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          if (!repeat) io.disconnect();
        } else if (repeat) {
          setSeen(false);
        }
      },
      { rootMargin: margin, threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, repeat]);
  return [ref, seen] as const;
}

function Topic({ n, text, left }: { n: number; text: string; left: boolean }) {
    const [ref, seen] = useSeen<HTMLLIElement>("0px 0px -12% 0px", true);
  return (
    <li
      ref={ref}
      className="relative grid min-h-[84px] grid-cols-[44px_1fr] items-center gap-x-5 py-3 md:min-h-[96px] md:grid-cols-[1fr_64px_1fr] md:gap-x-10 md:py-4"
    >
      {/* the station */}
      <span
        className={`relative z-10 col-start-1 row-start-1 flex h-11 w-11 items-center justify-center justify-self-center rounded-full text-sm font-bold ring-[6px] ring-slate-100 transition-all duration-700 md:col-start-2 md:h-12 md:w-12 ${
          seen
            ? "scale-110 bg-secondary text-primary-darkest shadow-[0_0_0_8px_rgba(249,184,30,0.25)]"
            : "scale-90 border border-slate-300 bg-white text-primary/60"
        }`}
      >
        {n}
      </span>

      {/* the topic card (box and text animate together), with a connector that grows out of the circle */}
      <div
        className={`relative col-start-2 row-start-1 transition-all duration-700 ease-out ${
          left ? "md:col-start-1 md:justify-self-end" : "md:col-start-3"
        } ${
          seen
            ? "translate-x-0 scale-100 opacity-100"
            : `scale-90 opacity-0 ${left ? "md:-translate-x-16" : "md:translate-x-16"} translate-x-10`
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute right-full top-1/2 h-[3px] w-5 -translate-y-1/2 origin-left rounded-full bg-secondary transition-transform delay-300 duration-500 motion-reduce:transition-none md:w-10 ${
            left ? "md:right-auto md:left-full md:origin-right" : ""
          } ${seen ? "scale-x-100" : "scale-x-0"}`}
        />
               <span className="inline-block rounded-xl bg-white px-4 py-2.5 text-sm font-normal text-primary shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:text-[15px]">
          {text}
        </span>
      </div>
    </li>
  );
}

function ModuleBanner({ i, title, image, count }: { i: number; title: string; image: string; count: number }) {
  const [ref, seen] = useSeen<HTMLDivElement>("0px 0px -10% 0px");
  return (
    <div
      ref={ref}
      className={`relative z-10 my-10 overflow-hidden rounded-2xl bg-cover bg-center shadow-xl transition-all duration-700 ${
        seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#071a33]/95 via-[#0b2545]/80 to-[#0b2545]/40" />
      <div className="relative flex min-h-[120px] flex-col justify-center px-6 py-6 md:min-h-[150px] md:px-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">Module {String(i + 1).padStart(2, "0")}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h3 className="font-outfit text-xl font-semibold text-white md:text-3xl">{title}</h3>
          {count > 0 && (
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary-darkest">{count} topics</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CurriculumRoute({ data }: { data: LevelContentType }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);

  // the gold line fills as you scroll down the route
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.6 - r.top) / r.height;
      setFill(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const points = data.points ?? [];
  const totalTopics = points.reduce((s, p) => s + p.items.length, 0);
  let counter = 0;

  return (
    <section className="w-full bg-gradient-light-neutral-lg bg-cover bg-top-left py-6 sm:px-4 md:py-8 lg:py-12 xl:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between xl:flex-row xl:items-center">
          <div>
            <h2 className="h3 text-start text-primary">{data.title.line1}</h2>
            <p className="mt-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70">
              <span className="h-[3px] w-6 rounded bg-secondary" />
              {points.length} modules · {totalTopics} topics
            </p>
          </div>
          {data.button && (
            <div className="my-2">
              <Button iconRight variant="primary" size="medium" text={data.button.text} href={data.button.href} className="my-auto" />
            </div>
          )}
        </div>

        <div ref={wrap} className="relative mx-auto mt-6 max-w-5xl">
          {/* the rail */}
          <div className="absolute bottom-0 left-[22px] top-0 w-1.5 -translate-x-1/2 rounded-full bg-slate-300 md:left-1/2">
            <div
              className="w-full rounded-full bg-gradient-to-b from-secondary to-secondary-dark shadow-[0_0_14px_rgba(249,184,30,0.8)]"
              style={{ height: `${fill * 100}%`, transition: "height 120ms linear" }}
            />
          </div>

          {points.map((m, mi) => (
            <div key={mi}>
              <ModuleBanner i={mi} title={m.title} image={m.image?.src} count={m.items.length} />
              <ol>
                {m.items.map((t) => {
                  counter += 1;
                  return <Topic key={counter} n={counter} text={t} left={counter % 2 === 1} />;
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}