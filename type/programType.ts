import { BannerType } from "./bannerType"
import { ContentSectionType } from "./contentSection"
import { LevelBenefitsTableType } from "./levelBenefitsTable"
import { LevelCertificationType } from "./levelCertification"
import { LevelContentType } from "./levelContent"
import { LevelGraduatesExperienceType } from "./levelGraduatesExperience"
import { LevelIntroWithVideoType } from "./levelIntroWithVideo"
import { LevelProgramIncludesType } from "./levelProgramIncludes"

/** Level-page FAQ: plain strings, because the same text feeds the visible
 *  accordion and the FAQPage JSON-LD. Assignable to Faq (app/faqs/data). */
export type LevelFaq = { question: string; answer: string }

export type LevelNavLink = { href: string; label: string }

export type LevelNavType = {
  prev?: LevelNavLink
  prerequisite?: LevelNavLink
  next?: LevelNavLink
  more?: LevelNavLink[]
}

export type ProgramType = {
  slug: string
  /** Short level name, e.g. "NLP Practitioner". Also sent as the ViewContent name. */
  name?: string
  title?: string
  description?: string
  BannerData: BannerType
  LevelIntroWithVideoData : LevelIntroWithVideoType
  LevelCertificationData : LevelCertificationType
  ContentSectionData? : ContentSectionType
  LevelProgramIncludesData : LevelProgramIncludesType
  ContentSectionContentListData?: ContentSectionType
  LevelBenefitsTableData : LevelBenefitsTableType
  ContentSectionImgContentListData?: ContentSectionType
  LevelContentData : LevelContentType
  LevelGraduatesExperienceData : LevelGraduatesExperienceType
  /** "Where It Leads" copy block (Levels 1 to 3). */
  WhereItLeadsData?: ContentSectionType
  FaqData?: LevelFaq[]
  NavData?: LevelNavType
}

// Program-detail pages (spec C 07, step 1)
export type ProgramTypeInnerDetail = {
  slug: string
  seo?: { title: string; description: string; index: boolean; ogImage: string }
  BannerData: BannerType
  IntroData?: ContentSectionType
  LevelBenefitsTableData1 : LevelBenefitsTableType
  LevelBenefitsTableData2?: LevelBenefitsTableType
  LevelBenefitsTableData3?: LevelBenefitsTableType
}

// Course-outline pages (spec C 04, step 1)
export type CourseTypeInnerDetail = {
  slug: string
  seo?: { title: string; description: string; canonicalPath: string; ogImage: string }
  BannerData: BannerType
  IntroData?: ContentSectionType
  OutlineData?: LevelContentType
  LevelBenefitsTableData1?: LevelBenefitsTableType
  LevelBenefitsTableData2?: LevelBenefitsTableType
  LevelBenefitsTableData3?: LevelBenefitsTableType
}
