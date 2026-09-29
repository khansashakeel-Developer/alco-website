import React from "react";
import type { CtaRef } from "@/component/cta";

type ImageType = {
  src: any
  alt: string
};

type contentType = {
  title?: string
  TagType?: React.ElementType
  description?: React.ReactNode
  src?: any
  alt?: string
  textAlign?: string
  height?: string
  position?: string
   _id?: string;           // ← add
  is_available?: boolean;
  programId?: string; 
};

type ButtonType = {
  text: string;
  link?: string;
  /** CTA plan: when set, the button renders from the CTA library (component/cta.ts). */
  cta?: CtaRef;
};

export type ContentSectionType = {
  title?: string
  TagTitleType?: React.ElementType
  TagType?: React.ElementType
  description?: React.ReactNode
  underline?: boolean
  miniTitle?: string
  MiniTagType?: React.ElementType
  detailContent?: React.ReactNode
  textAlign?: string
  titleColor?: string
  padding?: string
  fullBg?: string
  imagelist?: ImageType[];
  button?: ButtonType;
  contentlist?: contentType[];
  contentlistColumn?: string
  contentlistClass?: string
  contentlisItemClass?: string
  contentlistTitle?: string

};