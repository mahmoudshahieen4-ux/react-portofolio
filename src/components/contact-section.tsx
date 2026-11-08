"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  Briefcase,
  CircleCheck,
  GitFork,
  Mail,
  MapPin,
  Phone,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import Reveal from "@/src/components/reveal";
import { personalInfo } from "@/src/data/personal";

type Status = "idle" | "sending" | "success" | "error";

interface Toast {
  type: "success" | "error";
  message: string;
}

interface ContactCard {
  label: string;
  value: string;
  href: string | null;
  icon: LucideIcon;
}

const CONTACT_CARDS: ContactCard[] = [
  { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: Mail },
  { label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, "")}`, icon: Phone },
  { label: "Location", value: personalInfo.location, href: null, icon: MapPin },
  { label: "LinkedIn", value: "in/mahmoud-shahieen-frontend", href: personalInfo.linkedinUrl, icon: Briefcase },
  { label: "GitHub", value: "@mahmoudshahieen4-ux", href: personalInfo.githubUrl, icon: GitFork },
];

const inputClasses =
  "w-full rounded-xl border border-line bg-text/[0.04] px-4 py-3 text-sm text-text placeholder:text-muted outline-none transition-colors focus:border-accent/70 focus:bg-text/[0.06]";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (type: Toast["type"], text: string) => {
    setToast({ type, message: text });
    window.setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name.trim() || !emailValid || !message.trim()) {
      showToast("error", "Please fill in your name, a valid email and a message.");
      return;
    }

    setStatus("sending");
    // Simulate a request — wire this up to your API route or email service.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
    showToast("success", "Thanks! Your message has been sent successfully.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-bg py-24"
      aria-label="Contact section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-72 w-[min(720px,90vw)] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Left: heading + contact info */}
        <div>
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Let&apos;s build something <span className="text-gradient">great</span>
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Have a project in mind, a role to fill, or just want to say hi?
              My inbox is always open — I&apos;ll get back to you as soon as I can.
            </p>
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CONTACT_CARDS.map((card, index) => (
              <Reveal
                key={card.label}
                delay={index * 80}
                variant="left"
                className={index === 0 ? "sm:col-span-2" : ""}
              >
                <li>
                  <a
                    href={card.href ?? "#contact"}
                    target={card.href?.startsWith("http") ? "_blank" : undefined}
                    rel={card.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={card.href ? `${card.label}: ${card.value}` : `${card.label}: ${card.value}`}
                    className={`card-lift glass flex h-full min-w-0 items-start gap-3 rounded-2xl p-4 ${
                      card.href ? "" : "pointer-events-none"
                    }`}
                  >
                    <span className="shrink-0 text-accent" aria-hidden="true">
                      <card.icon size={20} strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
                        {card.label}
                      </span>
                      <span className="mt-0.5 block text-sm font-medium text-text/85 [overflow-wrap:anywhere]">
                        {card.value}
                      </span>
                    </span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <Reveal variant="right" delay={120}>
          <form
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-6 sm:p-8"
            aria-label="Contact form"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-text/85">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  disabled={status === "sending"}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-text/85">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  disabled={status === "sending"}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-text/85">
                Message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell me about your project…"
                rows={5}
                disabled={status === "sending"}
                className={`${inputClasses} resize-none`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-shine mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-accent px-6 py-3.5 text-sm font-bold text-primary-contrast shadow-[0_14px_40px_-12px_var(--primary-glow)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                "Send Message"
              )}
            </button>

            <p className="mt-4 text-center text-xs text-muted">
              Prefer email? Write to me directly at{" "}
              <a
                href={`mailto:${personalInfo.email}`}
                className="font-semibold text-accent hover:text-accent/80"
              >
                {personalInfo.email}
              </a>
            </p>
          </form>
        </Reveal>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`anim-toast fixed bottom-24 right-6 z-[60] flex max-w-sm items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold text-white shadow-2xl ${
            toast.type === "success"
              ? "bg-emerald-600/90 backdrop-blur"
              : "bg-rose-600/90 backdrop-blur"
          }`}
        >
          <span aria-hidden="true">
            {toast.type === "success" ? (
              <CircleCheck size={20} />
            ) : (
              <TriangleAlert size={20} />
            )}
          </span>
          {toast.message}
        </div>
      )}
    </section>
  );
}