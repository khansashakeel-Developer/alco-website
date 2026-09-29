// ✅ api.ts — with Public API support (no token required)
import axios from "axios";
// import { LoginData, RegisterData, UpdateUserData } from "@/types/apiType";

// ─────────────────────────────────────────────
// 🔐 PRIVATE API — Token Required (CRM/Admin)
// ─────────────────────────────────────────────
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // withCredentials: false,
});

// Token auto attach
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 401 pe refresh token try karo, fail ho toh logout
let isRefreshing = false;

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("refresh_token");
                window.location.href = "/auth";
                return Promise.reject(error);
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refresh_token = localStorage.getItem("refresh_token");

                if (!refresh_token) {
                    throw new Error("No refresh token");
                }

                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
                    { refresh_token }
                );

                const newAccessToken = res.data.data.access_token;
                const newRefreshToken = res.data.data.refresh_token;

                localStorage.setItem("token", newAccessToken);
                localStorage.setItem("refresh_token", newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                isRefreshing = false;
                return API(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("refresh_token");
                window.location.href = "/auth";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// ─────────────────────────────────────────────
// 🌐 PUBLIC API — No Token Required (Website)
// ─────────────────────────────────────────────
export const PUBLIC_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: false,
});

// ─────────────────────────────────────────────
// Auth APIs
// ─────────────────────────────────────────────
// export const loginUser = (data: LoginData) =>
//   API.post("/api/auth/auth", data);
// export const registerUser = (data: RegisterData) =>
//   API.post("/api/auth/register", data);
// export const forgotPassword = (data: { email: string }) =>
//   API.post("/api/auth/forgot-password", data);
// export const resetPassword = (data: {
//   email: string;
//   otp: string;
//   newPassword: string;
// }) => API.post("/api/auth/reset-password", data);
// export const getMe = () => API.get("/api/auth/me");



// ─────────────────────────────────────────────
// User Profile APIs
// ─────────────────────────────────────────────
// export const getAllUsersForRole = () => API.get("/api/users");
// export const getProfile = () => API.get("/api/users/profile");
// export const updateProfile = (data: { name: string }) =>
//   API.patch("/api/users/profile", data);
// export const changePassword = (data: {
//   oldPassword: string;
//   newPassword: string;
// }) => API.patch("/api/users/change-password", data);
// export const deleteMyAccount = () => API.delete("/api/users/delete-account");
// ─────────────────────────────────────────────
// Programs APIs
// ─────────────────────────────────────────────
export const getProgramsPublic = () => PUBLIC_API.get("/api/v1/programs/name");

// ─────────────────────────────────────────────
// Lead APIs
// ─────────────────────────────────────────────
// export const getAllLeads = (params?: any) =>
//   API.get("/api/v1/leads", { params });// ✅ Public - no auth
export const createLead = (data: any) => PUBLIC_API.post("/api/v1/leads", data);
export const createLeadContact = (data: {
    first_name: string;
    last_name?: string;
    email: string;
    phone?: string;
    query?: string;
    source?: string;
    turnstileToken?: string;
    fbc?: string | null;   // ✅ add karo
    fbp?: string | null;   // ✅ add karo
}) => PUBLIC_API.post("/api/v1/leads/contact", data);
export const createProgramLead = (data: {
    name: string;
    email: string;
    phone: string;
    programId: string;
    turnstileToken: string;
}) => PUBLIC_API.post("/api/v1/leads/program", data);
// export const updateLead = (id: string, data: any) =>
//   API.put(`/api/v1/leads/${id}`, data);
// export const deleteLead = (id: string) => API.delete(`/api/v1/leads/${id}`);
// export const assignLead = (id: string, data: any) =>
//   API.post(`/api/v1/leads/${id}/assign`, data);
// export const convertLead = (id: string) =>
//   API.post(`/api/v1/leads/${id}/convert`);
// export const markLostLead = (id: string, data: any) =>
//   API.post(`/api/v1/leads/${id}/mark-lost`, data);
// export const getActivitiesLead = (id: string) =>
//   API.get(`/api/v1/leads/${id}/activities`);
// export const addActivityLead = (id: string, data: any) =>
//   API.post(`/api/v1/leads/${id}/activities`, data);
// export const getLeadsStats = (userId?: string) =>
//   API.get("/api/v1/leads/stats", {
//     params: userId ? { userId } : {},
//   });

// ─────────────────────────────────────────────
// Blog APIs — PUBLIC (No Token Required)
// ─────────────────────────────────────────────
export const getBlogs = (params?: any) =>
    PUBLIC_API.get("/api/v1/blogs/public", { params });

export const getBlogBySlug = (slug: string) =>
    PUBLIC_API.get(`/api/v1/blogs/public/${slug}`);

export const verifyAudioPin = (pin: string) =>
    API.post("/api/v1/audio-access/verify-pin", { pin });

export const requestAudioAccess = (data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    programsRequested: string[];
    source?: "access-request" | "resource" | "register" | "other";
}) => API.post("/api/v1/audio-access/request", data);

export default API;


// The CRM accepts only these lead sources; anything else is rejected and the lead is lost.
// Unknown values (for example a campaign's utm_source) are mapped to "utm". Review 25 Sep 2026.
export const LEAD_SOURCES = ["utm", "referral", "social", "facebook", "instagram", "google", "organic", "enroll", "contact", "webinar", "frontforce", "lms", "crm", "resource", "register", "chatbot", "other"] as const;
const SOURCE_ALIASES: Record<string, string> = {
  fb: "facebook", meta: "facebook", ig: "instagram", insta: "instagram",
  gbp: "google", gmb: "google", google_business: "google", googlemaps: "google", maps: "google",
  whatsapp: "social", wa: "social", linkedin: "social", youtube: "social", tiktok: "social",
};
export const normalizeSource = (raw: string | null | undefined, fallback: string): string => {
  if (!raw) return fallback;
  const v = raw.trim().toLowerCase();
  if ((LEAD_SOURCES as readonly string[]).includes(v)) return v;
  if (SOURCE_ALIASES[v]) return SOURCE_ALIASES[v];
  return "utm";
};
