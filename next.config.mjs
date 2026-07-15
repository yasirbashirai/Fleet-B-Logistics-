// Two build modes:
// 1. Default (Vercel / Node): full Next.js with API routes + redirects.
// 2. STATIC_EXPORT=1 (deploy/ package for Apache/cPanel hosting):
//    static HTML export; redirects and forms are handled by .htaccess + php-api.
const isStaticExport = process.env.STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        // Old routes were consolidated into the 6 main pages —
        // redirects keep every previously shared link (and the welcome email) working.
        async redirects() {
          return [
            { source: "/quote", destination: "/contact", permanent: true },
            { source: "/apply", destination: "/owner-operators#apply", permanent: true },
            { source: "/onboarding", destination: "/owner-operators#onboarding", permanent: true },
            { source: "/resources", destination: "/owner-operators#resources", permanent: true },
            { source: "/reviews", destination: "/about#reviews", permanent: true },
            { source: "/blog", destination: "/owner-operators#faq", permanent: true },
            { source: "/blog/asset-based-carrier-vs-freight-broker", destination: "/services#insights", permanent: true },
            { source: "/blog/:slug", destination: "/owner-operators#faq", permanent: true },
            { source: "/services/:slug", destination: "/services#:slug", permanent: true },
            { source: "/areas", destination: "/services#areas", permanent: true },
            { source: "/areas/:slug", destination: "/services#areas", permanent: true },
            { source: "/industries", destination: "/services#industries", permanent: true },
            { source: "/industries/:slug", destination: "/services#industries", permanent: true },
          ];
        },
      }),
};

export default nextConfig;
