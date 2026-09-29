"use client";
import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight, HiOutlinePhone } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { track } from "@/libs/track";

interface FloatingChatButtonProps {
  whatsappNumber: string;
  phoneNumber: string;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  whatsappNumber,
  phoneNumber,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-end">
      {/* Options menu */}
      {showOptions && (
        <div className="flex flex-col space-y-4 mb-4 animate-slide-up">
          <Link
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp +92 336 008 2222"
            onClick={() => track('Contact', { contentName: 'whatsapp' })}
            className="bg-emerald-600 text-white h-12 w-12 flex justify-center items-center rounded-full shadow hover:bg-green-800 transition"
          >
            <FaWhatsapp size={28} />
          </Link>
          <Link
            href={`tel:${phoneNumber}`}
            aria-label="Call +92 336 008 2222"
            onClick={() => track('Contact', { contentName: 'call' })}
            className="bg-cyan-600 text-white h-12 w-12 flex justify-center items-center rounded-full shadow hover:bg-cyan-800 transition"
          >
            <HiOutlinePhone size={24} />
          </Link>
        </div>
      )}

      {/* Main button */}
      {!showOptions ? (<button
        onClick={() => setShowOptions(!showOptions)}
        aria-label="Call or WhatsApp AL&CO"
        className="bg-sky-600/80 drop-shadow-2xl bg-cover bg-right-top text-white h-12 w-12 border  flex justify-center items-center rounded-full shadow-2xl transition"
      >
        <HiOutlineChatBubbleLeftRight size={28} />
      </button>) : <button
        onClick={() => setShowOptions(false)}
        aria-label="Close"
        className="bg-black/60 drop-shadow-2xl bg-cover bg-right-top text-white h-12 w-12 flex justify-center items-center rounded-full shadow-2xl transition"
      >
        <IoMdClose size={28} />
      </button>}
    </div>
  );
};

export default FloatingChatButton;