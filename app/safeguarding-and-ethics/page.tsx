import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { BannerType } from "@/type/bannerType";
import programLevel2 from "@/assets/background/program-level-2.webp";
import Banner from "@/component/banner";
import PolicyContent, { PolicyContentType, OFFICIAL_ADDRESS } from "@/component/policy-content";
import { DEFAULT_OG_IMAGE } from "@/utils/buildMetadata";

// PLEASE CHECK (DECISIONS v2 G4): legal review of this whole text is pending. Fill [EFFECTIVE DATE] when it signs off.
// Source: 00 Sources/website-policy.txt (Version 2026-1). Designated Safeguarding Lead = the Master Trainer teaching
// the programme (no personal name); reports to connect@arslanlarik.com; independent routes kept.

const PAGE_URL = "https://arslanlarik.com/safeguarding-and-ethics";
const TITLE = "Safe Practice, Safeguarding and Ethics Policies | AL&CO";
const DESCRIPTION =
    "How AL&CO keeps every participant safe: our safeguarding, anti-bullying, whistleblowing and ethics policies. Read how to raise a concern in confidence.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: PAGE_URL },
    robots: { index: false, follow: true }, // noindex until legal review signs off (G4); switch to index: true and add it to the sitemap and footer then
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: PAGE_URL,
        siteName: "AL&CO",
        locale: "en_PK",
        type: "website",
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

/* ---------- small helpers, same styles as the other policy pages ---------- */
const P = ({ children, last = false }: { children: ReactNode; last?: boolean }) => (
    <p className={`text-neutral-500 custom-text1 ${last ? "" : "mb-3"}`}>{children}</p>
);
const H3 = ({ children }: { children: ReactNode }) => (
    <h3 className="text-neutral-700 font-semibold custom-text1 mt-6 mb-2">{children}</h3>
);
const Bullets = ({ items }: { items: ReactNode[] }) => (
    <ul className="space-y-2 mb-4">
        {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                <span className="text-secondary mt-1 flex-shrink-0">•</span>
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

const bannerData: BannerType = {
    title: {
        line1: "Safe Practice, Safeguarding and Ethics Policies",
        align: "text-center mx-auto",
    },
    image: programLevel2.src,
    className: "bg-center bg-cover bg-no-repeat bg-primary",
    children: (
        <>
            <p className="text-sm text-center text-white mt-2">
                Version 2026-1, September 2026 &nbsp;·&nbsp; Governed by the laws of Pakistan, courts at Karachi
            </p>
            <p className="text-sm text-center text-white mt-2 font-light">
                These policies set out how <Link href="/" className="underline text-secondary">Arslan Larik &amp; Company</Link> keeps participants, clients and staff safe, and how anyone can raise a concern. Every student acknowledges them in their enrolment agreement.
            </p>
        </>
    ),
};

const safeguardingData: PolicyContentType = {
    sections: [
        {
            label: "Section 01",
            title: "Safeguarding Policy",
            content: (
                <>
                    <H3>Purpose</H3>
                    <P>
                        This policy protects people, particularly children, at-risk adults and clients, from harm that may arise from coming into contact with Arslan Larik &amp; Company (&ldquo;AL&amp;CO&rdquo;), its staff or associated personnel. AL&amp;CO trains participants from the age of 14 (with parental or guardian consent), so child safeguarding applies directly to its work. This policy sets out AL&amp;CO&rsquo;s commitments and the responsibilities of its staff and associated personnel, and aligns with the ANLP Code of Ethics.
                    </P>

                    <H3>What safeguarding means</H3>
                    <P>
                        Safeguarding means protecting people&rsquo;s health, wellbeing and rights, and enabling them to live free from harm, abuse and neglect, including harm that arises from contact with AL&amp;CO, its staff, associated personnel, products, services, programmes or activities.
                    </P>

                    <H3>Scope</H3>
                    <P>
                        AL&amp;CO and all staff and associated personnel, whether paid or voluntary, including trainers, coaching assistants, contractors and volunteers, delivering AL&amp;CO programmes and activities.
                    </P>

                    <H3>Policy statement</H3>
                    <P>
                        Everyone AL&amp;CO comes into contact with, regardless of age, gender identity, disability, sexual orientation or ethnic origin, has the right to be protected from all forms of harm, abuse, neglect and exploitation. AL&amp;CO will not tolerate abuse or exploitation of its clients by its staff or associated personnel, and any breach of this policy will result in immediate referral to the relevant authorities for professional or legal action. AL&amp;CO addresses safeguarding through three pillars: prevention, reporting and response.
                    </P>

                    <H3>Prevention: responsibilities of staff and associated personnel</H3>
                    <P>
                        <span className="text-neutral-600 font-medium">Child safeguarding.</span> AL&amp;CO, its staff and associated personnel must not:
                    </P>
                    <Bullets
                        items={[
                            "Engage in any sexual activity with anyone under the age of 18.",
                            "Sexually abuse or exploit a child, or subject a child to physical, emotional or psychological abuse or neglect.",
                        ]}
                    />
                    <P>
                        <span className="text-neutral-600 font-medium">Adult safeguarding.</span> AL&amp;CO, its staff and associated personnel must not abuse or exploit at-risk adults, or subject them to physical, emotional or psychological abuse or neglect.
                    </P>
                    <P>
                        <span className="text-neutral-600 font-medium">Protection from sexual exploitation and abuse.</span> Staff and associated personnel must not exchange money, employment, goods or services for sexual activity, and must not enter sexual relationships with clients, which rest on inherently unequal power dynamics. These duties reinforce the conduct rules in our Enrolment and Coaching Assistant Agreements.
                    </P>

                    <H3>Reporting and response</H3>
                    <Bullets
                        items={[
                            "AL&CO provides safe, accessible means to report a safeguarding concern. Report it immediately to the AL&CO Designated Safeguarding Lead (DSL), whose details are below. You may write in your own words; the DSL can also send you our Safeguarding Incident Report Form.",
                            "Anyone may also report a concern in confidence to ANLP, or directly to the relevant authorities, at any time.",
                            "AL&CO follows up on reports promptly and according to due process, and refers serious concerns to the authorities.",
                            "Because AL&CO delivers online, private messages and unsupervised breakout rooms carry particular safeguarding care, and are governed by the online-conduct rules in our agreements with students and coaching assistants.",
                        ]}
                    />
                    <Callout>
                        <p className="mb-2">
                            Designated Safeguarding Lead: the Master Trainer teaching your programme. Speak to them directly, or report in writing to{" "}
                            <Link href="mailto:connect@arslanlarik.com?subject=Safeguarding" className="text-secondary underline">connect@arslanlarik.com</Link>{" "}
                            with the subject line &ldquo;Safeguarding&rdquo;.
                        </p>
                        <p className="mb-2">
                            Phone and WhatsApp: <Link href="tel:+923360082222" className="text-secondary underline">+92 336 008 2222</Link> (ask for the Designated Safeguarding Lead)
                        </p>
                        <p>
                            If your concern is about the Master Trainer teaching your programme, or you would rather not raise it inside AL&amp;CO, you may go directly to ANLP, the relevant board (ABH-ABNLP) or the authorities, at any time.
                        </p>
                    </Callout>
                </>
            ),
        },
        {
            label: "Section 02",
            title: "Anti-Bullying and Harassment Policy",
            content: (
                <>
                    <H3>Purpose</H3>
                    <P>
                        Bullying and harassment are any unwanted conduct that violates a person&rsquo;s dignity, or that creates an intimidating, hostile, degrading, humiliating or offensive environment, including conduct related to sex, race, national or ethnic origin, age, disability, sexual orientation, gender reassignment, or religion or belief. AL&amp;CO does not tolerate bullying or harassment by or against its staff, contractors, associated personnel or participants, in any programme setting, online or in person. Harassment can also be a criminal offence.
                    </P>

                    <H3>Unacceptable behaviour</H3>
                    <P>
                        Examples (not exhaustive): unwanted physical contact or threats; unwelcome verbal conduct such as advances, propositions, innuendo, offensive jokes or abusive language referring to a person&rsquo;s characteristics; repeated unwanted social suggestions; offensive non-verbal conduct; persistent inappropriate criticism, ridicule or personal abuse; and victimisation of anyone who makes or supports a complaint in good faith.
                    </P>

                    <H3>Raising a complaint</H3>
                    <Bullets
                        items={[
                            <><span className="text-neutral-600 font-medium">Informal:</span> where you feel able, tell the person the behaviour is unwelcome and must stop, or put it in writing, or ask a colleague or management to speak on your behalf.</>,
                            <><span className="text-neutral-600 font-medium">Formal:</span> raise the matter with AL&amp;CO in writing, with as much detail as possible (email <Link href="mailto:connect@arslanlarik.com" className="text-secondary underline">connect@arslanlarik.com</Link>, or write to us at our Karachi address). Your complaint is treated sensitively, seriously and confidentially, and you may be accompanied to any meeting.</>,
                            <><span className="text-neutral-600 font-medium">Investigation:</span> a suitably authorised person not previously involved gathers the facts and gives the other party the opportunity to respond, and provides a written outcome, usually within 10 business days of the meeting.</>,
                            <><span className="text-neutral-600 font-medium">Appeal:</span> you may appeal in writing within 5 business days; a different authorised person considers it, and that decision is final within AL&amp;CO. You may raise the matter with an external authority at any time.</>,
                            "A complaint found to be knowingly false or malicious may itself be referred to the relevant authorities. Where harassment is proven, AL&CO retains the related records for three years.",
                        ]}
                    />
                </>
            ),
        },
        {
            label: "Section 03",
            title: "Whistleblowing Policy",
            content: (
                <>
                    <H3>Purpose and scope</H3>
                    <P>
                        This policy provides a framework for raising serious allegations of illegal or improper conduct. AL&amp;CO is committed to the highest standards of transparency, integrity and accountability, and protects anyone who raises a serious concern in good faith, in the reasonable belief that it is in the public interest, from victimisation, discrimination or disadvantage. It applies to all staff, associates, contractors and clients, and does not replace the Complaints or the Anti-Bullying and Harassment procedures.
                    </P>

                    <H3>What it covers</H3>
                    <P>
                        Allegations including: conduct that is an offence or breach of the law; possible fraud, corruption or financial irregularity; serious health and safety risks; sexual, physical or verbal abuse, bullying or intimidation; abuse of authority; and other unethical conduct.
                    </P>

                    <H3>How to raise an allegation</H3>
                    <Bullets
                        items={[
                            <>Report in writing to AL&amp;CO management, for the attention of Bismillah Pervez, Chief Executive Officer, by email to <Link href="mailto:connect@arslanlarik.com" className="text-secondary underline">connect@arslanlarik.com</Link> with the subject line &ldquo;Confidential: for the attention of the CEO&rdquo;.</>,
                            "Where the concern is about management, or where you would rather not raise it inside AL&CO, report it directly to the relevant board (ANLP or ABH-ABNLP), a regulator-approved professional body, or the authorities.",
                        ]}
                    />

                    <H3>Confidentiality and protection</H3>
                    <Bullets
                        items={[
                            "All allegations are treated in confidence, and AL&CO will make every effort not to reveal your identity without your consent, so far as is legally possible.",
                            "Anonymous allegations are considered at the discretion of the Chief Executive Officer, weighing the seriousness and credibility of the concern.",
                            "No action is taken against a whistle-blower who raises a concern in good faith, even if it is not substantiated. An allegation made maliciously, or for personal gain with no public-interest element, may be actioned.",
                            "On receipt, AL&CO records and acknowledges the allegation, normally within 5 business days, and investigates it.",
                        ]}
                    />
                </>
            ),
        },
        {
            label: "Section 04",
            title: "Code of Professional Ethics",
            content: (
                <>
                    <P>
                        AL&amp;CO, its trainers, coaching assistants and graduates are bound by the codes of ethics of the awarding bodies (ABH, ABNLP, the Time Line Therapy&reg; Association and NGH) and by the ANLP Code of Ethics. In summary, all of them require that a member:
                    </P>
                    <Bullets
                        items={[
                            "Conducts sessions professionally, within a professional setting, and obeys all applicable laws.",
                            "Keeps all matters between practitioner and client confidential, save where the client consents in writing, life is at risk, or the law requires disclosure.",
                            "Does not engage in any sexual or romantic involvement with a client during the professional relationship, and for at least two years after it ends.",
                            "Secures informed consent before any professional relationship, disclosing the nature, purpose and anticipated course of the work.",
                            "Refers on, or terminates, where a referral or another professional would be appropriate, or where the client can no longer benefit.",
                            "Keeps up to date with developments in the field.",
                        ]}
                    />
                    <P last>
                        Where a board&rsquo;s rule is stricter than anything in these policies, the board&rsquo;s rule applies. Full board codes are available on request.
                    </P>
                </>
            ),
        },
        {
            label: "Section 05",
            title: "Contacts and related policies",
            content: (
                <>
                    <P>
                        These policies sit alongside our{" "}
                        <Link href="/privacy-policy" className="text-secondary underline">Privacy Policy</Link>,{" "}
                        <Link href="/service-policy" className="text-secondary underline">Service Policy</Link>,{" "}
                        <Link href="/refund-policy" className="text-secondary underline">Refund Policy</Link> and{" "}
                        <Link href="/terms" className="text-secondary underline">Terms and Conditions</Link>. For anything else, please{" "}
                        <Link href="/contact" className="text-secondary underline">contact us</Link>.
                    </P>
                </>
            ),
        },
    ],
    contactCard: {
        title: "Safeguarding and Conduct Enquiries",
        description: "To raise a concern, speak to the Master Trainer teaching your programme, who is your Designated Safeguarding Lead, or write to us. For questions about these policies, contact us.",
        email: "connect@arslanlarik.com",
        address: OFFICIAL_ADDRESS,
    },
};

export default function SafeguardingAndEthicsPolicy() {
    return (
        <div>
            <Banner data={bannerData} />
            <PolicyContent data={safeguardingData} />
        </div>
    );
}
