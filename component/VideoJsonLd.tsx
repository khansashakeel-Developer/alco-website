import { SITE_URL } from "@/utils/buildMetadata";

// Cloudinary puts the upload time (in seconds) in the version part of the link, e.g. /v1774598216/.
// Google needs an upload date, so we read it from there unless one is passed in.
function uploadDateFromUrl(url: string): string | undefined {
  const m = url.match(/\/v(\d{10})\//);
  return m ? new Date(Number(m[1]) * 1000).toISOString() : undefined;
}

type Props = {
  name: string;
  description: string;
  videoUrl: string;
  thumbnail?: string; // a path like /_next/static/media/... or a full link
  uploadDate?: string; // ISO date; optional
  duration?: string; // ISO 8601, e.g. "PT2M30S"; optional
};

export default function VideoJsonLd({ name, description, videoUrl, thumbnail, uploadDate, duration }: Props) {
  const date = uploadDate ?? uploadDateFromUrl(videoUrl);
  if (!name || !videoUrl || !thumbnail || !date) return null; // Google requires these four

  const json = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: thumbnail.startsWith("http") ? thumbnail : `${SITE_URL}${thumbnail}`,
    uploadDate: date,
    contentUrl: videoUrl,
    ...(duration && { duration }),
    publisher: {
      "@type": "Organization",
      name: "Arslan Larik & Company (AL&CO)",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-512.png` },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
    />
  );
}