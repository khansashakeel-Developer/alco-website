# Announcement window: what the CRM (website CMS) must provide

The website shows two small announcement windows, one after the other: first the upcoming trainings, then (after "Not now") the free webinar.
The website only READS. Marketing edits titles and dates in the CRM; the site picks them up within about 5 minutes.

## 1. Free webinar (already built in the CRM, plus ONE new field)
`GET /api/webinars/public/free-weekly/next` -> `{ "_id": "...", "title": "...", "date": "2026-10-14T15:00:00.000Z", "flyerUrl": "https://res.cloudinary.com/..." }`
**NEW: `flyerUrl` (image upload).** In the CMS webinar screen, add an "Upload flyer" field. The marketing team uploads ONLY the flyer: when it is present the website's webinar window shows just the flyer image (title, date and time are on the flyer) with the "Join the free webinar" button. Without a flyer it shows a plain title and date. The upload should go to Cloudinary (or the CRM's own storage); the site only accepts `https` images from `res.cloudinary.com`, `arslanlarik.com` and the CRM's own host. Recommended flyer: portrait 4:5 (for example 1080 x 1350 px), JPG or WebP, under 300 KB, no prices. The same endpoint feeds the free-webinar form. No change needed. If it answers 404 or no webinar, the webinar block is simply not shown.

## 2. Upcoming trainings and extra announcements (NEW, needs building in the CRM)
`GET /api/v1/announcements/public` (public, no token, CORS not needed: it is called from the website server)

```json
{
  "data": [
    {
      "_id": "6702...",
      "type": "training",
      "title": "NLP Practitioner, Batch 98",
      "startsAt": "2026-11-02T15:00:00.000Z",
      "showInStrip": true,
      "href": "/program/nlp-practitioner"
    }
  ]
}
```

| Field | Rule |
| --- | --- |
| `type` | `"training"` or `"webinar"`. Only one webinar line is shown (the free-weekly endpoint wins). |
| `title` | Required. Plain text, up to 120 characters. Shown as text, never as HTML. |
| `startsAt` | Required. ISO date-time in UTC. Shown to visitors in Pakistan time (PKT). Items in the past are hidden automatically. |
| `showInStrip` | Optional checkbox, "Show in the scrolling strip". The soonest flagged training appears in the strip under the menu (use it for the next NLP Practitioner batch). None flagged means no strip. |
| `image` | Only for `type: "webinar"` items: the flyer (same rules as `flyerUrl` above). |
| `href` | Optional. Internal link only, must start with `/` (for example `/program/nlp-practitioner`). Anything else is ignored. |

CMS admin screen: a simple list (title, type, start date and time, link, "Show in strip", flyer upload for webinars, Active on/off). The endpoint returns only Active items.
The site shows the next 4 trainings, soonest first.

## Website copy rules for whoever edits these in the CMS
- No prices, fees or discounts (house rule: "investment" only, and never a figure).
- No em dashes; never the word "help".
- Use "AL&CO", never "ALCO".
- The free webinar is for first-time, non-graduates. The webinar block links to the free-webinar page, which runs the graduate check.

## If the endpoint does not exist yet
Nothing breaks. The window shows only the free webinar (if there is one) and shows nothing at all when there is nothing to announce.
