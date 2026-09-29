import { NextRequest, NextResponse } from "next/server";
import { sendFbConversionEvent } from "@/libs/fbConversionApi";

export async function POST(req: NextRequest) {
    try {
         // ✅ Auth check — sirf tab jab request browser se nahi, backend se aa rahi ho
        const internalSecret = req.headers.get("x-internal-secret");
        const isInternalCall = !!internalSecret;

        if (isInternalCall && internalSecret !== process.env.INTERNAL_CAPI_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const body = await req.json();
        const clientIp =
            req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") ||
            "";
        const userAgent = req.headers.get("user-agent") || "";

        // 👇 cookie fallback yahan add karo
        const fbp = body.fbp || req.cookies.get("_fbp")?.value;
        const fbc = body.fbc || req.cookies.get("_fbc")?.value;

        const result = await sendFbConversionEvent({
    eventName: body.eventName,
    eventSourceUrl: body.eventSourceUrl,
    eventId: body.eventId,
    email: body.email,
    phone: body.phone,
    firstName: body.firstName,
    lastName: body.lastName,
    fbp,
    fbc,
    customData: body.customData,
    clientIp,
    userAgent,
    actionSource: body.actionSource,   // ✅ add karo
});

        return NextResponse.json(result);
    } catch (err) {
        console.error("CAPI route error:", err);
        return NextResponse.json({ error: "CAPI failed" }, { status: 500 });
    }
}

// import crypto from 'crypto';
 
// const hash = (v) =>
//   v ? crypto.createHash('sha256')
//         .update(String(v).trim().toLowerCase())
//         .digest('hex')
//     : undefined;
 
// // LEAD phone numbers (our customers are in Pakistan) must be sent as
// // 923001234567 - no plus sign, no leading zero. This is for Meta matching
// // only and is unrelated to the contact numbers displayed on the site.
// const phoneFix = (p) => {
//   if (!p) return undefined;
//   let d = String(p).replace(/\D/g, '');
//   if (d.startsWith('0'))  d = '92' + d.slice(1);
//   if (!d.startsWith('92')) d = '92' + d;
//   return d;
// };
 
// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();
 
//   const {
//     eventName, eventId, email, phone, firstName, lastName,
//     sourceUrl, value, contentName, actionSource, fbc, fbp
//   } = req.body;
 
//   const c = req.headers.cookie || '';
//   const cookie = (n) => c.match(new RegExp(`${n}=([^;]+)`))?.[1];
 
//   const payload = {
//     data: [{
//       event_name: eventName,
//       event_time: Math.floor(Date.now() / 1000),
//       event_id: eventId,
//       action_source: actionSource || 'website',
//       event_source_url: sourceUrl,
//       user_data: {
//         em: hash(email),
//         ph: hash(phoneFix(phone)),
//         fn: hash(firstName),
//         ln: hash(lastName),
//         country: hash('pk'),
//         fbp: fbp || cookie('_fbp'),
//         fbc: fbc || cookie('_fbc'),
//         client_ip_address: (req.headers['x-forwarded-for'] || '').split(',')[0],
//         client_user_agent: req.headers['user-agent']
//       },
//       ...((value || contentName) && {
//         custom_data: {
//           ...(value && { value, currency: 'USD' }),
//           ...(contentName && { content_name: contentName })
//         }
//       })
//     }],
//     test_event_code: process.env.META_TEST_EVENT_CODE   // DELETE BEFORE GO-LIVE
//   };
 
//   const r = await fetch(
//     `https://graph.facebook.com/v21.0/${process.env.NEXT_PUBLIC_FB_PIXEL_ID}/events` +
//     `?access_token=${process.env.META_ACCESS_TOKEN}`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload)
//     }
//   );
 
//   return res.status(200).json(await r.json());
// }
