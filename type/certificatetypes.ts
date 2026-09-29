import { StaticImageData } from "next/image"

export type CertificateItem = {
  id: string
  tabLabel: string
  tag: string
  title: string
  organization: string
  description: string
  duration?: string
  mode?: string
  accreditation: string
  badgeText?: string
  level?: "foundation" | "advanced" | "coaching" | "therapy" | "clinical" | "other"
  image?: StaticImageData
  badgeImage?: StaticImageData
  accreditedBadges?: StaticImageData[]   // paths to badge images
}