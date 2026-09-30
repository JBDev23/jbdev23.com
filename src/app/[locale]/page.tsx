
import Hero from "@/components/sections/Hero";
import ShapeDivider from "@/components/ui/ShapeDivider";
import dynamic from "next/dynamic";

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"));
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"));
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

export default function Home() {
  return (
    <main className="flex-1 flex flex-col font-mono">
      <Hero />
      <ShapeDivider />
      <ProjectsSection />
      <ShapeDivider />
      <SkillsSection />
      <ShapeDivider />
      <ExperienceSection />
      <ShapeDivider />
      <AboutSection />
      <ShapeDivider />
      <ContactSection />
    </main>
  );
}
