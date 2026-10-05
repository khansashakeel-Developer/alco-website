export type Consent = { analytics: boolean; marketing: boolean; ts?: number };

const KEY = "alco_cookie_consent_v1";
const MAX_AGE = 365 * 24 * 60 * 60 * 1000; // ask again after 12 months
export const CONSENT_EVENT = "alco-consent-change";
export const OPEN_EVENT = "alco-open-cookie-settings";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (c.ts && Date.now() - c.ts > MAX_AGE) return null;
    return c;
  } catch {
    return null;
  }
}

export function setConsent(c: Consent) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...c, ts: Date.now() }));
  } catch {}
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export const hasMarketingConsent = () => !!getConsent()?.marketing;
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));