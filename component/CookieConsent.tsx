"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, OPEN_EVENT } from "@/libs/consent";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const current = getConsent();
    if (!current) setOpen(true);
    else {
      setAnalytics(current.analytics);
      setMarketing(current.marketing);
    }
    const reopen = () => {
      const c = getConsent();
      setAnalytics(!!c?.analytics);
      setMarketing(!!c?.marketing);
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const save = (a: boolean, m: boolean) => {
    const before = getConsent();
    setConsent({ analytics: a, marketing: m });
    setOpen(false);
    setCustom(false);
    // Consent withdrawn: reload so scripts that already loaded stop.
    if (before && ((before.analytics && !a) || (before.marketing && !m))) window.location.reload();
  };

  if (!open) return null;

  const btn = "rounded-lg px-5 py-3 font-outfit font-semibold transition-colors";

  return (
    <div role="dialog" aria-label="Cookie preferences" className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto max-w-4xl rounded-xl bg-white shadow-2xl border border-primary/15 p-5 sm:p-6">
        <p className="font-outfit font-semibold text-primary">We value your privacy</p>
        <p className="custom-text1 text-primary-light mt-2">
          We use essential cookies to run this site. With your permission we also use analytics cookies, to understand
          how the site is used, and marketing cookies, to measure our advertising. Read our{" "}
          <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
        </p>

        {custom && (
          <div className="mt-4 space-y-3 text-primary">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-1" />
              <span><strong>Essential</strong>: needed for the site to work. Always on.</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1" />
              <span><strong>Analytics</strong>: helps us see how visitors use the site.</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1" />
              <span><strong>Marketing</strong>: lets us measure and improve our advertising.</span>
            </label>
          </div>
        )}

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          {custom ? (
            <button type="button" onClick={() => save(analytics, marketing)} className={`${btn} bg-primary text-white hover:bg-primary/90`}>
              Save choices
            </button>
          ) : (
            <>
              <button type="button" onClick={() => save(true, true)} className={`${btn} bg-primary text-white hover:bg-primary/90`}>
                Accept all
              </button>
              <button type="button" onClick={() => save(false, false)} className={`${btn} border border-primary text-primary hover:bg-primary hover:text-white`}>
                Reject non-essential
              </button>
              <button type="button" onClick={() => setCustom(true)} className="px-3 py-3 font-outfit font-medium text-primary underline">
                Customise
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}