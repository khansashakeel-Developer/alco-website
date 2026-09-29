function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2];
}

type TrackData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  value?: number;
  contentName?: string;
};

export async function track(eventName: string, data: TrackData = {}) {
  const eventId = crypto.randomUUID();

  // 1. Browser pixel
  if (typeof window !== "undefined" && window.fbq) {
    const params: Record<string, any> = {};
    if (data.value) { params.value = data.value; params.currency = "USD"; }
    if (data.contentName) { params.content_name = data.contentName; }
    window.fbq("track", eventName, params, { eventID: eventId });
  }

  // 2. Server CAPI - MUST use same eventId for dedupe
  try {
    await fetch("/api/fb-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl: typeof window !== "undefined" ? window.location.href : "",
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        ...((data.value || data.contentName) && {
          customData: {
            ...(data.value && { value: data.value, currency: "USD" }),
            ...(data.contentName && { content_name: data.contentName }),
          },
        }),
      }),
    });
  } catch (e) {
    console.error("CAPI send failed", e);
  }
}