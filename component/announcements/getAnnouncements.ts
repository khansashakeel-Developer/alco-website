// Server only. Reads the upcoming webinar and trainings from the CRM (the website CMS) and cleans them.
//   Webinar:   GET /api/webinars/public/free-weekly/next   (already used by the free-webinar form; may also carry a flyer image)
//   Trainings: GET /api/v1/announcements/public            (new, see docs/announcements-cms-contract.md)
// Cached for 5 minutes (ISR): a CMS change shows within about 5 minutes and visitors never wait on the CRM.
// If the CRM is slow, down, or has nothing, the result is simply empty and the page looks as before.
import { cache } from "react";
import type { AnnouncementItem } from "./types";

const API = process.env.NEXT_PUBLIC_API_URL;
const REVALIDATE_SECONDS = 300;

async function getJson(path: string): Promise<unknown> {
  if (!API) return null;
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: REVALIDATE_SECONDS }, signal: AbortSignal.timeout(3000) });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

const isFuture = (iso: unknown) => typeof iso === "string" && !Number.isNaN(Date.parse(iso)) && Date.parse(iso) > Date.now();
const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
// Internal links only: a CMS typo or a pasted external link can never send visitors off the site from these windows.
const internalHref = (v: unknown) => (typeof v === "string" && /^\/(?!\/)[\w\-./#?=&%]*$/.test(v.trim()) ? v.trim() : undefined);

// Flyer images: https only, from our own image hosts (Cloudinary, the site, the CRM). Anything else is ignored.
const IMAGE_HOSTS = ["res.cloudinary.com", "arslanlarik.com", "www.arslanlarik.com", (() => { try { return API ? new URL(API).hostname : ""; } catch { return ""; } })()].filter(Boolean);
function flyerUrl(v: unknown) {
  if (typeof v !== "string" || v.length > 600) return undefined;
  try {
    const u = new URL(v.trim());
    return u.protocol === "https:" && IMAGE_HOSTS.includes(u.hostname) ? u.toString() : undefined;
  } catch { return undefined; }
}

export const getAnnouncements = cache(async (): Promise<AnnouncementItem[]> => {
  const [webinarRes, listRes] = await Promise.all([
    getJson("/api/webinars/public/free-weekly/next"),
    getJson("/api/v1/announcements/public"),
  ]);
  const items: AnnouncementItem[] = [];

  const w = webinarRes as Record<string, unknown> | null;
  if (w?._id && w.title && isFuture(w.date)) {
    items.push({
      id: `webinar-${String(w._id)}`, kind: "webinar", title: text(w.title, 120), startsAt: w.date as string,
      image: flyerUrl(w.flyerUrl ?? w.imageUrl ?? w.image),
    });
  }

  const raw = (listRes as { data?: unknown[] } | null)?.data;
  if (Array.isArray(raw)) {
    for (const r of raw as Record<string, unknown>[]) {
      const kind = r?.type === "webinar" ? "webinar" : r?.type === "training" ? "training" : null;
      const title = text(r?.title, 120);
      if (!kind || !title || !isFuture(r?.startsAt)) continue;
      if (kind === "webinar" && items.some((i) => i.kind === "webinar")) continue; // one webinar is enough (the free-weekly endpoint wins)
      items.push({
        id: `${kind}-${String(r?._id ?? title)}`, kind, title, startsAt: r.startsAt as string,
        href: internalHref(r?.href),
        image: kind === "webinar" ? flyerUrl(r?.image) : undefined,
        inStrip: kind === "training" && r?.showInStrip === true,
      });
    }
  }
  return items;
});