import { StaticImageData } from "next/image"

export type TestimonialsPost = {
  _id: string
  image?: string
  thumbnail?: string | StaticImageData | any;
  videoUrl?: string
  name: string
  designation: string
  rating: number
  description: string
}