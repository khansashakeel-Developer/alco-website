import React from "react";
import OpenEnrolButton from "@/component/OpenEnrolButton";
import SessionTimeConverter from "@/component/SessionTimeConverter";
import EnrolSteps from "@/component/EnrolSteps";
import Tilt3D from "@/component/Tilt3D";
import TrainingTimesDial from "@/component/TrainingTimesDial";

const STEPS = [
  { title: "Book a conversation.", text: "A short call to understand what you want and which level fits." },
  { title: "Choose your pathway.", text: "We guide you to the right rung to step on, and show you where it can lead." },
  { title: "Confirm your place.", text: "Cohorts are capped, so your place is held once you confirm." },
  {
    title: "Receive your joining pack and begin.",
    text: "Your manual, your audio library and your schedule, and your transformation starts.",
  },
];

const TIMES: [string, string][] = [
  ["United States, East Coast (New York)", "10:00am to 4:00pm, a full working morning into the afternoon"],
  ["United States, West Coast (Los Angeles)", "7:00am to 1:00pm, an early start into midday"],
  ["United Kingdom (London)", "3:00pm to 9:00pm, afternoon into the evening"],
  ["East Africa (Nairobi)", "6:00pm to midnight, the evening"],
  ["Middle East, the Gulf (Dubai)", "7:00pm to 1:00am, the evening"],
  ["Subcontinent (India, Bangladesh)", "8:30pm to 2:30am, the evening"],
  ["China (Beijing)", "11:00pm to 5:00am, late night"],
  ["Australia, East (Sydney)", "1:00am to 7:00am the next day, the early hours"],
];

const SECTION = "py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 w-full";

// Shared by /programs, /enroll and /contact (0 Shared/02 step 13). Server component.
export default function HowToEnrol({ showEnrolButton = false }: { showEnrolButton?: boolean }) {
  return (
    <>
            <section id="how-to-enrol" className={SECTION}>
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-secondary-dark">Four simple steps</p>
          <h2 className="h3 mt-2 text-primary text-center">How to Enrol</h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-16 rounded-full bg-secondary" />

          <EnrolSteps />

                    {/* Enrol early: head-start card */}
          <div className="mt-14 md:mt-20">
            <Tilt3D className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-[#1B507C]/15">
              <div className="grid md:grid-cols-5">
                {/* Left: navy panel */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#071a33] to-[#12395c] p-6 md:col-span-2 md:p-10">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full border-[32px] border-secondary/15"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full border-[14px] border-white/10"
                  />
                  <p className="relative text-xs font-bold uppercase tracking-[0.25em] text-secondary">
                    A head start
                  </p>
                  <h3 className="relative mt-3 text-2xl font-bold leading-tight text-white md:text-3xl">
                    Enrol early,{" "}
                    <span className="text-secondary">and here is why</span>
                  </h3>
                  <p className="relative mt-4 text-[15px] leading-7 text-white/80">
                    The sooner you confirm, the sooner your place is secured and
                    your learning materials reach you, often well before the
                    workshop begins.
                  </p>
                </div>

                {/* Right: early timeline + last-minute note */}
                <div className="p-6 md:col-span-3 md:p-10">
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-darkest">
                    <span className="h-2 w-2 rounded-full bg-secondary" />
                    Enrol early
                  </span>

                  <ol className="relative mt-5 space-y-5 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-secondary before:to-primary/20">
                    {[
                      "Your place is secured.",
                      "Your learning materials reach you, often well before the workshop begins.",
                      "You settle into your manual and audio, and arrive already in motion rather than starting cold on day one.",
                    ].map((t, i) => (
                      <li key={i} className="relative flex items-start gap-4">
                        <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white ring-4 ring-white">
                          {i + 1}
                        </span>
                        <p className="pt-1 text-[15px] leading-7 text-primary">
                          {t}
                        </p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-7 rounded-2xl border border-dashed border-gray-300 bg-slate-50 p-4 md:p-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Last minute
                    </span>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Places are limited, and a last-minute decision takes a
                      genuine toll on your own experience. Your materials may
                      reach you late, and we cannot onboard and support you the
                      way we would want to.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border-l-4 border-secondary bg-secondary/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-outfit text-lg font-semibold text-primary-darkest">
                      Give yourself the fuller journey, and come in early.
                    </p>
                    {showEnrolButton && (
                      <OpenEnrolButton text="Enrol now" variant="secondary" className="px-6" />
                    )}
                  </div>
                </div>
              </div>
            </Tilt3D>
          </div>
        </div>
      </section>

            <section className={`${SECTION} bg-white`}>
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-secondary-dark">
            Training times
          </p>
          <h2 className="h3 mt-2 text-primary text-center">
            Your Session, in Your Time Zone
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-16 rounded-full bg-secondary" />
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Every cohort runs 8:00pm to 2:00am PKT. See when it falls for you.
          </p>
                    <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-xl [&>div:first-child]:mt-0 [&>div:first-child]:rounded-none [&>div:first-child]:shadow-none">
            <TrainingTimesDial />
                       <div className="border-t border-gray-100 bg-slate-50/60 px-5 py-5 md:px-8 [&>div]:mt-0 [&>div]:rounded-none [&>div]:border-t-0 [&>div]:bg-transparent [&>div]:p-0 [&>div]:shadow-none md:[&>div]:flex md:[&>div]:items-center md:[&>div]:gap-5 [&_label]:whitespace-nowrap md:[&_select]:mt-0 md:[&_select]:w-64 md:[&_p]:mt-0 md:[&_p]:min-h-0 md:[&_p]:flex-1">
              <SessionTimeConverter />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
