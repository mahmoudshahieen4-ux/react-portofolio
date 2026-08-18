"use client";

import { useInView } from "@/src/hooks/use-in-view";

type RevealVariant = "up" | "down" | "left" | "right" | "zoom" | "fade";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in milliseconds before the reveal transition starts. */
  delay?: number;
  /** Direction of the entrance transform. Defaults to "up". */
  variant?: RevealVariant;
}

/**
 * Wraps content and reveals it (with a directional slide + fade) the first
 * time it scrolls into view. Driven by IntersectionObserver — no animation
 * library required.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  });

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${inView ? "reveal-in-view" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
