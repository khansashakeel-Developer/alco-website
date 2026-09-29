"use client";

import React from "react";
import { BannerType } from "@/type/bannerType";
import VideoPlayer from "./videoPlayer";

// bg-image-alco-center

type Props = {
  data: BannerType
}

export default function Banner({ data }: Props) {

  return (
    <>
      <section className={`py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 w-full ${data.height ? data.height : "min-h-[450px]"} flex items-center  ${data?.className ? data?.className : "bg-cover bg-no-repeat"}`} style={{ backgroundImage: `url(${data?.image})` }}>
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-1 ${!data?.title?.align && "lg:grid-cols-2"} gap-2 my-8`}>
            <div className="flex flex-col justify-start ">
              <div className="flex mb-4">
                {data?.level && (
                  <div className="bg-gradient-secondary-to-light-secondary bg-cover text-black px-4 py-1">
                    {data?.level}
                  </div>
                )}
              </div>
              {/* {!data?.intoBanner && data?.title?.line1 && (<h1 className={`h1 text-white ${data?.title?.align ? data?.title?.align : "text-start"}`}>
                 {data?.title?.line1}

                {data?.title?.line2 && (
                  <span className="block">
                    {data?.title?.line2}
                  </span>
                )}
              </h1>)} */}

              {!data?.intoBanner && data?.title?.line1 && (data?.title?.TagLine1Type && data?.title?.TagLine2Type ? (
                <div className={`h1 ${data?.title?.align ? data?.title?.align : "text-start"}`}>
                  <data.title.TagLine1Type className="text-white">
                    {data?.title?.line1}
                  </data.title.TagLine1Type>
                  <data.title.TagLine2Type className="block text-white">
                    {data?.title?.line2}
                  </data.title.TagLine2Type>
                </div>
              ) : (
                <h1 className={`h1 text-white ${data?.title?.align ? data?.title?.align : "text-start"}`}>
                  {data?.title?.line1}

                  {data?.title?.line2 && (
                    <span className="block">
                      {data?.title?.line2}
                    </span>
                  )}
                </h1>
              ))}

              {!data?.intoBanner && data?.children}

              {/* {data?.intoBanner === true && (<h1 className="h1 text-secondary text-start">
                {data?.title?.line1}

                {data?.title?.line2 && (
                  <span className="block text-white h4">
                    {data?.title?.line2}
                  </span>
                )}
              </h1>)}
              {data?.intoBanner === true && (data?.miniTitle && <div className="h6 text-white/80 text-start rounded-md py-4 px-6 bg-white/10 drop-shadow-xl">
                {data?.miniTitle?.line1}

                {data?.miniTitle?.line2 && (
                  <span className="block h6 text-secondary/80">
                    {data?.miniTitle?.line2}
                  </span>
                )}
              </div>)} */}

              {data?.intoBanner === true && (
                data?.title?.TagLine1Type && data?.title?.TagLine2Type ? (
                  <div className={`h1 text-secondary text-start`}>
                    <data.title.TagLine1Type className="text-secondary">
                      {data?.title?.line1}
                    </data.title.TagLine1Type>
                    <data.title.TagLine2Type className="block text-white h4">
                      {data?.title?.line2}
                    </data.title.TagLine2Type>
                  </div>
                ) : (
                  <h1 className="h1 text-secondary text-start">
                    {data?.title?.line1}

                    {data?.title?.line2 && (
                      <span className="block text-white h4">
                        {data?.title?.line2}
                      </span>
                    )}
                  </h1>
                )
              )}

              {data?.intoBanner === true && (
                (data?.miniTitle && (
                  data?.miniTitle?.TagLine1Type && data?.miniTitle?.TagLine2Type ? (
                    <div className="h6 text-white/80 text-start rounded-md py-4 px-6 bg-white/10 drop-shadow-xl">
                      <data.miniTitle.TagLine1Type className="text-white/80">
                        {data?.miniTitle?.line1}
                      </data.miniTitle.TagLine1Type>

                      {data?.miniTitle?.line2 && (
                        <data.miniTitle.TagLine2Type className="block h6 text-secondary/80">
                          {data?.miniTitle?.line2}
                        </data.miniTitle.TagLine2Type>
                      )}
                    </div>
                  ) : (
                    <div className="h6 text-white/80 text-start rounded-md py-4 px-6 bg-white/10 drop-shadow-xl">
                      {data?.miniTitle?.line1}

                      {data?.miniTitle?.line2 && (
                        <span className="block h6 text-secondary/80">
                          {data?.miniTitle?.line2}
                        </span>
                      )}
                    </div>
                  )
                )
                )
              )}

            </div>
          </div>
        </div>
      </section>
      {/* bannar description */}
      {data?.intoBanner === true && (
        <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 w-full">
          <div className=" flex justify-center flex-col items-center">

            {data?.TagDescType ? <data.TagDescType className="h6 max-w-3xl text-center">{data?.description}</data.TagDescType> : <h2 className="h6 max-w-3xl text-center">{data?.description}</h2>}


            {data?.title?.line1 && (<p className="h4 text-primary text-start font-semibold mt-2">
              - {data?.title?.line1}
            </p>)}

            {data?.intoBanner === true && (data?.video &&
              <div className="my-8">
                {/* <video
                    controls
                    preload="metadata"
                    className="w-full h-[350px] lg:h-[450px] object-cover rounded-lg"
                  >
                    <source src={data?.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video> */}
                <VideoPlayer
                  className="aspect-video relative rounded-xl overflow-hidden h-[350px] lg:h-[450px] w-full"
                  videoUrl={data?.video}
                  thumbnail={data?.thumbnail}
                  videoClass="w-full h-full object-cover rounded-lg"
                // hoverPlay={true}
                />
              </div>)}
            {!data?.intoBanner && data?.description && (
              <p className="custom-text1 font-light text-white text-start mt-4">
                {data?.description}
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}
