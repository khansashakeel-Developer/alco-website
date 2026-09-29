import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/utils/buildMetadata";

const TITLE = "Thank You, Your Relationship Manager Will Call Soon | AL&CO";
const DESCRIPTION =
  "Thank you for contacting Arslan Larik & Company. Your relationship manager will reply soon. Call +92 336 008 2222 if you would like to speak today.";
const PAGE_URL = "https://arslanlarik.com/thank-you";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "AL&CO", locale: "en_PK", type: "website", images: [DEFAULT_OG_IMAGE] },
  robots: { index: false, follow: true },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
