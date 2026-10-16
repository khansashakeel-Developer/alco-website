"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { LevelProgramIncludesType } from "@/type/levelProgramIncludes";

export default function IncludesScrollStory({
  data,
}: {
  data: LevelProgramIncludesType;
}) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const total = data.points.length;

  // the item crossing the middle of the screen becomes the active one
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [total]);

  const jump = (i: number) =>
    itemRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  const ACCENTS = ["#F9B81E", "#2B6CA3", "#F9B81E", "#1B507C", "#F09623", "#2B6CA3"];
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section className="w-full bg-gradient-light-neutral-lg bg-cover bg-top-left py-6 sm:px-4 md:py-8 lg:py-12 xl:py-16">
      <style>{`
  @keyframes isr-spin { to { transform: rotate(360deg) } }
  @keyframes isr-pop { 0% { transform: scale(.55); opacity: 0 } 70% { transform: scale(1.08); opacity: 1 } 100% { transform: scale(1) } }
  @media (prefers-reduced-motion: reduce) { .isr-anim { animation: none !important } }
`}</style>

      <div className="container mx-auto px-4">
        <h2 className="h3 text-start text-primary">{data.title.line1}</h2>
        {data.description && (
          <div className="custom-text1 text-start font-light text-gray-600">
            {data.description}
          </div>
        )}

        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-16">
          {/* ---- pinned panel (desktop only) ---- */}
<div className="relative hidden lg:block" aria-hidden>
  <div
    onMouseMove={onMove}
    className="sticky top-28 h-[500px] overflow-hidden rounded-3xl bg-[#071a33] shadow-2xl"
  >
    {/* colour glow that changes with the item */}
    <div
      className="absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-60 blur-3xl transition-colors duration-1000"
      style={{ background: ACCENTS[active % ACCENTS.length] }}
    />
    <div
      className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full opacity-30 blur-3xl transition-colors duration-1000"
      style={{ background: ACCENTS[(active + 2) % ACCENTS.length] }}
    />
    {/* fine dot texture */}
    <div
      className="absolute inset-0 opacity-20"
      style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
    />
    {/* cursor light */}
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: "radial-gradient(260px circle at var(--x,50%) var(--y,30%), rgba(255,255,255,0.12), transparent 70%)" }}
    />

    {/* ghost number */}
    <span
      key={`ghost-${active}`}
      className="pointer-events-none absolute -bottom-12 -right-2 select-none text-[240px] font-bold leading-none text-white/[0.06]"
      style={{ animation: "isr-in .7s ease both" }}
    >
      {String(active + 1).padStart(2, "0")}
    </span>

    {data.points.map((p, i) => {
      const on = i === active;
      const words = p.title.split(" ");
      return (
        <div key={i} className={`absolute inset-0 flex flex-col justify-between p-8 pr-14 ${on ? "" : "pointer-events-none"}`}>
          {/* icon with orbiting dots */}
          <div className="relative h-32 w-32" style={on ? { animation: "isr-pop .8s cubic-bezier(.3,1.4,.5,1) both" } : { opacity: 0 }}>
            <span className="isr-anim absolute inset-0 rounded-full border border-dashed border-white/40" style={{ animation: "isr-spin 26s linear infinite" }} />
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="isr-anim absolute inset-0"
                style={{ animation: `isr-spin ${9 + d * 5}s linear infinite ${d % 2 ? "reverse" : "normal"}`, transform: `rotate(${d * 120}deg)` }}
              >
                <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full" style={{ background: ACCENTS[(i + d) % ACCENTS.length], boxShadow: `0 0 10px ${ACCENTS[(i + d) % ACCENTS.length]}` }} />
              </span>
            ))}
            <span
              className="absolute inset-4 flex items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur-sm"
              style={{ boxShadow: `0 0 40px ${ACCENTS[i % ACCENTS.length]}55` }}
            >
              {p.image?.src && <Image src={p.image.src} alt="" width={64} height={64} className="h-14 w-14 object-contain" />}
            </span>
          </div>

          {/* number + title, word by word */}
          <div className="relative pb-2">
            <p
              className="text-xs font-bold uppercase tracking-[0.3em] transition-all duration-700"
              style={{ color: ACCENTS[i % ACCENTS.length], opacity: on ? 1 : 0, transform: on ? "none" : "translateY(10px)" }}
            >
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <p className="mt-3 text-3xl font-bold leading-tight text-white">
              {words.map((w, wi) => (
                <span key={wi} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
                  <span
                    className="inline-block transition-transform duration-700 ease-out"
                    style={{
                      transform: on ? "translateY(0)" : "translateY(115%)",
                      transitionDelay: on ? `${250 + wi * 90}ms` : "0ms",
                    }}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>
      );
    })}

    {/* vertical dot stepper on the right edge */}
    <div className="absolute right-5 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-2.5">
      {data.points.map((_, i) => (
        <button
          key={i}
          type="button"
          tabIndex={-1}
          onClick={() => jump(i)}
          className={`w-2 rounded-full transition-all duration-500 ${i === active ? "h-8 bg-secondary" : "h-2 bg-white/30 hover:bg-white/60"}`}
        />
      ))}
    </div>
  </div>
</div>
        

          {/* ---- the story: every item stays in the page ---- */}
          <div className="space-y-6 lg:space-y-0">
            {data.points.map((p, i) => {
              const on = i === active;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  data-i={i}
                  className={`flex items-center rounded-2xl bg-white p-5 shadow-md transition-all duration-500 lg:min-h-[34vh] lg:bg-transparent lg:p-0 lg:shadow-none ${
                    on ? "lg:opacity-100" : "lg:opacity-40"
                  }`}
                >
                  <div className="w-full">
                    {/* phone and tablet header; the pinned panel does this on desktop */}
                    <div className="mb-3 flex items-center gap-3 lg:hidden">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary p-2.5">
                        {p.image?.src && (
                          <Image
                            src={p.image.src}
                            alt=""
                            width={64}
                            height={64}
                            className="object-contain"
                          />
                        )}
                      </span>
                      <h3 className="font-outfit text-xl font-semibold text-primary">
                        {p.title}
                      </h3>
                    </div>
                    <h3 className="mb-3 hidden font-outfit text-2xl font-semibold text-primary lg:block xl:text-3xl">
                      <span className="mr-3 text-secondary-dark">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p.title}
                    </h3>
                    <div className="border-l-4 border-secondary pl-5 font-outfit text-lg leading-relaxed text-gray-700 md:text-xl md:leading-8 [&_p+ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
                      {p.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`@keyframes isr-in { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }`}</style>
    </section>
  );
}
