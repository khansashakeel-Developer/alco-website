"use client";
import React from "react";
import Button from "./button";
import { LevelContentType } from "@/type/levelContent";

type Props = {
  data: LevelContentType
}

// const themeClasses: any = {
//   dark: "bg-primary-darkest",
//   light: "bg-white",
//   yellow: "bg-secondary-darkest",
// };

export default function LevelContent({ data }: Props) {

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-gradient-light-neutral-lg bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center">
          <h2 className="h3 text-start">
            <span className="text-primary">
              {data?.title?.line1}
            </span>
          </h2>
          {data?.button && (<div className="my-2">
            <Button
              iconRight
              variant="primary"
              size="medium"
              text={data?.button?.text}
              href={data?.button?.href}
              className="my-auto"
            />
          </div>)}
        </div>

        <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 2xl:gap-12 py-2 md:py-4 lg:py-8 xl:py-12">
          {data.points.map((point, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-center px-8 lg:py-6 xl:px-8 xl:py-6 2xl:px-10 2xl:py-8 rounded-xl shadow-lg bg-cover bg-center overflow-hidden min-h-[350px]"
              style={{ backgroundImage: `url(${point?.image?.src})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10"></div>

              {/* Content */}
              <div className="relative z-10 text-white">
                <h3 className="text-lg sm:text-xl font-outfit font-semibold mb-3">
                  {point.title}
                </h3>

                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {point.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}