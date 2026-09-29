// Renders one CTA from the library (component/cta.ts) with the site's Button styles.
// Server-safe: no hooks here. C4 delegates to the client OpenEnrolButton (enrol popup).
// Every CTA carries data-cta-id and data-gtm-event for GTM click triggers.
import React from "react";
import Link from "next/link";
import Button from "@/component/button";
import OpenEnrolButton from "@/component/OpenEnrolButton";
import { CTA, CtaId, CtaRef, ctaDataAttrs, ctaHref } from "@/component/cta";

type ButtonVariant = React.ComponentProps<typeof Button>["variant"];
type ButtonSize = React.ComponentProps<typeof Button>["size"];

export type CtaButtonProps = {
  id: CtaId;
  /** C1 only: prefilled WhatsApp line naming the page. */
  message?: string;
  /** Destination override (C9 next level; C4 renders a link to /enroll when href is given). */
  href?: string;
  /** Label override: only for Rule 4 "Revisit a training" (C1) and C9 variants. */
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
  iconRight?: boolean;
  /** "button" (default) uses the Button styles; "link" renders a plain text link. */
  as?: "button" | "link";
};

export default function CtaButton({
  id,
  message,
  href,
  label,
  variant = "secondary",
  size = "medium",
  className = "",
  fullWidth = false,
  iconRight = true,
  as = "button",
}: CtaButtonProps) {
  const def = CTA[id];
  const text = label ?? def.label;

  // C4 with no explicit href opens the enrol popup.
  if (id === "C4" && !href && as === "button") {
    return <OpenEnrolButton text={text} variant={variant} size={size} className={className} fullWidth={fullWidth} />;
  }

  const dest = ctaHref(id, { message, href });
  const attrs = ctaDataAttrs(id);

  if (as === "link") {
    if (def.newTab) {
      return (
        <a href={dest} target="_blank" rel="noopener noreferrer" className={className} {...attrs}>
          {text}
        </a>
      );
    }
    return (
      <Link href={dest} className={className} {...attrs}>
        {text}
      </Link>
    );
  }

  return (
    <Button
      text={text}
      href={dest}
      newTab={def.newTab}
      variant={variant}
      size={size}
      className={className}
      fullWidth={fullWidth}
      iconRight={iconRight}
      dataAttrs={attrs}
    />
  );
}

/** Convenience: render a serializable CtaRef (from data files). */
export function CtaFromRef({ cta, ...rest }: { cta: CtaRef } & Omit<CtaButtonProps, "id" | "message" | "href" | "label">) {
  return <CtaButton id={cta.id} message={cta.message} href={cta.href} label={cta.label} {...rest} />;
}
