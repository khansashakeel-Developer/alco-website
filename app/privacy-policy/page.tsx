import type { Metadata } from 'next';
import { BannerType } from '@/type/bannerType';
import programLevel2 from "@/assets/background/program-level-2.webp";
import Banner from '@/component/banner';
import Link from 'next/link';
import PolicyContent, { PolicyContentType, OFFICIAL_ADDRESS } from '@/component/policy-content';
import { DEFAULT_OG_IMAGE } from '@/utils/buildMetadata';

const PAGE_URL = "https://arslanlarik.com/privacy-policy";
const TITLE = "Privacy Policy: How AL&CO Protects Your Personal Data";
const DESCRIPTION = "How Arslan Larik & Company collects, uses, stores and protects your personal data, and how to exercise your rights. Write to us with any privacy request.";

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
        line1: "Privacy Policy",
        align: "text-center mx-auto"
    },
    image: programLevel2.src,
    className: "bg-center bg-cover bg-no-repeat bg-primary",
    children: (
        <>
            <p className='text-sm text-center text-white mt-2'>
                {/* PLEASE CHECK: set the deploy date */}
                Version 2026-1, September 2026 &nbsp;·&nbsp; PECA 2016 compliant &nbsp;·&nbsp; GDPR-aligned &nbsp;·&nbsp; Governed by the laws of Pakistan, courts at Karachi
            </p>
            <p className="text-sm text-center text-white mt-2 font-light">
                At <Link href='/' className='underline text-secondary'>Arslan Larik & Company,</Link> we respect your privacy and are committed to protecting your personal data.
            </p>
        </>
    )
};

const privacyData: PolicyContentType = {
    sections: [
        {
            label: "Section 01",
            title: "Introduction & Scope",
            content: (
                <>
                    <p className="text-neutral-600 custom-text1 mb-3">
                        {/* PLEASE CHECK (E 02 E.1): Dubai is not in the brochure. Keep or remove? */}
                        Arslan Larik &amp; Company (AL&amp;CO) operates from D86/1, Gulshan-e-Iqbal, Block 7, Karachi, 75300, Sindh, Pakistan, with activities in Dubai, UAE. This Privacy Policy applies to all personal data collected through our website, registration processes, online platform, and the delivery of our services.
                    </p>
                    <p className="text-neutral-600 custom-text1 mb-3">
                        This Policy is established in compliance with the Prevention of Electronic Crimes Act (PECA), 2016, the Electronic Transactions Ordinance 2002, and is aligned with internationally recognized data protection standards including the General Data Protection Regulation (GDPR) where applicable.
                    </p>
                    <p className="text-neutral-600 custom-text1">
                        By using our website or registering for any AL&CO service, you consent to the data practices described in this policy.
                    </p>
                </>
            ),
        },
        {
            label: "Section 02",
            title: "Information We Collect",
            content: (
                <>
                    <p className="text-neutral-600 custom-text1 mb-4">
                        We collect only the personal information necessary for the purposes outlined in this policy:
                    </p>
                    <div className="overflow-x-auto rounded-lg border border-primary/10 mb-4">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-primary/5 border-b border-primary/10">
                                    <th className="text-left px-4 py-3 text-neutral-600 font-semibold">Category</th>
                                    <th className="text-left px-4 py-3 text-neutral-600 font-semibold">Examples</th>
                                    <th className="text-left px-4 py-3 text-neutral-600 font-semibold">How Collected</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Identity Data", "Full name, date of birth, gender", "Registration and enrollment forms"],
                                    ["Contact Data", "Email address, phone number, city, country", "Registration, contact and inquiry forms"],
                                    ["Webinar Registration", "Name, email address, phone or WhatsApp number, city or country, and any answers you give on the sign-up form", "Our free webinar sign-up page"],
                                    ["Payment Data", "Transaction ID, payment method type, billing address", "Checkout process (full card numbers are never stored)"],
                                    ["Program Data", "Course progress, assessment results, attendance records", "Participation in AL&CO programs"],
                                    ["Technical Data", "IP address, browser type, device type, operating system", "Automatically via cookies and server logs"],
                                    ["Communications", "Messages sent via contact forms or email", "Direct communication with AL&CO"],
                                ].map(([cat, ex, how], i) => (
                                    <tr key={i} className="border-b border-primary/5 last:border-0">
                                        <td className="px-4 py-3 text-neutral-600 font-medium">{cat}</td>
                                        <td className="px-4 py-3 text-neutral-500">{ex}</td>
                                        <td className="px-4 py-3 text-neutral-500">{how}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-neutral-500 custom-text1 mb-3">
                        We collect your national identity (CNIC) number and date of birth only when you sign an enrolment agreement, which requires them. We do not collect other sensitive categories of data, such as health information or financial account credentials, unless explicitly required and separately consented to.
                    </p>
                    <p className="text-neutral-500 custom-text1 mb-3">
                        Where a participant is aged 14 to 17, we also collect the name and contact details of the parent or guardian who gives consent to their enrolment and signs the enrolment agreement.
                    </p>
                    <p className="text-neutral-500 custom-text1">
                        If you report a safeguarding, harassment or whistleblowing concern, we record the details you give us and handle them in confidence under our{" "}
                        <Link href="/safeguarding-and-ethics" className="text-secondary underline">Safe Practice, Safeguarding and Ethics Policies</Link>.
                    </p>
                </>
            ),
        },
        {
            label: "Section 03",
            title: "How We Use Your Information",
            content: (
                <>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        We process personal data only for specified, lawful purposes. These include:
                    </p>
                    <ul className="space-y-2 mb-4">
                        {[
                            "Creating and managing participant accounts and program access",
                            "Processing enrollments, payments, and issuing certificates",
                            "Communicating program updates, schedules, and account-related notices",
                            // E 02 row 3b: add the closing sentence "If you are already a graduate, we tell you about your
                            // free revisits instead of sending a link." when the G7 CRM graduate check ships.
                            "Registering you for our free weekly webinar: we use your email address and phone number to check whether you are already an AL&CO graduate, to email you the joining link, and so that a relationship manager can follow up with you.",
                            "Sending promotional or informational communications, where you have provided consent",
                            "Improving the quality of our services and website through analytics",
                            "Complying with legal, regulatory, and accreditation obligations",
                            "Preventing unauthorized access, fraud, or misuse of our services",
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                                <span className="text-secondary mt-1 flex-shrink-0">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-l-2 border-secondary bg-secondary/5 px-5 py-4 rounded-r-lg">
                        <p className="text-neutral-600 custom-text1 font-medium">
                            We will never sell, rent, or trade your personal data to third parties for their own commercial or marketing purposes.
                        </p>
                    </div>
                </>
            ),
        },
        {
            label: "Section 04",
            title: "Legal Basis for Processing",
            content: (
                <ul className="space-y-2">
                    {[
                        ["Contractual Necessity", "To fulfill our obligations under the enrollment agreement"],
                        ["Legal Compliance", "To comply with applicable laws and regulatory requirements"],
                        ["Legitimate Interests", "To operate, improve, and protect our services"],
                        ["Consent", "For marketing communications and optional data uses, where freely given and withdrawable at any time"],
                    ].map(([title, desc], i) => (
                        <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                            <span className="text-secondary mt-1 flex-shrink-0">•</span>
                            <span><span className="text-neutral-600 font-medium">{title}:</span> {desc}</span>
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            label: "Section 05",
            title: "Sharing of Personal Data",
            content: (
                <>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        AL&CO does not sell personal data. We share data only in the following limited circumstances:
                    </p>
                    <ul className="space-y-2 mb-4">
                        {[
                            ["Accreditation Bodies", "ABNLP and its Coaching Division, the American Board of Hypnotherapy (ABH), the TLTA, the National Guild of Hypnotists (NGH) and ANLP (UK), for certificate verification and issuance"],
                            ["Payment Processors", "Licensed gateways for secure transaction processing"],
                            ["Technology Service Providers", "Platform and communication tool providers acting as data processors under written agreements"],
                            ["Legal Obligations", "Where disclosure is required by law, court order, or competent government authority"],
                        ].map(([title, desc], i) => (
                            <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                                <span className="text-secondary mt-1 flex-shrink-0">•</span>
                                <span><span className="text-neutral-600 font-medium">{title}:</span> {desc}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-neutral-500 custom-text1">
                        All third-party service providers are contractually bound to handle data securely and use it only for specified, agreed purposes.
                    </p>
                </>
            ),
        },
        {
            label: "Section 06",
            title: "Cookies & Tracking Technologies",
            content: (
                <>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        Our website uses cookies and similar tracking technologies to improve user experience and gather usage data:
                    </p>
                    <ul className="space-y-2 mb-4">
                        {[
                            ["Essential Cookies", "Required for the website to function (e.g., session management, security). These cannot be disabled"],
                            ["Analytics Cookies", "Used to understand how visitors interact with our website (e.g., Google Analytics). Data is aggregated and anonymized"],
                            ["Marketing Cookies", "Used to deliver relevant advertising, only activated with your explicit consent"],
                        ].map(([title, desc], i) => (
                            <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                                <span className="text-secondary mt-1 flex-shrink-0">•</span>
                                <span><span className="text-neutral-600 font-medium">{title}:</span> {desc}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-neutral-500 custom-text1">
                        
                        You may manage or disable non-essential cookies through your browser settings or our cookie consent tool at any time.
                    </p>
                </>
            ),
        },
        {
            label: "Section 07",
            title: "Data Retention",
            content: (
                <ul className="space-y-2">
                    {[
                        "Active participant records: retained for the duration of participation plus 2 years",
                        "Enrollment and certificate records: retained for 7 years in accordance with recordkeeping obligations",
                        // PLEASE CHECK (E 02 row 9): 5 years here vs 6 years in Section 12. Pick one and use it in both places.
                        "Payment records: retained for 5 years as required by financial regulations",
                        "Marketing data: retained until consent is withdrawn or the participant opts out",
                        "Inactive accounts (no activity for 3+ years): data is anonymized or securely deleted",
                        "Safeguarding, harassment and whistleblowing records: retained for three years, or longer where the law requires",
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
            label: "Section 08",
            title: "Your Data Rights",
            content: (
                <>
                    <p className="text-neutral-500 custom-text1 mb-6">
                        You have the following rights regarding your personal data held by AL&CO, exercisable by submitting a written request to{" "}
                        <Link href="mailto:connect@arslanlarik.com" className="text-secondary underline">
                            connect@arslanlarik.com
                        </Link>:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {[
                            ["Right of Access", "Request a copy of the personal data we hold about you."],
                            ["Right to Rectification", "Request correction of inaccurate or incomplete personal data."],
                            ["Right to Erasure", "Request deletion of your data where we no longer have a legal basis to retain it."],
                            ["Right to Object", "Object to processing of your data for direct marketing at any time."],
                            ["Right to Portability", "Request a structured, machine-readable copy of your personal data."],
                            ["Withdraw Consent", "Withdraw consent for marketing or optional processing at any time."],
                        ].map(([title, desc], i) => (
                            <div key={i} className="border border-primary/10 rounded-xl px-4 py-5 bg-primary/3">
                                <p className="text-neutral-600 font-semibold text-sm mb-2">{title}</p>
                                <p className="text-neutral-500 custom-text1">{desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-neutral-500 custom-text1">
                        We will respond to all requests within 30 days. Requests that are manifestly unfounded or excessive may be subject to a reasonable administrative fee.
                    </p>
                </>
            ),
        },
        {
            label: "Section 09",
            title: "Data Security",
            content: (
                <>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        AL&CO implements appropriate technical and organizational measures to protect personal data:
                    </p>
                    <ul className="space-y-2 mb-4">
                        {[
                            "SSL/TLS encryption for all data transmitted via our website and digital platform",
                            "Passwords stored using industry-standard secure hashing; never stored in plain text",
                            "Access to personal data restricted to authorized personnel on a need-to-know basis",
                            "Regular security assessments and platform updates",
                            "Staff trained on data protection responsibilities",
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                                <span className="text-secondary mt-1 flex-shrink-0">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-neutral-500 custom-text1">
                        In the event of a data breach that poses a risk to individuals, AL&CO will notify affected parties and relevant authorities in accordance with applicable legal requirements.
                    </p>
                </>
            ),
        },
        {
            label: "Section 10",
            title: "International Data Transfers",
            content: (
                <p className="text-neutral-500 custom-text1">
                    Where personal data is transferred outside of Pakistan (e.g., to service providers or accreditation bodies in other jurisdictions), AL&CO ensures appropriate safeguards are in place, including contractual data protection clauses consistent with recognized international standards.
                </p>
            ),
        },
        {
            label: "Section 11",
            title: "Policy Updates",
            content: (
                <p className="text-neutral-500 custom-text1">
                    AL&CO may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. Material updates will be communicated via email or a prominent notice on our website, along with a revised effective date. Continued use of our services following notification of changes constitutes acceptance of the updated policy.
                </p>
            ),
        },
        {
            label: "Section 12",
            title: "ALCO CRM & QuickBooks Online Integration",
            content: (
                <>
                    <p className="text-neutral-600 custom-text1 mb-3">
                        AL&CO operates an internal business system, ALCO CRM, used only by AL&CO staff. It is not available to the public, to students, or to any third party.
                    </p>
                    <p className="text-neutral-600 custom-text1 mb-4">
                        ALCO CRM connects to AL&CO&apos;s own QuickBooks Online company file to read financial and customer information, so that AL&CO staff can manage enrolments, invoicing, instalment plans, and receivables in one place.
                    </p>

                    <p className="text-neutral-600 custom-text1 font-medium mb-2">What information is accessed from QuickBooks Online</p>
                    <ul className="space-y-2 mb-4">
                        {[
                            "Customer records: name, email address, telephone number, billing address",
                            "Sales records: invoices, invoice line items, programme or product purchased, amounts, dates, and discounts applied",
                            "Payment records: payments received, dates, amounts, and the account they were received into",
                            "Balances: amounts outstanding, ageing, and instalment position",
                            "Supplier records and purchase records, where relevant to cost reporting",
                            "Chart of accounts and product or service definitions, as reference data",
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                                <span className="text-secondary mt-1 flex-shrink-0">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        ALCO CRM does not access, and does not require, bank login credentials, card numbers, or any payment instrument details.
                    </p>

                    <p className="text-neutral-600 custom-text1 font-medium mb-2">Whether the information is stored</p>
                    <p className="text-neutral-500 custom-text1 mb-2">
                        Yes. ALCO CRM keeps its own copy of the information listed above. A copy is stored so that reporting is fast, so that historical positions can be compared, and so that the system continues to function if the QuickBooks Online connection is temporarily unavailable.
                    </p>
                    <div className="border-l-2 border-secondary bg-secondary/5 px-5 py-4 rounded-r-lg mb-4">
                        <p className="text-neutral-600 custom-text1 font-medium">
                            ALCO CRM reads from QuickBooks Online. It does not write to QuickBooks Online. It does not create, alter, or delete any record in the accounting file.
                        </p>
                    </div>

                    <p className="text-neutral-600 custom-text1 font-medium mb-2">Where it is held and who can see it</p>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        The system is hosted on infrastructure operated by Quantris Technologies, AL&CO&apos;s software house, under the direction of AL&CO
                        {/* TODO: confirm hosting provider + region with Quantris before publishing, then replace this line, e.g.: */}
                        {/* , on [PROVIDER NAME] infrastructure located in [REGION]. */}
                        . Access is restricted to named AL&CO staff who need it to perform their role. Access is granted individually, is recorded, and is removed when a person&apos;s role changes or they leave.
                    </p>

                    <p className="text-neutral-600 custom-text1 font-medium mb-2">How it is protected</p>
                    <ul className="space-y-2 mb-4">
                        {[
                            "Access requires an individual login. Accounts are not shared.",
                            "Data is transmitted over encrypted (TLS/SSL) connections.",
                            "Access is limited to the minimum necessary for each role.",
                            "Access is reviewed when roles change.",
                            // TODO: confirm encryption-at-rest, backup frequency, and auth method with Quantris, then add as a bullet here.
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-neutral-500 custom-text1">
                                <span className="text-secondary mt-1 flex-shrink-0">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <p className="text-neutral-600 custom-text1 font-medium mb-2">How long it is kept</p>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        Information from ALCO CRM is retained for as long as needed for accounting and business record-keeping purposes: 6 years, in line with standard record-keeping practice in Pakistan.
                        {/* TODO: confirm this figure with AL&CO's accountant */}
                    </p>

                    <p className="text-neutral-600 custom-text1 font-medium mb-2">If the QuickBooks Online connection is ended</p>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        If AL&CO disconnects ALCO CRM from QuickBooks Online, the connection is revoked immediately and no further data is read. Data already stored is deleted within 30 days, except where AL&CO is legally required to retain business records.
                        {/* TODO: confirm the 30-day figure */}
                    </p>

                    <p className="text-neutral-600 custom-text1 font-medium mb-2">Sharing</p>
                    <p className="text-neutral-500 custom-text1 mb-4">
                        In addition to the parties listed in Section 05, ALCO CRM data is shared only with Intuit, as the operator of QuickBooks Online and the source of the data, and with Quantris Technologies, as the hosting and technical provider acting on AL&CO&apos;s instructions.
                    </p>

                    <p className="text-neutral-500 custom-text1">
                        Requests to access, correct, or delete information held in ALCO CRM follow the same process as Section 08 of this policy: write to{" "}
                        <Link href="mailto:connect@arslanlarik.com" className="text-secondary underline">
                            connect@arslanlarik.com
                        </Link>, and AL&CO will respond within 30 days.
                    </p>
                </>
            ),
        },
        {
            label: "Section 13",
            title: "Governing Law and Related Policies",
            content: (
                <>
                    <p className="text-neutral-500 custom-text1 mb-3">
                        This Privacy Policy is governed by the laws of Pakistan, and the courts at Karachi have jurisdiction over any dispute arising from it.
                    </p>
                    <p className="text-neutral-500 custom-text1">
                        Please read it together with our{" "}
                        <Link href="/terms" className="text-secondary underline">Terms and Conditions</Link>,{" "}
                        <Link href="/service-policy" className="text-secondary underline">Service Policy</Link>,{" "}
                        <Link href="/refund-policy" className="text-secondary underline">Refund Policy</Link> and{" "}
                        <Link href="/safeguarding-and-ethics" className="text-secondary underline">Safe Practice, Safeguarding and Ethics Policies</Link>.
                    </p>
                </>
            ),
        },
    ],
    contactCard: {
        title: "Privacy Inquiries",
        description: "For any data-related requests or concerns, contact our privacy team.",
        email: "connect@arslanlarik.com",
        address: OFFICIAL_ADDRESS,
    },
};

export default function PrivacyPolicy() {
    return (
        <div>
            <Banner data={bannerData} />
            <PolicyContent data={privacyData} />
        </div>
    );
}