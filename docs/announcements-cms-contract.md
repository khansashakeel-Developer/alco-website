# Announcement window: what the CRM (website CMS) must provide

The website shows two small announcement windows, one after the other: first the upcoming trainings, then (after "Not now") the free webinar.
The website only READS. Marketing edits titles and dates in the CRM; the site picks them up within about 5 minutes.

## 1. Free webinar (already built in the CRM)
`GET /api/webinars/public/free-weekly/next` -> `{ "_id": "...", "title": "...", "date": "2026-10-14T15:00:00.000Z" }`
Used as is. The same endpoint feeds the free-webinar form. No change needed. If it answers 404 or no webinar, the webinar block is simply not shown.

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
| `href` | Optional. Internal link only, must start with `/` (for example `/program/nlp-practitioner`). Anything else is ignored. |

CMS admin screen: a simple list (title, type, start date and time, link, Active on/off). The endpoint returns only Active items.
The site shows the next 4 trainings, soonest first.

## Website copy rules for whoever edits these in the CMS
- No prices, fees or discounts (house rule: "investment" only, and never a figure).
- No em dashes; never the word "help".
- Use "AL&CO", never "ALCO".
- The free webinar is for first-time, non-graduates. The webinar block links to the free-webinar page, which runs the graduate check.

## If the endpoint does not exist yet
Nothing breaks. The window shows only the free webinar (if there is one) and shows nothing at all when there is nothing to announce.
