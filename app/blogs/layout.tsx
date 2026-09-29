/* DECISIONS v2 G6: blog content is out of scope for this update. Posts load from the CRM unchanged.
   Sawera reviews and rewrites the posts once keyword research is done, then keeps publishing new ones.
   Only technical SEO lives here (canonical, template, JSON-LD). */
import { ReactNode } from "react";
import { buildMetadata, fallbackMetadata } from "@/utils/buildMetadata";
import type { Metadata } from "next";

async function getSeoData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/seo/page/blogs`,
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

// Metadata for the /blogs listing. Each post (app/blogs/[slug]/page.tsx) sets its own title, description and canonical.
export async function generateMetadata(): Promise<Metadata> {

  return fallbackMetadata(
        "NLP and Hypnotherapy Articles by Arslan Larik | AL&CO",
        "/blogs",
        "Practical NLP, hypnosis and coaching articles from Arslan Larik and the AL&CO team. Read the latest insights, then find the level that fits you."
      );
}

// D 08 C1: the listing JSON-LD moved to app/blogs/page.tsx, so it no longer leaks onto every post.
export default function BlogsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
