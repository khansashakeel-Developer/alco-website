"use client";

import { GalleryItem } from "@/type/gallery";
import GalleryCarousel from "./gallery-carousel/galleryCarousel";

type Props = {
  data?: GalleryItem;
};

const Gallery = ({ data }: Props) => {
  return (
    data &&
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 px-4">
      {/* Title */}
      {data?.title && (
        <h2 className={`h4 font-semibold text-center text-primary ${data?.underline === false ? "" : "underline"} max-w-5xl mb-5 mx-auto`}>
          {data?.title}
        </h2>
      )}

      {/* Description */}
      {data?.description && (
        <div className="text-center text-primary-light mb-5 max-w-7xl mx-auto ">{data?.description}</div>
      )}

      {/* Carousel */}
      <GalleryCarousel slides={data?.image} />
    </section>
  );
};

export default Gallery;