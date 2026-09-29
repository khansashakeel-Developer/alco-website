import { StaticImageData } from "next/image"

export type WhyTrainWithALData = {
  title: string
  description: string
  points: {
    title: string
    image: {
      src: StaticImageData
      alt: string
    }
  }[]
}