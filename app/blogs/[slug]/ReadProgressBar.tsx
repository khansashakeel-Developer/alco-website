"use client";

import { useEffect, useState } from "react";

// Tiny client island: needs window/scroll, so it can't live in the
// server-rendered article page. Everything else on the page (title,
// content, metadata) is server-rendered and needs no JS to appear.
export default function ReadProgressBar() {
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setReadProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div
        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-75"
        style={{ width: `${readProgress}%` }}
      />
    </div>
  );
}
