import React from "react";
import OpenEnrolButton from "@/component/OpenEnrolButton";

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
          <h2 className="h3 text-primary text-center">How to Enrol</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-xl bg-slate-200/60 drop-shadow-sm px-5 py-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold">
                  {i + 1}
                </span>
                <p className="mt-4 font-semibold text-primary">{s.title}</p>
                <p className="mt-1 text-primary-light">{s.text}</p>
              </li>
            ))}
          </ol>

          <h3 className="h5 font-semibold text-primary mt-10">Enrol Early, and Here Is Why</h3>
          <p className="custom-text1 text-primary-light mt-2">
            The sooner you confirm, the sooner your place is secured and your learning materials
            reach you, often well before the workshop begins. That head start is real: you can
            settle into your manual and audio, and arrive already in motion rather than starting
            cold on day one. Places are limited, and a last-minute decision takes a genuine toll on
            your own experience. Your materials may reach you late, and we cannot onboard and
            support you the way we would want to. Give yourself the fuller journey, and come in
            early.
          </p>
          {showEnrolButton && (
            <div className="flex justify-center mt-6">
              <OpenEnrolButton text="Enrol now" variant="secondary" className="px-6" />
            </div>
          )}
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
