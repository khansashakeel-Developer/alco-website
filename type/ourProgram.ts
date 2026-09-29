import { StaticImageData } from "next/image"

export type OurProgramSlideType = {
  title: string
  description: string
  href?: string
  button?: {
    text: string
    // link: string
  }
  image?: {
    src: StaticImageData
    alt: string
  }
}

export type OurProgramData = {
    title: string
    description: string
    slides?: OurProgramSlideType[]
}