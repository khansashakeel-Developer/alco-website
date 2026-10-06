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

export default function AnnouncementModal({ items, version }: { items: AnnouncementItem[]; version: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const skip = SKIP_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  // Wait for the cookie choice, then a short pause, then show (unless already seen).
  useEffect(() => {
    if (skip || wasDismissed(version)) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const arm = () => {
      if (!getConsent() || timer) return;
      timer = setTimeout(() => { if (!wasDismissed(version)) setOpen(true); }, SHOW_DELAY_MS);
    };
    arm();
    window.addEventListener(CONSENT_EVENT, arm);
    return () => { window.removeEventListener(CONSENT_EVENT, arm); if (timer) clearTimeout(timer); };
  }, [skip, version]);

  const close = useCallback(() => { setOpen(false); remember(version); }, [version]);

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

  if (!open || skip) return null;

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

        <div className="p-6 sm:p-8 font-outfit">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary/70">What’s coming up</p>
          <h2 id="announce-title" className="mt-1 text-2xl sm:text-3xl font-semibold text-primary">Join us live</h2>

          {webinar && (
            <section className="mt-6 rounded-xl bg-primary-darkest p-5 text-white">
              <div className="flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-wide">
                <Video size={16} aria-hidden="true" /> Free webinar
              </div>
              <h3 className="mt-2 text-lg sm:text-xl font-semibold">{webinar.title}</h3>
              <p className="mt-1 flex items-center gap-2 text-white/85 text-sm sm:text-base">
                <CalendarDays size={16} aria-hidden="true" className="shrink-0" /> {when(webinar.startsAt, true)}
              </p>
              <div className="mt-4"><CtaButton id="C2" variant="secondary" /></div>
            </section>
          )}

          {trainings.length > 0 && (
            <section className="mt-6" aria-labelledby="announce-trainings">
              <h3 id="announce-trainings" className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wide">
                <GraduationCap size={16} aria-hidden="true" /> Upcoming trainings
              </h3>
              <ul className="mt-3 space-y-3">
                {trainings.map((t) => (
                  <li key={t.id} className="flex items-start gap-3 rounded-xl border border-primary/15 bg-neutral-light p-4">
                    <span aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 rounded-full bg-secondary" />
                    <div className="min-w-0">
                      <p className="font-semibold text-primary">
                        {t.href ? <a href={t.href} className="underline decoration-secondary decoration-2 underline-offset-4">{t.title}</a> : t.title}
                      </p>
                      <p className="text-sm text-gray-700">Starts {when(t.startsAt, false)}</p>
                      {t.note && <p className="text-sm text-gray-600 mt-0.5">{t.note}</p>}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4"><CtaButton id="C4" variant="primary" /></div>
            </section>
          )}

          <button type="button" onClick={close} className="mt-6 text-sm text-primary/70 underline underline-offset-4 hover:text-primary">
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
