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
  // Optional portrait picture (2:3) shown on the card. When missing, the image above is used.
  poster?: {
    src: StaticImageData | string
    alt: string
  }
    // Optional artwork card (no video): a plain background picture with the programme name animated in the centre.
  art?: {
    src: StaticImageData
    tone: "light" | "dark" // "light" = bright picture (dark text), "dark" = dark picture (white text)
  }
  // Optional short video that plays muted on hover, e.g. "/videos/programs/level-1.mp4" (file in /public) or a full https URL.
  video?: string
}

export type OurProgramData = {
    title: string
    description: string
    slides?: OurProgramSlideType[]
}