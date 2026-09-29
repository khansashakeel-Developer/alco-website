import { StaticImageData } from "next/image";


export type brandType = {
    _id: string
    image: StaticImageData
    alt: string
}

export type BrandCarouselProps = {
  images?: brandType[];
};
export type BrandTitle = string