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
  JOURNEY_OPTIONS,
  LEVELS,
  Option,
  QuizAnswers,
  STORAGE_KEY,
  STYLE_OPTIONS,
  routeFor,
  summaryLine,
} from "./quizData";

type Step = 0 | 1 | 2 | 3 | 4 | 5; // 0 intro, 1 to 4 questions, 5 contact form

const MAX_FOCUS = 2;

function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp("(^|;\\s*)" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"));
  return m ? decodeURIComponent(m[2]) : null;
}

// ---------------------------------------------------------------------------
// The live "path" panel: the same programme cards as the home page (public/images/programs/level-N.jpg).
// Cards on the person's route light up and pop as they answer; the rest fade back.
// ---------------------------------------------------------------------------
function PathPanel({ answers, step }: { answers: QuizAnswers; step: Step }) {
  const route = routeFor(answers);
  const hasGoal = answers.goal !== null;
  const graduate = answers.journey === "graduate";
  const routeText = route.join("  →  ");

  return (
    <div className="relative h-full overflow-hidden bg-[#000A12] px-5 py-10 sm:px-10 lg:px-12 lg:py-12">
      

      <div className="relative">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
          {step === 0 ? "Six levels, one road" : "Your path is forming"}
        </p>
        <h2 className="mt-2 font-outfit text-2xl sm:text-3xl font-semibold leading-tight text-white">
          {step === 0
            ? "Everyone begins at the same door."
            : hasGoal
              ? "Here is the road we would walk with you."
              : "Answer a few questions and watch it appear."}
        </h2>

        <ol className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {LEVELS.map((lv, i) => {
            const inRoute = route.includes(lv.level);
            const first = lv.level === 1;
            const lit = step === 0 ? true : first || (hasGoal && inRoute);
            return (
              <li
                key={lv.level}
                style={{ animationDelay: `${i * 70}ms` }}
                className={`qz-in group relative aspect-[3/4] overflow-hidden rounded-2xl border-2 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${
                  lit ? "border-white/40 shadow-lg" : "border-white/10"
                } ${lit && hasGoal && !first ? "qz-pop" : ""}`}
              >
                      <video
                  key={lit ? "on" : "off"}
                  src={`/videos/programs/level-${lv.level}.mp4#t=0.1`}
                  autoPlay={lit}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 motion-reduce:hidden ${
                    lit ? "brightness-110 contrast-105 saturate-110" : "grayscale opacity-40"
                  }`}
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#000A12]/90 via-[#000A12]/15 to-transparent" />
                {first && step !== 0 && <span aria-hidden="true" className="qz-pulse pointer-events-none absolute inset-0 rounded-2xl" />}
                {first ? (
                  <span className="qz-shimmer absolute left-2 top-2 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-darkest">
                    {graduate ? "Revisit free" : "Start here"}
                  </span>
                ) : (
                  lit && hasGoal && (
                    <span className="qz-in absolute left-2 top-2 rounded-full border border-white/25 bg-primary-darkest/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-secondary">
                      On your route
                    </span>
                  )
                )}
                <span className="absolute inset-x-0 bottom-0 p-3">
                  <span className="block font-outfit text-sm sm:text-base font-semibold leading-snug text-white">{lv.name}</span>
                </span>
              </li>
            );
          })}
        </ol>

        {step !== 0 && hasGoal && (
          <p className="qz-in mt-5 font-outfit text-base text-white/80">
            Your route: <span className="font-semibold text-secondary">Level {routeText}</span>
          </p>
        )}

        {step !== 0 && answers.focus.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {answers.focus.map((id) => (
              <span key={id} className="qz-in rounded-full border border-secondary/60 bg-secondary/15 px-3 py-1 text-sm text-white">
                {FOCUS_OPTIONS.find((o) => o.id === id)?.label}
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

  // Single-choice questions move on by themselves after a short beat.
  const pickSingle = (patch: Partial<QuizAnswers>, next: Step) => {
    setAnswers((a) => ({ ...a, ...patch }));
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => go(next), 320);
  };

  const toggleFocus = (id: QuizAnswers["focus"][number]) => {
    setAnswers((a) => {
      if (a.focus.includes(id)) return { ...a, focus: a.focus.filter((f) => f !== id) };
      if (a.focus.length >= MAX_FOCUS) return { ...a, focus: [...a.focus.slice(1), id] };
      return { ...a, focus: [...a.focus, id] };
    });
  };

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
                  Four quick questions. We will show you where to begin with NLP and hypnosis, and the road that follows. It takes about a minute.
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
                  What do you want to change?
                </h1>
                <p className="qz-in mt-2 text-black/60" style={{ animationDelay: "60ms" }}>Pick up to {MAX_FOCUS}.</p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {FOCUS_OPTIONS.map((o, i) => (
                    <Choice key={o.id} option={o} index={i} selected={answers.focus.includes(o.id)} onSelect={() => toggleFocus(o.id)} />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="qz-in font-outfit text-3xl sm:text-4xl font-semibold leading-tight text-primary-darkest">Why are you here?</h1>
                <div className="mt-6 grid grid-cols-1 gap-3">
                  {GOAL_OPTIONS.map((o, i) => (
                    <Choice key={o.id} option={o} index={i} selected={answers.goal === o.id} onSelect={() => pickSingle({ goal: o.id }, 3)} />
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h1 className="qz-in font-outfit text-3xl sm:text-4xl font-semibold leading-tight text-primary-darkest">Where are you on your journey?</h1>
                <div className="mt-6 grid grid-cols-1 gap-3">
                  {JOURNEY_OPTIONS.map((o, i) => (
                    <Choice key={o.id} option={o} index={i} selected={answers.journey === o.id} onSelect={() => pickSingle({ journey: o.id }, 4)} />
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h1 className="qz-in font-outfit text-3xl sm:text-4xl font-semibold leading-tight text-primary-darkest">How do you like to learn?</h1>
                <div className="mt-6 grid grid-cols-1 gap-3">
                  {STYLE_OPTIONS.map((o, i) => (
                    <Choice key={o.id} option={o} index={i} selected={answers.style === o.id} onSelect={() => pickSingle({ style: o.id }, 5)} />
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
                  {submitting ? "Building your path..." : "Show me my path"}
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
              {step === 1 && (
                <button
                  type="button"
                  disabled={answers.focus.length === 0}
                  onClick={() => go(2)}
                  className="rounded-full bg-primary px-7 py-2.5 font-outfit text-base font-semibold text-white transition-all hover:bg-primary-darkest disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next step
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