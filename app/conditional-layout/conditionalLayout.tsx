"use client";

import { usePathname } from "next/navigation";
import { PopupProvider } from "@/context/enrollPopupContext";
import EnrollPopup from "@/component/modal/popup/enrollPopup";
import FloatingChatButton from "@/component/FloatingChatButton";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { Toaster } from "react-hot-toast";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout =
    pathname.startsWith("/admin") || pathname === "/thank-you" || pathname === "/maintenance";

  return (
    <>
      <PopupProvider>
        {!hideLayout && <Navbar />}
        {children}
        <EnrollPopup />
        {/* D8: the only linked number is +92 336 008 2222 */}
        <FloatingChatButton whatsappNumber="923360082222" phoneNumber="+923360082222" />
        {!hideLayout && <Footer />}
      </PopupProvider>
      <Toaster />
    </>
  );
}
