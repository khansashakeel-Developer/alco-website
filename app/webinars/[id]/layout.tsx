import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/utils/buildMetadata";

const TITLE = "Register for an Upcoming AL&CO Live Webinar | AL&CO";
const DESCRIPTION =
  "Register for a live AL&CO webinar: complete the short form to reserve your place and receive the joining link. Questions? Email connect@arslanlarik.com.";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const url = `https://arslanlarik.com/webinars/${id}`;
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: url },
    openGraph: { title: TITLE, description: DESCRIPTION, url, siteName: "AL&CO", locale: "en_PK", type: "website", images: [DEFAULT_OG_IMAGE] },
    robots: { index: false, follow: true },
  };
}

export default function WebinarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
