/* DECISIONS v2 G6: blog content is out of scope for this update. Posts load from the CRM unchanged.
   Sawera reviews and rewrites the posts once keyword research is done, then keeps publishing new ones.
   Only technical SEO lives here (canonical, template, JSON-LD). */
import CtaBand from "@/component/CtaBand";
import BlogsClient, { type Blog } from "./BlogsClient";
import { SITE_URL } from "@/utils/buildMetadata";

// ── ISR: rebuild this page's data at most once an hour ──
export const revalidate = 3600;

const LIMIT = 9;

async function getInitialBlogs(): Promise<{ blogs: Blog[]; totalPages: number }> {
  try {
    const params = new URLSearchParams({
      page: "1",
      limit: String(LIMIT),
      status: "published",
    });

    // 4s timeout so a slow/down API never hangs the build or the request
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/public?${params.toString()}`,
      {
        next: { revalidate: 3600 },
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    if (!res.ok) return { blogs: [], totalPages: 1 };

    const json = await res.json();
    const blogs: Blog[] = json?.data ?? [];
    const total: number = json?.meta?.total ?? blogs.length;

    return { blogs, totalPages: Math.max(1, Math.ceil(total / LIMIT)) };
  } catch {
    // CRM/API down - fall back to an empty list rather than crashing the page
    return { blogs: [], totalPages: 1 };
  }
}

// ── Main Page (Server Component) ──
// Fetches the first page of published posts on the server so Google
// (and anyone with View Source) sees real article titles/excerpts in the
// initial HTML. Search / category / pagination interactivity is handled
// client-side by BlogsClient, seeded with this server-fetched data.
export default async function BlogsPage() {
  const { blogs, totalPages } = await getInitialBlogs();

  // D 08 C1: listing JSON-LD, built in code (not the raw CMS string) so it can never carry a price.
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blogs#blog`,
    url: `${SITE_URL}/blogs`,
    name: "NLP and Hypnotherapy Blog",
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: blogs
      .filter((b) => b?.slug && b?.title)
      .map((b) => ({
        "@type": "BlogPosting",
        headline: String(b.title).slice(0, 110),
        url: encodeURI(`${SITE_URL}/blogs/${b.slug}`),
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd).replace(/</g, "\\u003c") }}
      />
      <BlogsClient initialBlogs={blogs} initialTotalPages={totalPages} limit={LIMIT} />
      {/* Closing band (CTA plan): Blogs are ToFu. Primary C2, secondary C3. */}
      <CtaBand
        title="Start with a Free Webinar"
        text="Once a week we open a free, live introductory session for anyone exploring NLP. Come to listen, come with your questions."
        primary={{ id: "C2" }}
        secondary={{ id: "C3" }}
      />
    </>
  );
}
