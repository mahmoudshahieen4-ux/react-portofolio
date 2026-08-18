import ContactSection from "@/src/components/contact-section";
import Footer from "@/src/components/footer";
import Hero from "@/src/components/hero";
import ProjectsSection from "@/src/components/projects-section";
import SkillsSection from "@/src/components/skills-section";

export default function PortfolioHome() {
  return (
    <>
      <main>
        <Hero />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}