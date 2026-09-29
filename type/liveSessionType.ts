import { StaticImageData } from "next/image"

export interface LiveSessionItem {
  image: StaticImageData
  alt: string
  tag?: "NLP Course" | "Workshop" | "Announcement" | string
  title?: string
  date?: string
  attendees?: string
}
 