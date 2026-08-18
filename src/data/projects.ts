import type { Project } from "@/src/types/project";

/**
 * Dynamic project registry for the 3D slider.
 *
 * HOW TO USE
 * ──────────
 * ADD A PROJECT    → push a new object below (the ring recalculates `--quantity`).
 * REMOVE A PROJECT → delete its entry (the ring shrinks automatically).
 * REORDER          → drag entries up/down; index 0 becomes the front card.
 *
 * NOTE: `demoUrl` / `githubUrl` below use placeholders — replace them with the
 * real live demo and repository URLs.
 */
export const projects: Project[] = [
  {
    id: "e-commerce-storefront",
    title: "E-Commerce Storefront",
    description:
      "A modern storefront with a product catalog, cart state and a complete checkout flow.",
    image: "/images/projects/ecommerce.jpg",
    demoUrl: "https://...", // TODO: paste your live demo URL
    githubUrl: "https://github.com/mahmoudshahieen4-ux", // TODO: paste the repository URL
    techStack: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: "game-station",
    title: "Game Station",
    description:
      "A Steam-inspired game store with rich game cards, store pages and a searchable library.",
    image: "/images/projects/gamestation.jpg",
    demoUrl: "https://...", // TODO: paste your live demo URL
    githubUrl: "https://github.com/mahmoudshahieen4-ux", // TODO: paste the repository URL
    techStack: ["React", "Tailwind"],
  },
  {
    id: "educational-platform",
    title: "Educational Platform",
    description:
      "A Udemy-style learning platform with course listings, player pages and Redux-powered state.",
    image: "/images/projects/udemy.jpg",
    demoUrl: "https://...", // TODO: paste your live demo URL
    githubUrl: "https://github.com/mahmoudshahieen4-ux", // TODO: paste the repository URL
    techStack: ["React", "Redux", "Tailwind"],
  },
  {
    id: "inventory-warehouse",
    title: "Inventory & Warehouse Management",
    description:
      "A warehouse dashboard for tracking products, live stock levels and pricing.",
    image: "/images/projects/inventory.jpg",
    demoUrl: "https://...", // TODO: paste your live demo URL
    githubUrl: "https://github.com/mahmoudshahieen4-ux", // TODO: paste the repository URL
    techStack: ["React", "Tailwind"],
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    description:
      "A hand-crafted portfolio built with vanilla JavaScript and CSS3 to showcase projects and skills.",
    image: "/images/projects/portfolio.jpg",
    demoUrl: "https://...", // TODO: paste your live demo URL
    githubUrl: "https://github.com/mahmoudshahieen4-ux", // TODO: paste the repository URL
    techStack: ["Vanilla JS", "CSS3"],
  },
];

/** Returns a copy of the project registry (handy for filtering/sorting later). */
export function getProjects(): Project[] {
  return [...projects];
}
