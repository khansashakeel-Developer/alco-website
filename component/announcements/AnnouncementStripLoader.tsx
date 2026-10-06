// Server component: picks the training the marketing team flagged "Show in strip" (the soonest one) and renders the strip.
import AnnouncementStrip from "./AnnouncementStrip";
import { getAnnouncements } from "./getAnnouncements";

export default async function AnnouncementStripLoader() {
  const items = await getAnnouncements();
  const item = items
    .filter((i) => i.kind === "training" && i.inStrip)
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))[0];
  return <AnnouncementStrip item={item ?? null} />;
}
