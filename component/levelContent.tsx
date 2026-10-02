"use client";
import React from "react";
import Button from "./button";
import { LevelContentType } from "@/type/levelContent";

type Props = {
  data: LevelContentType
}

// Layout: one 6-column grid on desktop, so every row spans the full container width and cards line up edge to edge.
// A long list (more than 10 items, e.g. the NLP card on Levels 1 and 2) gets a full-width card with the list in
// columns; the remaining cards share the next row equally. Every card has the same anatomy (image banner, title,
// top-aligned list) and cards in a row share one height.
const LONG_LIST = 10;

// Column span (out of 6) on xl for each non-featured card, so no row ends short: 3 cards -> 2+2+2, 2 or 4 -> 3 each,
// 5 -> 2+2+2 then 3+3, 1 -> full row.
function xlSpan(index: number, n: number) {
  if (n === 1) return "xl:col-span-6";
  if (n === 5) return index < 3 ? "xl:col-span-2" : "xl:col-span-3";
  if (n % 3 === 0) return "xl:col-span-2";
  return "xl:col-span-3";
}

export default function LevelContent({ data }: Props) {
  const points = data?.points ?? [];
  const isFeatured = (p: (typeof points)[number]) => points.length > 1 && p.items.length > LONG_LIST;
  const rest = points.filter((p) => !isFeatured(p));

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-gradient-light-neutral-lg bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center">
          <h2 className="h3 text-start">
            <span className="text-primary">
              {data?.title?.line1}
            </span>
          </h2>
          {data?.button && (<div className="my-2">
            <Button
              iconRight
              variant="primary"
              size="medium"
              text={data?.button?.text}
              href={data?.button?.href}
              className="my-auto"
            />
          </div>)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 lg:gap-6 py-4 lg:py-8 xl:py-10">
          {points.map((point, index) => {
            const featured = isFeatured(point);
            const restIndex = rest.indexOf(point);
            const span = featured
              ? "md:col-span-2 xl:col-span-6"
              : `${restIndex === rest.length - 1 && rest.length % 2 === 1 ? "md:col-span-2" : ""} ${xlSpan(restIndex, rest.length)}`;
            return (
              <div
                key={index}
                className={`flex flex-col overflow-hidden rounded-xl shadow-lg bg-primary-darkest ${span}`}
              >
                {/* Image banner, fading softly into the card */}
                <div
                  className={`relative ${point.items.length === 0 ? "h-14 sm:h-28" : "h-28"} lg:h-32 bg-cover bg-center`}
                  style={{ backgroundImage: `url(${point?.image?.src})` }}
                  role="img"
                  aria-label={point?.image?.alt || point.title}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-darkest to-transparent"></div>
                </div>

                {/* Content, always top-aligned */}
                  <div className={`flex flex-col flex-1 px-5 ${point.items.length === 0 ? "pb-3 sm:pb-6" : "pb-6"} pt-1 lg:px-6 2xl:px-8`}>
                  <h3 className={`text-lg sm:text-xl font-outfit font-semibold text-secondary ${point.items.length === 0 ? "mb-0 sm:mb-3" : "mb-3"}`}>
                    {point.title}
                  </h3>

                  {point.items.length > 0 && (
                    <ul className={`list-disc pl-5 space-y-1.5 text-base font-outfit text-white ${
                      featured ? "md:columns-2 xl:columns-3 md:gap-x-10" : ""
                    }`}>
                      {point.items.map((item, i) => (
                        <li key={i} className="break-inside-avoid">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}