"use client";

import React from "react";
import Button from "@/component/button";
import { CTA, ctaDataAttrs } from "@/component/cta";

type Props = {
  text?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
  fullWidth?: boolean;
};

// C4 "Enrol now": opens the existing enrol popup (EnrollPopup, mounted in conditionalLayout).
export default function OpenEnrolButton({
  text = CTA.C4.label,
  variant = "secondary",
  size = "medium",
  className = "",
  fullWidth = false,
}: Props) {
  
  return (
    <Button
      text={text}
      variant={variant}
      size={size}
      iconRight
      href={CTA.C4.href}
      newTab={false}
      className={className}
      fullWidth={fullWidth}
      dataAttrs={ctaDataAttrs("C4")}
    />
  );
}
