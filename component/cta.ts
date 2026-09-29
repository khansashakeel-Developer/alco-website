// CTA library: the single source of truth for every call to action on the site.
// Spec: "04 CTA PLAN - calls to action by funnel stage" (24 Sep 2026).
// Rule 7: the same label always does the same thing, site-wide. Change a label or a
// destination here, never inline in a page.
// No prices in any label or prefilled message (rule 6). No em or en dashes in copy.

export type CtaId = "C1" | "C2" | "C3" | "C4" | "C5" | "C6" | "C7" | "C8" | "C9" | "C10";

/** GTM event names (for Sawera). Rendered as data-gtm-event on every CTA. */
export type CtaGtmEvent =
  | "whatsapp_click"
  | "webinar_cta_click"
  | "cta_click"
  | "enrol_click"
  | "generate_lead"
  | "phone_click"
  | "coaching_apply_click";

/** The only linked number on the site (hard rule). */
export const PHONE_TEL = "tel:+923360082222";
export const PHONE_DISPLAY = "+92 336 008 2222";
export const WHATSAPP_NUMBER = "923360082222";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CONTACT_EMAIL = "connect@arslanlarik.com";

/** Default C1 prefilled line when a page does not pass its own. */
export const DEFAULT_WA_MESSAGE = "Hi, I would like to speak to a relationship manager at AL&CO";
/** Rule 4: graduates are sent to "Revisit a training", never to the webinar. */
export const GRADUATE_WA_MESSAGE = "I am a graduate and would like to revisit";
export const GRADUATE_REVISIT_LABEL = "Revisit a training";

/** C1 href: WhatsApp with a prefilled line naming the page. */
export function whatsappHref(message: string = DEFAULT_WA_MESSAGE): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

/** Page-specific C1 line, e.g. waLine("Level 1, NLP Practitioner"). */
export function waLine(about: string): string {
  return `Hi, I would like to know about ${about}`;
}

export type CtaDef = {
  id: CtaId;
  label: string;
  event: CtaGtmEvent;
  /** Default destination. C1 is built per page; C4 opens the enrol popup (fallback /enroll); C9 needs the next level's href. */
  href: string;
  /** Opens in a new tab (external destinations only). Internal links open in the same tab. */
  newTab: boolean;
};

export const CTA: Record<CtaId, CtaDef> = {
  C1: { id: "C1", label: "Speak to a relationship manager", event: "whatsapp_click", href: whatsappHref(), newTab: true },
  C2: { id: "C2", label: "Join the free webinar", event: "webinar_cta_click", href: "/free-webinar", newTab: false },
  C3: { id: "C3", label: "See all six levels", event: "cta_click", href: "/programs", newTab: false },
  C4: { id: "C4", label: "Enrol now", event: "enrol_click", href: "/enroll", newTab: false },
  // C5: the plan lists generate_lead, which fires on the form submit (thank-you page); the click itself is cta_click so leads are not double counted.
  C5: { id: "C5", label: "Book a conversation", event: "cta_click", href: "/contact#form", newTab: false },
  C6: { id: "C6", label: `Call ${PHONE_DISPLAY}`, event: "phone_click", href: PHONE_TEL, newTab: false },
  C7: {
    id: "C7",
    label: "Apply for private coaching",
    event: "coaching_apply_click",
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Private coaching application")}`,
    newTab: false,
  },
  C8: { id: "C8", label: "Read the questions we often hear", event: "cta_click", href: "/faqs", newTab: false },
  C9: { id: "C9", label: "Continue your climb", event: "cta_click", href: "/programs", newTab: false },
  C10: { id: "C10", label: "Hear from our graduates", event: "cta_click", href: "/testimonial", newTab: false },
};

export type CtaOptions = {
  /** C1 only: the prefilled WhatsApp line. */
  message?: string;
  /** Override the destination (C9 next level page; C4 fallback link). */
  href?: string;
};

/** Resolve a CTA's destination. */
export function ctaHref(id: CtaId, opts: CtaOptions = {}): string {
  if (id === "C1") return whatsappHref(opts.message);
  return opts.href ?? CTA[id].href;
}

/** data-* attributes every CTA carries, for GTM click triggers. */
export function ctaDataAttrs(id: CtaId): Record<string, string> {
  return { "data-cta-id": id, "data-gtm-event": CTA[id].event };
}

/** Serializable CTA reference, usable in data files and across the server/client boundary. */
export type CtaRef = {
  id: CtaId;
  message?: string;
  href?: string;
  /** Only for Rule 4 ("Revisit a training") and C9 variants; library labels are the default. */
  label?: string;
};
