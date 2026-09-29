import { StaticImageData } from "next/image"

export type LevelGraduatesExperienceType = {
  title: {
    line1: string
    line2: string
  }
  video?: string
  thumbnail?: StaticImageData
}