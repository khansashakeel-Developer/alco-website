import { notFound } from "next/navigation";
import { programs } from "@/app/program/[slug]/data";
import type { ProgramType } from "@/type/programType";
import Banner from "@/component/banner";
import LevelIntroWithVideo from "@/component/levelIntroWithVideo";
import LevelCertification from "@/component/levelCertification";
import LevelBenefitsTable from "@/component/levelBenefitsTable";
import ContactInfo from "@/component/contactInfo";
import LevelProgramIncludes from "@/component/levelProgramIncludes";
import LevelContent from "@/component/levelContent";
import LevelGraduatesExperience from "@/component/levelGraduatesExperience";
import ContentSection from "@/component/contentSection";
import ViewContentTracker from "@/component/viewContentTracker";
import OurFaqs from "@/component/faqs";
import LevelNav from "@/component/levelNav";
import CtaButton from "@/component/CtaButton";
import CtaBand from "@/component/CtaBand";
import { waLine, type CtaRef } from "@/component/cta";

export default async function ProgramDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const program: ProgramType | undefined = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  // CTA plan, page to stage map.
  //   Level 1 and 2 (MoFu to BoFu): C1 in the banner; closing band C4 Enrol now + C2.
  //   Level 3 to 6 (interview or application, no instant enrol): C1 primary; C9 (next level) or C8 secondary.
  const level = programs.indexOf(program) + 1;
  const openEnrolment = level <= 2;
  const waMessage = waLine(`Level ${level}, ${program.name}`);
  const c1: CtaRef = { id: "C1", message: waMessage };
  const nextHref = program.NavData?.next?.href;
  const lateSecondary: CtaRef = nextHref ? { id: "C9", href: nextHref } : { id: "C8" };
  const midPrimary: CtaRef = openEnrolment ? { id: "C4" } : c1;
  const bannerData = {
    ...program.BannerData,
    children: (
      <>
        {program.BannerData.children}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <CtaButton id="C1" message={waMessage} variant="secondary" className="px-6" />
          {!openEnrolment && (
            <CtaButton id={lateSecondary.id} href={lateSecondary.href} variant="outlineWhite" className="px-6" />
          )}
        </div>
      </>
    ),
  };

  return (
    <div>
      <ViewContentTracker contentName={program.name} />
      <Banner data={bannerData} />
      <LevelIntroWithVideo data={program.LevelIntroWithVideoData} />
      <LevelCertification data={program.LevelCertificationData} />
      <ContentSection data={program.ContentSectionData} />
      <LevelProgramIncludes data={program.LevelProgramIncludesData} />
      <ContactInfo primary={midPrimary} secondary={openEnrolment ? c1 : undefined} />
      <ContentSection data={program.ContentSectionContentListData} />
      <LevelBenefitsTable data={program.LevelBenefitsTableData} />
      <ContentSection data={program.ContentSectionImgContentListData} />
      <LevelContent data={program.LevelContentData} />
      {/* "Where It Leads" (Levels 1 to 3). ContentSection renders nothing when data is undefined (contentSection.tsx:16). */}
      <ContentSection data={program.WhereItLeadsData} />
      {program.LevelGraduatesExperienceData?.video && (
        <LevelGraduatesExperience data={program.LevelGraduatesExperienceData} primary={midPrimary} />
      )}
      {/* OurFaqs renders nothing when data is empty (faqs.tsx:22). Default H2 "Your Questions Answered". */}
      <OurFaqs data={program.FaqData} />
      <LevelNav data={program.NavData} waMessage={waMessage} />
      {/* Closing band (CTA plan rule 2). */}
      {openEnrolment ? (
        <CtaBand
          title="Your Transformation Starts Here"
          text="Places are limited and cohorts are capped. Enrol now, or come to a free webinar first and meet us."
          primary={{ id: "C4" }}
          secondary={{ id: "C2" }}
        />
      ) : (
        <CtaBand
          title="Your Next Step Is a Conversation"
          text="This level is arranged directly with Bismillah Pervez and Arslan Larik. Your relationship manager will set up the conversation."
          primary={c1}
          secondary={lateSecondary}
        />
      )}
    </div>
  );
}
