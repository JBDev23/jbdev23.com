"use client";

import { useRef } from 'react';
import { Link } from '@/i18n/routing';
import { m, useScroll, useTransform, Variants } from "framer-motion";
import ProjectCard from '../ui/ProjectCard';
import { PROJECTS } from '@/constants/projects';
import { useTranslations } from 'next-intl';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
      mass: 0.8
    }
  },
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 14,
    }
  },
};

export default function ProjectsSection() {
  const t = useTranslations('Projects');
  const tProjects = useTranslations('ProjectsList');
  const projects = PROJECTS.slice(0, 3);
  const { shouldReduceAnimations, isMobile } = usePerformanceTier();

  const projectsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress: titleProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "center center"]
  });

  const { scrollYProgress: projectsProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "center center"]
  });

  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "center center"]
  });

  const titleX = useTransform(titleProgress, [0, 1], shouldReduceAnimations || isMobile ? ["0%", "0%"] : ["-8%", "0%"]);

  const middleCardY = useTransform(projectsProgress, [0, 1], shouldReduceAnimations || isMobile ? [0, 0] : [150, 0]);
  const leftCardX = useTransform(projectsProgress, [0, 1], shouldReduceAnimations || isMobile ? [0, 0] : [-80, 0]);
  const rightCardX = useTransform(projectsProgress, [0, 1], shouldReduceAnimations || isMobile ? [0, 0] : [80, 0]);

  const servicesMiddleY = useTransform(servicesProgress, [0, 1], shouldReduceAnimations || isMobile ? [0, 0] : [150, 0]);
  const servicesLeftX = useTransform(servicesProgress, [0, 1], shouldReduceAnimations || isMobile ? [0, 0] : [-80, 0]);
  const servicesRightX = useTransform(servicesProgress, [0, 1], shouldReduceAnimations || isMobile ? [0, 0] : [80, 0]);

  return (
    <section id="work" className="px-4 md:px-8 section-deferred">
      <m.div
        ref={titleRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 border-b-4 border-foreground pb-8 md:pb-4 gap-4 md:gap-0"
      >
        <m.h3
          style={{ x: titleX }}
          variants={itemVariants}
          className="text-4xl md:text-7xl font-black uppercase origin-left text-center md:text-left w-full md:w-auto"
        >
          {t('title')}
        </m.h3>
        <m.div variants={itemVariants} className="mt-6 md:mt-0 w-full md:w-auto">
          <Link href="/work" className="group relative inline-block w-full md:w-auto">
            <div className="absolute inset-0 bg-primary translate-x-1.5 translate-y-1.5 border-2 border-foreground transition-transform duration-300 group-hover:translate-x-2.5 group-hover:translate-y-2.5"></div>
            <div 
              className="relative bg-foreground text-background border-2 border-foreground px-6 py-3 font-bold uppercase text-center hover:-translate-y-1 transition-transform duration-300 flex items-center justify-center group-hover:bg-primary group-hover:text-background w-full text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: t('view_all') }}
            />
          </Link>
        </m.div>
      </m.div>

      <m.div
        ref={projectsRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project, idx) => {
          let parallaxStyle = {};
          if (idx === 0) parallaxStyle = { x: leftCardX };
          if (idx === 1) parallaxStyle = { y: middleCardY };
          if (idx === 2) parallaxStyle = { x: rightCardX };

          return (
            <m.div
              key={idx}
              style={parallaxStyle}
              className="h-full"
            >
              <m.div variants={scaleVariants} className="h-full">
                <ProjectCard
                  title={tProjects(`${project.slug}.title`)}
                  technologies={project.technologies}
                  description={tProjects(`${project.slug}.description`)}
                  link={{ pathname: '/work/[slug]', params: { slug: project.slug } }}
                  image={project.image}
                  variant={project.variant}
                />
              </m.div>
            </m.div>
          );
        })}
      </m.div>

      <m.div
        ref={servicesRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-20 pt-8 border-t-4 border-foreground border-dashed"
      >
        <m.h4 variants={itemVariants} className="text-3xl md:text-5xl font-black uppercase mb-8">
          {t('services_title')}
        </m.h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <m.div style={{ x: servicesLeftX }} className="h-full">
            <m.div variants={scaleVariants} className="h-full">
              <Link href={{ pathname: '/work', query: { category: 'web' } }} className="h-full brutalist-border brutalist-shadow bg-black text-white p-8 flex flex-col items-center justify-center hover:bg-primary transition-colors group">
                <span className="bg-white text-black font-black uppercase text-xs px-2 py-1 mb-3 brutalist-border">Full Stack</span>
                <h5 className="text-3xl font-black uppercase group-hover:scale-110 transition-transform">{t('web_title')}</h5>
                <p className="font-bold mt-3 text-center text-gray-300 group-hover:text-white">{t('web_desc')}</p>
              </Link>
            </m.div>
          </m.div>

          <m.div style={{ y: servicesMiddleY }} className="h-full">
            <m.div variants={scaleVariants} className="h-full">
              <Link href={{ pathname: '/work', query: { category: 'mobile' } }} className="h-full brutalist-border brutalist-shadow-dark bg-white text-black p-8 flex flex-col items-center justify-center hover:bg-accent transition-colors group">
                <span className="bg-black text-white font-black uppercase text-xs px-2 py-1 mb-3 brutalist-border">Full Stack</span>
                <h5 className="text-3xl font-black uppercase group-hover:scale-110 transition-transform">{t('mobile_title')}</h5>
                <p className="font-bold mt-3 text-center text-gray-700 group-hover:text-black">{t('mobile_desc')}</p>
              </Link>
            </m.div>
          </m.div>

          <m.div style={{ x: servicesRightX }} className="h-full">
            <m.div variants={scaleVariants} className="h-full">
              <Link href={{ pathname: '/work', query: { category: 'others' } }} className="h-full brutalist-border brutalist-shadow bg-black text-white p-8 flex flex-col items-center justify-center hover:bg-primary transition-colors group">
                <span className="bg-white text-black font-black uppercase text-xs px-2 py-1 mb-3 brutalist-border">Backend & Tools</span>
                <h5 className="text-3xl font-black uppercase group-hover:scale-110 transition-transform">{t('others_title')}</h5>
                <p className="font-bold mt-3 text-center text-gray-300 group-hover:text-white">{t('others_desc')}</p>
              </Link>
            </m.div>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
