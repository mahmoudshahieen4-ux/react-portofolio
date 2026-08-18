/**
 * Skills & expertise data rendered by the Skills section.
 * `level` is a 0–100 "proficiency" value used to drive the animated bars.
 * Edit this file to add/remove/reorder skills.
 */
export type SkillCategory = "Front-End" | "Back-End & Tools" | "AI & Data";

/**
 * Lucide icon name rendered on the skill card and marquee.
 * Must have a matching entry in the `SKILL_ICONS` map inside
 * `src/components/skills-section.tsx`.
 */
export type SkillIcon =
  | "atom"
  | "triangle"
  | "hexagon"
  | "square"
  | "palette"
  | "code"
  | "repeat"
  | "server"
  | "cable"
  | "git-branch"
  | "rocket"
  | "bot"
  | "terminal"
  | "chart-column";

export interface Skill {
  name: string;
  /** Lucide icon name shown on the skill card. */
  icon: SkillIcon;
  level: number;
  category: SkillCategory;
}

export const skills: Skill[] = [
  { name: "React", icon: "atom", level: 92, category: "Front-End" },
  { name: "Next.js", icon: "triangle", level: 88, category: "Front-End" },
  { name: "TypeScript", icon: "hexagon", level: 85, category: "Front-End" },
  { name: "JavaScript (ES6+)", icon: "square", level: 90, category: "Front-End" },
  { name: "Tailwind CSS", icon: "palette", level: 100, category: "Front-End" },
  { name: "HTML5 & CSS3", icon: "code", level: 100, category: "Front-End" },
  { name: "zustand", icon: "repeat", level: 80, category: "Front-End" },
  { name: "REST APIs", icon: "cable", level: 82, category: "Back-End & Tools" },
  { name: "Git & GitHub", icon: "git-branch", level: 88, category: "Back-End & Tools" },
  { name: "Deployment & Vercel", icon: "rocket", level: 84, category: "Back-End & Tools" },
];

