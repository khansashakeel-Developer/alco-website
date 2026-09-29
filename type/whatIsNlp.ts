import { StaticImageData } from "next/image"

export type WhatIsNlpData = {
  title: string
  video?: string
  thumbnail?: StaticImageData
  description: string
  button: {
    text: string
  }
}