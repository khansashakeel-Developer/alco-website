"use client";
import React, { useRef } from "react"
import { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay";
import Button from "@/component/button"
import "@/component/testimonials-carousel/testimonialsCarousel.css"
import { TestimonialsPost } from "@/type/testimonialsTypes"
import { HiStar } from "react-icons/hi2";
import VideoPlayer from "../videoPlayer"

type PropType = {
  slides: TestimonialsPost[]
  padding?: string
  options?: EmblaOptionsType
  onEditSlide?: (slide: TestimonialsPost) => void
}

const TestimonialsCarousel = ({ slides, padding, options, onEditSlide }: PropType) => {

  const autoplay = Autoplay(
    {
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...options,
      loop: true,
    }
    // [autoplay]
  );

  return (

    <section className={`  ${padding ? padding : "pt-6 md:pt-8 lg:pt-12 xl:pt-16"}`}>
      <div className="testimonials_embla">
        <div className="testimonials_embla__viewport container mx-auto" ref={emblaRef}>
          <div className="testimonials_embla__container ">
            {slides.map((slide, index) => (
              <div className="testimonials_embla__slide" key={slide?._id}>
                <div className="testimonials_embla__slide__content rounded-md relative h-full">
                  <div className=" grid grid-cols-12 lg:gap-8 h-full ">
                    <div
                      className="col-span-12 lg:col-span-5 relative cursor-pointer overflow-hidden rounded-md"
                    >
                      <VideoPlayer
                        className="relative bg-primary overflow-hidden h-72 lg:h-96 w-full"
                        videoUrl={slide?.videoUrl}
                        thumbnail={slide?.thumbnail}
                        videoClass="w-full h-full object-contain rounded-lg"
                        hoverPlay={true}
                      />
                      {/* Overlay */}
                      {/* <div className="absolute inset-0 bg-blue-500 bg-opacity-40 flex items-center justify-center opacity-100 transition-opacity duration-300 hover:opacity-0">
                      <span className="text-white text-4xl font-bold">▶</span>
                    </div> */}
                    </div>

                    <div className="col-span-12  lg:col-span-7 flex flex-col justify-between  h-full">
                      <div className="">
                      <p className="font-outfit text-base md:text-lg lg:text-xl text-black mb-2 mt-2 lg:mt-0">{slide.description}</p>
                      </div>
                      <div className="">
                        <h3 className="font-outfit font-semibold text-lg">{slide.name}</h3>
                        <p className="font-outfit text-sm text-gray-600">{slide.designation}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`text-yellow-400 text-[18px] ${i >= slide.rating ? "text-gray-300" : ""}`}>
                              <HiStar />
                            </span>
                          ))}
                        </div>
                        <Button
                          iconRight={true}
                          text="Read More"
                          variant="primary"
                          size="medium"
                          href="/testimonial"
                          className="mt-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="testimonials_embla__controls absolute right-2 bottom-0">
          <div className="testimonials_embla__buttons">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="bg-primary text-white px-3 py-1 rounded"
            >
              ←
            </button>

            <button
              onClick={() => emblaApi?.scrollNext()}
              className="bg-primary text-white px-3 py-1 rounded"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsCarousel