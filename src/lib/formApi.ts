// Form submission base path.
// - Vercel / Node hosting: "/api" (Next.js route handlers, default)
// - Static hosting (deploy/ package): "/php-api" (PHP mail handlers, set at build time)
export const FORM_API = process.env.NEXT_PUBLIC_FORM_API || "/api";
