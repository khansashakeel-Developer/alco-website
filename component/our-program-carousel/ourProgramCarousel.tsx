import React, { useEffect, useRef, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "../emblaCarouselDot";
import { OurProgramSlideType } from "@/type/ourProgram";
import "./ourProgramCarousel.css";
import Image from "next/image";
import Link from "next/link";

type PropType = {
  slides: OurProgramSlideType[];
  options?: EmblaOptionsType;
};

// One portrait card. The picture fills the card, the level and title sit at the bottom, and on hover (or keyboard focus)
// the video plays and the description and link slide in. The description is always in the page text (it is only
// faded in, never removed), so search engines and screen readers read it. Phones and tablets have no hover,
// so there the description is always shown and the video does not play.
// "Art" cards (slide.art) have no video: a plain picture with the programme name animated in the centre.
function ProgramCard({
  slide,
  index,
}: {
  slide: OurProgramSlideType;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [artSeen, setArtSeen] = useState(false); // the centre title plays every time the card scrolls into view
  const art = slide.art;
  const light = art?.tone === "light";
  const pic = slide.poster ?? slide.image;

  useEffect(() => {
    const el = artRef.current;
    if (!art || !el) return;
    const io = new IntersectionObserver(([e]) => setArtSeen(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [art]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [active]);

  const start = () => {
    if (!slide.video) return;
    setActive(true);
  };
  const stop = () => setActive(false);

  const words = slide.title.split(" ");

  const body = (
    <>
      <div ref={artRef} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 group-focus-within:scale-105">
        {art ? (
          // Artwork card: just a picture, the name is written in the centre below
          <Image
            src={art.src}
            alt=""
            fill
            sizes="(min-width:1280px) 26vw, (min-width:1024px) 33vw, (min-width:768px) 45vw, 80vw"
            className="object-cover"
          />
        ) : slide.video ? (
          // Cards with a video show only its first frame until hovered.
          <video
            ref={videoRef}
            src={slide.video}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            className="h-full w-full object-cover"
          />
        ) : (
          // Cards without a video keep their picture
          pic &&
          pic.src && (
            <Image
              src={pic.src}
              alt={pic.alt}
              fill
              sizes="(min-width:1280px) 26vw, (min-width:1024px) 33vw, (min-width:768px) 45vw, 80vw"
              className="object-cover"
            />
          )
        )}
      </div>

      {/* Darkening so the white text always reads, darker still on hover */}
      <div
        aria-hidden="true"
        className={
          art
            ? "absolute inset-0 bg-gradient-to-t from-[#09263D]/0 via-transparent to-transparent transition-all duration-500 group-hover:from-[#09263D]/95 group-hover:via-[#09263D]/75 group-focus-within:from-[#09263D]/95 group-focus-within:via-[#09263D]/75 [@media(hover:none)]:from-[#09263D]/70 [@media(hover:none)]:via-[#09263D]/25"
            : "absolute inset-0 bg-gradient-to-t from-[#09263D]/90 via-[#09263D]/15 to-transparent transition-all duration-500 group-hover:from-[#09263D]/95 group-hover:via-[#09263D]/75 group-focus-within:from-[#09263D]/95 group-focus-within:via-[#09263D]/75 [@media(hover:none)]:via-[#09263D]/60"
        }
      />

      {/* Artwork cards: the programme name, written in the centre with a short animation */}
      {art && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 pb-16 text-center">
          <style>{`
            @keyframes pa-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
            @media (prefers-reduced-motion: reduce) { .pa-float { animation: none !important } }
          `}</style>
          <div className="pa-float" style={{ animation: "pa-float 6s ease-in-out infinite" }}>
            <h3
              aria-label={`Level ${index + 1}: ${slide.title}`}
              className={`font-outfit transition-colors duration-500 ${
                light
                  ? "text-primary-darkest group-hover:text-white [@media(hover:none)]:text-white"
                  : "text-white"
              }`}
            >
              <span
                aria-hidden="true"
                className={`block text-xs font-semibold uppercase tracking-[0.3em] transition-all duration-700 ${
                  light ? "text-primary group-hover:text-secondary [@media(hover:none)]:text-secondary" : "text-secondary"
                } ${artSeen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
              >
                Level {index + 1}
              </span>
              <span aria-hidden="true" className="mt-3 block text-3xl font-bold uppercase leading-tight tracking-wide xl:text-4xl">
                {words.map((w, i) => (
                  <span
                    key={i}
                    className={`mr-[0.28em] inline-block transition-all duration-700 ease-out ${
                      artSeen ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[4px]"
                    }`}
                    style={{ transitionDelay: artSeen ? `${250 + i * 160}ms` : "0ms" }}
                  >
                    {w}
                  </span>
                ))}
              </span>
              <span
                aria-hidden="true"
                className={`mx-auto mt-5 block h-[3px] origin-center rounded-full bg-secondary transition-all duration-700 ${
                  artSeen ? "w-16 opacity-100" : "w-0 opacity-0"
                }`}
                style={{ transitionDelay: artSeen ? `${250 + words.length * 160}ms` : "0ms" }}
              />
            </h3>
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-6 pt-10 text-center">
        {!art && (
          <>
            <h3 className="font-outfit text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
              Level {index + 1}
            </h3>
            <h3 className="mt-1 font-outfit text-2xl xl:text-[28px] font-bold uppercase leading-tight tracking-wide text-white">
              {slide.title}
            </h3>
          </>
        )}

        <div
          className={[
            "overflow-hidden transition-all duration-500 ease-out",
            "max-h-0 opacity-0 translate-y-2",
            "group-hover:max-h-[22rem] group-hover:opacity-100 group-hover:translate-y-0",
            "group-focus-within:max-h-[22rem] group-focus-within:opacity-100 group-focus-within:translate-y-0",
            "[@media(hover:none)]:max-h-none [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0",
          ].join(" ")}
        >
          <p className="mt-3 font-outfit text-[13px] sm:text-sm font-normal leading-relaxed text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
            {slide.description}
          </p>
          {slide.href && (
            <span className="mt-3 inline-block font-outfit text-sm font-semibold text-secondary underline-offset-4 group-hover:underline">
              Learn more about Level {index + 1}: {slide.title} →
            </span>
          )}
        </div>
      </div>
    </>
  );

  const shell =
    "group relative block aspect-[2/3] min-h-[28rem] w-full overflow-hidden rounded-2xl bg-primary-darkest shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary";

  return slide.href ? (
    <Link
      href={slide.href}
      className={shell}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      {body}
    </Link>
  ) : (
    <div className={shell} onMouseEnter={start} onMouseLeave={stop}>
      {body}
    </div>
  );
}

const OurProgramCarousel = ({ slides }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const sectionRef = useRef<HTMLElement>(null);
  const stoppedRef = useRef(false); // set once the visitor hovers, touches or focuses a card: no more automatic moves

  // Autoplay only runs while the section is on screen. Every time it scrolls into view it starts again from Level 1,
  // then moves on after 3 seconds and every 8 seconds. The first hover, touch or focus stops it for good.
  useEffect(() => {
    const section = sectionRef.current;
    if (!emblaApi || !section) return;
    let id: ReturnType<typeof setTimeout> | undefined;
    const clear = () => {
      if (id) clearTimeout(id);
      id = undefined;
    };
    const tick = (wait: number) => {
      clear();
      id = setTimeout(() => {
        if (stoppedRef.current) return;
        if (emblaApi.canScrollNext()) emblaApi.scrollNext();
        else emblaApi.scrollTo(0);
        tick(8000);
      }, wait);
    };
    if (typeof IntersectionObserver === "undefined") {
      tick(3000);
      return clear;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stoppedRef.current = false;
          emblaApi.scrollTo(0, true); // jump straight to Level 1
          tick(3000);
        } else {
          clear();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(section);
    return () => {
      io.disconnect();
      clear();
    };
  }, [emblaApi]);

  const stopForGood = () => {
    stoppedRef.current = true;
  };

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="our_program_embla" ref={sectionRef}>
      <div
        className="our_program_embla__viewport"
        ref={emblaRef}
        onMouseEnter={stopForGood}
        onPointerDown={stopForGood}
        onTouchStart={stopForGood}
        onFocusCapture={stopForGood}
      >
        <div className="our_program_embla__container">
          {slides.map((slide, index) => (
            <div className="our_program_embla__slide" key={index}>
              <ProgramCard slide={slide} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="our_program_embla__controls mt-8 flex justify-center">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => {
              stopForGood();
              onDotButtonClick(index);
            }}
            className={`our_program_embla__dot ${index === selectedIndex ? "our_program_embla__dot--selected" : ""}`}
          />
        ))}
      </div>
    </section>
  );
};

export default OurProgramCarousel;