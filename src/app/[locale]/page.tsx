
import Hero from "@/components/sections/Hero";
import ShapeDivider from "@/components/ui/ShapeDivider";
import dynamic from "next/dynamic";

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"));
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"));
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
    openGraph: {
      url: `/${locale}`,
    }
  };
}

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
