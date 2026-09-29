import type { Metadata } from "next";
import { programs } from "@/app/program/[slug]/data";
import { programMetadata, programJsonLd } from "./schema";

// Only the six local slugs exist. Anything else is a real 404 with no CRM call
// (spec A 07 C4). The six pages are pre-rendered at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return programMetadata(slug);
}

export default async function ProgramLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  const jsonLd = programJsonLd(slug, program?.FaqData);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // Escape "<" so no value can close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
      {children}
    </>
  );
}
