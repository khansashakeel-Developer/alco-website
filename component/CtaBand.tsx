// Closing band (CTA plan rule 2): a short line, the primary CTA and the secondary CTA.
// Server-safe. Every page ends with one, so no page ends on a dead end.
import React from "react";
import CtaButton from "@/component/CtaButton";
import type { CtaRef } from "@/component/cta";

type Props = {
  title: string;
  text?: React.ReactNode;
  primary: CtaRef;
  secondary?: CtaRef;
  /** "dark" (default) sits on the site's dark primary background; "light" on the neutral one. */
  tone?: "dark" | "light";
  id?: string;
};

export default function CtaBand({ title, text, primary, secondary, tone = "dark", id }: Props) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className={`py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 w-full bg-cover bg-top-left ${dark ? "bg-dark-primary" : "bg-light-neutral"}`}
    >
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className={`h3 ${dark ? "text-white" : "text-primary"}`}>{title}</h2>
        {text && (
          <p className={`custom-text1 mt-4 ${dark ? "text-white/90 font-light" : "text-primary-light"}`}>{text}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <CtaButton id={primary.id} message={primary.message} href={primary.href} label={primary.label} variant="secondary" className="px-6" />
          {secondary && (
            <CtaButton
              id={secondary.id}
              message={secondary.message}
              href={secondary.href}
              label={secondary.label}
              variant={dark ? "outlineWhite" : "outlinePrimary"}
              className="px-6"
            />
          )}
        </div>
      </div>
    </section>
  );
}
