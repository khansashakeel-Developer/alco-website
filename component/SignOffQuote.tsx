"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  name: string;
  credentials: string[];
  caption: string; // the full original caption, kept for screen readers and search engines
  photo: string;
  highlights?: string[]; // phrases that get the gold marker stroke
};

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default function SignOffQuote({ text, name, credentials, caption, photo, highlights = [] }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // the first sentence becomes the large lead
  const cut = text.indexOf(". ");
  const lead = cut > -1 ? text.slice(0, cut + 1) : "";
  const body = cut > -1 ? text.slice(cut + 2) : text;

  // split the body so the highlighted phrases can be wrapped
  const parts = highlights.length
    ? body.split(new RegExp(`(${highlights.map(esc).join("|")})`, "g"))
    : [body];
  let mark = 0;

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: seen ? 1 : 0,
    transform: seen ? "none" : "translateY(18px)",
    transition: "opacity .9s ease, transform .9s cubic-bezier(.2,.8,.2,1)",
    transitionDelay: `${delay}ms`,
  });

  return (
    <figure ref={ref} className="relative mx-auto mt-20 grid max-w-5xl items-center gap-10 text-left md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_340px] lg:gap-16">
      <style>{`
        @media (prefers-reduced-motion: reduce) { .sq-mark { transition: none !important } }
      `}</style>

      {/* the words */}
      <div className="relative order-2 md:order-1">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-1 -top-14 select-none font-serif text-[120px] leading-none text-secondary md:-left-8 md:-top-16 md:text-[150px]"
          style={reveal(0)}
        >
          “
        </span>

        <blockquote>
          {lead && (
            <p
              className="relative font-serif text-[26px] leading-[1.25] text-primary-darkest md:text-[38px] md:leading-[1.2]"
              style={reveal(150)}
            >
              {lead}
            </p>
          )}

          <p className="mt-6 font-outfit text-base leading-[1.85] text-gray-700 md:text-lg md:leading-[1.9]" style={reveal(450)}>
            {parts.map((part, i) => {
              if (i % 2 === 1) {
                const n = mark++;
                return (
                  <mark
                    key={i}
                    className="sq-mark bg-no-repeat px-0.5 font-semibold text-primary-darkest [box-decoration-break:clone]"
                    style={{
                      backgroundColor: "transparent",
                      backgroundImage: "linear-gradient(transparent 58%, rgba(249,184,30,0.6) 58%)",
                      backgroundSize: seen ? "100% 100%" : "0% 100%",
                      transition: "background-size 1s cubic-bezier(.6,.05,.2,1)",
                      transitionDelay: `${1000 + n * 700}ms`,
                    }}
                  >
                    {part}
                  </mark>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </p>
        </blockquote>

        <figcaption className="mt-8 flex items-start gap-4" style={reveal(700)}>
          <span aria-hidden className="mt-1 h-12 w-1 shrink-0 rounded-full bg-secondary" />
          <span>
            <span className="block font-serif text-xl italic text-primary-darkest md:text-2xl">{name}</span>
            <span aria-hidden className="mt-1 block max-w-md font-outfit text-xs leading-relaxed tracking-wide text-gray-500 md:text-[13px]">
              {credentials.join(" · ")}
            </span>
            <span className="sr-only">{caption}</span>
          </span>
        </figcaption>
      </div>

      {/* the photo */}
      <div className="relative order-1 mx-auto w-full max-w-[320px] md:order-2 md:max-w-none" style={reveal(250)}>
        <span aria-hidden className="absolute -bottom-4 -right-4 h-full w-full bg-primary/10 md:-bottom-5 md:-right-5" />
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt={name} className="absolute inset-0 h-full w-full object-cover object-top" />
        </div>
      </div>
    </figure>
  );
}