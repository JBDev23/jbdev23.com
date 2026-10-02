"use client";

import { useRef, useState } from 'react';
import { m, useScroll, useTransform, Variants, useSpring } from "framer-motion";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';

const SKILLS_DATA = [
  {
    category: "Languages",
    bgClass: "bg-magenta text-black",
    skills: [
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "HTML5 / CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" }
    ]
  },
  {
    category: "Frontend",
    bgClass: "bg-primary text-black",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/000000" },
      { name: "Remotion", icon: "" },
      { name: "Expo", icon: "https://cdn.simpleicons.org/expo/000000" },
      { name: "NativeWind", icon: "https://cdn.simpleicons.org/tailwindcss" }
    ]
  },
  {
    category: "Backend & AI",
    bgClass: "bg-accent text-black",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
      { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma" },
      { name: "Groq (AI)", icon: "" },
      { name: "Ollama", icon: "https://cdn.simpleicons.org/ollama" }
    ]
  },
  {
    category: "Tools & Infra",
    bgClass: "bg-cyan text-black",
    skills: [
      { name: "Git / GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/000000" },
      { name: "Railway", icon: "https://cdn.simpleicons.org/railway/000000" },
      { name: "Neon DB", icon: "https://cdn.simpleicons.org/neon" },
      { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg" },
      { name: "Vegas Pro", icon: "https://cdn.simpleicons.org/vegas" },
      { name: "NFC / NDEF", icon: "https://cdn.simpleicons.org/nfc" }
    ]
  }
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 100, rotate: -5 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: custom * 0.1,
    }
  })
};

const devStackText = Array(20).fill("DEVELOPMENT STACK").join(" • ") + " • ";
const brutalSkillsText = Array(20).fill("BRUTAL SKILLS").join(" • ") + " • ";
const codingArsenalText = Array(20).fill("CODING ARSENAL").join(" • ") + " • ";

export default function SkillsSection() {
  const t = useTranslations('Skills');
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string, icon: string } | null>(null);
  const { shouldReduceAnimations, isMobile } = usePerformanceTier();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });

  const bgText1X = useTransform(smoothProgress, [0, 1], shouldReduceAnimations || isMobile ? ["0%", "0%"] : ["0%", "-40%"]);
  const bgText2X = useTransform(smoothProgress, [0, 1], shouldReduceAnimations || isMobile ? ["0%", "0%"] : ["-40%", "0%"]);
  const bgText3X = useTransform(smoothProgress, [0, 1], shouldReduceAnimations || isMobile ? ["0%", "0%"] : ["0%", "-40%"]);

  const card1Y = useTransform(smoothProgress, [0.1, 0.6], shouldReduceAnimations || isMobile ? [0, 0] : [80, 0]);
  const card2Y = useTransform(smoothProgress, [0.1, 0.6], shouldReduceAnimations || isMobile ? [0, 0] : [160, 0]);
  const card3Y = useTransform(smoothProgress, [0.1, 0.6], shouldReduceAnimations || isMobile ? [0, 0] : [240, 0]);
  const card4Y = useTransform(smoothProgress, [0.1, 0.6], shouldReduceAnimations || isMobile ? [0, 0] : [320, 0]);
  const cardYTransforms = [card1Y, card2Y, card3Y, card4Y];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-24 md:py-32 border-b-4 border-foreground bg-foreground text-background section-deferred"
    >

      <div className="absolute inset-0 overflow-clip pointer-events-none select-none opacity-10">
        <div className="sticky top-0 h-[100dvh] flex flex-col justify-center gap-8 md:gap-12">
          <m.div style={{ x: bgText1X }}>
            <m.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="flex whitespace-nowrap font-black text-7xl md:text-[14rem] leading-none tracking-tighter"
            >
              <span>{devStackText}</span>
              <span>{devStackText}</span>
            </m.div>
          </m.div>

          <m.div style={{ x: bgText2X }}>
            <m.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
              className="flex whitespace-nowrap font-black text-7xl md:text-[14rem] leading-none tracking-tighter text-transparent"
              style={{ WebkitTextStroke: '2px var(--background)' }}
            >
              <span>{brutalSkillsText}</span>
              <span>{brutalSkillsText}</span>
            </m.div>
          </m.div>

          <m.div style={{ x: bgText3X }}>
            <m.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="flex whitespace-nowrap font-black text-7xl md:text-[14rem] leading-none tracking-tighter"
            >
              <span>{codingArsenalText}</span>
              <span>{codingArsenalText}</span>
            </m.div>
          </m.div>
        </div>
      </div>

      <div className="relative z-10 px-4 md:px-8 mx-auto w-full">

        <div className="hidden md:block absolute right-4 md:right-8 top-0 bottom-0 w-40 z-50 pointer-events-none">

          <div className="sticky top-40 pt-2 pointer-events-auto">
            <div className="flex flex-col items-center justify-center w-40 h-40 border-4 border-background bg-background text-foreground shadow-[8px_8px_0px_0px_var(--foreground)] relative overflow-hidden">

              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-foreground" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-foreground" />
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-foreground" />
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-foreground" />

              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,var(--scanline)_50%)] bg-[length:100%_4px] pointer-events-none z-20"></div>

              {hoveredSkill ? (
                <m.div
                  key={hoveredSkill.name}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="flex flex-col items-center gap-2 z-10 w-full px-2"
                >
                  {hoveredSkill.icon ? (
                    <div className="bg-white p-2 border-2 border-foreground rounded-lg shadow-[4px_4px_0_var(--foreground)] flex items-center justify-center">
                      <Image
                        src={hoveredSkill.icon}
                        alt={hoveredSkill.name}
                        width={40}
                        height={40}
                        className="object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-foreground text-background font-black text-2xl rounded-full uppercase border-2 border-background">
                      {hoveredSkill.name.substring(0, 2)}
                    </div>
                  )}
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-center w-full truncate bg-background px-1">
                    {hoveredSkill.name}
                  </span>
                </m.div>
              ) : (
                <div className="flex flex-col items-center z-10 opacity-30">
                  <svg className="w-12 h-12 animate-[spin_4s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
                  </svg>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest mt-2">
                    {t('status_idle')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-between items-center mb-16 md:mb-24 gap-8">
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="inline-block w-full md:w-auto text-center md:text-left"
          >
            <h3 className="text-5xl md:text-8xl font-black uppercase text-background drop-shadow-[6px_6px_0_var(--foreground)]">
              {t('title')}
            </h3>
          </m.div>

          <div className="hidden md:block w-40 shrink-0"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12 md:mt-24 w-full mx-auto">
          {SKILLS_DATA.map((group, index) => (
            <m.div
              key={index}
              style={{ y: cardYTransforms[index] }}
            >
              <m.div
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="relative mt-8 pt-4 pb-6 px-6 md:px-8 border-4 border-background text-foreground bg-background shadow-[8px_8px_0px_0px_var(--foreground)] hover:-translate-y-2 hover:translate-x-[-4px] hover:shadow-[16px_16px_0px_0px_var(--foreground)] hover:rotate-1 transition-all duration-300 ease-out w-full sm:w-[320px] xl:w-[360px]"
              >

                <div className="flex justify-between items-start gap-6 w-full">

                  <div className={`-mt-10 -ml-2 mb-6 px-4 py-2 border-4 border-background font-black uppercase text-xl md:text-2xl shadow-[4px_4px_0px_0px_var(--foreground)] z-10 shrink-0 ${group.bgClass}`}>
                    {group.category}
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <span className="w-3 h-3 rounded-full bg-foreground"></span>
                    <span className="w-3 h-3 rounded-full bg-foreground"></span>
                  </div>
                </div>

                <ul className="flex flex-col gap-4 mt-4">
                  {group.skills.map((skill, sIdx) => (
                    <li
                      key={sIdx}
                      className="font-mono text-lg md:text-xl font-bold flex items-center gap-3 group/item cursor-pointer w-full py-1"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >

                      <svg
                        className="w-5 h-5 shrink-0 group-hover/item:rotate-90 group-hover/item:scale-125 transition-all duration-300 ease-out"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                      >
                        <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
                      </svg>
                      <span className="group-hover/item:translate-x-2 transition-transform duration-300">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </m.div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
