import Link from "next/link";
import CtaButton from "@/component/CtaButton";

const LEVEL_LINKS = [
  { name: "Level 1: NLP Practitioner", href: "/program/nlp-practitioner" },
  { name: "Level 2: NLP Master Practitioner", href: "/program/nlp-master-practitioner" },
  { name: "Level 3: Advanced Hypnotherapy and Interventionist", href: "/program/advanced-hypnotherapy-interventionist" },
  { name: "Level 4: NLP Train the Trainer", href: "/program/nlp-trainers-training-program" },
  { name: "Level 5: Hypnosis Train the Trainer", href: "/program/hypnosis-trainers-training-program" },
  { name: "Level 6: NLP Master Trainer", href: "/program/nlp-master-trainer-program" },
];

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-16">
      {/* React 19 hoists <title> into <head>. */}
      <title>Page Not Found: Explore Our Six NLP Programmes | AL&CO</title>

      <p className="text-6xl font-bold text-primary mb-2" aria-hidden="true">404</p>
      <h1 className="text-3xl font-semibold text-primary mb-3">Page not found</h1>

      <p className="text-gray-600 mb-6 max-w-xl">
        Sorry, we could not find that page. It may have moved when we updated our programmes.
        Here is where most people are heading:
      </p>

      {/* CTA plan: 404 is recovery. Primary C3, secondary C1. */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <CtaButton id="C3" variant="primary" size="large" />
        <CtaButton id="C1" message="Hi, I could not find a page on the AL&CO website" variant="outlinePrimary" size="large" />
      </div>
      <p className="mb-10">
        <Link href="/" className="text-primary underline hover:no-underline">Go to the homepage</Link>
      </p>

      <h2 className="text-xl font-semibold text-primary mb-3">Popular pages</h2>
      <ul className="space-y-2 mb-8">
        {LEVEL_LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-primary underline hover:no-underline">
              {l.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/contact" className="text-primary underline hover:no-underline">
            Contact us
          </Link>
        </li>
      </ul>

      <p className="text-sm text-gray-500">
        Need help? Call or WhatsApp{" "}
        <a href="tel:+923360082222" className="text-primary underline">+92 336 008 2222</a>, or write to{" "}
        <a href="mailto:connect@arslanlarik.com" className="text-primary underline">connect@arslanlarik.com</a>.
      </p>
    </div>
  );
}
