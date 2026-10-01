"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Turnstile } from "@marsidev/react-turnstile";

import InputField from "@/component/inputfield";
import SelectField from "@/component/selectfield";
import Checkboxfield from "@/component/checkboxfield";
import Button from "@/component/button";
import EnrollBannerImage from "@/assets/enroll-popup/enroll-popup.webp"; // apni banner image ka path check kar lein
import { createLead, getProgramsPublic, normalizeSource } from "@/utils/api";
import HowToEnrol from "@/component/HowToEnrol";
import CtaButton from "@/component/CtaButton";
import { ctaDataAttrs, waLine, whatsappHref } from "@/component/cta";

const ENROL_WA = waLine("enrolling (Enrol page)");

const goalOptions = [
  { label: "Emotional Stability", value: "emotional" },
  { label: "Financial Freedom", value: "financial" },
  { label: "Become a Certified Coach", value: "coach" },
  { label: "Professional Growth", value: "growth" },
  { label: "Relationship Mastery", value: "relationship" },
  { label: "International Certifications", value: "international" },
  { label: "Personal Development", value: "personal" },
];

function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[2]) : null;
}

export default function EnrollPage() {
  const [programOptions, setProgramOptions] = useState<{ label: string; value: string }[]>([]);
  const [programsLoading, setProgramsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<any>(null);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      program_id: "",
      profession: "",
      query: "",
      otherInfo: "",
      goals: [] as string[],
      acceptPolicy: true,
      acceptTerms: true,
    },
  });

  const fetchPrograms = async () => {
    setProgramsLoading(true);
    try {
      const res = await getProgramsPublic();
      const options = res.data.data.map((p: any) => ({
        label: p.name,
        value: p._id,
      }));
      setProgramOptions(options);
    } catch {
      setProgramOptions([
        { label: "Level 1: NLP Practitioner", value: "69d88bcd3b3f401bb2e711bc" },
        { label: "Level 2: NLP Master Practitioner", value: "69d8a8ed06f01d73ae725722" },
        { label: "Level 3: Advanced Hypnotherapy and Interventionist", value: "69e8bf48afaf0d3fb9023398" },
        { label: "Level 4: NLP Train the Trainer", value: "69e8bf8cafaf0d3fb90233a0" },
        { label: "Level 5: Hypnosis Train the Trainer", value: "69e8bfb7afaf0d3fb90233a8" },
        { label: "Level 6: NLP Master Trainer", value: "69e8c025afaf0d3fb90233d4" },
      ]);
    } finally {
      setProgramsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    const source = params.get("utm_source") || params.get("source") || params.get("ref");
    if (source && !localStorage.getItem("user_source")) {
      localStorage.setItem("user_source", source);
    }
  }, []);

  const onSubmit = async (data: any) => {
    if (!turnstileToken) {
      toast.error("Please complete the security check.");
      return;
    }

    try {
      const source = localStorage.getItem("user_source");

      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        program_id: data.program_id,
        profession: data.profession,
        query: data.query,
        message: data.otherInfo,
        goals: data.goals,
        source: normalizeSource(source, "enroll"),
        turnstileToken,
        fbc: getCookie("_fbc"),
        fbp: getCookie("_fbp"),
      };

      await createLead(payload);

      // /thank-you reads "lead_data" to fire the Lead event once (app/thank-you/page.tsx).
      sessionStorage.setItem(
        "lead_data",
        JSON.stringify({
          email: data.email,
          phone: data.phone,
          firstName: data.first_name,
        })
      );

      toast.success("Thank you. Your relationship manager will be in touch shortly.");
      router.push("/thank-you");
      localStorage.removeItem("user_source");
      reset();
      setTurnstileToken("");
      turnstileRef.current?.reset();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(msg);
      setTurnstileToken("");
      turnstileRef.current?.reset();
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS:", errors);
  };

  return (
    <div>
      {/* Banner */}
      <section className="relative w-full h-[160px] sm:h-[220px] md:h-[280px] bg-primary">
        <Image
          src={EnrollBannerImage}
          alt="Enroll at AL&CO"
          fill
          priority
          className="object-contain object-center"
        />
        {/* <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-outfit font-semibold">
            Enroll With AL&CO
          </h1>
          <p className="text-white/90 mt-3 max-w-2xl font-outfit text-sm sm:text-base">
            Pakistan's Best Internationally Certified Institute of NLP Training & Coaching Accreditation.
          </p>
        </div> */}
      </section>

      {/* Form */}
      <section className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
        <h1 className="h3 text-primary text-center">Enrol in an AL&CO Programme</h1>
        <p className="custom-text1 text-primary-light text-center mt-2 mb-8">
          Prefer to talk first? Call{" "}
          <a href="tel:+923360082222" className="underline" {...ctaDataAttrs("C6")}>+92 336 008 2222</a>{" "}
          or{" "}
          <a href={whatsappHref(ENROL_WA)} target="_blank" rel="noopener noreferrer" className="underline" {...ctaDataAttrs("C1")}>speak to a relationship manager</a>{" "}
          on WhatsApp. International: +1 (206) 614 0234.
        </p>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="bg-white rounded-2xl border-2 border-primary/20 shadow-xl p-5 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Controller
                name="first_name"
                control={control}
                rules={{ required: "First Name is required" }}
                render={({ field }) => (
                  <InputField label="First Name*" {...field} error={errors.first_name?.message} />
                )}
              />
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+\s\-]{10,15}$/,
                    message: "Enter a valid phone number (10-15 digits)",
                  },
                }}
                render={({ field }) => (
                  <InputField label="Phone*" type="tel" {...field} error={errors.phone?.message} />
                )}
              />
              <Controller
                name="profession"
                control={control}
                rules={{ required: "Profession is required" }}
                render={({ field }) => (
                  <InputField label="Profession*" {...field} error={errors.profession?.message} />
                )}
              />
              <Controller
                name="goals"
                control={control}
                render={({ field }) => (
                  <Checkboxfield
                    label="Which goal would you like to attain via NLP?"
                    options={goalOptions}
                    values={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Controller
                name="last_name"
                control={control}
                rules={{ required: "Last Name is required" }}
                render={({ field }) => (
                  <InputField label="Last Name*" {...field} error={errors.last_name?.message} />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field, fieldState }) => {
                  const val = field.value;
                  const isInvalidFormat = val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
                  return (
                    <InputField
                      label="Email*"
                      type="email"
                      {...field}
                      error={fieldState.error?.message}
                      warning={isInvalidFormat && !fieldState.error ? "Email format is incorrect" : undefined}
                    />
                  );
                }}
              />
              <Controller
                name="program_id"
                control={control}
                rules={{ required: "Program is required" }}
                render={({ field }) => (
                  <SelectField
                    label="Select Program*"
                    options={programOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.program_id?.message}
                  />
                )}
              />
              <Controller
                name="query"
                control={control}
                rules={{ required: "Please share your concern" }}
                render={({ field }) => (
                  <InputField label="Share your concern briefly" {...field} textarea error={errors.query?.message} />
                )}
              />
              <Controller
                name="otherInfo"
                control={control}
                render={({ field }) => <InputField label="Any other query/information" {...field} textarea />}
              />
            </div>
          </div>

          {/* Consent + submit */}
          <div className="mt-4 space-y-2">
            <Controller
              name="acceptPolicy"
              control={control}
              rules={{ required: "You must accept Policy consent" }}
              render={({ field }) => (
                <Checkboxfield
                  checked={field.value}
                  onChange={field.onChange}
                  color="black"
                  label={
                    <span>
                      By checking this box, I consent to receive transactional messages related to my account,
                      orders, or services I have requested. Message frequency may vary. Message & Data rates may
                      apply. Reply HELP for help or STOP to opt-out.
                    </span>
                  }
                />
              )}
            />
            <Controller
              name="acceptTerms"
              control={control}
              rules={{ required: "You must accept Terms consent" }}
              render={({ field }) => (
                <Checkboxfield
                  checked={field.value}
                  onChange={field.onChange}
                  color="black"
                  label={
                    <span>
                      By checking this box, I consent to receive marketing and promotional messages, including
                      programme news, event invitations and updates, among others. Message frequency may vary.
                      Message & Data rates may apply. Reply HELP for help or STOP to opt-out.
                    </span>
                  }
                />
              )}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
            <div className="flex flex-col justify-start">
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken("")}
                onError={() => setTurnstileToken("")}
              />
              <div className="text-xs text-gray-500 mt-2">
                <Link href="/privacy-policy" className="underline text-primary me-2">Privacy Policy</Link>
                |
                <Link href="/terms" className="underline text-primary ms-2">Terms and Conditions</Link>
              </div>
            </div>
            <div className="w-full sm:max-w-[220px] mt-4 sm:mt-0">
              <Button
                text={isSubmitting ? "Submitting..." : "Submit"}
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting || !turnstileToken}
              />
            </div>
          </div>
        </form>
        {/* CTA plan: /enroll is BoFu. Primary is the form; secondary C1. */}
        <div className="flex flex-col items-center mt-10">
          <p className="custom-text1 text-primary-light mb-4 text-center">Not sure which level fits? Ask before you enrol.</p>
          <CtaButton id="C1" message={ENROL_WA} variant="outlinePrimary" className="px-6" />
        </div>
      </section>

      <HowToEnrol />
    </div>
  );
}