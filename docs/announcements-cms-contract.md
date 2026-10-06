# Announcements: CRM contract

The website pop-ups and the NLP Practitioner strip read from the CRM. Marketing edits everything in the CRM; no website deploy is needed.

## What marketing does in the CRM

- **Upcoming trainings**: open a Batch, tick **Announce on website** (pop-up). Tick **Show in strip** to also show it in the scrolling strip under the header.
- **Webinar**: edit the Webinar, upload the **flyer image**. Only the flyer is needed for the announcement.

## Endpoints (CRM backend)

| Purpose | Method and path |
|---|---|
| Upcoming trainings | `GET /api/v1/announcements/public` |
| Next free weekly webinar | `GET /api/webinars/public/free-weekly/next` |
| Flyer upload (admin) | `POST /api/v1/announcements/flyer` (multipart field `flyer`, returns `{ url }`) |

### Trainings response

```json
{ "success": true, "data": [
  { "_id": "...", "type": "training", "title": "<Program>, <Batch>",
    "startsAt": "2026-11-01T00:00:00.000Z", "href": "/program/<slug>", "showInStrip": true }
] }
```

Only batches with `announce: true` and a future start date are returned.

## Data model

- Batch: `announce` (Boolean), `show_in_strip` (Boolean).
- Webinar: `flyerUrl` (String).

## Website behaviour

- `getAnnouncements.ts` reads both endpoints (ISR, 5 min, 3 s timeout) and reads `showInStrip` and `flyerUrl`.
- Pop-up order: trainings first, then the webinar after "Not now" or close.
- Hrefs are internal paths only.
