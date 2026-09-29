import React from "react"

export type LevelContentType = {
  title: {
    line1: string
    line2: string
  }
  points: {
    title: string
    items: string[]
    image: {
      src: string
      alt: string
    }
  }[]
  button?: {
    text?: string
    href?: string
  }

}