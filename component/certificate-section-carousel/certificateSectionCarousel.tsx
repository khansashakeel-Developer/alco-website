"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { CertificateItem } from "@/type/certificatetypes"
import "./certificateSectionCarousel.css"

// ─── Icon components (inline SVG, no extra deps) ─────────────────
const IconCertificate = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
const IconBuilding = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
  </svg>
)
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
)
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const IconWorld = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)
const IconRosette = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
  </svg>
)
const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

// ─── Types ────────────────────────────────────────────────────────
type PropType = {
  certificates: CertificateItem[]
}

// ─── Component ────────────────────────────────────────────────────
const CertificateSectionCarousel = ({ certificates }: PropType) => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const [trackX, setTrackX] = useState(0)

  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const SCROLL_STEP = 180

  // ─── Arrow visibility ────────────────────────────────────────────
  const updateArrows = useCallback((x: number) => {
    if (!trackRef.current || !viewportRef.current) return
    const total = trackRef.current.scrollWidth
    const vw = viewportRef.current.offsetWidth
    setShowLeft(x < -2)
    setShowRight(x > -(total - vw - 2))
  }, [])

  useEffect(() => {
    updateArrows(trackX)
  }, [trackX, updateArrows])

  // Recalculate on resize
  useEffect(() => {
    const ro = new ResizeObserver(() => updateArrows(trackX))
    if (viewportRef.current) ro.observe(viewportRef.current)
    return () => ro.disconnect()
  }, [trackX, updateArrows])

  // ─── Scroll helpers ──────────────────────────────────────────────
  const scrollLeft = () => {
    const nx = Math.min(trackX + SCROLL_STEP, 0)
    setTrackX(nx)
    updateArrows(nx)
  }

  const scrollRight = () => {
    if (!trackRef.current || !viewportRef.current) return
    const max = -(trackRef.current.scrollWidth - viewportRef.current.offsetWidth)
    const nx = Math.max(trackX - SCROLL_STEP, max)
    setTrackX(nx)
    updateArrows(nx)
  }

  // ─── Ensure active tab is visible in viewport ────────────────────
  const ensureTabVisible = useCallback((idx: number, currentX: number) => {
    const tab = tabRefs.current[idx]
    const vp = viewportRef.current
    if (!tab || !vp) return currentX

    const tabL = tab.offsetLeft
    const tabR = tabL + tab.offsetWidth
    const vpW = vp.offsetWidth
    let x = currentX

    if (tabL + x < 0) x = -tabL + 8
    else if (tabR + x > vpW) x = -(tabR - vpW + 8)

    return x
  }, [])

  // ─── Select tab ─────────────────────────────────────────────────
  const handleTabClick = (idx: number) => {
    if (idx === activeIdx) return

    setIsUpdating(true)
    setTimeout(() => {
      setActiveIdx(idx)
      setIsUpdating(false)
    }, 200)

    const nx = ensureTabVisible(idx, trackX)
    setTrackX(nx)
    setTimeout(() => updateArrows(nx), 360)
  }

  const cert = certificates[activeIdx]
  if (!cert) return null

  return (
    <div>
      {/* ── Tab row ── */}
      <div className="cert_tab_row">
        <button
          className={`cert_tab_arrow${showLeft ? "" : " hidden"}`}
          onClick={scrollLeft}
          aria-label="Scroll tabs left"
        >
          <IconChevronLeft />
        </button>

        <div className="cert_tabs_viewport" ref={viewportRef}>
          <div
            className="cert_tabs_track"
            ref={trackRef}
            style={{ transform: `translateX(${trackX}px)` }}
          >
            {certificates.map((c, i) => (
              <button
                key={c.id}
                ref={el => { tabRefs.current[i] = el }}
                className={`cert_tab_btn${i === activeIdx ? " active" : ""}`}
                onClick={() => handleTabClick(i)}
                aria-selected={i === activeIdx}
                role="tab"
              >
                {c.tabLabel}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`cert_tab_arrow${showRight ? "" : " hidden"}`}
          onClick={scrollRight}
          aria-label="Scroll tabs right"
        >
          <IconChevronRight />
        </button>
      </div>

      {/* ── Certificate card ── */}
      <div className={`cert_card${isUpdating ? " updating" : ""}`} role="tabpanel">
        {/* Image / preview */}
        <div className="cert_img_box">
          {cert.image ? (
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              className="object-contain object-center"
            />
          ) : (
            <>
              <IconCertificate />
              <span className="cert_img_placeholder_text">Certificate Preview</span>
            </>
          )}
        </div>

        {/* Body */}
        <div className="cert_body">
          <div className="cert_body_top">
            <span className="cert_tag">{cert.tag}</span>
            <h3 className="cert_title">{cert.title}</h3>
            <p className="cert_org">
              <IconBuilding />
              {cert.organization}
            </p>
            <p className="cert_desc">{cert.description}</p>
            <div className="cert_meta">
              <span className="cert_meta_item">
                <IconClock />
                {cert.duration}
              </span>
              <span className="cert_meta_item">
                <IconUsers />
                {cert.mode}
              </span>
              <span className="cert_meta_item">
                <IconWorld />
                {cert.accreditation}
              </span>
            </div>
          </div>
          {/* ── Accredited By panel ── */}
        {cert.accreditedBadges && cert.accreditedBadges.length > 0 && (
          <div className="cert_accredited_panel">
            {/* <span className="cert_accredited_label">Accredited By</span> */}
            <div className="cert_accredited_badges">
              {cert.accreditedBadges.map((src, i) => (
                <div key={i} className="cert_accredited_badge">
                  <Image
                    src={src}
                    alt={`${cert.organization} accreditation seal`}
                    fill
                    className="object-contain object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

          <span className="cert_badge">
            <IconRosette />
            {cert.badgeText}
          </span>
        </div>

        
      </div>
    </div>
  )
}

export default CertificateSectionCarousel