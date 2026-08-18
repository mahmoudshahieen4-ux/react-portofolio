"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { projects as defaultProjects } from "@/src/data/projects";
import { personalInfo } from "@/src/data/personal";
import type { Project } from "@/src/types/project";

import styles from "./3d-slider.module.css";

interface ThreeDSliderProps {
  /** Projects rendered in the ring. Defaults to `src/data/projects.ts`. */
  projects?: Project[];
  /** Whether the ring auto-rotates. Defaults to `true`. */
  autoPlay?: boolean;
  /** Milliseconds between auto-rotation steps. Defaults to `3200`. */
  autoPlayInterval?: number;
}

export default function ThreeDSlider({
  projects: items = defaultProjects,
  autoPlay = true,
  autoPlayInterval = 3200,
}: ThreeDSliderProps) {
  const count = items.length;
  const angleStep = useMemo(() => (count > 0 ? 360 / count : 0), [count]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const dragStartX = useRef<number | null>(null);
  const userPausedRef = useRef(!autoPlay);

  // Respect the OS-level "reduce motion" preference.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  // Auto-rotation loop.
  useEffect(() => {
    if (prefersReducedMotion || !isPlaying || count < 2) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, autoPlayInterval);
    return () => window.clearInterval(id);
  }, [autoPlayInterval, count, isPlaying, prefersReducedMotion]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % count) + count) % count);
    },
    [count],
  );

  const pause = useCallback(() => setIsPlaying(false), []);
  const resume = useCallback(() => {
    if (!userPausedRef.current) setIsPlaying(true);
  }, []);

  const togglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      userPausedRef.current = !next;
      return next;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    // Only act when the section itself is focused (children keep their own keys).
    if (event.target !== sectionRef.current) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % count);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + count) % count);
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      togglePlay();
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    // Ignore drags that start on the control buttons.
    if ((event.target as HTMLElement).closest(`.${styles.controls}`)) return;
    dragStartX.current = event.clientX;
    setIsPlaying(false);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 40) return;
    setActiveIndex((prev) =>
      delta < 0 ? (prev + 1) % count : (prev - 1 + count) % count,
    );
  };

  if (count === 0) {
    return (
      <section className={styles.section}>
        <p className={styles.empty}>
          No projects yet — add entries in src/data/projects.ts.
        </p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={styles.section}
      aria-label="Featured projects"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <div className={styles.banner}>
        <h1 className={styles.title} data-content="PORTFOLIO">
          PORTFOLIO
        </h1>

        {/* 3D ring — `--quantity` + per-item `--position` drive the geometry. */}
        <div
          className={styles.slider}
          aria-live="off"
          style={
            {
              "--quantity": count,
              transform: `perspective(1000px) rotateX(-16deg) rotateY(${-activeIndex * angleStep}deg)`,
            } as React.CSSProperties
          }
        >
          {items.map((project, index) => (
            <article
              key={project.id}
              className={styles.item}
              style={{ "--position": index + 1 } as React.CSSProperties}
            >
              <div className={styles.card}>
                <div className={styles.cardInner}>
                  {/* Whole thumbnail links to the live demo (new tab). */}
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mediaLink}
                    aria-label={`Open live demo of ${project.title}`}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} thumbnail`}
                      fill
                      sizes="(max-width: 767px) 55vw, (max-width: 1023px) 25vw, 20vw"
                      className={styles.media}
                    />
                  </Link>

                  <div className={styles.overlay}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <ul
                      className={styles.techList}
                      aria-label={`Technologies used in ${project.title}`}
                    >
                      {project.techStack.map((tech) => (
                        <li key={tech} className={styles.techChip}>
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <p className={styles.desc}>{project.description}</p>
                    <div className={styles.actions}>
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.demoBtn}
                      >
                        Live Demo
                      </Link>
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.codeBtn}
                      >
                        GitHub
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Personal info / hero author block. */}
        <div className={styles.content}>
          <div className={styles.author}>
            <p className={styles.eyebrow}>Hello, I am</p>
            <h2 className={styles.name}>{personalInfo.name}</h2>
            <p className={styles.role}>{personalInfo.headline}</p>
            <ul className={styles.stackList} aria-label="Main technology stack">
              {personalInfo.mainTechStack.map((tech) => (
                <li key={tech} className={styles.stackChip}>
                  {tech}
                </li>
              ))}
            </ul>
            <ul className={styles.contactList}>
              <li>
                <a className={styles.contactLink} href={`mailto:${personalInfo.email}`}>
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a
                  className={styles.contactLink}
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                >
                  {personalInfo.phone}
                </a>
              </li>
              <li>
                <span className={styles.contactText}>
                  Location: {personalInfo.location}
                </span>
              </li>
              <li>
                <a
                  className={styles.contactLink}
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  className={styles.contactLink}
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Controls: prev / dots / play / next. */}
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={() => setActiveIndex((prev) => (prev - 1 + count) % count)}
            aria-label="Previous project"
            disabled={count < 2}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>

          <div className={styles.dots}>
            {items.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}: ${project.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.playBtn}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause auto-rotation" : "Play auto-rotation"}
          >
            {isPlaying ? (
              <Pause size={22} aria-hidden="true" />
            ) : (
              <Play size={22} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            className={styles.arrowBtn}
            onClick={() => setActiveIndex((prev) => (prev + 1) % count)}
            aria-label="Next project"
            disabled={count < 2}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
