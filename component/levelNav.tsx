import Link from "next/link";
import type { LevelNavType } from "@/type/programType";
import { ctaDataAttrs, whatsappHref, CTA } from "@/component/cta";

type RowProps = {
  href: string;
  kind: string;
  label: string;
  featured?: boolean;
  direction?: "back" | "forward";
};

function Row({ href, kind, label, featured, direction = "forward" }: RowProps) {
  return (
    <li className="border-b border-primary/15 last:border-b-0">
      <Link href={href} className="group flex items-center gap-4 py-5 md:py-6">
        <span
          aria-hidden="true"
          className={`h-3 w-3 shrink-0 rounded-full ring-4 transition-colors ${
            featured ? "bg-secondary ring-secondary/30" : "bg-primary/40 ring-primary/10 group-hover:bg-secondary group-hover:ring-secondary/30"
          }`}
        />
        <span className="w-28 shrink-0 text-xs font-semibold uppercase tracking-widest text-primary/60 md:w-40">{kind}</span>
        <span
          className={`flex-1 font-outfit text-lg md:text-2xl font-semibold transition-colors ${
            featured ? "text-primary-darkest" : "text-primary"
          } group-hover:text-secondary-dark`}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className={`text-2xl text-primary transition-transform duration-300 group-hover:text-secondary-dark ${
            direction === "back" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
          }`}
        >
          {direction === "back" ? "←" : "→"}
        </span>
      </Link>
    </li>
  );
}

export default function LevelNav({ data, waMessage }: { data?: LevelNavType; waMessage?: string }) {
  if (!data) return null;
  return (
    <nav aria-label="Programme levels" className="w-full bg-white py-12 md:py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 text-center">
          <h2 className="h4 font-semibold text-primary">Continue your climb</h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-16 rounded-full bg-secondary" />
        </div>

        <ul className="border-t border-primary/15">
          {data.prev && <Row href={data.prev.href} kind="Previous" label={data.prev.label} direction="back" />}
          {data.next && <Row href={data.next.href} kind="Next level" label={data.next.label} featured />}
          {data.more?.map((l) => (
            <Row key={l.href} href={l.href} kind="Also" label={l.label} />
          ))}
          {data.prerequisite && <Row href={data.prerequisite.href} kind="Start with" label={data.prerequisite.label} direction="back" />}
          <Row href="/programs" kind="Overview" label="All programmes" />
        </ul>

        <div className="mt-8 text-center">
          <a
            href={whatsappHref(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            {...ctaDataAttrs("C1")}
            className="inline-flex items-center justify-center rounded-full bg-secondary px-7 py-3 text-sm font-bold text-primary-darkest transition hover:bg-secondary-dark hover:shadow-lg"
          >
            {CTA.C1.label}
          </a>
        </div>
      </div>
    </nav>
  );
}