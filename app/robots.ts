import type { MetadataRoute } from "next";

const SITE_URL = "https://arslanlarik.com";

// Never crawled by anyone: API routes and the admin area.
const PRIVATE_PATHS = ["/api/", "/admin/"];

// DECISIONS v2 G8, allowed: search engines, plus the live answer and search bots that
// fetch a page when a person asks an assistant a question, so they can cite AL&CO.
const SEARCH_AND_ANSWER_BOTS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
];

// DECISIONS v2 G8, blocked: model-training and bulk crawlers.
// robots.txt is honoured by reputable crawlers but it is not a lock.
const TRAINING_AND_BULK_CRAWLERS = [
  "GPTBot",
  "Google-Extended",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Bytespider",
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Diffbot",
  "omgili",
  "omgilibot",
  "FacebookBot",
  "ImagesiftBot",
  "PetalBot",
  "Timpibot",
  "AI2Bot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Noindex pages (thank-you, enroll, audio-access, webinars, maintenance) stay crawlable
      // so Google can read their noindex tag. Only private paths are blocked.
      { userAgent: SEARCH_AND_ANSWER_BOTS, allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: TRAINING_AND_BULK_CRAWLERS, disallow: "/" },
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
