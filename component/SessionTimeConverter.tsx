"use client";

import { useEffect, useMemo, useState } from "react";

// Live session: 8:00pm to 2:00am Pakistan time. Pakistan is UTC+5 all year (no daylight saving).
type Zone = { label: string; tz: string; search: string };

// Country names people type, mapped to one zone (label shows the country).
const COUNTRIES: [string, string, string?][] = [
  ["Pakistan", "Asia/Karachi"], ["India", "Asia/Kolkata", "delhi mumbai"],
  ["Bangladesh", "Asia/Dhaka"], ["Sri Lanka", "Asia/Colombo"], ["Nepal", "Asia/Kathmandu"],
  ["UAE", "Asia/Dubai", "united arab emirates"], ["Saudi Arabia", "Asia/Riyadh"],
  ["Qatar", "Asia/Qatar"], ["Kuwait", "Asia/Kuwait"], ["Oman", "Asia/Muscat"], ["Bahrain", "Asia/Bahrain"],
  ["United Kingdom", "Europe/London", "uk england britain"], ["Ireland", "Europe/Dublin"],
  ["Germany", "Europe/Berlin"], ["France", "Europe/Paris"], ["Spain", "Europe/Madrid"],
  ["Italy", "Europe/Rome"], ["Netherlands", "Europe/Amsterdam"], ["Turkey", "Europe/Istanbul"],
  ["US East Coast", "America/New_York", "united states usa america"],
  ["US Central", "America/Chicago", "united states usa america"],
  ["US West Coast", "America/Los_Angeles", "united states usa america california"],
  ["Canada", "America/Toronto"], ["Mexico", "America/Mexico_City"],
  ["Brazil", "America/Sao_Paulo"], ["Argentina", "America/Argentina/Buenos_Aires"],
  ["Nigeria", "Africa/Lagos"], ["Kenya", "Africa/Nairobi"], ["South Africa", "Africa/Johannesburg"],
  ["Egypt", "Africa/Cairo"], ["Ghana", "Africa/Accra"],
  ["China", "Asia/Shanghai", "beijing"], ["Japan", "Asia/Tokyo"], ["Malaysia", "Asia/Kuala_Lumpur"],
  ["Indonesia", "Asia/Jakarta"], ["Philippines", "Asia/Manila"], ["Hong Kong", "Asia/Hong_Kong"],
  ["Singapore", "Asia/Singapore"], ["Australia", "Australia/Sydney"], ["New Zealand", "Pacific/Auckland"],
];

const cityOf = (tz: string) => (tz.split("/").pop() || tz).replace(/_/g, " ");

function buildZones(extra?: string): Zone[] {
  let ids: string[] = [];
  try {
    ids = (Intl as unknown as { supportedValuesOf: (k: string) => string[] }).supportedValuesOf("timeZone");
  } catch {}
  const map = new Map<string, Zone>();
  const add = (tz: string) => {
    if (map.has(tz)) return;
    const c = cityOf(tz);
    map.set(tz, { tz, label: c, search: `${c} ${tz.replace(/[_/]/g, " ")}`.toLowerCase() });
  };
  ids.forEach(add);
  COUNTRIES.forEach(([, tz]) => add(tz));
  if (extra) add(extra);
  COUNTRIES.forEach(([country, tz, kw]) => {
    const z = map.get(tz)!;
    z.label = `${cityOf(tz)} (${country})`;
    z.search += ` ${country.toLowerCase()} ${kw ?? ""}`;
  });
  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
}

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
  const [zones, setZones] = useState<Zone[]>([]);
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState(0);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // 8:00pm PKT today = 15:00 UTC today (Pakistan is UTC+5)
    const now = new Date(Date.now() + 5 * 60 * 60 * 1000);
    setStart(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 15, 0));
    const mine = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setZones(buildZones(mine));
    if (mine) setTz(mine);
    setReady(true);
  }, []);

  const current = zones.find((z) => z.tz === tz);
  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return [];
    return zones
      .filter((z) => ` ${z.search}`.includes(` ${q}`))
      .sort((a, b) => Number(b.label.toLowerCase().startsWith(q)) - Number(a.label.toLowerCase().startsWith(q)))
      .slice(0, 8);
  }, [q, zones]);

  const choose = (z: Zone) => {
    setTz(z.tz);
    setQuery("");
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && results[active]) { e.preventDefault(); choose(results[active]); }
    else if (e.key === "Escape") setOpen(false);
  };

  const end = start + 6 * 60 * 60 * 1000;

  return (
    <div className="rounded-xl bg-white shadow-lg p-5 sm:p-6 mt-6 border-t-4 border-secondary">
      <label htmlFor="session-city" className="block font-outfit font-semibold text-primary">
        See the session in your city
      </label>

      <div className="relative mt-2 w-full md:w-72 md:shrink-0">
        <input
          id="session-city"
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls="session-city-list"
          autoComplete="off"
          placeholder="Type your city or country"
          value={open ? query : current?.label ?? ""}
          onFocus={(e) => { setOpen(true); setQuery(""); e.currentTarget.select(); }}
          onBlur={() => setOpen(false)}
          onChange={(e) => { setQuery(e.target.value); setActive(0); setOpen(true); }}
          onKeyDown={onKey}
          className="w-full rounded-lg border border-primary/30 bg-white px-3 py-3 text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        {open && q && (
          <ul
            id="session-city-list"
            role="listbox"
            className="absolute bottom-full left-0 z-30 mb-1 max-h-56 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-xl"
          >
            {results.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">No match. Try the nearest big city.</li>
            )}
            {results.map((z, i) => (
              <li
                key={z.tz}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => { e.preventDefault(); choose(z); }}
                onMouseEnter={() => setActive(i)}
                className={`cursor-pointer px-3 py-2 text-sm ${i === active ? "bg-primary text-white" : "text-primary"}`}
              >
                {z.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-4 text-primary-light min-h-[3rem]" aria-live="polite">
        {ready ? (
          <>
            Our live session runs from <strong className="text-primary">{formatTime(start, tz, start)}</strong> to{" "}
            <strong className="text-primary">{formatTime(end, tz, start)}</strong> in your city.
          </>
        ) : (
          "Type your city to see your local time."
        )}
      </p>
    </div>
  );
}