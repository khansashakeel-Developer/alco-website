"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  //   size?: "sm" | "md" | "lg";
};

export default function SelectField({
  label,
  options,
  value,
  onChange,
  error
  //   size = "md",
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  const isActive = focus || value;

  //   const sizeClasses = {
  //     sm: "px-2 pt-4 pb-1 text-sm",
  //     md: "px-3 pt-5 pb-2 text-base",
  //     lg: "px-4 pt-6 pb-3 text-lg",
  //   };

  // close on outside click
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
        setFocus(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const borderClass = error
    ? "border-red-500"
    : "border-gray-300 focus:border-primary";

  return (
    <div ref={ref} className="relative w-full">
      {/* Select Box */}
      <div
        onClick={() => {
          setOpen(!open);
          setFocus(true);
        }}
        className={`relative w-full min-h-12 border ${borderClass} rounded-lg cursor-pointer bg-white px-3 pt-5 pb-1 text-base flex items-center justify-between`}
      >
        <span className={`${!value && "text-gray-400"} font-light text-sm`}>
          {selected?.label || ""}
        </span>
        <span
          className={`transition-transform duration-300 text-gray-600 absolute top-[25%] right-4 ${open ? "rotate-180" : ""
            }`}
        >
          <IoMdArrowDropdown size={26} />
        </span>
      </div>

      {/* Floating Label */}
      <label
        className={`absolute left-3 transition-all duration-200 pointer-events-none
        ${isActive ? "top-1 text-xs text-primary" : "top-3 text-sm text-gray-400"}
        `}
      >
        {label}
      </label>

      {/* Dropdown */}
      <div
        className={`absolute w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50 transition-all duration-300 origin-top
        ${open
            ? "max-h-60 opacity-100 scale-y-100 overflow-y-auto"
            : "max-h-0 opacity-0 scale-y-95 overflow-hidden"
          }
      `}
      >
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => {
              onChange?.(opt.value);
              setOpen(false);
            }}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer transition text-sm text-gray-600"
          >
            {opt.label}
          </div>
        ))}
      </div>

      {/* ✅ Error Message */}
      {error && (
        <span className="absolute -bottom-4 right-0 text-[10px] text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}