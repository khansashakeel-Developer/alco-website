import type { Metadata } from "next";
import Link from "next/link";
import CtaButton from "@/component/CtaButton";
import { ctaDataAttrs, waLine } from "@/component/cta";
import Banner from "@/component/banner";
import FreeWebinarForm from "@/component/FreeWebinarForm";
import programLevel1 from "@/assets/background/program-level-1.webp";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/utils/buildMetadata";

const PAGE_URL = `${SITE_URL}/free-webinar`;
const TITLE = "Free Weekly NLP Webinar: Explore NLP Live on Zoom | AL&CO";
const DESCRIPTION =
  "Join AL&CO's free weekly NLP webinar, live on Zoom with our relationship managers. For people new to AL&CO. Register and we will send the joining details.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "AL&CO", locale: "en_PK", type: "website", images: [DEFAULT_OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
  robots: { index: true, follow: true },
};

const SECTION = "py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 w-full";

export default function FreeWebinarPage() {
  return (
    <div>
      <Banner
        data={{
          title: { line1: "Free Weekly NLP Webinar", align: "text-center mx-auto" },
          image: programLevel1.src,
          children: (
            <p className="custom-text1 font-light text-white text-center mt-4 max-w-3xl mx-auto">
              A free, live introductory hour on Zoom for anyone exploring NLP, hosted by our
              relationship managers.
            </p>
          ),
        }}
      />

      <section className={SECTION}>
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="custom-text1 text-primary-light">
            Not sure yet? That is exactly what our weekly webinar is for. Once a week we open a
            free, live introductory session for anyone exploring this world, a relaxed hour to
            understand what NLP really is, to feel the way we teach, and to ask anything you like
            before you decide a single thing.
          </p>
          <p className="custom-text1 text-primary-light mt-4">
            It is hosted by our relationship managers, the same people who walk beside our students
            from the first hello. So you meet a real person, in a real room, not a sales page. There
            is no pressure and no obligation. Come to listen, come with your questions, come simply
            to see whether this is for you.
          </p>

          <h2 className="h3 text-primary mt-10">Who It Is For</h2>
          <p className="custom-text1 text-primary-light mt-4">
            The webinar is for people who are new to AL&CO and still deciding. If you are already an
            AL&CO graduate, you do not need it: you can revisit your trainings free, and your
            relationship manager will be glad to arrange it.
          </p>
        </div>
      </section>

      <section className={`${SECTION} bg-light-neutral bg-cover bg-top-left`}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="h3 text-primary text-center">Register for the Next Session</h2>
          <FreeWebinarForm />
          {/* CTA plan: primary is the sign-up form above; secondary C1. */}
          <div className="text-center mt-8">
            <p className="custom-text1 text-primary-light mb-4">
              Would you rather ask a question first? A relationship manager will answer it personally.
            </p>
            <CtaButton
              id="C1"
              message={waLine("the free webinar")}
              variant="outlinePrimary"
              className="px-6"
            />
            <p className="text-sm text-gray-600 mt-6">
              Want to see the whole journey first?{" "}
              <Link href="/programs" className="underline" {...ctaDataAttrs("C3")}>See all six levels</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
