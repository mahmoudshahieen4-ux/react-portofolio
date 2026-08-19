"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

import { personalInfo } from "@/src/data/personal";

// Heavy canvas animation — code-split so it never blocks first paint.
const ParticleField = dynamic(() => import("@/src/components/particle-field"), {
  ssr: false,
});

const ROLES = [
  "Front-End Developer",
  "React + TypeScript Engineer",
  "Next.js Specialist",
  "AI & ML Student",
];

const FLOATING_BADGES = [
  { label: "React", className: "left-[6%] top-[24%]", delay: "0s" },
  { label: "Next.js", className: "right-[8%] top-[18%]", delay: "1.2s" },
  { label: "TypeScript", className: "right-[12%] bottom-[26%]", delay: "0.6s" },
  { label: "Tailwind CSS", className: "left-[9%] bottom-[32%]", delay: "1.8s" },
  { label: "ASP.NET Core", className: "right-[3%] top-[46%]", delay: "2.4s" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070f] text-white"
      aria-label="Introduction"
    >
      {/* Interactive particle background */}
      <ParticleField className="absolute inset-0 h-full w-full opacity-70" />

      {/* Aurora blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="animate-blob absolute -left-24 top-10 h-80 w-80 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="animate-blob absolute right-0 top-1/3 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl [animation-delay:3s]" />
        <div className="animate-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-600/15 blur-3xl [animation-delay:6s]" />
      </div>

      {/* Floating skill badges (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {FLOATING_BADGES.map((badge) => (
          <span
            key={badge.label}
            className={`animate-float glass absolute rounded-full px-4 py-2 text-sm font-semibold text-violet-100 ${badge.className}`}
            style={{ animationDelay: badge.delay }}
          >
            {badge.label}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-28 pt-32 text-center">
        <p
          className="anim-fade-up text-sm font-medium uppercase tracking-[0.35em] text-violet-300/90"
          style={{ animationDelay: "0.05s" }}
        >
          Hello, I&apos;m
        </p>

        <h1
          className="anim-fade-up mt-4 text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl"
          style={{ animationDelay: "0.15s" }}
        >
          {personalInfo.name}
        </h1>

        <p
          className="anim-fade-up mt-5 min-h-[2.5rem] text-xl font-semibold sm:text-3xl"
          style={{ animationDelay: "0.25s" }}
        >
          <span key={roleIndex} className="anim-word text-gradient">
            {ROLES[roleIndex]}
          </span>
        </p>

        <p
          className="anim-fade-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          style={{ animationDelay: "0.35s" }}
        >
          I craft fast, accessible and delightful web experiences — from
          pixel-perfect React interfaces to full-stack features — with a growing
          passion for AI &amp; machine learning.
        </p>

        {/* CTA row */}
        <div
          className="anim-fade-up mt-9 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="#projects"
            className="btn-shine rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-[0_14px_40px_-12px_rgba(139,92,246,0.95)] transition-transform hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <Link
            href="/resume"
            className="glass rounded-full px-7 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Download Resume
          </Link>
          <a
            href={personalInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact me on WhatsApp"
            className="rounded-full border border-white/15 px-7 py-3 text-sm font-bold text-zinc-200 transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
          >
            Contact Me
          </a>
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-0.5"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
        </div>

        {/* Availability pill */}
        <div
          className="anim-fade-up mt-10 flex items-center justify-center gap-2 text-sm text-zinc-400"
          style={{ animationDelay: "0.55s" }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          Available for freelance &amp; full-time roles
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-white/25 p-2">
          <span className="anim-wheel h-2.5 w-1 rounded-full bg-violet-300" />
        </span>
      </a>
    </section>
  );
}
