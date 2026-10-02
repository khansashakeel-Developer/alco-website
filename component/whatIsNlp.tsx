"use client";

import React from "react";
import CtaButton from "./CtaButton";
import { WhatIsNlpData } from "@/type/whatIsNlp";
import VideoPlayer from "./videoPlayer";
// import NlpVideo from "/videos/What-is-NLP.mp4";
import whatIsNLPThumbnail from "@/assets/whatIsNLP/What-is-NLP-Thumbnail.webp";

const whatIsNlpData: WhatIsNlpData = {
  title: "What Is Neuro-Linguistic Programming?",
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774598216/What-is-NLP_u9fi3t.mp4",
  thumbnail: whatIsNLPThumbnail,
  description:
    "What we teach is an art: the art of understanding how people work, and of modeling how those who already thrive actually do it, so that it can be learned by anyone willing to practise. Neuro-Linguistic Programming, Time Line Therapy® Techniques, Hypnosis and Coaching are the tools of that art. They are practical, teachable skills you can use in an ordinary conversation to create an extraordinary result. You need no background in psychology to begin. You need a reason, and the willingness to practise.",
  // CTA plan: Home is ToFu and MoFu. After the explainer the gentle step is C2 (rendered from component/cta.ts).
  button: {
    text: "Join the free webinar"
  },
}

export default function WhatIsNlp() {
  const data = whatIsNlpData;

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-dark-primary bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">

        <h2 className="h3 text-white text-start">
          {data.title}
        </h2>

        {/* <div className="my-8">
          
          <video
            controls
            preload="metadata"
            className="w-full h-[450px] object-cover rounded-lg"
          >
            <source src={data?.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}

        <div className="my-8">
          <VideoPlayer
            videoUrl={data.video}
            thumbnail={data.thumbnail}
            autoPlayMuted
            className="aspect-video relative rounded-xl overflow-hidden lg:h-[70dvh] w-full bg-black"
            videoClass="w-full h-full object-contain rounded-lg"
          />
        </div>

        <p className="custom-text1 font-light text-white text-start mb-8">
          {data.description}
        </p>


        <div className="flex flex-col sm:flex-row gap-4">
          <CtaButton id="C2" variant="secondary" />
          <CtaButton id="C3" variant="outlineWhite" />
        </div>

      </div>
    </section>
  );
}