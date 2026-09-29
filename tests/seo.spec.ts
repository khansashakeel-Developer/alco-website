/**
 * SEO regression test for arslanlarik.com (DECISIONS v2 T6). Runnable by hand:
 *
 *   SEO_BASE_URL=https://arslanlarik.com npm run test:seo
 *   SEO_BASE_URL=https://<staging-host> npm run test:seo
 *
 * Optional switches:
 *   SEO_INCLUDE_SAFEGUARDING=1   also test /safeguarding-and-ethics (only once it is live)
 *   SEO_INCLUDE_BLOG_POSTS=1     also test every /blogs/<slug> listed in /sitemap.xml
 *
 * Canonicals are always expected on https://arslanlarik.com, even when testing staging.
 * Source of the URL list: 03 SEO parameters/MASTER SEO TABLE.csv (robots "index, follow").
 */
import { test, expect, type APIRequestContext, type Page } from "@playwright/test";

const BASE = (process.env.SEO_BASE_URL || "https://arslanlarik.com").replace(/\/+$/, "");
const ORIGIN = "https://arslanlarik.com";

type Case = { path: string; canonical?: string };

// Every indexable URL in the MASTER SEO TABLE, plus /free-webinar (A 10).
const PAGES: Case[] = [
  { path: "/" },
  { path: "/programs" },
  { path: "/free-webinar" },
  { path: "/our-mission" },
  { path: "/about-us/who-is-arslan-larik" },
  { path: "/about-us/who-is-bismillah-pervez" },
  { path: "/about-us/why-train-with-alco" },
  { path: "/testimonial" },
  { path: "/contact" },
  { path: "/program/nlp-practitioner" },
  { path: "/program/nlp-master-practitioner" },
  { path: "/program/advanced-hypnotherapy-interventionist" },
  { path: "/program/nlp-trainers-training-program" },
  { path: "/program/hypnosis-trainers-training-program" },
  { path: "/program/nlp-master-trainer-program" },
  // Course outlines canonicalise to their level page (spec C 04; MASTER table "canonical" column).
  { path: "/course-outline/nlp-practitioner", canonical: "/program/nlp-practitioner" },
  { path: "/course-outline/nlp-master-practitioner", canonical: "/program/nlp-master-practitioner" },
  { path: "/course-outline/advanced-hypnotherapy-interventionist", canonical: "/program/advanced-hypnotherapy-interventionist" },
  { path: "/program-detail/benefits-of-choosing-nlp-training-course" },
  { path: "/program-detail/how-nlp-master-practitioner-training-helps-you-in-your-life" },
  { path: "/one-on-one-coaching-sessions" },
  { path: "/services/four-clouds-model" },
  { path: "/services/resources" },
  { path: "/blogs" },
  { path: "/faqs" },
  { path: "/privacy-policy" },
  { path: "/refund-policy" },
  { path: "/service-policy" },
  { path: "/terms" },
];
if (process.env.SEO_INCLUDE_SAFEGUARDING === "1") PAGES.push({ path: "/safeguarding-and-ethics" });

const NOINDEX_PAGES = ["/thank-you", "/enroll", "/audio-access"];

// ---------- patterns ----------

// A currency followed by a figure, a figure followed by a currency, or a JSON-LD price field.
const PRICE_PATTERNS: RegExp[] = [
  /\b(?:PKR|Rs\.?|USD|AUD|CAD|GBP|US\$)\s?\d/i,
  /[$£€]\s?\d/,
  /\d[\d,.]*\s?(?:PKR|USD|AUD|rupees|lakh)\b/i,
];
const JSONLD_PRICE_FIELDS = /"(?:price|priceCurrency|offers|lowPrice|highPrice)"\s*:/i;

// D8: numbers that must not appear anywhere.
const REMOVED_NUMBERS: RegExp[] = [
  /8886814808/,
  /888\)?[\s.-]*681[\s.-]*4808/,
  /3358559627/,
  /335[\s.-]*855[\s.-]*9627/,
  /2065140234/,
  /206\)?[\s.-]*514[\s.-]*0234/,
  /9233600822222/,
];
// D8: the US and Canada number is display-only: never a tel: or wa.me link.
const US_NUMBER_AS_LINK = /href="(?:tel:|https?:\/\/(?:api\.)?wa\.me\/|https?:\/\/api\.whatsapp\.com\/send\?phone=)[^"]*2066140234/i;

// ---------- helpers ----------

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x2F;/g, "/");

const attr = (tag: string, name: string) => {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : null;
};

const tags = (html: string, tagName: string) => html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];

const jsonLdBlocks = (html: string) =>
  Array.from(html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)).map((m) => m[1]);

const expectedCanonical = (c: Case) => {
  const p = c.canonical ?? c.path;
  return p === "/" ? ORIGIN : `${ORIGIN}${p}`;
};

async function rawHtml(request: APIRequestContext, path: string) {
  const res = await request.get(`${BASE}${path}`, { maxRedirects: 0 });
  expect(res.status(), `${path} should return 200 without a redirect`).toBe(200);
  return res.text();
}

async function checkPage(page: Page, request: APIRequestContext, c: Case, opts: { dashIsError: boolean }) {
  const html = await rawHtml(request, c.path);

  // 1. Exactly one H1 in the server HTML.
  const h1s = tags(html, "h1");
  expect(h1s.length, `${c.path}: number of <h1> in server HTML`).toBe(1);

  // 2. One absolute canonical, equal to the expected URL.
  const canon = tags(html, "link").filter((t) => /rel="canonical"/i.test(t));
  expect(canon.length, `${c.path}: number of canonical tags`).toBe(1);
  const href = attr(canon[0], "href");
  expect(href, `${c.path}: canonical must be absolute on ${ORIGIN}`).toMatch(/^https:\/\/arslanlarik\.com(\/|$)/);
  expect(href, `${c.path}: canonical`).toBe(expectedCanonical(c));

  // 3. Meta description 140 to 155 characters.
  const descTags = tags(html, "meta").filter((t) => /name="description"/i.test(t));
  expect(descTags.length, `${c.path}: number of meta descriptions`).toBe(1);
  const desc = attr(descTags[0], "content") ?? "";
  expect(desc.length, `${c.path}: description length (${desc.length}) "${desc}"`).toBeGreaterThanOrEqual(140);
  expect(desc.length, `${c.path}: description length (${desc.length}) "${desc}"`).toBeLessThanOrEqual(155);

  // 7. Indexable pages must not carry noindex.
  const robots = tags(html, "meta").filter((t) => /name="robots"/i.test(t)).map((t) => attr(t, "content") ?? "");
  for (const r of robots) expect(r, `${c.path}: robots meta`).not.toMatch(/noindex/i);

  // 4. No price in JSON-LD or the description.
  for (const block of jsonLdBlocks(html)) {
    expect(block, `${c.path}: JSON-LD must carry no price or offers`).not.toMatch(JSONLD_PRICE_FIELDS);
    expect(block, `${c.path}: the +1 (206) number must never be in JSON-LD`).not.toMatch(/2066140234|206\)?\s*614\s*0234/);
  }
  for (const p of PRICE_PATTERNS) expect(desc, `${c.path}: price in description`).not.toMatch(p);

  // 5. No removed number anywhere in the HTML; the US number is never a link.
  for (const n of REMOVED_NUMBERS) expect(html, `${c.path}: removed number ${n}`).not.toMatch(n);
  expect(html, `${c.path}: +1 (206) 614 0234 must not be a link`).not.toMatch(US_NUMBER_AS_LINK);

  // Visible text, after hydration (menus and accordions included as rendered).
  await page.goto(`${BASE}${c.path}`, { waitUntil: "domcontentloaded" });
  const text = await page.locator("body").innerText();

  // 4. No price in the visible text.
  for (const p of PRICE_PATTERNS) expect(text, `${c.path}: price pattern ${p} in visible text`).not.toMatch(p);

  // 6. No em dash in the visible text; en dash is a warning.
  if (opts.dashIsError) {
    expect(text.includes("—"), `${c.path}: em dash in visible text`).toBe(false);
  } else if (text.includes("—")) {
    test.info().annotations.push({ type: "warning", description: `${c.path}: em dash in visible text (blog post, G6: left as is)` });
  }
  if (text.includes("–")) {
    test.info().annotations.push({ type: "warning", description: `${c.path}: en dash in visible text (V4)` });
  }
}

// ---------- tests ----------

test.describe("Indexable pages (MASTER SEO TABLE)", () => {
  for (const c of PAGES) {
    test(`SEO ${c.path}`, async ({ page, request }) => {
      await checkPage(page, request, c, { dashIsError: true });
    });
  }
});

test("Blog posts from the sitemap (optional)", async ({ page, request }) => {
  test.skip(process.env.SEO_INCLUDE_BLOG_POSTS !== "1", "Set SEO_INCLUDE_BLOG_POSTS=1 to include blog posts");
  test.setTimeout(20 * 60_000);
  const xml = await (await request.get(`${BASE}/sitemap.xml`)).text();
  const paths = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g))
    .map((m) => decode(m[1]).replace(ORIGIN, ""))
    .filter((p) => /^\/blogs\/[^/]+$/.test(p));
  expect(paths.length, "blog posts in the sitemap").toBeGreaterThan(0);
  for (const path of paths) {
    await test.step(path, async () => {
      // Blog posts are left as they are (DECISIONS v2 G6), so a dash is a warning there.
      await checkPage(page, request, { path: decodeURI(path) }, { dashIsError: false });
    });
  }
});

test("Utility pages are noindex", async ({ request }) => {
  for (const path of NOINDEX_PAGES) {
    const html = await rawHtml(request, path);
    const robots = tags(html, "meta").filter((t) => /name="robots"/i.test(t)).map((t) => attr(t, "content") ?? "");
    expect(robots.join(" "), `${path}: robots meta`).toMatch(/noindex/i);
  }
});

test("robots.txt follows DECISIONS v2 G8", async ({ request }) => {
  const body = await (await request.get(`${BASE}/robots.txt`)).text();

  // Split into groups: consecutive User-Agent lines followed by their rules.
  const groups: { agents: string[]; rules: string[] }[] = [];
  let current: { agents: string[]; rules: string[] } | null = null;
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    if (/^user-agent$/i.test(key)) {
      if (!current || current.rules.length) groups.push((current = { agents: [], rules: [] }));
      current.agents.push(value.toLowerCase());
    } else if (current && /^(allow|disallow)$/i.test(key)) {
      current.rules.push(`${key.toLowerCase()}:${value}`);
    }
  }
  const groupFor = (agent: string) =>
    groups.find((g) => g.agents.includes(agent.toLowerCase())) ?? groups.find((g) => g.agents.includes("*"));

  const blocked = ["GPTBot", "Google-Extended", "ClaudeBot", "anthropic-ai", "CCBot", "Bytespider",
    "Applebot-Extended", "meta-externalagent", "Amazonbot", "cohere-ai", "Diffbot", "omgili"];
  for (const bot of blocked) {
    expect(groupFor(bot)?.rules, `${bot} must be blocked`).toContain("disallow:/");
  }

  const allowed = ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot",
    "Perplexity-User", "Claude-SearchBot", "Claude-User", "*"];
  for (const bot of allowed) {
    const rules = groupFor(bot)?.rules ?? [];
    expect(rules, `${bot} must not be blocked from the site`).not.toContain("disallow:/");
    expect(rules, `${bot}: /api/ closed`).toContain("disallow:/api/");
  }

  expect(body).toMatch(/Sitemap:\s*https:\/\/arslanlarik\.com\/sitemap\.xml/i);
});

test("sitemap.xml lists the hub and never Business in the Box", async ({ request }) => {
  const xml = await (await request.get(`${BASE}/sitemap.xml`)).text();
  expect(xml).toContain(`<loc>${ORIGIN}/programs</loc>`);
  expect(xml).not.toContain("business-in-the-box");
  for (const p of ["/thank-you", "/enroll", "/maintenance", "/audio-access", "/eula", "/course-outline/"]) {
    expect(xml, `sitemap must not list ${p}`).not.toContain(`${ORIGIN}${p}`);
  }
});
