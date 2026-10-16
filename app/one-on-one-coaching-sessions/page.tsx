import { Metadata } from "next";
import React from "react";
import { fallbackMetadata } from "@/utils/buildMetadata";
import programLevel2 from "@/assets/background/program-level-2.webp";
import Banner from "@/component/banner";
import { BannerType } from "@/type/bannerType";
import OneOnOneCoachingSessionsImg1 from "@/assets/sessions/session1.svg";
import OneOnOneCoachingSessionsImg2 from "@/assets/sessions/session2.svg";
import OneOnOneCoachingSessionsImg3 from "@/assets/sessions/session3.svg";
import OneOnOneCoachingSessionsImg4 from "@/assets/sessions/session4.svg";
import OneOnOneCoachingSessionsImg5 from "@/assets/sessions/session5.svg";
import OneOnOneCoachingSessionsImg6 from "@/assets/sessions/session6.svg";
import OneOnOneCoachingSessionsImg7 from "@/assets/sessions/session7.svg";
import OneOnOneCoachingSessionsImg8 from "@/assets/sessions/session8.svg";
import OneOnOneCoachingSessionsImg9 from "@/assets/sessions/session9.svg";
import OneOnOneCoachingSessionsImg10 from "@/assets/sessions/session10.svg";
import OneOnOneCoachingSessionsImg11 from "@/assets/sessions/session11.svg";
import OneOnOneCoachingSessionsImg12 from "@/assets/sessions/session12.svg";
import OneOnOneCoachingSessionsImg13 from "@/assets/sessions/session13.svg";
import OneOnOneCoachingSessionsImg14 from "@/assets/sessions/session14.svg";
import OneOnOneCoachingSessionsImg15 from "@/assets/sessions/session15.svg";
import CtaBand from "@/component/CtaBand";
import CtaButton from "@/component/CtaButton";
import {
  CoachingFacts,
  CoachingStory,
  CoachingApply,
  CoachingAddress,
  CoachingMethod,
  type AddressItem,
} from "@/component/coaching/CoachingExperience";

// DECISIONS v2 G1: this page is exclusive to Arslan Larik. No session prices, no other coach cards.
// G2: sensitive tiles stay, each framed as working alongside the person's medical practitioner, with proper referral.
const bannerData: BannerType = {
  title: {
    line1: "Private Coaching with Arslan Larik",
    align: "text-center mx-auto ",
  },
  image: programLevel2.src,
  bgVideo: "/videos/private-coaching.mp4",
  className: "bg-center bg-cover bg-no-repeat bg-primary",
};

const ADDRESS_NOTE =
  "Some of what people bring to private coaching touches their health, and coaching never replaces medical care. Arslan’s own role is coaching, guiding and steering. Where a concern is medical or psychological, you continue to work with your medical practitioner, and we work alongside, with proper referral. Where it serves the work, we also coach the family members who support you.";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const item = (title: string, img: any, text: string): AddressItem => ({ title, src: img.src, text });

const ADDRESS: AddressItem[] = [
  item("Chronic procrastination and unproductive habits", OneOnOneCoachingSessionsImg1, "We work with you to find what the delay has been protecting, then build strategies for action, so that momentum becomes your habit."),
  item("Persistent overthinking and anxiety", OneOnOneCoachingSessionsImg2, "Where anxiety is part of the picture, you continue to work with your medical practitioner, and we work alongside, with proper referral, coaching you, and the family members who support you, towards a calmer and clearer way of thinking."),
  item("Unmanageable stress and frequent anger outbursts", OneOnOneCoachingSessionsImg3, "We work with you to notice what sets the emotion running, and to build the state control that returns the choice to you. Where stress or anger is affecting your health, your medical practitioner leads your care, and we coach alongside, with proper referral, including the family members who support you."),
  item("Deep emotional sadness and lingering guilt", OneOnOneCoachingSessionsImg4, "Sadness and guilt are part of being human. When they gather and begin to run you, we work with you to release them and keep the learning. Where low mood persists, you work with your medical practitioner, and we work alongside, with proper referral, coaching you and the family members who support you."),
  item("Fear of failure and rejection", OneOnOneCoachingSessionsImg5, "We work with you on the beliefs beneath the fear, so that failure becomes feedback and rejection loses its grip."),
  item("Inner self-doubt and low self-confidence", OneOnOneCoachingSessionsImg6, "Limiting beliefs are dissolved at the root and empowering ones put in their place, so you act from confidence rather than doubt."),
  item("Career stagnation and lack of direction", OneOnOneCoachingSessionsImg7, "We work with you to bring your values and your goals into line, so you can choose one road, commit to it, and move."),
  item("Emotional burnout and unresolved past trauma", OneOnOneCoachingSessionsImg8, "Where someone carries trauma or burnout, they work with their medical practitioner, and we work alongside, with proper referral, coaching them, and the family members who support them, towards renewed energy and a future they choose."),
  item("Pain from betrayal and loneliness", OneOnOneCoachingSessionsImg9, "We hold space while you release the hurt of the past and rebuild trust, in yourself and in the people you choose to let close."),
  item("Behavioral changes and habit formation", OneOnOneCoachingSessionsImg10, "We work with you to model the behaviour you want and install it at the unconscious level, so the new habit runs on its own."),
  item("Feeling emotionally hurt", OneOnOneCoachingSessionsImg11, "We work with you to release the hurt and keep the learning, so the past informs you rather than runs you."),
  item("Goal alignment", OneOnOneCoachingSessionsImg12, "We bring your goals and your values into alignment, resolving the inner conflict that pulls you in two directions."),
  item("Addiction challenges", OneOnOneCoachingSessionsImg13, "Where someone is in recovery, for example from alcohol, they work with their medical practitioner, and we work alongside, with proper referral, coaching them and the family members who support them."),
  item("Weight management challenges", OneOnOneCoachingSessionsImg14, "Where weight is connected to health, you work with your medical practitioner, and we work alongside, with proper referral, coaching you, and the family members who support you, on the beliefs, emotions and habits around food and movement."),
  item("Time management challenges", OneOnOneCoachingSessionsImg15, "We work with you on priorities, focus and the inner conflicts that scatter your time, so your days serve what matters most to you."),
];

export async function generateMetadata(): Promise<Metadata> {
  return fallbackMetadata(
    "Private Coaching with Arslan Larik | One-on-One | AL&CO",
    "/one-on-one-coaching-sessions",
    "Private one-on-one coaching with Arslan Larik: a full year, a handful of clients, backed by a professional panel. Write to us and make your case today."
  );
}

export default async function OneOnOneCoachingSessions() {
  // D 04 B: structured data is the global Organization only (no offers or prices, 25 Sep 2026 ruling).
  return (
    <>
      <Banner data={bannerData} />
      <CoachingFacts />
      <CoachingStory />
      <CoachingApply
        applyButton={<CtaButton id="C7" variant="secondary" className="px-6" />}
        startButton={<CtaButton id="C9" label="Start with Level 1: NLP Practitioner" href="/program/nlp-practitioner" variant="secondary" />}
      />
      <CoachingAddress items={ADDRESS} note={ADDRESS_NOTE} />
      <CoachingMethod />
      {/* Closing band (CTA plan): private coaching is BoFu (selective). Primary C7, secondary C2. */}
      <CtaBand
        title="If This Is for You, Make Your Case"
        text="Write to us and set out your situation as fully as you can. If you are still exploring, the training path may be the richer route: start with a free webinar."
        primary={{ id: "C7" }}
        secondary={{ id: "C2" }}
      />
    </>
  );
}