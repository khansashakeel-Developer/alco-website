"use client";

import React from "react";
import Button from "./button";
import { WhyTrainWithALData } from "@/type/whyTrainWithAL";
// images
import Train1 from '@/assets/whyTrainWithAL/Train1.webp';
import Train2 from '@/assets/whyTrainWithAL/Train2.webp';
import Train3 from '@/assets/whyTrainWithAL/Train3.webp';
import Train4 from '@/assets/whyTrainWithAL/Train4.webp';
import Train5 from '@/assets/whyTrainWithAL/Train5.webp';
import Train6 from '@/assets/whyTrainWithAL/Train6.webp';
import Image from "next/image";

const whyTrainWithALData: WhyTrainWithALData = {
  title: "Why Train with Arslan Larik & Company (AL&CO)?",

  description:
    "Choosing where to train is a decision about the rest of your life. Here is what sets AL&CO apart.",
  points: [
    {
      title: "Two Masters, One Institution: Arslan Larik and Bismillah Pervez",
      image: {
        src: Train1,
        alt: "Two Masters, One Institution: Arslan Larik and Bismillah Pervez"
      },
    },
    {
      title: "Pioneers of Online NLP Training",
      image: {
        src: Train2,
        alt: "Pioneers of Online NLP Training"
      },
    },
    {
      title: "Free Revisits for Five Years (Levels 1 to 3)",
      image: {
        src: Train3,
        alt: "Free Revisits for Five Years (Levels 1 to 3)"
      },
    },
    {
      title: "An Audio Library Mapped to Your Manual",
      image: {
        src: Train4,
        alt: "An Audio Library Mapped to Your Manual"
      },
    },
    {
      title: "A Global Network of 2,000+ Graduates",
      image: {
        src: Train5,
        alt: "A Global Network of 2,000+ Graduates"
      },
    },
    {
      title: "Lifetime Support from Experts",
      image: {
        src: Train6,
        alt: "Lifetime Support from Experts"
      },
    }
  ]
}

export default function WhyTrainWithAL() {
  const data = whyTrainWithALData;

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-light-neutral bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 my-8">
          <div className="flex flex-col justify-start ">
            <h2 className="h3 text-black text-start">
              {data.title}
            </h2>
          </div>
          <div className="flex flex-col justify-center pt-3">
            <p className="custom-text1 font-light text-black text-start ">
              {data.description}
            </p>
            <div className="mt-4">
              <Button
                iconRight={true}
                variant="primary"
                size="medium"
                text="More about us"
                href="/about-us/why-train-with-alco"
                className='my-auto' />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 my-12">

          {data.points.map((point, index) => (
            <div key={index} className="flex items-center text-center gap-4 p-6 border rounded-lg shadow-md">
              {/* <img src={point.image.src} alt={point.image.alt} className="w-16 h-16 object-cover " /> */}
              {point.image && (
                <div className="w-16 h-16 relative">
                  <Image
                    src={point.image.src}          // must be defined
                    alt={point.image.alt}
                    fill                            // makes it fill the parent div
                    className="object-contain "
                    // sizes="48px"                    // optional, since w-12 h-12 = 48px
                  />
                </div>
              )}
              <p className="text-md lg:text-lg font-medium text-black/85 text-start font-outfit">
                {point.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
