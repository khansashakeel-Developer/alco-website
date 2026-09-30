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
    : `grid grid-cols-1 md:grid-cols-2 ${threeAcross ? "xl:grid-cols-3" : ""} md:auto-rows-fr gap-4 lg:gap-6 2xl:gap-8 py-4 lg:py-8 xl:py-10`;

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

        {/* Deatil Content */}
        {data?.detailContent && (
          <div className={`${data?.textAlign ? data?.textAlign : "text-center"} text-primary-light custom-text1  mx-auto`}>{data?.detailContent}</div>
        )}
      </div>
    </section>
  );
}