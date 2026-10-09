/*
"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "./button";
import { IoChevronDown } from "react-icons/io5";
import Logo from "@/assets/logo.webp";
import Image from "next/image";
import { CTA, ctaDataAttrs } from "./cta";

// Spec A 02: brochure level names ("Level N: Name"), hub first. URLs unchanged.
// Business in the Box is never a nav item (D7).
const menuData = [
  { name: "Home", link: "/" },
  {
    name: "Programmes",
    submenu: [
      { name: "All Programmes", link: "/programs" },
      { name: "Level 1: NLP Practitioner", link: "/program/nlp-practitioner" },
      { name: "Level 2: NLP Master Practitioner", link: "/program/nlp-master-practitioner" },
      { name: "Level 3: Advanced Hypnotherapy and Interventionist", link: "/program/advanced-hypnotherapy-interventionist" },
      { name: "Level 4: NLP Train the Trainer", link: "/program/nlp-trainers-training-program" },
      { name: "Level 5: Hypnosis Train the Trainer", link: "/program/hypnosis-trainers-training-program" },
      { name: "Level 6: NLP Master Trainer", link: "/program/nlp-master-trainer-program" },
      { name: "Private Coaching", link: "/one-on-one-coaching-sessions" },
    ],
  },

  {
    name: "About Us",
    submenu: [
      { name: "Our Mission", link: "/our-mission" },
      { name: "Who is Arslan Larik", link: "/about-us/who-is-arslan-larik" },
      { name: "Who is Bismillah Pervez", link: "/about-us/who-is-bismillah-pervez" },
      { name: "Why Train With AL&CO", link: "/about-us/why-train-with-alco" },
      { name: "FAQs", link: "/faqs" },
    ],
  },

  { name: "Four Clouds Model", link: "/services/four-clouds-model" },
    {
    name: "Resources",
    submenu: [
      { name: "All Resources", link: "/services/resources" },
      { name: "Blogs", link: "/blogs" },
    ],
  },
  { name: "Contact", link: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-2xl  border-b fixed w-full top-0 z-50">
        <div className="container mx-auto flex items-center justify-between p-4">

          {/* Logo *//*
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="Arslan Larik & Company (AL&CO) logo"
              className="h-10 md:h-11 xl:h-12 2xl:h-13  w-auto"
              priority
            />
          </Link>

          {/* Desktop Menu }
          <ul className="hidden lg:flex items-stretch gap-4 xl:gap-8 2xl:gap-6 z-0">
            {menuData.map((item) => (
              <li
                key={item.name}
                className="relative "
                onMouseEnter={() => item.submenu && setOpenDropdown(item.name)}
                onMouseLeave={() => item.submenu && setOpenDropdown(null)}
              >
                {item.submenu ? (
                  <>
                    <button
                      type="button"
                      className="header-menu-font flex items-center gap-x-1 "
                      aria-haspopup="true"
                      aria-expanded={openDropdown === item.name}
                      onClick={() => toggleDropdown(item.name)}
                      onFocus={() => setOpenDropdown(item.name)}
                    >
                      {item.name}
                      <IoChevronDown />
                    </button>

                    {/* Desktop Dropdown: always in the HTML so crawlers see the links; shown on hover }
                    <div
                      className={`absolute left-0 top-full pt-2 ${openDropdown === item.name ? "block" : "hidden"}`}
                    >
                      <ul className="bg-primary rounded-lg shadow-lg w-[330px] max-w-xl my-2 overflow-hidden border border-primary">
                        {item.submenu.map((sub, i) => (
                          <li
                            key={sub.link}
                            className={item.name === "Programmes" && i === 0 ? "border-b border-white/20" : ""}
                          >
                            <Link
                              href={sub.link}
                              onClick={() => setOpenDropdown(null)}
                              className={`block px-4 py-2 header-submenu-font hover:bg-gray-100/10 backdrop-blur-sm text-neutral-100 hover:text-white ${item.name === "Programmes" && i === 0 ? "font-semibold text-secondary" : ""}`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link href={item.link ?? "#"} className="header-menu-font flex items-center">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Buttons }
          <div className="hidden lg:flex gap-3">
            <Button
              text={CTA.C4.label}
              className="header-menu-button px-[12px]"
              iconRight={true}
              href="/enroll"
              newTab={false}
              dataAttrs={ctaDataAttrs("C4")}
            />
            <Button
              iconRight={false} text="Find your level" variant="outlinePrimary" className="header-menu-button px-[12px]" href="/start" newTab={false} />
          </div>

          {/* Mobile Toggle }
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-2xl"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            ☰
          </button>

        </div>

        {/* Mobile Menu: always rendered so links are in the HTML; hidden with CSS }
        <div className={`lg:hidden border-t bg-white/40 backdrop-blur-3xl ${mobileOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col p-4 gap-3">
            {menuData.map((item) => (
              <li key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.name)}
                      aria-expanded={openDropdown === item.name}
                      className="header-menu-font w-full text-left flex justify-between items-center"
                    >
                      {item.name}
                      <IoChevronDown
                        className={`transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`}
                      />
                    </button>
                    <ul className={`pl-4 mt-2 flex-col gap-2 ${openDropdown === item.name ? "flex" : "hidden"}`}>
                      {item.submenu.map((sub) => (
                        <li key={sub.link}>
                          <Link
                            href={sub.link}
                            className="header-submenu-font"
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link href={item.link ?? "#"} className="header-menu-font" onClick={() => setMobileOpen(false)}>
                    {item.name}
                  </Link>
                )}
              </li>
            ))}

            {/* Mobile Buttons }
            <li className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button
                text={CTA.C4.label}
                className="header-menu-button px-[12px]"
                iconRight={true}
                href="/enroll"
                newTab={false}
                dataAttrs={ctaDataAttrs("C4")}
              />
              <Button
                iconRight={false} text="Find your level" variant="outlinePrimary" className="header-menu-button px-[12px] min-w-[160px]" href="/start" newTab={false} />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
*/

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./button";
import { IoChevronDown } from "react-icons/io5";
import Logo from "@/assets/logo.webp";
import Image from "next/image";
import { CTA, ctaDataAttrs } from "./cta";

// Spec A 02: brochure level names ("Level N: Name"), hub first. URLs unchanged.
// Business in the Box is never a nav item (D7).
type MenuItem = {
  name: string;
  link?: string;
  submenu?: { name: string; link: string }[];
};

const menuData: MenuItem[] = [
  { name: "Home", link: "/" },
  {
    name: "Programmes",
    submenu: [
      { name: "All Programmes", link: "/programs" },
      { name: "Level 1: NLP Practitioner", link: "/program/nlp-practitioner" },
      { name: "Level 2: NLP Master Practitioner", link: "/program/nlp-master-practitioner" },
      { name: "Level 3: Advanced Hypnotherapy and Interventionist", link: "/program/advanced-hypnotherapy-interventionist" },
      { name: "Level 4: NLP Train the Trainer", link: "/program/nlp-trainers-training-program" },
      { name: "Level 5: Hypnosis Train the Trainer", link: "/program/hypnosis-trainers-training-program" },
      { name: "Level 6: NLP Master Trainer", link: "/program/nlp-master-trainer-program" },
      { name: "Private Coaching", link: "/one-on-one-coaching-sessions" },
    ],
  },
  {
    name: "About Us",
    submenu: [
      { name: "Our Mission", link: "/our-mission" },
      { name: "Who is Arslan Larik", link: "/about-us/who-is-arslan-larik" },
      { name: "Who is Bismillah Pervez", link: "/about-us/who-is-bismillah-pervez" },
      { name: "Why Train With AL&CO", link: "/about-us/why-train-with-alco" },
      { name: "FAQs", link: "/faqs" },
    ],
  },
  { name: "Four Clouds Model", link: "/services/four-clouds-model" },
  {
    name: "Resources",
    submenu: [
      { name: "All Resources", link: "/services/resources" },
      { name: "Blogs", link: "/blogs" },
    ],
  },
  { name: "Contact", link: "/contact" },
];

const NAVY = "bg-[#09263D]/95 backdrop-blur-xl ring-1 ring-white/10";

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const matches = (link?: string) => {
    if (!link) return false;
    if (link === "/") return pathname === "/";
    return pathname === link || pathname.startsWith(link + "/");
  };
  const isActive = (item: MenuItem) =>
    item.submenu ? item.submenu.some((s) => matches(s.link)) : matches(item.link);

  const shadow = scrolled
    ? "shadow-[0_10px_30px_rgba(9,38,61,0.35)]"
    : "shadow-[0_6px_20px_rgba(9,38,61,0.18)]";

  return (
    <>
      {/* Backing bar is exactly 72px tall: layout.tsx pads <main> by 72px and the
          announcement strip starts right under it. Capsules float inside the bar. */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b border-[#09263D]/10 bg-white/80 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_24px_rgba(9,38,61,0.18)]" : ""
        }`}
      >
        <div className="container mx-auto flex h-full items-center justify-between gap-3 px-3 sm:px-4">
          {/* Capsule 1: logo (white pill, so the blue logo stays as it is) */}
          <Link
            href="/"
            className={`flex h-14 shrink-0 items-center rounded-full bg-white px-5 ring-1 ring-[#09263D]/10 ${shadow}`}
          >
            <Image
              src={Logo}
              alt="Arslan Larik & Company (AL&CO) logo"
              className="h-10 w-auto md:h-11"
              priority
            />
          </Link>

          {/* Capsule 2: links (desktop) */}
          <ul className={`hidden h-12 items-stretch gap-1 rounded-full p-1 lg:flex ${NAVY} ${shadow}`}>
            {menuData.map((item) => {
              const active = isActive(item);
              const pill = `header-menu-font flex h-full items-center gap-x-1 rounded-full px-3 xl:px-4 !text-sm xl:!text-base transition-all duration-200 ${
                active
                  ? "bg-white/15 !text-secondary"
                  : "!text-white/85 hover:bg-white/10 hover:!text-white"
              }`;
              return (
                <li
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setOpenDropdown(item.name)}
                  onMouseLeave={() => item.submenu && setOpenDropdown(null)}
                >
                  {item.submenu ? (
                    <>
                      <button
                        type="button"
                        className={pill}
                        aria-haspopup="true"
                        aria-expanded={openDropdown === item.name}
                        onClick={() => toggleDropdown(item.name)}
                        onFocus={() => setOpenDropdown(item.name)}
                      >
                        {item.name}
                        <IoChevronDown
                          className={`transition-transform duration-300 ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown: always in the HTML so crawlers see the links; shown on hover */}
                      <div
                        className={`absolute left-0 top-full pt-4 ${
                          openDropdown === item.name ? "block" : "hidden"
                        }`}
                      >
                        <ul className={`w-[330px] max-w-xl overflow-hidden rounded-2xl shadow-2xl ${NAVY}`}>
                          {item.submenu.map((sub, i) => {
                            const isHub = item.name === "Programmes" && i === 0;
                            const isCoaching = sub.link === "/one-on-one-coaching-sessions";
                            return (
                              <li
                                key={sub.link}
                                className={
                                  isHub
                                    ? "border-b border-white/15"
                                    : isCoaching
                                      ? "border-t border-white/15"
                                      : ""
                                }
                              >
                                <Link
                                  href={sub.link}
                                  onClick={() => setOpenDropdown(null)}
                                  className={`header-submenu-font block px-4 py-2.5 transition-all duration-200 hover:bg-white/10 hover:pl-5 hover:!text-secondary ${
                                    isHub || isCoaching || matches(sub.link)
                                      ? "font-semibold !text-secondary"
                                      : "!text-neutral-100"
                                  }`}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link href={item.link ?? "#"} className={pill}>
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Capsule 3: actions (desktop) */}
          <div className={`hidden h-12 items-center gap-2 rounded-full px-1.5 lg:flex ${NAVY} ${shadow}`}>
            <Button
              text={CTA.C4.label}
              className="header-menu-button px-[12px] !rounded-full !border-secondary !bg-secondary !text-[#09263D] hover:brightness-110"
              iconRight={true}
              href="/enroll"
              newTab={false}
              dataAttrs={ctaDataAttrs("C4")}
            />
            <Button
              iconRight={false}
              text="Find your level"
              variant="outlinePrimary"
              className="header-menu-button px-[12px] !rounded-full !border-white/40 !text-white hover:!bg-white/10"
              href="/start"
              newTab={false}
            />
          </div>

          {/* Mobile toggle: navy circle, bars morph into a cross */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`relative flex h-12 w-12 shrink-0 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden ${NAVY} ${shadow}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu: always rendered so links are in the HTML; hidden with CSS */}
        <div
          className={`mx-3 mt-2 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl shadow-2xl lg:hidden sm:mx-4 ${NAVY} ${
            mobileOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col p-4">
            {menuData.map((item) => (
              <li key={item.name} className="border-b border-white/10 py-2.5 last:border-b-0">
                {item.submenu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.name)}
                      aria-expanded={openDropdown === item.name}
                      className={`header-menu-font flex w-full items-center justify-between text-left ${
                        isActive(item) ? "!text-secondary" : "!text-white"
                      }`}
                    >
                      {item.name}
                      <IoChevronDown
                        className={`transition-transform duration-300 ${
                          openDropdown === item.name ? "rotate-180 text-secondary" : ""
                        }`}
                      />
                    </button>
                    <ul
                      className={`mt-2 flex-col gap-1 border-l-2 border-secondary/60 pl-4 ${
                        openDropdown === item.name ? "flex" : "hidden"
                      }`}
                    >
                      {item.submenu.map((sub) => (
                        <li key={sub.link}>
                          <Link
                            href={sub.link}
                            className={`header-submenu-font block py-1.5 ${
                              matches(sub.link) ? "font-semibold !text-secondary" : "!text-neutral-100"
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.link ?? "#"}
                    className={`header-menu-font block ${isActive(item) ? "!text-secondary" : "!text-white"}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}

            {/* Mobile buttons */}
            <li className="flex flex-col gap-2 pt-4 sm:flex-row">
              <Button
                text={CTA.C4.label}
                className="header-menu-button px-[12px] !rounded-full !border-secondary !bg-secondary !text-[#09263D]"
                iconRight={true}
                href="/enroll"
                newTab={false}
                dataAttrs={ctaDataAttrs("C4")}
              />
              <Button
                iconRight={false}
                text="Find your level"
                variant="outlinePrimary"
                className="header-menu-button px-[12px] min-w-[160px] !rounded-full !border-white/40 !text-white hover:!bg-white/10"
                href="/start"
                newTab={false}
              />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}