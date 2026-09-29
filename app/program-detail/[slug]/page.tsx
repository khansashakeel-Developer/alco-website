import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { programInnerDetail } from "./data";
import Banner from "@/component/banner";
import CtaBand from "@/component/CtaBand";
import { waLine } from "@/component/cta";
import ContentSection from "@/component/contentSection";
import LevelBenefitsTable from "@/component/levelBenefitsTable";

const SITE = "https://arslanlarik.com";

// CTA plan: programme detail pages are MoFu. Closing band C1 (prefilled with the level) + C3.
const LEVEL_NAME: Record<string, string> = {
  "benefits-of-choosing-nlp-training-course": "Level 1, NLP Practitioner",
  "how-nlp-master-practitioner-training-helps-you-in-your-life": "Level 2, NLP Master Practitioner",
  "benefits-of-advanced-hypnotherapy-interventionist-training": "Level 3, Advanced Hypnotherapy and Interventionist",
};

// Only the three known slugs exist; anything else is a real HTTP 404 (spec C 07 step 3).
export const dynamicParams = false;
export function generateStaticParams() {
  return programInnerDetail.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = programInnerDetail.find((p) => p.slug === slug)?.seo;
  const url = `${SITE}/program-detail/${slug}`;
  if (!seo) return { alternates: { canonical: url }, robots: { index: false, follow: true } };
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: "AL&CO",
      locale: "en_PK",
      type: "website",
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [seo.ogImage] },
    robots: { index: seo.index, follow: true },
  };
}

export default async function ProgramInnerDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programInnerDetail.find((p) => p.slug === slug);
  if (!program) notFound();

  return (
    <div>
      <Banner data={program.BannerData} />
      <ContentSection data={program.IntroData} />
      <LevelBenefitsTable data={program.LevelBenefitsTableData1} />
      <LevelBenefitsTable data={program.LevelBenefitsTableData2} />
      <LevelBenefitsTable data={program.LevelBenefitsTableData3} />
      <CtaBand
        title="See Whether This Level Fits You"
        text="A relationship manager will answer your questions and help you find the right rung to step on."
        primary={{ id: "C1", message: waLine(LEVEL_NAME[slug] ?? "AL&CO's programmes") }}
        secondary={{ id: "C3" }}
      />
    </div>
  );
}
