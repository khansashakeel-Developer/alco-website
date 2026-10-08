"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

/** Face area, in percent of the container (0 to 100). Tune these per photo. */
export type FaceRegion = {
  /** centre of the face, from the left edge */
  x: number;
  /** centre of the face, from the top edge */
  y: number;
  /** half width of the lit area */
  rx: number;
  /** half height of the lit area */
  ry: number;
};

export type RelitPhotoProps = {
  src: string | StaticImageData;
  alt: string;
  /** Where the face sits inside the container. Defaults suit a centred head-and-shoulders portrait. */
  face?: FaceRegion;
  /** 0 = no change, 1 = strongest fill light. Default 0.5. */
  strength?: number;
  /** Which side keeps a soft natural shadow for depth. Default "right". */
  shadowSide?: "right" | "left" | "none";
  /** How dark that remaining shadow stays, 0 to 1. Default 0.35 (soft). */
  shadowKeep?: number;
  /** CSS object-position for the photo, same as on a normal Image. */
  objectPosition?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Draws the lit area as a dashed outline, to help you tune `face`. */
  debug?: boolean;
};

/**
 * Photo with a soft "fill light" on the face.
 *
 * - The light only exists inside an ellipse around the face (`face`), so the background and the clothes are untouched.
 * - Inside the ellipse the light is strongest on the top and left and fades out towards the shadow side,
 *   so the top and left of the face are lifted and the shadow side keeps a soft shadow.
 * - It is made only of CSS blend modes and gradients: no pixels are changed, nothing is uploaded, and the page text
 *   (name, title) is drawn separately above this component and stays exactly where it is.
 */
export default function RelitPhoto({
  src,
  alt,
  face = { x: 50, y: 40, rx: 22, ry: 34 },
  strength = 0.5,
  shadowSide = "right",
  shadowKeep = 0.35,
  objectPosition = "center top",
  sizes = "(max-width: 1024px) 100vw, 600px",
  priority = false,
  className = "",
  debug = false,
}: RelitPhotoProps) {
  const s = Math.min(1, Math.max(0, strength));
  const keep = Math.min(1, Math.max(0, shadowKeep));

  // Keeps the light inside the face area, with a soft edge so there is no visible outline.
  const faceMask = `radial-gradient(ellipse ${face.rx}% ${face.ry}% at ${face.x}% ${face.y}%, #000 55%, transparent 100%)`;

  // Light comes from the top and the lit side. It fades to `keep` (a little light) on the shadow side.
  const dir = shadowSide === "right" ? "to right" : shadowSide === "left" ? "to left" : "to bottom";
  const lightGradient =
    shadowSide === "none"
      ? "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,1))"
      : `linear-gradient(${dir}, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,${keep}) 100%)`;
  // Extra lift from the top, so shadows under the cap or hair on the forehead open up.
  const topGradient = "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 55%, rgba(255,255,255,0) 100%)";

  const layer: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    WebkitMaskImage: faceMask,
    maskImage: faceMask,
  };

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition }}
      />

      {/* 1. Opens up the dark areas (screen adds light, so it only lifts shadows) */}
      <div
        aria-hidden="true"
        style={{
          ...layer,
          background: lightGradient,
          mixBlendMode: "screen",
          opacity: 0.32 * s,
        }}
      />
      {/* 2. Extra light from above */}
      <div
        aria-hidden="true"
        style={{
          ...layer,
          background: topGradient,
          mixBlendMode: "screen",
          opacity: 0.22 * s,
        }}
      />
      {/* 3. Soft light keeps the skin natural while evening out the tones */}
      <div
        aria-hidden="true"
        style={{
          ...layer,
          background: lightGradient,
          mixBlendMode: "soft-light",
          opacity: 0.6 * s,
        }}
      />

      {debug && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${face.x - face.rx}%`,
            top: `${face.y - face.ry}%`,
            width: `${face.rx * 2}%`,
            height: `${face.ry * 2}%`,
            border: "2px dashed #F9B81E",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}