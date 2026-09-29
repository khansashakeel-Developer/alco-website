import { StaticImageData } from "next/image";
import React from "react";

export type GalleryImage = {
        src: StaticImageData
        alt: string
        title: string
};

export type GalleryItem = {
    title: string
    description?: React.ReactNode
    image: GalleryImage[]
    underline?: boolean
};