"use client";
import React, { useEffect, useRef, useState } from "react";
import { LevelCertificationType } from "@/type/levelCertification";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  data: LevelCertificationType;
};

const STEP_MS = 6500; // how long each credential shows while it plays by itself

const sealFit = (alt?: string) =>
  /abnlp|american board|coaching division/i.test(alt ?? "")
    ? "object-contain"
    : alt?.includes("AL&CO")
      ? "object-cover scale-[1.3]"
      : "object-cover scale-[1.12]";

// Layout: a selector and a stage. The seals are listed on the left; the chosen credential shows its sample certificate
// and its details together on the right, so every credential is laid out the same way. It plays by itself until the
// visitor takes control. Click the certificate to view it full screen.
// Works for every level: 5 credentials (Levels 1 to 3) or a single one (Levels 4 to 6, no selector).
export default function LevelCertification({ data }: Props) {
  const points = data?.points ?? [];
  const credentials = points.filter((p) => p?.title);
  const total = credentials.length;
  const many = total > 1;

  const [sel, setSel] = useState(0);
  const [anim, setAnim] = useState<"next" | "prev">("next");
  const [auto, setAuto] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Esc closes the viewer and the page does not scroll behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const cur = credentials[sel];
  if (!cur) return null;

  const go = (i: number, manual = true) => {
    const next = (i + total) % total;
    if (next === sel) return;
    setAnim(i > sel || (sel === total - 1 && next === 0) ? "next" : "prev");
    setSel(next);
    if (manual) setAuto(false);
  };
  const advance = () => {
    setAnim("next");
    setSel((s) => (s + 1) % total);
  };
  const playing = auto && inView && !hovered && !open;
  const cert = cur.imageCerficate;

  return (
    <section className="py-6 md:py-8 lg:py-8 xl:py-8 sm:px-4 bg-dark-primary bg-cover bg-top-left w-full">
      <div
        ref={root}
        className="container mx-auto px-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <style>{`
          @keyframes cs-next { from { opacity: 0; transform: translateX(32px) } to { opacity: 1; transform: none } }
          @keyframes cs-prev { from { opacity: 0; transform: translateX(-32px) } to { opacity: 1; transform: none } }
          @keyframes cs-fill { from { width: 0% } to { width: 100% } }
          .cs-next { animation: cs-next .55s cubic-bezier(.2,.8,.2,1) both }
          .cs-prev { animation: cs-prev .55s cubic-bezier(.2,.8,.2,1) both }
          @media (prefers-reduced-motion: reduce) {
            .cs-next, .cs-prev, .cs-fill { animation: none !important; opacity: 1 !important; transform: none !important }
          }
        `}</style>

        <h2 className="h3 text-start">
          <span className="text-secondary">{data?.title?.line1}</span>
          <br />
          <span className="text-white">{data?.title?.line2}</span>
        </h2>

        <div className={`mt-5 grid gap-6 lg:mt-6 lg:gap-6 ${many ? "lg:grid-cols-[340px_1fr]" : ""}`}>
          {/* ---- selector: the seals ---- */}
          {many && (
            <ul className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 lg:mx-0 lg:block lg:space-y-1.5 lg:overflow-visible lg:px-0 lg:pb-0">
              {credentials.map((p, i) => {
                const on = i === sel;
                return (
                  <li key={i} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={p.title}
                      aria-current={on}
                      className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl p-2.5 text-left transition-all duration-300 lg:p-2.5 ${
                        on ? "bg-[#FAF8EC] shadow-lg ring-1 ring-secondary" : "hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`relative block size-14 shrink-0 overflow-hidden rounded-full ring-2 transition-all duration-300 lg:size-12 ${
                          on ? "ring-secondary" : "opacity-70 ring-white/30 group-hover:opacity-100"
                        }`}
                      >
                        {p.imageBrand?.src && (
                          <Image
                            src={p.imageBrand.src}
                            alt=""
                            fill
                            sizes="64px"
                            className={`rounded-full ${sealFit(p.imageBrand.alt)}`}
                          />
                        )}
                      </span>
                      <span className="hidden min-w-0 flex-1 lg:block">
                        <span className={`block text-[11px] font-bold tracking-widest ${on ? "text-secondary-dark" : "text-secondary"}`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`line-clamp-2 text-sm font-semibold leading-snug ${on ? "text-primary-darkest" : "text-white/70 group-hover:text-white"}`}>
                          {p.title}
                        </span>
                      </span>

                      {/* progress while it plays by itself */}
                      {on && (
                        <span className="absolute inset-x-0 bottom-0 h-[3px] bg-primary/10">
                          <span
                            key={`${sel}-${auto}`}
                            className={`cs-fill absolute inset-y-0 left-0 bg-secondary ${auto ? "" : "w-full"}`}
                            style={
                              auto
                                ? { animation: `cs-fill ${STEP_MS}ms linear forwards`, animationPlayState: playing ? "running" : "paused" }
                                : undefined
                            }
                            onAnimationEnd={() => auto && advance()}
                          />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* ---- stage: certificate and details together ---- */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FAF8EC] to-white flex flex-col justify-center p-5 pb-20 md:min-h-[440px] md:px-6 md:pt-12 md:pb-16 shadow-2xl ring-1 ring-secondary/40 ">
            <div
              key={sel}
              className={`${anim === "next" ? "cs-next" : "cs-prev"} grid items-center gap-6 md:gap-8 ${
                cert?.src ? "md:grid-cols-[1.1fr_1fr]" : ""
              }`}
            >
              {/* certificate */}
              {cert?.src && (
                <figure className="group mx-auto w-full max-w-[400px]">
                  <button
                    type="button"
                    onClick={() => {
                      setAuto(false);
                      setOpen(true);
                    }}
                    aria-label={`View full size: ${cert.alt || "Certificate"}`}
                    className="relative block w-full rounded-xl bg-white p-2.5 shadow-[0_24px_60px_-14px_rgba(7,26,51,0.45)] ring-1 ring-primary/15 transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:ring-2 group-hover:ring-secondary focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    <Image
                      src={cert.src}
                      alt={cert.alt || "Certificate"}
                      sizes="(min-width: 1024px) 520px, (min-width: 768px) 45vw, 92vw"
                      quality={90}
                      className="h-auto w-full rounded-md"
                    />
                    <span className="pointer-events-none absolute inset-2.5 flex items-end justify-center rounded-md bg-gradient-to-t from-primary-darkest/70 via-transparent to-transparent pb-3 opacity-0 transition duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-primary-darkest">
                        <ZoomIn size={16} aria-hidden="true" /> View full size
                      </span>
                    </span>
                  </button>
                </figure>
              )}

              {/* details */}
              <div className="text-center md:text-start">
                <div className="flex flex-col items-center gap-3 md:items-start">
                  {cur.imageBrand?.src && (
                    <span className="relative block size-[72px]shrink-0 overflow-hidden rounded-full bg-white shadow-lg ring-4 ring-secondary">
                      <Image
                        src={cur.imageBrand.src}
                        alt={cur.imageBrand.alt || "Brand"}
                        fill
                        sizes="96px"
                        className={`rounded-full ${sealFit(cur.imageBrand.alt)}`}
                      />
                    </span>
                  )}
                  {many && (
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary-dark">
                      {String(sel + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </p>
                  )}
                </div>
                <h3 className="mt-3 font-outfit text-lg font-semibold leading-snug text-primary-darkest md:text-xl">
                  {cur.title}
                </h3>
                <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-14 rounded-full bg-secondary md:mx-0" />
                <p className="custom-text1 mt-4 font-light text-gray-700 md:text-lg">{cur.description}</p>
              </div>
            </div>

            {/* arrows */}
            {many && (
              <div className="absolute bottom-5 right-5 flex items-center gap-3 md:bottom-5 md:right-6">
                <button
                  type="button"
                  aria-label="Previous certification"
                  onClick={() => go(sel - 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 text-primary transition hover:scale-110 hover:bg-secondary hover:text-primary-darkest"
                >
                  <ChevronLeft size={22} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next certification"
                  onClick={() => go(sel + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 text-primary transition hover:scale-110 hover:bg-secondary hover:text-primary-darkest"
                >
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* every credential stays in the page text for search engines and screen readers */}
        <ul className="sr-only">
          {credentials.map((p, i) => (
            <li key={i}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Full-screen viewer */}
      {open && cert?.src && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={cert.alt || "Certificate"}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <X size={24} aria-hidden="true" />
          </button>
          <Image
            src={cert.src}
            alt={cert.alt || "Certificate"}
            sizes="92vw"
            quality={100}
            className="h-auto max-h-[88vh] w-auto max-w-[92vw] rounded-lg bg-white p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}