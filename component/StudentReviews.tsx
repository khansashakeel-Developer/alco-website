"use client";

import StudentReviewCarousel from "./student-review-carousel/studentReviewCarousel";
import { studentReviews } from "./testimonial";

export default function StudentReviews() {
  return (
    <section
      id="student-reviews"
      aria-labelledby="student-reviews-heading"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#071a33] via-[#0b2545] to-[#12395c] px-4 py-10 md:py-14 lg:py-16"
    >
      {/* soft gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-secondary/15 blur-3xl"
      />

      <div className="container relative mx-auto">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">
          Google reviews
        </p>
        <h2 id="student-reviews-heading" className="h3 mt-2 text-center text-white">
          What Our Students Say
        </h2>
        <div className="mx-auto mt-4 h-[3px] w-14 rounded bg-secondary" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/70">
          Real words from students who completed their training with AL&CO.
        </p>

        <div className="mx-auto mt-6 max-w-6xl">
          <StudentReviewCarousel
            slides={studentReviews}
            options={{ align: "start", skipSnaps: false }}
            autoplayDelay={1500}
          />
        </div>
      </div>
    </section>
  );
}