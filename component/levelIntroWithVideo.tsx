"use client";

import React, { useEffect, useRef } from "react";
import Button from "./button";
import { LevelIntroWithVideoType } from "@/type/levelIntroWithVideo"
import VideoPlayer from "./videoPlayer";



type Props = {
  data: LevelIntroWithVideoType
}

export default function LevelIntroWithVideo({ data }: Props) {

  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    el.dataset.state = "hidden";
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.state = "shown";
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
        <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-full bg-secondary" />

                       <div
          ref={box}
          className="mt-6 grid gap-4 md:grid-cols-2
            [&>p]:rounded-2xl [&>p]:bg-white [&>p]:p-5 [&>p]:text-base [&>p]:leading-7 [&>p]:text-gray-700 [&>p]:shadow-md [&>p]:ring-1 [&>p]:ring-primary/10 md:[&>p]:p-6
            [&>p>strong]:mb-1 [&>p>strong]:block [&>p>strong]:text-xs [&>p>strong]:font-bold [&>p>strong]:uppercase [&>p>strong]:tracking-[0.2em] [&>p>strong]:text-secondary-dark
            md:[&>p:first-child]:col-span-2 [&>p:first-child]:border-l-4 [&>p:first-child]:border-secondary [&>p:first-child]:bg-primary-darkest [&>p:first-child]:text-white [&>p:first-child]:ring-0
            [&>p:first-child>strong]:mb-0 [&>p:first-child>strong]:mr-2 [&>p:first-child>strong]:inline [&>p:first-child>strong]:text-secondary
                        [&>p]:transition-all [&>p]:duration-700 [&>p]:ease-out
            data-[state=hidden]:[&>p]:translate-y-8 data-[state=hidden]:[&>p]:opacity-0 motion-reduce:data-[state=hidden]:[&>p]:translate-y-0 motion-reduce:data-[state=hidden]:[&>p]:opacity-100
            data-[state=shown]:[&>p:nth-child(2)]:delay-150 data-[state=shown]:[&>p:nth-child(3)]:delay-300 data-[state=shown]:[&>p:nth-child(4)]:delay-500
            [&>p:hover]:-translate-y-1.5 [&>p:hover]:shadow-2xl [&>p:hover]:delay-0
            [&>p:not(:first-child)]:border-t-4 [&>p:not(:first-child)]:border-transparent [&>p:not(:first-child):hover]:border-secondary"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />

        <div className="my-8">
          <VideoPlayer
            className="aspect-auto relative rounded-xl overflow-hidden lg:h-[70dvh] w-full bg-black"
            videoUrl={data?.video}
            thumbnail={data?.thumbnail}
            videoClass="w-full h-full object-contain rounded-lg"
            autoPlayMuted
            // hoverPlay={true}
          />
        </div>

      </div>
    </section>
  );
}