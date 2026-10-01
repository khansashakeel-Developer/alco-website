"use client";

import React from "react";
import Link from "next/link";
import { EmpowerYourselfData } from "@/type/empowerYourself";
// images
import About1 from '@/assets/our-mission/About1.webp'
import About2 from '@/assets/our-mission/About2.webp'
import About3 from '@/assets/our-mission/About3.webp'
import Image from "next/image";

// B 02 rows A2 to A6. This page carries the site's only use of "mind-sciences" (A3).
const artWeTeachRest =
  ". We begin with clarity, because clarity is where real choice starts. We begin with agency, because mastery always starts from within. We begin with alignment, because that is where genuine change takes root. What we teach is not a science, and it does not pretend to be one, because a human being is not a laboratory. Human experience is subjective, and that is exactly what makes this an art: the art of understanding how people work, and of modeling how those who already thrive actually do it, so that it can be learned by anyone willing to practise. NLP draws on behavioural psychology; it is a synthesis and a modelling technique, and in the hands of a practitioner it becomes a craft. Neuro-Linguistic Programming, Time Line Therapy® Techniques, Hypnosis and Coaching are the tools of that art. You need no background in psychology to begin. You need a reason, and the willingness to practise. We do not see anyone who comes to us as broken, and we are not here to fix what was never broken. We journey with you, into the areas you choose, so you can ground yourself there with more precision and more freedom.";

const empowerYourself: EmpowerYourselfData = {
  title: "The Institution",

  description:
    "Arslan Larik & Company (AL&CO) is the Center for Human Brilliance and Behavioral Reengineering: world-class NLP, hypnosis and mind-sciences certification, taught live. We built AL&CO on one belief: that a company should not be one person with a brand, it should be an institution that outlives the people who build it, so empowerment keeps spreading long after any one of us. That is why we do not only train practitioners. We build and facilitate master trainers.",
  points: [
    {
      title: "Our Vision",
      description: "AL&CO is the Center for Human Brilliance and Behavioral Reengineering, an institution built to endure: the ground where people master their own minds and step into the fullest version of themselves.",
      image: {
        src: About1.src,
        alt: "AL&CO trainers and graduates, the vision of the Center for Human Brilliance"
      },
    },
    {
      title: "Our Mission",
      description: "To reengineer how a person thinks, feels and acts at the root, and to cultivate a self-mastery they can carry on their own, so that each person becomes able to lead their own life and lift the lives around them. Change begins with one person and ripples outward, from a single life to a household, to a community, to a nation, and in time to the world.",
      image: {
        src: About2.src,
        alt: "An AL&CO live training session, the mission in practice"
      },
    },
    {
      title: "The Art We Practise",
      description: "Greetings from Arslan and Bismillah" + artWeTeachRest,
      image: {
        src: About3.src,
        alt: "Arslan Larik and Bismillah Pervez teaching live"
      },
    }
  ]
}

// Point 3 links the two names to their profiles (B 02 §B internal links); the text is the same as `description`.
const richDescriptions: Record<number, React.ReactNode> = {
  2: (
    <>
      Greetings from {" "}
      <Link href="/about-us/who-is-arslan-larik" className="underline">Arslan</Link> and{" "}
      <Link href="/about-us/who-is-bismillah-pervez" className="underline">Bismillah</Link>
      {artWeTeachRest}
    </>
  ),
};

export default function EmpowerYourself() {
  const data = empowerYourself;

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-gradient-light-neutral-lg bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-start ">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold font-outfit text-primary text-start mb-2">
            {data.title}
          </h2>
          <p className="custom-text1 font-light text-black text-start ">
            {data.description}
          </p>
        </div>
        <div className="flex flex-col space-y-6 md:space-y-8 lg:space-y-12 xl:space-y-16 my-6 md:my-8 lg:my-12 xl:my-16 ">
          {data.points.map((point, index) => (
            <div key={index} className="grid grid-cols-12 gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 ">
              <div
                className={`col-span-12 lg:col-span-5 xl:col-span-6 ${index % 2 !== 0 ? "lg:order-2" : ""
                  }`}>
                <div className="relative w-full h-[310px] sm:h-[350px] lg:h-[450px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={point.image.src}
                    alt={point.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover xl:object-top"
                  />
                </div>
                {/* <img src={point.image.src} alt={point.image.alt} className="xl:object-top object-cover shadow-xl max-h-[310px] sm:max-h-[350px] lg:max-h-[450px] w-full rounded-lg" /> */}
              </div>
              <div className="col-span-12 lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold font-outfit text-primary text-start mb-4 ">
                  {point.title}
                </h3>
                <p className="custom-text1 font-medium text-black/85 text-start font-outfit">
                  {richDescriptions[index] ?? point.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
