import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/utils/buildMetadata";

const TITLE = "Enrol in NLP and Hypnosis Certification Online | AL&CO";
const DESCRIPTION =
  "Enrol with Arslan Larik & Company (AL&CO). Tell us your goals, choose your level and your relationship manager will call you. Start your enrolment here.";
const PAGE_URL = "https://arslanlarik.com/enroll";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "AL&CO", locale: "en_PK", type: "website", images: [DEFAULT_OG_IMAGE] },
  robots: { index: false, follow: true },
};

export default function EnrollLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
