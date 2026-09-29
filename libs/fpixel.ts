export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID!;

declare global {
  interface Window {
    fbq: any;
  }
}

export const pageview = () => {
  if (typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
};

export const event = (name: string, options: Record<string, any> = {}) => {
  if (typeof window.fbq === "function") {
    window.fbq("track", name, options);
  }
};

export function trackLeadWithCapi(data: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    contentName?: string;
}) {
    const eventId = crypto.randomUUID();

    // The pixel loads lazyOnload (T3): guard so an early lead never throws.
    if (typeof window.fbq === "function") {
        window.fbq(
            "track",
            "Lead",
            { content_name: data.contentName },
            { eventID: eventId }
        );
    }

    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");

    fetch("/api/fb-conversion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            eventName: "Lead",
            eventSourceUrl: window.location.href,
            eventId,
            email: data.email,
            phone: data.phone,
            firstName: data.firstName,
            lastName: data.lastName,
            fbp,
            fbc,
            customData: { content_name: data.contentName },
        }),
    });
}

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2];
}