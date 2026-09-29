"use client";
import React, { useEffect, useRef } from "react";
import { BsXCircleFill, BsXLg } from "react-icons/bs";

type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Popup({ isOpen, onClose, children }: PopupProps) {
    const popupRef = useRef<HTMLDivElement>(null);

    // 👉 Outside click detect
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // 👉 ESC key close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) document.addEventListener("keydown", handleEsc);

        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] px-6 sm:px-10 py-5">
            <div
                ref={popupRef}
                // className="bg-white rounded-xl p-6 w-[90%] max-w-6xl shadow-lg animate-fadeIn border grid grid-cols-2 gap-4"
                className="bg-white rounded-xl pe-3 ps-4 py-6 sm:px-6 sm:py-8 shadow-lg animate-fadeIn border relative"
            >
                {children}
                <button className="absolute -top-3 sm:-top-2 -right-3 sm:-right-2 text-sm rounded-full bg-white cursor-pointer" 
                onClick={onClose}>
                    <BsXCircleFill size={24} className="text-gray-800" />
                </button>
            </div>
        </div>
    );
}