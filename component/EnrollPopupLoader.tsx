"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePopup } from "@/context/enrollPopupContext";

const EnrollPopup = dynamic(() => import("@/component/modal/popup/enrollPopup"), { ssr: false });

// Loads the enrol form code only when someone first clicks "Enrol now".
export default function EnrollPopupLoader() {
  const { isOpen } = usePopup();
  const [wasOpened, setWasOpened] = useState(false);
  useEffect(() => {
    if (isOpen) setWasOpened(true);
  }, [isOpen]);
  return wasOpened ? <EnrollPopup /> : null;
}