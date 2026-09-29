import { StaticImageData } from "next/image"
import type { CtaRef } from "@/component/cta"

export type HeroItem = {
  title: {
    line1: string
    line2: string
  }
  description: string
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
}

export type HeroData = HeroItem[]