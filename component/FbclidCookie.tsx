"use client";
import { useEffect } from "react";

export default function FbclidCookie() {
  useEffect(() => {
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (fbclid) {
      document.cookie =
        `_fbc=fb.1.${Date.now()}.${fbclid}; max-age=7776000; ` +
        `path=/; domain=.arslanlarik.com`;
    }
  }, []);

  return null;
}