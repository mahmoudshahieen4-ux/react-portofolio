/**
 * Personal / contact data injected into the 3D slider hero (author block).
 * Edit this single file to update the name, role, stack chips and contact
 * links shown next to the carousel.
 */
export interface PersonalInfo {
  name: string;
  role: string;
  /** One-line headline shown under the name. */
  headline: string;
  location: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  /** Main technology stack rendered as chips in the author card. */
  mainTechStack: string[];
}

export const personalInfo: PersonalInfo = {
  name: "Mahmoud Issa",
  role: "Front-End Developer",
  headline: "Front-End Developer | AI & Machine Learning Student",
  location: "Cairo, Egypt",
  email: "mahmoudshahieen4@gmail.com",
  phone: "+20 100 785 2868",
  linkedinUrl: "https://www.linkedin.com/in/mahmoud-shahieen-frontend",
  githubUrl: "https://github.com/mahmoudshahieen4-ux",
  mainTechStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "ASP.NET Core"],
};
