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

          {/* Enrol early: highlighted band */}
          <div className="mt-14 md:mt-20">
         <Tilt3D className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#09263D] to-[#1B507C] p-6 md:p-10 shadow-xl">
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
          </Tilt3D>
          </div>
        </div>
      </section>

      <TrainingTimesDial />
    </>
  );
}
