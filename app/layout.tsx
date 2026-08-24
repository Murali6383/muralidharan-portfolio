import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MURALIDHARAN S | Software Engineer & Web Developer",
  description:
    "Portfolio of Muralidharan S, a Computer Science Engineering student and software developer building web, AI/ML, and mobile applications.",
  generator: "v0.app",
  openGraph: {
    title: "MURALIDHARAN S | Software Engineer & Web Developer",
    description:
      "Portfolio of Muralidharan S, a Computer Science Engineering student and software developer building web, AI/ML, and mobile applications.",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070b12",
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
