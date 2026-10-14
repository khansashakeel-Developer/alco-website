"use client";

import { LevelBenefitsTableType } from "@/type/levelBenefitsTable";
import React, { useState, useEffect } from "react";
import Button from "./button";
import VideoPlayer from "./videoPlayer";
import BenefitsExplorer from "./BenefitsExplorer";

type Props = {
  data?: LevelBenefitsTableType;
};

export default function LevelBenefitsTable({ data }: Props) {
  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = data?.showAll ? Math.max(data?.points?.length || 1, 1) : 10;

  const totalPages = Math.ceil((data?.points?.length || 0) / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentRows = data?.points?.slice(startIndex, endIndex);
  const light = !!data?.bgColor; // true when this table sits on a light background

  // ✅ Reset page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    data && (
      <section className={`py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 ${data?.bgColor ? data?.bgColor : "bg-dark-primary bg-cover bg-top-left"} w-full`}>
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="flex flex-col xl:flex-row justify-between xl:items-center">
            {!data?.introPage && (
              <>
                {/* <h2 className="h3 text-start">
                  <span className={`${data?.bgColor ? "text-primary" : "text-secondary"} mr-2`}>
                    {data?.title?.line1}
                  </span>
                  <span className={data?.title?.line2Class ? data?.title?.line2Class : `text-white`}>
                    {data?.title?.line2}
                  </span>
                </h2> */}
                {data?.title?.TagLine1Type && data?.title?.TagLine2Type ? (
                  <div className="h3 text-start">
                    <data.title.TagLine1Type className={`${data?.bgColor ? "text-primary" : "text-secondary"} mr-2`}>
                      {data?.title?.line1}
                    </data.title.TagLine1Type>
                    <data.title.TagLine2Type className={data?.title?.line2Class ? data?.title?.line2Class : `text-white`}>
                      {data?.title?.line2}
                    </data.title.TagLine2Type>
                  </div>
                ) : (
                  <h2 className="h3 text-start">
                    <span className={`${data?.bgColor ? "text-primary" : "text-secondary"} mr-2`}>
                      {data?.title?.line1}
                    </span>
                    <span className={data?.title?.line2Class ? data?.title?.line2Class : `text-white`}>
                      {data?.title?.line2}
                    </span>
                  </h2>
                )}
                {data?.button && (<div className="mt-4">
                  <Button
                    iconRight
                    variant="primary"
                    size="medium"
                    text={data?.button?.text}
                    href={data?.button?.href}
                    className="my-auto"
                  />
                </div>)}
              </>
            )}


            {data?.introPage === true && (data?.title?.TagLine1Type && data?.title?.TagLine2Type ? (
              <div className="h6 text-start">
                <data.title.TagLine1Type className="text-secondary font-bold">
                  {data?.title?.line1}
                </data.title.TagLine1Type>
                <data.title.TagLine2Type className={data?.title?.line2Class ? data?.title?.line2Class : `text-white`}>
                  {data?.title?.line2}
                </data.title.TagLine2Type>
              </div>
            ) : (
               <h2 className="h6 text-start">
                <div className="text-secondary font-bold">
                  {data?.title?.line1}
                </div>
                <div className={data?.title?.line2Class ? data?.title?.line2Class : `text-white`}>
                  {data?.title?.line2}
                </div>
              </h2>
            ))}
          </div>

          {/* Table */}
          {/* Benefits explorer */}
<BenefitsExplorer
  headers={data.headers}
  points={data.points}
  light={!!data.bgColor}
/>

          {/* Videos Section */}
          {data?.introPage === true && data?.videos && (
            <div>
              {data?.videoTitle && (
                <h3 className="h5 text-center">
                  <div className="text-white font-bold underline">
                    {data?.videoTitle}
                  </div>
                </h3>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 2xl:gap-12 py-4 md:py-8 2xl:py-12">
                {data?.videos.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-md shadow-xl rounded-xl overflow-hidden"
                  >
                    <VideoPlayer
                      className="aspect-video relative rounded-xl overflow-hidden h-[200px] sm:h-[220px] md:h-[250px] w-full"
                      videoUrl={item?.video}
                      thumbnail={item?.thumbnail}
                      videoClass="w-full h-full object-cover rounded-lg"
                      autoPlayOnVisible={true}
                    />

                    <p className="text-white my-3 text-center px-2">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  iconRight
                  variant="primary"
                  size="medium"
                  text="More Graduate Stories"
                  href="/testimonial"
                  className="my-auto min-w-[200px]"
                />
              </div>
            </div>
          )}

        </div>
      </section>
    )
  );
}