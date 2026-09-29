"use client";

import React from "react";
import Button from "./button";
import { LevelIntroWithVideoType } from "@/type/levelIntroWithVideo"
import VideoPlayer from "./videoPlayer";

type Props = {
  data: LevelIntroWithVideoType
}

export default function LevelIntroWithVideo({ data }: Props) {

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-light-neutral bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">

        <h2 className="h3 text-start">
          <span className="text-primary">
            {data?.title?.line1}
          </span>
          <br />
          <span className="">
            {data?.title?.line2}
          </span>
        </h2>
        <div
          className="custom-text1 font-light text-black my-2 xl:my-3"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />

        <div className="my-8">
          <VideoPlayer
            className="aspect-auto relative rounded-xl overflow-hidden lg:h-[70dvh] w-full bg-black"
            videoUrl={data?.video}
            thumbnail={data?.thumbnail} 
            videoClass="w-full h-full object-contain rounded-lg"
            // hoverPlay={true}
          />
        </div>

      </div>
    </section>
  );
}