"use client";
import React from "react";
import { LevelCertificationType } from "@/type/levelCertification";
import Image from "next/image";

type Props = {
  data: LevelCertificationType
}

// Layout: every credential is the same compact card (seal + title + description) in a two-column grid, so the
// section is short and even. Sample certificates are shown once, as a row of thumbnails underneath, instead of
// beside only some of the cards. Works for every level: 5 credentials (Levels 1 to 3) or a single one (Levels 4 to 6).
export default function LevelCertification({ data }: Props) {
  const points = data?.points ?? [];
  const credentials = points.filter((p) => p?.title);
  const samples = points.filter((p) => p?.imageCerficate?.src);

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-dark-primary bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">

        <h2 className="h3 text-start">
          <span className="text-secondary">
            {data?.title?.line1}
          </span>
          <br />
          <span className="text-white">
            {data?.title?.line2}
          </span>
        </h2>

        {/* Credentials: equal cards; an odd last card spans the full row so the grid never ends lopsided. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-6 lg:mt-8">
          {credentials.map((point, index) => {
            const isLastOdd = credentials.length % 2 === 1 && index === credentials.length - 1;
            return (
              <div
                key={index}
                className={`flex items-center gap-4 bg-white rounded-lg shadow-lg border-l-4 border-secondary p-4 lg:p-5 ${
                  isLastOdd ? "lg:col-span-2" : ""
                }`}
              >
                {point?.imageBrand?.src && (
                  <Image
                    src={point.imageBrand.src}
                    alt={point.imageBrand.alt || "Brand"}
                    width={64}
                    height={64}
                    className="shrink-0 object-contain"
                  />
                )}
                <div>
                  <h3 className="text-lg xl:text-xl text-primary text-start font-outfit font-semibold mb-1">
                    {point.title}
                  </h3>
                  <p className="custom-text1 font-light text-black/70 text-start">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sample certificates: one even row of thumbnails. Click opens the full-size image in a new tab. */}
        {samples.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mt-6 lg:mt-8">
            {samples.map((point, index) => (
              <figure key={index} className="w-[calc(50%-0.5rem)] sm:w-[220px]">
                <a
                  href={point.imageCerficate!.src.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md overflow-hidden bg-white ring-1 ring-white/20 hover:ring-secondary transition"
                >
                  <Image
                    src={point.imageCerficate!.src}
                    alt={point.imageCerficate!.alt || "Certificate"}
                    sizes="220px"
                    className="w-full h-auto"
                  />
                </a>
                <figcaption aria-hidden="true" className="text-white/80 text-sm leading-snug text-center mt-2">
                  {point.imageCerficate!.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
