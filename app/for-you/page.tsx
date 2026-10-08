import type { Metadata } from "next";
import ForYou from "@/component/start-quiz/ForYou";

// Personal page built from the visitor's own quiz answers: keep it out of search results.
export const metadata: Metadata = {
  title: "Your Path | AL&CO",
  robots: { index: false, follow: false },
};

export default function ForYouPage() {
  return <ForYou />;
}
