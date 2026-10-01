
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

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="Arslan Larik & Company (AL&CO) logo"
              className="h-10 md:h-11 xl:h-12 2xl:h-13  w-auto"
              priority
            />
          </Link>

          {/* Desktop Menu */}
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

                    {/* Desktop Dropdown: always in the HTML so crawlers see the links; shown on hover */}
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

          {/* Desktop Buttons */}
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
              iconRight={false} text="GET 1-1 COACHING" variant="outlinePrimary" className="header-menu-button px-[12px]" href="/one-on-one-coaching-sessions" newTab={false} />
          </div>

          {/* Mobile Toggle */}
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

        {/* Mobile Menu: always rendered so links are in the HTML; hidden with CSS */}
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

            {/* Mobile Buttons */}
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
                iconRight={false} text="GET 1-1 COACHING" variant="outlinePrimary" className="header-menu-button px-[12px] min-w-[160px]" href="/one-on-one-coaching-sessions" newTab={false} />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
