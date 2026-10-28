import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://muralidharan-portfolio-3782.vercel.app/sitemap.xml",
    host: "https://muralidharan-portfolio-3782.vercel.app",
  };
}
