# Handover for Khansa: the updated arslanlarik.com

**25 September 2026. Prepared by Liara for Arslan.**

This folder is the **complete website repository**: the live site's code (snapshot of 23 September) with the Website Update Manual v2 applied throughout. **You do not need the manual to deploy it.** Every change is already in the code.

## What is already done

- **Every page is updated to the long brochure and Arslan's decisions.** Six level pages, a new All Programmes hub (`/programs`), home, the about pages, Our Mission, contact, FAQs, private coaching, the services pages, the policies, and a new safeguarding page.
- **Calls to action follow the CTA plan on every page.** Shared definitions are in `component/cta.ts` and `component/CtaButton.tsx`. Every CTA button has `data-cta-id` and `data-gtm-event` attributes.
- **SEO:**
  - Each page has its own title, a 140 to 155 character description, one H1 and a self canonical.
  - JSON-LD: Organization, Course with EducationalOccupationalProgram, Person, FAQPage and BlogPosting, with no prices.
  - Other files: the new sitemap, the robots rules (G8: AI answer bots allowed, AI training bots blocked), `llms.txt`, 301 redirects for old URLs, and a real 404 page.
- **Contact details:**
  - Only +92 336 008 2222 is linked, for calls and WhatsApp.
  - US and Canada: +1 (206) 614 0234 appears as plain text only.
  - Every other number is removed.
  - The address is the official one.
- **Leads:** all existing CRM connections are kept (createLead, Turnstile, fbc/fbp, CAPI route, audio portal, webinars, blogs). Three fixes are added:
  - Meta's Lead event now fires for enrolments; it only fired for the contact form before.
  - Lead `source` values are cleaned to the CRM's 17 allowed values, so no lead is rejected (`normalizeSource` in `utils/api.tsx`).
  - The contact form now shows an error instead of failing silently.
- **Speed:**
  - Oversized images are re-encoded (the hero image went from 6.4 MB to 184 KB; same file names).
  - The Meta Pixel and chat widget load lazily; GTM loads after interactive.
- **SEO titles now come from the code, not the CRM.** Pages no longer read titles, descriptions or JSON-LD from the CRM's SEO records, which contained old claims and prices. To change a title, change the code.

## How it was checked

- `npx tsc --noEmit`: no errors.
- **`next build`: passes.** All 41 routes build. Google Fonts were stubbed in the test environment only; the real build fetches them normally.
- **Every page served and checked:**
  - status 200;
  - one H1 per page;
  - unique titles;
  - descriptions of 144 to 155 characters;
  - self canonicals;
  - noindex on thank-you, enroll, eula, audio-access, maintenance, webinars and safeguarding.
- **Redirects:** the old WordPress and typo URLs return 301 to the right pages.
- **Rendered HTML scanned** for prices, removed numbers, "triple", "scientifically" and long dashes: none found.

## How to deploy (please follow this order)

1. **Create a branch** (for example `website-v2`) from the commit that Vercel currently serves in Production. Replace the repository files with this folder's contents. Keep your `.env` settings: no new environment variables are needed.
2. **Run `npm install`,** then `npm run build`.
3. **Deploy to a Vercel Preview**, and click through the preview:
   - the six level pages, `/programs`, home, contact and `/free-webinar`;
   - one enrolment and one contact-form test lead. Check that each arrives in the CRM, and that the thank-you page fires the Lead event (Meta Events Manager, Test Events).
4. **Merge to Production.**
5. **In Search Console:** submit the sitemap and validate the "Not found (404)" report.
6. **Optional:** `npm run test:seo`, the Playwright SEO test. Run `npx playwright install` first.

## What is still yours to do (short)

### A. Artwork (the only visual gaps)

Search the code for `LOGO:`. Each marker shows where approved artwork is needed:

| Logo | Where |
|---|---|
| **TLTA seal** | The repo's `tlta.webp` prints an expiry date ("Exp. 11/30/2020"), so it is removed from the pages until an undated version is supplied |
| **11 of the 12 client organisations** (all except Bank Alfalah) | Name tiles for now, on the homepage ("Organisations we have worked with") |
| **ABNLP, ABNLP Coaching Division, ABH, NGH, ANLP CPD, ICF MCC, AL&CO** | The existing badges are used. Please confirm they are the current approved versions |
| **Generated placeholder images** | `public/og-default.jpg`, `public/og/*.jpg`, `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`, `public/logo-512.png`. Replace with designed versions when ready |
| **Bismillah's homepage card** | Uses a crop of her about-page banner. A proper portrait is better |

### B. CRM-side changes (the website works without them)

1. **Programme names:** in the `programs` collection, set `business-in-the-box` inactive, and rename the six records to the brochure names (these show in the enrol dropdown).
2. **Free weekly webinar (decision G7), after Bismillah confirms the flow:**
   - add the graduate check to `registerForWebinar`;
   - create the Lead with source `webinar`;
   - email the Zoom link only;
   - add `getNextFreeWebinar`.

   Specs are in the manual, A 10, steps 1 to 4. Until then, `/free-webinar` saves sign-ups as a Lead and tells people their relationship manager will send the joining details.
3. **Blog records:** fix the slug that contains a comma (`deliver-engaging,-high-impact-training-sessions`). Blog content is Sawera's, after keyword research (G6).
4. **Optional:** clean the old SEO records (the 500,000 claims, prices). The site no longer reads them.

### C. Tracking (for Sawera, in GTM)

Add click triggers on `[data-gtm-event]`, reading `data-cta-id`. The events are `whatsapp_click`, `webinar_cta_click`, `cta_click`, `enrol_click`, `phone_click` and `coaching_apply_click`.

## Decisions still open (for Arslan and Bismillah; the site ships safely either way)

1. **/our-mission greeting "Assalam-o-Alaikum":** kept from the spec. Arslan's rule keeps religion out of marketing. Keep or remove?
2. **Refund wording:** the page follows the Cooling-Off Agreement ("7 or more calendar days"; a reason requested). Arslan's summary said "more than 7" and a reason "must be given". Legal review to confirm.
3. **Safeguarding page:** live but set to noindex, and not yet in the footer or sitemap, until legal review. After sign-off: set it to `index` in `app/safeguarding-and-ethics/page.tsx`, uncomment its line in `app/sitemap.ts` and the footer link in `component/Footer.tsx`, and run the SEO test with `SEO_INCLUDE_SAFEGUARDING=1`.
4. **Terms and EULA:** they mention instalment plans agreed in writing (contractual wording). Keep, or remove under the no-payment-plans rule?
5. **The "How is NLP different from ICF?" FAQ** was removed to keep ICF away from the institute's certifications. Restore it if Arslan prefers.

## Where the detail is

- Every change, file by file: `git diff` against the baseline commit, if you keep the history. Otherwise compare with the 23 Sep snapshot.
- Worklogs by work package, and the Website Update Manual v2, are in Arslan's SEO folder: `10 Website Update Manual — 23 Sep 2026`.
