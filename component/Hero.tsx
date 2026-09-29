"use client"

import React, { useState, useEffect } from "react"
import HeroCarousel from "./hero-carousel/heroCarousel"
import { HeroData } from "@/type/heroType"
{/* add and editable word start */}
// import HeroEditorModal from "./modal/hero/[id]/HeroEditorModal"
// import { HeroPost } from "@/type/heroTypes"
// import HeroAddedModal from "./modal/hero/HeroAddedModal"
{/* add and editable word end */}

type Props = {
  data: HeroData
}
export default function Hero({ data }: Props) {
  {/* add and editable word start */}
  // const [editingSlide, setEditingSlide] = useState<HeroPost | null>(null)
  // const [hero, setHero] = useState<HeroPost[]>([]);

  // const handleUpdate = async (updatedSlide: HeroPost) => {

  //   const newSlides = hero.map((s) =>
  //     s._id === updatedSlide?._id ? updatedSlide : s
  //   )

  //   setHero(newSlides)
  //   await fetch(`/api/hero/${updatedSlide._id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       title: updatedSlide.title,
  //       description: updatedSlide.description
  //     }),
  //   });
  // }
  // useEffect(() => {
  //   const fetchHero = async () => {
  //     const res = await fetch("/api/hero");
  //     if (!res.ok) {
  //       console.log("Failed to fetch hero");
  //       return;
  //     }

  //     const data = await res.json();
  //     console.log("Fetched hero:", data);
  //     setHero(data?.hero || []);
  //   };

  //   fetchHero();
  // }, []);
{/* add and editable word end */}
  return (
    <section className="relative">
       <HeroCarousel
        slides={data}
      />
      {/* add and editable word start */}
      {/* <HeroCarousel
        slides={hero}
        onEditSlide={(slide) => setEditingSlide(slide)}
      /> */}
      {/* {editingSlide && (
        <HeroEditorModal
          slide={editingSlide}
          onClose={() => setEditingSlide(null)}
          onUpdate={handleUpdate}
        />
      )}
      <HeroAddedModal /> */}
      {/* add and editable word end */}
    </section>
  )
}