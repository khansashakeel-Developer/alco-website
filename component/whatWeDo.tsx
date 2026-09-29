"use client";

import React from "react";
import { WhatWeDoData } from "@/type/whatWeDo";

// B 02 rows A7 and A8: the six values from the brochure (p.9).
const whatWeDoData: WhatWeDoData = {
  title: {
    line1: "Our Values",
    line2: "What we build, and why",
  },
  points: [
    {
      title: "Empowerment is our engine.",
      description:
        "Everything we build, every tool we teach and every credential we award exists for a single purpose: to place real, lasting power back in the hands of the person who came to us. We do not create dependence on a teacher. We create capability that stays with you for the rest of your life.",
    },
    {
      title: "Brilliance is the standard we hold.",
      description:
        "“Brilliance” is not a slogan to us, it is a bar we refuse to lower. We are not interested in making a person merely adequate. We are here to draw out the fullest, sharpest and most alive version of who they are, and we treat anything less as an unfinished job.",
    },
    {
      title: "We exist to raise trainers, not simply to graduate students.",
      description:
        "Our deepest work is not measured by how many people pass through a room, but by how many walk out able to lead rooms of their own. We give ourselves to raising the next generation of trainers and coaches, so that empowerment multiplies far beyond us, one teacher becoming many, across the nation and around the world.",
    },
    {
      title: "We are a Center, not a single person.",
      description:
        "AL&CO was built as an institution by design. Our standards, our methods and our body of work are made to outlast any one teacher, so that human brilliance continues to reach people for generations, and not only for the length of a single career.",
    },
    {
      title: "We reengineer, we do not merely patch.",
      description:
        "We are not in the business of temporary relief or surface repair. Our craft is behavioral reengineering, change at the very root of how a person thinks, feels and acts, so that what shifts inside our rooms holds firm long after the training has ended.",
    },
    {
      title: "Growth, at its best, feels like play.",
      description:
        "We believe transformation was never meant to be grim. We create a space that is demanding and joyful at once, where you hold the autonomy to design your own path, rise through your own levels, and grow in the way that is truest to you.",
    },
  ],
}

export default function WhatWeDo() {
  const data = whatWeDoData;

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-dark-primary bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">

        <h2 className="h3 text-start">
          <span className="text-secondary">
            {data.title.line1}
          </span>
          <br />
          <span className="text-white">
            {data.title.line2}
          </span>
        </h2>

        <div className="bg-white p-4 lg:p-6 xl:p-8 rounded-lg shadow-lg mt-3 md:mt-4 lg:mt-6 xl:mt-8">

          {
            data.points.map((point, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:space-x-4 mb-2 sm:mb-6 last:mb-2">
                <div className="px-[15px] h-10 bg-primary-dark text-secondary rounded-full mt-1 hidden sm:flex justify-center items-center text-[20px]" >{index + 1}
                </div>
                <div className="flex flex-col mb-2 sm:mb-auto">
                  <div className="flex items-center mb-1 sm:mb-0">
                    <div className="px-3 h-8 mr-2 bg-primary-dark text-secondary rounded-full flex justify-center items-center sm:hidden" >{index + 1}
                  </div>
                   <h3 className="h6 text-primary text-start font-semibold ">
                    {point.title}
                  </h3>
                  </div>
                 
                  <p className="custom-text1 font-light text-black/60 text-start ">
                    {point.description}
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}