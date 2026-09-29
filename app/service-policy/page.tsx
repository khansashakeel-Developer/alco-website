import type { Metadata } from 'next';
import Link from 'next/link';
import { BannerType } from '@/type/bannerType';
import programLevel2 from "@/assets/background/program-level-2.webp";
import Banner from '@/component/banner';
import PolicyContent, { PolicyContentType, OFFICIAL_ADDRESS } from '@/component/policy-content';
import { DEFAULT_OG_IMAGE } from '@/utils/buildMetadata';

const PAGE_URL = "https://arslanlarik.com/service-policy";
const TITLE = "Service Policy: Enrolment, Delivery, Certification | AL&CO";
const DESCRIPTION = "How AL&CO delivers its NLP, coaching and hypnosis certification programmes: enrolment, conduct, certificates and schedule changes. Read before enrolling.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: PAGE_URL },
    robots: { index: true, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "AL&CO", locale: "en_PK", type: "website", images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

const bannerData: BannerType = {
    title: {
        line1: "Service Policy",
        align: "text-center mx-auto"
    },
    image: programLevel2.src,
    className: "bg-center bg-cover bg-no-repeat bg-primary",
    children: (
        <>
            <p className='text-sm text-center text-white mt-2'>
                {/* PLEASE CHECK: set the deploy date */}
                Version 2026-1, September 2026 &nbsp;·&nbsp; Governed by the laws of Pakistan, courts at Karachi &nbsp;·&nbsp; Internationally applicable
            </p>
            <p className="text-sm text-center text-white mt-2 font-light">
                This document governs the delivery, scope, and conditions of all services and training programs offered by Arslan Larik & Company.
            </p>
        </>
    )
};

const serviceData: PolicyContentType = {
    sections: [
        {
            label: "Section 01",
            title: "Scope of Services",
            content: (
                <>
                    <p className="text-neutral-600 custom-text1 mb-4">
                        Arslan Larik & Company (hereinafter "AL&CO") provides professional training, coaching, and human development services in Pakistan and internationally. Our offerings include, but are not limited to:
                    </p>
                    <ul className="space-y-2 mb-4">
                        {[
                            "Six levels of live certification training in NLP, coaching and hypnosis, from NLP Practitioner to NLP Master Trainer",
                            "Private one-to-one coaching with Arslan Larik",
                            "A free weekly introductory webinar for people new to AL&CO",
                            "Mentorship and community support for our graduates, including free revisits of the trainings they have completed",
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                                <span className="text-secondary mt-1 flex-shrink-0">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-neutral-500 custom-text1">
                        By enrolling in or purchasing any service from AL&CO, you enter into a binding agreement governed by this Policy and any specific terms communicated at the time of enrollment.
                    </p>
                </>
            ),
        },
        {
            label: "Section 02",
            title: "Enrollment & Registration",
            content: (
                <>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        Enrollment in any AL&CO program is subject to the following conditions, in accordance with the Contract Act, 1872 (Pakistan):
                    </p>
                    <ul className="space-y-2 mb-4">
                        {[
                            "Participants must be at least 14 years of age. A participant aged 14 to 17 may enrol only with the written consent of a parent or guardian, who signs the enrolment agreement on their behalf; they receive a certificate of completion rather than a professional certification, and are protected by our Safe Practice, Safeguarding and Ethics Policies",
                            "Your enrolment is governed by the enrolment agreement you sign with your relationship manager before any payment is made, and is confirmed and locked when AL&CO receives your down payment or any payment towards it (see our Refund and Cooling-Off Policy)",
                            "Seats in programs with limited capacity are allocated on a first-come, first-served basis",
                            "AL&CO reserves the right to refuse enrollment at its discretion without obligation to provide reasons",
                            "Where an employer, sponsor or family member pays your fee, you remain AL&CO's client, and the payer signs a Payer's Acknowledgement",
                            "Participants are responsible for providing accurate and truthful information during registration",
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                                <span className="text-secondary mt-1 flex-shrink-0">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-l-2 border-secondary bg-secondary/5 px-5 py-4 rounded-r-lg">
                        <p className="text-neutral-600 custom-text1 font-medium">
                            Providing false or misleading information during registration may result in immediate cancellation of enrollment without refund.
                        </p>
                    </div>
                </>
            ),
        },
        {
            label: "Section 03",
            title: "Program Delivery",
            content: (
                <>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        All AL&amp;CO certification programmes are delivered live on Zoom and taught personally. Sessions run from 8:00pm to 2:00am Pakistan Standard Time (PKT). Any other format for a specific programme will be confirmed in writing when you enrol.
                    </p>
                    <p className="text-neutral-500 custom-text1">
                        AL&CO reserves the right to change the delivery format of any program due to force majeure, health and safety considerations, trainer unavailability, or other operational reasons. Participants will be notified as early as practicable. Such changes do not automatically entitle participants to a refund unless they constitute a material alteration to the program.
                    </p>
                </>
            ),
        },
        {
            label: "Section 04",
            title: "Certification & Completion Requirements",
            content: (
                <ul className="space-y-2">
                    {[
                        "A minimum attendance of 80% is required for all live programs",
                        "All assessments, assignments, and practical evaluations must be completed and passed",
                        "Digital certificates are issued within 14 business days of program completion",
                        "Physical certificates, where applicable, may take 21 to 30 business days",
                        "Certificates are issued once your fee is paid in full",
                        "AL&CO bears no liability for certificates withheld due to incomplete participant requirements",
                    ].map((item, i) => (
                        <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                            <span className="text-secondary mt-1 flex-shrink-0">•</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            label: "Section 05",
            title: "Participant Conduct",
            content: (
                <>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        Participants are expected to maintain professional and respectful conduct throughout all AL&CO programs. The following conduct is prohibited:
                    </p>
                    <ul className="space-y-2 mb-4">
                        {[
                            "Disruptive, abusive, or threatening behavior toward trainers, staff, or fellow participants",
                            "Unauthorized recording of sessions, whether audio or video, without prior written consent from AL&CO",
                            "Sharing, distributing, or reselling any course materials, content, or recordings",
                            "Impersonation or unauthorized use of another participant's credentials",
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                                <span className="text-secondary mt-1 flex-shrink-0">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-neutral-500 custom-text1">
                        Violation of conduct standards may result in immediate removal from the program without refund. AL&CO reserves the right to pursue legal remedies where applicable, including under the Prevention of Electronic Crimes Act (PECA), 2016, for any digital misconduct.
                    </p>
                    <p className="text-neutral-500 custom-text1 mt-3">
                        All participants, trainers and coaching assistants are also bound by our <Link href="/safeguarding-and-ethics" className="text-secondary underline">Safe Practice, Safeguarding and Ethics Policies</Link>, which explain how to raise a safeguarding concern, a complaint of bullying or harassment, or a whistleblowing concern.
                    </p>
                </>
            ),
        },
        {
            label: "Section 06",
            title: "Schedule Changes & Transfers",
            content: (
                <ul className="space-y-2">
                    {[
                        "AL&CO will provide at least 72 hours' notice of any schedule change where circumstances permit",
                        "Where AL&CO postpones or moves a programme, your enrolment transfers to the next available cohort at no additional cost, or you may take credit of equal value, valid for 12 months; no cash refund arises on a postponement",
                        "Where AL&CO cancels a programme entirely and cannot offer it, or an equivalent, within 12 months, it refunds the fee you have paid in full",
                        "You may move to a later cohort once at no charge if you tell us in writing at least 7 days before the start date; a further move or a later request is at AL&CO's discretion, and moving creates no right to a refund",
                        "Your enrolment is personal to you and may not be transferred, sold or given to anyone else",
                    ].map((item, i) => (
                        <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                            <span className="text-secondary mt-1 flex-shrink-0">•</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            label: "Section 07",
            title: "Intellectual Property",
            content: (
                <>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        All content and materials provided by AL&amp;CO, including course materials, audio recordings, manuals, assessments and proprietary methodologies, are protected under the Copyright Ordinance, 1962 (Pakistan) and applicable international intellectual property conventions.
                    </p>
                    <ul className="space-y-2">
                        {[
                            "Participants receive a limited, personal, non-transferable license to use course materials for individual learning only",
                            "Reproduction, distribution, or commercial use of AL&CO materials is strictly prohibited",
                            "Infringement may result in civil and/or criminal liability under applicable law",
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                                <span className="text-secondary mt-1 flex-shrink-0">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </>
            ),
        },
        {
            label: "Section 08",
            title: "Disclaimer & Limitation of Liability",
            content: (
                <>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        AL&CO's programs are educational and developmental in nature. Individual outcomes vary based on personal effort, circumstances, and factors beyond AL&CO's control.
                    </p>
                    <div className="border-l-2 border-secondary bg-secondary/5 px-5 py-4 rounded-r-lg mb-4">
                        <p className="text-neutral-600 custom-text1 font-medium">
                            AL&CO does not guarantee specific personal, professional, or financial outcomes from participation in any program. Testimonials reflect individual experiences and are not representative of typical results.
                        </p>
                    </div>
                    <p className="text-neutral-500 custom-text1">
                        To the maximum extent permitted under applicable law, AL&CO's total liability to any participant shall not exceed the amount paid for the specific program in question. AL&CO shall not be liable for any indirect, consequential, or incidental damages.
                    </p>
                </>
            ),
        },
        {
            label: "Section 09",
            title: "Governing Law & Dispute Resolution",
            content: (
                <p className="text-neutral-500 custom-text1">
                    This Policy shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. Any dispute not resolved through good-faith negotiation within 30 days shall be referred to the courts of competent jurisdiction in Karachi, Pakistan. For international participants, AL&CO will endeavor to resolve disputes amicably before initiating formal proceedings.
                </p>
            ),
        },
        {
            label: "Section 10",
            title: "Amendments",
            content: (
                <p className="text-neutral-500 custom-text1">
                    AL&CO reserves the right to amend this Service Policy at any time. Updated versions will be published on our official website with a revised effective date. Continued use of our services following any amendment constitutes acceptance of the revised terms.
                </p>
            ),
        },
    ],
    contactCard: {
        title: "Service Inquiries",
        description: "For questions regarding this policy or our programmes, please contact us.",
        email: "connect@arslanlarik.com",
        address: OFFICIAL_ADDRESS,
    },
};

export default function ServicePolicy() {
    return (
        <div>
            <Banner data={bannerData} />
            <PolicyContent data={serviceData} />
        </div>
    );
}