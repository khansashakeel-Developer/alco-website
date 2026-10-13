import React from "react";
import OpenEnrolButton from "@/component/OpenEnrolButton";
import SessionTimeConverter from "@/component/SessionTimeConverter";

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

          {/* Steps joined by a line */}
          <ol className="relative mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 bg-gradient-to-r from-secondary via-primary/40 to-secondary lg:block" />
            {STEPS.map((s, i) => (
              <li key={s.title} className="group relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#09263D] text-2xl font-bold text-white shadow-lg ring-8 ring-white transition-all duration-300 group-hover:scale-110 group-hover:from-secondary group-hover:to-secondary-dark group-hover:text-primary-darkest">
                  {i + 1}
                </span>
                <p className="mt-5 font-outfit text-lg font-semibold text-primary">{s.title}</p>
                <p className="mt-2 max-w-[240px] text-primary-light">{s.text}</p>
              </li>
            ))}
          </ol>

          {/* Enrol early: highlighted band */}
          <div className="relative mt-14 overflow-hidden rounded-2xl bg-gradient-to-br from-[#09263D] to-[#1B507C] p-6 md:p-10 shadow-xl">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-secondary" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">A head start</p>
            <h3 className="h5 mt-1 font-semibold text-secondary">Enrol Early, and Here Is Why</h3>
            <p className="custom-text1 mt-3 leading-relaxed text-white/85">
              The sooner you confirm, the sooner your place is secured and your learning materials
              reach you, often well before the workshop begins. That head start is real: you can
              settle into your manual and audio, and arrive already in motion rather than starting
              cold on day one. Places are limited, and a last-minute decision takes a genuine toll on
              your own experience. Your materials may reach you late, and we cannot onboard and
              support you the way we would want to. Give yourself the fuller journey, and come in
              early.
            </p>
            {showEnrolButton && (
              <div className="mt-6 flex">
                <OpenEnrolButton text="Enrol now" variant="secondary" className="px-6" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="training-times" className={`${SECTION} bg-light-neutral bg-cover bg-top-left`}>
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="h3 text-primary text-center">Training Times, Wherever You Are</h2>
          <p className="custom-text1 text-primary-light text-center mt-4">
            Our live sessions run from 8:00pm to 2:00am Pakistan Standard Time (PKT), on Karachi
            time. That is our time, and it is the same for every cohort. Here is when the session
            lands where you are, so you can plan around it.
          </p>
          <div className="overflow-x-auto rounded-xl shadow-lg mt-8">
            <table className="w-full border-collapse text-sm sm:text-base">
              <caption className="sr-only">When the 8:00pm to 2:00am PKT session runs in your region</caption>
              <thead>
                <tr className="bg-primary text-white text-left">
                  <th scope="col" className="px-3 py-3 h6">Your region</th>
                  <th scope="col" className="px-3 py- h6">When our session runs for you</th>
                </tr>
              </thead>
              <tbody>
                {TIMES.map(([region, time], index) => (
                  <tr key={region} className={index % 2 === 0 ? "bg-white" : "bg-blue-50 border-y border-primary"}>
                    <th scope="row" className="px-3 py-3 text-left font-medium text-gray-800">{region}</th>
                    <td className="px-3 py-3 text-gray-700">{time}</td>
                  </tr>
                ))}
              </tbody>
                        </table>
          </div>

          <SessionTimeConverter />

          <p className="text-sm text-gray-600 mt-4">
            A note: a few regions move their clocks for daylight saving, which can shift these by
            an hour for part of the year. Pakistan does not, so our start time never changes. Your
            relationship manager will confirm your exact local time for your dates.
          </p>
        </div>
      </section>
    </>
  );
}
