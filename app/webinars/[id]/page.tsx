"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "next/navigation"; // ✅ useSearchParams hata diya
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.webp";
import InputField from "@/component/inputfield";
import Checkboxfield from "@/component/checkboxfield";
import Button from "@/component/button";
import toast from "react-hot-toast";
import { PUBLIC_API } from "@/utils/api";
import { CheckCircle2 } from "lucide-react";

type FieldType = "text" | "email" | "phone" | "number" | "date" | "textarea" | "select" | "checkbox";

interface WebinarField {
  fieldKey: string;
  label: string;
  type: FieldType;
  required?: boolean;
  order: number;
  options?: string[];
  allowOther?: boolean;
}


const OTHER_VALUE = "__other__";

interface Webinar {
  _id: string;
  title: string;
  description?: string;
  date: string;
  fields: WebinarField[];
}

export default function PublicWebinarRegisterPage() {
  const { id } = useParams<{ id: string }>();

  const [webinar, setWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  // Server answer after registering. With the A 10 CRM update: { status: "registered" | "graduate", message }.
  const [serverResult, setServerResult] = useState<{ status?: string; message?: string } | null>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {} as Record<string, any>,
  });

  useEffect(() => {
    const fetchWebinar = async () => {
      try {
        const res = await PUBLIC_API.get<Webinar>(`/api/webinars/public/${id}`);
        setWebinar(res.data);
      } catch (err) {
        setLoadError("not-available");
      } finally {
        setLoading(false);
      }
    };
    fetchWebinar();
  }, [id]);

  const sortedFields = [...(webinar?.fields || [])].sort((a, b) => a.order - b.order);

  const onSubmit = async (data: Record<string, any>) => {
    try {
      // ✅ Har field ke liye "Other" placeholder ko actual typed text se replace karo
      const processedData: Record<string, any> = {};
      sortedFields.forEach((field) => {
        const value = data[field.fieldKey];
        const otherText = data[`${field.fieldKey}_otherText`];

        if (field.type === "select" && value === OTHER_VALUE) {
          processedData[field.fieldKey] = otherText || "Other";
        } else if (field.type === "checkbox" && Array.isArray(value)) {
          processedData[field.fieldKey] = value.map((v) =>
            v === OTHER_VALUE ? (otherText || "Other") : v
          );
        } else {
          processedData[field.fieldKey] = value;
        }
      });

      const r = await PUBLIC_API.post(`/api/webinars/public/${id}/register`, {
        responses: processedData,
      });
      setServerResult(r.data ?? null); // { status: "registered" | "graduate", message } once the CRM is updated (A 10)
      if (r.data?.status !== "graduate") toast.success("Registered successfully!");
      setSubmitted(true);
      reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS:", errors);
  };

  const validationRules = (field: WebinarField) => {
    if (!field.required) return {};
    if (field.type === "checkbox") {
      return { validate: (v: string[]) => (v && v.length > 0) || `${field.label} is required` };
    }
    if (field.type === "email") {
      return {
        required: `${field.label} is required`,
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
      };
    }
    return { required: `${field.label} is required` };
  };

  const formatWebinarDateTime = (dateString: string) =>
    new Date(dateString).toLocaleString("en-GB", {
      timeZone: "Asia/Karachi",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }) + " PKT";

  // Only trust the server's message when it uses the new A 10 contract; otherwise keep today's text.
  const isGraduate = serverResult?.status === "graduate";
  const serverMessage =
    serverResult && (serverResult.status === "registered" || serverResult.status === "graduate")
      ? serverResult.message
      : "";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-300 rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex flex-col items-center mb-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Image src={Logo} alt="Arslan Larik & Company (AL&CO) logo" className="h-10 md:h-11 xl:h-12 w-auto" priority />
          </Link>
        </div>

        {loading && <p className="text-center text-gray-500 text-sm py-6">Loading...</p>}

        {!loading && loadError && (
          <p className="text-center text-gray-600 text-sm py-6">
            This webinar is not open for registration. To join the next one, sign up on our{" "}
            <Link href="/free-webinar" className="underline text-primary">free weekly webinar page</Link>, or write to{" "}
            <a href="mailto:connect@arslanlarik.com" className="underline text-primary">connect@arslanlarik.com</a>. Your
            joining link is sent by email once your place is confirmed.
          </p>
        )}

        {!loading && !loadError && submitted && webinar && (
          <div className="text-center py-6">
            <CheckCircle2 className="mx-auto text-primary mb-3" size={40} />
            <h2 className="text-2xl font-semibold text-primary mb-1">
              {isGraduate ? "Welcome back" : "You are registered"}
            </h2>
            {serverMessage ? (
              <p className="text-gray-500 text-sm">{serverMessage}</p>
            ) : (
              <p className="text-gray-500 text-sm">
                Thanks for signing up for <span className="font-medium">{webinar.title}</span>.
                We&apos;ll send further details to your email.
              </p>
            )}
          </div>
        )}

        {!loading && !loadError && !submitted && webinar && (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <h1 className="text-md font-semibold text-center text-primary mb-1">
              {webinar.title}
            </h1>
            {webinar.description && (
              <p className="text-sm text-gray-500 text-center mb-1">{webinar.description}</p>
            )}
            <p className="text-sm text-gray-600 text-center mb-3">
              <strong>An introduction to NLP, every week.</strong> Once a week we open a free, live introductory
              session for anyone exploring this world, a relaxed hour to understand what NLP really is, to feel the
              way we teach, and to ask anything you like before you decide a single thing. It is hosted by our
              relationship managers, the same people who walk beside our students from the first hello. There is no
              pressure and no obligation. These sessions are for people new to AL&amp;CO, who are still deciding.
            </p>
            <p className="text-xs text-gray-400 text-center mb-6">
              Reserve your seat for this free webinar on <br /> {formatWebinarDateTime(webinar.date)}
            </p>

            <div className="grid grid-cols-1 gap-4">
              {sortedFields.map((field) => {
                return (
                  <div key={field.fieldKey} >
                    <Controller
                      name={field.fieldKey}
                      control={control}
                      rules={validationRules(field)}
                      defaultValue={field.type === "checkbox" ? [] : ""}
                      render={({ field: rhfField, fieldState }) => {
                        if (field.type === "checkbox") {
                          const checkboxOptions = [
                            ...(field.options || []).map((o) => ({ label: o, value: o })),
                            ...(field.allowOther ? [{ label: "Other", value: OTHER_VALUE }] : []),
                          ];

                          return (
                            <div>
                              <Checkboxfield
                                label={`${field.label}${field.required ? "*" : ""}`}
                                options={checkboxOptions}
                                values={rhfField.value}
                                onChange={rhfField.onChange}
                              />
                              {fieldState.error && (
                                <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                              )}

                              {/* ✅ "Other" checkbox select hote hi text input dikhega */}
                              {field.allowOther &&
                                Array.isArray(rhfField.value) &&
                                rhfField.value.includes(OTHER_VALUE) && (
                                  <Controller
                                    name={`${field.fieldKey}_otherText`}
                                    control={control}
                                    rules={{ required: `Please specify your answer` }}
                                    defaultValue=""
                                    render={({ field: otherField, fieldState: otherFieldState }) => (
                                      <div className="mt-2">
                                        <input
                                          {...otherField}
                                          type="text"
                                          placeholder="Please specify"
                                          className="w-full border rounded-md px-3 py-2 text-sm"
                                        />
                                        {otherFieldState.error && (
                                          <p className="text-red-500 text-xs mt-1">
                                            {otherFieldState.error.message}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  />
                                )}
                            </div>
                          );
                        }
                        if (field.type === "select") {
                          return (
                            <div>
                              <label className="text-sm text-gray-700 mb-2 block">
                                {field.label}
                                {field.required && <span className="text-red-500 ml-0.5">*</span>}
                              </label>

                              <div className="space-y-2">
                                {field.options?.map((opt) => (
                                  <label
                                    key={opt}
                                    className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                                  >
                                    <input
                                      type="radio"
                                      name={field.fieldKey}
                                      value={opt}
                                      checked={rhfField.value === opt}
                                      onChange={() => rhfField.onChange(opt)}
                                      onBlur={rhfField.onBlur}
                                      className="accent-primary w-4 h-4"
                                    />
                                    {opt}
                                  </label>
                                ))}

                                {field.allowOther && (
                                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={field.fieldKey}
                                      value={OTHER_VALUE}
                                      checked={rhfField.value === OTHER_VALUE}
                                      onChange={() => rhfField.onChange(OTHER_VALUE)}
                                      onBlur={rhfField.onBlur}
                                      className="accent-primary w-4 h-4"
                                    />
                                    <span>Other:</span>
                                  </label>
                                )}
                              </div>

                              {fieldState.error && (
                                <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                              )}

                              {/* Other text input, inline jaise Google Forms mein hota hai */}
                              {field.allowOther && rhfField.value === OTHER_VALUE && (
                                <Controller
                                  name={`${field.fieldKey}_otherText`}
                                  control={control}
                                  rules={{ required: `Please specify your answer` }}
                                  defaultValue=""
                                  render={({ field: otherField, fieldState: otherFieldState }) => (
                                    <div className="mt-2 ml-6">
                                      <input
                                        {...otherField}
                                        type="text"
                                        placeholder="Please specify"
                                        className="w-full border-b border-gray-300 focus:border-primary outline-none px-1 py-1 text-sm"
                                      />
                                      {otherFieldState.error && (
                                        <p className="text-red-500 text-xs mt-1">
                                          {otherFieldState.error.message}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                />
                              )}
                            </div>
                          );
                        }
                        if (field.type === "textarea") {
                          return (
                            <div>
                              <label className="text-sm text-gray-700 mb-1 block">
                                {field.label}
                                {field.required && <span className="text-red-500 ml-0.5">*</span>}
                              </label>
                              <textarea {...rhfField} rows={3} className="w-full border rounded-md px-3 py-2 text-sm" />
                              {fieldState.error && <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>}
                            </div>
                          );
                        }
                        if (field.type === "date") {
                          return (
                            <div>
                              <label className="text-sm text-gray-700 mb-1 block">
                                {field.label}
                                {field.required && <span className="text-red-500 ml-0.5">*</span>}
                              </label>
                              <input type="date" {...rhfField} className="w-full border rounded-md px-3 py-2 text-sm" />
                              {fieldState.error && <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>}
                            </div>
                          );
                        }
                        return (
                          <InputField
                            label={`${field.label}${field.required ? "*" : ""}`}
                            type={field.type === "phone" ? "tel" : (field.type as "text" | "email" | "number")}
                            {...rhfField}
                            error={fieldState.error?.message}
                          />
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <Button
              text={isSubmitting ? "Submitting..." : "Register"}
              type="submit"
              variant="primary"
              className="w-full mt-6"
              disabled={isSubmitting}
            />
          </form>
        )}
      </div>
    </div>
  );
}
