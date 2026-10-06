"use client";
// The announcement window: the free webinar and upcoming trainings, shown once per visit.
// Rules it follows (so it does not hurt search ranking or the visitor):
//  - not shown until the cookie banner has been answered (no two popups at once);
//  - appears after a short pause, never blocks the first paint (no effect on LCP or layout shift);
//  - dismissed once = hidden for 24 hours, until the CMS list changes;
//  - skipped on the enrol, thank-you, webinar, audio, legal and admin pages;
//  - Esc, the backdrop, the close button and any link inside close it; focus stays inside while open.
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays, GraduationCap, Video, X } from "lucide-react";
import CtaButton from "@/component/CtaButton";
import { getConsent, CONSENT_EVENT } from "@/libs/consent";
import type { AnnouncementItem } from "./types";

const STORE_KEY = "alco_announcement_v1";
const HIDE_FOR_MS = 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 2500;
const SKIP_PREFIXES = ["/enroll", "/thank-you", "/maintenance", "/free-webinar", "/webinars", "/audio-access", "/admin",
  "/privacy-policy", "/terms", "/eula", "/refund-policy", "/service-policy"];

const when = (iso: string, withTime: boolean) =>
  new Date(iso).toLocaleString("en-GB", {
    timeZone: "Asia/Karachi",
    weekday: "long", day: "numeric", month: "long",
    ...(withTime ? { hour: "numeric", minute: "2-digit", hour12: true } : {}),
  }) + (withTime ? " PKT" : "");

const parts = (iso: string) => {
  const d = new Date(iso);
  const f = (o: Intl.DateTimeFormatOptions) => d.toLocaleString("en-GB", { timeZone: "Asia/Karachi", ...o });
  return { day: f({ day: "numeric" }), month: f({ month: "short" }).toUpperCase(), weekday: f({ weekday: "short" }) };
};

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

// Design preview: open any page with ?announce-preview=1 to see the window with sample content (dates are always in the future).
// Works on localhost; on a deployed site only when NEXT_PUBLIC_ANNOUNCEMENT_PREVIEW=true is set. Remove the env var for launch.
const PREVIEW_ALLOWED = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ANNOUNCEMENT_PREVIEW === "true";
const inDays = (d: number, h: number) => { const t = new Date(); t.setUTCDate(t.getUTCDate() + d); t.setUTCHours(h, 0, 0, 0); return t.toISOString(); };
const SAMPLE: AnnouncementItem[] = [
  { id: "s-w", kind: "webinar", title: "Free Weekly Webinar: Is NLP Right for You?", startsAt: inDays(5, 15) },
  { id: "s-1", kind: "training", title: "NLP Practitioner, Batch 98", note: "Live on Zoom, 8:00pm to 2:00am PKT", startsAt: inDays(21, 15), href: "/program/nlp-practitioner" },
  { id: "s-2", kind: "training", title: "NLP Master Practitioner, Batch 41", note: "Live on Zoom, taught personally", startsAt: inDays(35, 15), href: "/program/nlp-master-practitioner" },
  { id: "s-3", kind: "training", title: "Advanced Hypnotherapy and Interventionist, Batch 12", startsAt: inDays(60, 15) },
];

export default function AnnouncementModal({ items: liveItems, version: liveVersion }: { items: AnnouncementItem[]; version: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const items = preview ? SAMPLE : liveItems;
  const version = preview ? "preview" : liveVersion;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const skip = SKIP_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  // Design preview: skip the cookie wait, the pause and the "already dismissed" memory.
  useEffect(() => {
    if (PREVIEW_ALLOWED && new URLSearchParams(window.location.search).has("announce-preview")) { setPreview(true); setOpen(true); }
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

  const close = useCallback(() => { setOpen(false); if (!preview) remember(version); }, [version, preview]);

  // Focus, Esc, simple focus trap, and page scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = overflow; previous?.focus?.(); };
  }, [open, close]);

  if (!open || (skip && !preview) || items.length === 0) return null;

  const webinar = items.find((i) => i.kind === "webinar");
  const trainings = items.filter((i) => i.kind === "training");

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6" role="presentation">
      <div className="announce-backdrop absolute inset-0 bg-primary-darkest/70" onClick={close} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="announce-title"
        onClick={(e) => { if ((e.target as HTMLElement).closest("a,button")) close(); }}
        className="announce-panel relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl border-t-8 border-secondary"
      >
        <style>{`
          @keyframes announceIn{from{opacity:0;transform:translateY(28px) scale(.98)}to{opacity:1;transform:none}}
          @keyframes announceFade{from{opacity:0}to{opacity:1}}
          @media (prefers-reduced-motion:no-preference){
            .announce-panel{animation:announceIn .45s cubic-bezier(.2,.8,.2,1) both}
            .announce-backdrop{animation:announceFade .3s ease-out both}
          }
        `}</style>
        <button ref={closeRef} type="button" onClick={close} aria-label="Close announcement"
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary">
          <X size={18} aria-hidden="true" />
        </button>

        <div className="p-6 pb-24 sm:p-8 sm:pb-8 font-outfit">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary/70">What’s coming up</p>
          <h2 id="announce-title" className="mt-1 text-2xl sm:text-3xl font-semibold text-primary">Join us live</h2>

          {webinar && (
            <section className="mt-6 relative overflow-hidden rounded-2xl bg-primary-darkest p-5 sm:p-6 text-white">
              <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-secondary/15" />
              <div className="relative flex items-start gap-4">
                <div aria-hidden="true" className="flex w-16 shrink-0 flex-col items-center rounded-xl bg-secondary py-2 text-primary-darkest shadow-md">
                  <span className="text-[11px] font-semibold tracking-widest">{parts(webinar.startsAt).month}</span>
                  <span className="text-3xl font-bold leading-none">{parts(webinar.startsAt).day}</span>
                  <span className="text-[11px] font-medium">{parts(webinar.startsAt).weekday}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-secondary text-xs font-semibold uppercase tracking-widest">
                    <Video size={14} aria-hidden="true" /> Free webinar
                  </div>
                  <h3 className="mt-1 text-lg sm:text-xl font-semibold leading-snug">{webinar.title}</h3>
                  <p className="mt-1 flex items-center gap-2 text-white/85 text-sm">
                    <CalendarDays size={15} aria-hidden="true" className="shrink-0" /> {when(webinar.startsAt, true)}
                  </p>
                </div>
              </div>
              <div className="relative mt-5"><CtaButton id="C2" variant="secondary" /></div>
            </section>
          )}

          {trainings.length > 0 && (
            <section className="mt-6" aria-labelledby="announce-trainings">
              <h3 id="announce-trainings" className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wide">
                <GraduationCap size={16} aria-hidden="true" /> Upcoming trainings
              </h3>
              <ul className="mt-3 space-y-3">
                {trainings.map((t) => {
                  const d = parts(t.startsAt);
                  return (
                    <li key={t.id} className="flex items-center gap-4 rounded-xl border border-primary/15 bg-neutral-light p-3 sm:p-4 transition-shadow hover:shadow-md">
                      <div aria-hidden="true" className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-primary py-1.5 text-white">
                        <span className="text-[10px] font-semibold tracking-widest text-secondary">{d.month}</span>
                        <span className="text-2xl font-bold leading-none">{d.day}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-primary leading-snug">
                          {t.href ? <a href={t.href} className="underline decoration-secondary decoration-2 underline-offset-4">{t.title}</a> : t.title}
                        </p>
                        <p className="text-sm text-gray-700">Starts {when(t.startsAt, false)}</p>
                        {t.note && <p className="text-sm text-gray-600">{t.note}</p>}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3"><CtaButton id="C4" variant="primary" /><button type="button" onClick={close} className="text-sm text-primary/70 underline underline-offset-4 hover:text-primary">Not now</button></div>
            </section>
          )}

          {trainings.length === 0 && (
            <button type="button" onClick={close} className="mt-5 text-sm text-primary/70 underline underline-offset-4 hover:text-primary">Not now</button>
          )}
        </div>
      </div>
    </div>
  );
}
