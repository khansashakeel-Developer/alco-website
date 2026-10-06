// Server component. Reads the upcoming webinar and upcoming trainings from the CRM (the website CMS),
// keeps only what is still in the future, and hands plain data to the popup.
//   Webinar:   GET /api/webinars/public/free-weekly/next   (already used by the free-webinar form)
//   Trainings: GET /api/v1/announcements/public            (new, see docs/announcements-cms-contract.md)
// Cached for 5 minutes (ISR), so a change in the CMS shows within about 5 minutes and the visitor never waits on the CRM.
// If the CRM is slow or down, or has nothing to announce, nothing is rendered: the page is exactly as before.
import type { AnnouncementItem } from "./types";
import AnnouncementModal from "./AnnouncementModal";

const API = process.env.NEXT_PUBLIC_API_URL;
const REVALIDATE_SECONDS = 300;
const MAX_TRAININGS = 4;

async function getJson(path: string): Promise<unknown> {
  if (!API) return null;
  try {
    const res = await fetch(`${API}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

const isFuture = (iso: unknown) => typeof iso === "string" && !Number.isNaN(Date.parse(iso)) && Date.parse(iso) > Date.now();
const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
// Internal links only: a CMS typo or a pasted external link can never send visitors off the site from this popup.
const internalHref = (v: unknown) => (typeof v === "string" && /^\/(?!\/)[\w\-./#?=&%]*$/.test(v.trim()) ? v.trim() : undefined);

export default async function AnnouncementLoader() {
  const [webinarRes, listRes] = await Promise.all([
    getJson("/api/webinars/public/free-weekly/next"),
    getJson("/api/v1/announcements/public"),
  ]);

  const items: AnnouncementItem[] = [];

  const w = webinarRes as { _id?: string; title?: string; date?: string } | null;
  if (w?._id && w.title && isFuture(w.date)) {
    items.push({ id: `webinar-${w._id}`, kind: "webinar", title: text(w.title, 120), startsAt: w.date as string });
  }

  const raw = (listRes as { data?: unknown[] } | null)?.data;
  if (Array.isArray(raw)) {
    for (const r of raw as Record<string, unknown>[]) {
      const kind = r?.type === "webinar" ? "webinar" : r?.type === "training" ? "training" : null;
      const title = text(r?.title, 120);
      if (!kind || !title || !isFuture(r?.startsAt)) continue;
      if (kind === "webinar" && items.some((i) => i.kind === "webinar")) continue; // one webinar line is enough
      items.push({
        id: `${kind}-${String(r?._id ?? title)}`,
        kind,
        title,
        note: text(r?.note, 140) || undefined,
        startsAt: r.startsAt as string,
        href: internalHref(r?.href),
      });
    }
  }

  const webinar = items.find((i) => i.kind === "webinar");
  const trainings = items
    .filter((i) => i.kind === "training")
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))
    .slice(0, MAX_TRAININGS);

  const shown = [...(webinar ? [webinar] : []), ...trainings];
  if (shown.length === 0) return null;

  // Changes whenever the list changes, so a returning visitor sees the popup again when something new is announced.
  const version = shown.map((i) => `${i.id}@${i.startsAt}@${i.title}`).join("|");
  return <AnnouncementModal items={shown} version={version} />;
}
