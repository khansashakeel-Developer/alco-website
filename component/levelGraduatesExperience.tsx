"use client";
import React from "react";
import { LevelGraduatesExperienceType } from "@/type/levelGraduatesExperience";
import VideoPlayer from "./videoPlayer";
import CtaButton from "./CtaButton";
import type { CtaRef } from "./cta";

type Props = {
  data: LevelGraduatesExperienceType;
  /** CTA plan: C4 on Levels 1 and 2, C1 on Levels 3 to 6 (default C1: no instant enrol by accident). */
  primary?: CtaRef;
};

export default function LevelGraduatesExperience({ data, primary = { id: "C1" } }: Props) {

  // No video (Level 6 today): render nothing. page.tsx also guards this.
  if (!data?.video) return null;

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-dark-primary bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center">
          <h2 className="h3 text-start">
            <span className="text-secondary mr-2">{data?.title?.line1}</span>
            <br />
            <span className="text-white">{data?.title?.line2}</span>
          </h2>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <CtaButton id={primary.id} message={primary.message} href={primary.href} label={primary.label} variant="white" className="my-auto w-full sm:w-auto" />
            {/* Decision (0 Shared/01): graduate proof sits next to a graduate video; the hub is linked by LevelNav and the breadcrumb. */}
            <CtaButton id="C10" variant="secondary" className="my-auto w-full sm:w-auto" />
          </div>
        </div>
        <div className="my-8">
          <VideoPlayer
            className="aspect-video relative rounded-xl overflow-hidden lg:h-[70dvh] w-full bg-black"
            videoUrl={data.video}
            thumbnail={data?.thumbnail}
            videoClass="w-full h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
