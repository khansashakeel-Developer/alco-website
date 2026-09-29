"use client";
import React from "react";
import { LevelProgramIncludesType } from "@/type/levelProgramIncludes";
import Button from "./button";
import Image from "next/image";

type Props = {
  data?: LevelProgramIncludesType
}

const themeClasses: any = {
  dark: "bg-primary-darkest",
  light: "bg-white",
  yellow: "bg-secondary-darkest",
};

export default function LevelProgramIncludes({ data }: Props) {

  return (
    data &&
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-gradient-light-neutral-lg bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center">
          <h2 className="h3 text-start">
            <span className="text-primary">
              {data?.title?.line1}
            </span>
          </h2>
          
          {/* <div className="my-2">
            <Button
              iconRight={true} variant="primary" size="medium" text="Learn More" href="#" className='my-auto' />
          </div> */}
        </div>
        {data.description && (
            <div className="custom-text1 font-light text-gray-600 text-start ">
              {data.description}
            </div>
          )}

        <div className={data?.pointsClass ? data?.pointsClass : "grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 2xl:gap-12 py-2 md:py-4 lg:py-8 xl:py-12"}>
          {data?.points.map((point, index) => (
            <div key={index} className={`flex flex-col px-4 py-6 lg:px-8 lg:py-6 xl:px-8 xl:py-6 2xl:px-10 2xl:py-8 rounded-xl shadow-lg ${themeClasses[point?.theme]}`}>
              <div className="w-[70px] h-[70px] p-3 bg-primary rounded-lg">
                {/* <img
                  src={point?.image?.src}
                  alt={point?.image?.alt}
                  className="object-cover"
                /> */}
                {point?.image?.src && (
                  <div className="relative ">
                    <Image
                      src={point.image.src}
                      alt={point.image.alt || "image"}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <h3 className={`
                text-lg sm:text-xl 
                text-start
                font-outfit font-semibold my-3
                ${point.theme === "dark" ? "text-secondary" : point.theme === "light" ? "text-primary" : "text-gray-800"}
                `}>
                {point.title}
              </h3>
              <div className={`text-md font-outfit text-start
                  ${point.theme === "dark" ? "text-white" : "text-gray-800"}`}>
                {point.description}
              </div>
            </div>
          ))}

        </div>

        {/* Deatil Content */}
        {data?.detailContent && (
          <div className={`${data?.textAlign ? data?.textAlign : "text-center"} text-primary-light custom-text1  mx-auto`}>{data?.detailContent}</div>
        )}
      </div>
    </section>
  );
}