import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/app/globals.css'
import Nav from "@/src/components/nav";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "Mahmoud Issa — Front-End Developer";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: "%s | Mahmoud Issa",
  },
  description:
    "Portfolio of Mahmoud Issa — Front-End Developer crafting fast, accessible and modern web experiences with React, Next.js and TypeScript.",
  keywords: [
    "Mahmoud Issa",
    "Front-End Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
    "Cairo",
  ],
  authors: [{ name: "Mahmoud Issa" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mahmoudshahieen4-ux.github.io",
    siteName,
    title: siteName,
    description:
      "Front-End Developer | React & TypeScript — creative, accessible, performance-first interfaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: "Front-End Developer | React & TypeScript",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav/>
        {children}
      </body>
    </html>
  );
}
