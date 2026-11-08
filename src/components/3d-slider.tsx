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
  /**
   * Milliseconds a card takes to reach the front while the ring rotates
   * continuously. Defaults to `3200`.
   */
  autoPlayInterval?: number;
}

const DEGREES_PER_DRAG_CARD = 180;
const EASE_TIME_CONSTANT_MS = 110;
const HIDE_CARD_AFTER = 94;
const FADE_CARD_AFTER = 82;

type Mode = "auto" | "ease" | "paused";

export default function ThreeDSlider({
  projects: items = defaultProjects,
  autoPlay = true,
  autoPlayInterval = 3200,
}: ThreeDSliderProps) {
  const count = items.length;
  const angleStep = useMemo(() => (count > 0 ? 360 / count : 0), [count]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const sliderRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const shadeRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // Motion state lives in refs: the ring is animated every frame outside of
  // React rendering, so continuous rotation never re-renders the tree.
  const angleRef = useRef(0);
  const targetRef = useRef(0);
  const modeRef = useRef<Mode>(autoPlay ? "auto" : "paused");
  const playingRef = useRef(autoPlay);
  const countRef = useRef(count);
  const angleStepRef = useRef(angleStep);
  const speedRef = useRef(0);
  const activeIndexRef = useRef(0);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const tickRef = useRef<(timestamp: number) => void>(() => {});
  const dragRef = useRef<{
    startX: number;
    startAngle: number;
    dragging: boolean;
  } | null>(null);

  // Paint the ring position and the per-card depth shading.
  const renderFrame = useCallback(() => {
    const step = angleStepRef.current;
    if (step <= 0) return;
    const angle = angleRef.current;

    for (let index = 0; index < countRef.current; index += 1) {
      const item = itemRefs.current[index];
      if (!item) continue;

      // Signed shortest distance of this card from the front of the ring.
      const delta = ((((index * step - angle + 180) % 360) + 360) % 360) - 180;
      const distance = Math.abs(delta);

      item.style.setProperty("--delta", `${delta.toFixed(2)}deg`);
      const opacity =
        distance >= HIDE_CARD_AFTER
          ? 0
          : distance > FADE_CARD_AFTER
            ? (HIDE_CARD_AFTER - distance) / (HIDE_CARD_AFTER - FADE_CARD_AFTER)
            : 1;
      item.style.opacity = opacity.toFixed(2);
      item.style.pointerEvents = opacity < 0.5 ? "none" : "";

      const shade = shadeRefs.current[index];
      if (shade) {
        shade.style.opacity = Math.min(0.55, distance / 150).toFixed(3);
      }
    }

    const total = countRef.current;
    const nearest = ((Math.round(angle / step) % total) + total) % total;
    if (nearest !== activeIndexRef.current) {
      activeIndexRef.current = nearest;
      setActiveIndex(nearest);
    }
  }, []);

  const tick = useCallback(
    (timestamp: number) => {
      const last = lastTsRef.current;
      const dt = last ? Math.min(timestamp - last, 64) : 16;
      lastTsRef.current = timestamp;

      if (modeRef.current === "auto") {
        angleRef.current += (speedRef.current * dt) / 1000;
      } else if (modeRef.current === "ease") {
        const diff = targetRef.current - angleRef.current;
        if (Math.abs(diff) < 0.05) {
          angleRef.current = targetRef.current;
          modeRef.current = playingRef.current ? "auto" : "paused";
        } else {
          angleRef.current += diff * (1 - Math.exp(-dt / EASE_TIME_CONSTANT_MS));
        }
      }

      renderFrame();

      if (modeRef.current === "auto" || modeRef.current === "ease") {
        rafRef.current = window.requestAnimationFrame(tickRef.current);
      } else {
        rafRef.current = 0;
        lastTsRef.current = 0;
      }
    },
    [renderFrame],
  );

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const startLoop = useCallback(() => {
    if (rafRef.current) return;
    lastTsRef.current = 0;
    rafRef.current = window.requestAnimationFrame(tick);
  }, [tick]);

  const stopLoop = useCallback(() => {
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    lastTsRef.current = 0;
  }, []);

  // Stop and settle on the card nearest to the viewer.
  const pause = useCallback(() => {
    playingRef.current = false;
    setIsPlaying(false);
    const step = angleStepRef.current;
    if (step > 0) {
      targetRef.current = Math.round(angleRef.current / step) * step;
      modeRef.current = "ease";
      startLoop();
    } else {
      modeRef.current = "paused";
    }
  }, [startLoop]);

  const togglePlay = useCallback(() => {
    if (playingRef.current) {
      pause();
      return;
    }
    playingRef.current = true;
    setIsPlaying(true);
    modeRef.current = "auto";
    startLoop();
  }, [pause, startLoop]);

  // Rotate to a specific card via the shortest path on the ring.
  const goTo = useCallback(
    (index: number) => {
      const step = angleStepRef.current;
      if (step <= 0) return;
      const desired = index * step;
      const delta = (((desired - angleRef.current) % 360) + 540) % 360 - 180;
      playingRef.current = false;
      setIsPlaying(false);
      targetRef.current = angleRef.current + delta;
      modeRef.current = "ease";
      startLoop();
    },
    [startLoop],
  );

  const stepBy = useCallback(
    (direction: 1 | -1) => {
      const step = angleStepRef.current;
      if (step <= 0) return;
      playingRef.current = false;
      setIsPlaying(false);
      targetRef.current =
        Math.round(angleRef.current / step) * step + direction * step;
      modeRef.current = "ease";
      startLoop();
    },
    [startLoop],
  );

  // Keep the motion constants in sync with props/data.
  useEffect(() => {
    countRef.current = count;
    angleStepRef.current = angleStep;
    speedRef.current =
      angleStep > 0 && autoPlayInterval > 0
        ? angleStep / (autoPlayInterval / 1000)
        : 0;
    renderFrame();
  }, [angleStep, autoPlayInterval, count, renderFrame]);

  // Respect the OS-level "reduce motion" preference (no perpetual rotation).
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedMotionRef.current = mediaQuery.matches;
      if (!mediaQuery.matches) return;
      playingRef.current = false;
      setIsPlaying(false);
      const step = angleStepRef.current;
      if (step > 0) {
        angleRef.current = Math.round(angleRef.current / step) * step;
      }
      targetRef.current = angleRef.current;
      modeRef.current = "paused";
      stopLoop();
      renderFrame();
    };
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, [renderFrame, stopLoop]);

  // Start rotating on mount (unless paused / reduced motion).
  useEffect(() => {
    renderFrame();
    if (playingRef.current && !reducedMotionRef.current && count > 1) {
      startLoop();
    }
    return stopLoop;
  }, [count, renderFrame, startLoop, stopLoop]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    // Only act when the section itself is focused (children keep their own keys).
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepBy(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepBy(-1);
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      togglePlay();
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    // Ignore drags that start on the control buttons (the generated CSS-module
    // class starts with a digit, so it cannot be used in a selector).
    if (controlsRef.current?.contains(event.target as Node)) return;
    dragRef.current = {
      startX: event.clientX,
      startAngle: angleRef.current,
      dragging: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    if (!drag.dragging) {
      if (Math.abs(dx) < 6) return;
      drag.dragging = true;
      playingRef.current = false;
      setIsPlaying(false);
      modeRef.current = "paused";
      stopLoop();
    }
    const step = angleStepRef.current;
    if (step <= 0) return;
    angleRef.current = drag.startAngle - (dx * step) / DEGREES_PER_DRAG_CARD;
    renderFrame();
  };

  // Release settles the ring on the nearest card and stays paused.
  const handlePointerUp = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag?.dragging) return;
    const step = angleStepRef.current;
    if (step <= 0) return;
    targetRef.current = Math.round(angleRef.current / step) * step;
    modeRef.current = "ease";
    startLoop();
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
      id="projects"
      className={styles.section}
      aria-label="Featured projects"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className={styles.banner}>
        <h1 className={styles.title} data-content="PORTFOLIO">
          PORTFOLIO
        </h1>

        {/* 3D ring — `--quantity` + per-item `--position` drive the geometry.
            The transform is painted imperatively by the rAF loop below. */}
        <div
          ref={sliderRef}
          className={styles.slider}
          aria-live="off"
          style={{ "--quantity": count } as React.CSSProperties}
        >
          {items.map((project, index) => {
            const facing = (((index * angleStep) % 360) + 360) % 360;
            const distance = Math.min(facing, 360 - facing);
            const initialOpacity =
              distance >= HIDE_CARD_AFTER
                ? 0
                : distance > FADE_CARD_AFTER
                  ? (HIDE_CARD_AFTER - distance) /
                    (HIDE_CARD_AFTER - FADE_CARD_AFTER)
                  : 1;
            return (
              <article
                key={project.id}
                className={styles.item}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                style={
                  {
                    "--position": index + 1,
                    opacity: initialOpacity,
                    pointerEvents: initialOpacity < 0.5 ? "none" : undefined,
                  } as React.CSSProperties
                }
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
                        quality={100}
                        draggable={false}
                      />
                    </Link>

                    <span
                      aria-hidden="true"
                      className={styles.shade}
                      ref={(node) => {
                        shadeRefs.current[index] = node;
                      }}
                      style={{ opacity: Math.min(0.55, distance / 150).toFixed(3) }}
                    />

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
            );
          })}
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
        <div ref={controlsRef} className={styles.controls}>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={() => stepBy(-1)}
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
            onClick={() => stepBy(1)}
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
