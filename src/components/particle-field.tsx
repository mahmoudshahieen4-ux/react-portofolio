"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface ParticleFieldProps {
  className?: string;
  /** Particle density multiplier (count per ~12,000px² of canvas). Default 1. */
  density?: number;
}

/**
 * Lightweight interactive particle field rendered on a full-size canvas.
 * Particles drift and connect with nearby particles; the pointer draws
 * connecting lines to them. Respects `prefers-reduced-motion` (static frame).
 */
export default function ParticleField({
  className = "",
  density = 1,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const buildParticles = () => {
      const count = Math.min(
        140,
        Math.max(24, Math.round((width * height) / 12000) * density),
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.8 + 0.6,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDistance = 120;
      const mouseDistance = 190;

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167, 139, 250, 0.55)";
        ctx.fill();
      }

      const connect = (a: Particle, b: Particle) => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < linkDistance) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / linkDistance) * 0.28})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      };

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          connect(particles[i], particles[j]);
        }
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouseDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(196, 181, 253, ${(1 - dist / mouseDistance) * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const tick = () => {
      draw();
      rafId = requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);

    if (reducedMotion) {
      draw();
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
