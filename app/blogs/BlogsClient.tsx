"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getBlogs } from "@/utils/api";

// ── Types ──
export type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  read_time: number;
  status: string;
  is_featured: boolean;
  thumbnail?: string;
  views: number;
  createdAt: string;
};

// ── Helpers ──
const categoryColor: Record<string, { bg: string; text: string; dot: string }> = {
  nlp: { bg: "bg-sky-50", text: "text-sky-600", dot: "bg-sky-400" },
  icf: { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-400" },
  hypnotherapy: { bg: "bg-violet-50", text: "text-violet-600", dot: "bg-violet-400" },
  coaching: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-400" },
  mindset: { bg: "bg-rose-50", text: "text-rose-600", dot: "bg-rose-400" },
  general: { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" },
};

const getCategoryStyle = (cat: string) =>
  categoryColor[cat] ?? categoryColor.general;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

const categories = ["All", "nlp", "icf", "hypnotherapy", "coaching", "mindset", "general"];

// ── Skeleton Card ──
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-48 bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 bg-gray-100 rounded-full" />
        <div className="h-5 bg-gray-100 rounded-lg w-3/4" />
        <div className="h-3 bg-gray-100 rounded-lg w-full" />
        <div className="h-3 bg-gray-100 rounded-lg w-2/3" />
      </div>
    </div>
  );
}

// ── Blog Card ──
function BlogCard({ blog, featured = false }: { blog: Blog; featured?: boolean }) {
  const style = getCategoryStyle(blog.category);

  if (featured) {
    return (
      <Link href={`/blogs/${blog.slug}`} className="group block">
        <div className="relative rounded-3xl overflow-hidden bg-gray-900 h-[420px]">
          {blog.thumbnail ? (
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-gray-900 to-gray-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Featured
              </span>
              <span className={`${style.bg} ${style.text} text-xs font-semibold px-3 py-1 rounded-full capitalize`}>
                {blog.category}
              </span>
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3 group-hover:text-amber-300 transition-colors">
              {blog.title}
            </h2>
            {blog.excerpt && (
              <p className="text-gray-300 text-sm line-clamp-2 mb-4 max-w-xl">{blog.excerpt}</p>
            )}
            <div className="flex items-center gap-4 text-gray-400 text-xs">
              <span>{formatDate(blog.createdAt)}</span>
              <span className="w-1 h-1 rounded-full bg-gray-500" />
              <span>{blog.read_time} min read</span>
              <span className="w-1 h-1 rounded-full bg-gray-500" />
              <span>{blog.views} views</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blogs/${blog.slug}`} className="group block h-full">
      <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-50/60 transition-all duration-300 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
          {blog.thumbnail ? (
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">No image</p>
              </div>
            </div>
          )}
          {blog.is_featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-amber-400 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${style.bg} ${style.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {blog.category}
            </span>
            <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {blog.read_time} min
            </span>
          </div>

          <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors flex-shrink-0">
            {blog.title}
          </h3>

          {blog.excerpt && (
            <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{blog.excerpt}</p>
          )}

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
            <span className="text-xs text-gray-400">{formatDate(blog.createdAt)}</span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {blog.views}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ── Main Page (Client) ──
// Receives server-fetched data as props so the very first render (and the
// HTML Google/View-Source sees) already has real blog cards. All filtering/
// pagination after that happens client-side exactly as before.
export default function BlogsClient({
  initialBlogs,
  initialTotalPages,
  limit = 9,
}: {
  initialBlogs: Blog[];
  initialTotalPages: number;
  limit?: number;
}) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const LIMIT = limit;

  // Skip the redundant client fetch on first mount: page===1 with no
  // filters is exactly what the server already fetched and passed down.
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Don't reset to page 1 on the very first render (avoids a spurious
    // extra effect run before the user has touched search/category).
    if (isFirstRun.current) return;
    setPage(1);
  }, [search, activeCategory]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      // Server already provided page 1 / no filters — nothing to do.
      if (page === 1 && !search.trim() && activeCategory === "All") return;
    }

    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params: any = {
          page,
          limit: LIMIT,
          status: "published",
        };
        if (search.trim()) params.search = search.trim();
        if (activeCategory !== "All") params.category = activeCategory;

        const res = await getBlogs(params);
        setBlogs(res.data?.data ?? []);
        setTotalPages(Math.ceil((res.data?.meta?.total ?? 0) / LIMIT));
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [page, search, activeCategory]);

  const featuredBlog = blogs.find((b) => b.is_featured);
  const regularBlogs = blogs.filter((b) => !b.is_featured || blogs.indexOf(b) > 0);

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* ── Hero Section ── */}
      <section className="relative bg-primary-dark overflow-hidden py-24 px-6">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #d4a800 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
              Insights & Knowledge
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
            NLP and Hypnotherapy Blog <br /><span className="text-amber-400">Wisdom for real life impact</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Deep dives into NLP, coaching, mindset transformation, and human potential.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Search + Filters ── */}
        <div className="mb-10 space-y-5">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div className="text-primary-medium text-sm md:text-base font-semibold ">
              <h2 className="text-2xl font-bold mb-1 h2">Explore Our Blog</h2>
            </div>
            <div className="min-w-[400px] ">
              {/* Search */}
              <div className="relative max-w-lg">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition placeholder:text-gray-400 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all capitalize ${activeCategory === cat
                  ? "bg-primary text-white border border-primary"
                  : "bg-white text-primary border border-primary hover:border-primary hover:text-primary"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Loading State ── */}
        {loading ? (
          <div className="space-y-8">
            <div className="h-[420px] bg-gray-100 rounded-3xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        ) : blogs.length === 0 ? (
          /* ── Empty State ── */
          <div className="text-center py-28">
            <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-400 text-sm mb-6">Try a different search or category</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured Blog */}
            {featuredBlog && page === 1 && !search && activeCategory === "All" && (
              <BlogCard blog={featuredBlog} featured />
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {regularBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2.5 rounded-xl border border-primary-dark bg-white text-sm font-semibold text-primary-dark hover:bg-primary-darkdisabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce<(number | string)[]>((acc, p, idx, arr) => {
                    if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((item, idx) =>
                    item === "..." ? (
                      <span key={`dots-${idx}`} className="px-2 text-primary-dark text-sm">...</span>
                    ) : (
                      <button
                        key={item}
                        onClick={() => setPage(item as number)}
                        className={`w-10 h-10 rounded-xl text-sm font-bold transition ${page === item
                          ? "bg-primary-dark text-white shadow-md"
                          : "bg-white border border-primary-dark text-primary-dark hover:bg-primary-dark"
                          }`}
                      >
                        {item}
                      </button>
                    )
                  )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2.5 rounded-xl border border-primary-dark bg-white text-sm font-semibold text-primary-dark hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

