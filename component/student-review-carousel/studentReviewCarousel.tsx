"use client"

import React, { useRef, useState } from "react"
import { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import Button from "@/component/button"
import "@/component/student-review-carousel/studentReviewCarousel.css"
import { TestimonialsPost } from "@/type/testimonialsTypes"
import { MdArrowForwardIos } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { PiSealCheckFill } from "react-icons/pi";
import Image from "next/image"

type PropType = {
    slides: TestimonialsPost[]
    options?: EmblaOptionsType
}

const StudentReviewCarousel = ({ slides, options }: PropType) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const [expandedSlides, setExpandedSlides] = useState<{ [key: string]: boolean }>({});

    const toggleExpand = (id: string) => {
        setExpandedSlides((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className="student_review_embla relative py-6 md:py-8 lg:py-12 xl:py-16 ">
            <div className="student_review_embla__viewport relative" ref={emblaRef}>
                <div className="student_review_embla__container ">
                    {slides.map((slide) => (
                        <div className="student_review_embla__slide " key={slide._id}>
                            <div className=" flex flex-col gap-4 min-h-[200px] rounded-md p-6 shadow-sm bg-neutral-light">
                                <div className="flex flex-col relative">
                                    <div className="flex items-center gap-4">
                                        {slide.thumbnail && (
                                            <div className="w-12 h-12 relative rounded-full overflow-hidden">
                                                <Image
                                                    src={slide.thumbnail}          // must be defined
                                                    alt={slide.name}
                                                    fill                            // makes it fill the parent div
                                                    className="object-cover rounded-full"
                                                    sizes="48px"                    // optional, since w-12 h-12 = 48px
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-lg font-outfit">{slide.name}</h3>
                                            <p className="text-sm text-gray-600 font-outfit">{slide.designation}</p>

                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 ">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span
                                                key={i}
                                                className={`text-yellow-400 text-[18px] ${i >= slide.rating ? "text-gray-300" : ""}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                        <PiSealCheckFill className="text-blue-500 text-xl  ml-2" />
                                    </div>
                                    <div className="absolute top-1 right-1">
                                        <FcGoogle className="text-2xl" />
                                    </div>
                                </div>
                                <p
                                    className={`text-gray-800 font-outfit ${!expandedSlides[slide._id] ? "line-clamp-3" : ""}`}
                                >
                                    {slide.description}
                                </p>
                                <button
                                    className=" text-gray-500 font-normal hover:text-blue-500"
                                    onClick={() => toggleExpand(slide._id)}
                                >
                                    {expandedSlides[slide._id] ? "Read Less" : "Read More"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>

            {/* Arrows fixed left/right */}
            <div className="student_review_embla__controls">
                <div className="student_review_embla__buttons mt-8 xl:mt-0">
                    <button
                        onClick={() => emblaApi?.scrollPrev()}
                        className="xl:absolute xl:top-1/2 xl:-left-8 transform -translate-y-1/2 bg-primary text-white h-10 w-10 rounded-full shadow-lg z-10 flex justify-center items-center"
                    >
                        <MdArrowForwardIos className="rotate-180" />
                    </button>
                    <button
                        onClick={() => emblaApi?.scrollNext()}
                        className=" xl:absolute xl:top-1/2 xl:-right-8 transform -translate-y-1/2 bg-primary text-white h-10 w-10 rounded-full shadow-lg z-10 flex justify-center items-center"
                    >
                        <MdArrowForwardIos />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default StudentReviewCarousel