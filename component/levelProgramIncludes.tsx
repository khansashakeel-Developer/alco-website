"use client";
import React from "react";
import { LevelProgramIncludesType } from "@/type/levelProgramIncludes";
import Image from "next/image";

type Props = {
  data?: LevelProgramIncludesType
}

const themeClasses: any = {
  dark: "bg-primary-darkest",
  light: "bg-white",
  yellow: "bg-secondary-darkest",
};

// Layout: every card is the same shape (icon + title on one row, text underneath) and every row is the same
// height on tablet/desktop, so the section reads as an even grid. Six cards run 3 across on xl; any other count
// (Levels 4 to 6 have four) runs 2 across, so the grid never ends with a lone card. An odd last card spans the row.
export default function LevelProgramIncludes({ data }: Props) {
  const count = data?.points?.length ?? 0;
  const threeAcross = count > 0 && count % 3 === 0;
  const gridClass = data?.pointsClass
    ? data.pointsClass
    : `grid grid-cols-1 md:grid-cols-2 ${threeAcross ? "xl:grid-cols-3" : ""} gap-4 lg:gap-6 2xl:gap-8 py-4 lg:py-8 xl:py-10`;

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

        {data?.layout === "split" ? (
          // Split layout: heading and intro sit on top as usual; below, one white panel of evenly spaced rows.
          // Each row is label (icon + title) on the left and text on the right, so the text lines up down the panel.
          <div className="mt-4 lg:mt-6 mb-4 lg:mb-8 xl:mb-10 bg-white rounded-xl shadow-lg divide-y divide-slate-200">
            {data.points.map((point, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-3 md:gap-8 p-5 lg:p-6">
                <div className="flex items-center gap-4 self-start">
                  <div className="w-12 h-12 shrink-0 p-2.5 bg-primary rounded-lg">
                    {point?.image?.src && (
                      <Image src={point.image.src} alt={point.image.alt || "image"} width={100} height={100} className="object-cover" />
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
          // Rows layout: one full-width row per point, a dark label panel (number, icon, title) beside the text.
          // Every row has the same anatomy, so nothing depends on card heights matching.
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
        <div className={gridClass}>
          {data?.points.map((point, index) => {
            const isLastOdd = !threeAcross && count % 2 === 1 && index === count - 1;
            return (
              <div
                key={index}
                className={`flex flex-col h-full p-5 lg:p-6 2xl:p-8 rounded-xl shadow-lg ${themeClasses[point?.theme]} ${isLastOdd ? "md:col-span-2" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 shrink-0 p-3 bg-primary rounded-lg">
                    {point?.image?.src && (
                      <div className="relative">
                        <Image
                          src={point.image.src}
                          alt={point.image.alt || "image"}
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <h3 className={`
                    text-lg sm:text-xl
                    text-start
                    font-outfit font-semibold
                    ${point.theme === "dark" ? "text-secondary" : point.theme === "light" ? "text-primary" : "text-gray-800"}
                    `}>
                    {point.title}
                  </h3>
                </div>
                <div className={`mt-4 text-base leading-relaxed font-outfit text-start
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
                    ${point.theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  {point.description}
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* Deatil Content */}
        {data?.detailContent && (
          <div className={`${data?.textAlign ? data?.textAlign : "text-center"} text-primary-light custom-text1  mx-auto`}>{data?.detailContent}</div>
        )}
      </div>
    </section>
  );
}