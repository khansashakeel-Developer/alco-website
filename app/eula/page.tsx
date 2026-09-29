import type { Metadata } from 'next';
import { BannerType } from '@/type/bannerType';
import programLevel2 from "@/assets/background/program-level-2.webp";
import Banner from '@/component/banner';
import Link from 'next/link';
import PolicyContent, { PolicyContentType, OFFICIAL_ADDRESS } from '@/component/policy-content';
import { DEFAULT_OG_IMAGE } from '@/utils/buildMetadata';

const PAGE_URL = "https://arslanlarik.com/eula";
const TITLE = "ALCO CRM End User Licence Agreement for Staff | AL&CO";
const DESCRIPTION = "The licence terms for AL&CO staff and contractors who use ALCO CRM, our internal enrolment and invoicing system. Read the agreement before you log in.";

// Internal staff document: kept reachable (it may be registered with Intuit) but noindex, and not in the sitemap or footer.
export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: PAGE_URL },
    robots: { index: false, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "AL&CO", locale: "en_PK", type: "website", images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

const bannerData: BannerType = {
    title: {
        line1: "End User Licence Agreement",
        align: "text-center mx-auto"
    },
    image: programLevel2.src,
    className: "bg-center bg-cover bg-no-repeat bg-primary",
    children: (
        <>
            <p className='text-sm text-center text-white mt-2'>
                {/* PLEASE CHECK: replace the bracket with the real effective date before deploying */}
                ALCO CRM &nbsp;·&nbsp; Version 2026-1, September 2026 &nbsp;·&nbsp; Governed by the laws of Pakistan, courts at Karachi
            </p>
            <p className="text-sm text-center text-white mt-2 font-light">
                This agreement governs use of ALCO CRM by <Link href='/' className='underline text-secondary'>Arslan Larik & Company&apos;s</Link> authorised staff and contractors.
            </p>
        </>
    )
};

const eulaData: PolicyContentType = {
    sections: [
        {
            label: "Section 01",
            title: "What This Agreement Is",
            content: (
                <>
                    <p className="text-neutral-600 custom-text1 mb-3">
                        This agreement is between Arslan Larik & Company (&quot;AL&amp;CO&quot;) and each person authorised to use ALCO CRM (&quot;the System&quot;).
                    </p>
                    <p className="text-neutral-600 custom-text1 mb-3">
                        ALCO CRM is an internal business system. It is not a public product, it is not sold, and it is not licensed to anyone outside AL&amp;CO.
                    </p>
                    <div className="border-l-2 border-secondary bg-secondary/5 px-5 py-4 rounded-r-lg">
                        <p className="text-neutral-600 custom-text1 font-medium">
                            By logging in, you accept this agreement. If you do not accept it, do not log in.
                        </p>
                    </div>
                </>
            ),
        },
        {
            label: "Section 02",
            title: "Who May Use It",
            content: (
                <>
                    <p className="text-neutral-600 custom-text1 mb-3">
                        Use is limited to AL&amp;CO staff and contractors who have been issued an individual account by AL&amp;CO for the purpose of performing their role.
                    </p>
                    <p className="text-neutral-600 custom-text1">
                        Accounts are personal. You may not share your login, let anyone else use your account, or use an account issued to someone else.
                    </p>
                </>
            ),
        },
        {
            label: "Section 03",
            title: "What You May Do",
            content: (
                <p className="text-neutral-600 custom-text1">
                    You may use the System only to carry out your duties for AL&amp;CO: managing enrolments, invoicing, instalment plans, receivables, and related reporting drawn from AL&amp;CO&apos;s QuickBooks Online company file.
                </p>
            ),
        },
        {
            label: "Section 04",
            title: "What You May Not Do",
            content: (
                <ul className="space-y-2">
                    {[
                        "Take information out of the System for any purpose other than AL&CO's business, including copying, exporting, photographing, or forwarding customer or financial data",
                        "Retain any AL&CO information after your authorisation ends",
                        "Give access to anyone who has not been authorised by AL&CO",
                        "Attempt to bypass access controls, permissions, or logging",
                        "Modify, decompile, or reverse engineer the System",
                        "Connect it to any other system without AL&CO's written permission",
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
            title: "Whose Information This Is",
            content: (
                <p className="text-neutral-600 custom-text1">
                    The System holds personal and financial information about AL&amp;CO&apos;s students, customers, and suppliers. You are handling other people&apos;s information.
                    You must treat it as confidential, use it only where your role requires it, and follow AL&amp;CO&apos;s{" "}
                    <Link href="/privacy-policy" className="text-secondary underline">Privacy Policy</Link> and{" "}
                    <Link href="/safeguarding-and-ethics" className="text-secondary underline">Safe Practice, Safeguarding and Ethics Policies</Link>{" "}
                    at all times. Curiosity is not a business purpose.
                </p>
            ),
        },
        {
            label: "Section 06",
            title: "Ownership",
            content: (
                <p className="text-neutral-600 custom-text1">
                    The System, its design, and its code remain the property of AL&amp;CO. This agreement grants permission to use it, and transfers nothing else.
                </p>
            ),
        },
        {
            label: "Section 07",
            title: "Read-Only Access to QuickBooks Online",
            content: (
                <p className="text-neutral-600 custom-text1">
                    ALCO CRM connects to AL&amp;CO&apos;s QuickBooks Online file on a read-only basis. It does not create, edit, or delete accounting records. Any correction to the accounting records must be made in QuickBooks Online by an authorised person.
                </p>
            ),
        },
        {
            label: "Section 08",
            title: "Availability",
            content: (
                <>
                    <p className="text-neutral-600 custom-text1 mb-3">
                        The System is provided for internal use and may be unavailable at times for maintenance, or because of a fault, or because the QuickBooks Online connection is interrupted. AL&amp;CO gives no guarantee of availability and no warranty of any kind.
                    </p>
                    <p className="text-neutral-600 custom-text1">
                        Figures shown in the System are drawn from the accounting records and are for internal management purposes. They are not audited financial statements and should not be relied upon as such.
                    </p>
                </>
            ),
        },
        {
            label: "Section 09",
            title: "Monitoring",
            content: (
                <p className="text-neutral-600 custom-text1">
                    Use of the System is logged, including who accessed what and when. AL&amp;CO may review those logs.
                </p>
            ),
        },
        {
            label: "Section 10",
            title: "Ending Access",
            content: (
                <>
                    <p className="text-neutral-600 custom-text1 mb-3">
                        AL&amp;CO may withdraw access at any time, without notice, including where this agreement has been breached.
                    </p>
                    <p className="text-neutral-600 custom-text1">
                        Access ends automatically when your engagement with AL&amp;CO ends. On that day you must stop using the System and must not retain any information taken from it.
                    </p>
                </>
            ),
        },
        {
            label: "Section 11",
            title: "Liability",
            content: (
                <>
                    <p className="text-neutral-600 custom-text1 mb-3">
                        To the fullest extent permitted by law, AL&amp;CO is not liable for any loss arising from use of the System, including loss of data, loss of profit, or any indirect or consequential loss.
                    </p>
                    <p className="text-neutral-500 custom-text1">
                        Nothing in this clause limits liability that cannot lawfully be limited.
                    </p>
                </>
            ),
        },
        {
            label: "Section 12",
            title: "Changes to This Agreement",
            content: (
                <p className="text-neutral-600 custom-text1">
                    AL&amp;CO may update this agreement. The current version will always be published at this address, and continued use after a change means you accept it.
                </p>
            ),
        },
        {
            label: "Section 13",
            title: "Governing Law",
            content: (
                <p className="text-neutral-600 custom-text1">
                    This agreement is governed by the laws of Pakistan, and the courts of Karachi have exclusive jurisdiction.
                </p>
            ),
        },
    ],
    contactCard: {
        title: "Questions About This Agreement",
        description: "For any questions relating to ALCO CRM or this agreement, contact us.",
        email: "connect@arslanlarik.com",
        address: OFFICIAL_ADDRESS,
    },
};

export default function EndUserLicenceAgreement() {
    return (
        <div>
            <Banner data={bannerData} />
            <PolicyContent data={eulaData} />
        </div>
    );
}