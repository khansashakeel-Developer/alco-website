import { notFound } from "next/navigation";
import { about, personJsonLd } from "@/app/about-us/[slug]/data";
import Banner from "@/component/banner";
import LevelBenefitsTable from "@/component/levelBenefitsTable";
import Gallery from "@/component/gallery";
import ContentSection from "@/component/contentSection";
import OurFaqs from "@/component/faqs";
import ReasonsGrid from "@/component/reasonsGrid";
import CertificatesSection from "@/component/certificateSection";
import CtaBand from "@/component/CtaBand";
import { waLine } from "@/component/cta";

// CTA plan: Who is Arslan, Who is Bismillah, Why Train are MoFu. Closing band C1 + C2.
const ABOUT_CTA: Record<string, { title: string; about: string; text?: string }> = {
  "who-is-arslan-larik": { title: "Learn Directly from Arslan Larik", about: "training with Arslan Larik", text: "Ask about the next batch, or see the free webinar first." },
  "who-is-bismillah-pervez": { title: "Learn Directly from Bismillah Pervez", about: "training with Bismillah Pervez" },
  "why-train-with-alco": { title: "Your Transformation Starts with One Conversation", about: "training with AL&CO" },
};

export default async function About({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const About = about.find((p) => p.slug === slug);

  if (!About) return notFound();

  const { BannerData, CertificatesSectionData, LevelBenefitsTableData, galleryData, ContentSectionData1, ContentSectionData2, ContentSectionData4, ContentSectionDataFeatureImage, ContentSectionData3, FaqsData, FaqsHeading } = About;

  return (
    <div>
      <Banner data={BannerData} />
      {personJsonLd[slug] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd[slug]).replace(/</g, "\\u003c") }}
        />
      )}
      <ContentSection data={ContentSectionData1} />
      {CertificatesSectionData && (
      <CertificatesSection
        data={CertificatesSectionData.data}
        heading={CertificatesSectionData.heading}
        subheading={CertificatesSectionData.subheading}
        badge={CertificatesSectionData.badge}
      />
    )}
      <LevelBenefitsTable data={LevelBenefitsTableData} />
      <Gallery data={galleryData} />
      {slug === "why-train-with-alco"
        ? <ReasonsGrid items={FaqsData} title={FaqsHeading} />
        : <OurFaqs data={FaqsData} title={FaqsHeading} />}
      <ContentSection data={ContentSectionData2} />
      <ContentSection data={ContentSectionData3} />
      <ContentSection data={ContentSectionData4} />
      <ContentSection data={ContentSectionDataFeatureImage} />
      <CtaBand
        title={ABOUT_CTA[slug]?.title ?? "Your Transformation Starts with One Conversation"}
        text={ABOUT_CTA[slug]?.text}
        primary={{ id: "C1", message: waLine(ABOUT_CTA[slug]?.about ?? "training with AL&CO") }}
        secondary={{ id: "C2" }}
      />
    </div>
  );
}