"use client";

import React from "react";
import CtaButton from "./CtaButton";
import type { CtaRef } from "./cta";
import { ContactInfoData } from "@/type/contactInfo";
import ContactBg from "@/assets/background/contact-info.webp";
import { HiOutlinePhone } from "react-icons/hi2";
import Link from "next/link";
import { track } from "@/libs/track";

// D8: +92 336 008 2222 is the only linked number. +1 (206) 614 0234 is display only.
const contactInfoData: ContactInfoData = {
  title: "Call or WhatsApp Us",
  number: "+92 336 008 2222",
  description:
    "Your transformation starts with one conversation. Levels 1 and 2 are arranged by your relationship manager; Levels 3 and above directly with Bismillah Pervez and Arslan Larik.",
};

// CTA plan: the band's buttons depend on the page's funnel stage.
//   Level 1 and 2: primary C4 (enrol popup). Level 3 to 6 and MoFu pages: primary C1.
//   ToFu pages (Four Clouds, resources): primary C2.
// Default is C1, so no page gets an instant-enrol button by accident.
type Props = {
  primary?: CtaRef;
  secondary?: CtaRef;
  description?: string;
};

export default function ContactInfo({ primary = { id: "C1" }, secondary, description }: Props) {
  const data = { ...contactInfoData, description: description ?? contactInfoData.description };

  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-light-neutral bg-cover bg-top-left w-full">
      <div className="container mx-auto px-4">
        <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-4 md:py-6 lg:py-10 xl:py-14  bg-cover bg-top-left w-full rounded-xl" style={{ backgroundImage: `url(${ContactBg.src})` }}>
          <div className="grid grid-cols-12 gap-2 my-8">
            <div className="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-5 2xl:col-span-4 flex flex-col sm:flex-row sm:space-x-4 sm:items-center">
              <Link
                href="tel:+923360082222"
                aria-label="Call AL&CO on +92 336 008 2222"
                onClick={() => track("Contact", { contentName: "call" })}
                className="bg-secondary-light text-white h-16 w-16 mb-4 flex justify-center items-center rounded-full shadow hover:bg-yellow-600 transition"
              >
                <HiOutlinePhone size={30} />
              </Link>

              <div className="flex flex-col justify-start ">
                <p className="custom-text1 font-light text-white text-start ">{data.title}</p>
                <div className="cta-phone h3 text-white text-start ">
                  <Link href="tel:+923360082222" onClick={() => track("Contact", { contentName: "call" })} className="hover:underline">
                    {data.number}
                  </Link>
                </div>
                <p className="custom-text1 font-light text-white/80 text-start">
                  <Link
                    href="https://wa.me/923360082222"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("Contact", { contentName: "whatsapp" })}
                    className="underline"
                  >
                    WhatsApp: +92 336 008 2222
                  </Link>
                </p>
                <p className="custom-text1 font-light text-white/80 text-start">US and Canada: +1 (206) 614 0234</p>
              </div>
            </div>
            <div className="col-span-12 xl:col-span-5 2xl:col-span-6 md:order-last xl:order-none">
              <p className="custom-text1 font-light text-white text-start my-4">{data.description}</p>
            </div>
            <div className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2 2xl:col-span-2 flex flex-col justify-end ">
              <div className="flex flex-col gap-3 my-auto md:ml-auto">
                <CtaButton id={primary.id} message={primary.message} href={primary.href} label={primary.label} variant="secondary" />
                {secondary && (
                  <CtaButton id={secondary.id} message={secondary.message} href={secondary.href} label={secondary.label} variant="outlineWhite" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
