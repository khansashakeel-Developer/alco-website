import { StaticImageData } from "next/image"

export type LevelCertificationType = {
  title: {
    line1: string
    line2: string
  }
  points: {
    title?: string
    description?: string
    imageBrand?: {
      src: StaticImageData
      alt?: string
    }
    imageCerficate?: {
      src: StaticImageData
      alt: string
    }
  }[]

}