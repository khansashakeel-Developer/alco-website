import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { BannerType } from "@/type/bannerType";
import programLevel2 from "@/assets/background/program-level-2.webp";
import Banner from "@/component/banner";
import PolicyContent, { PolicyContentType, OFFICIAL_ADDRESS } from "@/component/policy-content";
import { DEFAULT_OG_IMAGE } from "@/utils/buildMetadata";

const PAGE_URL = "https://arslanlarik.com/refund-policy";
const TITLE = "Refund and Cooling-Off Policy for AL&CO Programmes | AL&CO";
const DESCRIPTION =
    "How AL&CO refunds work: the 7-day cooling-off window, what is and is not refundable, how to request a refund and how long it takes. Read before you enrol.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: PAGE_URL },
    robots: { index: true, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "AL&CO", locale: "en_PK", type: "website", images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

/* ---------- small helpers, same styles as the other policy pages ---------- */
const P = ({ children, last = false }: { children: ReactNode; last?: boolean }) => (
    <p className={`text-neutral-500 custom-text1 ${last ? "" : "mb-3"}`}>{children}</p>
);
const Bullets = ({ items, tone = "text-secondary" }: { items: ReactNode[]; tone?: string }) => (
    <ul className="space-y-2 mb-4">
        {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                <span className={`${tone} mt-1 flex-shrink-0`}>•</span>
                <span>{item}</span>
            </li>
        ))}
    </ul>
);
const Callout = ({ children }: { children: ReactNode }) => (
    <div className="border-l-2 border-secondary bg-secondary/5 px-5 py-4 rounded-r-lg my-4">
        <div className="text-neutral-600 custom-text1 font-medium">{children}</div>
    </div>
);
const link = "text-secondary underline";

const bannerData: BannerType = {
    title: {
        line1: "Refund and Cooling-Off Policy",
        align: "text-center mx-auto",
    },
    image: programLevel2.src,
    className: "bg-center bg-cover bg-no-repeat bg-primary",
    children: (
        <>
            <p className="text-sm text-center text-white mt-2">
                {/* PLEASE CHECK: fill [EFFECTIVE DATE] when legal review of the Refund and Cooling-Off Agreement signs off */}
                Version 2026-1, September 2026 &nbsp;·&nbsp; Governed by the laws of Pakistan, courts at Karachi
            </p>
            <p className="text-sm text-center text-white mt-2 font-light">
                This policy explains when a refund is available for an Arslan Larik &amp; Company (AL&amp;CO) programme, what is not refundable, how to ask for a refund, and how long it takes.
            </p>
        </>
    ),
};

const refundData: PolicyContentType = {
    sections: [
        {
            label: "Section 01",
            title: "Your enrolment agreement comes first",
            content: (
                <>
                    <P>
                        This policy applies to every AL&amp;CO programme you enrol on, from Level 1 NLP Practitioner to Level 6 NLP Master Trainer. It sets out the same refund and cooling-off terms that appear in your enrolment agreement, in plain words.
                    </P>
                    <Callout>
                        Your enrolment agreement, signed with your relationship manager, is the deciding document. Please discuss any question about refunds with your relationship manager.
                    </Callout>
                    <P last>
                        Please read this policy together with our{" "}
                        <Link href="/service-policy" className={link}>Service Policy</Link> and{" "}
                        <Link href="/terms" className={link}>Terms and Conditions</Link>. Nothing said in conversation, in a message or on social media changes these terms; any special arrangement counts only if it is written on your enrolment agreement or your invoice.
                    </P>
                </>
            ),
        },
        {
            label: "Section 02",
            title: "Your 7-day cooling-off window",
            content: (
                <>
                    <P>
                        When you enrol, AL&amp;CO prepares your joining pack and manual and reserves the trainer and your place for your dates, so that cost begins the moment your enrolment is confirmed. That is why there is one clear window in which you may change your mind.
                    </P>
                    <Callout>
                        If you enrol 7 or more calendar days before your batch start date, you may cancel in writing up to 7 calendar days before the start date and receive a full refund of the fee you have paid.
                    </Callout>
                    <P last>
                        Your cancellation must reach us in writing, by email to{" "}
                        <Link href="mailto:connect@arslanlarik.com" className={link}>connect@arslanlarik.com</Link>, and should tell us your reason (Section 07). Once the cooling-off window has closed, or once your programme has commenced (Section 03), no refund arises.
                    </P>
                </>
            ),
        },
        {
            label: "Section 03",
            title: "When your programme “commences”",
            content: (
                <>
                    <P>
                        Your programme is treated as having commenced on the earlier of:
                    </P>
                    <Bullets
                        items={[
                            "the release of your learning materials or learning portal credentials to you, or",
                            "your attendance at the first session.",
                        ]}
                    />
                    <P last>
                        There is no trial by attendance. Attending the first day, or the first hour, and then deciding whether to continue is not available to anyone. AL&amp;CO offers no trial, taster or observer attendance. If you would like to see how we teach before you decide, join our{" "}
                        <Link href="/free-webinar" className={link}>free weekly webinar</Link> for people new to AL&amp;CO.
                    </P>
                </>
            ),
        },
        {
            label: "Section 04",
            title: "If you enrol close to the start date",
            content: (
                <P last>
                    If you enrol within 7 calendar days of your batch start date, or after the programme has commenced, the cooling-off refund does not apply to you, and your fee is non-refundable from enrolment, because your materials are already being prepared. Your relationship manager will ask you to confirm this in writing when you enrol.
                </P>
            ),
        },
        {
            label: "Section 05",
            title: "What is refundable, and what is not",
            content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-green-200 bg-green-50/50 px-5 py-5">
                        <p className="text-xs font-semibold tracking-widest uppercase text-green-700 mb-4">Refundable</p>
                        <Bullets
                            tone="text-green-600"
                            items={[
                                "A cancellation made in writing 7 or more calendar days before the batch start date (your cooling-off window).",
                                "A duplicate payment or an overpayment.",
                                "A programme AL&CO cancels entirely and cannot offer, or offer an equivalent of, within 12 months (see Section 06).",
                            ]}
                        />
                    </div>
                    <div className="rounded-xl border border-red-200 bg-red-50/50 px-5 py-5">
                        <p className="text-xs font-semibold tracking-widest uppercase text-red-600 mb-4">Not refundable</p>
                        <Bullets
                            tone="text-red-500"
                            items={[
                                "A change of mind after your cooling-off window has closed, or once the programme has commenced.",
                                "Not attending, or attending part of the programme and deciding not to continue. There is no trial by attendance.",
                                "Being required to leave for conduct, under the Enrolment Agreement.",
                                "An assessment that has not yet passed; you may re-take it at no cost until it does.",
                            ]}
                        />
                    </div>
                </div>
            ),
        },
        {
            label: "Section 06",
            title: "If AL&CO postpones or cancels, or you move to a later cohort",
            content: (
                <>
                    <P>
                        <span className="text-neutral-600 font-medium">If AL&amp;CO postpones or reschedules.</span> AL&amp;CO reschedules; it does not cancel. Where AL&amp;CO postpones or moves a programme, your enrolment transfers to the next available cohort at no additional cost, or you may take credit of equal value, valid for 12 months. No cash refund arises on a postponement.
                    </P>
                    <P>
                        <span className="text-neutral-600 font-medium">If AL&amp;CO cancels.</span> Where AL&amp;CO cancels a programme entirely and cannot offer it, or an equivalent, within 12 months, it refunds the fee you have paid in full.
                    </P>
                    <P>
                        <span className="text-neutral-600 font-medium">If you need to move to a later cohort.</span> You may move to a later cohort once at no charge, provided you tell us in writing at least 7 days before the start date. A further move, or a later request, is at AL&amp;CO&apos;s discretion. Moving does not change your payment schedule and does not create a right to a refund.
                    </P>
                    <P last>
                        <span className="text-neutral-600 font-medium">If you do not attend.</span> Your enrolment remains valid for 12 months, and you may join any cohort of the same programme within that time. After 12 months it lapses. Not attending never creates a refund.
                    </P>
                </>
            ),
        },
        {
            label: "Section 07",
            title: "How to request a refund, and how long it takes",
            content: (
                <>
                    <P>To request a refund:</P>
                    <ol className="list-decimal pl-5 space-y-2 mb-4 text-neutral-500 custom-text1">
                        <li>
                            Email <Link href="mailto:connect@arslanlarik.com" className={link}>connect@arslanlarik.com</Link> with the subject line &ldquo;Refund request&rdquo;, and let your relationship manager know.
                        </li>
                        <li>
                            Include your full name, your programme and batch, your enrolment reference, your payment reference, and the reason for your request.
                        </li>
                        <li>
                            For a cooling-off cancellation, your email must reach us 7 or more calendar days before your batch start date. The date we receive your email is the date that counts.
                        </li>
                    </ol>
                    <P>Once we have your written request:</P>
                    <Bullets
                        items={[
                            <><span className="text-neutral-600 font-medium">Decision:</span> we review and tell you our decision within 5 to 7 business days of receiving your written request.</>,
                            <><span className="text-neutral-600 font-medium">Payment of an approved refund:</span> we release it within 3 business days of approval.</>,
                            <><span className="text-neutral-600 font-medium">Reaching your account:</span> where you paid by card through our payment gateway, your bank typically credits it within 7 to 14 business days, depending on your issuing bank.</>,
                        ]}
                    />
                    <P last>
                        If you have a concern about a payment, please write to us before raising a dispute with your bank, so that we can resolve it quickly. You can also reach us through our{" "}
                        <Link href="/contact" className={link}>contact page</Link>.
                    </P>
                </>
            ),
        },
        {
            label: "Section 08",
            title: "How a refund is paid",
            content: (
                <>
                    <Bullets
                        items={[
                            "An approved refund is paid to the account the fee came from: back to the same card where you paid by card through our payment gateway, or by bank transfer to the paying account where you paid by bank transfer or cheque.",
                            "It is paid in Pakistani Rupees, the currency of your invoice, for the amount you actually paid.",
                            "Where someone else paid your fee, such as a family member, an employer or a sponsor, you remain AL&CO's client. Only you (or, for a participant under 18, the parent or guardian who signed the enrolment agreement) may request a refund, and any refund due is paid to the account the fee came from.",
                        ]}
                    />
                </>
            ),
        },
        {
            label: "Section 09",
            title: "Questions, concerns and complaints",
            content: (
                <>
                    <P>
                        If you disagree with a refund decision, or have any other concern, tell us first and early, in writing to{" "}
                        <Link href="mailto:connect@arslanlarik.com" className={link}>connect@arslanlarik.com</Link>, marked for management. We acknowledge within 2 business days and give a full answer within 10 business days.
                    </P>
                    <P last>
                        Nothing here prevents you from contacting an awarding body or any authority at any time, and doing so in good faith will never count against you. For concerns about safety, conduct, bullying or harassment, please see our{" "}
                        <Link href="/safeguarding-and-ethics" className={link}>Safe Practice, Safeguarding and Ethics Policies</Link>.
                    </P>
                </>
            ),
        },
        {
            label: "Section 10",
            title: "Governing law",
            content: (
                <P last>
                    This policy is governed by the laws of the Islamic Republic of Pakistan, and the courts at Karachi have exclusive jurisdiction over any dispute arising from it. Nothing in this policy excludes any right you have that cannot be excluded by law.
                </P>
            ),
        },
    ],
    contactCard: {
        title: "Request a Refund",
        description:
            "Write to us with your full name, programme and batch, enrolment reference, payment reference and your reason. You will have our decision within 5 to 7 business days.",
        email: "connect@arslanlarik.com",
        address: OFFICIAL_ADDRESS,
    },
};

export default function RefundPolicy() {
    return (
        <div>
            <Banner data={bannerData} />
            <PolicyContent data={refundData} />
        </div>
    );
}
