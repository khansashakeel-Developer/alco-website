// components/bookRequestPopup.tsx
"use client";
import React from "react";
import { X } from "lucide-react";
import Button from "@/component/button";
import InputField from "@/component/inputfield";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    book: {
        _id: string;
        title: string;
        cover_image_url: string;
    } | null;
};

export default function BookRequestPopup({ isOpen, onClose, book }: Props) {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = async (data: any) => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lms/resources/${book?._id}/request`,
                data
            );
            toast.success("Book sent to your email! 📖");
            reset();
            onClose();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };

    if (!isOpen || !book) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <X size={20} />
                </button>

                <div className="grid grid-cols-12 gap-6">

                    {/* Left — Book cover */}
                    <div className="col-span-12 md:col-span-4 flex flex-col items-center gap-3">
                        <div className="relative w-full h-56 rounded-xl overflow-hidden">
                            <Image
                                src={book.cover_image_url}
                                alt={book.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-sm font-semibold text-center text-gray-800 font-outfit">
                            {book.title}
                        </p>
                    </div>

                    {/* Right — Form */}
                    <div className="col-span-12 md:col-span-8">
                        <h2 className="text-xl font-semibold font-outfit text-gray-800 mb-1">
                            Get Your Free Book 📖
                        </h2>
                        <p className="text-sm text-gray-400 mb-5 font-outfit">
                            Fill in your details and we'll send it straight to your email.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-3">
                                <Controller
                                    name="first_name"
                                    control={control}
                                    rules={{ required: "First name required" }}
                                    render={({ field }) => (
                                        <InputField
                                            label="First Name"
                                            {...field}
                                            error={errors.first_name?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="last_name"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField label="Last Name" {...field} />
                                    )}
                                />
                            </div>

                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email",
                                    },
                                }}
                                render={({ field }) => (
                                    <InputField
                                        label="Email"
                                        type="email"
                                        {...field}
                                        error={errors.email?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "Phone required",
                                    pattern: {
                                        value: /^[0-9+\s\-]{10,15}$/,
                                        message: "Enter a valid phone number",
                                    },
                                }}
                                render={({ field }) => (
                                    <InputField
                                        label="Phone"
                                        type="tel"
                                        {...field}
                                        error={errors.phone?.message}
                                    />
                                )}
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                isLoading={isSubmitting}
                                loadingText="Sending..."
                            >
                                Send Me The Book
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}