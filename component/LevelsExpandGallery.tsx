"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export type GalleryLevel = {
  level: number;
  name: string;
  summary: string;
  href: string;
};

// The six levels, so any page can use the gallery without passing data in.
export const GALLERY_LEVELS: GalleryLevel[] = [
  { level: 1, name: "NLP Practitioner", summary: "Your foundation.", href: "/program/nlp-practitioner" },
  { level: 2, name: "NLP Master Practitioner", summary: "Mastery of the craft.", href: "/program/nlp-master-practitioner" },
  { level: 3, name: "Advanced Hypnotherapy and Interventionist", summary: "Advanced hypnosis and intervention.", href: "/program/advanced-hypnotherapy-interventionist" },
  { level: 4, name: "NLP Train the Trainer", summary: "The authority to train and certify practitioners.", href: "/program/nlp-trainers-training-program" },
  { level: 5, name: "Hypnosis Train the Trainer", summary: "The authority to train hypnosis.", href: "/program/hypnosis-trainers-training-program" },
  { level: 6, name: "NLP Master Trainer", summary: "The summit: produce trainers of your own.", href: "/program/nlp-master-trainer-program" },
];

type Props = {
  levels?: GalleryLevel[];
  /** Level number (1 to 6) that is open at first and again when the mouse leaves. */
  defaultLevel?: number;
};

export default function LevelsExpandGallery({ levels = GALLERY_LEVELS, defaultLevel = 1 }: Props) {
  const start = Math.max(0, levels.findIndex((l) => l.level === defaultLevel));
  const [active, setActive] = useState(start);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  const activate = (i: number) => {
    setActive(i);
    refs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === i) v.play().catch(() => {});
      else v.pause();
    });
  };

  return (
    <div
      onMouseLeave={() => activate(start)}
      className="flex h-[620px] w-full flex-col gap-2 md:h-[440px] md:flex-row"
    >
      {levels.map((l, i) => {
        const open = active === i;
        return (
          <Link
            key={l.level}
            href={l.href}
            onMouseEnter={() => activate(i)}
            onFocus={() => activate(i)}
            onClick={(e) => {
              // Touch screens: first tap opens the panel, second tap follows the link
              if (!open) {
                e.preventDefault();
                activate(i);
              }
            }}
            aria-label={`Level ${l.level}: ${l.name}`}
            className={`group relative min-h-0 min-w-0 basis-0 overflow-hidden rounded-2xl bg-primary-darkest transition-[flex-grow] duration-700 ease-in-out ${
              open ? "grow-[6]" : "grow-[1]"
            }`}
          >
            <video
              ref={(el) => { refs.current[i] = el; }}
              src={`/videos/programs/level-${l.level}.mp4`}
              muted
              loop
              playsInline
              preload={i === start ? "auto" : "none"}
              autoPlay={i === start}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                open ? "scale-100 opacity-100" : "scale-110 opacity-50"
              }`}
            />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#2B527D]/80 to-transparent" />

            <span
              className={`absolute left-1/2 top-4 -translate-x-1/2 text-3xl font-bold text-white transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            >
              {l.level}
            </span>

            <div
              className={`absolute inset-x-0 bottom-0 p-5 text-white transition-all duration-500 ${
                open ? "translate-y-0 opacity-100 delay-300" : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
                Level {l.level}
              </p>
              <p className="mt-1 text-xl font-semibold leading-tight">{l.name}</p>
              <p className="mt-1 text-sm text-white/85">{l.summary}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-secondary">
                {open && l.level === defaultLevel ? "You are here" : "View programme →"}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}