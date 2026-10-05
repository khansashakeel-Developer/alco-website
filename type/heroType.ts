import { StaticImageData } from "next/image"
import type { CtaRef } from "@/component/cta"

export type HeroItem = {
  title: {
    line1: string
    line2: string
  }
  description: string
  // Where the video is cropped when the box is shorter than the video: "center 0%" = top, "center 100%" = bottom.
  videoPosition?: string
  // CTA plan: when `cta` is set, the button renders from the CTA library and `text` is ignored.
  button1: {
    text: string
    link?: string
    cta?: CtaRef
  }
  button2: {
    text: string
    link?: string
    cta?: CtaRef
  }
  image: StaticImageData
  video?: string
}

export type HeroData = HeroItem[]