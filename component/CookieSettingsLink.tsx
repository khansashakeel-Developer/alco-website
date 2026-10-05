"use client";

import { openCookieSettings } from "@/libs/consent";

export default function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  );
}