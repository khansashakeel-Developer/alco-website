"use client";
import React from "react";
import Button from "./button";
import Reveal from "@/component/Reveal";
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
            const hasItems = point.items.length > 0;
            return (
              <Reveal
                key={index}
                delay={index * 100}
                className={`h-full ${span}`}
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-primary/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl motion-reduce:transition-none motion-reduce:hover:transform-none">
                  {/* Image header with the title over it */}
                  <div
                    className={`relative ${hasItems ? "h-36 lg:h-40" : "h-28"} bg-cover bg-center`}
                    style={{ backgroundImage: `url(${point?.image?.src})` }}
                    role="img"
                    aria-label={point?.image?.alt || point.title}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-darkest via-primary-darkest/60 to-primary-darkest/10 transition duration-300 group-hover:via-primary-darkest/45" />
                    <span
                      aria-hidden="true"
                      className="absolute left-5 top-4 font-outfit text-xs font-bold uppercase tracking-widest text-secondary lg:left-6"
                    >
                      Module {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-5 pb-4 lg:px-6">
                      <h3 className="font-outfit text-lg font-semibold leading-tight text-white sm:text-xl">
                        {point.title}
                      </h3>
                      {hasItems && (
                        <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary-darkest">
                          {point.items.length} topics
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Gold line under the image */}
                  <span
                    aria-hidden="true"
                    className="h-1 w-full bg-gradient-to-r from-secondary-dark via-secondary to-[#FFE29D]"
                  />

                  {hasItems && (
                    <ul
                      className={`flex-1 p-3 lg:p-4 ${featured ? "md:columns-2 xl:columns-3 md:gap-x-6" : ""}`}
                    >
                      {point.items.map((item, i) => (
                        <li
                          key={i}
                          className="break-inside-avoid flex items-start gap-3 rounded-lg px-2 py-2 font-outfit text-base leading-snug text-gray-800 transition hover:bg-primary/5"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-darkest text-[11px] font-bold text-secondary"
                          >
                            {offsets[index] + i + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
