import Link from "next/link";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp
} from "react-icons/fa";
import Logo from "@/assets/logo-white.webp";
import Image from "next/image";

const quickLinks = [
  { name: "Home", link: "/" },
  { name: "Blogs", link: "/blogs" },
  { name: "Contact", link: "/contact" },
  { name: "Refund Policy", link: "/refund-policy" },
  { name: "Service Policy", link: "/service-policy" },
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Terms & Conditions", link: "/terms" },
  { name: "Safeguarding & Ethics", link: "/safeguarding-and-ethics" },
];

const usefulLinks = [
  { name: "All Programmes", link: "/programs" },
  { name: "Free Weekly Webinar", link: "/free-webinar" },
  { name: "Resource", link: "/services/resources" },
  { name: "Four Clouds Model", link: "/services/four-clouds-model" },
  { name: "Who is Arslan Larik", link: "/about-us/who-is-arslan-larik" },
  { name: "Who is Bismillah Pervez", link: "/about-us/who-is-bismillah-pervez" },
  { name: "Why Train With AL&CO", link: "/about-us/why-train-with-alco" },
  { name: "Our Mission, Vision & Core Values", link: "/our-mission" },
];

// D8: +92 336 008 2222 is the only linked number. The +1 (206) number is
// display-only for US and Canada callers: never a tel: or wa.me link.
type ContactItem = { icon?: React.ReactNode; name: string; href?: string; className?: string };
const ContactDetails: ContactItem[] = [
  // Phone item: change name only
{ icon: <FiPhone />, name: "Pakistan: +92 336 008 2222", href: "tel:+923360082222" },

// US item: leave as is
{ name: "International: +1 (206) 614 0234" },

// WhatsApp item: change name only
  { icon: <FaWhatsapp />, name: "WhatsApp: +92 336 008 2222", href: "https://wa.me/923360082222" },
  { icon: <FiMail />, name: "connect@arslanlarik.com", href: "mailto:connect@arslanlarik.com" },
  { icon: <FiMapPin />, name: "D86/1, Gulshan-e-Iqbal, Block 7, Karachi, 75300, Sindh, Pakistan" },
];

const socialLinks = [
  { icon: <FaFacebookF />, link: "https://www.facebook.com/arslanlariknlp/", label: "Facebook" },
  { icon: <FaInstagram />, link: "https://www.instagram.com/arslanlariknlp/", label: "Instagram" },
  { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/company/arslanlarikco/", label: "LinkedIn" },
  { icon: <FaYoutube />, link: "https://www.youtube.com/channel/UCEwzXP7OMPUvxFgTr2H5p_w/videos", label: "YouTube" },
  { icon: <FaWhatsapp />, link: "https://wa.me/923360082222", label: "WhatsApp +92 336 008 2222" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-dark-primary-to-light bg-top-left bg-cover w-full" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo and tagline */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src={Logo} alt="Arslan Larik & Company Logo" className="h-10 md:h-11 xl:h-12 2xl:h-20  w-auto" priority />
            </Link>
            <p className="text-white/70 text-xs mt-3 leading-snug">
              Center for Human Brilliance and<br />
              Behavioral Reengineering
            </p>
            <p className="text-white/90 text-sm mt-3 leading-snug max-w-[240px]">
              World-class NLP, hypnosis and coaching certification, taught live.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="footer-heading-font mb-4 text-white">Quick Links</p>
            <ul className="footer-menu-font text-white space-y-2">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.link} className="hover:text-secondary">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <p className="footer-heading-font mb-4 text-white">Useful Links</p>
            <ul className="footer-menu-font text-white space-y-2">
              {usefulLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.link} className="hover:text-secondary">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <p className="footer-heading-font mb-4 text-white">Contact Details</p>
            <ul className="footer-menu-font text-white space-y-2">
              {ContactDetails.map((item, index) => (
                <li key={index} className="flex gap-2 ">
                  <div className="h-4 w-4  mt-1">{item.icon}</div>
                  <div className={item.className}>
                    {item.href ? (
                      <Link href={item.href} aria-label={item.name} className="hover:text-secondary">
                        {item.name}
                      </Link>
                    ) : (
                      item.name
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-6 border-default sm:mx-auto lg:my-8" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="footer-menu-font text-white sm:text-center">
            © {new Date().getFullYear()} Arslan Larik & Company (AL&CO). All rights reserved.
          </span>
          <div className="flex mt-4 sm:mt-0 sm:justify-center gap-3">
            {socialLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                aria-label={item.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:text-secondary transition-transform duration-300 hover:-translate-y-1 hover:opacity-90"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* DECISIONS v2 P5: no trademark attribution line. The ® on "Time Line Therapy® Techniques" carries it. */}
      </div>
    </footer>
  );
}
