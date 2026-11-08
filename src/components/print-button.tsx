"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-bold text-primary-contrast shadow-[0_10px_30px_-10px_var(--primary-glow)] transition-transform hover:-translate-y-0.5"
    >
      <Printer size={16} strokeWidth={2} aria-hidden="true" />
      Download PDF / Print
    </button>
  );
}