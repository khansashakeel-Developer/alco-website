"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { LiveSessionItem } from "@/type/liveSessionType"
import "./liveSessionCarousel.css"

function tagClass(tag?: string): string {
  if (tag === "Workshop") return "ls_tag ls_tag--workshop"
  if (tag === "Announcement") return "ls_tag ls_tag--announcement"
  return "ls_tag"
}

type PropType = {
  slides: LiveSessionItem[]
  autoplayDelay?: number
}

const LiveSessionCarousel = ({ slides, autoplayDelay = 4500 }: PropType) => {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const total = slides.length

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setActive(prev => (prev - 1 + total) % total)
  }, [total])

  // Autoplay
  useEffect(() => {
    if (autoplayDelay <= 0) return
    timerRef.current = setTimeout(next, autoplayDelay)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [active, autoplayDelay, next])

  // Clamp offset to -2..+2 (wrapping around total)
  const getOffset = (index: number) => {
    let offset = index - active
    if (offset > total / 2)  offset -= total
    if (offset < -total / 2) offset += total
    return offset
  }

  // Desktop: fan layout with translateX/Y + scale
  // Mobile handled entirely via CSS using data-offset attribute
  const getStyle = (offset: number): React.CSSProperties => {
    const abs = Math.abs(offset)
    if (abs > 2) return { display: "none" }

    const sign = offset === 0 ? 0 : offset > 0 ? 1 : -1

    // translateX: center=0, ±1=±42%, ±2=±72%
    const xMap:  Record<number, number> = { 0: 0,  1: 42,  2: 72  }
    // translateY: side cards shift UP from center so info blocks align
    const yMap:  Record<number, number> = { 0: 0,  1: 1, 2: 1 }
    // scale: center=1, ±1=0.72, ±2=0.50
    const scMap: Record<number, number> = { 0: 1,  1: 0.72, 2: 0.50 }
    // zIndex
    const zMap:  Record<number, number> = { 0: 10, 1: 6,   2: 3   }
    // opacity
    const opMap: Record<number, number> = { 0: 1,  1: 0.9, 2: 0.75 }

    return {
      transform: `translateX(${sign * xMap[abs]}%) translateY(${yMap[abs]}%) scale(${scMap[abs]})`,
      zIndex:    zMap[abs],
      opacity:   opMap[abs],
    }
  }

  return (
    <div className="ls_carousel">
      {/* Slides */}
      <div className="ls_track">
        {slides.map((slide, index) => {
          const offset = getOffset(index)
          const style  = getStyle(offset)

          return (
            <div
              key={index}
              className="ls_slide"
              style={style}
              // data-offset lets CSS target specific positions on mobile
              data-offset={String(offset)}
              onClick={() => setActive(index)}
            >
              <div className="ls_slide__inner">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 64vw, 58vw"
                  className="object-cover object-center"
                  priority={index < 3}
                />
                <div className="ls_slide__overlay" aria-hidden="true" />

                {/* Badge */}
                <div className="ls_slide__badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  {slide.attendees}
                </div>

                {/* Info */}
                <div className="ls_slide__info">
                  <span className={tagClass(slide.tag)}>{slide.tag}</span>
                  <p className="ls_slide__title">{slide.title}</p>
                  <p className="ls_slide__date">{slide.date}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="ls_controls">
        <button className="ls_arrow" onClick={prev} aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="ls_dots">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`ls_dot${i === active ? " ls_dot--active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button className="ls_arrow" onClick={next} aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default LiveSessionCarousel