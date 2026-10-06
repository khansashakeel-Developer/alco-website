"use client";
// The scrolling strip under the menu, for the upcoming training the marketing team flagged (for example the next NLP Practitioner batch).
// The text is in the server-rendered HTML (crawlable) and scrolls with CSS only. It pauses on hover, and for visitors who prefer
// reduced motion it does not scroll at all. It is hidden on the enrol, thank-you, webinar, audio, legal and admin pages.
// Design preview: ?announce-preview=1 shows it with sample content on localhost (or when NEXT_PUBLIC_ANNOUNCEMENT_PREVIEW=true).
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CTA, ctaDataAttrs } from "@/component/cta";
import type { AnnouncementItem } from "./types";

const SKIP_PREFIXES = ["/enroll", "/thank-you", "/maintenance", "/free-webinar", "/webinars", "/audio-access", "/admin",
  "/privacy-policy", "/terms", "/eula", "/refund-policy", "/service-policy"];
const PREVIEW_ALLOWED = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ANNOUNCEMENT_PREVIEW === "true";
const SAMPLE: AnnouncementItem = (() => {
  const t = new Date(); t.setUTCDate(t.getUTCDate() + 21); t.setUTCHours(15, 0, 0, 0);
  return { id: "s-strip", kind: "training", title: "NLP Practitioner, Batch 98", startsAt: t.toISOString(), inStrip: true };
})();

const date = (iso: string) => new Date(iso).toLocaleString("en-GB", { timeZone: "Asia/Karachi", day: "numeric", month: "long", year: "numeric" });
const REPEATS = 4; // enough copies in each half to fill a wide screen

export default function AnnouncementStrip({ item: liveItem }: { item: AnnouncementItem | null }) {
  const pathname = usePathname();
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    if (PREVIEW_ALLOWED && new URLSearchParams(window.location.search).has("announce-preview")) setPreview(true);
  }, []);

  const item = preview ? SAMPLE : liveItem;
  const skip = SKIP_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (!item || (skip && !preview)) return null;

  const message = (
    <>
      <strong className="font-semibold">{item.title}</strong>
      <span className="mx-2 text-secondary">·</span>Starts {date(item.startsAt)}
      <span className="mx-2 text-secondary">·</span>
      <a href={item.href ?? CTA.C4.href} {...ctaDataAttrs("C4")} className="font-semibold text-secondary underline underline-offset-4 hover:text-white">
        Enrol now
      </a>
    </>
  );
  const group = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {Array.from({ length: REPEATS }).map((_, i) => (
        <span key={i} className="flex items-center whitespace-nowrap px-8">
          {i > 0 || hidden ? <span aria-hidden="true" className="mr-16 text-secondary">◆</span> : null}
          {message}
        </span>
      ))}
    </div>
  );

  return (
    <aside aria-label="Upcoming training" className="announce-strip overflow-hidden bg-gradient-to-r from-primary-darkest via-primary to-primary-light text-white font-outfit text-sm sm:text-base">
      <style>{`
        @keyframes announceScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .announce-strip-track{display:flex;width:max-content}
        @media (prefers-reduced-motion:no-preference){
          .announce-strip-track{animation:announceScroll 40s linear infinite}
          .announce-strip:hover .announce-strip-track,.announce-strip:focus-within .announce-strip-track{animation-play-state:paused}
        }
        @media (prefers-reduced-motion:reduce){
          .announce-strip-track{width:100%;justify-content:center}
          .announce-strip-track > div:nth-child(2){display:none}
          .announce-strip-track > div:first-child > span:not(:first-child){display:none}
        }
      `}</style>
      <div className="announce-strip-track py-2.5">
        {group(false)}
        {group(true)}
      </div>
    </aside>
  );
}