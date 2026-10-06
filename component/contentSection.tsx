"use client";

import { ContentSectionType } from "@/type/contentSection";
import React from "react";
import Button from "./button";
import CtaButton from "./CtaButton";
import Image from "next/image";


type Props = {
    data?: ContentSectionType
    onItemClick?: (item: any, index: number) => void;
};

const ContentSection = ({ data, onItemClick }: Props) => {
    return (
        data &&
        <section className={`${data?.padding ? data?.padding : "pb-6 md:pb-8 lg:pb-12 xl:pb-16 "} ${data?.fullBg ? data?.fullBg : "max-w-7xl"} mx-auto sm:px-4`}>
            <div className="container mx-auto px-4">
                {/* Title */}
                {data?.title && (
                    data?.TagType ? <data.TagType className={`h4 font-semibold  ${data?.textAlign ? data?.textAlign : "text-center"} ${data?.titleColor ? data?.titleColor : "text-primary"}  ${data?.underline === true && "underline"} `}>
                        {data?.title}
                    </data.TagType> :
                    <div className={`h4 font-semibold  ${data?.textAlign ? data?.textAlign : "text-center"} ${data?.titleColor ? data?.titleColor : "text-primary"}  ${data?.underline === true && "underline"} `}>
                        {data?.title}
                    </div>
                )}

                {/* Description */}
                {data?.description && (
                    <div className={`${data?.textAlign ? data?.textAlign : "text-center"} text-primary-light custom-text1  mx-auto`}>{data?.description}</div>
                )}

                {/* Mini Title */}
                {data?.miniTitle && (
                    data?.MiniTagType ? <data.MiniTagType className={`h5 font-semibold ${data?.textAlign ? data?.textAlign : "text-center"} text-primary ${data?.underline === true && "underline"} `}>
                        {data?.miniTitle}
                    </data.MiniTagType> :
                    <div className={`h5 font-semibold ${data?.textAlign ? data?.textAlign : "text-center"} text-primary ${data?.underline === true && "underline"} `}>
                        {data?.miniTitle}
                    </div>
                )}

                {/* content List */}
                {data?.contentlist && data.contentlist.length > 0 && (
                    <div className={data.contentlistClass ? data.contentlistClass : `grid ${data.contentlistColumn ? data.contentlistColumn : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 "}   max-w-6xl mx-auto pt-6 md:pt-8 lg:pt-12 xl:pt-16 `}>
                        {data.contentlist.map((content, index) => (
                            <div
                                className={`${data?.contentlisItemClass ? data?.contentlisItemClass : `rounded-xl bg-slate-200/60 drop-shadow-sm px-4 py-6`} ${(content as any)?.is_available === false ? "cursor-not-allowed" : "cursor-pointer"}`}
                                onClick={() => onItemClick?.(content, index)}
                            >
                                {/* Image */}
                                {content.src && (
                                    <div className={`relative w-full ${content.height ? content.height : "h-36"}`}>
                                        <Image
                                            key={index}
                                            src={content.src}
                                            alt={content.alt ?? ""}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 600px"
                                            className={`rounded-lg ${content.position ? content.position : "object-cover"} ${(content as any)?.is_available === false ? "opacity-70" : "opacity-100"} `}
                                        />
                                        {/* Coming Soon overlay */}
                                        {(content as any)?.is_available === false && (
                                            <div className="absolute inset-0 flex items-center justify-center ">
                                                <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1 rounded-full">
                                                    Coming Soon
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Title */}
                                {content?.title && (
                                    content.TagType ? <content.TagType className={data.contentlistTitle ? data.contentlistTitle : `text-2xl font-semibold ${content?.textAlign ? content?.textAlign : "text-center"} text-primary my-4 min-h-12`}>
                                        {content?.title}
                                    </content.TagType> :
                                    <div className={data.contentlistTitle ? data.contentlistTitle : `text-2xl font-semibold ${content?.textAlign ? content?.textAlign : "text-center"} text-primary my-4 min-h-12`}>
                                        {content?.title}
                                    </div>
                                )}

                                {/* Description */}
                                {content?.description && (
                                    <div className={`${content?.textAlign ? content?.textAlign : "text-center"} text-primary-light text-base`}>
                                        {content?.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Deatil Content */}
                {data?.detailContent && (
                    <div className={`${data?.textAlign ? data?.textAlign : "text-center"} text-primary-light custom-text1  mx-auto`}>{data?.detailContent}</div>
                )}

                {/* Images */}
                {data?.imagelist && data.imagelist.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 sm:gap-8 lg:gap-12 xl:gap-16 2xl:gap-24 max-w-5xl mx-auto pt-6 md:pt-8 lg:pt-12 xl:pt-16">
                        {data.imagelist.map((img, index) => (
                            <img
                                key={index}
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-auto rounded-lg"
                            />
                        ))}
                    </div>
                )}



                {data?.button && (
                    <div className="flex justify-center pt-6 md:pt-8">
                        {data.button.cta ? (
                            <CtaButton
                                id={data.button.cta.id}
                                message={data.button.cta.message}
                                href={data.button.cta.href}
                                label={data.button.cta.label}
                                variant="secondary"
                                className="px-6"
                            />
                        ) : (
                            <Button
                                iconRight={true}
                                text={data.button.text}
                                href={data.button.link}
                                newTab={!!data.button.link && /^https?:/.test(data.button.link)}
                                variant="secondary"
                                className="px-6"
                            />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ContentSection;