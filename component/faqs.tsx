"use client";

import React, { useState } from "react";
import { Faq } from "@/app/faqs/data";
import { SlArrowDown } from "react-icons/sl";

type Props = {
  data?: Faq[];
  /** Section heading (H2). Defaults to "Your Questions Answered". */
  title?: React.ReactNode;
  /** Optional anchor id, e.g. "the-honest-questions". */
  id?: string;
};

export default function OurFaqs({ data, title, id }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleChange = (panel: number) => {
    setExpanded(expanded === panel ? null : panel);
  };

  return (
    data && data?.length > 0 && (
        <section id={id} className="w-full bg-white py-4 px-4 sm:px-20  my-10 rounded-md">

          <div className="flex justify-center items-center">
            <h2 className="h4 text-primary font-bold font-outfit">
              {title ?? <>Your Questions <span className="text-primary-dark">Answered</span></>}
            </h2>
          </div>

          <div className="accordion-group max-w-5xl mx-auto">
            {data.map((faq, i) => {
              const isOpen = expanded === i;

              return (
                <div key={i} className={`accordion p-6 border-b border-gray-200 ${isOpen ? "bg-neutral-50 border-b border-primary ": ""}`}>

                  <button
                    onClick={() => handleChange(i)}
                    className={`flex justify-between w-full text-2xl text-outfit transition-colors duration-300 relative ${isOpen ? "text-gray-800" : "text-primary"
                      }`}
                  >
                    <h3 className="text-left pr-3 w-[90%] font-outfit">
                      {faq.question}
                    </h3>

                    {/* Arrow */}
                    <span
                      className={`transition-transform duration-300 absolute top-2 right-4 ${isOpen ? "rotate-180" : ""
                        }`}
                    >
                      <SlArrowDown size={14}/>
                    </span>
                  </button>

                  {/* Animated Content */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${isOpen
                        ? "grid-rows-[1fr] opacity-100 pt-3"
                        : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`transform transition-all duration-500 delay-100 ${isOpen
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-2 opacity-0"
                          }`}
                      >
                        {/* <div
                          className="pr-4 text-black text-sm md:text-md faq_editor"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        /> */}
                        <div
                          className="pr-4 text-gray-600 text-sm md:text-base font-outfit">
                            {faq.answer}
                      </div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </section>
      )
  );
}