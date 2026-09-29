"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa";

type VideoPlayerProps = {
  videoUrl?: string;
  thumbnail?: StaticImageData;
  videoClass?: string;
  className?: string;
  hoverPlay?: boolean;
  autoPlayOnVisible?: boolean; // 👈 new prop
};

const VideoPlayer = ({
  videoUrl,
  thumbnail,
  videoClass,
  className,
  hoverPlay = false,
  autoPlayOnVisible = false, // 👈 default false
}: VideoPlayerProps) => {
  const [play, setPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 👇 AutoPlay on visible
  useEffect(() => {
    if (!autoPlayOnVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          setTimeout(() => videoRef.current?.play(), 50);
        } else {
          videoRef.current?.pause();
          if (videoRef.current) videoRef.current.currentTime = 0;
          setPlay(false);
        }
      },
      { threshold: 0.5 } // 👈 50% visible hone pe play hoga
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoPlayOnVisible]);

  const handleMouseEnter = () => {
    if (hoverPlay) {
      setPlay(true);
      setTimeout(() => videoRef.current?.play(), 50);
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
      ref={containerRef} // 👈 observe karne ke liye
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
          {/* <img
            src={thumbnail}
            alt="video thumbnail"
            className="w-full h-full object-top"
          /> */}
          {thumbnail && (
            <div className="relative w-full h-full">
              <Image
                src={thumbnail} // works for string URLs or StaticImageData
                alt="video thumbnail"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain object-top rounded-lg"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
          {!hoverPlay && !autoPlayOnVisible && (
            // <div className="absolute inset-0 flex items-center justify-center">
            //   <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">
            //     <FaPlay className="text-white" />
            //   </div>
            // </div>

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
          muted={hoverPlay || autoPlayOnVisible}
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