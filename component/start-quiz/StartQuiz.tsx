"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Turnstile } from "@marsidev/react-turnstile";
import { createLeadContact, normalizeSource } from "@/utils/api";
import { track } from "@/libs/track";
import { PHONE_DISPLAY } from "@/component/cta";
import {
  EMPTY_ANSWERS,
  FOCUS_OPTIONS,
  GOAL_OPTIONS,
  GRADUATE_LEVEL_OPTIONS,
  JOURNEY_OPTIONS,
  LEVELS,
  MAX_PICKS,
  Option,
  QuizAnswers,
  STORAGE_KEY,
  WHEN_OPTIONS,
  summaryLine,
} from "./quizData";

type Step = 0 | 1 | 2 | 3 | 4 | 5; // 0 intro, 1 to 4 questions, 5 contact form

function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp("(^|;\\s*)" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"));
  return m ? decodeURIComponent(m[2]) : null;
}

// ---------------------------------------------------------------------------
// The live "path" panel: the same programme cards as the home page.
// Per the quiz brief, no card lights up or shows a level before the results page.
// Card 1 carries START HERE from page 1 onwards.
// ---------------------------------------------------------------------------
function PathPanel({ answers, step }: { answers: QuizAnswers; step: Step }) {
  const chips = [
    ...answers.focus.map((id) => FOCUS_OPTIONS.find((o) => o.id === id)?.label),
    ...answers.goals.map((id) => GOAL_OPTIONS.find((o) => o.id === id)?.label),
  ].filter(Boolean) as string[];

  return (
    <div className="relative h-full overflow-hidden bg-[#000A12] px-5 py-10 sm:px-10 lg:px-12 lg:py-12">
      <div className="relative">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
          {step === 0 ? "Six levels, one road" : "Your path is forming"}
        </p>
        <h2 className="mt-2 font-outfit text-2xl sm:text-3xl font-semibold leading-tight text-white">
          {step === 0
            ? "Every transformational journey starts with taking the first step."
            : "Answer a few questions and watch it take shape."}
        </h2>

        <ol className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {LEVELS.map((lv, i) => {
            const first = lv.level === 1;
            return (
              <li
                key={lv.level}
                style={{ animationDelay: `${i * 70}ms` }}
                className="qz-in group relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-white/40 shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <video
                  src={`/videos/programs/level-${lv.level}.mp4#t=0.1`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-105 saturate-110 transition-all duration-700 group-hover:scale-110 motion-reduce:hidden"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#000A12]/90 via-[#000A12]/15 to-transparent" />
                {first && (
                  <span className="qz-shimmer absolute left-2 top-2 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-darkest">
                    Start here
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 p-3">
                  <span className="block font-outfit text-sm sm:text-base font-semibold leading-snug text-white">{lv.name}</span>
                </span>
              </li>
            );
          })}
        </ol>

        {step !== 0 && chips.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span key={c} className="qz-in rounded-full border border-secondary/60 bg-secondary/15 px-3 py-1 text-sm text-white">
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// One answer card
// ---------------------------------------------------------------------------
function Choice<T extends string>({
  option,
  selected,
  onSelect,
  index,
}: {
  option: Option<T>;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      style={{ animationDelay: `${index * 55}ms` }}
      className={`qz-in group flex w-full items-center justify-between gap-4 rounded-xl border-2 px-5 py-4 text-start transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        selected ? "border-primary bg-primary text-white shadow-lg" : "border-primary/15 bg-white text-primary-darkest hover:border-secondary"
      }`}
    >
      <span>
        <span className="block font-outfit text-lg font-semibold leading-snug">{option.label}</span>
        {option.hint && <span className={`mt-0.5 block text-sm ${selected ? "text-white/80" : "text-black/60"}`}>{option.hint}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-200 ${
          selected ? "border-secondary bg-secondary text-primary-darkest scale-110" : "border-primary/25 text-transparent"
        }`}
      >
        ✓
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// The quiz
// ---------------------------------------------------------------------------
export default function StartQuiz() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<QuizAnswers>(EMPTY_ANSWERS);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); }, []);

  const go = (s: Step) => {
    setStep(s);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Multi-pick questions (pages 2 and 3): up to MAX_PICKS; a fifth pick replaces the oldest.
  const toggleFocus = (id: QuizAnswers["focus"][number]) => {
    setAnswers((a) => {
      if (a.focus.includes(id)) return { ...a, focus: a.focus.filter((f) => f !== id) };
      if (a.focus.length >= MAX_PICKS) return { ...a, focus: [...a.focus.slice(1), id] };
      return { ...a, focus: [...a.focus, id] };
    });
  };

  const toggleGoal = (id: QuizAnswers["goals"][number]) => {
    setAnswers((a) => {
      if (a.goals.includes(id)) return { ...a, goals: a.goals.filter((g) => g !== id) };
      if (a.goals.length >= MAX_PICKS) return { ...a, goals: [...a.goals.slice(1), id] };
      return { ...a, goals: [...a.goals, id] };
    });
  };

  // Page 4 is only complete once a graduate has also said which level they finished.
  const journeyDone = answers.journey !== null && (answers.journey !== "graduate" || answers.graduateLevel !== null);

  // Odd option counts leave one card alone; let the last one span the row.
  const lastSpans = <T extends string>(list: Option<T>[], i: number) => (list.length % 2 === 1 && i === list.length - 1 ? "sm:col-span-2" : "");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please add your name, email and WhatsApp number.");
      return;
    }
    if (!consent) {
      toast.error("Please tick the box so we can send you your path.");
      return;
    }
    if (!turnstileToken) {
      toast.error("Please complete the security check.");
      return;
    }
    setSubmitting(true);
    try {
      await createLeadContact({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim() || undefined,
        email: form.email.trim(),
        phone: form.phone.trim(),
        query: summaryLine(answers),
        source: normalizeSource(typeof window !== "undefined" ? localStorage.getItem("user_source") : null, "contact"),
        turnstileToken,
        fbc: getCookie("_fbc"),
        fbp: getCookie("_fbp"),
      });
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, firstName: form.first_name.trim() }));
      } catch { /* storage can be blocked; the results page then asks to start again */ }
      track("Lead", { email: form.email.trim(), phone: form.phone.trim(), firstName: form.first_name.trim(), contentName: "Find Your Path Quiz" });
      router.push("/for-you");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || `Something went wrong. Please try again, or WhatsApp us on ${PHONE_DISPLAY}.`);
      setTurnstileToken("");
      turnstileRef.current?.reset();
      setSubmitting(false);
    }
  };

  const progress = step === 0 ? 0 : Math.min(step, 4);
  const inputCls =
    "w-full rounded-xl border-2 border-primary/15 bg-white px-4 py-3 font-outfit text-base text-primary-darkest outline-none transition-colors focus:border-primary";

  return (
    <section ref={topRef} className="scroll-mt-24 w-full bg-white">
      <style>{`
        @keyframes qzIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes qzPulse { 0% { box-shadow: 0 0 0 0 rgba(249,184,30,.7); } 70% { box-shadow: 0 0 0 14px rgba(249,184,30,0); } 100% { box-shadow: 0 0 0 0 rgba(249,184,30,0); } }
        @keyframes qzDrift { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(-2%,2%,0); } }
        @keyframes qzPop { 0% { transform: scale(.92); } 60% { transform: scale(1.04); } 100% { transform: scale(1); } }
        @keyframes qzShimmer { 0%,100% { filter: brightness(1); } 50% { filter: brightness(1.18); } }
        .qz-pop { animation: qzPop .6s ease-out; }
        .qz-shimmer { animation: qzShimmer 2.4s ease-in-out infinite; }
        .qz-in { opacity: 0; animation: qzIn .5s ease-out forwards; }
        .qz-pulse { animation: qzPulse 2s ease-out infinite; }
        .qz-brain { animation: qzDrift 28s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .qz-in { opacity: 1; animation: none; } .qz-pulse, .qz-brain, .qz-pop, .qz-shimmer { animation: none; } }
      `}</style>

      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        {/* LEFT: the questions */}
        <div className="flex flex-col justify-center px-5 py-8 sm:px-10 lg:px-16 lg:py-12">
          {step > 0 && (
            <div className="mb-6" aria-label={`Step ${Math.min(step, 4)} of 4`}>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <span key={n} className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary/10">
                    <span className={`block h-full rounded-full bg-secondary transition-all duration-500 ${progress >= n ? "w-full" : "w-0"}`} />
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm font-medium uppercase tracking-wide text-black/60">Step {Math.min(step, 4)} of 4</p>
            </div>
          )}

          {/* key forces the entrance animation to replay on every step */}
          <div key={step}>
            {step === 0 && (
              <div>
                <p className="qz-in text-sm font-semibold uppercase tracking-[0.18em] text-secondary-dark">Find your path</p>
                <h1 className="qz-in mt-3 font-outfit text-4xl sm:text-5xl font-semibold leading-[1.08] text-primary-darkest" style={{ animationDelay: "80ms" }}>
                  Ready to change how you think, feel and lead?
                </h1>
                <p className="qz-in mt-5 max-w-xl text-lg font-light text-black/70" style={{ animationDelay: "160ms" }}>
                  Four quick questions. We&apos;ll show you where to start with NLP and hypnosis, and where it can take you. Takes under two minutes.
                </p>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="qz-in mt-8 rounded-full bg-secondary px-8 py-4 font-outfit text-lg font-semibold text-primary-darkest shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary-darkest hover:shadow-xl"
                  style={{ animationDelay: "240ms" }}
                >
                  Find my path
                </button>
              </div>
            )}

            {step === 1 && (
              <div>
                <h1 className="qz-in font-outfit text-3xl sm:text-4xl font-semibold leading-tight text-primary-darkest">
                  What would you like to change?
                </h1>
                <p className="qz-in mt-2 text-black/60" style={{ animationDelay: "60ms" }}>Pick up to {MAX_PICKS}.</p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {FOCUS_OPTIONS.map((o, i) => (
                    <div key={o.id} className={lastSpans(FOCUS_OPTIONS, i)}>
                      <Choice option={o} index={i} selected={answers.focus.includes(o.id)} onSelect={() => toggleFocus(o.id)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="qz-in font-outfit text-3xl sm:text-4xl font-semibold leading-tight text-primary-darkest">
                  What would you like to achieve?
                </h1>
                <p className="qz-in mt-2 text-black/60" style={{ animationDelay: "60ms" }}>Pick up to {MAX_PICKS}.</p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {GOAL_OPTIONS.map((o, i) => (
                    <div key={o.id} className={lastSpans(GOAL_OPTIONS, i)}>
                      <Choice option={o} index={i} selected={answers.goals.includes(o.id)} onSelect={() => toggleGoal(o.id)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h1 className="qz-in font-outfit text-3xl sm:text-4xl font-semibold leading-tight text-primary-darkest">
                  Where are you on your transformational journey?
                </h1>
                <div className="mt-6 grid grid-cols-1 gap-3">
                  {JOURNEY_OPTIONS.map((o, i) => (
                    <Choice
                      key={o.id}
                      option={o}
                      index={i}
                      selected={answers.journey === o.id}
                      onSelect={() => setAnswers((a) => ({ ...a, journey: o.id, graduateLevel: o.id === "graduate" ? a.graduateLevel : null }))}
                    />
                  ))}
                </div>

                {/* Only for graduates */}
                {answers.journey === "graduate" && (
                  <div className="mt-8">
                    <h2 className="qz-in font-outfit text-2xl font-semibold leading-tight text-primary-darkest">
                      Which level have you completed with us?
                    </h2>
                    <div className="mt-4 grid grid-cols-1 gap-3">
                      {GRADUATE_LEVEL_OPTIONS.map((lv, i) => (
                        <Choice
                          key={lv.level}
                          option={{ id: String(lv.level), label: `Level ${lv.level}: ${lv.name}` }}
                          index={i}
                          selected={answers.graduateLevel === lv.level}
                          onSelect={() => setAnswers((a) => ({ ...a, graduateLevel: lv.level }))}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div>
                <h1 className="qz-in font-outfit text-3xl sm:text-4xl font-semibold leading-tight text-primary-darkest">When would you like to begin?</h1>
                <div className="mt-6 grid grid-cols-1 gap-3">
                  {WHEN_OPTIONS.map((o, i) => (
                    <Choice key={o.id} option={o} index={i} selected={answers.when === o.id} onSelect={() => setAnswers((a) => ({ ...a, when: o.id }))} />
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <form onSubmit={onSubmit} noValidate>
                <h1 className="qz-in font-outfit text-3xl sm:text-4xl font-semibold leading-tight text-primary-darkest">
                  Your path is ready.
                </h1>
                <p className="qz-in mt-2 text-black/70" style={{ animationDelay: "60ms" }}>
                  Tell us where to send it. A relationship manager from AL&amp;CO may also reach out on WhatsApp.
                </p>
                <div className="qz-in mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2" style={{ animationDelay: "120ms" }}>
                  <input className={inputCls} placeholder="First name" aria-label="First name" autoComplete="given-name" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
                  <input className={inputCls} placeholder="Last name" aria-label="Last name" autoComplete="family-name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
                  <input className={`${inputCls} sm:col-span-2`} type="email" placeholder="Email" aria-label="Email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <input className={`${inputCls} sm:col-span-2`} type="tel" placeholder="WhatsApp number, with country code" aria-label="WhatsApp number" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <label className="qz-in mt-4 flex items-start gap-3 text-sm text-black/70" style={{ animationDelay: "180ms" }}>
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-[#1B507C]" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                  <span>
                    I agree to be contacted by AL&amp;CO about my path, by email, phone or WhatsApp. I have read the{" "}
                    <a href="/privacy-policy" className="underline" target="_blank" rel="noreferrer">Privacy Policy</a>.
                  </span>
                </label>
                <div className="mt-4">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(t) => setTurnstileToken(t)}
                    onExpire={() => setTurnstileToken("")}
                    onError={() => setTurnstileToken("")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting || !turnstileToken}
                  className="mt-5 rounded-full bg-secondary px-8 py-4 font-outfit text-lg font-semibold text-primary-darkest shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary-darkest disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {submitting ? "Building your path..." : "See my path"}
                </button>
              </form>
            )}
          </div>

          {/* navigation */}
          {step > 0 && (
            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={() => go((step - 1) as Step)}
                className="rounded-full border-2 border-primary/20 px-5 py-2.5 font-outfit text-base font-medium text-primary transition-colors hover:border-primary"
              >
                Back
              </button>
              {step >= 1 && step <= 4 && (
                <button
                  type="button"
                  disabled={
                    (step === 1 && answers.focus.length === 0) ||
                    (step === 2 && answers.goals.length === 0) ||
                    (step === 3 && !journeyDone) ||
                    (step === 4 && answers.when === null)
                  }
                  onClick={() => go((step + 1) as Step)}
                  className="rounded-full bg-primary px-7 py-2.5 font-outfit text-base font-semibold text-white transition-all hover:bg-primary-darkest disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {step === 4 ? "See my path" : "Next"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: the path that builds as you answer */}
        <div className="min-h-[420px] lg:min-h-0">
          <PathPanel answers={answers} step={step} />
        </div>
      </div>
    </section>
  );
}