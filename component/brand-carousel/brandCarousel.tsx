"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image, { StaticImageData } from "next/image";
import "@/component/brand-carousel/brandCarousel.css";

// One slide per organisation. With an `image` the logo is shown; without one the name is shown as text,
// so the strip works while logos are still being supplied. Add `image` to an item and it swaps over.
export type BrandStripItem = { name: string; image?: StaticImageData };

export type BrandCarouselProps = {
  items: BrandStripItem[];
};

const BrandCarousel = ({ items }: BrandCarouselProps) => {
  // Respect "reduce motion": the strip stays put (and can still be dragged) instead of scrolling.
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [
    AutoScroll({ speed: 1, stopOnInteraction: false, startDelay: 0, playOnInit: !reduceMotion }),
  ]);

  // Second copy makes the loop seamless. It is hidden from assistive tech and crawlers-as-text (aria-hidden, empty alt)
  // so each organisation is announced and read once.
  const slides = [...items, ...items];

  return (
    <div className="brand_embla">
      <div className="brand_embla__viewport" ref={emblaRef}>
        <div className="brand_embla__container">
          {slides.map((item, index) => {
            const isCopy = index >= items.length;
            return (
              <div className="brand_embla__slide" key={`${item.name}-${index}`} aria-hidden={isCopy || undefined}>
                <div className="relative w-full h-[80px] flex items-center justify-center">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={isCopy ? "" : `${item.name} logo`}
                      fill
                      sizes="(max-width: 768px) 50vw, 200px"
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-center font-outfit font-semibold text-primary text-[15px] md:text-[16px] leading-snug">
                      {item.name}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;