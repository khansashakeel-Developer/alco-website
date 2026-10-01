// "use client";
import { Metadata } from "next";
import React from "react";
import Link from "next/link";
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
import CtaButton from "@/component/CtaButton";
import CtaBand from "@/component/CtaBand";
import { CTA, ctaDataAttrs } from "@/component/cta";
import LevelProgramIncludes from "@/component/levelProgramIncludes";
import { LevelProgramIncludesType } from "@/type/levelProgramIncludes";
import LevelProgram1 from "@/assets/level-program-included/program-1.webp"

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

const PrivateCoachingData: ContentSectionType = {
    title: "A full year, alongside one person",
    TagType: "h2",
    textAlign: "text-start",
    description: (
        <div className="text-gray-600 max-w-4xl mx-auto">
            <p className="my-4">Separate from every programme we teach, Arslan takes a very small number of private coaching clients each year, only a handful, by design. This is his most intensive work: a full year alongside one person, for the most complex, high-stakes personal transformations. What makes it rare is the way it is held. Arslan’s own role is coaching, guiding and steering, and where a case calls for expertise beyond coaching, a panel of independent, qualified professionals, which can include psychiatrists, psychologists, psychotherapists and counsellors, is engaged alongside him, each with the client’s consent and proper referral. The result is one window: the client is supported in a single, coordinated place, and never left to run from one professional to another. Every engagement is built as its own framework, underpinned by structured documentation and research, and begins with a personal conversation to establish fit. Places are strictly limited, and the investment is by discussion.</p>
            <p className="my-4 font-semibold">This is Arslan’s own work. Where it serves a case, he brings in members of his team, at his own discretion.</p>
            <h2 className="h4 text-primary font-semibold mt-8">How to apply, and who it is for</h2>
            <p className="my-4">Places are offered entirely at Arslan’s discretion, and subject to his time and availability. If you feel this is for you, write to our official company account, connect@arslanlarik.com, and make your case. Arslan needs full context before he can decide, so the work begins with you: set out your situation, in your own words, as fully as you can, before you submit.</p>
            {/* CTA plan: C7 Apply for private coaching (mailto with subject). */}
            <div className="my-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <CtaButton id="C7" variant="secondary" className="px-6" />
                <span>or write to connect@arslanlarik.com</span>
            </div>
            <h3 className="h5 text-primary font-semibold mt-6">Please read this in the spirit it is meant</h3>
            <p className="my-4">Arslan works with a very specific and specialised few, most often the hardest cases, or those that call for genuine research and documentation, so that the work can stand as a case study and contribute to the literature. The scrutiny is deliberately intense, and if a place is not offered, it is never a judgement of you, and never arrogance. It simply means this particular door was not the right one at this time.</p>
            <h3 className="h5 text-primary font-semibold mt-6">The honest, generous truth</h3>
            <p className="my-4">If you are not in the depths of a real and heavy struggle, Arslan would rather you joined him on the <Link href="/programs" className="underline" {...ctaDataAttrs("C3")}>training adventure</Link> instead. It asks a fraction of the investment of private coaching, you are coached and supported through your own transformation as you go, and, above all, you walk away able to coach others. For most people that is the richer path, and its door is wide open.</p>
        </div>
    ),
    button: { text: "Start with Level 1: NLP Practitioner", link: "/program/nlp-practitioner" },
    padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
    fullBg: "bg-white",
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
    description: (<p className="max-w-4xl mx-auto my-4">Some of what people bring to private coaching touches their health, and coaching never replaces medical care. Arslan’s own role is coaching, guiding and steering. Where a concern is medical or psychological, you continue to work with your medical practitioner, and we work alongside, with proper referral. Where it serves the work, we also coach the family members who support you.</p>),
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

const OneOnOneCoachingData: LevelProgramIncludesType = {
    title: { line1: "Working with Arslan" },
    points: [
        {
            title: "Private coaching with Arslan Larik",
            description: (
                <div className="space-y-3 leading-relaxed">
                    <p className="font-semibold">By application only</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Pakistan’s first Certified Master Trainer of NLP (ABNLP) and of Hypnosis (ABH)</li>
                        <li>ANLP Accredited Master Trainer (UK), and Master Trainer under Robert Dilts at NLP University</li>
                        <li>A full year alongside one person, for the most complex, high-stakes personal transformations</li>
                        <li>A panel of independent, qualified professionals engaged alongside him where a case calls for it, with your consent and proper referral</li>
                        <li>Members of his team brought in at his own discretion, where it serves the case</li>
                        <li>Only a handful of clients each year, at Arslan’s discretion</li>
                    </ul>
                    <p><strong>Length:</strong> A full year</p>
                    <p><strong>Investment:</strong> By discussion</p>
                    <p><strong>How to apply:</strong> <a className="underline" href={CTA.C7.href} {...ctaDataAttrs("C7")}>{CTA.C7.label}</a> (connect@arslanlarik.com)</p>
                </div>
            ),
            theme: "dark",
            image: { src: LevelProgram1, alt: "Arslan Larik, private coaching" },
        },
    ],
    pointsClass: "grid grid-cols-1 max-w-4xl mx-auto gap-4 lg:gap-8 py-2 md:py-4 lg:py-8 xl:py-12",
    textAlign: "text-start",
};

const ContentSectionListData: ContentSectionType = {
    title: "Coaching Methodology",
    TagType: "h2",
    description: (
        <div className="font-outfit">
            <p className="my-4">
                At <strong>Arslan Larik & Company,</strong> we follow a structured yet personalized approach to ensure meaningful outcomes. Sessions are conducted via Zoom, offering flexibility and accessibility for clients worldwide.
            </p>
            <p className="mb-4 text-lg"><strong>How We Work:</strong></p>
            <p><strong className="">Tailored Assessment:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
                <li>Identify your unique challenges, goals, and aspirations.</li>
                <li>Establish clear objectives to guide your coaching journey.</li>
            </ul>
            <p><strong className="">Exploration and Breakthroughs:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
                <li>Uncover deep-rooted beliefs and emotional barriers using advanced NLP,
                    Time Line Therapy® Techniques and hypnosis.</li>
                <li>Gain clarity on patterns and obstacles holding you back</li>
            </ul>
            <p><strong className="">Empowerment and Accountability:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
                <li>Ensure consistent progress through follow-ups and accountability frameworks.</li>
                <li>Foster sustainable strategies for long-term success.</li>
            </ul>
            <p className="mt-4">Private coaching with Arslan is a year-long engagement, built as its own framework, with sessions arranged around your case.</p>
        </div>
    ),
    padding: "py-6 md:py-8 lg:py-12 xl:py-16 ",
    textAlign: "text-start"
}

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
            <ContentSection data={PrivateCoachingData} />
            <ContentSection data={WhatWeAddressList} />
            <LevelProgramIncludes data={OneOnOneCoachingData} />
            <ContentSection data={ContentSectionListData} />
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