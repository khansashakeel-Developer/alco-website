// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";

// const FB_PIXEL_ID = process.env.FB_PIXEL_ID!; // server-only, no NEXT_PUBLIC
// const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN!;
// const FB_API_VERSION = "v20.0";

// function hash(value: string) {
//     return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
// }

// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
//         const clientIp =
//             req.headers.get("x-forwarded-for")?.split(",")[0] ||
//             req.headers.get("x-real-ip") ||
//             "";
//         const userAgent = req.headers.get("user-agent") || "";

//         const payload = {
//             data: [
//                 {
//                     event_name: body.eventName,
//                     event_time: Math.floor(Date.now() / 1000),
//                     event_id: body.eventId,
//                     event_source_url: body.eventSourceUrl,
//                     action_source: "website",
//                     user_data: {
//                         em: body.email ? [hash(body.email)] : undefined,
//                         ph: body.phone ? [hash(body.phone.replace(/\D/g, ""))] : undefined,
//                         client_ip_address: clientIp,
//                         client_user_agent: userAgent,
//                         fbp: body.fbp,
//                         fbc: body.fbc,
//                     },
//                     custom_data: body.customData, 
//                 },
//             ],
//         };

//         const res = await fetch(
//             `https://graph.facebook.com/${FB_API_VERSION}/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`,
//             {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             }
//         );

//         const result = await res.json();
//         if (!res.ok) {
//             console.error("FB CAPI error:", result);
//             return NextResponse.json({ error: result }, { status: 500 });
//         }

//         return NextResponse.json(result);
//     } catch (err) {
//         console.error("CAPI route error:", err);
//         return NextResponse.json({ error: "CAPI failed" }, { status: 500 });
//     }
// }
import crypto from "crypto";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID!;
const FB_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN!;
const FB_API_VERSION = "v21.0";

function hash(value: string) {
    return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

interface SendEventParams {
    eventName: string;
    eventSourceUrl: string;
    eventId: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    externalId?: string;
    fbp?: string;
    fbc?: string;
    customData?: Record<string, any>;
    clientIp?: string;
    userAgent?: string;
    actionSource?: string;
}

function phoneFix(p: string) {
    let d = p.replace(/\D/g, "");
    if (d.startsWith("0")) d = "92" + d.slice(1);
    if (!d.startsWith("92")) d = "92" + d;
    return d;
}

export async function sendFbConversionEvent(params: SendEventParams) {
    const payload = {
        data: [
            {
                event_name: params.eventName,
                event_time: Math.floor(Date.now() / 1000),
                event_id: params.eventId,
                event_source_url: params.eventSourceUrl,
                action_source: params.actionSource || "website",
                user_data: {
                    em: params.email ? [hash(params.email)] : undefined,
                    ph: params.phone ? [hash(phoneFix(params.phone))] : undefined,
                    fn: params.firstName ? [hash(params.firstName)] : undefined,
                    ln: params.lastName ? [hash(params.lastName)] : undefined,
                    external_id: params.externalId ? [hash(params.externalId)] : undefined,
                    country: hash("pk"),
                    client_ip_address: params.clientIp,
                    client_user_agent: params.userAgent,
                    fbp: params.fbp,
                    fbc: params.fbc,
                },
                custom_data: params.customData,
            },
        ],
        // ⚠️ DELETE test_event_code BEFORE GO-LIVE — warna production events test stream mein chale jayenge
        ...(process.env.META_TEST_EVENT_CODE && { test_event_code: process.env.META_TEST_EVENT_CODE }),
    };

    const res = await fetch(
        `https://graph.facebook.com/${FB_API_VERSION}/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }
    );

    const result = await res.json();
    if (!res.ok) {
        console.error("FB CAPI error:", result);
    }
    return result;
}