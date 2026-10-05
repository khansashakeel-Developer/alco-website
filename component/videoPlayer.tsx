"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa";

type VideoPlayerProps = {
  videoUrl?: string;
  title?: string;
  thumbnail?: StaticImageData;
  videoClass?: string;
  className?: string;
  hoverPlay?: boolean;
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
  autoPlayOnVisible = false,
  autoPlayMuted = false,
}: VideoPlayerProps) => {
  const [play, setPlay] = useState(false);
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
      { threshold: 0.3 }
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

  const handleMouseEnter = () => {
    if (hoverPlay) {
      setPlay(true);
      setTimeout(() => videoRef.current?.play()?.catch(() => {}), 50);
    }
  };

  const handleMouseLeave = () => {
    if (hoverPlay) {
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
          onClick={() => !hoverPlay && !autoPlayOnVisible && setPlay(true)}
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
                <span className="text-white text-sm font-outfit font-medium tracking-wide">Hover to Watch</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Video */}
      {play && (
        <video
          ref={videoRef}
          controls={!hoverPlay && !autoPlayOnVisible}
          preload="metadata"
          muted={hoverPlay || autoOnView}
          playsInline
          loop={hoverPlay || autoPlayOnVisible}
          autoPlay={!hoverPlay}
          className={videoClass}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;