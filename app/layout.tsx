import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/app/globals.css'
import Nav from "@/src/components/nav";
import ThemeSwitcher from "@/src/components/theme-switcher";
import { ThemeProvider } from "@/src/components/theme-provider";
import { DEFAULT_THEME, THEME_IDS, THEME_STORAGE_KEY } from "@/src/lib/themes";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "Mahmoud Shahieen — Front-End Developer";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: "%s | Mahmoud Issa",
  },
  description:
    "Portfolio of Mahmoud Shahieen — Front-End Developer crafting fast, accessible and modern web experiences with React, Next.js and TypeScript.",
  keywords: [
    "Mahmoud Shahieen",
    "Front-End Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
    "Cairo",
  ],
  authors: [{ name: "Mahmoud Shahieen" }],
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

// Runs before first paint so the saved theme never flashes the default.
const themeScript = `(function(){try{var key=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var allowed=${JSON.stringify(
  THEME_IDS,
)};var fallback=${JSON.stringify(
  DEFAULT_THEME,
)};var saved=window.localStorage.getItem(key);document.documentElement.setAttribute("data-theme",allowed.indexOf(saved)===-1?fallback:saved);}catch(e){document.documentElement.setAttribute("data-theme",${JSON.stringify(
  DEFAULT_THEME,
)});}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Nav />
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
