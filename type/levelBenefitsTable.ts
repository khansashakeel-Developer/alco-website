

// export type LevelBenefitsTableType = {
//   title: {
//     line1: string
//     line2: string
//   }
//   points: {
//     content: string;
//     personal: string;
//     coaches?: string;
//   }[]

import { StaticImageData } from "next/image";

// }

export type LevelBenefitsTableType = {
  title: {
    line1: string;
    TagLine1Type?: any;
    line2: string;
    TagLine2Type?: any;
    line2Class?: any;
  };
  bgColor?: string
  headers: string[];   // 👈 NEW
  points: {
    content: string;
    values: string[];  // 👈 NEW (dynamic columns)
  }[];
    dynamicColumn?: string;
  introPage?: boolean
  /** Render every row server-side, no pagination (spec C 07 step 1). */
  showAll?: boolean
  videos?: {
    video?: string;
    title?: string;
    thumbnail?: StaticImageData
  }[];
  videoTitle?: string
  button?: {
    text?: string
    href?: string
  }

};