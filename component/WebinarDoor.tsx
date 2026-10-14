"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    label: "Not sure yet?",
    text: "Not sure yet? That is exactly what our weekly webinar is for. Once a week we open a free, live introductory session for anyone exploring this world, a relaxed hour to understand what NLP really is, to feel the way we teach, and to ask anything you like before you decide a single thing.",
  },
  {
    label: "A real person, in a real room",
    text: "It is hosted by our relationship managers, the same people who walk beside our students from the first hello. So you meet a real person, in a real room, not a sales page. There is no pressure and no obligation. Come to listen, come with your questions, come simply to see whether this is for you.",
  },
  {
    label: "For those still deciding",
    text: "These sessions are for those still deciding. The moment you enrol, a far richer world opens to you: the full programme, the global community, the live trainings and years of support. So think of the webinar as the doorway, a first, easy step towards the version of yourself you have been curious about.",
  },
  {
    label: "New to AL&CO?",
    text: "The webinar is for people new to AL&CO. Sign up and we will email you the joining link. Already an AL&CO graduate? You do not need it: you can revisit your trainings free, and your relationship manager will be glad to arrange it.",
  },
];

const MAX_SWING = 78; // degrees each leaf opens at full scroll

export default function WebinarDoor({ cta }: { cta: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0 = closed, 1 = fully open
  const doorRef = useRef<HTMLDivElement>(null);

  // The door opens slowly as you scroll: 0 when it enters the screen, 1 when it is well inside
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = doorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.85 - r.top) / (vh * 0.55);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const swing = progress * MAX_SWING;
  const fullyOpen = progress > 0.95;

  const leaf = (side: "l" | "r") => (
    <div
      className={`absolute top-0 h-full w-1/2 transition-transform duration-200 ease-out ${
        side === "l" ? "left-0 origin-left" : "right-0 origin-right"
      }`}
      style={{ transform: `rotateY(${side === "l" ? -swing : swing}deg)` }}
    >
      <span className="absolute inset-0 bg-gradient-to-b from-[#12395c] to-[#071a33] shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]" />
      <span className="absolute inset-x-[14%] top-[10%] h-[34%] rounded-t-full border border-white/10" />
      <span className="absolute inset-x-[14%] bottom-[10%] h-[40%] rounded-md border border-white/10" />
      <span
        className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_8px_rgba(249,184,30,0.9)] ${
          side === "l" ? "right-3" : "left-3"
        }`}
      />
    </div>
  );

  return (
    <section className="w-full overflow-hidden bg-light-neutral bg-cover bg-top-left px-4 py-10 md:py-16">
      <style>{`
        @keyframes wd-glow { 0%,100% { opacity: .75 } 50% { opacity: 1 } }
        @media (prefers-reduced-motion: reduce) { .wd-anim { animation: none !important } }
      `}</style>

      <div className="container mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
        {/* ---- text ---- */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-secondary-dark">Free · Live · Once a week</p>
          <h2 className="h3 mt-2 text-primary">Start with a Free Webinar</h2>
          <div className="mt-4 h-[3px] w-14 rounded bg-secondary" />

          <ul className="mt-8 space-y-2">
            {ITEMS.map((it, i) => {
              const on = i === active;
              return (
                <li key={it.label}>
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full rounded-2xl px-5 py-4 text-left transition-all duration-500 ${
                      on ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/80"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
                          on ? "scale-110 bg-secondary text-primary-darkest" : "bg-primary/10 text-primary"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className={`font-semibold transition-colors ${on ? "text-primary" : "text-primary/70"}`}>{it.label}</span>
                    </span>
                    <span
                      className={`grid transition-all duration-500 ease-in-out ${
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="mt-3 block pl-11 text-[15px] leading-7 text-primary-light">{it.text}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---- the doorway ---- */}
        <div className="mx-auto w-full max-w-[340px]">
          <div
            ref={doorRef}
            className="relative aspect-[3/4.3] overflow-hidden rounded-b-lg rounded-t-[999px] border-[10px] border-[#071a33] bg-[#071a33] shadow-[0_30px_60px_-20px_rgba(7,26,51,0.7)] [perspective:1100px]"
          >
            {/* the light behind the door grows as it opens */}
            <div
              className="wd-anim absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 78%, #FFF1BF 0%, #F9B81E 32%, #E08A12 55%, #1B507C 100%)",
                opacity: 0.25 + progress * 0.75,
                animation: fullyOpen ? "wd-glow 4s ease-in-out infinite" : undefined,
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                opacity: progress * 0.4,
                background: "repeating-conic-gradient(from 0deg at 50% 85%, rgba(255,255,255,0.45) 0deg 5deg, transparent 5deg 17deg)",
                WebkitMask: "linear-gradient(to top, #000 10%, transparent 85%)",
                mask: "linear-gradient(to top, #000 10%, transparent 85%)",
              }}
            />

            {/* what you find inside (not clickable until the door is mostly open) */}
            <div
              className="absolute inset-x-0 bottom-[12%] z-0 flex flex-col items-center gap-3 px-4 text-center"
              style={{ pointerEvents: progress > 0.6 ? "auto" : "none" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-primary-darkest/80">A first, easy step</p>
              {cta}
            </div>

            <div aria-hidden className="absolute inset-x-0 bottom-0 h-[8%] bg-gradient-to-t from-black/40 to-transparent" />

            {/* the two door leaves, turned by scrolling */}
            <div className="pointer-events-none absolute inset-0 z-10 [transform-style:preserve-3d]">
              {leaf("l")}
              {leaf("r")}
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-primary-light">
            {fullyOpen ? "Step through." : "Keep scrolling to open the door."}
          </p>
        </div>
      </div>
    </section>
  );
}