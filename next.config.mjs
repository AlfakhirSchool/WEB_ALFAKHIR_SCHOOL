/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a production build for testing live beside a running `next dev` (NEXT_DIST_DIR=.next-test next build).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // pdfkit reads its font metrics from its own folder at runtime, so it must stay a real node_modules package.
  serverExternalPackages: ["pdfkit", "sharp"],
  // Files the PDF routes read at runtime (Vercel only ships what tracing finds): Poppins fonts, school logos, pdfkit data.
  outputFileTracingIncludes: {
    "/api/dokumen": ["./assets/fonts/**", "./public/logo-sd.webp", "./public/logo-smp.png", "./node_modules/pdfkit/js/data/**"],
    "/api/admin/students/*/pdf": ["./assets/fonts/**", "./public/logo-sd.webp", "./public/logo-smp.png", "./node_modules/pdfkit/js/data/**"],
  },
};
export default nextConfig;
