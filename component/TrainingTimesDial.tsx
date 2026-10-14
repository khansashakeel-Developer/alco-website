"use client";

import { useEffect, useRef, useState } from "react";

// start = the local hour the session begins in that region (24h clock)
const REGIONS: { region: string; time: string; note: string; start: number }[] =
  [
    {
      region: "Pakistan (Karachi)",
      time: "8:00pm to 2:00am",
      note: "our own time, the same for every cohort",
      start: 20,
    },
    {
      region: "United States, East Coast (New York)",
      time: "10:00am to 4:00pm",
      note: "a full working morning into the afternoon",
      start: 10,
    },
    {
      region: "United States, West Coast (Los Angeles)",
      time: "7:00am to 1:00pm",
      note: "an early start into midday",
      start: 7,
    },
    {
      region: "United Kingdom (London)",
      time: "3:00pm to 9:00pm",
      note: "afternoon into the evening",
      start: 15,
    },
    {
      region: "East Africa (Nairobi)",
      time: "6:00pm to midnight",
      note: "the evening",
      start: 18,
    },
    {
      region: "Middle East, the Gulf (Dubai)",
      time: "7:00pm to 1:00am",
      note: "the evening",
      start: 19,
    },
    {
      region: "Subcontinent (India, Bangladesh)",
      time: "8:30pm to 2:30am",
      note: "the evening",
      start: 20.5,
    },
    {
      region: "China (Beijing)",
      time: "11:00pm to 5:00am",
      note: "late night",
      start: 23,
    },
    {
      region: "Australia, East (Sydney)",
      time: "1:00am to 7:00am the next day",
      note: "the early hours",
      start: 1,
    },
  ];

const R = 118; // arc radius in the 300 x 300 viewBox
const C = 2 * Math.PI * R;
const CYCLE_MS = 3600;

export default function TrainingTimesDial() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const rot = useRef((REGIONS[0].start / 24) * 360);
  const [angle, setAngle] = useState(rot.current);

  // turn the arc by the shortest way round
  useEffect(() => {
    const target = (REGIONS[i].start / 24) * 360;
    const delta = ((target - (rot.current % 360) + 540) % 360) - 180;
    rot.current = rot.current + delta;
    setAngle(rot.current);
  }, [i]);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(
      () => setI((x) => (x + 1) % REGIONS.length),
      CYCLE_MS,
    );
    return () => clearTimeout(id);
  }, [i, paused]);

  const cur = REGIONS[i];

  return (
    <div
      className="mt-8 rounded-3xl bg-white p-5 shadow-xl md:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* full table for screen readers and search engines */}
      <table className="sr-only">
        <caption>
          When the 8:00pm to 2:00am PKT session runs in your region
        </caption>
        <thead>
          <tr>
            <th scope="col">Your region</th>
            <th scope="col">When our session runs for you</th>
          </tr>
        </thead>
        <tbody>
          {REGIONS.slice(1).map((r) => (
            <tr key={r.region}>
              <th scope="row">{r.region}</th>
              <td>
                {r.time}, {r.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
        aria-hidden
      >
        {/* ---- the dial ---- */}
        <div className="relative mx-auto aspect-square w-full max-w-[400px]">
          {/* day and night ring */}
          <div
            className="absolute inset-0 rounded-full shadow-inner"
            style={{
              background:
                "conic-gradient(from 0deg, #0b2545 0deg, #0b2545 55deg, #1B507C 88deg, #8fc1e8 115deg, #eaf5ff 180deg, #8fc1e8 245deg, #1B507C 272deg, #12395c 305deg, #0b2545 335deg, #0b2545 360deg)",
              WebkitMask:
                "radial-gradient(circle farthest-side, transparent 63%, #000 64%)",
              mask: "radial-gradient(circle farthest-side, transparent 63%, #000 64%)",
            }}
          />

          {/* the session arc */}
          <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full">
            <circle
              cx="150"
              cy="150"
              r={R}
              fill="none"
              stroke="#F9B81E"
              strokeWidth="34"
              strokeLinecap="round"
              strokeDasharray={`${C / 4 - 34} ${C}`}
              style={{
                transformOrigin: "150px 150px",
                transform: `rotate(${angle - 90}deg) rotate(8deg)`,
                transition: "transform 1100ms cubic-bezier(.6,.05,.2,1)",
                filter: "drop-shadow(0 0 10px rgba(249,184,30,0.7))",
              }}
            />
          </svg>

          {/* hour labels on the inside of the ring */}
          {[
            { t: "12am", s: "left-1/2 top-[19%] -translate-x-1/2" },
            { t: "6am", s: "right-[19%] top-1/2 -translate-y-1/2" },
            { t: "12pm", s: "bottom-[19%] left-1/2 -translate-x-1/2" },
            { t: "6pm", s: "left-[19%] top-1/2 -translate-y-1/2" },
          ].map((h) => (
            <span
              key={h.t}
              className={`absolute text-[11px] font-semibold text-slate-400 ${h.s}`}
            >
              {h.t}
            </span>
          ))}

          {/* centre readout */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[50%] text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-secondary-dark">
                Your session
              </p>
              <p
                key={i}
                className="mt-1 text-base font-bold leading-tight text-primary md:text-xl"
                style={{ animation: "ttd-in .5s ease both" }}
              >
                {cur.time}
              </p>
              <p className="mt-1 text-[11px] leading-tight text-slate-500 md:text-xs">
                {cur.note}
              </p>
            </div>
          </div>
        </div>

        {/* ---- region list ---- */}
        <ul className="space-y-1.5">
          {REGIONS.map((r, idx) => {
            const on = idx === i;
            return (
              <li key={r.region}>
                <button
                  type="button"
                  onMouseEnter={() => setI(idx)}
                  onFocus={() => setI(idx)}
                  onClick={() => setI(idx)}
                  className={`relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                    on
                      ? "bg-primary text-white shadow-lg md:translate-x-2"
                      : "bg-slate-50 text-primary hover:bg-slate-100"
                  }`}
                >
                  <span
                    className={`absolute inset-y-0 left-0 w-1.5 transition-all duration-300 ${on ? "bg-secondary" : "bg-transparent"}`}
                  />
                  <span className="pl-1 text-sm font-semibold">{r.region}</span>
                  <span
                    className={`shrink-0 text-xs font-medium ${on ? "text-secondary" : "text-slate-500"}`}
                  >
                    {r.time.replace(" the next day", "")}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <style>{`
        @keyframes ttd-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important } }
      `}</style>
    </div>
  );
}
