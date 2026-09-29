import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from "../emblaCarouselDot"
import Level1 from "@/assets/our-program/level1_image_1.webp";
import useEmblaCarousel from 'embla-carousel-react'
import { OurProgramSlideType } from '@/type/ourProgram'
import Button from '../button'
import "./ourProgramCarousel.css"
import Image from 'next/image';


type PropType = {
  slides: OurProgramSlideType[]
  options?: EmblaOptionsType
}

const OurProgramCarousel = ({ slides, options }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    // loop: true
  })

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <section className="our_program_embla">
      <div className="our_program_embla__viewport" ref={emblaRef}>
        <div className="our_program_embla__container">
          {slides.map((slide, index) => (
            <div
              className={`our_program_embla__slide ${index === selectedIndex ? "is-selected" : ""
                }`}
              key={index}
            >
              <div className="our_program_embla__slide__box bg-gradient-secondary-primary grid grid-cols-12  gap-2 rounded-lg">
                <div className="flex flex-col justify-start col-span-12 ">
                  <h3 className='text-md md:text-lg lg:text-xl text-white'>Level {index + 1}</h3>
                  <h3 className="h5 text-white text-start">
                    {slide.title}
                  </h3>
                  <p className="custom-text1 font-light text-white text-start ">
                    {slide.description}
                  </p>
                </div>
                {/* <div className="flex xl:flex-col xl:justify-center col-span-12 xl:col-span-4 2xl:col-span-3">
                  <Button
                    iconRight={true}
                    variant="primary"
                    size="small"
                    text="Find out more"
                    href={slide.href}
                    className='' />
                </div> */}
                <div className="flex flex-col justify-center col-span-12 mt-2">
                  {slide.image && (<div className="relative w-full aspect-video rounded-xl overflow-hidden group">
                    {/* button jo compent m h usa image k overlay py show kro jb user card hover kra */}
                    <Image
                      src={slide.image?.src} // use StaticImageData directly
                      alt={slide.image?.alt}
                      fill
                      className="object-cover rounded-xl bg-primary w-full"
                    // style={{ objectFit: "cover" }} // optional, for safety
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition rounded-xl">
                      <Button
                        iconRight={true}
                    variant="white"
                    size="small"
                    text="Find out more"
                    href={slide.href}
                    newTab={false}
                    className='px-4 py-2'
                      />
                    </div>
                  </div>
                  )}
                  {/* <img
                    src={slide.image?.src ?? Level1.src}
                    alt={slide.image?.alt ?? "Arslan Larik"}
                    className="w-full h-auto object-cover rounded-xl"
                  /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="our_program_embla__controls mt-8 flex justify-center">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`our_program_embla__dot ${index === selectedIndex ? "our_program_embla__dot--selected" : ""}`}
          />
        ))}
      </div>
    </section>
  )
}

export default OurProgramCarousel