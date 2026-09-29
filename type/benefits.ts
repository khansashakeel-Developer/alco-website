export type BenefitsData = {
  title: string
  description: string
  slides: {
    title: string
    description: string
    image: {
      src: string
      alt: string
    }
  }[]
}