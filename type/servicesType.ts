import { BannerType } from "./bannerType"
import { ContentSectionType } from "./contentSection";
import { LevelProgramIncludesType } from "./levelProgramIncludes";


export type servicesType = {
  slug: string
  BannerData: BannerType
  ContentSectionData1?: ContentSectionType;
  ContentSectionImgContentListData?: ContentSectionType
  ContentSectionData2?: ContentSectionType;
  ContentSectionContentListData?: ContentSectionType;
  LevelProgramIncludesData?: LevelProgramIncludesType
}