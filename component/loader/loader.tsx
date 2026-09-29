"use client";

import React from "react";
import "@/component/loader/loader.css";
import miniLogoWhite from "@/assets/mini-logo-white.webp"
import Image from "next/image";

export default function Loader() {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-dark-primary-to-light bg-top-left bg-cover w-full">
      <Image
        src={miniLogoWhite}
        alt="logo"
        className="h-32 w-auto opacity-40"
        priority
      />
      <span className="absolute text-[38px] tracking-[5px] text-transparent [-webkit-text-stroke:0.3px_rgb(255,255,255)]">
        AL & CO
      </span>

      <span className="absolute text-[38px] tracking-[5px] text-white animate-wave [-webkit-text-stroke:1px_rgb(255,255,255)]">
        AL & CO
      </span>
    </div>
  );
}
