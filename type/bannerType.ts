import { StaticImageData } from "next/image"
import React from "react"

type BannerTitle = {
  line1: string
  TagLine1Type?: React.ElementType
  line2?: string
  TagLine2Type?: React.ElementType
  align?: string
}

export type BannerType = {
  level?: string
  image?: string | undefined
  title?: BannerTitle
  miniTitle?: BannerTitle
  description?: string
  TagDescType?: React.ElementType
  intoBanner?: boolean
  video?: string
  thumbnail?: StaticImageData
  className?: string
  height?: string
  children?: React.ReactNode
}