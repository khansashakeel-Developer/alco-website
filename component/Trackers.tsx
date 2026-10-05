"use client";

import { Suspense, useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import FacebookPixel from "@/component/FacebookPixel";
import FbclidCookie from "@/component/FbclidCookie";
import { CONSENT_EVENT, getConsent, type Consent } from "@/libs/consent";

// Loads tracking only after the visitor has agreed.
export default function Trackers() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    const read = () => {
      const c = getConsent();
      setConsent(c);
      if (c) {
        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({ event: "cookie_consent", analytics_consent: c.analytics, marketing_consent: c.marketing });
      }
    };
    read();
    window.addEventListener(CONSENT_EVENT, read);
    return () => window.removeEventListener(CONSENT_EVENT, read);
  }, []);

  if (!consent) return null;

  return (
    <>
      {(consent.analytics || consent.marketing) && <GoogleTagManager gtmId="GTM-5CND486G" />}
      {consent.marketing && (
        <Suspense fallback={null}>
          <FacebookPixel />
          <FbclidCookie />
        </Suspense>
      )}
    </>
  );
}