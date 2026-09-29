"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';
import '@/component/brand-carousel/brandCarousel.css';
import { brandType } from '@/type/brandTypes';

export type BrandCarouselProps = {
  images: brandType[];
};

const BrandCarousel = ({ images }: BrandCarouselProps) => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [AutoScroll({ speed: 1, stopOnInteraction: false, startDelay: 0 })]
  );

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...images, ...images];

  return (
    <div className="brand_embla">
      <div className="brand_embla__viewport" ref={emblaRef}>
        <div className="brand_embla__container">
          {duplicatedImages.map((image: brandType, index: number) => (
            <div className="brand_embla__slide" key={`${image._id}-${index}`}>
              <div className="relative w-full h-[80px] flex items-center justify-center">
                {image.image?.src && (
                  <Image
                    src={image.image.src} // StaticImageData or string
                    alt={image.alt ?? 'Brand Image'}
                    fill
                    className="object-contain"
                  />
                )}
              </div>
              {/* <img
                                src={image.image.src}
                                alt={image.alt}
                                className="brand_embla__slide__img"
                            /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;