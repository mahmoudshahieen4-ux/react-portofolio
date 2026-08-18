import type { Metadata } from "next";
import Link from "next/link";

import PrintButton from "@/src/components/print-button";
import { personalInfo } from "@/src/data/personal";
import { projects } from "@/src/data/projects";
import { skills } from "@/src/data/skills";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Mahmoud Issa — Front-End Developer. Print or save as PDF.",
};

const CONTACTS = [
  personalInfo.email,
  personalInfo.phone,
  personalInfo.location,
  "github.com/mahmoudshahieen4-ux",
  "linkedin.com/in/mahmoud-shahieen-frontend",
];

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#07070f] py-20 print:py-0">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8 flex items-center justify-between print-hide">
          <Link
            href="/"
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-violet-400/60 hover:text-white"
          >
            ← Back to portfolio
          </Link>
          <PrintButton />
        </div>

        <article className="resume-paper rounded-3xl bg-white p-8 text-slate-900 shadow-2xl sm:p-12">
          <header className="border-b border-slate-200 pb-6">
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              {personalInfo.name}
            </h1>
            <p className="mt-1 text-base font-semibold text-violet-700">
              {personalInfo.headline}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
              {CONTACTS.map((contact) => (
                <li key={contact}>{contact}</li>
              ))}
            </ul>
          </header>

          <section className="mt-8">
            <h2 className="text-sm font-black uppercase tracking-widest">Profile</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Front-End Developer focused on React, Next.js and TypeScript,
              building fast, accessible and pixel-perfect interfaces. Currently
              studying AI &amp; machine learning, with experience across the
              full front-end workflow including design systems, state
              management and deployment.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-sm font-black uppercase tracking-widest">Skills</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li
                  key={skill.name}
                  className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-800"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-sm font-black uppercase tracking-widest">
              Featured Projects
            </h2>
            <ul className="mt-3 space-y-4">
              {projects.map((project) => (
                <li key={project.id} className="border-l-2 border-violet-300 pl-4">
                  <h3 className="text-sm font-bold">{project.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {project.description}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-sm font-black uppercase tracking-widest">Education</h2>
            <div className="mt-3">
              <h3 className="text-sm font-bold">AI &amp; Machine Learning</h3>
              <p className="text-xs text-slate-600">In progress · Cairo, Egypt</p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}