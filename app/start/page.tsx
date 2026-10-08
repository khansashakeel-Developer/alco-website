import type { Metadata } from "next";
import StartQuiz from "@/component/start-quiz/StartQuiz";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/utils/buildMetadata";

const PAGE_URL = `${SITE_URL}/start`;
const TITLE = "Find Your Path: NLP and Hypnosis Training | AL&CO";
const DESCRIPTION =
  "Answer four quick questions and see where to begin with NLP and hypnosis at AL&CO, and the road that follows, taught live on Zoom.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "AL&CO", locale: "en_PK", type: "website", images: [DEFAULT_OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
  robots: { index: true, follow: true },
};

export default function StartPage() {
  return (
    <>
      <StartQuiz />
      {/* Plain text for search engines and screen readers; the quiz itself is interactive. */}
      <section className="sr-only">
        <h2>Find your path at AL&amp;CO</h2>
        <p>
          AL&amp;CO teaches six levels of NLP and hypnosis training, live on Zoom. Everyone starts at Level 1: NLP Practitioner. Take the four question quiz
          to see the route that fits your goals.
        </p>
      </section>
    </>
  );
}
