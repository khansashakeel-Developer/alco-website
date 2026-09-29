import type { Metadata } from "next";

export const SITE_URL = "https://arslanlarik.com";

export const DEFAULT_OG_IMAGE = {
  url: "/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "Arslan Larik & Company (AL&CO): a live NLP training session on Zoom",
};

const stripSlash = (u?: string) => (u ?? "").trim().replace(/\/+$/, "");

/** Absolute self URL for a path such as "/" or "/program/nlp-practitioner". */
export const selfUrl = (path: string) =>
  path === "/" || path === "" ? SITE_URL : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/+$/, "");

/**
 * Turns a CMS SeoMeta record into Next metadata.
 * `path` is REQUIRED so the canonical can never fall back to the homepage.
 * A CMS canonical is trusted only if it points at this same path.
 */
export const buildMetadata = (data: any, path: string): Metadata => {
  const self = selfUrl(path);
  const cmsCanonical = stripSlash(data?.canonical);
  const canonical = cmsCanonical && cmsCanonical === stripSlash(self) ? cmsCanonical : self;

  const ogImages = data?.openGraph?.image ? [{ url: data.openGraph.image }] : [DEFAULT_OG_IMAGE];
  const twImages = data?.twitter?.image
    ? [data.twitter.image]
    : data?.openGraph?.image
      ? [data.openGraph.image]
      : [DEFAULT_OG_IMAGE.url];

  return {
    title: data?.title,
    description: data?.description,
    keywords: data?.keywords,
    alternates: { canonical },
    openGraph: {
      title: data?.openGraph?.title || data?.title,
      description: data?.openGraph?.description || data?.description,
      url: canonical,
      siteName: "AL&CO",
      locale: "en_PK",
      type: (data?.openGraph?.type as any) || "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: data?.twitter?.title || data?.openGraph?.title || data?.title,
      description: data?.twitter?.description || data?.openGraph?.description || data?.description,
      images: twImages,
    },
    robots: {
      index: data?.robots?.index ?? true,
      follow: data?.robots?.follow ?? true,
    },
  };
};

/** Used when the CMS record is missing, so the page still self-canonicalises. */
export const fallbackMetadata = (title: string, path: string, description?: string): Metadata => {
  const canonical = selfUrl(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: "AL&CO", locale: "en_PK", type: "website", images: [DEFAULT_OG_IMAGE] },
  };
};
