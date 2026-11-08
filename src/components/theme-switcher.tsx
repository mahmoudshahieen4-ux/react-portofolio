"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";
import type { CSSProperties } from "react";

import { useTheme } from "@/src/components/theme-provider";
import type { ThemeId } from "@/src/lib/themes";

import styles from "./theme-switcher.module.css";

export default function ThemeSwitcher() {
  const { theme, themes, setTheme, isTransitioning } = useTheme();
  const [open, setOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  // Close on outside pointer press or Escape.
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  const handleSelect = (id: ThemeId) => {
    setTheme(id);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${open ? styles.rootOpen : ""}`}
    >
      <div className={styles.stage}>
        <button
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          onClick={() => setOpen((current) => !current)}
          aria-label="Change color theme"
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={panelId}
          aria-busy={isTransitioning}
          disabled={isTransitioning}
        />

        {/* Glass orb with the palette glyph; shrinks while the dots orbit. */}
        <div className={styles.core} aria-hidden="true">
          <Palette size={20} className={styles.icon} />
        </div>

        <div
          id={panelId}
          className={styles.orbit}
          role="group"
          aria-label="Theme options"
          aria-hidden={!open}
        >
          {themes.map((item, index) => {
            const active = item.id === theme;
            return (
              <button
                key={item.id}
                type="button"
                className={`${styles.option} ${active ? styles.optionActive : ""}`}
                style={
                  {
                    "--swatch": item.color,
                    "--swatch-contrast": item.contrast,
                    "--angle": `${(index * 360) / themes.length}deg`,
                    "--index": index,
                  } as CSSProperties
                }
                onClick={() => handleSelect(item.id)}
                disabled={isTransitioning}
                tabIndex={open ? 0 : -1}
                aria-label={`${item.label} theme`}
                aria-pressed={active}
                title={item.labelAr}
              >
                <span className={styles.optionGlass} aria-hidden="true" />
                {active && (
                  <Check
                    size={16}
                    strokeWidth={3}
                    className={styles.check}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
