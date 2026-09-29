import { StaticImageData } from "next/image"

export type accreditedType = {
    title: string
    image: {
        src: StaticImageData
        alt: string
    }
}