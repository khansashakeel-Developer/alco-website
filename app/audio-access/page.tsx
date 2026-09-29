"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import InputField from "@/component/inputfield";
import Checkboxfield from "@/component/checkboxfield";
import Button from "@/component/button";
import CtaButton from "@/component/CtaButton";
import { GRADUATE_REVISIT_LABEL, GRADUATE_WA_MESSAGE } from "@/component/cta";
import Logo from "@/assets/logo.webp";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
// import { verifyAudioPin, requestAudioAccess, getProgramsPublic } from "@/utils/api";
import { requestAudioAccess, getProgramsPublic } from "@/utils/api";
import { CheckCircle2 } from "lucide-react";

// Only Levels 1 and 2 have an audio library (222 and 225 files). IDs are the CRM programme IDs.
const AUDIO_PROGRAMS = [
  { label: "Level 1: NLP Practitioner", value: "69d88bcd3b3f401bb2e711bc" },
  { label: "Level 2: NLP Master Practitioner", value: "69d8a8ed06f01d73ae725722" },
];

export default function AudioAccessPage() {
  // const [pinVerified, setPinVerified] = useState(false);
  // const [isVerifying, setIsVerifying] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [programOptions, setProgramOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [programsLoading, setProgramsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      // pin: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      programs: [] as string[],
    },
  });

  // ── Fetch programs ─────────────────────────────────────────
  const fetchPrograms = async () => {
    setProgramsLoading(true);

    try {
      const res = await getProgramsPublic();

      const ids = new Set(AUDIO_PROGRAMS.map((p) => p.value));
      const live = (res?.data?.data ?? []).filter((p: any) => ids.has(p._id));
      setProgramOptions(
        live.length
          ? AUDIO_PROGRAMS.filter((p) => live.some((l: any) => l._id === p.value))
          : AUDIO_PROGRAMS
      );
    } catch {
      // Fallback: the two programmes that have an audio library
      setProgramOptions(AUDIO_PROGRAMS);

      // toast.error("Failed to load programs. Showing default list.");
    } finally {
      setProgramsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (pinVerified) fetchPrograms();
  // }, [pinVerified]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const onSubmit = async (data: any) => {
    // if (!pinVerified) {
    //   setIsVerifying(true);
    //   try {
    //     await verifyAudioPin(data.pin.trim());
    //     setPinVerified(true);
    //   } catch (err: any) {
    //     toast.error(err?.response?.data?.message || "Incorrect pin");
    //   } finally {
    //     setIsVerifying(false);
    //   }
    //   return;
    // }

    if (!data.programs || data.programs.length === 0) {
      toast.error("Select at least one program");
      return;
    }

    try {
      const res = await requestAudioAccess({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        programsRequested: data.programs,
        source: "access-request",
      });

      toast.success(res?.data?.message || "Request submitted!");
      setSubmitted(true);
      reset();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to submit request"
      );
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS:", errors);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-300 rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex flex-col items-center mb-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Image
              src={Logo}
              alt="Arslan Larik & Company (AL&CO) logo"
              className="h-10 md:h-11 xl:h-12 w-auto"
              priority
            />
          </Link>
        </div>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle2
              className="mx-auto text-primary mb-3"
              size={40}
            />
            <h2 className="text-2xl font-semibold text-primary mb-1">
              Request received
            </h2>
            <p className="text-gray-500 text-sm">
              Thank you. Our team will check your enrolment and confirm your
              access by email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <h1 className="text-2xl md:text-4xl font-semibold text-center text-primary mb-4">
              Request Audio Library Access
            </h1>
            <p className="text-sm text-gray-600 text-center mb-4">
              For students and graduates of Level 1: NLP Practitioner (222 audio files) and Level 2: NLP
              Master Practitioner (225 audio files). Your audio library is provided on the AL&amp;CO online
              learning portal.
            </p>

            {/* PIN SECTION REMOVED */}
            {/*
            {!pinVerified ? (
              <>
                <Controller
                  name="pin"
                  control={control}
                  rules={{
                    required: "Pin is required",
                    minLength: {
                      value: 4,
                      message: "Pin must be at least 4 digits",
                    },
                  }}
                  render={({ field }) => (
                    <InputField
                      label="Access Pin*"
                      type="password"
                      {...field}
                      error={errors.pin?.message}
                    />
                  )}
                />

                <Button
                  text={isVerifying ? "Verifying..." : "Continue"}
                  type="submit"
                  variant="primary"
                  className="w-full mt-6"
                  disabled={isVerifying}
                />
              </>
            ) : (
            */}

            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Controller
                  name="first_name"
                  control={control}
                  rules={{ required: "First Name is required" }}
                  render={({ field }) => (
                    <InputField
                      label="First Name*"
                      {...field}
                      error={errors.first_name?.message}
                    />
                  )}
                />

                <Controller
                  name="last_name"
                  control={control}
                  rules={{ required: "Last Name is required" }}
                  render={({ field }) => (
                    <InputField
                      label="Last Name*"
                      {...field}
                      error={errors.last_name?.message}
                    />
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
                  render={({ field, fieldState }) => (
                    <InputField
                      label="Email*"
                      type="email"
                      {...field}
                      error={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+\s\-]{10,15}$/,
                      message:
                        "Enter a valid phone number (10-15 digits)",
                    },
                  }}
                  render={({ field }) => (
                    <InputField
                      label="Phone*"
                      type="tel"
                      {...field}
                      error={errors.phone?.message}
                    />
                  )}
                />
              </div>

              <div className="mt-4">
                <Controller
                  name="programs"
                  control={control}
                  rules={{
                    validate: (v) =>
                      (v && v.length > 0) ||
                      "Select at least one program",
                  }}
                  render={({ field }) => (
                    <Checkboxfield
                      label={
                        programsLoading
                          ? "Loading programs..."
                          : "Select Program(s)*"
                      }
                      options={programOptions}
                      values={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                {errors.programs && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.programs.message as string}
                  </p>
                )}
              </div>

              <Button
                text={isSubmitting ? "Submitting..." : "Submit Request"}
                type="submit"
                variant="primary"
                className="w-full mt-6"
                disabled={isSubmitting}
              />
            </>

            {/* )} */}
          </form>
        )}

        {/* CTA plan rule 4: graduates are never sent to the webinar. "Revisit a training" is C1 with the graduate line. */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-3">Would you like to come back to a live training? Revisits of Levels 1 to 3 are free for five years.</p>
          <CtaButton
            id="C1"
            message={GRADUATE_WA_MESSAGE}
            label={GRADUATE_REVISIT_LABEL}
            variant="outlinePrimary"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}