"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import ArslanPhoto from "@/assets/intro-arsalan-larik/arsalan-larik-clean.webp";
import BismillahPhoto from "@/assets/about-us/bismillah-pervez-clean.webp";

function useCount(to: number, from: number, run: boolean) {
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / 1600, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(from + (to - from) * e));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to, from]);
  return v;
}

type PanelProps = {
  tone: "dark" | "light";
  label: string;
  name: string;
  role: string;
  photo: StaticImageData;
  items: string[];
  countTo?: number;
  big?: string;
  bigLabel: string;
  noteTitle: string;
  note: string;
  inView: boolean;
  delay: number;
};

function Panel(p: PanelProps) {
  const count = useCount(p.countTo ?? 0, (p.countTo ?? 0) - 25, p.inView && !!p.countTo);

  return (
    <div
      className={`td-panel td-${p.tone}`}
      data-in={p.inView}
      style={{ transitionDelay: `${p.delay}ms` }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <div className="td-glow" />
      <div className="td-orb" />

      <div className="td-head">
        <div className="td-photo">
          <div className="td-ring" />
          <Image src={p.photo} alt={p.name} className="td-img" />
        </div>
        <div>
          <p className="td-label">{p.label}</p>
          <h3 className="td-name">{p.name}</h3>
          <p className="td-role">{p.role}</p>
        </div>
      </div>

      <ul className="td-list">
        {p.items.map((t, i) => (
          <li key={t} className="td-item" style={{ ["--i" as string]: i }}>
            <span className="td-num">0{i + 1}</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <div className="td-foot">
        <div>
          <div className="td-big">{p.countTo ? count : p.big}</div>
          <div className="td-biglabel">
            <span className="td-dot" />
            {p.bigLabel}
          </div>
        </div>
        <div className="td-note">
          <strong>{p.noteTitle}</strong>
          <p>{p.note}</p>
        </div>
      </div>
    </div>
  );
}

export default function TrainerDuo() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="td-wrap mx-auto mt-8 max-w-6xl text-left">
      <style>{`
.td-wrap{display:grid;gap:1.5rem;grid-template-columns:1fr;align-items:stretch}
@media(min-width:1024px){.td-wrap{grid-template-columns:1fr 1fr}}
.td-panel{position:relative;overflow:hidden;display:flex;flex-direction:column;border-radius:28px;padding:2rem;height:100%;
  opacity:0;transform:translateY(32px);transition:opacity .9s ease,transform .9s cubic-bezier(.2,.7,.2,1)}
.td-panel[data-in="true"]{opacity:1;transform:none}
.td-dark{background:#071a33;color:#fff;box-shadow:0 30px 60px -30px rgba(7,26,51,.6)}
.td-light{background:#FAF8EC;color:#071a33;border:1px solid rgba(7,26,51,.12);box-shadow:0 30px 60px -30px rgba(7,26,51,.25)}
.td-glow{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(380px circle at var(--mx,80%) var(--my,0%),rgba(249,184,30,.22),transparent 60%)}
.td-light .td-glow{background:radial-gradient(380px circle at var(--mx,80%) var(--my,0%),rgba(249,184,30,.38),transparent 60%)}
.td-orb{position:absolute;right:-60px;top:-60px;width:220px;height:220px;border-radius:9999px;pointer-events:none;
  background:radial-gradient(circle,rgba(249,184,30,.35),transparent 70%);animation:td-drift 9s ease-in-out infinite}
.td-head{position:relative;display:flex;align-items:center;gap:1.5rem;min-height:160px}
.td-photo{position:relative;width:140px;height:140px;flex:none;animation:td-float 5s ease-in-out infinite}
.td-ring{position:absolute;inset:-10px;border-radius:9999px;border:2px dashed #F9B81E;animation:td-spin 18s linear infinite}
.td-img{width:100%;height:100%;border-radius:9999px;object-fit:cover;object-position:top;
  background:linear-gradient(160deg,#F9B81E,#f08a24)}
.td-label{font-size:.75rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#F9B81E}
.td-light .td-label{color:#b7791f}
.td-name{margin-top:.25rem;font-size:clamp(1.75rem,3vw,2.25rem);font-weight:800;line-height:1.1}
.td-role{margin-top:.35rem;font-size:1.05rem;opacity:.75}
.td-list{position:relative;margin-top:1.5rem;flex:1;list-style:none;padding:0}
.td-item{position:relative;display:flex;gap:1rem;align-items:baseline;padding:.85rem 0;font-size:.98rem;font-weight:500;
  opacity:0;transform:translateX(-18px);transition:opacity .6s ease,transform .6s ease;transition-delay:calc(var(--i)*120ms + 400ms)}
.td-item::before{content:"";position:absolute;top:0;left:0;height:1px;width:0;background:#F9B81E;
  transition:width 1s ease;transition-delay:calc(var(--i)*120ms + 500ms)}
.td-item::after{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:currentColor;opacity:.12}
[data-in="true"] .td-item{opacity:1;transform:none}
[data-in="true"] .td-item::before{width:100%;z-index:1}
.td-num{font-size:.75rem;font-weight:800;color:#F9B81E;min-width:1.6rem}
.td-light .td-num{color:#b7791f}
.td-foot{position:relative;margin-top:auto;padding-top:1.5rem;display:flex;align-items:flex-end;justify-content:space-between;gap:1.25rem;min-height:150px}
.td-big{font-size:clamp(3rem,6vw,4.5rem);font-weight:800;line-height:1;color:#F9B81E;font-variant-numeric:tabular-nums}
.td-light .td-big{color:#071a33}
.td-biglabel{display:flex;align-items:center;gap:.5rem;margin-top:.4rem;font-size:.85rem;font-weight:600;opacity:.85}
.td-dot{position:relative;width:8px;height:8px;border-radius:9999px;background:#F9B81E}
.td-dot::after{content:"";position:absolute;inset:0;border-radius:9999px;background:#F9B81E;animation:td-ping 1.8s ease-out infinite}
.td-note{max-width:15rem;font-size:.85rem;line-height:1.5;opacity:.85;border-left:2px solid #F9B81E;padding-left:.9rem}
.td-note strong{display:block;margin-bottom:.2rem;color:#F9B81E}
.td-light .td-note strong{color:#b7791f}
@keyframes td-spin{to{transform:rotate(360deg)}}
@keyframes td-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes td-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,30px)}}
@keyframes td-ping{0%{transform:scale(1);opacity:.7}100%{transform:scale(3);opacity:0}}
@media(max-width:520px){.td-head{flex-direction:column;align-items:flex-start}.td-foot{flex-direction:column;align-items:flex-start}}
@media(prefers-reduced-motion:reduce){
  .td-wrap *{animation:none!important;transition:none!important}
  .td-panel,.td-item{opacity:1!important;transform:none!important}
  .td-item::before{width:100%}
}
      `}</style>

      <Panel
        tone="dark"
        label="Your Trainer"
        name="Arslan Larik"
        role="Founder and Master Trainer of AL&CO"
        photo={ArslanPhoto}
        items={[
          "Pakistan's first Certified Master Trainer of NLP (ABNLP) and of Hypnosis (ABH)",
          "ANLP Accredited Master Trainer (UK)",
          "Master Trainer under Robert Dilts at NLP University",
          "ANLP International Ambassador for Pakistan",
        ]}
        countTo={2010}
        bigLabel="Training and coaching since"
        noteTitle="Lineage and curriculum"
        note="Through The Tad James Company, and the architect of the AL&CO curriculum."
        inView={inView}
        delay={0}
      />

      <Panel
        tone="light"
        label="Arranged by"
        name="Bismillah Pervez"
        role="CEO and Master Trainer of AL&CO"
        photo={BismillahPhoto}
        items={[
          "ICF Master Certified Coach (MCC)",
          "ACTC",
          "ANLP Accredited Master Trainer (UK)",
        ]}
        big="Level 3"
        bigLabel="Arranged directly with her"
        noteTitle="Your point of contact"
        note="Every Level 3 applicant meets Bismillah in person before a place is offered."
        inView={inView}
        delay={180}
      />
    </div>
  );
}