import React from "react";
import CtaButton from "./CtaButton";
import { ctaDataAttrs, waLine, whatsappHref } from "./cta";

// B 07 row A11 / 0 Shared/02 step 13. Server component.
// DECISIONS v2 G7: one public sign-up page (/free-webinar), for people new to AL&CO;
// the Zoom link reaches them by email only and is never published on this page.
export default function FreeWebinar() {
  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 w-full bg-light-neutral">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="h3 text-primary text-start mb-6">Start with a Free Weekly Webinar</h2>
        <div className="custom-text1 font-light text-black text-start space-y-4">
          <p>
            Not sure yet? That is exactly what our weekly webinar is for. Once a week we open a free, live introductory session for anyone exploring this world, a relaxed hour to understand what NLP really is, to feel the way we teach, and to ask anything you like before you decide a single thing.
          </p>
          <p>
            It is hosted by our relationship managers, the same people who walk beside our students from the first hello. So you meet a real person, in a real room, not a sales page. There is no pressure and no obligation.
          </p>
          <p>
            Sign up below and the joining link reaches you by email. The webinar is for people new to AL&amp;CO. If you are already a graduate, you can revisit our trainings free, and your relationship manager will be glad to arrange it.
          </p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <CtaButton id="C2" variant="secondary" />
          <a
            href={whatsappHref(waLine("the free webinar"))}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-text1 text-primary underline"
            {...ctaDataAttrs("C1")}
          >
            Questions first? WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
