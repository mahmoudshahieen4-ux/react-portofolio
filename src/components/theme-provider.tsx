"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

import {
  DEFAULT_THEME,
  THEMES,
  THEME_STORAGE_KEY,
  isThemeId,
} from "@/src/lib/themes";
import type { ThemeDefinition, ThemeId } from "@/src/lib/themes";

interface ThemeContextValue {
  theme: ThemeId;
  themes: readonly ThemeDefinition[];
  setTheme: (theme: ThemeId) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const RIPPLE_DURATION_MS = 700;
const RIPPLE_APPLY_AT_MS = 320;
const RIPPLE_FADE_MS = 180;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readStoredTheme(): ThemeId | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeId(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const themeRef = useRef<ThemeId>(DEFAULT_THEME);
  const busyRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const ripplesRef = useRef<HTMLElement[]>([]);

  // The inline script in the root layout already applied the saved theme
  // before paint; mirror it into React state after hydration.
  useEffect(() => {
    const applied = document.documentElement.getAttribute("data-theme");
    const initial = isThemeId(applied) ? applied : readStoredTheme();
    if (initial && initial !== themeRef.current) {
      themeRef.current = initial;
      setThemeState(initial);
    }
  }, []);

  const commit = useCallback((next: ThemeId) => {
    themeRef.current = next;
    document.documentElement.setAttribute("data-theme", next);
    setThemeState(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode / disabled cookies).
    }
  }, []);

  const finish = useCallback(() => {
    busyRef.current = false;
    setIsTransitioning(false);
  }, []);

  const setTheme = useCallback(
    (next: ThemeId) => {
      if (busyRef.current || next === themeRef.current) return;

      if (prefersReducedMotion()) {
        commit(next);
        return;
      }

      busyRef.current = true;
      setIsTransitioning(true);

      const primary =
        THEMES.find((item) => item.id === next)?.color ?? "#4f46e5";
      const doc = document;

      if (typeof doc.startViewTransition === "function") {
        const radius = Math.hypot(window.innerWidth, window.innerHeight) / 2;
        // Backgrounded tabs may never resolve `finished`; never stay locked.
        const safetyTimer = window.setTimeout(
          finish,
          RIPPLE_DURATION_MS + 600,
        );
        timersRef.current.push(safetyTimer);

        const transition = doc.startViewTransition(() => commit(next));
        transition.ready
          .then(() => {
            const animation = document.documentElement.animate(
              {
                clipPath: [
                  "circle(0px at 50% 50%)",
                  `circle(${radius}px at 50% 50%)`,
                ],
              },
              {
                duration: RIPPLE_DURATION_MS,
                easing: "cubic-bezier(0.65, 0, 0.35, 1)",
                pseudoElement: "::view-transition-new(root)",
              } as KeyframeAnimationOptions,
            );
            return animation.finished;
          })
          .catch(() => undefined)
          .finally(() => {
            window.clearTimeout(safetyTimer);
            finish();
          });
        return;
      }

      // Fallback: a fixed circle at the screen centre grows to cover the
      // viewport, the theme swaps underneath it, then it fades away.
      const diameter =
        2 * Math.hypot(window.innerWidth / 2, window.innerHeight / 2);
      const ripple = document.createElement("div");
      ripple.className = "theme-ripple";
      ripple.style.width = `${diameter}px`;
      ripple.style.height = `${diameter}px`;
      ripple.style.background = primary;
      document.body.appendChild(ripple);
      ripplesRef.current.push(ripple);

      // Force a reflow so the scale(0) start state is committed.
      void ripple.offsetWidth;
      ripple.classList.add("is-active");

      const applyTimer = window.setTimeout(
        () => commit(next),
        RIPPLE_APPLY_AT_MS,
      );
      const fadeTimer = window.setTimeout(
        () => ripple.classList.add("is-fading"),
        RIPPLE_DURATION_MS,
      );
      const cleanTimer = window.setTimeout(() => {
        ripple.remove();
        ripplesRef.current = ripplesRef.current.filter(
          (item) => item !== ripple,
        );
        finish();
      }, RIPPLE_DURATION_MS + RIPPLE_FADE_MS);

      timersRef.current.push(applyTimer, fadeTimer, cleanTimer);
    },
    [commit, finish],
  );

  useEffect(() => {
    const timers = timersRef.current;
    const ripples = ripplesRef.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      ripples.forEach((ripple) => ripple.remove());
    };
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, themes: THEMES, setTheme, isTransitioning }),
    [theme, setTheme, isTransitioning],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return context;
}
