import Link from "next/link";
import { ReactNode } from "react";
import { CTA, ctaDataAttrs, whatsappHref } from "@/component/cta";

export type PolicySection = {
    label: string;
    title: string;
    content: ReactNode;
};

export type PolicyContactCard = {
    title: string;
    description: string;
    email: string;
    address: string;
};

export type PolicyContentType = {
    sections: PolicySection[];
    contactCard: PolicyContactCard;
};

// Official contact details (D8). The +1 number is display only: never a link.
export const OFFICIAL_ADDRESS =
    "Arslan Larik & Company, D86/1, Gulshan-e-Iqbal, Block 7, Karachi, 75300, Sindh, Pakistan";

type Props = {
    data: PolicyContentType;
};

export default function PolicyContent({ data }: Props) {
    return (
        <section className="py-6 md:py-8 lg:py-12 xl:py-16 max-w-7xl mx-auto sm:px-4">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">

                    {/* Sections */}
                    {data.sections.map((section, i) => (
                        <div key={i} className="pb-10 mb-10 border-b border-primary/10 last:border-0 last:mb-0">
                            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">{section.label}</p>
                            <h2 className="h4 font-semibold text-neutral-700 mb-5">{section.title}</h2>
                            {section.content}
                        </div>
                    ))}

                    {/* Contact card: rendered from each page's own contactCard data */}
                    <div className="mt-12 border border-primary/10 rounded-2xl px-6 py-10 text-center bg-primary/3">
                        <h2 className="h4 font-semibold text-neutral-600 mb-3">{data.contactCard.title}</h2>
                        <p className="text-neutral-500 custom-text1 mb-2">{data.contactCard.description}</p>
                        <p className="text-neutral-500 custom-text1 mb-1">
                            Email:{" "}
                            <Link href={`mailto:${data.contactCard.email}`} className="text-secondary underline">
                                {data.contactCard.email}
                            </Link>
                        </p>
                        <p className="text-neutral-500 custom-text1 mb-1">
                            Phone and WhatsApp:{" "}
                            <Link href="tel:+923360082222" className="text-secondary underline">+92 336 008 2222</Link>
                            {" "}(<Link href="https://wa.me/923360082222" className="text-secondary underline">WhatsApp</Link>)
                        </p>
                        <p className="text-neutral-500 custom-text1 mb-1">US and Canada: +1 (206) 614 0234</p>
                        <p className="text-neutral-500 custom-text1">{data.contactCard.address}</p>
                    </div>

                    {/* CTA plan rule 5: policy pages carry no sales CTA, only this quiet C1 line. */}
                    <p className="mt-8 text-center text-neutral-500 custom-text1">
                        Questions?{" "}
                        <a
                            href={whatsappHref("Hi, I have a question about one of AL&CO's policies")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary underline"
                            {...ctaDataAttrs("C1")}
                        >
                            {CTA.C1.label}
                        </a>
                    </p>

                </div>
            </div>
        </section>
    );
}
