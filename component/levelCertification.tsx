"use client";
import React from "react";
import { LevelCertificationType } from "@/type/levelCertification";
import Image from "next/image";

type Props = {
  data: LevelCertificationType
}

export default function LevelCertification({ data }: Props) {

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-dark-primary bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">

        <h2 className="h3 text-start">
          <span className="text-secondary">
            {data?.title?.line1}
          </span>
          <br />
          <span className="text-white">
            {data?.title?.line2}
          </span>
        </h2>
        {/* <div className="grid grid-cols-1 gap-8 2xl:gap-12 py-2 md:py-4 lg:py-8 xl:py-12">
          {data.points.map((point, index) => (
            <div className="grid grid-cols-12 gap-8 2xl:gap-12" key={index}>
              {point?.title && (
                <div className="flex items-center col-span-12 lg:col-span-7 xl:col-span-8 2xl:col-span-9 bg-white px-4 py-6 gap-4 rounded-md border shadow-2xl">
                  <div className="hidden xl:block">
                    <img
                      src={point?.imageBrand?.src}
                      alt={point?.imageBrand?.alt ?? "Arslan Larik"}
                      className=""
                      width="200px"
                    />
                  </div>
                  <div className="w-full xl:max-w-[70%]">
                    <div className="flex items-center gap-2">
                      <img
                        src={point?.imageBrand?.src}
                        alt={point?.imageBrand?.alt ?? "Arslan Larik"}
                        className="w-[70px] sm:w-[100px] bloack xl:hidden"
                      />
                      <h3 className="text-lg sm:text-xl xl:text-2xl text-primary text-start font-outfit font-semibold mb-2">
                        {point?.title}
                      </h3>
                    </div>
                    <p className="custom-text1 font-light text-black/60 text-start ">
                      {point.description}
                    </p>
                  </div>
                </div>
              )}
              <div className={`${point?.title ? "col-span-12 lg:col-span-5 xl:col-span-4 2xl:col-span-3 justify-center" : "col-span-12 justify-end"} flex items-center `}>
                <img
                  src={point?.imageCerficate?.src}
                  alt={point?.imageCerficate?.alt ?? "Arslan Larik"}
                  className={`${point?.title ? "w-full max-w-md" : "w-full lg:w-[41.666%] xl:w-[33.333%] 2xl:w-[22.5%]"} object-cover rounded-md`}
                />
              </div>
            </div> */}
        <div className="grid grid-cols-1 gap-8 2xl:gap-12 py-2 md:py-4 lg:py-8 xl:py-12">
          {data.points.map((point, index) => {
            const hasCertificate = !!point?.imageCerficate?.src;
            return (
              <div className="grid grid-cols-12 gap-8 2xl:gap-12" key={index}>

                {/* LEFT CONTENT: full width when there is no certificate image */}
                {point?.title && (
                  <div
                    className={`flex items-center col-span-12 ${
                      hasCertificate ? "lg:col-span-7 xl:col-span-8 2xl:col-span-8" : "lg:col-span-12"
                    } bg-white px-4 py-6 gap-4 rounded-md border shadow-2xl`}
                  >
                    {/* Desktop Brand Image */}
                    <div className="hidden xl:block">
                      {point?.imageBrand?.src && (
                        <Image
                          src={point.imageBrand.src}
                          alt={point.imageBrand.alt || "Brand"}
                          width={200}
                          height={80}
                          className="object-contain"
                        />
                      )}
                    </div>

                    <div className="w-full xl:max-w-[70%]">
                      <div className="flex items-center gap-2">
                        {/* Mobile Brand Image */}
                        <div className="xl:hidden">
                          {point?.imageBrand?.src && (
                            <Image
                              src={point.imageBrand.src}
                              alt={point.imageBrand.alt || "Brand"}
                              width={200}
                              height={80}
                              className="object-contain"
                            />
                          )}
                        </div>

                        <h3 className="text-lg sm:text-xl xl:text-2xl text-primary text-start font-outfit font-semibold mb-2">
                          {point?.title}
                        </h3>
                      </div>

                      <p className="custom-text1 font-light text-black/60 text-start">
                        {point.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* RIGHT CERTIFICATE IMAGE: only when one is supplied */}
                {hasCertificate && (
                  <div
                    className={`${point?.title
                      ? "col-span-12 lg:col-span-5 xl:col-span-4 2xl:col-span-4 justify-center"
                      : "col-span-12 justify-end"
                      } flex items-center`}
                  >
                    <div
                      className={`relative ${point?.title
                        ? "w-full max-w-md h-[250px] sm:h-[300px] lg:h-[350px]"
                        : "w-full lg:w-[41.666%] xl:w-[33.333%] 2xl:w-[22.5%] h-[200px] sm:h-[250px]"
                        } rounded-md overflow-hidden`}
                    >
                      <Image
                        src={point.imageCerficate!.src}
                        alt={point.imageCerficate!.alt || "Certificate"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-center rounded-md "
                      />
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
