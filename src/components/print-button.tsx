"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.9)] transition-transform hover:-translate-y-0.5"
    >
      <Printer size={16} strokeWidth={2} aria-hidden="true" />
      Download PDF / Print
    </button>
  );
}