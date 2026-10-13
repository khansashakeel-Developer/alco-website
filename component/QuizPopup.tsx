"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBrain } from "react-icons/fa";

const HIDE_ON = ["/start", "/for-you", "/enroll", "/thank-you", "/maintenance"];

export default function QuizPopup() {
  const pathname = usePathname() || "/";
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (HIDE_ON.some((p) => pathname.startsWith(p))) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(true), 20000);
    return () => clearTimeout(t);
  }, [pathname]);

  const close = () => {
    setShow(false);
  };

  if (!show) return null;

      return (
    <aside
      aria-label="Find your level quiz"
      className="quiz-pop fixed bottom-24 left-4 z-[2147483000] w-[200px] sm:w-[280px]"
    >
      <style>{`
        @keyframes quizEnter {
          0%   { opacity: 0; transform: translateY(40px) scale(.85); }
          60%  { opacity: 1; transform: translateY(-8px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes quizSpin  { to { transform: rotate(360deg); } }
        @keyframes quizBarIn { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes quizLit {
          0%, 100% { background: rgba(255,255,255,.22); box-shadow: none; }
          10%, 22% { background: #F9B81E; box-shadow: 0 0 14px 2px rgba(249,184,30,.75); }
          34%      { background: rgba(255,255,255,.22); box-shadow: none; }
        }
        @keyframes quizShine { 0% { left: -60%; } 55%, 100% { left: 130%; } }
        @keyframes quizNudge { 0%,100% { transform: translateX(0); } 50% { transform: translateX(4px); } }

        .quiz-pop    { animation: quizEnter .7s cubic-bezier(.22,1,.36,1) both; }
        .quiz-spin   { animation: quizSpin 4s linear infinite; }
        .quiz-bar    { transform-origin: bottom; animation: quizBarIn .5s cubic-bezier(.34,1.56,.64,1) both, quizLit 3.6s ease-in-out infinite; }
        .quiz-shine  { animation: quizShine 3s ease-in-out infinite; }
        .quiz-nudge  { animation: quizNudge 1.2s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .quiz-pop, .quiz-bob, .quiz-spin, .quiz-bar, .quiz-shine, .quiz-nudge { animation: none; }
        }
      `}</style>

      <div className="relative">
        {/* Glow behind the card */}
        <div
          className="pointer-events-none absolute -inset-3 rounded-[28px] bg-secondary/25 blur-2xl"
          aria-hidden="true"
        />

        {/* Animated gradient border */}
        <div className="relative overflow-hidden rounded-2xl p-[2px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)]">
          <span
            className="quiz-spin absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0 60%, #F9B81E 82%, #ffffff 92%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Card */}
          <div className="relative rounded-[14px] bg-gradient-to-br from-primary-darkest via-primary-dark to-primary px-4 pb-4 pt-4 text-left sm:px-5 sm:pb-5 sm:pt-5">
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-base font-bold leading-none text-white/80 transition hover:bg-white/20 hover:text-white"
            >
              ×
            </button>

            {/* Eyebrow */}
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              Free 2 min quiz
            </p>

            {/* Level staircase */}
            <div className="mt-3 flex h-[60px] items-end gap-1.5" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
                  <span
                    className="quiz-bar w-full rounded-t-md"
                    style={{
                      height: `${14 + i * 7}px`,
                      background: "rgba(255,255,255,.22)",
                      animationDelay: `${i * 0.08}s, ${i * 0.5}s`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1 flex gap-1.5 text-[10px] font-semibold text-white/50" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <span key={n} className="flex-1 text-center">
                  L{n}
                </span>
              ))}
            </div>

            <h2 className="mt-3 pr-4 text-lg font-extrabold leading-tight text-white sm:text-xl">
              Where should <span className="text-secondary">you</span> start?
            </h2>
            <p className="mt-1 hidden text-sm leading-snug text-white/70 sm:block">
              Answer a few quick questions and get your personal starting point.
            </p>

            {/* CTA */}
            <div className="relative mt-4">
              <Link
                href="/start"
                onClick={close}
                className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-secondary px-4 py-2.5 text-sm font-bold text-primary-darkest shadow-lg transition hover:brightness-110"
              >
                <span
                  className="quiz-shine pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-white/60"
                  aria-hidden="true"
                />
                <span className="relative">Find my level</span>
                <span className="quiz-nudge relative" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
