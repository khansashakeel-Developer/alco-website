"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CtaButton from "@/component/CtaButton";
import { PUBLIC_API } from "@/utils/api";
import Book1 from "@/assets/services/resources/book-1.webp";
import Book2 from "@/assets/services/resources/book-2.webp";
import Book3 from "@/assets/services/resources/book-3.webp";
import Book4 from "@/assets/services/resources/book-4.webp";
import Book5 from "@/assets/services/resources/book-5.webp";
import Book6 from "@/assets/services/resources/book-6.webp";
import Book7 from "@/assets/services/resources/book-7.webp";
import {
  GRADUATE_WA_MESSAGE,
  GRADUATE_REVISIT_LABEL,
  waLine,
} from "@/component/cta";
import {
  BROCHURE_HREF,
  EXERCISES,
  FOCUS_KEYWORDS,
  FOCUS_OPTIONS,
  GOAL_OPTIONS,
  JOURNEY_OPTIONS,
  LEVELS,
  QuizAnswers,
  RESULT_LINE,
  STORAGE_KEY,
  bookKeyFor,
  nextLevelFor,
  routeFor,
} from "./quizData";

type Saved = { answers: QuizAnswers; firstName: string };

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  read_time?: number;
  thumbnail?: string;
};
type NextWebinar = { _id: string; title: string; date: string };

// The seven books on /services/resources. The quiz brief decides which one: first pick on page 2, then page 3.
// Check that book-7 is "Financial Freedom Through NLP"; swap the cover import if not.
const BOOKS = {
  future: { title: "Create Your Own Future with NLP", cover: Book1 },
  relationships: { title: "Relationship Mastery Through NLP", cover: Book2 },
  emotions: { title: "Emotional Mastery with NLP", cover: Book3 },
  enough: { title: "I Am Not Good Enough", cover: Book4 },
  questions: { title: "101 Powerful Coaching Questions", cover: Book5 },
  client: { title: "How to Get Your First Coaching Client", cover: Book6 },
  financial: { title: "Financial Freedom Through NLP", cover: Book7 },
};

function pickBook(a: QuizAnswers) {
  return BOOKS[bookKeyFor(a)];
}

const formatPkt = (d: string) =>
  new Date(d).toLocaleString("en-GB", {
    timeZone: "Asia/Karachi",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }) + " PKT";

// Level 1, the next live webinar and a few articles that match what the visitor asked for. Nothing else.
function NextSteps({
  answers,
  graduate,
  waMessage,
}: {
  answers: QuizAnswers;
  graduate: boolean;
  waMessage: string;
}) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [webinar, setWebinar] = useState<NextWebinar | null>(null);
  const book = pickBook(answers);
  // Level 1 for everyone new; the level after theirs for a graduate.
  const lv = LEVELS.find((l) => l.level === nextLevelFor(answers)) ?? LEVELS[0];

  useEffect(() => {
    let alive = true;
    const search = answers.focus.map((f) => FOCUS_KEYWORDS[f]).join("|");
    const load = async (params: Record<string, string>) => {
      try {
        const r = await PUBLIC_API.get("/api/v1/blogs/public", {
          params: { page: "1", limit: "3", status: "published", ...params },
        });
        return (r?.data?.data ?? []) as Blog[];
      } catch {
        return [];
      }
    };
    (async () => {
      let list = search ? await load({ search }) : [];
      if (list.length < 3) {
        const latest = await load({});
        list = [
          ...list,
          ...latest.filter((b) => !list.some((x) => x._id === b._id)),
        ].slice(0, 3);
      }
      if (alive) setBlogs(list);
    })();
    if (!graduate) {
      PUBLIC_API.get<NextWebinar>("/api/webinars/public/free-weekly/next")
        .then(
          (r) =>
            alive && setWebinar(r?.data?._id && r?.data?.date ? r.data : null),
        )
        .catch(() => alive && setWebinar(null));
    }
    return () => {
      alive = false;
    };
  }, [answers.focus, graduate]);

  return (
    <div className="mt-10 space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* LEVEL 1 */}
        <article className="fy-in group relative overflow-hidden rounded-3xl border border-white/20 bg-[#0B2236] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl lg:col-span-3">
          <div className="grid h-full grid-cols-1 sm:grid-cols-5">
            <div className="relative min-h-[260px] overflow-hidden sm:col-span-2">
              <video
                key={lv.level}
                src={`/videos/programs/level-${lv.level}.mp4#t=0.1`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-105 saturate-110 transition-transform duration-700 group-hover:scale-110 motion-reduce:hidden"
              />
              {lv.level === 1 && (
                <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-darkest">
                  {graduate ? "Revisit free" : "Start here"}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-between p-6 sm:col-span-3 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                  {graduate ? "Your next step" : "Your first step"}
                </p>
                <h3 className="mt-2 font-outfit text-2xl font-semibold leading-snug text-white sm:text-3xl">
                  Level {lv.level}: {lv.name}
                </h3>
                <p className="mt-3 font-light leading-relaxed text-white/75">
                  {lv.level === 1
                    ? "Everyone starts here, including complete beginners. Ten days, 130 hours, taught live on Zoom, with quad certification and a UK ANLP CPD certificate."
                    : lv.line}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/program/${lv.slug}`}
                  className="rounded-full bg-secondary px-6 py-3 font-outfit text-base font-semibold text-primary-darkest transition-all hover:-translate-y-0.5 hover:bg-secondary-darkest"
                >
                  See Level {lv.level}
                </Link>
                <CtaButton
                  id="C1"
                  message={waMessage}
                  variant="outlineWhite"
                  label={graduate ? GRADUATE_REVISIT_LABEL : undefined}
                  className="px-6"
                />
              </div>
            </div>
          </div>
        </article>

        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* WEBINAR (never shown to graduates) */}
          {!graduate ? (
            <article
              className="fy-in relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-primary to-primary-dark p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8"
              style={{ animationDelay: "120ms" }}
            >
              <video
                className="absolute inset-0 h-full w-full object-cover brightness-100 motion-reduce:hidden"
                src="/videos/webinar-bg.mp4"
                poster="/videos/webinar-bg.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-[#04121F]/35 via-[#04121F]/85 to-[#09263D]/90"
              />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                  </span>
                  Free, live on Zoom
                </span>
                <h3 className="mt-4 font-outfit text-2xl font-semibold leading-snug text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] sm:text-3xl">
                  Join our free weekly webinar
                </h3>
                <p className="mt-3 text-lg font-normal leading-relaxed text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
                  Meet the AL&amp;CO team, ask questions, and experience NLP
                  live.
                </p>
                <p className="mt-5 font-outfit text-lg font-semibold text-secondary [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
                  {webinar ? formatPkt(webinar.date) : "Every week, live"}
                </p>
              </div>
              <div className="relative z-10 mt-6">
                <CtaButton id="C2" variant="secondary" className="px-6" />
              </div>
            </article>
          ) : (
                        <div
              className="fy-in group relative rounded-3xl bg-gradient-to-br from-secondary via-secondary/50 to-primary-light p-[2px] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ animationDelay: "120ms" }}
            >
              <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] bg-gradient-to-br from-white via-[#FFF9E8] to-[#E3ECF5] p-6 sm:p-8">
                {/* soft gold glow */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 animate-pulse rounded-full bg-secondary/30 blur-3xl"
                />
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary-darkest px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary">
                    ★ Graduate perk
                  </span>
                  <h3 className="mt-4 font-outfit text-2xl font-semibold leading-snug text-primary-darkest sm:text-3xl">
                    Welcome back
                  </h3>
                  <p className="mt-4 font-outfit text-5xl font-bold leading-none text-primary sm:text-6xl">
                    5 years
                  </p>
                  <p className="mt-2 text-lg font-medium text-primary-darkest">
                    of free revisits on Levels 1 to 3.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Level 1", "Level 2", "Level 3"].map((l) => (
                      <span
                        key={l}
                        className="rounded-full border border-primary/30 bg-white px-3 py-1 text-sm font-medium text-primary"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 font-normal text-gray-700">
                    Message us and we will arrange your seat.
                  </p>
                </div>
                <div className="relative z-10 mt-6">
                  <CtaButton
                    id="C1"
                    message={waMessage}
                    variant="secondary"
                    label={GRADUATE_REVISIT_LABEL}
                    className="px-6"
                  />
                </div>
              </article>
            </div>
          )}
          {/* BOOK */}
          <article
            className="fy-in group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#12314D] hover:shadow-2xl sm:p-6"
            style={{ animationDelay: "200ms" }}
          >
            <Image
              src={book.cover}
              alt={book.title}
              width={96}
              height={128}
              className="h-32 w-24 shrink-0 rounded-lg object-cover ring-1 ring-white/20 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                A free gift to start with
              </p>
              <p className="mt-1 text-sm font-light text-white/75">
                Based on what you&apos;d like to change, we think you&apos;ll love this:
              </p>
              <h3 className="mt-1 font-outfit text-lg font-semibold leading-snug text-white sm:text-xl">
                {book.title}
              </h3>
              <Link
                href="/services/resources"
                className="mt-3 inline-block font-outfit text-base font-semibold text-secondary transition-all group-hover:translate-x-1"
              >
                Download free →
              </Link>
            </div>
          </article>
        </div>
      </div>

      {/* ARTICLES THAT MATCH */}
      {blogs.length > 0 && (
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            Read next, picked for you
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {blogs.map((b, i) => (
              <Link
                key={b._id}
                href={`/blogs/${b.slug}`}
                style={{ animationDelay: `${i * 90}ms` }}
                className="fy-in group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#12314D] hover:shadow-2xl"
              >
                <span className="relative block aspect-[16/9] overflow-hidden bg-primary">
                  {b.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      style={{ filter: "contrast(1.08) saturate(1.1)" }}
                      src={b.thumbnail}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary-darkest font-outfit text-5xl font-bold text-secondary/60">
                      {(b.title || "A")[0]}
                    </span>
                  )}
                  {b.category && (
                    <span className="absolute left-3 top-3 rounded-full bg-primary-darkest/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary">
                      {b.category}
                    </span>
                  )}
                </span>
                <span className="flex flex-1 flex-col justify-between p-5">
                  <span className="block font-outfit text-lg font-semibold leading-snug text-white">
                    {b.title}
                  </span>
                  <span className="mt-4 flex items-center justify-between text-sm text-white/90">
                    <span>
                      {b.read_time ? `${b.read_time} min read` : "Article"}
                    </span>
                    <span className="font-semibold text-secondary transition-all group-hover:translate-x-1">
                      Read →
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// "Try this now": one guided exercise at a time. The visitor steps through it, with an optional timer.
function TryThisNow({ focus }: { focus: QuizAnswers["focus"] }) {
  const [tab, setTab] = useState(0);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [left, setLeft] = useState<number | null>(null);

  const ex = EXERCISES[focus[Math.min(tab, focus.length - 1)]];
  const total = ex.steps.length;
  const mins = parseInt(ex.minutes, 10) || 3;

  useEffect(() => {
    if (left === null || left <= 0) return;
    const t = setTimeout(
      () => setLeft((v) => (v === null ? null : v - 1)),
      1000,
    );
    return () => clearTimeout(t);
  }, [left]);

  const pick = (i: number) => {
    setTab(i);
    setStep(0);
    setDone(false);
    setLeft(null);
  };
  const mmss = (n: number) =>
    `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
  const pct = done ? 100 : Math.round((step / total) * 100);

  return (
    <div className="mt-8">
      {focus.length > 1 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {focus.map((id, i) => (
            <button
              key={id}
              type="button"
              onClick={() => pick(i)}
              className={`rounded-full border px-4 py-2 font-outfit text-sm font-medium transition-all ${
                i === tab
                  ? "border-primary bg-primary text-white shadow-md"
                  : "border-primary/25 bg-white text-primary-darkest hover:border-primary/60"
              }`}
            >
              {EXERCISES[id].title}
            </button>
          ))}
        </div>
      )}

      <div className="fy-in grid overflow-hidden rounded-3xl bg-primary-darkest shadow-xl lg:grid-cols-5">
        {/* Left: what it is, and the timer */}
<div className="relative flex flex-col justify-between overflow-hidden p-7 sm:p-9 lg:col-span-2">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img src="/images/programs/try-this.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-bottom" />
  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#09263D]/90 via-[#09263D]/40 to-[#09263D]/10" />
  <div className="relative z-10">
    <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-darkest">{ex.minutes}</span>
    <h3 className="mt-4 font-outfit text-3xl font-semibold leading-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">{ex.title}</h3>
    <p className="mt-3 font-normal text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">{total} small steps. Read one, do it, then tap Next.</p>
  </div>
  <div className="relative z-10 mt-8">
    {left === null ? (
      <button type="button" onClick={() => setLeft(mins * 60)} className="rounded-full border border-white/60 bg-black/30 px-5 py-2.5 font-outfit text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-primary-darkest">
        Start a {mins} minute timer
      </button>
    ) : (
      <div className="flex items-center gap-4">
        <span className="font-outfit text-4xl font-semibold tabular-nums text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">{mmss(left)}</span>
        <button type="button" onClick={() => setLeft(null)} className="text-sm text-white underline underline-offset-4 hover:text-white/80">
          {left === 0 ? "Time is up. Reset" : "Reset"}
        </button>
      </div>
    )}
  </div>
</div>

        {/* Right: one step at a time */}
        <div className="bg-white p-7 sm:p-9 lg:col-span-3">
          <div className="flex items-center justify-between text-sm font-semibold text-primary">
            <span>{done ? "All done" : `Step ${step + 1} of ${total}`}</span>
            <span>{pct}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E3ECF5]">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>

          {!done ? (
            <div key={`${tab}-${step}`} className="fy-in mt-8 min-h-[150px]">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-outfit text-xl font-bold text-white">
                {step + 1}
              </span>
              <p className="mt-5 font-outfit text-xl font-medium leading-relaxed text-primary-darkest sm:text-2xl">
                {ex.steps[step]}
              </p>
            </div>
          ) : (
            <div className="fy-in mt-8 min-h-[150px]">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary font-outfit text-xl font-bold text-primary-darkest">
                ✓
              </span>
              <p className="mt-5 font-outfit text-xl font-medium leading-relaxed text-primary-darkest sm:text-2xl">
                Well done. That is a small taste of what you will learn to do on
                purpose.
              </p>
              <p className="mt-2 text-gray-600">
                Imagine what ten days of live training can do.
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                done ? setDone(false) : setStep((v) => Math.max(0, v - 1))
              }
              disabled={!done && step === 0}
              className="font-outfit text-sm font-medium text-primary disabled:opacity-30"
            >
              ← Back
            </button>
            {done ? (
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setDone(false);
                }}
                className="rounded-full bg-primary px-6 py-3 font-outfit text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-600"
              >
                Do it again
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  step === total - 1 ? setDone(true) : setStep((v) => v + 1)
                }
                className="rounded-full bg-secondary px-7 py-3 font-outfit text-base font-semibold text-primary-darkest transition-all hover:-translate-y-0.5 hover:bg-secondary-600"
              >
                {step === total - 1 ? "Finish" : "Next step →"}
              </button>
            )}
          </div>
          {ex.note && <p className="mt-5 text-sm text-gray-500">{ex.note}</p>}
        </div>
      </div>
    </div>
  );
}

export default function ForYou() {
  const [saved, setSaved] = useState<Saved | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      // Ignore answers saved by the older quiz (no "goals" list): they cannot be read by this page.
      const parsed = raw ? (JSON.parse(raw) as Saved) : null;
      if (parsed && Array.isArray(parsed.answers?.goals)) setSaved(parsed);
    } catch {
      /* blocked storage: fall through to the "take the quiz" state */
    }
    setReady(true);
  }, []);

  const style = (
    <style>{`
      @keyframes fyIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fyGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
      @keyframes fyPulse { 0% { box-shadow: 0 0 0 0 rgba(27,80,124,.5); } 70% { box-shadow: 0 0 0 16px rgba(27,80,124,0); } 100% { box-shadow: 0 0 0 0 rgba(27,80,124,0); } }
      .fy-in { opacity: 0; animation: fyIn .6s ease-out forwards; }
      .fy-line { transform-origin: top; animation: fyGrow 1.2s ease-out both; }
      .fy-pulse { animation: fyPulse 2s ease-out infinite; }
      @media (prefers-reduced-motion: reduce) { .fy-in { opacity: 1; animation: none; } .fy-line, .fy-pulse { animation: none; } }
    `}</style>
  );

  if (!ready)
    return <section className="min-h-[70vh] bg-white" aria-busy="true" />;

  if (!saved) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-white px-5 py-16 text-center">
        <div className="max-w-xl">
          <h1 className="font-outfit text-4xl font-semibold text-primary-darkest">
            Let us find your path first.
          </h1>
          <p className="mt-4 text-lg font-light text-gray-700">
            It takes about a minute, and four questions.
          </p>
          <Link
            href="/start"
            className="mt-8 inline-block rounded-full bg-secondary px-8 py-4 font-outfit text-lg font-semibold text-primary-darkest"
          >
            Find my path
          </Link>
        </div>
      </section>
    );
  }

  const { answers, firstName } = saved;
  const graduate = answers.journey === "graduate";
  const route = routeFor(answers);
  const next = LEVELS.find((l) => l.level === nextLevelFor(answers)) ?? LEVELS[0];
  const headline = graduate
    ? `Your next step is Level ${next.level}: ${next.name}`
    : `Your journey begins with Level ${next.level}: ${next.name}`;
  const subline = graduate ? next.line : RESULT_LINE;

  const chips = [
    ...answers.focus.map((id) => FOCUS_OPTIONS.find((o) => o.id === id)?.label),
    ...answers.goals.map((id) => GOAL_OPTIONS.find((o) => o.id === id)?.label),
    JOURNEY_OPTIONS.find((o) => o.id === answers.journey)?.label,
  ].filter(Boolean) as string[];

  const waMessage = graduate
    ? GRADUATE_WA_MESSAGE
    : waLine(`my path. I took the quiz: ${chips.join(", ")}`);

  // Main button comes from the answer to "When would you like to begin?"
  const mainAction = (() => {
    const pill =
      "inline-flex items-center rounded-full bg-secondary px-6 py-3 font-outfit text-base font-semibold text-primary-darkest transition-all hover:-translate-y-0.5 hover:bg-secondary-darkest";
    switch (answers.when) {
      case "now":
        return (
          <Link href={`/program/${next.slug}`} className={pill}>
            See batch dates
          </Link>
        );
      case "months":
        return (
          <Link href={BROCHURE_HREF} className={pill}>
            Get the brochure
          </Link>
        );
      case "exploring":
        // Graduates are never sent to the free webinar.
        return graduate ? (
          <CtaButton id="C1" message={waMessage} variant="secondary" label={GRADUATE_REVISIT_LABEL} className="px-6" />
        ) : (
          <CtaButton id="C2" variant="secondary" className="px-6" />
        );
      case "talk":
      default:
        return (
          <CtaButton
            id="C1"
            message={waMessage}
            variant="secondary"
            label={graduate ? GRADUATE_REVISIT_LABEL : undefined}
            className="px-6"
          />
        );
    }
  })();

  return (
    <div className="bg-white">
      {style}

      {/* HERO */}
      <section className="relative overflow-hidden bg-primary-darkest px-5 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-start justify-between gap-4">
            <p className="fy-in text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              Your path is ready
            </p>
            <Link
              href="/start"
              className="rounded-full border border-white/40 px-5 py-2 font-outfit text-sm font-medium text-white transition-colors hover:bg-white hover:text-primary-darkest"
            >
              Start again
            </Link>
          </div>
          <h1
            className="fy-in mt-4 font-outfit text-4xl font-semibold leading-[1.1] text-white sm:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            Hi {firstName},
            <span className="block text-secondary">{headline}</span>
          </h1>
          <p
            className="fy-in mt-4 max-w-2xl text-lg font-light text-white/80"
            style={{ animationDelay: "120ms" }}
          >
            {subline}
          </p>
          <div
            className="fy-in mt-6 flex flex-wrap gap-2"
            style={{ animationDelay: "160ms" }}
          >
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-secondary/60 bg-white/10 px-3 py-1 text-sm text-white"
              >
                {c}
              </span>
            ))}
          </div>
          <div
            className="fy-in mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "240ms" }}
          >
            {mainAction}
          </div>
        </div>
      </section>

      {/* TRY THIS NOW */}
      {answers.focus.length > 0 && (
        <section className="bg-[#EEF4FA] px-5 py-14 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Try this now
            </p>
            <h2 className="mt-2 font-outfit text-3xl font-semibold text-primary-darkest sm:text-4xl">
              A taste of the work, in a few minutes
            </h2>
            <TryThisNow focus={answers.focus} />
            <p className="mt-6 max-w-3xl text-sm text-gray-500">
              These are everyday self-help exercises, not treatment. If
              something feels uncomfortable, stop. Coaching and training at
              AL&amp;CO do not replace medical or psychological care.
            </p>
          </div>
        </section>
      )}

      {/* MORE FOR YOU */}
      <section className="bg-[#000A12] antialiased px-5 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-outfit text-3xl font-semibold text-white sm:text-4xl">
            Your next steps, {firstName}
          </h2>
          <NextSteps
            answers={answers}
            graduate={graduate}
            waMessage={waMessage}
          />
        </div>
      </section>

      {/* THE ROAD */}
      <section className="bg-[#EEF4FA] px-5 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-outfit text-3xl font-semibold text-primary-darkest sm:text-4xl">
            Your road, level by level
          </h2>
          <p className="mt-2 max-w-2xl text-lg font-light text-gray-600">
            Everyone starts at Level 1. The highlighted levels are the ones that
            fit what you told us. Levels 3 and above are arranged directly with
            Bismillah Pervez and Arslan Larik.
          </p>

          <ol className="relative mt-10 space-y-4">
            <span
              aria-hidden="true"
              className="fy-line absolute left-[1.35rem] top-4 bottom-4 hidden w-0.5 bg-primary/25 sm:block"
            />
            {LEVELS.map((lv, i) => {
              const inRoute = route.includes(lv.level);
              const isStart = lv.level === 1;
              return (
                <li
                  key={lv.level}
                  style={{ animationDelay: `${i * 90}ms` }}
                  className="fy-in relative flex gap-4 sm:gap-6"
                >
                  <span
                    className={`z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-outfit text-lg font-bold ${
                      inRoute
                        ? "bg-primary text-white"
                        : "bg-[#E3ECF5] text-gray-400"
                    } ${isStart ? "fy-pulse" : ""}`}
                  >
                    {lv.level}
                  </span>
                  <div
                    className={`flex-1 rounded-2xl border-2 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                      inRoute
                        ? "border-primary/40 bg-[#E3ECF5] shadow-md"
                        : "border-primary/15 bg-white opacity-60"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-outfit text-xl font-semibold text-primary-darkest">
                        {lv.name}
                      </h3>
                      {isStart && (
                        <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-primary-darkest">
                          {graduate
                            ? "Free revisits, five years"
                            : "Start here"}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-base font-light text-gray-600">
                      {lv.line}
                    </p>
                    <Link
                      href={`/program/${lv.slug}`}
                      className="mt-2 inline-block font-outfit text-base font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      See Level {lv.level}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* CLOSE */}
      <section className="relative overflow-hidden bg-primary-darkest px-5 py-14 text-center sm:px-10 lg:py-20">
        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-outfit text-3xl font-semibold text-white sm:text-5xl">
            Ready to take the first step?
          </h2>
          <p className="mt-4 text-lg font-light text-white/80">
            Tell a relationship manager what you told us. They will help you
            choose a date, with no pressure.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaButton
              id="C1"
              message={waMessage}
              variant="secondary"
              label={graduate ? GRADUATE_REVISIT_LABEL : undefined}
              className="px-6"
            />
            <CtaButton id="C3" variant="outlineWhite" className="px-6" />
          </div>
        </div>
      </section>
    </div>
  );
}