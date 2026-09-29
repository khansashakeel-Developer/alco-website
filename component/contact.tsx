"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import ContactBg from "@/assets/background/contact-info.webp";
import Link from "next/link";
import { createLeadContact, normalizeSource } from "@/utils/api";
import toast from "react-hot-toast";
import { Turnstile } from "@marsidev/react-turnstile";
import InputField from "@/component/inputfield";
import Button from "@/component/button";
// import { event, trackLeadWithCapi } from "@/libs/fpixel";
import { event } from "@/libs/fpixel";
import { track } from "@/libs/track";
import { useRouter } from "next/navigation";

type ContactFormValues = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    query: string;
};

function getCookie(name: string): string | null {
    const match = document.cookie.match(
        new RegExp("(^|;\\s*)" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)")
    );
    return match ? decodeURIComponent(match[2]) : null;
}

const ContactUS = () => {
    const [turnstileToken, setTurnstileToken] = useState<string>("");
    const turnstileRef = useRef<any>(null);
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormValues>({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            query: "",
        },
    });

    useEffect(() => {
        const params = new URLSearchParams(window?.location?.search);
        const source = params.get("utm_source") || params.get("source") || params.get("ref");
        if (source && !localStorage.getItem("user_source")) {
            localStorage.setItem("user_source", source);
        }
    }, []);

    const onSubmit = async (formData: ContactFormValues) => {
        if (!turnstileToken) {
            toast.error("Please complete the security check.");
            return;
        }


        event("InitiateCheckout", { content_name: "Contact Form" });

        const source = localStorage.getItem("user_source");

        try {
        await createLeadContact({
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone: formData.phone,
            query: formData.query,
            source: normalizeSource(source, "contact"),
            turnstileToken, 
            fbc: getCookie("_fbc"),
            fbp: getCookie("_fbp"),
        });

        // Lead event ab /thank-you page se fire hoga, yahan nahi
        sessionStorage.setItem("lead_data", JSON.stringify({
            email: formData.email,
            phone: formData.phone,
            firstName: formData.first_name,
            // CTA plan: the thank-you page shows C2 only to contact-form leads, not enrolments.
            form: "contact",
        }));

        // event("Lead", { content_name: "Contact Us Form" });
        // trackLeadWithCapi({
        //     email: formData.email,
        //     phone: formData.phone,
        //     firstName: formData.first_name,
        //     lastName: formData.last_name,
        //     contentName: "Contact Us Form",
        // });

        // if (res?.data?.duplicate === true) {
        //     toast.success(res.data.message);
        // } else {
        //     toast.success(res.data.message);
        // }

        reset();
        setTurnstileToken("");
        turnstileRef.current?.reset();
        localStorage.removeItem("user_source");
        router.push("/thank-you");
        } catch (err: any) {
            const msg = err?.response?.data?.message || "Something went wrong. Please try again, or WhatsApp us on +92 336 008 2222.";
            toast.error(msg);
            setTurnstileToken("");
            turnstileRef.current?.reset();
        }
    };

    return (
        // id="form": CTA C5 "Book a conversation" links to /contact#form.
        <section id="form" className="max-w-7xl mx-auto pb-6 md:pb-8 lg:pb-12 xl:pb-16 px-4 scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Info */}
                <div
                    className="relative flex flex-col justify-center px-8 lg:py-6 xl:px-8 xl:py-6 2xl:px-10 2xl:py-8 rounded-xl shadow-lg bg-cover bg-no-repeat bg-right overflow-hidden min-h-[350px]"
                    style={{ backgroundImage: `url(${ContactBg.src})` }}
                >
                    <div className="absolute inset-0 bg-primary/10 z-10"></div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 hover:-translate-y-1 hover:opacity-90">
                            <FaMapMarkerAlt size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-secondary-dark">Our Location</h3>
                            <p className="text-white">D86/1, Gulshan-e-Iqbal, Block 7, Karachi, 75300, Sindh, Pakistan</p>
                        </div>
                    </div>

                    {/* D8: +92 336 008 2222 is the only linked number. The US and Canada line is display only. */}
                    <div className="flex items-center gap-4 mb-6 z-20">
                        <Link
                            href="tel:+923360082222"
                            aria-label="Call AL&CO on +92 336 008 2222"
                            onClick={() => track("Contact", { contentName: "call" })}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 hover:-translate-y-1 hover:opacity-90"
                        >
                            <FaPhoneAlt size={20} />
                        </Link>
                        <div>
                            <h3 className="font-semibold text-secondary-dark">Call or WhatsApp Us</h3>
                            <div className="flex flex-col text-white">
                                <Link
                                    href="tel:+923360082222"
                                    onClick={() => track("Contact", { contentName: "call" })}
                                    className="text-white hover:underline"
                                >
                                    +92 336 008 2222
                                </Link>
                                <Link
                                    href="https://wa.me/923360082222"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => track("Contact", { contentName: "whatsapp" })}
                                    className="text-white hover:underline"
                                >
                                    WhatsApp: +92 336 008 2222
                                </Link>
                                <span className="text-white">US and Canada: +1 (206) 614 0234</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6 z-20">
                        <Link href="mailto:connect@arslanlarik.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 hover:-translate-y-1 hover:opacity-90">
                            <FaEnvelope size={20} />
                        </Link>
                        <div>
                            <h3 className="font-semibold text-secondary-dark">Email Us</h3>
                            <Link href="mailto:connect@arslanlarik.com" className="text-white hover:underline">
                                connect@arslanlarik.com
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-300 p-6 rounded-lg">
                    <h2 className="text-2xl md:text-4xl font-semibold text-center text-primary mb-6">Send Us a Message</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Controller
                            name="first_name"
                            control={control}
                            rules={{ required: "First Name is required" }}
                            render={({ field }) => (
                                <InputField label="First Name*" {...field} error={errors.first_name?.message} />
                            )}
                        />
                        <Controller
                            name="last_name"
                            control={control}
                            rules={{ required: "Last Name is required" }}
                            render={({ field }) => (
                                <InputField label="Last Name*" {...field} error={errors.last_name?.message} />
                            )}
                        />
                    </div>

                    <div className="mt-6">
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                            }}
                            render={({ field }) => (
                                <InputField label="Email*" type="email" {...field} error={errors.email?.message} />
                            )}
                        />
                    </div>

                    <div className="mt-6">
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: "Phone is required",
                                minLength: { value: 10, message: "Phone must be at least 10 digits" },
                            }}
                            render={({ field }) => (
                                <InputField label="Phone*" type="tel" {...field} error={errors.phone?.message} />
                            )}
                        />
                    </div>

                    <div className="my-6">
                        <Controller
                            name="query"
                            control={control}
                            rules={{ required: "Query is required" }}
                            render={({ field }) => (
                                <InputField label="Comment*" textarea={true} {...field} error={errors.query?.message} />
                            )}
                        />
                    </div>

                    {/* ✅ Turnstile Widget */}
                    <div className="mb-4">
                        <Turnstile
                            ref={turnstileRef}
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                            onSuccess={(token) => setTurnstileToken(token)}
                            onExpire={() => setTurnstileToken("")}
                            onError={() => setTurnstileToken("")}
                        />
                    </div>

                    <Button
                        text={isSubmitting ? "Submitting..." : "Submit"}
                        type="submit"
                        variant="primary"
                        className="w-full"
                        disabled={isSubmitting || !turnstileToken}
                    />
                </form>
            </div>
        </section>
    );
};

export default ContactUS;