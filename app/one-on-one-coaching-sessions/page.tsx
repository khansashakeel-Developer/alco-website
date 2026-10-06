// "use client";
import { Metadata } from "next";
import React from "react";
import { buildMetadata, fallbackMetadata } from "@/utils/buildMetadata";
import programLevel2 from "@/assets/background/program-level-2.webp"
import Banner from "@/component/banner";
import { BannerType } from "@/type/bannerType";
import { ContentSectionType } from "@/type/contentSection";
import OneOnOneCoachingSessionsImg1 from "@/assets/sessions/session1.svg"
import OneOnOneCoachingSessionsImg2 from "@/assets/sessions/session2.svg"
import OneOnOneCoachingSessionsImg3 from "@/assets/sessions/session3.svg"
import OneOnOneCoachingSessionsImg4 from "@/assets/sessions/session4.svg"
import OneOnOneCoachingSessionsImg5 from "@/assets/sessions/session5.svg"
import OneOnOneCoachingSessionsImg6 from "@/assets/sessions/session6.svg"
import OneOnOneCoachingSessionsImg7 from "@/assets/sessions/session7.svg"
import OneOnOneCoachingSessionsImg8 from "@/assets/sessions/session8.svg"
import OneOnOneCoachingSessionsImg9 from "@/assets/sessions/session9.svg"
import OneOnOneCoachingSessionsImg10 from "@/assets/sessions/session10.svg"
import OneOnOneCoachingSessionsImg11 from "@/assets/sessions/session11.svg"
import OneOnOneCoachingSessionsImg12 from "@/assets/sessions/session12.svg"
import OneOnOneCoachingSessionsImg13 from "@/assets/sessions/session13.svg"
import OneOnOneCoachingSessionsImg14 from "@/assets/sessions/session14.svg"
import OneOnOneCoachingSessionsImg15 from "@/assets/sessions/session15.svg"
import ContentSection from "@/component/contentSection";
import CtaBand from "@/component/CtaBand";
import Reveal from "@/component/Reveal";
import { CoachingKeyFacts, CoachingIntro, CoachingHowToApply, CoachingMethodology } from "@/component/coaching/PrivateCoachingSections";

// DECISIONS v2 G1: this page is exclusive to Arslan Larik. No session prices, no other coach cards.
// G2: sensitive tiles stay, each framed as working alongside the person's medical practitioner, with proper referral.
const bannerData: BannerType = {
    title: {
        line1: "Private Coaching with Arslan Larik",
        align: "text-center mx-auto "
    },
    image: programLevel2.src,
    className: "bg-center bg-cover bg-no-repeat bg-primary"
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tile = (title: string, img: any, text: string) => ({
    title,
    TagType: "h3" as React.ElementType,
    height: "h-40",
    position: "object-contain",
    src: img.src,
    alt: title,
    description: (<p className="text-sm mt-2 px-2">{text}</p>),
});

const WhatWeAddressList: ContentSectionType = {
    title: "What We Address",
    TagType: "h2",
    description: (
        <div className="max-w-4xl mx-auto my-4 flex gap-3 text-start rounded-xl border-l-4 border-secondary bg-white p-4 shadow-sm">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 h-6 w-6 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.6-9.2-9.1C1.3 8.6 3.2 5 6.6 5c2 0 3.3 1.1 5.4 3.2C14.1 6.1 15.4 5 17.4 5c3.4 0 5.3 3.6 3.8 6.9C19 16.4 12 21 12 21z" /></svg>
            <p className="font-outfit text-base text-gray-700">Some of what people bring to private coaching touches their health, and coaching never replaces medical care. Arslan’s own role is coaching, guiding and steering. Where a concern is medical or psychological, you continue to work with your medical practitioner, and we work alongside, with proper referral. Where it serves the work, we also coach the family members who support you.</p>
        </div>
    ),
    contentlist: [
        tile("Chronic procrastination and unproductive habits", OneOnOneCoachingSessionsImg1, "We work with you to find what the delay has been protecting, then build strategies for action, so that momentum becomes your habit."),
        tile("Persistent overthinking and anxiety", OneOnOneCoachingSessionsImg2, "Where anxiety is part of the picture, you continue to work with your medical practitioner, and we work alongside, with proper referral, coaching you, and the family members who support you, towards a calmer and clearer way of thinking."),
        tile("Unmanageable stress and frequent anger outbursts", OneOnOneCoachingSessionsImg3, "We work with you to notice what sets the emotion running, and to build the state control that returns the choice to you. Where stress or anger is affecting your health, your medical practitioner leads your care, and we coach alongside, with proper referral, including the family members who support you."),
        tile("Deep emotional sadness and lingering guilt", OneOnOneCoachingSessionsImg4, "Sadness and guilt are part of being human. When they gather and begin to run you, we work with you to release them and keep the learning. Where low mood persists, you work with your medical practitioner, and we work alongside, with proper referral, coaching you and the family members who support you."),
        tile("Fear of failure and rejection", OneOnOneCoachingSessionsImg5, "We work with you on the beliefs beneath the fear, so that failure becomes feedback and rejection loses its grip."),
        tile("Inner self-doubt and low self-confidence", OneOnOneCoachingSessionsImg6, "Limiting beliefs are dissolved at the root and empowering ones put in their place, so you act from confidence rather than doubt."),
        tile("Career stagnation and lack of direction", OneOnOneCoachingSessionsImg7, "We work with you to bring your values and your goals into line, so you can choose one road, commit to it, and move."),
        tile("Emotional burnout and unresolved past trauma", OneOnOneCoachingSessionsImg8, "Where someone carries trauma or burnout, they work with their medical practitioner, and we work alongside, with proper referral, coaching them, and the family members who support them, towards renewed energy and a future they choose."),
        tile("Pain from betrayal and loneliness", OneOnOneCoachingSessionsImg9, "We hold space while you release the hurt of the past and rebuild trust, in yourself and in the people you choose to let close."),
        tile("Behavioral changes and habit formation", OneOnOneCoachingSessionsImg10, "We work with you to model the behaviour you want and install it at the unconscious level, so the new habit runs on its own."),
        tile("Feeling emotionally hurt", OneOnOneCoachingSessionsImg11, "We work with you to release the hurt and keep the learning, so the past informs you rather than runs you."),
        tile("Goal alignment", OneOnOneCoachingSessionsImg12, "We bring your goals and your values into alignment, resolving the inner conflict that pulls you in two directions."),
        tile("Addiction challenges", OneOnOneCoachingSessionsImg13, "Where someone is in recovery, for example from alcohol, they work with their medical practitioner, and we work alongside, with proper referral, coaching them and the family members who support them."),
        tile("Weight management challenges", OneOnOneCoachingSessionsImg14, "Where weight is connected to health, you work with your medical practitioner, and we work alongside, with proper referral, coaching you, and the family members who support you, on the beliefs, emotions and habits around food and movement."),
        tile("Time management challenges", OneOnOneCoachingSessionsImg15, "We work with you on priorities, focus and the inner conflicts that scatter your time, so your days serve what matters most to you."),
    ],
    fullBg: "bg-neutral-100",
    padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
    contentlisItemClass: "w-full sm:w-[48%] lg:w-[23%] rounded-xl bg-primary/10 backdrop-blur-sm py-6 px-4",
    contentlistClass: "flex flex-wrap justify-center gap-4 max-w-6xl mx-auto pt-6 md:pt-8 lg:pt-12 xl:pt-16",
    contentlistTitle: "text-lg font-semibold text-center text-primary min-h-12 px-4 mt-4",
};

async function getSeoData() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/seo/page/one-on-one-coaching-sessions`,
            { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) }
        );
        if (!res.ok) return null;
        const { data } = await res.json();
        return data;
    } catch {
        return null;
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const data = await getSeoData();
    return fallbackMetadata(
            "Private Coaching with Arslan Larik | One-on-One | AL&CO",
            "/one-on-one-coaching-sessions",
            "Private one-on-one coaching with Arslan Larik: a full year, a handful of clients, backed by a professional panel. Write to us and make your case today."
        );
}

export default async function OneOnOneCoachingSessions() {
    // D 04 B: structured data is the global Organization only. The CMS `structuredData` injection was removed,
    // because the old record may carry offers or prices (no prices anywhere, 25 Sep 2026 ruling).
    return (
        <>
            <Banner data={bannerData} />
            <CoachingKeyFacts />
            <CoachingIntro />
            <Reveal><CoachingHowToApply /></Reveal>
            <ContentSection data={WhatWeAddressList} />
            <Reveal><CoachingMethodology /></Reveal>
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