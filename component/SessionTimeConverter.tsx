"use client";

import { useEffect, useState } from "react";

// Live session: 8:00pm to 2:00am Pakistan time. Pakistan is UTC+5 all year (no daylight saving).
const ZONES = [
  { label: "New York (US East Coast)", tz: "America/New_York" },
  { label: "Chicago (US Central)", tz: "America/Chicago" },
  { label: "Los Angeles (US West Coast)", tz: "America/Los_Angeles" },
  { label: "Toronto", tz: "America/Toronto" },
  { label: "London", tz: "Europe/London" },
  { label: "Nairobi", tz: "Africa/Nairobi" },
  { label: "Dubai", tz: "Asia/Dubai" },
  { label: "Riyadh", tz: "Asia/Riyadh" },
  { label: "Karachi", tz: "Asia/Karachi" },
  { label: "Mumbai / Delhi", tz: "Asia/Kolkata" },
  { label: "Dhaka", tz: "Asia/Dhaka" },
  { label: "Singapore", tz: "Asia/Singapore" },
  { label: "Beijing", tz: "Asia/Shanghai" },
  { label: "Sydney", tz: "Australia/Sydney" },
];

const DAY = 24 * 60 * 60 * 1000;

function ymd(ms: number, tz: string) {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone: tz })
    .format(new Date(ms))
    .split("-")
    .map(Number);
  return Date.UTC(y, m - 1, d);
}

function formatTime(ms: number, tz: string, startMs: number) {
  const time = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(new Date(ms));
  const diff = Math.round((ymd(ms, tz) - ymd(startMs, "Asia/Karachi")) / DAY);
  const note = diff === 1 ? " (next day)" : diff === -1 ? " (previous day)" : "";
  return `${time}${note}`;
}

export default function SessionTimeConverter() {
  const [tz, setTz] = useState("Asia/Karachi");
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState(0);

  useEffect(() => {
    // 8:00pm PKT today = 15:00 UTC today (Pakistan is UTC+5)
    const now = new Date(Date.now() + 5 * 60 * 60 * 1000);
    setStart(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 15, 0));
    const mine = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (ZONES.some((z) => z.tz === mine)) setTz(mine);
    setReady(true);
  }, []);

  const end = start + 6 * 60 * 60 * 1000;

  return (
    <div className="rounded-xl bg-white shadow-lg p-5 sm:p-6 mt-6 border-t-4 border-secondary">
      <label htmlFor="session-city" className="block font-outfit font-semibold text-primary">
        See the session in your city
      </label>
      <select
        id="session-city"
        value={tz}
        onChange={(e) => setTz(e.target.value)}
        className="mt-2 w-full rounded-lg border border-primary/30 bg-white px-3 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        {ZONES.map((z) => (
          <option key={z.tz} value={z.tz}>
            {z.label}
          </option>
        ))}
      </select>
      <p className="mt-4 text-primary-light min-h-[3rem]" aria-live="polite">
        {ready ? (
          <>
            Our live session runs from <strong className="text-primary">{formatTime(start, tz, start)}</strong> to{" "}
            <strong className="text-primary">{formatTime(end, tz, start)}</strong> in your city.
          </>
        ) : (
          "Choose your city to see your local time."
        )}
      </p>
    </div>
  );
}