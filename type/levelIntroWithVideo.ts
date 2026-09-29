import { StaticImageData } from "next/image"

export type LevelIntroWithVideoType = {
  title: {
    line1: string
    line2: string
  }
  description: string
  video?: string
  thumbnail?: StaticImageData

}