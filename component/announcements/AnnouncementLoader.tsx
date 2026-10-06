// Server component: the two announcement windows (trainings, then webinar). Renders the popup with whatever the CMS has.
import AnnouncementModal from "./AnnouncementModal";
import { getAnnouncements } from "./getAnnouncements";

const MAX_TRAININGS = 4;

export default async function AnnouncementLoader() {
  const items = await getAnnouncements();
  const webinar = items.find((i) => i.kind === "webinar");
  const trainings = items
    .filter((i) => i.kind === "training")
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))
    .slice(0, MAX_TRAININGS);
  const shown = [...(webinar ? [webinar] : []), ...trainings];

  // Changes whenever the list changes, so a returning visitor sees the windows again when something new is announced.
  const version = shown.map((i) => `${i.id}@${i.startsAt}@${i.title}@${i.image ?? ""}`).join("|");
  // Rendered even when the list is empty: the popup itself shows nothing then, except in design-preview mode (?announce-preview=1).
  return <AnnouncementModal items={shown} version={version} />;
}
