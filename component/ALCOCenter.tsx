import CtaButton from "./CtaButton";
import { CTA } from "./cta";
import { ALCOCenterData } from "@/type/aLCOCenter";

// CTA plan: labels from the library. C4 "Enrol now" opens the enrol popup; C6 calls +92 336 008 2222.
const aLCOCenterData: ALCOCenterData = {
  title: "Arslan Larik & Company: the Center for Human Brilliance and Behavioral Reengineering",
  button1: {
    text: CTA.C4.label,
  },
  button2: {
    text: CTA.C6.label,
  },
};

export default function ALCOCenter() {
  const data = aLCOCenterData;

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-image-alco-center bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 my-8">
          <div className="flex flex-col justify-start ">
            <h2 className="h3 text-white text-start ">{data.title}</h2>
            <div className="mt-4 flex flex-wrap gap-4">
              <CtaButton id="C4" variant="secondaryBlack" className="my-auto" />
              <CtaButton id="C6" variant="white" className="my-auto" />
            </div>
          </div>
          <div className="flex flex-col justify-center pt-1">
            <p className="custom-text1 font-light text-white text-start">
              Live on Zoom, taught personally, from 8:00pm to 2:00am Pakistan time. Your transformation starts with one conversation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
