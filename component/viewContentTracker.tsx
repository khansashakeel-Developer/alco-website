"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/libs/track";

export default function ViewContentTracker({ contentName }: { contentName?: string }) {
  const pathname = usePathname();

  useEffect(() => {
    track("ViewContent", { contentName });
  }, [pathname]);

  return null;
}