import Link from "next/link";
import type { LevelNavType } from "@/type/programType";
import { ctaDataAttrs, whatsappHref, CTA } from "@/component/cta";

export default function LevelNav({ data, waMessage }: { data?: LevelNavType; waMessage?: string }) {
  if (!data) return null;
  const cls =
    "block rounded-xl bg-white drop-shadow-sm px-4 py-4 text-primary font-semibold hover:text-secondary";
  return (
    <nav aria-label="Programme levels" className="py-6 md:py-8 lg:py-12 sm:px-4 bg-slate-100 w-full">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="h4 text-primary font-semibold text-center mb-6">Continue your climb</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.prev && (
            <Link className={cls} href={data.prev.href}>
              ← {data.prev.label}
            </Link>
          )}
          {data.next && (
            <Link className={cls} href={data.next.href}>
              {data.next.label} →
            </Link>
          )}
          {data.more?.map((l) => (
            <Link key={l.href} className={cls} href={l.href}>
              {l.label} →
            </Link>
          ))}
          {data.prerequisite && (
            <Link className={cls} href={data.prerequisite.href}>
              {data.prerequisite.label}
            </Link>
          )}
          <Link className={cls} href="/programs">
            All programmes
          </Link>
          <a className={cls} href={whatsappHref(waMessage)} target="_blank" rel="noopener noreferrer" {...ctaDataAttrs("C1")}>
            {CTA.C1.label}
          </a>
        </div>
      </div>
    </nav>
  );
}
