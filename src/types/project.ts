/**
 * Core data shape for a portfolio project rendered inside the 3D slider.
 *
 * Every entry in `src/data/projects.ts` maps 1:1 to one "card" in the 3D
 * carousel ring. Add a new project by appending an object to that array —
 * the slider automatically recalculates the ring (`--quantity`) from the
 * array length.
 */
export interface Project {
  /** Unique, stable identifier. Also used as the React `key`. */
  id: string;
  /** Project display name (rendered on the card). */
  title: string;
  /** Short summary shown on the card overlay. */
  description: string;
  /**
   * Thumbnail of the project.
   * Local path (e.g. `/images/projects/ecommerce.jpg`) or a remote URL.
   */
  image: string;
  /**
   * Live demo URL. The card image and the "Live Demo" button open this in a
   * new tab (`target="_blank"` + `rel="noopener noreferrer"`).
   */
  demoUrl: string;
  /** Source repository URL, opened via the card's "GitHub" button. */
  githubUrl: string;
  /** Technology tags rendered as chips on the card overlay. */
  techStack: string[];
}
