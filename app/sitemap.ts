import { MetadataRoute } from "next";
import { programs } from "@/app/program/[slug]/data";

// Rebuild the sitemap's dynamic data (blogs, program dates) at most once an hour.
export const revalidate = 3600;

const SITE_URL = "https://arslanlarik.com";

// Set this to the deploy date whenever page content is updated.
const CONTENT_UPDATED = new Date("2026-09-30");

// Never list these: noindex pages, cross-canonical pages and anything without its own page.
//   /thank-you, /enroll, /maintenance, /audio-access, /webinars/*, /eula,
//   /course-outline/* (canonical points to the level page, spec C 04),
//   /program-detail/benefits-of-advanced-hypnotherapy-interventionist-training (noindex, spec C 09),
//   /program/business-in-the-box (D7, no page).
// A sitemap URL must equal that page's canonical and be indexable.

async function fetchWithTimeout(url: string, ms = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { next: { revalidate: 3600 }, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

// Programs: the LOCAL array decides which URLs exist; the CRM only supplies updatedAt.
async function getProgramEntries(): Promise<MetadataRoute.Sitemap> {
  const updated: Record<string, string> = {};
  try {
    const params = new URLSearchParams({ status: "active" });
    const res = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/programs/public?${params.toString()}`
    );
    if (res.ok) {
      const json = await res.json();
      const live: Array<{ slug?: string; updatedAt?: string }> = json?.data ?? [];
      for (const p of live) {
        if (p.slug && p.updatedAt) updated[p.slug] = p.updatedAt;
      }
    }
  } catch {
    // CRM unreachable: dates fall back to CONTENT_UPDATED.
  }

  return programs.map((p) => {
    const crmDate = updated[p.slug] ? new Date(updated[p.slug]) : null;
    return {
      url: `${SITE_URL}/program/${p.slug}`,
      lastModified: crmDate && crmDate > CONTENT_UPDATED ? crmDate : CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    };
  });
}

// Blogs: pulled from the CMS so deleted posts drop out and new posts appear.
async function getBlogEntries(): Promise<MetadataRoute.Sitemap> {
  const LIMIT = 50;
  const entries: MetadataRoute.Sitemap = [];
  try {
    let page = 1;
    let totalPages = 1;
    do {
      const params = new URLSearchParams({ page: String(page), limit: String(LIMIT), status: "published" });
      const res = await fetchWithTimeout(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/public?${params.toString()}`
      );
      if (!res.ok) break;

      const json = await res.json();
      const blogs: Array<{ slug: string; updatedAt?: string }> = json?.data ?? [];
      const total: number = json?.meta?.total ?? blogs.length;
      totalPages = Math.max(1, Math.ceil(total / LIMIT));

      for (const b of blogs) {
        if (!b.slug) continue;
        entries.push({
          // encodeURI keeps a CMS slug with a comma or space valid in XML.
          url: encodeURI(`${SITE_URL}/blogs/${b.slug}`),
          lastModified: b.updatedAt ? new Date(b.updatedAt) : CONTENT_UPDATED,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
      page++;
    } while (page <= totalPages);
  } catch {
    // CMS unreachable: omit blog posts for this build.
  }
  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogEntries, programEntries] = await Promise.all([getBlogEntries(), getProgramEntries()]);
  const d = CONTENT_UPDATED;

  return [
    // Core
    { url: SITE_URL, lastModified: d, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/programs`, lastModified: d, changeFrequency: "monthly", priority: 0.95 },

    // The six levels (local list only)
    ...programEntries,

    // Conversion and services
    { url: `${SITE_URL}/one-on-one-coaching-sessions`, lastModified: d, changeFrequency: "monthly", priority: 0.8 },
    // DECISIONS v2 G7: public sign-up page for the free weekly webinar (A 10). Add in the deploy that ships the page.
    { url: `${SITE_URL}/free-webinar`, lastModified: d, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: d, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/four-clouds-model`, lastModified: d, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/services/resources`, lastModified: d, changeFrequency: "monthly", priority: 0.6 },

    // About
    { url: `${SITE_URL}/about-us/who-is-arslan-larik`, lastModified: d, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/about-us/who-is-bismillah-pervez`, lastModified: d, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/about-us/why-train-with-alco`, lastModified: d, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/our-mission`, lastModified: d, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/faqs`, lastModified: d, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/testimonial`, lastModified: d, changeFrequency: "monthly", priority: 0.6 },

    // Blog
    { url: `${SITE_URL}/blogs`, lastModified: d, changeFrequency: "weekly", priority: 0.8 },
    ...blogEntries,

    // Program detail (indexable topic tables for Levels 1 and 2; Level 3 stays noindex)
    { url: `${SITE_URL}/program-detail/benefits-of-choosing-nlp-training-course`, lastModified: d, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/program-detail/how-nlp-master-practitioner-training-helps-you-in-your-life`, lastModified: d, changeFrequency: "yearly", priority: 0.4 },

    // Legal
    { url: `${SITE_URL}/privacy-policy`, lastModified: d, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/refund-policy`, lastModified: d, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/service-policy`, lastModified: d, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: d, changeFrequency: "yearly", priority: 0.3 },
    // E 01 C.4: uncomment only at go-live of the safeguarding page.
    // { url: `${SITE_URL}/safeguarding-and-ethics`, lastModified: d, changeFrequency: "yearly", priority: 0.3 },
  ];
}
