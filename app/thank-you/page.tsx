"use client";

import { track } from "@/libs/track";

import Link from "next/link";
import { useEffect, useState } from "react";
import CtaButton from "@/component/CtaButton";
import { ctaDataAttrs, whatsappHref } from "@/component/cta";

// Forms save the lead under "lead_data" (contact form, enrol popup, /enroll).
// "lead" is the older key the enrol popup and /enroll used; read it as a fallback
// so no enrolment loses its Lead event during the switch-over.
const LEAD_KEYS = ["lead_data", "lead"] as const;

export default function ThankYouPage() {
  // CTA plan: C2 (webinar) is shown only to contact-form leads, never to enrolments.
  // The contact form marks its lead_data with form: "contact" (component/contact.tsx).
  const [isContactLead, setIsContactLead] = useState(false);

  useEffect(() => {
    let raw: string | null = null;
    try {
      for (const key of LEAD_KEYS) {
        raw = sessionStorage.getItem(key);
        if (raw) break;
      }
      // Remove both keys first, so the Lead event fires only once (no repeat on refresh).
      LEAD_KEYS.forEach((key) => sessionStorage.removeItem(key));
    } catch {
      return;
    }
    if (!raw) return;

    try {
      const { email, phone, firstName, form } = JSON.parse(raw);
      track("Lead", { email, phone, firstName });
      if (form === "contact") setIsContactLead(true);
    } catch {
      // Malformed data: nothing to send.
    }
  }, []);

  return (
    <div className="flex flex-col items-center md:justify-center min-h-screen px-4 text-center">
      <div className="max-w-lg ">
        <div className="mb-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-10 w-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-primary mb-4">Thank You!</h1>

        <p className="text-lg text-gray-600 mb-2">
          Your request has been submitted successfully.
        </p>

        <p className="text-gray-500 mb-8">
          Your relationship manager will contact you. They will review your details and get back to
          you as soon as possible.
        </p>

        {/* CTA plan: after conversion, C8; C2 only for contact-form leads (not enrolments). */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CtaButton id="C8" variant="primary" className="px-6" />
          {isContactLead && <CtaButton id="C2" variant="outlinePrimary" className="px-6" />}
        </div>

        {/* D8: +92 336 008 2222 is the only linked number. The US and Canada line is plain text. */}
        <p className="text-gray-500 mt-6">
          Need us sooner? Call{" "}
          <a
            href="tel:+923360082222"
            onClick={() => track("Contact", { contentName: "call" })}
            className="text-primary underline"
            {...ctaDataAttrs("C6")}
          >
            +92 336 008 2222
          </a>{" "}
          or{" "}
          <a
            href={whatsappHref("Hi, I have just submitted a form on the AL&CO website")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp us on +92 336 008 2222"
            onClick={() => track("Contact", { contentName: "whatsapp" })}
            className="text-primary underline"
            {...ctaDataAttrs("C1")}
          >
            WhatsApp us
          </a>
          .
        </p>

        <p className="text-gray-500 text-sm mt-4">International: +1 (206) 614 0234</p>

        <p className="text-gray-500 mt-6">
          <Link href="/" className="text-primary underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
