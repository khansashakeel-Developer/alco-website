"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import "@/component/gallery-carousel/galleryCarousel.css";
import Image, { StaticImageData } from "next/image";
import { RiArrowRightDoubleLine, RiArrowLeftDoubleLine } from "react-icons/ri";

export type GalleryImage = {
    src: StaticImageData;
    alt: string;
    title: string;
};

type ThumbProps = {
    selected: boolean;
    onClick: () => void;
    image: StaticImageData;
};

type Props = {
    slides?: GalleryImage[];
    options?: EmblaOptionsType;
};

/* ================= THUMB ================= */
const Thumb = ({ selected, onClick, image, index, alt }: any) => {
    return (
        <div
            data-index={index}
            className={`gallery_embla-thumbs__slide ${selected ? "gallery_embla-thumbs__slide--selected" : ""
                }`}
        >
            <button onClick={onClick} type="button" className="w-full">
                <div className="relative w-full h-[100px]">
                    <Image
                        src={image}
                        alt={alt || "AL&CO gallery image"}
                        fill
                        className={`object-cover rounded-lg border-2 transition-all duration-200 ${selected
                                ? "border-white scale-105"
                                : "border-transparent hover:border-white/60"
                            }`}
                    />
                </div>
            </button>
        </div>
    );
};

/* ================= MAIN COMPONENT ================= */
const GalleryCarousel = ({ slides, options }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const thumbsViewportRef = React.useRef<HTMLDivElement>(null);

    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
        loop: true,
        ...options,
    });
    const [prevDisabled, setPrevDisabled] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(false);

    const scrollPrev = useCallback(() => {
        if (emblaMainApi) emblaMainApi.scrollPrev();
    }, [emblaMainApi]);

    const scrollNext = useCallback(() => {
        if (emblaMainApi) emblaMainApi.scrollNext();
    }, [emblaMainApi]);

    /* ================= HANDLERS ================= */
    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi) return;
            emblaMainApi.scrollTo(index);
        },
        [emblaMainApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaMainApi) return;
        const selected = emblaMainApi.selectedScrollSnap();
        setSelectedIndex(selected);

        setPrevDisabled(!emblaMainApi.canScrollPrev());
        setNextDisabled(!emblaMainApi.canScrollNext());
    }, [emblaMainApi]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();
        emblaMainApi.on("select", onSelect);
        emblaMainApi.on("reInit", onSelect);
        return () => {
            emblaMainApi.off("select", onSelect);
            emblaMainApi.off("reInit", onSelect);
        };
    }, [emblaMainApi, onSelect]);

    useEffect(() => {
        const container = thumbsViewportRef.current;
        if (!container) return;

        const activeEl = container.querySelector(
            `[data-index="${selectedIndex}"]`
        ) as HTMLElement;

        if (activeEl) {
            activeEl.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [selectedIndex]);

    /* ================= UI ================= */
    return (
        <div className="gallery_embla flex gap-4 max-w-6xl items-start">
            <div className="relative w-[100%] md:w-[75%] lg:w-[80%] ">

                {/* LEFT ARROW */}
                <button
                    onClick={scrollPrev}
                    disabled={prevDisabled}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 md:bg-primary/50 text-black md:text-white p-2 rounded-full disabled:opacity-30"
                >
                    <RiArrowLeftDoubleLine size={20} />
                </button>

                {/* RIGHT ARROW */}
                <button
                    onClick={scrollNext}
                    disabled={nextDisabled}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 md:bg-primary/50 text-black md:text-white p-2 rounded-full disabled:opacity-30"
                >
                    <RiArrowRightDoubleLine size={20} />
                </button>

                {/* EMBLA VIEWPORT ONLY */}
                <div
                    className="gallery_embla__viewport"
                    ref={emblaMainRef}
                >
                    <div className="gallery_embla__container">
                        {slides?.map((slide, index) => (
                            <div className="gallery_embla__slide relative bg-black" key={index}>
                                <div className="relative w-full h-[350px] md:h-[450px]">
                                    <Image
                                        src={slide.src}
                                        alt={slide.alt || slide.title || "AL&CO gallery image"}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* THUMBNAILS — pure native CSS scroll */}
            <div className="gallery_embla-thumbs w-[25%] lg:w-[20%] hidden md:block">
                <div className="gallery_embla-thumbs__viewport" ref={thumbsViewportRef}>
                    <div className="gallery_embla-thumbs__container">
                        {slides?.map((slide, index) => (
                            <Thumb
                                key={index}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                image={slide.src}
                                alt={slide.alt || slide.title}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default GalleryCarousel;