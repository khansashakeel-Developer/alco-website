"use client";
import React, { useEffect, useState } from "react";
import { LevelCertificationType } from "@/type/levelCertification";
import Image from "next/image";
import { ZoomIn, X } from "lucide-react";

type Props = {
  data: LevelCertificationType;
};

// Layout: sample certificates come first as a large framed showcase (click to view full screen), then every
// credential as a white card (medal-style seal + title + description) in a two-column grid.
// Works for every level: 5 credentials (Levels 1 to 3) or a single one (Levels 4 to 6).
export default function LevelCertification({ data }: Props) {
  const points = data?.points ?? [];
  const credentials = points.filter((p) => p?.title);
  const samples = points.filter((p) => p?.imageCerficate?.src);
  const [open, setOpen] = useState<number | null>(null);

  // Esc closes the viewer and the page does not scroll behind it.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-dark-primary bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <h2 className="h3 text-start">
          <span className="text-secondary">{data?.title?.line1}</span>
          <br />
          <span className="text-white">{data?.title?.line2}</span>
        </h2>

        {/* Sample certificates: large framed cards, straight. Click opens the full-screen viewer. */}
        {samples.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 [&>*]:w-full sm:[&>*]:w-[calc(50%-0.75rem)] lg:[&>*]:w-[calc(33.333%-1rem)]">
            {samples.map((point, index) => (
              <figure
                key={index}
                className="group transition duration-500 ease-out hover:-translate-y-1 hover:scale-[1.03] motion-reduce:transform-none"
              >
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-label={`View full size: ${point.imageCerficate!.alt || "Certificate"}`}
                  className="relative block w-full rounded-xl bg-white p-2.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/30 transition group-hover:ring-2 group-hover:ring-secondary focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  <Image
                    src={point.imageCerficate!.src}
                    alt={point.imageCerficate!.alt || "Certificate"}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                    quality={90}
                    className="h-auto w-full rounded-md"
                  />
                  <span className="pointer-events-none absolute inset-2.5 flex items-end justify-center rounded-md bg-gradient-to-t from-primary-darkest/70 via-transparent to-transparent pb-3 opacity-0 transition duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-primary-darkest">
                      <ZoomIn size={16} aria-hidden="true" /> View full size
                    </span>
                  </span>
                </button>
                <figcaption
                  aria-hidden="true"
                  className="mt-4 text-center text-sm leading-snug text-white/85 sm:text-base"
                >
                  {point.imageCerficate!.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {/* Credentials: equal white cards with a gold top bar and a medal-style seal; an odd last card spans the full row. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 mt-10 lg:mt-14">
          {credentials.map((point, index) => {
            const isLastOdd =
              credentials.length % 2 === 1 && index === credentials.length - 1;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl bg-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl motion-reduce:transition-none motion-reduce:hover:transform-none ${
                  isLastOdd ? "lg:col-span-2" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-secondary-dark via-secondary to-[#FFE29D]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-3 select-none font-outfit text-[88px] font-extrabold leading-none text-primary/15 transition duration-300 group-hover:text-primary/25"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-center gap-5 p-5 pt-7 lg:p-6 lg:pt-8">
                  {point?.imageBrand?.src && (
                                        <span className="relative block size-[120px] min-h-[120px] min-w-[120px] shrink-0 overflow-hidden rounded-full bg-white shadow-md ring-4 ring-secondary transition duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none lg:size-[132px] lg:min-h-[132px] lg:min-w-[132px]">
                      <Image
                        src={point.imageBrand.src}
                        alt={point.imageBrand.alt || "Brand"}
                        fill
                        sizes="132px"
                        className={`rounded-full object-cover ${
                          point.imageBrand.alt?.includes("AL&CO") ? "scale-[1.3]" : "scale-[0.92]"
                        }`}
                      />
                    </span>
                  )}
                  <div className="pr-6">
                    <h3 className="mb-1 text-start font-outfit text-lg font-semibold text-primary xl:text-xl">
                      {point.title}
                    </h3>
                    <p className="custom-text1 text-start font-light text-black/70">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-screen viewer */}
      {open !== null && samples[open] && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={samples[open].imageCerficate!.alt || "Certificate"}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <X size={24} aria-hidden="true" />
          </button>
          <Image
            src={samples[open].imageCerficate!.src}
            alt={samples[open].imageCerficate!.alt || "Certificate"}
            sizes="92vw"
            quality={100}
            className="h-auto max-h-[88vh] w-auto max-w-[92vw] rounded-lg bg-white p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
