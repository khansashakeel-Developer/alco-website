import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courseInnerDetail } from "./data";
import Banner from "@/component/banner";
import CtaBand from "@/component/CtaBand";
import { waLine } from "@/component/cta";
import ContentSection from "@/component/contentSection";
import LevelContent from "@/component/levelContent";

const SITE = "https://arslanlarik.com";

// CTA plan: course outlines are MoFu. Closing band C1 (prefilled with the level) + C3.
const LEVEL_NAME: Record<string, string> = {
  "nlp-practitioner": "Level 1, NLP Practitioner",
  "nlp-master-practitioner": "Level 2, NLP Master Practitioner",
  "advanced-hypnotherapy-interventionist": "Level 3, Advanced Hypnotherapy and Interventionist",
};

// Only the three known slugs exist; anything else is a real HTTP 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return courseInnerDetail.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = courseInnerDetail.find((c) => c.slug === slug)?.seo;
  if (!seo) return {};
  // Deliberate cross-page canonical to the level page (spec C 04, Decision).
  const canonical = `${SITE}${seo.canonicalPath}`;
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: "AL&CO",
      locale: "en_PK",
      type: "website",
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [seo.ogImage] },
    robots: { index: true, follow: true },
  };
}

export default async function CourseInnerDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courseInnerDetail.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <div>
      <Banner data={course.BannerData} />
      <ContentSection data={course.IntroData} />
      {course.OutlineData && <LevelContent data={course.OutlineData} />}
      <CtaBand
        title="Questions About This Outline?"
        text="A relationship manager will walk you through it and help you find the level that fits."
        primary={{ id: "C1", message: waLine(`the ${LEVEL_NAME[slug] ?? "course"} outline`) }}
        secondary={{ id: "C3" }}
      />
    </div>
  );
}
