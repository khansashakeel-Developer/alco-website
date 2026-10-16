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
import type { ReactNode } from "react";
import Reveal from "@/component/Reveal";
import LevelsExpandGallery from "@/component/LevelsExpandGallery";
import CurriculumRoute from "@/component/CurriculumRoute";

export default async function ProgramDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const program: ProgramType | undefined = programs.find(
    (p) => p.slug === slug,
  );
  if (!program) notFound();

  // CTA plan, page to stage map.
  //   Level 1 and 2 (MoFu to BoFu): C1 in the banner; closing band C4 Enrol now + C2.
  //   Level 3 to 6 (interview or application, no instant enrol): C1 primary; C9 (next level) or C8 secondary.
  const level = programs.indexOf(program) + 1;
  const openEnrolment = level <= 2;
  const waMessage = waLine(`Level ${level}, ${program.name}`);
  const c1: CtaRef = { id: "C1", message: waMessage };
  const nextHref = program.NavData?.next?.href;
  const lateSecondary: CtaRef = nextHref
    ? { id: "C9", href: nextHref }
    : { id: "C8" };
  const midPrimary: CtaRef = openEnrolment ? { id: "C4" } : c1;
  const bannerData = {
    ...program.BannerData,
    children: (
      <>
        {program.BannerData.children}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <CtaButton
            id="C1"
            message={waMessage}
            variant="secondary"
            className="px-6"
          />
          {!openEnrolment && (
            <CtaButton
              id={lateSecondary.id}
              href={lateSecondary.href}
              variant="outlineWhite"
              className="px-6"
            />
          )}
        </div>
      </>
    ),
  };

       // Fade-in on scroll, on every level.
  const Fade = ({ children }: { children: ReactNode }) => (
    <Reveal>{children}</Reveal>
  );

  return (
    <div>
      <ViewContentTracker contentName={program.name} />
      <Banner data={bannerData} />
      <Fade><LevelIntroWithVideo data={program.LevelIntroWithVideoData} /></Fade>
      <Fade><LevelCertification data={program.LevelCertificationData} /></Fade>
      <Fade><ContentSection data={program.ContentSectionData} /></Fade>
      <Fade><LevelProgramIncludes data={program.LevelProgramIncludesData} /></Fade>
      <Fade>
        <ContactInfo
          primary={midPrimary}
          secondary={openEnrolment ? c1 : undefined}
          bgVideo="/videos/alco-center.mp4"
        />
      </Fade>
      <Fade><ContentSection data={program.ContentSectionContentListData} /></Fade>
      <Fade><LevelBenefitsTable data={program.LevelBenefitsTableData} /></Fade>
      <Fade><ContentSection data={program.ContentSectionImgContentListData} /></Fade>
            {program.CurriculumData && <Fade><CurriculumRoute data={program.CurriculumData} /></Fade>}
      <Fade><LevelContent data={program.LevelContentData} /></Fade>
      {/* "Where It Leads" (Levels 1 to 3). ContentSection renders nothing when data is undefined (contentSection.tsx:16). */}
      <Fade><ContentSection data={program.WhereItLeadsData} /></Fade>
      {program.LevelGraduatesExperienceData?.video && (
        <Fade><LevelGraduatesExperience data={program.LevelGraduatesExperienceData} primary={midPrimary} /></Fade>
      )}
      {/* OurFaqs renders nothing when data is empty (faqs.tsx:22). Default H2 "Your Questions Answered". */}
      <Fade><OurFaqs data={program.FaqData} /></Fade>
      <Fade>
  <section className="w-full bg-white py-8 md:py-12 sm:px-4">
    <div className="container mx-auto px-4">
      <h2 className="h3 text-primary text-center">The Six Levels</h2>
      <p className="mx-auto mt-2 mb-8 max-w-2xl text-center text-gray-600">
        Hover a level to explore the next steps on the ladder.
      </p>
      <LevelsExpandGallery defaultLevel={level} />
    </div>
  </section>
</Fade>
      <Fade><LevelNav data={program.NavData} waMessage={waMessage} /></Fade>
      {/* Closing band (CTA plan rule 2). */}
      {openEnrolment ? (
        <Fade>
          <CtaBand
            title="Your Transformation Starts Here"
            text="Places are limited and cohorts are capped. Enrol now, or come to a free webinar first and meet us."
            primary={{ id: "C4" }}
            secondary={{ id: "C2" }}
          />
        </Fade>
      ) : (
        <Fade>
          <CtaBand
            title="Your Next Step Is a Conversation"
            text="This level is arranged directly with Bismillah Pervez and Arslan Larik. Your relationship manager will set up the conversation."
            primary={c1}
            secondary={lateSecondary}
          />
        </Fade>
      )}
    </div>
  );
}
