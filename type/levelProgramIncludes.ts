import { StaticImageData } from "next/image"
import React from "react"


export type LevelProgramIncludesType = {
  title: {
    line1: string
    line2?: string
  }
  description?: React.ReactNode
  pointsClass?: string
  detailContent?: React.ReactNode
  textAlign?: string
  points: {
    title: string
    description: string | React.ReactNode
    theme: string
    image: {
      src: StaticImageData
      alt: string
    }
    programId?: string;
  }[]

}