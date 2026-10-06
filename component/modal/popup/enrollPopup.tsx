"use client";
import React, { useEffect, useState, useRef } from "react";
import Popup from "./popup";
import Button from "@/component/button";
import { usePopup } from "@/context/enrollPopupContext";
import InputField from "@/component/inputfield";
import SelectField from "@/component/selectfield";
import Checkboxfield from "@/component/checkboxfield";
import { useForm, Controller } from "react-hook-form";
import EnrollPopupImage from "@/assets/enroll-popup/enroll-popup.webp";
import Image from "next/image";
import Link from "next/link";
import { createLead, getProgramsPublic, normalizeSource } from "@/utils/api";
import toast from "react-hot-toast";
import { Turnstile } from "@marsidev/react-turnstile";
// import { event, trackLeadWithCapi } from "@/libs/fpixel";
import { useRouter } from "next/navigation";

type EnrollPopupProps = {
  buttonText?: string;
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
};

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

export default function EnrollPopup({
  title = "Welcome To AL&CO",
  description = (
    <>
      <p className="mb-2">
        World-class NLP, hypnosis and coaching certification, taught live on Zoom.
      </p>
      <p className="mb-2">
        Six levels, from NLP Practitioner to NLP Master Trainer:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Level 1: NLP Practitioner</li>
        <li>Level 2: NLP Master Practitioner</li>
        <li>Level 3: Advanced Hypnotherapy and Interventionist</li>
        <li>Level 4: NLP Train the Trainer</li>
        <li>Level 5: Hypnosis Train the Trainer</li>
        <li>Level 6: NLP Master Trainer</li>
      </ul>
    </>
  ),
  children,
}: EnrollPopupProps) {
  const { isOpen, closePopup, openPopup } = usePopup();
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
      programs: "",
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
        // A 08 row 8: labels only (value IDs unchanged), in ladder order.
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
    if (!isOpen) return;
    fetchPrograms();
  }, [isOpen]);

  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    const source = params.get("utm_source") || params.get("source") || params.get("ref");
    if (source && !localStorage.getItem("user_source")) {
      localStorage.setItem("user_source", source);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('openEnroll') === 'true') {
      openPopup(); // your existing state setter
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
        turnstileToken, // backend pe verify karo
        fbc: getCookie("_fbc"),
        fbp: getCookie("_fbp"),
      };

      await createLead(payload);

      // The /thank-you page reads "lead_data" to fire the Lead event once (same key as the contact form).
      sessionStorage.setItem("lead_data", JSON.stringify({
        email: data.email,
        phone: data.phone,
        firstName: data.first_name,
      }));

      // Facebook Pixel Lead event
      // event("Lead", { content_name: "Enroll Popup Form" });

      // trackLeadWithCapi({
      //   email: data.email,
      //   phone: data.phone,
      //   firstName: data.first_name,
      //   lastName: data.last_name,
      //   contentName: "Enroll Popup Form",
      // });
      toast.success("Thank you. Your relationship manager will be in touch soon.");
      router.push("/thank-you");
      localStorage.removeItem("user_source");
      reset();
      setTurnstileToken("");
      turnstileRef.current?.reset();
      closePopup();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(msg);
      // token expire ho jata hai after use, reset karo
      setTurnstileToken("");
      turnstileRef.current?.reset();
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS:", errors);
  };

  return (
    <Popup isOpen={isOpen} onClose={() => closePopup()}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="grid grid-cols-12 gap-x-6 gap-y-4 h-[80dvh] overflow-y-auto pr-2 pb-4 xl:pb-0 xl:h-full xl:overflow-hidden mini-scroll">
          {/* Left Column */}
          <div className="col-span-12 xl:col-span-4">
            {EnrollPopupImage && (
              <div className="relative w-full h-[180px] sm:h-[200px] md:h-[300px] xl:h-[200px]">
                <Image src={EnrollPopupImage} alt="Arslan Larik, Certified Master Trainer of NLP, with the AL&CO board seals" fill className="object-cover rounded-md" />
              </div>
            )}
            <div className="mt-4">
              <h2 className="text-3xl font-outfit font-semibold">{title}</h2>
              <div className="text-sm font-outfit text-gray-600 mt-3">{description}</div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 xl:col-span-8">
            {children || (
              <div>
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
                      render={({ field }) => (
                        <InputField label="Any other query/information" {...field} textarea />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Checkboxes and Submit */}
          <div className="col-span-12 space-y-2">
            <div className="space-y-2">
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




            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex flex-col justify-start mt-2">
                {/* ✅ Turnstile Widget */}
                <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken("")}
                  onError={() => setTurnstileToken("")}
                />
                <div className="text-xs text-gray-500 mb-2 sm:mb-0 sm:ms-6 md:ms-0 mt-2">
                  <Link href="/privacy-policy" className="underline text-primary me-2">Privacy Policy</Link>
                  |
                  <Link href="/terms" className="underline text-primary ms-2">Terms and Conditions</Link>
                </div>

              </div>
              <div className="w-full sm:max-w-[150px] z-50">
                <Button
                  text={isSubmitting ? "Submitting..." : "Submit"}
                  type="submit"
                  variant="primary"
                  className="mt-2 w-full z-50"
                  disabled={isSubmitting || !turnstileToken}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Popup>
  );
}