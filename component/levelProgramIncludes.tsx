"use client";
import React, { useEffect, useRef, useState } from "react";
import { LevelProgramIncludesType } from "@/type/levelProgramIncludes";
import Image from "next/image";
import Reveal from "./Reveal";
import IncludesScrollStory from "@/component/IncludesScrollStory";

type Props = {
  data?: LevelProgramIncludesType
}
function JourneyItem({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-active={active} className={className}>
      {children}
    </div>
  );
}
export default function LevelProgramIncludes({ data }: Props) {
  if (data?.layout === "split") return <IncludesScrollStory data={data} />;
  const count = data?.points?.length ?? 0;

  return (
    data &&
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-gradient-light-neutral-lg bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center">
          <h2 className="h3 text-start">
            <span className="text-primary">
              {data?.title?.line1}
            </span>
          </h2>
        </div>
        {data.description && (
          <div className="custom-text1 font-light text-gray-600 text-start ">
            {data.description}
          </div>
        )}

        {(data?.layout as string | undefined) === "split" ? (
          // Split layout: one white panel of evenly spaced rows (label on the left, text on the right).
          <div className="mt-4 lg:mt-6 mb-4 lg:mb-8 xl:mb-10 bg-white rounded-xl shadow-lg divide-y divide-slate-200">
            {data.points.map((point, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-3 md:gap-8 p-5 lg:p-6">
                <div className="flex items-center gap-4 self-start">
                  <div className="w-12 h-12 shrink-0 p-2.5 bg-primary rounded-lg">
                    {point?.image?.src && (
                      <Image src={point.image.src} alt={point.image.alt || ""} width={100} height={100} className="object-cover" />
                    )}
                  </div>
                  <h3 className="text-lg xl:text-xl text-start font-outfit font-semibold text-primary">
                    {point.title}
                  </h3>
                </div>
                <div className="font-outfit text-base leading-relaxed text-gray-700 text-start [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_p+ul]:mt-2">
                  {point.description}
                </div>
              </div>
            ))}
          </div>
        ) : data?.layout === "rows" ? (
          // Rows layout: one full-width row per point, a dark label panel beside the text.
          <div className="flex flex-col gap-4 lg:gap-6 py-4 lg:py-8 xl:py-10">
            {data.points.map((point, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] overflow-hidden rounded-xl shadow-lg bg-white">
                <div className="flex items-center gap-4 bg-primary-darkest p-5 lg:p-6">
                  <div className="w-14 h-14 shrink-0 p-3 bg-primary rounded-lg">
                    {point?.image?.src && (
                      <Image src={point.image.src} alt={point.image.alt || "image"} width={100} height={100} className="object-cover" />
                    )}
                  </div>
                  <div>
                    <div className="font-outfit text-sm font-semibold tracking-widest text-white/60">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-lg xl:text-xl text-start font-outfit font-semibold text-secondary">
                      {point.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5 lg:p-6 border-l-4 border-secondary font-outfit text-base leading-relaxed text-gray-800 text-start [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
                  {point.description}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Default layout (Levels 2 to 6): animated journey timeline.
          <div className="relative mt-10 mb-6 lg:mb-10">
            {/* glowing spine */}
            <span
              aria-hidden="true"
              className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 rounded-full bg-gradient-to-b from-secondary via-primary/50 to-transparent shadow-[0_0_12px_rgba(249,184,30,0.6)]"
            />

            <div className="space-y-8 md:space-y-4">
              {data?.points.map((point, index) => {
                const left = index % 2 === 0;
                return (
                                    <JourneyItem
                    key={index}
                    className={`group relative pl-16 md:pl-0 md:w-1/2 ${
                      left ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16 md:ml-auto"
                    }`}
                  >
                    {/* numbered node on the spine */}
                    <div
                      className={`absolute top-6 left-0 flex h-10 w-10 items-center justify-center ${
                        left ? "md:left-auto md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
                      }`}
                    >
                      <span aria-hidden="true" className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary/40" />
                      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white ring-4 ring-secondary/60 shadow-lg transition-all duration-500 group-hover:scale-125 group-hover:bg-secondary group-hover:text-primary-darkest group-data-[active=true]:scale-125 group-data-[active=true]:bg-secondary group-data-[active=true]:text-primary-darkest">
                        {index + 1}
                      </span>
                    </div>

                    <Reveal delay={Math.min(index, 4) * 80}>
                      <div className="rounded-2xl border border-transparent p-5 lg:p-6 transition-all duration-500 group-data-[active=true]:-translate-y-1 group-data-[active=true]:bg-white group-data-[active=true]:shadow-2xl group-hover:border-secondary group-hover:shadow-[0_0_0_4px_rgba(249,184,30,0.25)]">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-primary to-primary-darkest p-2.5 shadow-md transition-transform duration-500 group-hover:rotate-[360deg]">
                            {point?.image?.src && (
                              <Image
                                src={point.image.src}
                                alt={point.image.alt || ""}
                                width={100}
                                height={100}
                                className="object-cover"
                              />
                            )}
                          </div>
                          <h3 className="font-outfit text-lg xl:text-xl font-normal text-primary text-start transition-colors duration-300 group-hover:text-primary-darkest">
                            {point.title}
                          </h3>
                        </div>

                        <span aria-hidden="true" className="mt-3 block h-0.5 w-10 rounded-full bg-secondary transition-all duration-500 group-hover:w-24 group-data-[active=true]:w-24" />

                        <div className="mt-3 font-outfit text-base leading-relaxed text-gray-700 text-start [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_p+ul]:mt-2">
                          {point.description}
                        </div>
                      </div>
                    </Reveal>
                  </JourneyItem>
                );
              })}
            </div>
          </div>
        )}

        {/* Detail Content */}
        {data?.detailContent && (
          <div className={`${data?.textAlign ? data?.textAlign : "text-center"} text-primary-light custom-text1  mx-auto`}>{data?.detailContent}</div>
        )}
      </div>
    </section>
  );
}