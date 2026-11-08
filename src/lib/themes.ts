export type ThemeId = "blue" | "purple" | "green" | "orange" | "pink";

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  labelAr: string;
  /** Keep in sync with the `--primary` value for this theme in app/globals.css. */
  color: string;
  /** Readable foreground color on top of `color`. */
  contrast: string;
}

export const THEMES: readonly ThemeDefinition[] = [
  {
    id: "blue",
    label: "Blue",
    labelAr: "الثيم الأزرق",
    color: "#4f46e5",
    contrast: "#ffffff",
  },
  {
    id: "purple",
    label: "Purple",
    labelAr: "الثيم البنفسجي",
    color: "#8b5cf6",
    contrast: "#ffffff",
  },
  {
    id: "green",
    label: "Green",
    labelAr: "الثيم الأخضر",
    color: "#10b981",
    contrast: "#032019",
  },
  {
    id: "orange",
    label: "Orange",
    labelAr: "الثيم البرتقالي",
    color: "#f97316",
    contrast: "#1f0c01",
  },
  {
    id: "pink",
    label: "Pink",
    labelAr: "الثيم الوردي",
    color: "#ec4899",
    contrast: "#ffffff",
  },
];

export const THEME_IDS: readonly ThemeId[] = THEMES.map((theme) => theme.id);

export const DEFAULT_THEME: ThemeId = "blue";

export const THEME_STORAGE_KEY = "portfolio-theme";

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return value != null && THEME_IDS.includes(value as ThemeId);
}
