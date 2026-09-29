"use client";
import React, { useState } from "react";
import Button from "@/component/button";
import InputField from "@/component/inputfield";
import { useForm, Controller } from "react-hook-form";
import { requestAudioAccess } from "@/utils/api";
import toast from "react-hot-toast";
import Popup from "./popup/popup";

type Props = {
  isOpen: boolean;
  programId: string;
  programName?: string;
  onClose: () => void;
};

export default function AudioResourceRequestModal({ isOpen, programId, programName, onClose }: Props) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: { name: "", email: "", phone: "" },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    const nameParts = data.name.trim().split(" ");
    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(" ") || null; // ✅ sirf ek naam ho tw null

    try {
      const res = await requestAudioAccess({
        first_name,
        last_name,
        email: data.email,
        phone: data.phone,
        programsRequested: [programId],
        source: "resource",
      });

      toast.success(res?.data?.message || "Submitted! Our team will reach out shortly.");
      reset();
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(msg);
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-2">
        <h4 className="text-xl font-outfit font-semibold mb-4 text-primary">
          {programName ? `Request access: ${programName} audio library` : "Request audio library access"}
        </h4>

        <div className="flex flex-col gap-4">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <InputField label="Full Name*" {...field} error={errors.name?.message} />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
            }}
            render={({ field }) => (
              <InputField label="Email*" type="email" {...field} error={errors.email?.message} />
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
              pattern: { value: /^[0-9+\s\-]{10,15}$/, message: "Enter a valid phone number (10-15 digits)" },
            }}
            render={({ field }) => (
              <InputField label="Phone*" type="tel" {...field} error={errors.phone?.message} />
            )}
          />
        </div>

        <Button
          text={isSubmitting ? "Submitting..." : "Submit"}
          type="submit"
          variant="primary"
          className="mt-4 w-full"
          disabled={isSubmitting}
        />
      </form>
    </Popup>
  );
}