"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Item = { n: string; title: string; text: string };

// Three rows that open one at a time. All text stays in the page (hidden rows are collapsed with CSS, not removed),
// and nothing changes size on hover.
export default function SignOffPoints({ items = [] }: { items?: Item[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto mt-10 max-w-4xl text-start">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.n} className={`mb-3 overflow-hidden rounded-2xl border-2 transition-colors duration-300 ${on ? "border-secondary bg-primary-darkest text-white" : "border-primary/15 bg-white text-primary hover:border-secondary"}`}>
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`so-pt-${i}`}
                onClick={() => setOpen(on ? -1 : i)}
                className="flex w-full items-center gap-4 px-5 py-4 text-start outline-none focus-visible:ring-2 focus-visible:ring-secondary md:px-7 md:py-5"
              >
                <span className={`font-outfit text-3xl font-extrabold leading-none md:text-4xl ${on ? "text-secondary" : "text-secondary-dark"}`}>{it.n}</span>
                <span className="flex-1 font-outfit text-lg font-semibold leading-tight md:text-xl">{it.title}</span>
                <ChevronDown aria-hidden="true" size={22} className={`shrink-0 transition-transform duration-500 ${on ? "rotate-180 text-secondary" : ""}`} />
              </button>
            </h3>
            <div id={`so-pt-${i}`} className={`grid transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-base leading-relaxed text-white/90 md:px-7 md:pb-6 md:pl-[5.5rem]">{it.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}