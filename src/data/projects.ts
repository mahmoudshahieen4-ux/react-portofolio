import type { Project } from "@/src/types/project";

/**
 * Dynamic project registry for the 3D slider.
 *
 * HOW TO USE
 * ──────────
 * ADD A PROJECT    → push a new object below (the ring recalculates `--quantity`).
 * REMOVE A PROJECT → delete its entry (the ring shrinks automatically).
 * REORDER          → drag entries up/down; index 0 becomes the front card.
 */
export const projects: Project[] = [
  {
    id: "e-commerce-storefront",
    title: "E-Commerce Storefront",
    description:
      "A modern storefront with a product catalog, cart state and a complete checkout flow.",
    image: "/images/projects/ecommerce.jpg",
    demoUrl: "https://ecommerce-store-eight-teal.vercel.app/",
    githubUrl: "https://github.com/mahmoudshahieen4-ux/Ecommerce-store",
    techStack: ["React", "Tailwind"],
  },
  {
    id: "steam-station",
    title: "Steam Station",
    description:
      "A Steam-inspired game store with rich game cards, store pages and a searchable library.",
    image: "/images/projects/gamestation.png",
    demoUrl: "https://steam-games-psi.vercel.app/",
    githubUrl: "https://github.com/mahmoudshahieen4-ux/steam-games",
    techStack: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: "udemy-course-platform",
    title: "Udemy Course Platform",
    description:
      "A Udemy-style learning platform with course listings, course player pages and a working cart.",
    image: "/images/projects/udemy.png",
    demoUrl: "https://udemy-1fcmyf0ja-mahmoud-shahieens-projects.vercel.app/",
    githubUrl: "https://github.com/mahmoudshahieen4-ux/udemy",
    techStack: ["React", "Tailwind"],
  },
  {
    id: "medical-diagnostic-system",
    title: "Intelligent Medical Diagnostic System",
    description:
      "A graduation project — an AI-powered clinical diagnostic platform with medical imaging analysis (X-ray, MRI, CT), severity assessment and patient management.",
    image: "/images/projects/medical.png",
    demoUrl: "https://graduation-project-kappa-weld.vercel.app/",
    githubUrl: "https://github.com/mahmoudshahieen4-ux",
    techStack: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: "solo-leveling-landing",
    title: "Solo Leveling Landing Page",
    description:
      "An anime-styled landing page for Solo Leveling with cinematic hero visuals and React Motion-powered entrance animations.",
    image: "/images/projects/landingpage.png",
    demoUrl: "https://solo-leveling-eosin.vercel.app/",
    githubUrl: "https://github.com/mahmoudshahieen4-ux",
    techStack: ["React", "Tailwind", "React Motion"],
  },
  {
    id: "honey-haven-landing",
    title: "Honey Haven Landing Page",
    description:
      "A landing page for a local honey brand with a product showcase, about section and contact options.",
    image: "/images/projects/bee.png",
    demoUrl: "https://bee-landing-page.vercel.app/",
    githubUrl: "https://github.com/mahmoudshahieen4-ux",
    techStack: ["React", "Tailwind"],
  },
];

/** Returns a copy of the project registry (handy for filtering/sorting later). */
export function getProjects(): Project[] {
  return [...projects];
}
