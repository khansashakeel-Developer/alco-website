
// export default HeroCarousel
"use client"

import React, { useState, useEffect, useRef } from "react"
import { EmblaOptionsType } from "embla-carousel"
import { DotButton, useDotButton } from "../emblaCarouselDot"
import useEmblaCarousel from "embla-carousel-react"
import Button from "@/component/button"
import "@/component/hero-carousel/heroCarousel.css"
import { HeroItem } from "@/type/heroType"
import Image from "next/image"
import CtaButton from "@/component/CtaButton"

type PropType = {
  slides: HeroItem[]
  options?: EmblaOptionsType
  onEditSlide?: (slide: HeroItem) => void
}

const HeroCarousel = ({ slides, options, onEditSlide }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  

  // Track previous index to crossfade between the two layers
  const [displayedIndex, setDisplayedIndex] = useState(selectedIndex)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [isFading, setIsFading] = useState(false)
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Video only on larger screens, with no data-saver or reduced-motion preference. Phones show the poster image.
  const [canPlayVideo, setCanPlayVideo] = useState(false)
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const saveData = (navigator as any).connection?.saveData === true
    setCanPlayVideo(wide && !reduce && !saveData)
  }, [])

  useEffect(() => {
    if (selectedIndex === displayedIndex) return

    // Start crossfade: keep the old image visible underneath
    setPrevIndex(displayedIndex)
    setDisplayedIndex(selectedIndex)
    setIsFading(true)

    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    fadeTimer.current = setTimeout(() => {
      setPrevIndex(null)
      setIsFading(false)
    }, 600) // must match CSS transition duration
  }, [selectedIndex])

  return (
    <section className="hero_embla py-6 md:py-8 lg:py-12 xl:py-16 min-h-[550px] relative overflow-hidden bg-primary-medium">

      {/* Layer 1 — outgoing image (sits underneath, fades out via the incoming opacity) */}
      {prevIndex !== null && (
        <Image
          key={`bg-prev-${prevIndex}`}
          src={slides[prevIndex]?.image}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{ zIndex: 0 }}
        />
      )}

            {/* Layer 2: incoming layer (fades in on top). A video if the slide has one, otherwise the image */}
        {slides[displayedIndex]?.video && canPlayVideo ? (
        <video
          key={`bg-video-${displayedIndex}`}
          src={slides[displayedIndex].video}
          poster={slides[displayedIndex].image.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
            style={{
            zIndex: 1,
            objectPosition: slides[displayedIndex].videoPosition ?? "center 8%",
            opacity: isFading ? 0 : 1,
            transition: "opacity 0.6s ease-in-out",
          }}
        />
      ) : (
        <Image
          key={`bg-curr-${displayedIndex}`}
          src={slides[displayedIndex]?.image}
          alt=""
          aria-hidden="true"
          priority
          fetchPriority="high"
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{
            zIndex: 1,
            opacity: isFading ? 0 : 1,
            transition: "opacity 0.6s ease-in-out",
          }}
        />
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90.5deg, #000000 -3.72%, rgba(0,0,0,0) 104.47%)",
          zIndex: 2,
        }}
      />

      {/* Slide content */}
      <div className="container mx-auto px-4" style={{ position: "relative", zIndex: 3 }}>
        <div className="hero_embla__viewport" ref={emblaRef}>
          <div className="hero_embla__container">
            {slides.map((slide, index) => (
              <div className="hero_embla__slide" key={index}>
                <div className="hero_embla__slide__content mb-4 rounded-md text-white relative">
                  {index === 0 ? (
                    <>
                    <h1 className="h1 overflow-hidden">
                      <span className="text-white">{slide?.title?.line1}</span>
                      <br/>
                      <span className="text-secondary">{slide?.title?.line2}</span>
                      </h1>
                    </>
                  ) : (
                    <>
                      <div className="h1 text-white overflow-hidden">{slide?.title?.line1}</div>
                      <div className="h1 text-secondary overflow-hidden">{slide?.title?.line2}</div>
                    </>
                  )}
                  <p
                    className="custom-text1 my-4 font-light max-w-[800px] w-full"
                    dangerouslySetInnerHTML={{ __html: slide?.description }}
                  />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {slide.button1?.cta ? (
                      <CtaButton id={slide.button1.cta.id} message={slide.button1.cta.message} href={slide.button1.cta.href} variant="secondary" />
                    ) : slide.button1?.text && (
                      <Button
                        iconRight={true}
                        text={slide.button1.text}
                        variant="secondary"
                        href="/enroll"
                        newTab={false}
                      />
                    )}
                    {slide.button2?.cta ? (
                      <CtaButton id={slide.button2.cta.id} message={slide.button2.cta.message} href={slide.button2.cta.href} variant="white" />
                    ) : slide.button2?.text && (
                      <Button
                        iconRight={true}
                        text={slide.button2.text}
                        href={slide.button2.link}
                        variant="white"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="hero_embla__controls container mx-auto px-4" style={{ position: "relative", zIndex: 3 }}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`hero_embla__dot ${index === selectedIndex ? "hero_embla__dot--selected" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroCarousel