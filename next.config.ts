import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Programs (old WordPress paths)
      { source: '/services/nlp-practitioner', destination: '/program/nlp-practitioner', statusCode: 301 },
      { source: '/services/nlp-master-practitioner', destination: '/program/nlp-master-practitioner', statusCode: 301 },
      { source: '/services/advanced-hypnotherapy-interventionis', destination: '/program/advanced-hypnotherapy-interventionist', statusCode: 301 },
      { source: '/services/advanced-hypnotherapy-interventionist', destination: '/program/advanced-hypnotherapy-interventionist', statusCode: 301 },
      { source: '/nlp-trainers-training-program', destination: '/program/nlp-trainers-training-program', statusCode: 301 },
      { source: '/hypnosis-trainers-training-program', destination: '/program/hypnosis-trainers-training-program', statusCode: 301 },
      { source: '/nlp-master-trainer-program', destination: '/program/nlp-master-trainer-program', statusCode: 301 },

      // Business in the Box has no page (D7): send it to Level 4
      { source: '/program/business-in-the-box', destination: '/program/nlp-trainers-training-program', statusCode: 301 },
      { source: '/programs/business-in-the-box', destination: '/program/nlp-trainers-training-program', statusCode: 301 },

      // CRM name-derived slugs -> the six real slugs
      { source: '/program/nlp-practitioner-program', destination: '/program/nlp-practitioner', statusCode: 301 },
      { source: '/program/nlp-master-practitioner-program', destination: '/program/nlp-master-practitioner', statusCode: 301 },
      { source: '/program/advanced-hypnotherapy-interventionist-training-program', destination: '/program/advanced-hypnotherapy-interventionist', statusCode: 301 },
      { source: '/program/nlp-trainers-training-and-evaluation-certification-program', destination: '/program/nlp-trainers-training-program', statusCode: 301 },
      { source: '/program/hypnosis-trainer-s-training-certification-and-evaluation-program', destination: '/program/hypnosis-trainers-training-program', statusCode: 301 },
      { source: '/program/hypnosis-trainers-training-certification-and-evaluation-program', destination: '/program/hypnosis-trainers-training-program', statusCode: 301 },

      // All Programmes hub
      { source: '/program', destination: '/programs', statusCode: 301 },
      { source: '/programmes', destination: '/programs', statusCode: 301 },
      { source: '/all-programmes', destination: '/programs', statusCode: 301 },
      { source: '/all-programs', destination: '/programs', statusCode: 301 },
      { source: '/courses', destination: '/programs', statusCode: 301 },
      // Plural level URLs. Needs one segment after /programs, so it never matches the hub itself.
      // Never add a rule whose source is '/programs' itself: the hub must return 200.
      { source: '/programs/:slug', destination: '/program/:slug', statusCode: 301 },

      // Free weekly webinar sign-up (DECISIONS v2 G7, spec A 10). Exact sources only: /webinars/:id is untouched.
      { source: '/webinar', destination: '/free-webinar', statusCode: 301 },
      { source: '/webinars', destination: '/free-webinar', statusCode: 301 },
      { source: '/free-webinars', destination: '/free-webinar', statusCode: 301 },

      // Course outline (old WordPress path). /course-outline/<slug> and /program-detail/<slug> are real
      // pages (specs C 04 and C 07) and are deliberately NOT redirected.
      { source: '/course-outline-of-nlp-practitioner-2', destination: '/course-outline/nlp-practitioner', statusCode: 301 },

      // Typo URLs found in the wild
      { source: '/testimonioal', destination: '/testimonial', statusCode: 301 },
      { source: '/audio-acces', destination: '/audio-access', statusCode: 301 },
      { source: '/services/four-clouds-mode', destination: '/services/four-clouds-model', statusCode: 301 },

      // Blog: /blog/* pattern
      { source: '/blog/:slug', destination: '/blogs/:slug', statusCode: 301 },

      // Blog: root-level old posts -> /blogs/<slug> (confirmed from sitemap)
      { source: '/pressure-comes-from-a-lack-of-preparation', destination: '/blogs/pressure-comes-from-a-lack-of-preparation', statusCode: 301 },
      { source: '/internal-pressure-awareness-reflection-and-personal-mastery', destination: '/blogs/internal-pressure-awareness-reflection-and-personal-mastery', statusCode: 301 },
      { source: '/pressure-isnt-supposed-to-break-us-its-designed-to-make-us', destination: '/blogs/pressure-isnt-supposed-to-break-us-its-designed-to-make-us', statusCode: 301 },
      { source: '/understanding-the-model-of-the-world-beliefs-and-key-decisions', destination: '/blogs/understanding-the-model-of-the-world-beliefs-and-key-decisions', statusCode: 301 },
      { source: '/the-moment-you-accept-your-struggles-the-door-to-growth-opens', destination: '/blogs/the-moment-you-accept-your-struggles-the-door-to-growth-opens', statusCode: 301 },
      { source: '/vision-depends-on-perspective-not-just-knowledge', destination: '/blogs/vision-depends-on-perspective-not-just-knowledge', statusCode: 301 },
      { source: '/push-through-tough-times-and-inspire-others', destination: '/blogs/push-through-tough-times-and-inspire-others', statusCode: 301 },
      { source: '/the-science-behind-a-positive-state-of-mind', destination: '/blogs/the-science-behind-a-positive-state-of-mind', statusCode: 301 },
      { source: '/the-weight-of-thoughts', destination: '/blogs/the-weight-of-thoughts', statusCode: 301 },
      { source: '/everything-is-hard-choose-your-hard', destination: '/blogs/everything-is-hard-choose-your-hard', statusCode: 301 },
      { source: '/the-power-of-language-transform-your-mindset-with-words', destination: '/blogs/the-power-of-language-transform-your-mindset-with-words', statusCode: 301 },
      { source: '/the-internal-representational-system-designing-your-reality', destination: '/blogs/the-internal-representational-system-designing-your-reality', statusCode: 301 },
      { source: '/the-power-of-reframing-transforming-setbacks-into-opportunities', destination: '/blogs/the-power-of-reframing-transforming-setbacks-into-opportunities', statusCode: 301 },

      // Enrol shortcuts (one copy each; the old duplicates are gone)
      { source: '/enroll-now', destination: '/?openEnroll=true', statusCode: 301 },
      { source: '/register', destination: '/?openEnroll=true', statusCode: 301 },

      // Legacy Namecheap clean-up (404s from external backlinks), targets corrected
      { source: '/practitioner', destination: '/program/nlp-practitioner', statusCode: 301 },
      { source: '/nlp-master-practitioner', destination: '/program/nlp-master-practitioner', statusCode: 301 },
      { source: '/four-clouds-model', destination: '/services/four-clouds-model', statusCode: 301 },
      { source: '/hypnosis-certification-training', destination: '/program/advanced-hypnotherapy-interventionist', statusCode: 301 },
      { source: '/advance-interventionist', destination: '/program/advanced-hypnotherapy-interventionist', statusCode: 301 },

      // D 08 C7: only after the CRM slug is renamed to deliver-engaging-high-impact-training-sessions
      // { source: '/blogs/deliver-engaging,-high-impact-training-sessions', destination: '/blogs/deliver-engaging-high-impact-training-sessions', statusCode: 301 },
    ];
  },
};

export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     // Allow local images and external URLs if needed
//     domains: [],
//     formats: ['image/avif', 'image/webp'], // add any formats you use
//   },
// };

// module.exports = nextConfig;
