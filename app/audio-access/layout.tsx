import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/utils/buildMetadata";

// Title, description and H1 from D 07 (page owner); layout pattern from A 08 C5 (0 Shared/02 step 14).
const TITLE = "Request Audio Library Access for Graduates | AL&CO";
const DESCRIPTION =
  "Graduates of Level 1 and Level 2 can request access to the AL&CO audio library of 222 and 225 audio files. Submit your request and we will confirm.";
const PAGE_URL = "https://arslanlarik.com/audio-access";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "AL&CO", locale: "en_PK", type: "website", images: [DEFAULT_OG_IMAGE] },
  robots: { index: false, follow: true },
};

export default function AudioAccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
