/* DECISIONS v2 G6: blog content is out of scope for this update. Posts load from the CRM unchanged.
   Sawera reviews and rewrites the posts once keyword research is done, then keeps publishing new ones.
   Only technical SEO lives here (canonical, template, JSON-LD). */
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RichText from "@/component/blog/RichText";
import ReadProgressBar from "./ReadProgressBar";
import CtaBand from "@/component/CtaBand";

// ── Types ──
type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  category: string;
  tags: string[];
  read_time: number;
  thumbnail?: string;
  views: number;
  is_featured: boolean;
  createdAt: string;
  updatedAt?: string;
  author?: { name: string };
};

// ── Helpers ──
const categoryColor: Record<string, { bg: string; text: string }> = {
  nlp: { bg: "bg-sky-50", text: "text-sky-600" },
  icf: { bg: "bg-emerald-50", text: "text-emerald-600" },
  hypnotherapy: { bg: "bg-violet-50", text: "text-violet-600" },
  coaching: { bg: "bg-amber-50", text: "text-amber-600" },
  mindset: { bg: "bg-rose-50", text: "text-rose-600" },
  general: { bg: "bg-gray-50", text: "text-gray-600" },
};

const getCategoryStyle = (cat: string) => categoryColor[cat] ?? categoryColor.general;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

const SITE_URL = "https://arslanlarik.com";

// BlogPosting authors (0 Shared/02 step 2; DECISIONS v2 F2). A Person is used only when the CRM author name is
// exactly one of these. PLEASE CHECK with Sawera: the CRM stores the account that created the post, not the writer.
const AUTHORS: Record<string, object> = {
  "Arslan Larik": { "@type": "Person", "@id": "https://arslanlarik.com/about-us/who-is-arslan-larik#person", name: "Arslan Larik", url: "https://arslanlarik.com/about-us/who-is-arslan-larik", jobTitle: "Founder and Master Trainer" },
  "Bismillah Pervez": { "@type": "Person", "@id": "https://arslanlarik.com/about-us/who-is-bismillah-pervez#person", name: "Bismillah Pervez", url: "https://arslanlarik.com/about-us/who-is-bismillah-pervez", jobTitle: "Chief Executive Officer", description: "Bismillah Pervez, CEO, ICF Master Certified Coach (MCC), ACTC, and ANLP Accredited Master Trainer (UK)" },
};
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ── Data fetchers (server-side, cached 1hr via ISR) ──
async function fetchWithTimeout(url: string, ms = 4000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { next: { revalidate: 3600 }, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function getBlogBySlugServer(slug: string): Promise<Blog | null> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/v1/blogs/public/${slug}`);
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? json) as Blog;
  } catch {
    return null;
  }
}

async function getRelatedBlogsServer(category: string, excludeSlug: string): Promise<Blog[]> {
  try {
    const params = new URLSearchParams({ category, status: "published", limit: "4" });
    const res = await fetchWithTimeout(`${API_URL}/api/v1/blogs/public?${params.toString()}`);
    if (!res.ok) return [];
    const json = await res.json();
    const blogs: Blog[] = json?.data ?? [];
    return blogs.filter((b) => b.slug !== excludeSlug).slice(0, 3);
  } catch {
    return [];
  }
}

// Pre-render every published post at build time; new posts still render
// on-demand (ISR) since dynamicParams defaults to true.
export async function generateStaticParams() {
  try {
    const params = new URLSearchParams({ status: "published", limit: "1000" });
    const res = await fetch(`${API_URL}/api/v1/blogs/public?${params.toString()}`);
    if (!res.ok) return [];
    const json = await res.json();
    const blogs: Blog[] = json?.data ?? [];
    return blogs.map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlugServer(slug);

  if (!blog) {
    // D 08 C6: never inherit the listing canonical; a missing or unpublished post is noindex.
    return {
      title: "Blog | AL&CO",
      robots: { index: false, follow: true },
      alternates: { canonical: `${SITE_URL}/blogs/${slug}` },
    };
  }

  const url = `${SITE_URL}/blogs/${slug}`;
  // D 08 C2: title at most 60 characters with the brand suffix, description at most 155.
  const full = `${blog.title} | AL&CO`;
  const title = full.length <= 60 ? full : blog.title;
  const raw = (blog.excerpt || "NLP and hypnotherapy insights from AL&CO.").trim();
  const cut = raw.lastIndexOf(" ", 152);
  const description = raw.length <= 155 ? raw : raw.slice(0, cut > 0 ? cut : 152) + "...";

  return {
    title,
    description,
    keywords: blog.tags?.length ? blog.tags : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "AL&CO",
      locale: "en_PK",
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt ?? blog.createdAt,
      images: blog.thumbnail ? [{ url: blog.thumbnail }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.thumbnail ? [blog.thumbnail] : [],
    },
    robots: { index: true, follow: true },
  };
}

// ── Related Blog Card ──
function RelatedCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group flex gap-4 items-start">
      <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
        {blog.thumbnail ? (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
          {blog.title}
        </h4>
        <p className="text-xs text-gray-400 mt-1">{blog.read_time} min read</p>
      </div>
    </Link>
  );
}

// ── Content block renderer ──
const renderBlock = (block: any, index: any) => {
  switch (block.type) {
    case "h1":
      // D 08 row 5: the post title is the only H1; CMS h1 blocks render as H2.
      return <h2 key={index} className="text-2xl font-bold mt-8 mb-3">{block.text}</h2>;
    case "h2":
      return <h2 key={index} className="text-2xl font-bold mt-8 mb-3">{block.text}</h2>;
    case "h3":
      return <h3 key={index} className="text-xl font-semibold mt-6 mb-2">{block.text}</h3>;
    case "p":
      return <p key={index} className="text-base leading-7 mb-4 text-gray-700"><RichText text={block.text} /></p>;
    case "quote":
      return (
        <blockquote key={index} className="border-l-4 border-gray-400 pl-4 italic text-gray-500 mb-4">
          {block.text}
        </blockquote>
      );
    case "ul":
      return (
        <ul key={index} className="list-disc pl-6 mb-4 space-y-2">
          {block.items.map((item: any, i: any) => (
            <li key={i} className="text-gray-700">
              <strong>{item.bold}</strong> {item.text}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="list-decimal pl-6 mb-4 space-y-2">
          {block.items.map((item: any, i: any) => (
            <li key={i} className="text-gray-700">
              <strong>{item.bold}</strong> {item.text}
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
};

// ── Main Page (Server Component) ──
// Fetches the article on the server and renders it straight into the HTML -
// Ctrl+U now shows the real title, excerpt and body instead of an empty
// client shell. generateStaticParams pre-builds every published slug;
// revalidate: 3600 keeps it fresh via ISR without going fully dynamic.
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlugServer(slug);

  if (!blog) return notFound();

  const related = await getRelatedBlogsServer(blog.category, slug);
  const categoryStyle = getCategoryStyle(blog.category);

  // D 08 C3: BlogPosting + BreadcrumbList JSON-LD.
  const url = `${SITE_URL}/blogs/${slug}`;
  const author = (blog.author?.name && AUTHORS[blog.author.name]) || { "@id": `${SITE_URL}/#organization` };
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title.slice(0, 110),
      description: blog.excerpt?.trim(),
      image: blog.thumbnail ? [blog.thumbnail] : undefined,
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt ?? blog.createdAt,
      author,
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: url,
      inLanguage: "en",
      articleSection: blog.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
        { "@type": "ListItem", position: 3, name: blog.title, item: url },
      ],
    },
  ];

  return (
    // D 08 C4: <div>, not <main> (the root layout already renders <main>).
    <div className="min-h-screen bg-[#FAFAF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {/* ── Read Progress Bar (client island - needs scroll listener) ── */}
      <ReadProgressBar />

      {/* ── Hero ── */}
      <section className="relative bg-gray-950 overflow-hidden">
        {blog.thumbnail && (
          <>
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-gray-950/40" />
          </>
        )}
        {!blog.thumbnail && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-20 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl" />
          </div>
        )}
        <div className="relative container mx-auto px-4 sm:px-6 py-20 md:py-28">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-amber-400 transition">Blog</Link>
            <span>/</span>
            <span className="text-gray-500 capitalize">{blog.category}</span>
          </div>

          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize ${categoryStyle.bg} ${categoryStyle.text}`}>
              {blog.category}
            </span>
            {blog.is_featured && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-400/20 text-amber-400">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
              {blog.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400">
            {blog.author?.name && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 font-bold text-xs">
                  {blog.author.name.charAt(0)}
                </div>
                <span className="text-gray-300 font-medium">{blog.author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(blog.createdAt)}
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {blog.read_time} min read
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {blog.views} views
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Layout ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex gap-12 items-start">
          {/* ── Article Content ── */}
          <article className="blog-content">
            {blog?.content?.map((block: any, index: any) => renderBlock(block, index))}
          </article>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block w-80 flex-shrink-0 sticky top-8 space-y-6">
            {/* Blog Info Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Article Info</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Category</span>
                  <span className={`font-semibold capitalize px-2 py-0.5 rounded-lg ${categoryStyle.bg} ${categoryStyle.text}`}>
                    {blog.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Read Time</span>
                  <span className="font-semibold text-gray-700">{blog.read_time} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Views</span>
                  <span className="font-semibold text-gray-700">{blog.views}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Published</span>
                  <span className="font-semibold text-gray-700">{formatDate(blog.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Related Blogs */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Related Articles</h3>
                <div className="space-y-4">
                  {related.map((r) => (
                    <RelatedCard key={r._id} blog={r} />
                  ))}
                </div>
              </div>
            )}

            {/* CTA Card */}
            <div className="bg-gray-950 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
              <div className="relative">
                <div className="w-10 h-10 bg-amber-400/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-sm mb-2">Explore All Articles</h4>
                <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                  Discover more insights on NLP, coaching, and mindset transformation.
                </p>
                <Link
                  href="/blogs"
                  className="block text-center bg-amber-400 text-gray-900 text-sm font-bold py-2.5 rounded-xl hover:bg-amber-300 transition"
                >
                  Browse All Blogs
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Closing band (CTA plan): Blogs are ToFu. Primary C2, secondary C3. */}
      <CtaBand
        title="Want to Feel How This Works, Live?"
        text="Once a week we open a free, live introductory webinar for anyone exploring NLP. No pressure and no obligation."
        primary={{ id: "C2" }}
        secondary={{ id: "C3" }}
      />
    </div>
  );
}
