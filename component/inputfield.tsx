"use client";
import React, { useState } from "react";

type InputProps = {
  label: string;
  type?: "text" | "password" | "number" | "email" | "tel";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
  name?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  error?: string;
  warning?: string;
};

const InputField: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  textarea = false,
  name,
  disabled = false,
  size = "medium",
  error,
  warning
}) => {
  const [focus, setFocus] = useState(false);

  const isActive = focus || value;

  // ✅ Size classes
  const sizeClasses: Record<string, string> = {
    sm: "px-2 pt-4 pb-1 text-sm",
    md: "px-3 pt-5 pb-2 text-base",
    lg: "px-4 pt-6 pb-3 text-lg",
  };

  const baseClasses =
    "w-full border rounded-lg px-2 pt-4 pb-1 focus:outline-none font-light text-sm";

  const borderClass = error
    ? "border-red-500 focus:border-red-500"
    : warning
      ? "border-yellow-400 focus:border-yellow-400"
      : "border-gray-300 focus:border-primary";

  return (
    <div className="relative w-full">
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          spellCheck={false}        // ✅ NEW
          className={`${baseClasses} ${borderClass} resize-none mini-scroll min-h-[110px]`}
        // className="w-full border border-gray-300 rounded-lg px-2 pt-4 pb-1 focus:outline-none focus:border-primary resize-none font-light text-sm"
        // className={`w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none ${sizeClasses[size]}`}
        />
      ) : (
        // InputField.tsx mein input tag update karo
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          spellCheck={false}        // ✅ NEW
          autoComplete="off"        // ✅ NEW
          className={`${baseClasses} ${borderClass}`}
        // className="w-full border border-gray-300 rounded-lg px-2 pt-4 pb-1 focus:outline-none focus:border-primary font-light text-sm"
        // className={`w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary ${sizeClasses[size]}`}
        />
      )}

      {/* Floating Label */}
      <label
        className={`absolute  transition-all duration-200 pointer-events-none ${textarea ? " w-[98%] left-[1px] ps-3 pt-1 bg-white top-[1px] rounded-t-lg overflow-hidden" : "left-3 "}
         ${isActive ? "top-1 text-xs text-primary" : "text-sm top-3 text-gray-400"}
        `}
      >
        {label}
      </label>
      {/* <label
        className={`absolute left-3 transition-all duration-200 pointer-events-none
    ${isActive ? "top-1 text-xs text-primary" : "top-3 text-sm text-gray-400"}
  `}
      >
        {label}
      </label> */}

      {/* ✅ Error Message (Bottom Right Absolute) */}
      {error && (
        <span className="absolute -bottom-4 right-0 text-[10px] text-red-500">
          {error}
        </span>
      )}
      {warning && !error && (
        <span className="absolute -bottom-4 right-0 text-[10px] text-yellow-500">
          {warning}
        </span>
      )}
    </div>
  );
};

export default InputField;