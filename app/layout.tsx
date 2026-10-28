import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muralidharan Software Solutions",
  description: "Freelance software development and AI solutions.",
  verification: {
    google: "brUyz-RbZi7u0ISCmF_JYJ_zH4EE3k2thBhyKYCwzi0",
  },
};

export const metadata: Metadata = {
  title: "Muralidharan S | Software Developer & AI/ML Enthusiast",
  description:
    "Explore Muralidharan S's portfolio featuring web development, AI/ML projects, technical skills, education, and certifications.",
  openGraph: {
    title: "Muralidharan S | Developer Portfolio",
    description:
      "Software development, web applications, AI/ML projects, and technical experience.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
