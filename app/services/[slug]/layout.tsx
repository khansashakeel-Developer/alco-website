import { Metadata } from "next";
import { buildMetadata, fallbackMetadata, SITE_URL } from "@/utils/buildMetadata";

// Fallback titles and descriptions per service page (D 05 and D 06, section B), used when the CMS record is missing.
const FALLBACK: Record<string, { title: string; description: string; name: string }> = {
  "four-clouds-model": {
    title: "The Four Clouds Model: What Holds You Back | AL&CO",
    description:
      "The Four Clouds Model by AL&CO: limiting beliefs, negative emotions, negative thinking and inner conflict. See what holds you back, then book a call.",
    name: "The Four Clouds Model",
  },
  resources: {
    title: "Free NLP Resources, eBooks and Audio Library | AL&CO",
    description:
      "Free NLP eBooks from AL&CO, plus the graduate audio library: 222 Level 1 and 225 Level 2 audio files. Explore the resources and request access today.",
    name: "Free NLP Resources and eBooks",
  },
};

async function getSeoData(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/seo/page/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    const { data } = await res.json();
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;


  const path = `/services/${slug}`;
  const fb = FALLBACK[slug];

  return fb
      ? fallbackMetadata(fb.title, path, fb.description)
      : fallbackMetadata("Services | AL&CO", path);
}

export default async function ServicesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fb = FALLBACK[slug];

  // D 05 / D 06 section B: global Organization only, plus an optional BreadcrumbList.
  // The raw CMS `structuredData` string is no longer injected, so no price or offer can reach the page.
  const breadcrumbJsonLd = fb
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: fb.name, item: `${SITE_URL}/services/${slug}` },
        ],
      }
    : null;

  return (
    <>
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      {children}
    </>
  );
}