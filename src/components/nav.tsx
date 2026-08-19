"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { personalInfo } from "@/src/data/personal";

interface NavLink {
  id: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/**
 * Floating glassmorphism navigation bar with smooth-scroll section links,
 * active-section tracking (scroll-spy) and a mobile menu.
 */
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy on the homepage.
  useEffect(() => {
    if (!isHome) return;
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id),
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 print:hidden ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "glass shadow-[0_12px_40px_-12px_rgba(139,92,246,0.35)]"
            : "border border-transparent"
        }`}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex flex-col items-center gap-1"
          aria-label="Go to homepage"
        >
          <Image
            src="/images/logo.png"
            alt="Mahmoud Shahieen logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
            priority
          />
          <span className="text-sm font-black tracking-tight text-white">
            Mahmoud<span className="text-violet-400">.dev</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = isHome && activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={hrefFor(link.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-violet-500/20 text-violet-200"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={personalInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.9)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
            aria-label="Chat with me on WhatsApp"
          >
            Hire Me
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="glass flex h-10 w-10 items-center justify-center rounded-xl text-white md:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              {isOpen ? (
                <path d="M3 3l12 12M15 3L3 15" />
              ) : (
                <path d="M2 4.5h14M2 9h14M2 13.5h14" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="mx-auto mt-2 max-w-5xl px-4 md:hidden">
          <div className="glass rounded-2xl p-3">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={hrefFor(link.id)}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={personalInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="mt-1 block rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white"
                  aria-label="Chat: Hire me on WhatsApp"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
