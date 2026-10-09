// Type
import { Brain, Mountain, Target, Compass, Users, Award, Handshake, Quote } from "lucide-react";
import Button from "@/component/button";
import CtaButton from "@/component/CtaButton";
import { BannerType } from "@/type/bannerType";


// Images
import BannerImage2 from "@/assets/about-us/who-is-bismillah-pervez.webp"
import BannerImage1 from "@/assets/about-us/who-is-arsalan-larik.webp"
import { AboutType } from "@/type/aboutType";
import { LevelBenefitsTableType } from "@/type/levelBenefitsTable";
import { GalleryItem } from "@/type/gallery";
import { ContentSectionType } from "@/type/contentSection";
import featuredImage1 from "@/assets/about-us/featured/Aaj-News.webp"
import featuredImage2 from "@/assets/about-us/featured/Bol-News.webp"
import featuredImage3 from "@/assets/about-us/featured/Dawn-News.webp"
import featuredImage4 from "@/assets/about-us/featured/Samaa-News.webp"
import programLevel2 from "@/assets/background/program-level-2.webp"
import GalleryBM2 from "@/assets/about-us/gallery-BM/gallery-2.webp"
import GalleryBM3 from "@/assets/about-us/gallery-BM/gallery-3.webp"
import GalleryBM4 from "@/assets/about-us/gallery-BM/gallery-4.webp"
import GalleryBM5 from "@/assets/about-us/gallery-BM/gallery-5.webp"
import GalleryBM6 from "@/assets/about-us/gallery-BM/gallery-6.webp"
import GalleryBM7 from "@/assets/about-us/gallery-BM/gallery-7.webp"
import GalleryBM8 from "@/assets/about-us/gallery-BM/gallery-8.webp"
import GalleryWTALCO1 from "@/assets/about-us/gallery-WTALCO/gallery-1.webp"
import GalleryWTALCO2 from "@/assets/about-us/gallery-WTALCO/gallery-2.webp"
import GalleryWTALCO3 from "@/assets/about-us/gallery-WTALCO/gallery-3.webp"
import GalleryWTALCO4 from "@/assets/about-us/gallery-WTALCO/gallery-4.webp"
import ThumbnailAL1 from "@/assets/thumbnail/about/who-is-AL.webp";
import ThumbnailBP1 from "@/assets/thumbnail/about/collerbration_BP_1.webp";
import ThumbnailBP2 from "@/assets/thumbnail/about/collerbration_BP_2.webp";
import ThumbnailBP3 from "@/assets/thumbnail/about/collerbration_BP_3.webp";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { CertificateItem } from "@/type/certificatetypes";
import certificate1 from "@/assets/certificate/bismillah/certificate_1.webp"
import certificate2 from "@/assets/certificate/bismillah/certificate_2.webp"
import certificate3 from "@/assets/certificate/bismillah/certificate_3.webp"
import cert1Level1 from "@/assets/level-certificate/certificate-1-level-1.webp"
import cert1Level2 from "@/assets/level-certificate/certificate-1-level-2.webp"
import cert1Level3 from "@/assets/level-certificate/certificate-1-level-3.webp"
import cert1Level4 from "@/assets/level-certificate/certificate-1-level-4.webp"
import cert1Level5 from "@/assets/level-certificate/certificate-1-level-5.webp"
// cert1Level6 (Bismillah card 9, removed under F2) stays in assets, unused.
import cert2Level1 from "@/assets/level-certificate/certificate-2-level-1.webp"
import cert2Level2 from "@/assets/level-certificate/certificate-2-level-2.webp"
import cert2Level3 from "@/assets/level-certificate/certificate-2-level-3.webp"
import cert3Level1 from "@/assets/level-certificate/certificate-3-level-1.webp"
import cert3Level2 from "@/assets/level-certificate/certificate-3-level-2.webp"
import cert3Level3 from "@/assets/level-certificate/certificate-3-level-3.webp"
import cert4Level3 from "@/assets/level-certificate/certificate-4-level-3.webp"
import cert5Level3 from "@/assets/level-certificate/certificate-5-level-3.webp"
import badgeABNLP from "@/assets/level-certificate/badges/abnlp.webp"
import badgeTLTA from "@/assets/level-certificate/badges/tlta.webp"
import badgeCDAB from "@/assets/level-certificate/badges/cdab.webp"
import badgeABH from "@/assets/level-certificate/badges/abh.webp"
import badgeNGH from "@/assets/level-certificate/badges/ngh.webp"
import badgeICFMCC from "@/assets/level-certificate/badges/icf-mcc.webp"
import badgeCPD from "@/assets/level-certificate/badges/cpd.webp"
import badgeALCO from "@/assets/level-certificate/badges/alco.webp"
import CertApprovedSchoolHypnosis from "@/assets/certificate/arslan_larik/Approved School of Hypnosis.webp"
import CertCertifiedCoachTrainer from "@/assets/certificate/arslan_larik/Certified Coach Trainer.webp"
import CertCoachTrainerBadge from "@/assets/certificate/arslan_larik/Certified Coach Trainer Badge.webp"
import CertHypnosisMasterBadge from "@/assets/certificate/arslan_larik/Certified Hypnosis Master Badge.webp"
import CertHypnosisMaster from "@/assets/certificate/arslan_larik/Certified Hypnosis Master_.webp"
import CertMasterTrainerNLP from "@/assets/certificate/arslan_larik/Certified Master Trainer of NLP.webp"
import CertMasterTrainerNLPBadge from "@/assets/certificate/arslan_larik/Certified Master Trainer of NLP Badge.webp"
import CertInstituteNLP from "@/assets/certificate/arslan_larik/Institute of NLP.webp"
import CertMasterTrainerMemberANLP from "@/assets/certificate/arslan_larik/Master Trainer Member of ANLP.webp"
import CertMasterTrainerNLP2 from "@/assets/certificate/arslan_larik/Master Trainer of NLP.webp"
import CertMasterTrainerNLPBadge2 from "@/assets/certificate/arslan_larik/Master Trainer of NLP Badge.webp"
import CertMasteryCoachingLevel3 from "@/assets/certificate/arslan_larik/Mastery Coaching Program Level 3.webp"
import CertSupervisorMemberANLP from "@/assets/certificate/arslan_larik/Supervisor Member of ANLP.webp"
import CertTrainerCoachMemberANLP from "@/assets/certificate/arslan_larik/Trainer and Coach Member of ANLP.webp"
import CertTrainerMasterTLT from "@/assets/certificate/arslan_larik/Trainer-Master of TLT.webp"
import CertTrainerMasterTLTBadge from "@/assets/certificate/arslan_larik/Trainer-Master of TLT Badge.webp"

type Faq = {
  question: string;
  answer: React.ReactNode;
};

// who-is-arslan-larik

// Seven per-board seal lines shared by the "Approved Excellence" block (B 03 row A19).
// DECISIONS v2 P7: seal artwork is the repo's existing board badges until Khansa supplies the
// current approved files (same files as homepage row A31).
const approvedBodies: { board: string; seal?: StaticImageData; text: string }[] = [
  // LOGO: ABNLP - Khansa to supply approved artwork
  { board: "ABNLP", seal: badgeABNLP, text: "ABNLP, the American Board of Neuro-Linguistic Programming. AL&CO is an ABNLP Approved Institute of NLP." },
  // LOGO: ABNLP Coaching Division - Khansa to supply approved artwork
  { board: "ABNLP Coaching Division", seal: badgeCDAB, text: "ABNLP Coaching Division. AL&CO is an Approved Institute of NLP Coaching." },
  // LOGO: ABH - Khansa to supply approved artwork
  { board: "ABH", seal: badgeABH, text: "ABH, the American Board of Hypnotherapy. AL&CO is an ABH Approved School of Hypnosis." },
  
  { board: "TLTA", seal: badgeTLTA, text: "TLTA, the Time Line Therapy Association, for your Time Line Therapy® Techniques credentials." },
  // LOGO: NGH - Khansa to supply approved artwork
  { board: "NGH", seal: badgeNGH, text: "NGH, the National Guild of Hypnotists (USA)." },
  // LOGO: ANLP (UK) - Khansa to supply approved artwork (ANLP CPD badge until then)
  { board: "ANLP (UK)", seal: badgeCPD, text: "ANLP, the Association for NLP (UK), which accredits Arslan as a trainer and provides your CPD accreditation." },
  // LOGO: AL&CO - Khansa to supply approved artwork
  { board: "AL&CO", seal: badgeALCO, text: "AL&CO, our own Certified Practitioner of Behavioral Reengineering." },
];

const bannerDataAL: BannerType = {
  title: {
    line1: "Arslan Larik",
    TagLine1Type: "h1",
    line2: `Founder and Master Trainer of NLP and Hypnosis`,
    TagLine2Type: "h2"
  },
  miniTitle: {
    line1: "Pakistan’s first Certified Master Trainer of NLP (ABNLP) and of Hypnosis (ABH)",
    line2: `ANLP Accredited Master Trainer (UK) and ANLP International Ambassador for Pakistan`
  },
  TagDescType: "p",
  // B 03 row A3 (PLEASE CHECK): grammar tidy of Arslan's own quote.
  description: `Everyone makes mistakes. Even I do. We are designed to make mistakes; that is what makes us human. But more power to those, only those, who learn from them, get back up more quickly and persevere with positivity.`,
  image: BannerImage1.src,
  height: "",
  className: "bg-no-repeat sm:bg-top sm:bg-cover",
  intoBanner: true,
  video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774603634/Arslan-video_rgwll0.mp4",
  thumbnail: ThumbnailAL1
};

// B 03 row A4: profile section directly after the banner. Carries his four master-trainer
// credentials (25 Sep rulings) and his lineage exactly as the brochure (P4).
const ContentSectionData1AL: ContentSectionType = {
  title: "About Arslan Larik",
  TagType: "h2",
  description: (
    <>
      <p className="my-4">
        Arslan Larik is Pakistan’s first Certified Master Trainer of NLP (ABNLP) and of Hypnosis (ABH), an ANLP Accredited Master Trainer in the United Kingdom, a Master Trainer of NLP University (NLPU) in California, under Robert Dilts, and ANLP’s International Ambassador for Pakistan. He is the founder and Managing Director of AL&CO and the architect of its curriculum.
      </p>
      <p className="my-4">
        His lineage runs to the source of the field. His master-trainer standing was earned through The Tad James Company, in the direct tradition of Dr Tad James and Dr Adriana James, and in 2025 he was recognised at NLP University under Robert Dilts, one of NLP’s founding figures, who called his ethos powerful and congruent. He teaches personally, live, most nights of the year.
      </p>
      <p className="my-4">
        He has trained and coached since 2010, and established Arslan Larik & Company as an institution in 2018.
      </p>
      <p className="my-4">
        His deeper mission is the one this institution serves: to produce more <Link href="/program/nlp-master-trainer-program" className="underline">trainers</Link>, so that empowerment spreads across the nation and beyond, one capable person at a time.
      </p>
    </>
  ),
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
  textAlign: "text-start"
}

// B 03 rows A5 to A11. DECISIONS v2 F6: no issue, award, validity or expiry date in any field.
const certificateDataAL: CertificateItem[] = [
  {
    id: "1",
    tabLabel: "ABNLP: Master Trainer",
    tag: "American Board of NLP",
    title: "Certified Master Trainer of NLP",
    organization: "American Board of Neuro-Linguistic Programming (ABNLP)",
    description:
      "Recognised as a Certified Master Trainer of NLP by the American Board of NLP, the highest NLP trainer designation it awards. Demonstrates mastery-level knowledge and proficiency in Neuro-Linguistic Programming training and facilitation.",
    duration: "American Board of NLP (ABNLP)",
    mode: "Membership No: N34570",
    accreditation: "Certified Master Trainer of NLP",
    badgeText: "ABNLP Certified Master Trainer of NLP",
    level: "advanced",
    image: CertMasterTrainerNLP,
    badgeImage: CertMasterTrainerNLPBadge,
    accreditedBadges: [badgeABNLP],
  },
  {
    id: "2",
    tabLabel: "ABNLP: NLP Institute",
    tag: "American Board of NLP",
    title: "ABNLP Approved Institute of Neuro Linguistic Programming",
    organization: "American Board of Neuro-Linguistic Programming (ABNLP)",
    description:
      "Arslan Larik & Company is certified as an ABNLP Approved Institute of Neuro-Linguistic Programming, confirming the institute meets all qualifications and training standards set by ABNLP to teach NLP programmes globally.",
    duration: "American Board of NLP (ABNLP)",
    mode: "Membership No: N34570",
    accreditation: "ABNLP Approved Institute of NLP",
    badgeText: "ABNLP Approved NLP Institute",
    level: "advanced",
    image: CertInstituteNLP,
    badgeImage: CertMasterTrainerNLPBadge2,
    accreditedBadges: [badgeABNLP],
  },
  {
    id: "3",
    tabLabel: "ABNLP: Coach Trainer",
    tag: "Coaching Division of ABNLP",
    title: "Certified Coach Trainer",
    organization: "Coaching Division of The American Board of NLP",
    description:
      "Certified as a Coach Trainer by the Coaching Division of the American Board of NLP. Demonstrates knowledge and proficiency in NLP-based coaching training at the highest international standard.",
    duration: "Coaching Division of the ABNLP",
    mode: "Membership No: N63747",
    accreditation: "Certified Coach Trainer",
    badgeText: "ABNLP Coaching Division: Certified Coach Trainer",
    level: "coaching",
    image: CertCertifiedCoachTrainer,
    badgeImage: CertCoachTrainerBadge,
    accreditedBadges: [badgeCDAB],
  },
  {
    id: "4",
    tabLabel: "ABNLP: Coaching Institute",
    tag: "Coaching Division of ABNLP",
    title: "ABNLP Approved Institute of NLP-Coaching",
    organization: "Coaching Division of The American Board of NLP",
    description:
      "Arslan Larik & Company is certified as an ABNLP Approved Institute of Neuro-Linguistic Programming Coaching, confirming the institute holds the qualifications and training necessary to teach NLP Coaching programmes.",
    duration: "Coaching Division of the ABNLP",
    mode: "Membership No: N63747",
    accreditation: "Approved Institute of NLP Coaching",
    badgeText: "ABNLP Approved NLP-Coaching Institute",
    level: "coaching",
    image: CertInstituteNLP,
    accreditedBadges: [badgeCDAB],
  },
  {
    id: "5",
    tabLabel: "ABH: Hypnosis Master Trainer",
    tag: "American Board of Hypnotherapy",
    title: "Certified Hypnosis Master Trainer",
    organization: "American Board of Hypnotherapy (ABH)",
    description:
      "Certified as a Hypnosis Master Trainer by the American Board of Hypnotherapy, one of the most respected hypnosis credentials internationally. Demonstrates mastery in hypnosis techniques, induction and advanced applications.",
    duration: "American Board of Hypnotherapy (ABH)",
    mode: "Certificate No: H37708",
    accreditation: "Certified Hypnosis Master Trainer",
    badgeText: "ABH Certified Hypnosis Master Trainer",
    level: "clinical",
    image: CertHypnosisMaster,
    badgeImage: CertHypnosisMasterBadge,
    accreditedBadges: [badgeABH],
  },
  {
    id: "6",
    tabLabel: "ABH: Approved School",
    tag: "American Board of Hypnotherapy",
    title: "ABH Approved School of Hypnosis",
    organization: "American Board of Hypnotherapy (ABH)",
    description:
      "Arslan Larik & Company is recognised as an ABH Approved School of Hypnosis in good standing, entitled to all the privileges and rights of an internationally accredited hypnosis training institution.",
    duration: "American Board of Hypnotherapy (ABH)",
    mode: "Certificate No: H37708",
    accreditation: "ABH Approved School of Hypnosis",
    badgeText: "ABH Approved School of Hypnosis",
    level: "clinical",
    image: CertApprovedSchoolHypnosis,
    accreditedBadges: [badgeABH],
  },
  {
    id: "7",
    tabLabel: "ANLP: Master Trainer",
    tag: "ANLP International CIC",
    title: "ANLP Accredited Master Trainer (UK)",
    organization: "The Global Association for NLP (ANLP)",
    description:
      "Recognised as a Master Trainer Member of ANLP International CIC, the Association for NLP in the United Kingdom. Reflects a deep commitment to excellence, professional integrity and ethical NLP practice.",
    duration: "ANLP (UK)",
    mode: "ANLP Master Trainer Member",
    accreditation: "ANLP International CIC",
    badgeText: "ANLP Master Trainer Member",
    level: "advanced",
    image: CertMasterTrainerMemberANLP,
    accreditedBadges: [badgeCPD],
  },
  {
    id: "8",
    tabLabel: "ANLP: Trainer and Coach",
    tag: "ANLP International CIC",
    title: "Trainer and Coach Member, ANLP International CIC",
    organization: "The Global Association for NLP (ANLP)",
    description:
      "Admitted as a Trainer and Coach Member of ANLP International CIC, confirming professional standing as an ethical, credible, and proficient NLP Trainer and Coach committed to the ANLP Code of Ethics.",
    duration: "ANLP (UK)",
    mode: "ANLP Trainer and Coach Member",
    accreditation: "ANLP International CIC",
    badgeText: "ANLP Trainer and Coach Member",
    level: "coaching",
    image: CertTrainerCoachMemberANLP,
    accreditedBadges: [badgeCPD],
  },
  {
    id: "9",
    tabLabel: "ANLP: Supervisor",
    tag: "ANLP International CIC",
    title: "Supervisor Member, ANLP International CIC",
    organization: "The Global Association for NLP (ANLP)",
    description:
      "Recognised as a Supervisor Member of ANLP International CIC, demonstrating advanced competence in NLP supervision, ethical oversight, and professional development of NLP practitioners and coaches.",
    duration: "ANLP (UK)",
    mode: "ANLP Supervisor Member",
    accreditation: "ANLP International CIC",
    badgeText: "ANLP Supervisor Member",
    level: "advanced",
    image: CertSupervisorMemberANLP,
    accreditedBadges: [badgeCPD],
  },
  {
    id: "10",
    tabLabel: "TLTA: Trainer",
    tag: "Time Line Therapy Association",
    title: "Trainer and Master Practitioner of Time Line Therapy® Techniques",
    organization: "Time Line Therapy Association (TLTA)",
    description:
      "Certified as a Trainer and Master Practitioner of Time Line Therapy® Techniques, with advanced proficiency in releasing negative emotions and limiting decisions and in creating a compelling future.",
    duration: "Certificate No: T52607",
    mode: "Time Line Therapy Association (TLTA)",
    accreditation: "Time Line Therapy® Techniques",
    badgeText: "TLTA Trainer and Master Practitioner",
    level: "therapy",
    image: CertTrainerMasterTLT,
    badgeImage: CertTrainerMasterTLTBadge,
    accreditedBadges: [badgeTLTA],
  },
  {
    id: "11",
    tabLabel: "Coacharya: Level 3",
    tag: "Certificate of Completion",
    title: "Coach to Lead, Mastery Coaching Program Level 3",
    organization: "Coacharya",
    description:
      "Successfully completed all requirements of Coacharya's Level 3 Mastery Coaching Program, totalling 90 hours inclusive of 75 hours of Accredited Coach Education and 15 hours of Mentor Coaching.",
    duration: "Coacharya Coach Education, Level 3",
    mode: "90 hours: 75 ACE plus 15 Mentor Coaching",
    accreditation: "Coacharya",
    badgeText: "Coacharya, Level 3",
    level: "coaching",
    image: CertMasteryCoachingLevel3,
    // B 03 row A11 and the 25 Sep ruling: ICF appears only with Bismillah, so no ICF seal or
    // ICF wording on Arslan's card (spec wording "ICF Accredited" removed from duration and badgeText).
    accreditedBadges: [],
  },
]

const CertificatesSectionDataAL = {
  data: certificateDataAL,
  heading: "Arslan Larik’s Certifications",
  subheading: "Internationally recognised credentials in NLP, coaching, Time Line Therapy® Techniques and hypnosis",
  badge: "Certifications",
}

const LevelBenefitsTableDataAL: LevelBenefitsTableType = {
  introPage: true,

  bgColor: "bg-dark-primary",
  title: {
    line1: "A Legacy of Excellence and Mastery",
    TagLine1Type: "h2",
    line2: `Arslan Larik’s standing is backed by international boards, and by a lineage that runs to the source of the field:`,
    TagLine2Type: "p",
    line2Class: "text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2",
  },

  headers: [
  ],

  points: [
    // B 03 row A15: new rows at the top (25 Sep rulings: NLPU; P4 lineage).
    {
      content: "ANLP Accredited Master Trainer, Association for NLP (UK)",
      values: [
        "ANLP International Ambassador for Pakistan",
      ],
    },
    {
      content: "Master Trainer of NLP University (NLPU), under Robert Dilts, California (recognised 2025)",
      values: [
        "Master-trainer standing earned through The Tad James Company, in the tradition of Dr Tad James and Dr Adriana James",
      ],
    },
    {
      content: "Pakistan’s first Certified Master Trainer of NLP, American Board of NLP (ABNLP)",
      values: [
        "Pakistan’s first Certified Master Trainer of Hypnosis, American Board of Hypnotherapy (ABH)",
      ],
    },
    {
      content: "Certified Instructor of Hypnosis via National Guild of Hypnotists (NGH-USA)",
      values: [
        "Trainer and Master Practitioner of Time Line Therapy® Techniques, Time Line Therapy Association (TLTA)",
      ],
    },
    {
      content: "Certified Coach Trainer via The Coaching Division of ABNLP, USA",
      values: [
        "Certified Hypnotherapist via NGH (National Guild of Hypnotists, USA)",
      ],
    },
    {
      content: "Diploma of Hypnotherapy via ABH (American Board of Hypnotherapy, USA)",
      values: [
        "Certified Master Practitioner via ABH (American Board of Hypnotherapy, USA)",
      ],
    },
    {
      content: "Certified Practitioner via ABH (American Board of Hypnotherapy, USA)",
      values: [
        "Master Hypnotist via Banyan Hypnosis Center,USA",
      ],
    },
    {
      content: "5-Path® Hypnotherapist via Banyan Hypnosis Center, USA",
      values: [
        "7th Path Self-Hypnosis Teacher via Banyan Hypnosis Center, USA",
      ],
    },
    // B 03 row A17 (PLEASE CHECK, Arslan): board-member rows kept unchanged until confirmed.
    {
      content: "Hypnotherapy Certification Training via ABH (NLP Top Coach Thailand)",
      values: [
        "Board Member of The American Board of NLP",
      ],
    },
    {
      content: "Board Member of National Guild of Hypnotists",
      values: [
        "Board Member of The American Board of Hypnotherapy",
      ],
    },
    {
      content: "Member of 5-Path® International Association of Hypnosis Professionals",
      values: [
        "",
      ],
    },
  ],


};

const ContentSectionData2AL: ContentSectionType = {
  title: "An Authority in Transformation",
  TagType: "h2",
  description: (
    <>
      <p className="my-4">
        As the <strong>Master Trainer and Managing Director of AL&CO,</strong> Arslan has set new standards in coaching, training, and personal development. His dynamic, results-driven programs equip participants with the tools to:
      </p>
      {/* Four outcomes as tiles. Hover: tile lifts, border turns yellow, icon box turns yellow. */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 my-6">
        {[
          { Icon: Brain, text: "Master their Minds and Emotions." },
          { Icon: Mountain, text: "Overcome Personal and Professional Limitations." },
          { Icon: Target, text: "Achieve extraordinary goals." },
          { Icon: Compass, text: "Lead with purpose and authenticity." },
        ].map(({ Icon, text }) => (
          <li
            key={text}
            className="group flex flex-col gap-4 rounded-xl bg-white p-5 border border-slate-200 border-b-4 border-b-primary/20 shadow-sm transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1.5 hover:shadow-xl hover:border-b-secondary"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white transition-all duration-300 group-hover:bg-secondary group-hover:text-primary-darkest group-hover:scale-110 group-hover:-rotate-6">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <span className="font-outfit text-lg font-semibold text-primary leading-snug">{text}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 mb-4">
        He teaches personally, live on Zoom, from 8:00pm to 2:00am Pakistan time. Together with Bismillah Pervez he has taught:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { value: "2,000+", label: "graduates" },
          { value: "20+", label: "countries" },
          { value: "Nearly 100", label: "batches delivered, and counting" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-primary-darkest px-6 py-5 text-white shadow-md transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1.5 hover:shadow-xl"
          >
            <div className="font-outfit text-3xl lg:text-4xl font-bold text-secondary">{s.value}</div>
            <div className="mt-1 text-white/90">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-6">
        See the <Link href="/programs" className="underline">six levels</Link>.
      </p>
    </>
  ),
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
  textAlign: "text-start"
}

const ContentSectionData3AL: ContentSectionType = {
  title: "Approved Excellence at AL&CO",
  TagType: "h2",
  description: (
    <>
      <p className="my-4">
        Your certificates are worth exactly as much as the bodies behind them. AL&CO trains and certifies through:
      </p>
      {/* One card per board. AL&CO's own credential closes the grid as a full-width dark card. */}
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 my-6">
        {approvedBodies.map((b) => {
          const own = b.board === "AL&CO";
          return (
            <li
              key={b.board}
              className={`group relative overflow-hidden flex items-center gap-5 rounded-xl p-5 lg:p-6 shadow-md transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1.5 hover:shadow-2xl ${
                own ? "md:col-span-2 xl:col-span-3 bg-primary-darkest text-white" : "bg-white border border-slate-200"
              }`}
            >
              <span className="absolute left-0 top-0 h-full w-1.5 bg-secondary origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none" />
              {b.seal ? (
                <span className="shrink-0 flex h-20 w-20 items-center justify-center rounded-full bg-white p-2 ring-1 ring-slate-200 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none">
                  <Image src={b.seal} alt={`${b.board} seal`} width={64} height={64} className="object-contain" />
                </span>
              ) : (
                <span
                  className="shrink-0 flex h-20 w-20 items-center justify-center rounded-full bg-white ring-1 ring-primary/30 font-outfit text-sm font-bold text-primary transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  {b.board}
                </span>
              )}
              <div>
                <div className={`font-outfit text-xs font-semibold uppercase tracking-widest ${own ? "text-secondary" : "text-secondary-darkest"}`}>
                  {b.board}
                </div>
                <p className={`mt-1 ${own ? "text-white/90" : "text-gray-700"}`}>{b.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex items-center gap-4 rounded-xl border border-secondary/40 bg-secondary/10 p-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary-darkest">
          <Users className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <p className="font-medium text-primary">
        At AL&CO you join a global community of 2,000+ graduates, with free revisits of Levels 1 to 3 for five years.
        </p>
      </div>
    </>
  ),
  padding: "pb-6 md:pb-8 lg:pb-12 xl:pb-16 ",
  textAlign: "text-start"
}

// B 03 row A21: replaces the duplicate "An Authority in Transformation" block.
const ContentSectionData4AL: ContentSectionType = {
  title: "Learn from Two Master Trainers",
  TagType: "h2",
  description: (
    <div className="max-w-6xl mx-auto">
      <p className="my-4">
        When you train at AL&CO you learn inside an institution led by two certified trainers, which is what makes it a school and not one person with a following. Arslan teaches alongside Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK), the first Master Trainer AL&CO has produced.
      </p>
    </div>
  ),
  button: {
    text: "Meet Bismillah Pervez",
    link: "/about-us/who-is-bismillah-pervez"
  },
  fullBg: "bg-neutral-100 ",
  padding: "pt-6 md:pt-8 lg:pt-12 xl:pt-16 pb-2 md:pb-4 lg:pb-6",
}

// who-is-bismillah-pervez

// B 04 row A1 / DECISIONS v2 F2: her standard line. Never "Psychologist" as a title, never "ABNLP Master Trainer".
const bannerDataBP: BannerType = {
  title: {
    line1: "Bismillah Pervez",
    TagLine1Type: "h1",
    line2: `CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK)`,
    TagLine2Type: "h2"
  },
  description: `The greatest minds are not those who
know everything or are born with
perfection, but those who are always
open to learning and adapting
their mindset.`,
  TagDescType: "p",
  image: BannerImage2.src,
  height: "",
  className: "bg-no-repeat sm:bg-top sm:bg-cover",
  intoBanner: true
};

// B 04 row A3: profile section directly after the banner.
const ContentSectionData1BP: ContentSectionType = {
  title: "About Bismillah Pervez",
  TagType: "h2",
  description: (
    <>
      <p className="my-4 text-lg lg:text-xl font-light text-primary">
        Bismillah Pervez is the Chief Executive of AL&CO and an established trainer at the front of the room.
      </p>

      {/* Credentials as cards. Hover: card lifts and a yellow bar grows down the left edge. */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 my-6">
        {[
          { org: "ICF", title: "Master Certified Coach (MCC)", note: "The highest coaching designation the International Coaching Federation awards" },
          { org: "ICF", title: "Advanced Certification in Team Coaching (ACTC)" },
          { org: "ABNLP", title: "Certified NLP Trainer and Master NLP Coach" },
          { org: "ANLP (UK)", title: "Accredited Master Trainer" },
          { org: "TLTA", title: "Master Practitioner of Time Line Therapy® Techniques" },
          { org: "ABH", title: "Master Practitioner of Hypnosis" },
          { org: "NGH", title: "Hypnotherapist" },
          { org: "Academic", title: "Bachelor’s degree in psychology" },
          { org: "Academic", title: "Master’s degree in education" },
        ].map((c) => (
          <li
            key={c.org + c.title}
            className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 p-5 shadow-sm transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1.5 hover:shadow-xl"
          >
            <span className="absolute left-0 top-0 h-full w-1.5 bg-secondary origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none" />
            <div className="font-outfit text-xs font-semibold uppercase tracking-widest text-secondary-darkest">{c.org}</div>
            <div className="mt-1 font-outfit text-lg font-semibold leading-snug text-primary">{c.title}</div>
            {c.note && <p className="mt-2 text-sm text-gray-600">{c.note}</p>}
          </li>
        ))}
      </ul>
      <p className="my-4">
        So she brings academic depth as well as professional credentials.
      </p>

      {/* Highlight card */}
      <div className="group relative overflow-hidden my-8 rounded-xl bg-primary-darkest p-6 lg:p-8 text-white shadow-md transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-2xl">
        <span className="absolute left-0 top-0 h-full w-1.5 bg-secondary origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none" />
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary-darkest transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
            <Award className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-white/90">
              She is the first woman in Pakistan to hold the ICF Master Certified Coach designation, its Advanced Certification in Team Coaching, and her ANLP accredited trainer standing, all three together.
            </p>
            <p className="mt-3 font-outfit text-lg font-semibold text-secondary">
              Her belief is simple and demanding: empowerment begins with modelling the very best.
            </p>
          </div>
        </div>
      </div>

      {/* Applicant note */}
      <div className="flex items-start gap-4 rounded-xl border border-secondary/40 bg-secondary/10 p-5 lg:p-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
          <Handshake className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <p>
          Every applicant to our Trainer levels, <Link href="/program/nlp-trainers-training-program" className="underline">NLP Train the Trainer</Link> and <Link href="/program/hypnosis-trainers-training-program" className="underline">Hypnosis Train the Trainer</Link>, meets Bismillah in person before a place is offered, and Levels 3 and above are arranged directly with her and Arslan Larik.
        </p>
      </div>
    </>
  ),
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
  textAlign: "text-start"
}

// B 04 rows A4b to A6. DECISIONS v2 F6: no dates in any field. F2: card 9 ("Certified Master
// Trainer of NLP, Year 1 of 3", ABNLP wording) removed; its image file stays in assets (unused).
export const certificateDataBP: CertificateItem[] = [

  // ICF Certifications
  {
    id: "1",
    tabLabel: "ICF: MCC",
    tag: "International Coaching Federation",
    title: "Master Certified Coach (MCC)™",
    organization: "ICF Credentials and Standards",
    description:
      "The highest ICF coaching designation, earned by demonstrating knowledge and proficient use of core coaching skills through a comprehensive application and evaluation process, ensuring the highest standards for the coaching profession.",
    duration: "International Coaching Federation (ICF)",
    mode: "Master Certified Coach (MCC)",
    accreditation: "ICF, International Coaching Federation",
    badgeText: "ICF Master Certified Coach (MCC)™",
    level: "advanced",
    image: certificate1,
    // LOGO: ICF MCC - shown once on this page (card 1 only). Khansa to confirm the current approved artwork.
    accreditedBadges: [badgeICFMCC],
  },
  {
    id: "2",
    tabLabel: "ANLP: Accredited Trainer",
    tag: "ANLP International CIC",
    title: "Accredited Trainer, ANLP International CIC",
    organization: "The Global Association for NLP",
    description:
      "Admitted as an Accredited Trainer of ANLP International CIC, upholding the highest standards of ethical, professional, and credible NLP practice. Committed to the ANLP Code of Ethics in all coaching and training work.",
    duration: "ANLP (UK)",
    mode: "ANLP Accredited",
    accreditation: "ANLP International CIC",
    badgeText: "ANLP Accredited Trainer",
    level: "advanced",
    image: certificate2,
    accreditedBadges: [badgeCPD],
  },
  {
    id: "3",
    tabLabel: "ANLP: Master Trainer",
    tag: "ANLP International CIC",
    title: "ANLP Accredited Master Trainer (UK)",
    organization: "The Global Association for NLP",
    description:
      "Recognised as a Master Trainer Member of ANLP International CIC, one of the most respected NLP trainer designations. Reflects excellence, integrity, and a deep commitment to the NLP profession.",
    duration: "ANLP (UK)",
    mode: "ANLP Master Trainer Member",
    accreditation: "ANLP International CIC",
    badgeText: "ANLP Accredited Master Trainer (UK)",
    level: "advanced",
    image: certificate3,
    accreditedBadges: [badgeCPD],
  },

  // NLP Certificates (ABNLP)
  {
    id: "4",
    tabLabel: "NLP Practitioner",
    tag: "American Board of NLP (ABNLP)",
    title: "Certified Practitioner of Neuro Linguistic Programming",
    organization: "Arslan Larik & Company (AL&CO) · ABNLP",
    description:
      "Has completed the 130-hour Practitioner Training in Neuro Linguistic Programming and has demonstrated the highest degree of competence and skill. Conferred by Arslan Larik & Company (AL&CO) and The American Board of NLP (ABNLP).",
    duration: "Conferred by AL&CO and ABNLP",
    mode: "130-Hour Practitioner Training",
    accreditation: "American Board of NLP (ABNLP)",
    badgeText: "ABNLP Certified NLP Practitioner",
    level: "foundation",
    image: cert1Level1,
    accreditedBadges: [badgeABNLP, badgeALCO],
  },
  {
    id: "5",
    tabLabel: "NLP Master Practitioner",
    tag: "American Board of NLP (ABNLP)",
    title: "Certified Master Practitioner of Neuro Linguistic Programming",
    organization: "Arslan Larik & Company (AL&CO) · ABNLP",
    description:
      "Has completed the 140-hour Master Practitioner Training in Neuro Linguistic Programming and has demonstrated the highest degree of competence and skill. Conferred by Arslan Larik & Company (AL&CO) and The American Board of NLP (ABNLP).",
    duration: "Conferred by AL&CO and ABNLP",
    mode: "140-Hour Master Practitioner Training",
    accreditation: "American Board of NLP (ABNLP)",
    badgeText: "ABNLP Certified NLP Master Practitioner",
    level: "advanced",
    image: cert1Level2,
    accreditedBadges: [badgeABNLP, badgeALCO],
  },
  {
    id: "6",
    tabLabel: "Hypnosis Practitioner",
    tag: "American Board of Hypnotherapy (ABH)",
    title: "Certified Practitioner of Hypnosis",
    organization: "Arslan Larik & Company (AL&CO) · ABH",
    description:
      "Has completed the 130-hour Practitioner Training in Hypnosis and has demonstrated the highest degree of competence and skill. Conferred by Arslan Larik & Company (AL&CO) and The American Board of Hypnotherapy (ABH).",
    duration: "Conferred by AL&CO and ABH",
    mode: "130-Hour Practitioner Training",
    accreditation: "American Board of Hypnotherapy (ABH)",
    badgeText: "ABH Certified Practitioner of Hypnosis",
    level: "foundation",
    image: cert1Level3,
    accreditedBadges: [badgeABH, badgeALCO],
  },
  {
    // B 04 row A5 (PLEASE CHECK, Arslan): wording unchanged until the Trainer's Training source is confirmed.
    id: "7",
    tabLabel: "NLP Trainer",
    tag: "American Board of NLP (ABNLP)",
    title: "Certified Trainer of Neuro-Linguistic Programming",
    organization: "Arslan Larik & Company (AL&CO) · ABNLP",
    description:
      "Has completed the 165-hour NLP Trainer's Certification Training in Neuro-Linguistic Programming and has demonstrated the highest degree of competence and skill. Conferred by Arslan Larik & Company (AL&CO) and Master Trainer Arslan Larik.",
    duration: "Conferred by AL&CO",
    mode: "165-Hour Trainer Certification Training",
    accreditation: "American Board of NLP (ABNLP)",
    badgeText: "ABNLP Certified Trainer of NLP",
    level: "advanced",
    image: cert1Level4,
    accreditedBadges: [badgeABNLP, badgeALCO],
  },
  {
    id: "8",
    tabLabel: "Hypnosis Trainer",
    tag: "American Board of Hypnotherapy (ABH)",
    title: "Certified Trainer of Hypnosis",
    organization: "Arslan Larik & Company (AL&CO) · ABH",
    description:
      "Has successfully completed the Trainer's Evaluation & Certification Training in Hypnosis and has demonstrated the highest degree of competence and skill. Conferred by Arslan Larik & Company (AL&CO) and Master Trainer Arslan Larik.",
    duration: "Conferred by AL&CO",
    mode: "Trainer's Evaluation & Certification",
    accreditation: "American Board of Hypnotherapy (ABH)",
    badgeText: "ABH Certified Trainer of Hypnosis",
    level: "advanced",
    image: cert1Level5,
    accreditedBadges: [badgeABH, badgeALCO],
  },

  // Time Line Therapy Certificates (TLTA)

  {
    id: "10",
    tabLabel: "TLT Practitioner",
    tag: "Time Line Therapy Association (TLTA)",
    title: "Certified Practitioner of Time Line Therapy® Techniques",
    organization: "Arslan Larik & Company (AL&CO) · TLTA",
    description:
      "Has completed the 130-hour Practitioner Training in Neuro Linguistic Programming and has demonstrated the highest degree of competence and skill. Conferred by Arslan Larik & Company (AL&CO) and Time Line Therapy Association (TLTA).",
    duration: "Conferred by AL&CO and TLTA",
    mode: "130-Hour Practitioner Training",
    accreditation: "Time Line Therapy Association (TLTA)",
    badgeText: "TLTA Certified Practitioner of Time Line Therapy® Techniques",
    level: "therapy",
    image: cert2Level1,
    accreditedBadges: [badgeTLTA, badgeALCO],
  },
  {
    id: "11",
    tabLabel: "TLT Master Practitioner",
    tag: "Time Line Therapy Association (TLTA)",
    title: "Certified Master Practitioner of Time Line Therapy® Techniques",
    organization: "Arslan Larik & Company (AL&CO) · TLTA",
    description:
      "Has completed the 140-hour Master Practitioner Training in Neuro Linguistic Programming and has demonstrated the highest degree of competence and skill. Conferred by Arslan Larik & Company (AL&CO) and Time Line Therapy Association (TLTA).",
    duration: "Conferred by AL&CO and TLTA",
    mode: "140-Hour Master Practitioner Training",
    accreditation: "Time Line Therapy Association (TLTA)",
    badgeText: "TLTA Certified Master Practitioner of Time Line Therapy® Techniques",
    level: "therapy",
    image: cert2Level2,
    accreditedBadges: [badgeTLTA, badgeALCO],
  },
  {
    id: "12",
    tabLabel: "Hypnosis Master Practitioner",
    tag: "American Board of Hypnotherapy (ABH)",
    title: "Certified Master Practitioner of Hypnosis",
    organization: "Arslan Larik & Company (AL&CO) · ABH",
    description:
      "Has completed the 140-hour Master Practitioner Training in Hypnosis and has demonstrated the highest degree of competence and skill. Conferred by Arslan Larik & Company (AL&CO) and The American Board of Hypnotherapy (ABH).",
    duration: "Conferred by AL&CO and ABH",
    mode: "140-Hour Master Practitioner Training",
    accreditation: "American Board of Hypnotherapy (ABH)",
    badgeText: "ABH Certified Master Practitioner of Hypnosis",
    level: "clinical",
    image: cert2Level3,
    accreditedBadges: [badgeABH, badgeALCO],
  },

  // NLP Coaching Certificates (ABNLP Coaching Division)
  {
    id: "13",
    tabLabel: "NLP Coach",
    tag: "Coaching Division of The American Board of NLP (ABNLP)",
    title: "Certified NLP Coach",
    organization: "Arslan Larik & Company (AL&CO) · ABNLP Coaching Division",
    description:
      "Has completed the 130-hour Practitioner Training in Neuro Linguistic Programming and has demonstrated the highest degree of competence and skill. Conferred by Arslan Larik & Company (AL&CO) and Coaching Division of The American Board of NLP (ABNLP).",
    duration: "Conferred by AL&CO and the ABNLP Coaching Division",
    mode: "130-Hour Practitioner Training",
    accreditation: "Coaching Division of ABNLP",
    badgeText: "ABNLP Certified NLP Coach",
    level: "coaching",
    image: cert3Level1,
    accreditedBadges: [badgeCDAB, badgeALCO],
  },
  {
    id: "14",
    tabLabel: "NLP Master Coach",
    tag: "Coaching Division of The American Board of NLP (ABNLP)",
    title: "Certified NLP Master Coach",
    organization: "Arslan Larik & Company (AL&CO) · ABNLP Coaching Division",
    description:
      "Has completed the 140-hour Master Practitioner Training in Neuro Linguistic Programming and has demonstrated the highest degree of competence and skill. Conferred by Arslan Larik & Company (AL&CO) and Coaching Division of The American Board of NLP (ABNLP).",
    duration: "Conferred by AL&CO and the ABNLP Coaching Division",
    mode: "140-Hour Master Practitioner Training",
    accreditation: "Coaching Division of ABNLP",
    badgeText: "ABNLP Certified NLP Master Coach",
    level: "coaching",
    image: cert3Level2,
    accreditedBadges: [badgeCDAB, badgeALCO],
  },

  // AH&I Quintuple Certification
  {
    id: "15",
    tabLabel: "AH&I: Quintuple Certification",
    tag: "Arslan Larik & Company (AL&CO)",
    title: "Advanced Hypnotherapy and Interventionist (AH&I): Quintuple Certification",
    organization: "Arslan Larik & Company (AL&CO)",
    description:
      "Awarded to graduates having completed Quintuple Certification and are a part of the ongoing Journey of Mastery. Has completed the prescribed course of study in Advanced Hypnotherapy and Interventionist (AH&I), demonstrating the ability to skillfully perform NLP Interventions, Time Line Therapy® Techniques, Coaching Skills, and Hypnosis.",
    duration: "Testament To The Graduate",
    mode: "Advanced Hypnotherapy & Interventionist Curriculum",
    accreditation: "ABNLP · TLTA · ABNLP Coaching Division · ABH · NGH",
    badgeText: "AL&CO Quintuple Certified, AH&I Graduate",
    level: "advanced",
    image: cert3Level3,
    accreditedBadges: [
      badgeABNLP,
      badgeCDAB,
      badgeTLTA,
      badgeABH,
      badgeNGH,
      badgeALCO,
    ],
  },

  // National Guild of Hypnotists
  {
    id: "16",
    tabLabel: "NGH: Certified Hypnotherapist",
    tag: "National Guild of Hypnotists, Inc.",
    title: "Certified Hypnotherapist, National Guild of Hypnotists",
    organization: "National Guild of Hypnotists, Inc. · Merrimack, New Hampshire",
    description:
      "Having satisfactorily completed the required studies, has been found by the Board of Directors to possess the qualifications required by Constitutional bylaws, and is hereby registered as a Certified Hypnotherapist by the National Guild of Hypnotists, Inc.",
    duration: "Registered by the NGH",
    mode: "Required studies completed",
    accreditation: "National Guild of Hypnotists, Inc. (NGH)",
    badgeText: "NGH Certified Hypnotherapist",
    level: "clinical",
    image: cert4Level3,
    accreditedBadges: [badgeNGH],
  },
  {
    id: "17",
    tabLabel: "NGH: Member in Good Standing",
    tag: "National Guild of Hypnotists, Inc.",
    title: "Certified Hypnotherapist, Member in Good Standing",
    organization: "National Guild of Hypnotists, Inc.",
    description:
      "Recognised as a Certified Hypnotherapist and Member in Good Standing of the National Guild of Hypnotists, Inc., one of the oldest and most respected hypnosis bodies in the world.",
    duration: "National Guild of Hypnotists (NGH)",
    mode: "Member in Good Standing",
    accreditation: "National Guild of Hypnotists, Inc. (NGH)",
    badgeText: "NGH Member in Good Standing",
    level: "clinical",
    image: cert5Level3,
    accreditedBadges: [badgeNGH],
  },
]

const CertificatesSectionData = {
  data: certificateDataBP,
  heading: "Bismillah Pervez’s Certifications",
  subheading: "International credentials in coaching, NLP, Time Line Therapy® Techniques and hypnosis",
  badge: "Certifications",
}

// B 04 rows A7 to A14.
const LevelBenefitsTableDataBP: LevelBenefitsTableType = {
  introPage: true,
  bgColor: "bg-dark-primary",
  title: {
    line1: "Credentials and Lineage",
    TagLine1Type: "h2",
    line2: "Bismillah brings academic depth as well as professional credentials: a bachelor’s degree in psychology and a master’s degree in education.",
    TagLine2Type: "p",
  },

  headers: [
  ],

  points: [
    {
      content: "Accredited Master Trainer, ANLP (UK)",
      values: [
        "First woman in Pakistan to hold the MCC, the ACTC and ANLP accredited trainer standing together",
      ],
    },
    {
      content: "Certified Trainer of Neuro Linguistic Programming via The American Board of Neuro Linguistic Programming (USA)",
      values: [
        "ICF Master Certified Coach (MCC) and Advanced Certification in Team Coaching (ACTC), International Coaching Federation",
      ],
    },
    {
      content: "Certified NLP Master Practitioner via The American Board of Neuro Linguistic Programming (USA)",
      values: [
        "Master Practitioner of Time Line Therapy® Techniques, Time Line Therapy Association (TLTA)",
      ],
    },
    {
      content: "Master NLP Coach, Coaching Division of the ABNLP",
      values: [
        "Master Practitioner of Hypnosis, American Board of Hypnotherapy (ABH)",
      ],
    },
    {
      content: "Hypnotherapist, National Guild of Hypnotists (NGH)",
      values: [
        "Master’s degree in education (Punjab University)",
      ],
    },
    {
      content: "Bachelor’s degree in psychology",
      values: [
        "",
      ],
    },
    {
      content: "Certified Trainer by Carnelian Pvt Ltd (Train The Trainer)",
      values: [
        "Certified Trainer by Funverks Pvt Ltd (Train The Trainer)",
      ],
    },

  ],

  videoTitle: "Organisations We Have Worked With",

  videos: [
    {
      video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774603635/Emaar_fcp94x.mp4",
      title: "Emaar Pakistan",
      thumbnail: ThumbnailBP1,
    },
    {
      video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774603635/Hamdard_sqvjf7.mp4",
      title: "Hamdard Pakistan",
      thumbnail: ThumbnailBP2,
    },
    {
      video: "https://res.cloudinary.com/dmbpjv9e8/video/upload/v1774603635/AlRahim_jnaitu.mp4",
      title: "AlRahim Textile Mills",
      thumbnail: ThumbnailBP3,
    },
  ]


};

// B 04 rows A15 and A16 (duplicate slides 9 to 11 removed).
const galleryDataBP: GalleryItem = {
  title: "A Proven Leader with a Personal Touch",
  underline: false,
  description: (
    <div className="max-w-4xl mx-auto text-base lg:text-lg">
      <p className="mb-5">
        Bismillah’s career is built on the belief that true leadership comes from empowering others. Whether she is leading a live training, supervising practice in the room, or coaching one person through a breakthrough, her focus is always on meaningful and measurable change.
      </p>
      <p className="mb-3">She has also brought this work to organisations including:</p>
      <ul className="flex flex-wrap justify-center gap-3">
        {["Emaar Pakistan", "Hamdard Pakistan", "AlRahim Textile Mills"].map((n) => (
          <li key={n} className="rounded-full border border-slate-200 bg-white px-5 py-2 font-outfit font-semibold text-primary shadow-sm transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:border-secondary hover:shadow-md">
            {n}
          </li>
        ))}
      </ul>
    </div>
  ),
  image: [
    { src: GalleryBM2, alt: "Bismillah Pervez leading a live AL&CO training", title: "Gallery Image 2" },
    { src: GalleryBM3, alt: "Bismillah Pervez coaching a participant", title: "Gallery Image 3" },
    { src: GalleryBM4, alt: "Bismillah Pervez with an AL&CO cohort", title: "Gallery Image 4" },
    { src: GalleryBM5, alt: "Bismillah Pervez presenting at a workshop", title: "Gallery Image 5" },
    { src: GalleryBM6, alt: "Bismillah Pervez supervising practice", title: "Gallery Image 6" },
    { src: GalleryBM7, alt: "Bismillah Pervez with graduates", title: "Gallery Image 7" },
    { src: GalleryBM8, alt: "Bismillah Pervez on stage", title: "Gallery Image 8" },
  ]
}

const ContentSectionData2BP: ContentSectionType = {
  title: "The Philosophy of Empowerment",
  TagType: "h2",
  description: (
    <div className="group relative overflow-hidden mt-4 rounded-xl bg-white border border-slate-200 p-6 lg:p-8 shadow-md transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-xl">
      <span className="absolute left-0 top-0 h-full w-1.5 bg-secondary origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none" />
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-all duration-300 group-hover:bg-secondary group-hover:text-primary-darkest group-hover:scale-110 group-hover:-rotate-6">
          <Quote className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <div>
          <p className="font-outfit text-lg lg:text-xl font-semibold leading-snug text-primary">
            At the heart of Bismillah’s work is a belief that is simple and demanding: empowerment begins with modelling the very best.
          </p>
          <p className="mt-3">
            It is the foundation of how she leads, trains and coaches, and it is why she holds herself to the highest credential in coaching.
          </p>
          <p className="mt-3">
            For Bismillah, success is not about following trends. It is about creating meaningful impact, one person at a time.
          </p>
        </div>
      </div>
    </div>
  ),
  textAlign: "text-start",
  padding: "pt-6 md:pt-8 lg:pt-12 xl:pt-16 pb-4 md:pb-6",
}

const ContentSectionData3BP: ContentSectionType = {
  title: "Your Partner in Transformation",
  TagType: "h2",
  description: (
    <div className="mt-4 rounded-xl bg-primary-darkest p-6 lg:p-8 text-white shadow-md">
      <p className="text-white/90">
        If you are ready to unlock your potential, and perhaps one day to teach this work yourself, you can learn directly from Bismillah Pervez at AL&CO.
      </p>
      <p className="mt-3 text-white/90">
        She teaches alongside Arslan Larik, live on Zoom, and every applicant to our Trainer levels meets her in person before a place is offered.
      </p>
      <div className="mt-6">
        <CtaButton id="C3" variant="secondary" />
      </div>
    </div>
  ),
  textAlign: "text-start",
  padding: "pt-2 md:pt-4 pb-6 md:pb-8 lg:pb-12 xl:pb-16",
}

// B 04 row A19: "The First of Our Own" (brochure p.27, a real quote).
const ContentSectionData4BP: ContentSectionType = {
  title: "The First of Our Own",
  TagType: "h2",
  description: (
    <figure className="relative overflow-hidden mt-4 rounded-xl bg-white border border-slate-200 border-l-4 border-l-secondary p-6 lg:p-8 shadow-md">
      <Quote className="absolute right-6 top-4 h-16 w-16 text-primary/10" strokeWidth={1.5} aria-hidden="true" />
      <blockquote className="relative font-outfit text-lg lg:text-xl font-light italic leading-relaxed text-primary">
        “I can vouch for every word of this personally, because I have lived it. I completed every programme at Arslan Larik & Company, from Practitioner all the way through, and I did my Trainer’s Training with The Tad James Company, under the mentorship of Dr Adriana James. My standing as a Master Trainer was accredited through ANLP in the United Kingdom. I am proud to be the first Master Trainer this institution has produced, and prouder still of what that means: AL&CO now grows its own.”
      </blockquote>
      <figcaption className="relative mt-5 border-t border-slate-200 pt-4">
        <div className="font-outfit text-lg font-semibold text-primary">Bismillah Pervez</div>
        <div className="text-gray-600">CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK). Karachi, Pakistan</div>
      </figcaption>
      <div className="relative mt-6">
        <Button variant="primary" size="medium" text="Meet Arslan Larik" href="/about-us/who-is-arslan-larik" iconRight={true} newTab={false} />
      </div>
    </figure>
  ),
  textAlign: "text-start",
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
}

// Media only (DECISIONS v2 P1). Shared by all three about pages.
const ContentSectionDataFeatureImage: ContentSectionType = {
  title: "Featured In",
  TagType: "h2",
  imagelist: [
    {
      src: featuredImage1.src,
      alt: "Aaj News logo",
    },
    {
      src: featuredImage2.src,
      alt: "Bol News logo",
    },
    {
      src: featuredImage3.src,
      alt: "Dawn News logo",
    },
    {
      src: featuredImage4.src,
      alt: "Samaa News logo",
    },
  ],
  fullBg: "bg-neutral-100",
  padding: "pt-2 md:pt-4 lg:pt-6 pb-6 md:pb-8 lg:pb-12 xl:pb-16"
};

// why-train-with-alco

const bannerDataWTALCO: BannerType = {
  title: {
    line1: "Why Train with AL&CO?",
    align: "text-center mx-auto"
  },
  image: programLevel2.src,
  className: "bg-center bg-cover bg-no-repeat bg-primary"
};

// B 05 row A2.
const ContentSectionData1WTALCO: ContentSectionType = {
  textAlign: "text-start",
  description: (
    <>
      <p className="mb-4 text-lg lg:text-xl font-light text-primary max-w-4xl">
        Choosing where to train is a decision about the rest of your life. Here is what sets <strong>Arslan Larik & Company (AL&CO)</strong> apart.
      </p>
      <p className="max-w-4xl">
        AL&CO is the Center for Human Brilliance and Behavioral Reengineering: an institution led by two master trainers, Arslan Larik and Bismillah Pervez, with 2,000+ graduates across 20+ countries and nearing 100 batches delivered.
      </p>
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { value: "2", label: "master trainers" },
          { value: "2,000+", label: "graduates" },
          { value: "20+", label: "countries" },
          { value: "Nearing 100", label: "batches delivered" },
        ].map((x) => (
          <div key={x.label} className="rounded-xl bg-primary-darkest px-5 py-5 text-white shadow-md transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1.5 hover:shadow-xl">
            <div className="font-outfit text-2xl lg:text-3xl font-bold text-secondary">{x.value}</div>
            <div className="mt-1 text-white/90">{x.label}</div>
          </div>
        ))}
      </div>
    </>
  ),
  padding: "pt-6 md:pt-8 lg:pt-12 xl:pt-16 "
}

const galleryDataWTALCO: GalleryItem = {
  title: "Why Settle for Ordinary when you can Achieve Extraordinary?",
  description: (
    <>
      <p className="mb-4">
        Your transformation starts here.      </p>
    </>
  ),
  underline: false,
  image: [
    { src: GalleryWTALCO1, alt: "AL&CO live training in session", title: "Gallery Image 1" },
    { src: GalleryWTALCO2, alt: "Participants practising in an AL&CO training", title: "Gallery Image 2" },
    { src: GalleryWTALCO3, alt: "AL&CO graduates with their certificates", title: "Gallery Image 3" },
    { src: GalleryWTALCO4, alt: "Arslan Larik teaching live on Zoom", title: "Gallery Image 4" },
  ]

}

// B 05 row A5: the brochure's 13 reasons (p.11-12). Not FAQPage markup (they are not questions).
// Reason 8: payment-plan wording removed (25 Sep ruling: no prices, fees, payment plans or discounts).
const FaqsDataWTALCO: Faq[] = [
  {
    question: "1. Learn coaching from Pakistan’s first woman Master Certified Coach.",
    answer: (
      <p>You train under <Link href="/about-us/who-is-bismillah-pervez" className="underline">Bismillah Pervez</Link>, an ICF Master Certified Coach, the highest coaching credential in the world, and the first woman in Pakistan to hold the MCC, the Advanced Certification in Team Coaching and her ANLP accredited trainer standing, all three together. Learning from both a male and a female master means the teaching reaches you wherever you stand. Two masters, one institution.</p>
    )
  },
  {
    question: "2. Train with Pakistan’s first NLP and Hypnosis Master Trainer.",
    answer: (
      <p>Beside her you learn directly from <Link href="/about-us/who-is-arslan-larik" className="underline">Arslan Larik</Link>, certified through the ABNLP and ABH, a pioneer of NLP training in the region and a master of NLP, Time Line Therapy® Techniques, NLP Coaching and Hypnosis. Learn from a global leader in transformation.</p>
    )
  },
  {
    question: "3. A Master Trainer, not only an NLP Trainer, and the difference is everything.",
    answer: (
      <p>A Master Trainer does not simply teach NLP; a Master Trainer produces other trainers. That means deeper knowledge, a holistic multi-modality perspective, and international credibility your certificate carries with it. Choose transformation, not just training.</p>
    )
  },
  {
    question: "4. A distinctive teaching approach.",
    answer: (
      <p>What we teach overlaps with others; how we teach does not. Every concept is contextualised, practical and applied, and everything is practised under expert supervision for real-time mastery and confidence. Experience the difference that mastery makes.</p>
    )
  },
  {
    question: "5. Pioneers of online NLP training.",
    answer: (
      <p>AL&CO was the first in the region to take NLP training fully online, preparing you to coach both online and in person, alongside participants from around the world. The world is your stage.</p>
    )
  },
  {
    // B 05 §E item 1 (PLEASE CHECK, Arslan): "Unlimited" vs "Free" in this title.
    question: "6. Unlimited revise and revisit for five years.",
    answer: (
      <p>Attend our <Link href="/programs" className="underline">trainings</Link> again, free, for five years, up to six Practitioner and two Master Practitioner trainings a year, hundreds of days of learning, with nothing further to invest. The free revisit covers Levels 1 to 3; it does not apply to the Trainer levels. Learning is limitless, and so are your possibilities.</p>
    )
  },
  {
    question: "7. Advanced self-study resources.",
    answer: (
      <p>An extensive audio library aligned with your manual, provided to you on the AL&CO online learning portal, so the teaching stays with you and your learning continues long after class: 222 audio files at Level 1 and 225 at Level 2. Your manual, around 500 pages per level, is issued digitally and is yours to keep. Tools that last a lifetime.</p>
    )
  },
  {
    question: "8. Fair and transparent.",
    answer: (
      <p>Every graduate invests the same for each programme, with no disparities. For details, please <Link href="/contact#form" className="underline" data-cta-id="C5" data-gtm-event="cta_click">contact us</Link> and your relationship manager will walk you through it. Invest in your future today.</p>
    )
  },
  {
    question: "9. Cutting-edge learning technology.",
    answer: (
      <p>A broadcast-grade streaming setup with multiple camera angles and a seamless online environment that rivals being in the room. Step into the future of learning.</p>
    )
  },
  {
    question: "10. Build a thriving coaching business.",
    answer: (
      <p>Learn to set up a profitable coaching practice during your <Link href="/program/nlp-master-practitioner" className="underline">Master Practitioner</Link> training, and gain the tools to attract and retain premium, paying clients. Turn your passion into a profitable career.</p>
    )
  },
  {
    question: "11. Expand your global network.",
    answer: (
      <p>Join online support groups and a global alumni network of more than 2,000 graduates across 20 or more countries, collaboration, mentorship and opportunity long after the training ends. Your network is your net worth.</p>
    )
  },
  {
    question: "12. Lifetime support from experts.",
    answer: (
      <p>Direct access to your trainers for personalised mentorship, with regular follow-ups to track your progress. The lifelong support you need.</p>
    )
  },
  {
    question: "13. Proven across every field.",
    answer: (
      <p>We have taught clinicians, doctors, psychologists, psychotherapists and counsellors, alongside entrepreneurs, senior leaders, educators and homemakers. Whatever your background, you will thrive here.</p>
    )
  }
]

// B 05 row A6: relationship managers (names and spellings exactly as the brochure, p.11).
const ContentSectionData2WTALCO: ContentSectionType = {
  title: "The People Who Make Every Promise Real",
  TagType: "h2",
  textAlign: "text-start",
  description: (
    <>
      <p className="my-4 max-w-4xl">
        Everything on this page is delivered by a person. Our relationship managers walk beside you from your very first question to the day you graduate and long after, available around the clock, turning a programme into a journey and a stranger into part of the AL&CO family. And here is something rare: most of them come from psychology themselves, so they understand your journey from the inside. Listed alphabetically, because every one of them matters equally.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 my-6">
        {[
          { name: "Afshan Ahmed", role: "Relationship Manager", bg: "Trained in Clinical Psychology" },
          { name: "Aqsa Anwar", role: "Relationship Manager", bg: "Background in Psychology" },
          { name: "Ateeqa Mehmood", role: "Relationship Manager", bg: "Background in Psychology and Social Sciences" },
          { name: "Farheen Noor Mughal", role: "Relationship Manager", bg: "Background in Psychology and Social Sciences" },
          { name: "Nashmeen Mufti", role: "Relationship Manager", bg: "Background in Psychology" },
          { name: "Syeda Ruquaiyah Shahab", role: "Relationship Manager", bg: "Background in Psychology and Social Sciences" },
          { name: "Taniya Sikander Baksh", role: "Relationship Manager", bg: "Background in Sales and Marketing" },
          { name: "Asia Erum", role: "Customer Service Manager", bg: "Background in Commerce and Administration" },
        ].map((p) => {
          const w = p.name.split(" ");
          return (
            <li
              key={p.name}
              className="group relative overflow-hidden flex flex-col items-center text-center rounded-xl bg-white border border-slate-200 p-6 shadow-sm transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1.5 hover:shadow-xl"
            >
              <span className="absolute left-0 top-0 h-1.5 w-full bg-secondary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none" />
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-outfit text-xl font-bold text-white ring-4 ring-secondary/30 transition-all duration-300 group-hover:bg-secondary group-hover:text-primary-darkest group-hover:scale-110 motion-reduce:transition-none">
                {w[0][0]}{w[w.length - 1][0]}
              </span>
              <div className="mt-4 font-outfit text-lg font-semibold leading-snug text-primary">{p.name}</div>
              <div className="mt-1 font-outfit text-xs font-semibold uppercase tracking-widest text-secondary-darkest">{p.role}</div>
              <p className="mt-2 text-sm text-gray-600">{p.bg}</p>
            </li>
          );
        })}
      </ul>
      <div className="rounded-xl bg-primary-darkest p-6 lg:p-8 text-white shadow-md sm:flex sm:items-center sm:justify-between sm:gap-6">
       
        <div className="mt-5 sm:mt-0 shrink-0">
          <CtaButton id="C1" message="Hi, I would like to speak to a relationship manager (Why Train with AL&CO page)" variant="secondary" />
        </div>
      </div>
    </>
  ),
}

// B 05 row A7: Proof and Recognition. Ripple block and stats strip verbatim (canon §2.3, F3);
// ONE organisations group of exactly the 12 brochure names (P1).
const ContentSectionData3WTALCO: ContentSectionType = {
  title: "Proof and Recognition",
  TagType: "h2",
  textAlign: "text-start",
  description: (
    <>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { value: "2,000+", label: "graduates across 20+ countries" },
          { value: "Nearing 100", label: "batches delivered, and counting" },
          { value: "Over a million", label: "lives inspired by our work, across the nation and around the world" },
        ].map((x, i) => (
          <div key={x.label} className={`rounded-xl bg-primary-darkest px-6 py-5 text-white shadow-md transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1.5 hover:shadow-xl ${i === 2 ? "sm:col-span-2 xl:col-span-2" : ""}`}>
            <div className="font-outfit text-3xl font-bold text-secondary">{x.value}</div>
            <div className="mt-1 text-white/90">{x.label}</div>
          </div>
        ))}
      </div>

      <div className="group relative overflow-hidden my-6 rounded-xl bg-white border border-slate-200 p-6 lg:p-8 shadow-md transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-xl">
        <span className="absolute left-0 top-0 h-full w-1.5 bg-secondary origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none" />
        <p className="font-outfit text-lg lg:text-xl font-semibold text-primary">A ripple, not a headcount.</p>
        <p className="mt-2 max-w-4xl">
          More than two thousand certified graduates, across more than twenty countries, is only the visible part. Behind AL&CO stand founders who spent years training and coaching across hundreds of organisations, and behind every graduate is a coaching practice, a workplace, a classroom, a family. Empowerment does not stop at the person in the room; it travels outward through everyone they touch.
        </p>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 p-6 lg:p-8 shadow-md">
        <p className="font-outfit text-lg lg:text-xl font-semibold text-primary">Organisations we have worked with.</p>
        <p className="mt-2 mb-4 max-w-4xl">
          AL&CO’s own clients, and organisations our founders have trained and coached for, before and alongside AL&CO:
        </p>
        <ul className="flex flex-wrap gap-3">
          {["K-Electric", "Tameer Microfinance Bank", "Emaar Pakistan", "Hamdard Pakistan", "AlRahim Textile Mills", "Bank Alfalah", "Faysal Bank", "Bayer", "GlaxoSmithKline", "Pakistan State Oil", "PEL", "Feroze1888"].map((o) => (
            <li key={o} className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2 font-outfit font-semibold text-primary transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:border-secondary hover:bg-white hover:shadow-md">
              {o}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-xl border border-secondary/40 bg-secondary/10 p-6 lg:p-8">
        <p className="font-outfit text-lg lg:text-xl font-semibold text-primary">Proven across the professions.</p>
        <p className="mt-2 max-w-4xl">
          We have taught medical doctors, psychologists, psychotherapists and psychiatrists alongside entrepreneurs, senior leaders, educators and homemakers.
        </p>
      </div>
    </>
  ),
  padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
}

// B 03 §C step 1, B 04 §C step 2: Person JSON-LD keyed by slug (no prices, no phone numbers).
// @ids must match the root layout (0 Shared/02 step 2).
export const personJsonLd: Record<string, object> = {
  "who-is-arslan-larik": {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://arslanlarik.com/about-us/who-is-arslan-larik#person",
    name: "Arslan Larik",
    jobTitle: "Founder and Master Trainer",
    url: "https://arslanlarik.com/about-us/who-is-arslan-larik",
    image: "https://arslanlarik.com/og/arslan-larik.jpg",
    description: "Pakistan's first Certified Master Trainer of NLP (ABNLP) and of Hypnosis (ABH), an ANLP Accredited Master Trainer (UK), a Master Trainer of NLP University (NLPU) under Robert Dilts, and ANLP's International Ambassador for Pakistan. Founder and Managing Director of Arslan Larik & Company (AL&CO).",
    worksFor: { "@id": "https://arslanlarik.com/#organization" },
    knowsAbout: ["Neuro-Linguistic Programming", "Hypnosis", "Time Line Therapy Techniques", "NLP Coaching", "Behavioral Reengineering"],
    award: ["ANLP International Ambassador for Pakistan", "Recognised as a Master Trainer under Robert Dilts at NLP University (2025)"],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: "Certified Master Trainer of NLP", recognizedBy: { "@type": "Organization", name: "American Board of Neuro-Linguistic Programming (ABNLP)" } },
      { "@type": "EducationalOccupationalCredential", name: "Certified Hypnosis Master Trainer", recognizedBy: { "@type": "Organization", name: "American Board of Hypnotherapy (ABH)" } },
      { "@type": "EducationalOccupationalCredential", name: "Master Trainer of NLP", recognizedBy: { "@type": "Organization", name: "NLP University (NLPU)" } },
      { "@type": "EducationalOccupationalCredential", name: "ANLP Accredited Master Trainer", recognizedBy: { "@type": "Organization", name: "ANLP, Association for NLP (United Kingdom)" } },
    ],
  },
  "who-is-bismillah-pervez": {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://arslanlarik.com/about-us/who-is-bismillah-pervez#person",
    name: "Bismillah Pervez",
    jobTitle: "Chief Executive Officer",
    url: "https://arslanlarik.com/about-us/who-is-bismillah-pervez",
    image: "https://arslanlarik.com/og/bismillah-pervez.jpg",
    description: "Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK). Chief Executive of Arslan Larik & Company (AL&CO), Certified NLP Trainer and Master NLP Coach through the ABNLP. The first woman in Pakistan to hold the MCC, the ACTC and ANLP accredited trainer standing together.",
    worksFor: { "@id": "https://arslanlarik.com/#organization" },
    colleague: { "@id": "https://arslanlarik.com/about-us/who-is-arslan-larik#person" },
    knowsAbout: ["Coaching", "Neuro-Linguistic Programming", "Time Line Therapy Techniques", "Hypnosis", "Team Coaching"],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: "Master Certified Coach (MCC)", recognizedBy: { "@type": "Organization", name: "International Coaching Federation (ICF)" } },
      { "@type": "EducationalOccupationalCredential", name: "Advanced Certification in Team Coaching (ACTC)", recognizedBy: { "@type": "Organization", name: "International Coaching Federation (ICF)" } },
      { "@type": "EducationalOccupationalCredential", name: "ANLP Accredited Master Trainer", recognizedBy: { "@type": "Organization", name: "ANLP, Association for NLP (United Kingdom)" } },
      { "@type": "EducationalOccupationalCredential", name: "Certified Trainer of NLP", recognizedBy: { "@type": "Organization", name: "American Board of Neuro-Linguistic Programming (ABNLP)" } },
    ],
  },
};

export const about: AboutType[] = [
  {
    slug: "who-is-arslan-larik",
    BannerData: bannerDataAL,
    ContentSectionData1: ContentSectionData1AL,
    CertificatesSectionData: CertificatesSectionDataAL,
    LevelBenefitsTableData: LevelBenefitsTableDataAL,
    ContentSectionData2: ContentSectionData2AL,
    ContentSectionData3: ContentSectionData3AL,
    ContentSectionData4: ContentSectionData4AL,
    ContentSectionDataFeatureImage: ContentSectionDataFeatureImage,
  },
  {
    slug: "who-is-bismillah-pervez",
    BannerData: bannerDataBP,
    ContentSectionData1: ContentSectionData1BP,
    CertificatesSectionData: CertificatesSectionData,
    LevelBenefitsTableData: LevelBenefitsTableDataBP,
    galleryData: galleryDataBP,
    ContentSectionData2: ContentSectionData2BP,
    ContentSectionData3: ContentSectionData3BP,
    ContentSectionData4: ContentSectionData4BP,
    ContentSectionDataFeatureImage: ContentSectionDataFeatureImage
  },
  {
    slug: "why-train-with-alco",
    BannerData: bannerDataWTALCO,
    ContentSectionData1: ContentSectionData1WTALCO,
    galleryData: galleryDataWTALCO,
    FaqsData: FaqsDataWTALCO,
    FaqsHeading: "13 Reasons to Train with AL&CO",
    ContentSectionData2: ContentSectionData2WTALCO,
    ContentSectionData3: ContentSectionData3WTALCO,
    ContentSectionDataFeatureImage: ContentSectionDataFeatureImage
  },

];