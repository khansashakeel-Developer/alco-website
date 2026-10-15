import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import BrandCarousel from "@/component/brand-carousel/brandCarousel";

import kElectric from "@/assets/brand/k-electric.webp";
import bankAlfalah from "@/assets/brand/bank-alfalah.webp";
import gsk from "@/assets/brand/glaxosmithkline.webp";
import bayer from "@/assets/brand/bayer.webp";
import ibm from "@/assets/brand/ibm.webp";
import pso from "@/assets/brand/pakistan-state-oil.webp";
import emaar from "@/assets/brand/emaar-pakistan.webp";
import faysal from "@/assets/brand/faysal-bank.webp";
import hamdard from "@/assets/brand/hamdard-pakistan.webp";
import pel from "@/assets/brand/pel.webp";
import lucky from "@/assets/brand/lucky-cement.webp";
import avient from "@/assets/brand/avient.webp";
import tplInsurance from "@/assets/brand/tpl-insurance.webp";
import tplTrakker from "@/assets/brand/tpl-trakker.webp";
import ghandhara from "@/assets/brand/ghandhara-industries.webp";
import habib from "@/assets/brand/habib-university.webp";
import dha from "@/assets/brand/dha-suffa-university.webp";
import icma from "@/assets/brand/icma.webp";
import gulAhmed from "@/assets/brand/gul-ahmed.webp";
import sicpa from "@/assets/brand/sicpa.webp";
import stahl from "@/assets/brand/stahl.webp";
import feroze from "@/assets/brand/feroze1888.webp";
import alrahim from "@/assets/brand/alrahim-textile-mills.webp";

import aajNews from "@/assets/about-us/featured/Aaj-News.webp";
import bolNews from "@/assets/about-us/featured/Bol-News.webp";
import dawnNews from "@/assets/about-us/featured/Dawn-News.webp";
import samaaNews from "@/assets/about-us/featured/Samaa-News.webp";

type LogoItem = { name: string; image?: StaticImageData };

// Big, well-known brands first, then the rest. Logo files live in assets/brand/ (lowercase names, under 100KB each).
const organisations: LogoItem[] = [
  { name: "K-Electric", image: kElectric },
  { name: "Bank Alfalah", image: bankAlfalah },
  { name: "GlaxoSmithKline", image: gsk },
  { name: "Bayer", image: bayer },
  { name: "IBM", image: ibm },
  { name: "Pakistan State Oil", image: pso },
  { name: "Emaar Pakistan", image: emaar },
  { name: "Faysal Bank", image: faysal },
  { name: "Hamdard Pakistan", image: hamdard },
  { name: "PEL", image: pel },
  { name: "Lucky Cement", image: lucky },
  { name: "Avient", image: avient },
  { name: "TPL Insurance", image: tplInsurance },
  { name: "TPL Trakker", image: tplTrakker },
  { name: "Ghandhara Industries", image: ghandhara },
  { name: "Habib University", image: habib },
  { name: "DHA Suffa University", image: dha },
  { name: "ICMA International", image: icma },
  { name: "Gul Ahmed", image: gulAhmed },
  { name: "SICPA", image: sicpa },
  { name: "Stahl", image: stahl },
  { name: "Feroze1888", image: feroze },
  { name: "AlRahim Textile Mills", image: alrahim },
];

const media: LogoItem[] = [
  { name: "Aaj News", image: aajNews },
  { name: "Bol News", image: bolNews },
  { name: "Dawn News", image: dawnNews },
  { name: "Samaa News", image: samaaNews },
];

const brandTitle = "A Ripple, Not a Headcount";

// Every tile is a visible card (border, soft shadow, gold top edge) so text-only tiles read as intentional
// and a logo can drop in later without changing the layout: just add `image` to the item above.
function LogoTile({ item }: { item: LogoItem }) {
  return (
    <li className="relative h-[88px] flex items-center justify-center rounded-lg bg-white border border-primary/15 border-t-4 border-t-secondary shadow-sm px-4 transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg">
      {item.image ? (
        <Image
          src={item.image}
          alt={`${item.name} logo`}
          fill
          sizes="(max-width: 768px) 50vw, 200px"
          className="object-contain p-3"
        />
      ) : (
        <span className="text-center font-outfit font-semibold text-primary text-[15px] md:text-[16px] leading-snug">
          {item.name}
        </span>
      )}
    </li>
  );
}

export default function Brand() {
  return (
    <section className="relative container mx-auto py-6 md:py-8 lg:py-12 xl:py-16 px-4">
      {/* Ripple: text on the left, expanding rings on the right (the idea of the section, drawn in CSS). */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="text-start">
          <h2 className="h2 text-primary mb-6">{brandTitle}</h2>
          {/* Canon §2.3 ripple block, verbatim. */}
          <p className="custom-text1">
            More than two thousand certified graduates, across more than twenty countries, is only the visible part. Behind AL&amp;CO stand founders who spent years training and coaching across hundreds of organisations, and behind every graduate is a coaching practice, a workplace, a classroom, a family. Empowerment does not stop at the person in the room; it travels outward through everyone they touch.
          </p>
        </div>

        <div className="relative mx-auto flex h-72 w-72 sm:h-80 sm:w-80 items-center justify-center" aria-hidden="true">
          <span className="absolute inset-0 rounded-full border-2 border-primary/15" />
          <span className="absolute inset-6 rounded-full border-2 border-primary/20" />
          <span className="absolute inset-12 rounded-full border-2 border-primary/25" />
          <span className="absolute inset-0 rounded-full border-2 border-secondary/60 animate-ping motion-reduce:animate-none [animation-duration:3.5s]" />
          <span className="absolute inset-6 rounded-full border-2 border-secondary/50 animate-ping motion-reduce:animate-none [animation-duration:3.5s] [animation-delay:1.2s]" />
          <div className="relative flex h-40 w-40 sm:h-44 sm:w-44 flex-col items-center justify-center rounded-full bg-primary-darkest text-center shadow-xl">
            <span className="font-outfit text-3xl sm:text-4xl font-bold text-secondary">2,000+</span>
            <span className="font-outfit text-sm text-white/90">certified graduates</span>
          </div>
          <span className="absolute bottom-4 right-0 rounded-full bg-secondary px-4 py-2 font-outfit text-sm font-bold text-primary-darkest shadow-lg">
            20+ countries
          </span>
        </div>
      </div>

      {/* Organisations carousel. */}
      <div className="mt-12 lg:mt-16">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <span className="inline-block rounded-full bg-primary-darkest px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            Trusted by
          </span>
          <h3 className="mt-4 font-outfit text-3xl font-semibold leading-tight text-primary-darkest sm:text-4xl lg:text-5xl">
            Organisations We Have{" "}
            <span className="relative inline-block text-primary">
              Worked With
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-secondary"
              />
            </span>
          </h3>
          <p className="mx-auto mt-5 max-w-3xl custom-text1 font-light text-gray-700">
            AL&amp;CO’s own clients, and organisations our founders have trained and coached for, before and alongside AL&amp;CO.
          </p>
          <span aria-hidden="true" className="mx-auto mt-6 block h-px w-24 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        </div>
        <BrandCarousel items={organisations} />
      </div>

      {/* Featured In: stays inside this white section, directly under the organisations. */}
      <h3 className="h4 text-center mt-12 mb-6">Featured In</h3>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 max-w-4xl mx-auto">
        {media.map((m) => (
          <LogoTile key={m.name} item={m} />
        ))}
      </ul>
    </section>
  );
}