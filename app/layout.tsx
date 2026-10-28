
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://muralidharan-portfolio-3782.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Muralidharan S | Software Developer Portfolio",
    template: "%s | Muralidharan S",
  },

  description:
    "Explore Muralidharan S's software developer portfolio featuring Full Stack Web Development, React, Next.js, Python, Java, AI/ML projects, technical skills, education, and certifications.",

  applicationName: "Muralidharan S Portfolio",

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "brUyz-RbZi7u0ISCmF_JYJ_zH4EE3k2thBhyKYCwzi0",
  },

  openGraph: {
    title: "Muralidharan S | Software Developer Portfolio",
    description:
      "Discover my web development projects, AI/ML applications, technical skills, education, and certifications.",
    url: siteUrl,
    siteName: "Muralidharan S Portfolio",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Muralidharan S | Software Developer Portfolio",
    description:
      "Explore my Full Stack Web Development, Python, React, Next.js, and AI/ML projects.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  keywords: [
    "Muralidharan S",
    "Muralidharan Software Developer",
    "Software Developer Portfolio",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "Java Developer",
    "AI ML Projects",
    "Web Development Projects",
  ],
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
