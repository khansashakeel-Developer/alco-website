"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

type VideoPlayerProps = {
  videoUrl?: string;
  title?: string;
  thumbnail?: StaticImageData;
  videoClass?: string;
  className?: string;
  hoverPlay?: boolean;
  allowSound?: boolean; // click on a hover-preview plays the video with sound
  autoPlayOnVisible?: boolean; // muted, looping, no controls (used by the Benefits card video)
  autoPlayMuted?: boolean; // muted autoplay when visible, keeps controls so visitors can unmute
};

const VideoPlayer = ({
  videoUrl,
  title,
  thumbnail,
  videoClass,
  className,
  hoverPlay = false,
  allowSound: allowSoundProp = false,
  autoPlayOnVisible = false,
  autoPlayMuted = false,
}: VideoPlayerProps) => {
  const [play, setPlay] = useState(false);
  const [withSound, setWithSound] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const allowSound = allowSoundProp || !!pathname?.startsWith("/testimonial");
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoOnView = autoPlayOnVisible || autoPlayMuted;

  // Start or stop when the player scrolls into or out of view
  useEffect(() => {
    if (!autoOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
        } else {
          videoRef.current?.pause();
          if (videoRef.current) videoRef.current.currentTime = 0;
          setPlay(false);
        }
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoOnView]);

  // Once the <video> exists, mute it in code and play (browsers only allow muted autoplay)
  useEffect(() => {
    if (!play || !autoOnView) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [play, autoOnView]);

    useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleMouseEnter = () => {
    if (hoverPlay && !withSound) {
      setPlay(true);
      setTimeout(() => videoRef.current?.play()?.catch(() => {}), 50);
    }
  };

  const handleMouseLeave = () => {
    if (hoverPlay && !withSound) {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
      setPlay(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail */}
      {!play && (
        <div
          className="absolute inset-0 cursor-pointer group"
          onClick={() => {
            if (hoverPlay) {
                   if (allowSound) setOpen(true);
            } else if (!autoPlayOnVisible) setPlay(true);
          }}
        >
          {thumbnail && (
            <div className="relative w-full h-full">
              <Image
                src={thumbnail}
                alt={title ? `${title} (video thumbnail)` : "Video thumbnail"}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain object-top rounded-lg"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
          {!hoverPlay && !autoPlayOnVisible && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute w-16 h-16 bg-white/30 rounded-full animate-ping" />
                <div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center">
                  <FaPlay className="text-primary text-lg" />
                </div>
              </div>
            </div>
          )}
          {hoverPlay && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-3 bg-primary/60 backdrop-blur-sm px-5 py-3 rounded-full transition">
                <FaPlay className="text-white text-sm" />
                <span className="text-white text-sm font-outfit font-medium tracking-wide">
                  {allowSound
                    ? "Watch with sound"
                    : "Hover to Watch"}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Video */}
      {play && (
        <video
          ref={videoRef}
          controls={(!hoverPlay && !autoPlayOnVisible) || withSound}
          preload="metadata"
          muted={(hoverPlay && !withSound) || autoOnView}
          playsInline
          loop={(hoverPlay && !withSound) || autoPlayOnVisible}
          autoPlay={!hoverPlay || withSound}
          onClick={() => {
            if (hoverPlay && allowSound) {
              videoRef.current?.pause();
              setOpen(true);
            }
          }}
          onEnded={() => {
            if (withSound) {
              setWithSound(false);
              setPlay(false);
            }
          }}
          className={videoClass}
        >
                    <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              aria-label="Close video"
              className="absolute top-4 right-5 text-white text-4xl leading-none"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="max-h-[90vh] max-w-[95vw] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </div>
  );
};

export default VideoPlayer;
