import { HeroData } from "@/type/heroType";
import { HeroType } from "@/type/homeType";
import heroSlide1 from "@/assets/hero/hero_slide1.webp";
import heroSlide2 from "@/assets/hero/hero_slide2.webp";
// A 09 C2: slide 3 served as .webp (the 1.5 MB .jpg is no longer imported).
import heroSlide3 from "@/assets/hero/hero_slide3.webp";

const HOME_WA = "Hi, I would like to know about AL&CO's NLP training (home page)";

// B 01 rows A1 to A8. Slide 1 title is the page H1.
const heroData: HeroData = [
  {
    "title": {
      "line1": "World-Class NLP Training in Pakistan, ",
      "line2": "Taught Live by AL&CO"
    },
    "description": "Arslan Larik & Company (AL&CO), the Center for Human Brilliance and Behavioral Reengineering. World-class NLP, hypnosis and coaching certification, taught live. <br/> Transform your own life, and learn to transform the lives of others.",
    // CTA plan: Home is ToFu and MoFu. Primary C1, secondary C2 (labels from component/cta.ts).
    "button1": {
      "text": "Speak to a relationship manager",
      "cta": { id: "C1", message: HOME_WA }
    },
    "button2": {
      "text": "Join the free webinar",
      "cta": { id: "C2" }
    },
    "image": heroSlide1,
    "video": "https://res.cloudinary.com/dmbpjv9e8/video/upload/q_auto:good,w_1280,ac_none,vc_h264/v1791197799/2_b_kpdzp1.mp4"
  },
  {
    "title": {
      "line1": "Take Your Foot ",
      "line2": "Off the Brake"
    },
    "description": "Have you ever felt one foot pressing the accelerator, wanting your life to move forward, while the other foot quietly holds the brake? If any part of you is ready to take your foot off the brake, you are in the right place. Let us show you how.",
    // CTA plan: Home is ToFu and MoFu. Primary C1, secondary C2 (labels from component/cta.ts).
    "button1": {
      "text": "Speak to a relationship manager",
      "cta": { id: "C1", message: HOME_WA }
    },
    "button2": {
      "text": "Join the free webinar",
      "cta": { id: "C2" }
    },
    "image": heroSlide2
  },
  {
    "title": {
      "line1": "Discover the ",
      "line2": "Power of NLP"
    },
    "description": "Six levels, one ladder: from NLP Practitioner to NLP Master Trainer. Live on Zoom, taught personally by Arslan Larik and Bismillah Pervez, 8:00pm to 2:00am Pakistan time.",
    // CTA plan: Home is ToFu and MoFu. Primary C1, secondary C2 (labels from component/cta.ts).
    "button1": {
      "text": "Speak to a relationship manager",
      "cta": { id: "C1", message: HOME_WA }
    },
    "button2": {
      "text": "Join the free webinar",
      "cta": { id: "C2" }
    },
    "image": heroSlide3
  }
]

export const home: HeroType = {
  hero: heroData,
};
