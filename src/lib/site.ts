/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL once a custom domain exists;
 * on Vercel it falls back to the production URL Vercel provides.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3100");
