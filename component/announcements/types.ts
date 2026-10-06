// One announcement item, as the website uses it. The CRM (the website CMS) is the source: see docs/announcements-cms-contract.md.
export type AnnouncementItem = {
  id: string;
  kind: "webinar" | "training";
  /** Plain text typed by the marketing team in the CMS. Never HTML. */
  title: string;
  /** ISO date-time. For a training this is the first session; for a webinar the session itself. */
  startsAt: string;
  /** Internal link only (starts with "/"). Trainings without one fall back to the Enrol now button. */
  href?: string;
  /** Webinar only: the flyer the marketing team uploads. When present, the webinar window shows only this image. */
  image?: string;
  /** Training only: show this training in the scrolling strip under the menu. */
  inStrip?: boolean;
};