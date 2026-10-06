"use client";
// Two small announcement windows, one after the other:
//   1. Upcoming trainings. Closing it ("Not now", the X, Esc or a click outside) moves on to
//   2. The free webinar.
// Clicking a button or link inside a window means the visitor acted, so the sequence ends there.
// If there are no trainings only the webinar shows, and the other way round. With nothing in the CMS, nothing shows.
//
// Rules it follows, so it does not hurt search ranking or the visitor:
//  - waits for the cookie banner to be answered (never two popups at once), then a short pause;
//  - never blocks the first paint (no effect on LCP or layout shift);
//  - once finished it stays hidden for 24 hours, until the CMS list changes;
//  - skipped on the enrol, thank-you, webinar, audio, legal and admin pages;
//  - focus stays inside while open; Esc closes; page scroll is locked.
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import CtaButton from "@/component/CtaButton";
import { getConsent, CONSENT_EVENT } from "@/libs/consent";
import type { AnnouncementItem } from "./types";

const STORE_KEY = "alco_announcement_v1";
const HIDE_FOR_MS = 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 2500;
const SKIP_PREFIXES = ["/enroll", "/thank-you", "/maintenance", "/free-webinar", "/webinars", "/audio-access", "/admin",
  "/privacy-policy", "/terms", "/eula", "/refund-policy", "/service-policy"];

// Design preview: add ?announce-preview=1 to any page (both windows), =trainings or =webinar (one window).
// Works on localhost; on a deployed site only when NEXT_PUBLIC_ANNOUNCEMENT_PREVIEW=true is set. Remove that variable for launch.
const PREVIEW_ALLOWED = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ANNOUNCEMENT_PREVIEW === "true";
const inDays = (d: number, h: number) => { const t = new Date(); t.setUTCDate(t.getUTCDate() + d); t.setUTCHours(h, 0, 0, 0); return t.toISOString(); };
const SAMPLE_FLYER = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#09263D"/><stop offset="1" stop-color="#1B507C"/></linearGradient></defs><rect width="800" height="1000" fill="url(#g)"/><rect x="60" y="80" width="90" height="10" rx="5" fill="#F9B81E"/><text x="60" y="200" fill="#F9B81E" font-family="Arial" font-size="34" letter-spacing="6">FREE LIVE WEBINAR</text><text x="60" y="320" fill="#fff" font-family="Arial" font-weight="700" font-size="84">Is NLP</text><text x="60" y="420" fill="#fff" font-family="Arial" font-weight="700" font-size="84">Right for You?</text><text x="60" y="560" fill="#fff" font-family="Arial" font-size="40" opacity=".85">Sunday, 8:00 pm PKT, on Zoom</text><rect x="60" y="860" width="320" height="64" rx="32" fill="#F9B81E"/><text x="100" y="903" fill="#09263D" font-family="Arial" font-weight="700" font-size="30">Reserve your place</text></svg>'
);
const SAMPLE: AnnouncementItem[] = [
  { id: "s-w", kind: "webinar", title: "Is NLP Right for You?", startsAt: inDays(5, 15), image: SAMPLE_FLYER },
  { id: "s-1", kind: "training", title: "NLP Practitioner, Batch 98", startsAt: inDays(21, 15), href: "/program/nlp-practitioner" },
  { id: "s-2", kind: "training", title: "NLP Master Practitioner, Batch 41", startsAt: inDays(35, 15), href: "/program/nlp-master-practitioner" },
  { id: "s-3", kind: "training", title: "NLP Train the Trainer, Batch 12", startsAt: inDays(60, 15) },
];

const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Date(iso).toLocaleString("en-GB", { timeZone: "Asia/Karachi", ...o });
const shortDate = (iso: string) => fmt(iso, { day: "numeric", month: "short", year: "numeric" });
const longDateTime = (iso: string) => `${fmt(iso, { weekday: "long", day: "numeric", month: "long" })}, ${fmt(iso, { hour: "numeric", minute: "2-digit", hour12: true })} PKT`;

function wasDismissed(version: string) {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return false;
    const s = JSON.parse(raw) as { v: string; t: number };
    return s.v === version && Date.now() - s.t < HIDE_FOR_MS;
  } catch { return false; }
}
function remember(version: string) {
  try { window.localStorage.setItem(STORE_KEY, JSON.stringify({ v: version, t: Date.now() })); } catch {}
}

export default function AnnouncementModal({ items: liveItems, version: liveVersion }: { items: AnnouncementItem[]; version: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const items = preview ? SAMPLE : liveItems;
  const version = preview ? "preview" : liveVersion;
  const trainings = items.filter((i) => i.kind === "training");
  const webinar = items.find((i) => i.kind === "webinar");
  const windows = [
    ...(trainings.length && preview !== "webinar" ? (["trainings"] as const) : []),
    ...(webinar && preview !== "trainings" ? (["webinar"] as const) : []),
  ];
  const current = windows[step];
  const skip = SKIP_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  // Design preview: skip the cookie wait, the pause and the "already seen" memory.
  useEffect(() => {
    if (!PREVIEW_ALLOWED) return;
    const v = new URLSearchParams(window.location.search).get("announce-preview");
    if (v !== null) { setPreview(v || "1"); setOpen(true); }
  }, []);

  // Wait for the cookie choice, then a short pause, then show (unless already seen).
  useEffect(() => {
    if (preview || skip || liveItems.length === 0 || wasDismissed(version)) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const arm = () => {
      if (!getConsent() || timer) return;
      timer = setTimeout(() => { if (!wasDismissed(version)) setOpen(true); }, SHOW_DELAY_MS);
    };
    arm();
    window.addEventListener(CONSENT_EVENT, arm);
    return () => { window.removeEventListener(CONSENT_EVENT, arm); if (timer) clearTimeout(timer); };
  }, [skip, version, preview, liveItems.length]);

  const finish = useCallback(() => { setOpen(false); if (!preview) remember(version); }, [version, preview]);
  // "Not now", X, Esc, backdrop: next window, or finish after the last one.
  const dismiss = useCallback(() => {
    if (step < windows.length - 1) setStep(step + 1); else finish();
  }, [step, windows.length, finish]);

  // Focus, Esc, simple focus trap and scroll lock while open. Re-runs for each window.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { dismiss(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = overflow; if (!open) previous?.focus?.(); };
  }, [open, step, dismiss]);

  if (!open || (skip && !preview) || !current) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-6" role="presentation">
      <div className="announce-backdrop absolute inset-0 bg-primary-darkest/60" onClick={dismiss} aria-hidden="true" />
      <div
        key={current}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="announce-title"
        // A click on a link or CTA inside means the visitor acted: end the sequence. (The X and "Not now" call dismiss themselves.)
        onClick={(e) => { const el = (e.target as HTMLElement).closest("a,button"); if (el && !el.hasAttribute("data-announce-dismiss")) finish(); }}
        className="announce-panel relative w-full max-w-md sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl font-outfit"
      >
        <style>{`
          @keyframes announceIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
          @keyframes announceFade{from{opacity:0}to{opacity:1}}
          @media (prefers-reduced-motion:no-preference){
            .announce-panel{animation:announceIn .4s cubic-bezier(.2,.8,.2,1) both}
            .announce-backdrop{animation:announceFade .3s ease-out both}
          }
        `}</style>

        <button ref={closeRef} type="button" data-announce-dismiss onClick={dismiss} aria-label="Close"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-9 w-9 items-center justify-center rounded-full text-primary/60 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary">
          <X size={20} aria-hidden="true" />
        </button>

        <div className="px-7 pt-9 pb-20 sm:px-14 sm:pt-14 sm:pb-12">
          <span aria-hidden="true" className="block h-1 w-10 sm:h-1.5 sm:w-14 rounded-full bg-secondary" />

          {current === "trainings" ? (
            <>
              <h2 id="announce-title" className="mt-5 text-2xl sm:mt-6 sm:text-4xl font-semibold text-primary">Upcoming trainings</h2>
              <ul className="mt-5 sm:mt-8 divide-y divide-primary/10">
                {trainings.map((t) => (
                  <li key={t.id} className="flex items-baseline justify-between gap-4 py-3.5 sm:py-5">
                    <span className="font-medium text-primary sm:text-xl">
                      {t.href ? <a href={t.href} className="hover:underline underline-offset-4">{t.title}</a> : t.title}
                    </span>
                    <span className="shrink-0 text-sm sm:text-base text-gray-500">{shortDate(t.startsAt)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 sm:mt-10 flex items-center gap-6">
                <CtaButton id="C4" variant="primary" />
                <button type="button" data-announce-dismiss onClick={dismiss} className="text-sm sm:text-base text-gray-500 hover:text-primary">Not now</button>
              </div>
            </>
          ) : webinar!.image ? (
            <>
              {/* The marketing team uploads only the flyer: it is the whole announcement, the title is its text alternative. */}
              <h2 id="announce-title" className="sr-only">Free webinar: {webinar!.title}, {longDateTime(webinar!.startsAt)}</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={webinar!.image} alt={`Free webinar flyer: ${webinar!.title}`} className="mt-5 sm:mt-6 mx-auto block max-h-[60vh] w-auto max-w-full rounded-xl shadow-md" />
              <div className="mt-6 sm:mt-8 flex items-center gap-6">
                <CtaButton id="C2" variant="secondary" />
                <button type="button" data-announce-dismiss onClick={dismiss} className="text-sm sm:text-base text-gray-500 hover:text-primary">Not now</button>
              </div>
            </>
          ) : (
            <>
              <p className="mt-5 sm:mt-6 text-sm sm:text-base font-medium uppercase tracking-widest text-primary/60">Free webinar</p>
              <h2 id="announce-title" className="mt-1 sm:mt-2 text-2xl sm:text-4xl font-semibold text-primary">{webinar!.title}</h2>
              <p className="mt-2 sm:mt-3 text-gray-600 sm:text-xl">{longDateTime(webinar!.startsAt)}</p>
              <div className="mt-7 sm:mt-10 flex items-center gap-6">
                <CtaButton id="C2" variant="secondary" />
                <button type="button" data-announce-dismiss onClick={dismiss} className="text-sm sm:text-base text-gray-500 hover:text-primary">Not now</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
