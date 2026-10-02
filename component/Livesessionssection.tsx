// ─── Example: how to use LiveSessionCarousel ────────────────────
// Place this in any page or parent component

import LiveSessionCarousel from "@/component/live-session-carousel/liveSessionCarousel"
import { LiveSessionItem } from "@/type/liveSessionType"
// Images
import liveSessionImage from "@/assets/live-session/live-session.webp";
import liveSessionImage1 from "@/assets/live-session/live-session-1.webp";
import liveSessionImage2 from "@/assets/live-session/live-session-2.webp";
import liveSessionImage3 from "@/assets/live-session/live-session-3.webp";
import liveSessionImage4 from "@/assets/live-session/live-session-4.webp";
import liveSessionImage5 from "@/assets/live-session/live-session-5.webp";
import liveSessionImage6 from "@/assets/live-session/live-session-6.webp";
import liveSessionImage7 from "@/assets/live-session/live-session-7.webp";
import liveSessionImage8 from "@/assets/live-session/live-session-8.webp";
import liveSessionImage9 from "@/assets/live-session/live-session-9.webp";
import liveSessionImage10 from "@/assets/live-session/live-session-10.webp";

const liveSessions: LiveSessionItem[] = [
  {
    image: liveSessionImage1,
    alt: "NLP Master Practitioner live session with 60+ participants",
    tag: "NLP Course",
    title: "NLP Master Practitioner: Zoom Session",
    date: "Arslan Larik · March 2025",
    attendees: "60+ Live",
  },
  {
    image: liveSessionImage2,
    alt: "Breakthrough Mindset Workshop live session",
    tag: "Workshop",
    title: "Breakthrough Mindset Workshop",
    date: "AL&CO Team · Feb 2025",
    attendees: "80+ Live",
  },
  {
    image: liveSessionImage3,
    alt: "New batch launch announcement session",
    tag: "Announcement",
    title: "New Batch Launch: NLP Practitioner",
    date: "Arslan Larik · Jan 2025",
    attendees: "120+ Live",
  },
  {
    image: liveSessionImage4,
    alt: "Submodalities deep dive live session",
    tag: "NLP Course",
    title: "Submodalities Deep Dive Session",
    date: "Arslan Larik · Dec 2024",
    attendees: "95+ Live",
  },
  {
    image: liveSessionImage5,
    alt: "Advanced NLP power workshop",
    tag: "Workshop",
    title: "Advanced NLP Power Workshop",
    date: "AL&CO Team · Nov 2024",
    attendees: "150+ Live",
  },
  {
    image: liveSessionImage6,
    alt: "NLP Master Practitioner live session with 60+ participants",
    tag: "NLP Course",
    title: "NLP Master Practitioner: Zoom Session",
    date: "Arslan Larik · March 2025",
    attendees: "60+ Live",
  },
  {
    image: liveSessionImage7,
    alt: "Breakthrough Mindset Workshop live session",
    tag: "Workshop",
    title: "Breakthrough Mindset Workshop",
    date: "AL&CO Team · Feb 2025",
    attendees: "80+ Live",
  },
  {
    image: liveSessionImage8,
    alt: "New batch launch announcement session",
    tag: "Announcement",
    title: "New Batch Launch: NLP Practitioner",
    date: "Arslan Larik · Jan 2025",
    attendees: "120+ Live",
  },
  {
    image: liveSessionImage9,
    alt: "Submodalities deep dive live session",
    tag: "NLP Course",
    title: "Submodalities Deep Dive Session",
    date: "Arslan Larik · Dec 2024",
    attendees: "95+ Live",
  },
  {
    image: liveSessionImage10,
    alt: "Advanced NLP power workshop",
    // tag: "Workshop",
    // title: "Advanced NLP Power Workshop",
    // date: "AL&CO Team · Nov 2024",
    // attendees: "150+ Live",
  },
]

export default function LiveSessionsSection() {
  return (
    <section className="py-6 md:py-8 lg:py-12 xl:py-16 sm:px-4 bg-dark-primary bg-cover bg-top-left w-full ">
      <div className="container mx-auto">

        {/* Header */}
        <div className="container mx-auto px-4">
        <div className="my-8">
          <div className="flex flex-col justify-start col-span-5">
            <span className="text-[#FFD700] w-36 text-xs font-extrabold uppercase tracking-[2.5px] mb-2 border border-yellow-300 rounded-2xl bg-yellow-50/20 drop-shadow-md px-4 py-2">See It Live</span>
            <h2 className="h3 text-white text-start">
              Our Live Sessions
            </h2>
            <p className="custom-text2 font-light text-white text-start mb-8">
               A glimpse into the real, live experiences we create for our students
            </p>
          </div>
        </div>
      </div>

        {/* Carousel */}
        <LiveSessionCarousel
          slides={liveSessions}
          autoplayDelay={1500}          
        />

      </div>
    </section>
  )
}