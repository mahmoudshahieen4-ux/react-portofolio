"use client";

import { useMemo, useState } from "react";
import {
  Atom,
  Bot,
  Cable,
  ChartColumn,
  Code,
  GitBranch,
  Hexagon,
  Palette,
  Repeat,
  Rocket,
  Server,
  Square,
  Terminal,
  Triangle,
  type LucideIcon,
} from "lucide-react";

import Reveal from "@/src/components/reveal";
import { useInView } from "@/src/hooks/use-in-view";
import { skills, type SkillCategory, type SkillIcon } from "@/src/data/skills";

type Filter = "All" | SkillCategory;

const CATEGORIES: Filter[] = ["All", "Front-End", "Back-End & Tools", "AI & Data"];

/** Resolves a data-driven skill icon name to its Lucide component. */
const SKILL_ICONS: Record<SkillIcon, LucideIcon> = {
  atom: Atom,
  triangle: Triangle,
  hexagon: Hexagon,
  square: Square,
  palette: Palette,
  code: Code,
  repeat: Repeat,
  server: Server,
  cable: Cable,
  "git-branch": GitBranch,
  rocket: Rocket,
  bot: Bot,
  terminal: Terminal,
  "chart-column": ChartColumn,
};

function SkillIcon({ name, size }: { name: SkillIcon; size: number }) {
  const Icon = SKILL_ICONS[name];
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" />;
}

export default function SkillsSection() {
  const [category, setCategory] = useState<Filter>("All");
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const filteredSkills = useMemo(
    () =>
      category === "All"
        ? skills
        : skills.filter((skill) => skill.category === category),
    [category],
  );

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#0a0a14] py-24"
      aria-label="Skills and expertise"
    >
      {/* Infinite marquee strip */}
      <div className="marquee border-y border-white/5 bg-white/[0.02] py-4" aria-hidden="true">
        <div className="marquee-track">
          {[...skills, ...skills].map((skill, index) => (
            <span
              key={`${skill.name}-${index}`}
              className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-zinc-500"
            >
              <span className="text-violet-400" aria-hidden="true">
                <SkillIcon name={skill.icon} size={16} />
              </span>
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-6">
        <Reveal>
          <p className="text-center text-sm font-medium uppercase tracking-[0.3em] text-violet-300">
            Skills &amp; Expertise
          </p>
          <h2 className="mt-3 text-center text-3xl font-black tracking-tight sm:text-5xl">
            Technologies I <span className="text-gradient">work with</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-400">
            A front-end core built on React, Next.js and TypeScript — with a
            growing interest in AI and machine learning.
          </p>
        </Reveal>

        {/* Category filter */}
        <Reveal delay={120}>
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
            role="group"
            aria-label="Filter skills by category"
          >
            {CATEGORIES.map((item) => {
              const isActive = category === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.9)]"
                      : "glass text-zinc-300 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Skill cards */}
        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredSkills.map((skill, index) => (
            <Reveal key={skill.name} delay={index * 70}>
              <article className="card-lift glass group h-full rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="text-violet-400" aria-hidden="true">
                    <SkillIcon name={skill.icon} size={28} />
                  </span>
                  <span className="text-xs font-bold text-zinc-500">
                    {skill.level}%
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{skill.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-violet-300/80">
                  {skill.category}
                </p>
                <div
                  className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name} proficiency`}
                >
                  <div
                    className="skill-bar-fill h-full rounded-full bg-linear-to-r from-violet-500 to-indigo-500"
                    style={{ width: inView ? `${skill.level}%` : "0%" }}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
