"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBrain } from "react-icons/fa";

const HIDE_ON = ["/start", "/for-you", "/enroll", "/thank-you", "/maintenance"];

export default function QuizPopup() {
  const pathname = usePathname() || "/";
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (HIDE_ON.some((p) => pathname.startsWith(p))) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(true), 20000);
    return () => clearTimeout(t);
  }, [pathname]);

  const close = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Find your level quiz"
      className="fixed bottom-24 left-4 z-[2147483000] w-[170px] rounded-3xl bg-white p-3 sm:p-4 text-center shadow-xl sm:w-[230px]"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-lg font-bold leading-none text-[#09263D]"
      >
        ×
      </button>
      <h2 className="text-lg font-bold leading-tight text-[#09263D]">
        Find Your Level
      </h2>
      <FaBrain className="mx-auto my-3 hidden text-5xl text-primary sm:block" aria-hidden="true" />
      <p className="mb-3 hidden text-sm text-gray-600 sm:block">
        Take the 2 minute quiz and see where to start.
      </p>
      <Link
        href="/start"
        onClick={close}
        className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
      >
        Find my level
      </Link>
    </aside>
  );
}
