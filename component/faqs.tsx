"use client";

import React, { useState } from "react";
import { Faq } from "@/app/faqs/data";

type Props = {
  data?: Faq[];
  /** Section heading (H2). Defaults to "Your Questions Answered". */
  title?: React.ReactNode;
  /** Optional anchor id, e.g. "the-honest-questions". */
  id?: string;
};

export default function OurFaqs({ data, title, id }: Props) {
  const [expanded, setExpanded] = useState<number | null>(0);

  const handleChange = (panel: number) => {
    setExpanded(expanded === panel ? null : panel);
  };

  return (
    data && data?.length > 0 && (
      <section
  id={id}
  className="w-full bg-gradient-light-neutral-lg bg-cover bg-top-left py-10 md:py-16 px-4 sm:px-20"
>

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary-dark">FAQ</p>
            <h2 className="h4 mt-2 text-primary font-bold font-outfit">
              {title ?? <>Your Questions <span className="text-primary-dark">Answered</span></>}
            </h2>
            <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-16 rounded-full bg-secondary" />
          </div>

          <div className="space-y-3">
            {data.map((faq, i) => {
              const isOpen = expanded === i;

              return (
                <div
                  key={i}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-secondary bg-white shadow-xl"
                      : "border-primary/10 bg-white shadow-sm hover:border-primary/30 hover:shadow-md"
                  }`}
                >
                  {/* gold bar on the left when open */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-1.5 bg-secondary transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                  />

                  <button
                    type="button"
                    onClick={() => handleChange(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 p-5 md:p-6 text-left"
                  >
                    {/* number */}
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                        isOpen ? "bg-secondary text-primary-darkest" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3
                      className={`flex-1 font-outfit text-lg md:text-xl font-semibold transition-colors duration-300 ${
                        isOpen ? "text-primary-darkest" : "text-primary"
                      }`}
                    >
                      {faq.question}
                    </h3>

                    {/* plus / minus */}
                    <span
                      aria-hidden="true"
                      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen ? "border-primary bg-primary text-white rotate-180" : "border-primary/30 text-primary group-hover:bg-primary/10"
                      }`}
                    >
                      <span className="absolute h-0.5 w-3.5 rounded bg-current" />
                      <span className={`absolute h-3.5 w-0.5 rounded bg-current transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
                    </span>
                  </button>

                  {/* Animated content */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-6 pb-6 pl-[4.5rem] md:pl-[5.25rem]">
                        <div className="border-t border-primary/10 pt-4 pr-2 font-outfit text-sm md:text-base leading-relaxed text-gray-600">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    )
  );
}