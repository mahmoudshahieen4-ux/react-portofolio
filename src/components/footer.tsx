import { personalInfo } from "@/src/data/personal";

const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#06060d]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="text-lg font-black text-white">
              Mahmoud<span className="text-violet-400">.dev</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-zinc-500">
              Front-End Developer crafting modern, accessible and fast web
              experiences with React, Next.js and TypeScript.
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-400">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-3">
            <li>
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-zinc-300 transition-colors hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-zinc-300 transition-colors hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label={`Email ${personalInfo.email}`}
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-zinc-300 transition-colors hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 7L2 7" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-xs text-zinc-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p>Built with Next.js 16 · React 19 · TypeScript · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}