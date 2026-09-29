// app/maintenance/page.tsx
import { Wrench } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Under Maintenance, We Will Be Back Shortly | AL&CO",
  description:
    "The Arslan Larik & Company website is briefly under maintenance. For anything urgent, email connect@arslanlarik.com and our team will reply to you soon.",
  alternates: { canonical: "https://arslanlarik.com/maintenance" },
  robots: { index: false, follow: true },
};

export default function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <Wrench className="w-16 h-16 text-primary mb-4" />
      <h1 className="text-4xl font-bold text-primary mb-4">
        We&apos;ll Be Right Back
      </h1>
      <h2 className="text-2xl font-semibold mb-2">Site Under Maintenance</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        We&apos;re currently performing scheduled maintenance to improve your experience.
        Please check back shortly.
      </p>
      <p className="text-sm text-gray-400">
        For urgent inquiries, contact us at{" "}
        <a href="mailto:connect@arslanlarik.com" className="text-primary underline">
          connect@arslanlarik.com
        </a>
      </p>
    </div>
  );
}