import React from "react";

// "13 Reasons" as an even card grid instead of an accordion. Server component; hover effects are CSS only.
type Reason = { question: string; answer: React.ReactNode };

export default function ReasonsGrid({ items, title, id }: { items?: Reason[]; title?: string; id?: string }) {
  if (!items || items.length === 0) return null;
  const n = items.length;
  // A lone last card (13 reasons: 3 across leaves 1, 2 across leaves 1) spans the full row as a dark highlight card.
  const loneAtMd = n % 2 === 1;
  const loneAtXl = n % 3 === 1;

  return (
    <section id={id} className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-light-neutral w-full">
      <div className="container mx-auto px-4">
        {title && <h2 className="h3 text-primary text-start mb-6 lg:mb-8">{title}</h2>}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {items.map((item, i) => {
            const m = item.question.match(/^(\d+)\.\s*(.*)$/);
            const num = String(m ? m[1] : i + 1).padStart(2, "0");
            const heading = m ? m[2] : item.question;
            const last = i === n - 1;
            const dark = last && (loneAtMd || loneAtXl);
            const span = last ? `${loneAtMd ? "md:col-span-2" : ""} ${loneAtXl ? "xl:col-span-3" : ""}` : "";
            return (
              <article
                key={item.question}
                className={`group relative overflow-hidden rounded-xl p-6 lg:p-7 text-start shadow-md transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1.5 hover:shadow-2xl ${span} ${
                  dark ? "bg-primary-darkest text-white" : "bg-white border border-slate-200"
                }`}
              >
                <span className="absolute left-0 top-0 h-full w-1.5 bg-secondary origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none" />
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute right-4 top-1 font-outfit text-7xl font-bold leading-none transition-colors duration-300 ${
                    dark ? "text-white/5 group-hover:text-secondary/20" : "text-primary/5 group-hover:text-secondary/25"
                  }`}
                >
                  {num}
                </span>
                <div
                  className={`relative mb-4 flex h-11 w-11 items-center justify-center rounded-lg font-outfit text-base font-bold transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none ${
                    dark ? "bg-secondary text-primary-darkest" : "bg-primary text-white group-hover:bg-secondary group-hover:text-primary-darkest"
                  }`}
                >
                  {num}
                </div>
                <h3 className={`relative font-outfit text-lg xl:text-xl font-semibold leading-snug mb-3 ${dark ? "text-secondary" : "text-primary"}`}>
                  {heading}
                </h3>
                <div className={`relative custom-text1 font-light [&_a]:underline ${dark ? "text-white/90" : "text-black/75"}`}>{item.answer}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}