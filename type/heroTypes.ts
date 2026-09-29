export type HeroPost = {
  _id: string
  image: string
  title: {
    line1: string
    line2: string
  }
  description: string
  button1: { text: string; link: string, leftIcon?: string, rightIcon?: string }
  button2: { text: string; link: string, leftIcon?: string, rightIcon?: string }
}