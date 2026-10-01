"use client";

/**
 * Free weekly webinar sign-up (spec A 10 step 6, DECISIONS v2 G7).
 *
 * Two modes, so the page works before and after the CRM update (A 10 steps 1-4):
 *  - "crm": GET /api/webinars/public/free-weekly/next answered with a webinar. Registration goes to
 *    POST /api/webinars/public/{id}/register, where the CRM runs the graduate check, creates the
 *    Lead (source "webinar") and emails the joining link.
 *  - "fallback": that endpoint is not deployed yet, has no session, or failed (non-2xx or network error).
 *    The sign-up is saved as a Lead through the existing contact-lead endpoint (createLeadContact)
 *    with source "webinar", and the relationship manager sends the joining details.
 *
 * Never shows success unless a request actually succeeded. Never shows or stores a Zoom link.
 */

import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Turnstile } from "@marsidev/react-turnstile";
import { PUBLIC_API, createLeadContact } from "@/utils/api";
import { track } from "@/libs/track";
import InputField from "@/component/inputfield";
import Button from "@/component/button";

type NextWebinar = { _id: string; title: string; date: string };
type ResultView = { heading: string; message: string };
type FormValues = { first_name: string; last_name: string; email: string; phone: string; country: string };

const FALLBACK_MESSAGE = "Thank you. Your relationship manager will send you the joining details.";

const formatPkt = (d: string) =>
  new Date(d).toLocaleString("en-GB", {
    timeZone: "Asia/Karachi",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }) + " PKT";

function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[2]) : null;
}

export default function FreeWebinarForm() {
  const [webinar, setWebinar] = useState<NextWebinar | null>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ResultView | null>(null);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<any>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { first_name: "", last_name: "", email: "", phone: "", country: "" },
  });

  // InputField is a controlled input without a ref, so each field goes through a Controller.
  const field = (
    name: keyof FormValues,
    label: string,
    type: "text" | "email" | "tel" = "text",
    rules: Record<string, unknown> = {}
  ) => (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: f, fieldState }) => (
        <InputField
          label={label}
          type={type}
          name={f.name}
          value={f.value}
          onChange={f.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );

  // Keep the UTM source, as the other lead forms do.
  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    const source = params.get("utm_source") || params.get("source") || params.get("ref");
    if (source && !localStorage.getItem("user_source")) {
      localStorage.setItem("user_source", source);
    }
  }, []);

  useEffect(() => {
    PUBLIC_API.get<NextWebinar>("/api/webinars/public/free-weekly/next")
      .then((r) => setWebinar(r?.data?._id && r?.data?.date ? r.data : null))
      .catch(() => setWebinar(null)) // not deployed yet, no session, or network error: fallback mode
      .finally(() => setLoading(false));
  }, []);

  const resetTurnstile = () => {
    setTurnstileToken("");
    turnstileRef.current?.reset();
  };

  // Fallback: save the sign-up as a Lead with source "webinar" through the existing contact-lead endpoint.
  const createFallbackLead = async (values: FormValues) => {
    const utmSource = localStorage.getItem("user_source");
    const note = [
      "Free weekly webinar sign-up. Please send the joining details for the next session.",
      values.country ? `Country: ${values.country}.` : "",
      utmSource ? `UTM source: ${utmSource}.` : "",
    ]
      .filter(Boolean)
      .join(" ");

    await createLeadContact({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
      query: note,
      source: "webinar",
      turnstileToken,
      fbc: getCookie("_fbc"),
      fbp: getCookie("_fbp"),
    });
  };

  const onSubmit = async (values: FormValues) => {
    setError("");
    if (!turnstileToken) {
      setError("Please complete the security check.");
      return;
    }

    // 1. New CRM flow, when a free weekly session is published.
    if (webinar) {
      try {
        const r = await PUBLIC_API.post<{ status?: string; message?: string }>(
          `/api/webinars/public/${webinar._id}/register`,
          { responses: values, turnstileToken }
        );
        const status = r?.data?.status;
        if (status === "graduate") {
          setResult({
            heading: "Welcome back",
            message:
              r.data.message ||
              "Thank you for thinking of us. This free webinar is for people who are new to AL&CO. As a graduate, you can revisit your trainings free, and your relationship manager will be in touch with you shortly.",
          });
        } else {
          setResult({
            heading: "You are registered",
            message: status === "registered" && r.data.message ? r.data.message : FALLBACK_MESSAGE,
          });
          track("Lead", {
            email: values.email,
            phone: values.phone,
            firstName: values.first_name,
            lastName: values.last_name,
            contentName: "Free Weekly Webinar",
          });
        }
        localStorage.removeItem("user_source");
        reset();
        return;
      } catch (e: any) {
        // The Turnstile token is single-use and was spent on this call, so do not reuse it for the fallback.
        setError(
          e?.response?.data?.message ||
            "Sorry, we could not save your registration. Please complete the security check again and resubmit, or message us on WhatsApp."
        );
        resetTurnstile();
        return;
      }
    }

    // 2. Fallback: existing lead endpoint.
    try {
      await createFallbackLead(values);
      setResult({ heading: "Thank you", message: FALLBACK_MESSAGE });
      track("Lead", {
        email: values.email,
        phone: values.phone,
        firstName: values.first_name,
        lastName: values.last_name,
        contentName: "Free Weekly Webinar",
      });
      localStorage.removeItem("user_source");
      reset();
    } catch (e: any) {
      setError(
        e?.response?.data?.message ||
          "Sorry, we could not save your registration. Please try again, or message us on WhatsApp."
      );
      resetTurnstile();
    }
  };

  if (loading) return <p className="text-center text-gray-500 py-6">Loading the next session...</p>;

  if (result) {
    return (
      <div className="text-center py-6" role="status">
        <p className="h4 text-primary font-semibold">{result.heading}</p>
        <p className="custom-text1 text-primary-light mt-2">{result.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
      {webinar ? (
        <div className="text-center">
          <p className="h4 text-primary">{webinar.title}</p>
          <p className="custom-text1 text-primary-light mt-1">
            Next session: <strong>{formatPkt(webinar.date)}</strong>. Sessions are on Karachi time.
          </p>
        </div>
      ) : (
        <p className="custom-text1 text-primary-light text-center">
          The next session is being scheduled. Leave your details and your relationship manager will send you
          the date and the joining details. Sessions are on Karachi time.
        </p>
      )}
      {field("first_name", "First name*", "text", { required: "Please enter your first name" })}
      {field("last_name", "Last name")}
      {field("email", "Email*", "email", {
        required: "Please enter your email",
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email" },
      })}
      {field("phone", "Phone or WhatsApp*", "tel", {
        required: "Please enter your phone or WhatsApp number",
        minLength: { value: 10, message: "Please enter at least 10 digits" },
      })}
      {field("country", "Country")}

      <div className="flex justify-center">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken("")}
          onError={() => setTurnstileToken("")}
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center" role="alert">
          {error} WhatsApp or call{" "}
          <a href="https://wa.me/923360082222" target="_blank" rel="noopener noreferrer" className="underline">
            +92 336 008 2222
          </a>{" "}
          or write to{" "}
          <a href="mailto:connect@arslanlarik.com" className="underline">
            connect@arslanlarik.com
          </a>
          .
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        text={isSubmitting ? "Registering..." : "Register for the free webinar"}
        className="w-full"
        disabled={isSubmitting || !turnstileToken}
      />
      <p className="text-xs text-gray-500 text-center">
        {webinar
          ? "We email your joining link to the address you give us. We never publish it."
          : "Your relationship manager sends the joining details to you directly. We never publish the link."}
      </p>
    </form>
  );
}
