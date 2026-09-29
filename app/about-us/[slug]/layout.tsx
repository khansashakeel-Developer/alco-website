import { Metadata } from "next";
import { buildMetadata, fallbackMetadata } from "@/utils/buildMetadata";

// 0 Shared/02 step 1b: when the CMS record is missing, each page still gets its own title and
// a self canonical. Titles and descriptions are the SEO values from B 03, B 04 and B 05 §B.
const FALLBACK_SEO: Record<string, { title: string; description: string }> = {
  "who-is-arslan-larik": {
    title: "Arslan Larik: NLP and Hypnosis Master Trainer | AL&CO",
    description: "Arslan Larik is Pakistan's first Certified Master Trainer of NLP (ABNLP) and of Hypnosis (ABH), and ANLP Ambassador for Pakistan. Train with him live.",
  },
  "who-is-bismillah-pervez": {
    title: "Bismillah Pervez: ICF MCC and ANLP Master Trainer | AL&CO",
    description: "Bismillah Pervez, CEO of AL&CO, is an ICF Master Certified Coach with ACTC and an ANLP Accredited Master Trainer (UK). Read her profile and train with her.",
  },
  "why-train-with-alco": {
    title: "Why Train with AL&CO: 13 Reasons for NLP Training | AL&CO",
    description: "Two master trainers, free revisits for five years, 2,000+ graduates in 20+ countries: 13 reasons to train with AL&CO. Book a conversation today.",
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

  const seoData = await getSeoData(slug);

  const path = `/about-us/${slug}`;
  const fallback = FALLBACK_SEO[slug];

  return fallbackMetadata(fallback?.title ?? "About Us | AL&CO", path, fallback?.description);
}

export default async function AboutUsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      {/* CMS structuredData is not injected: it can carry old prices or removed numbers (review 25 Sep). JSON-LD is built in code. */}

      {children}
    </>
  );
}