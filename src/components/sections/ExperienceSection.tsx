"use client";

import { useRef } from 'react';
import { m, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslations } from 'next-intl';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';

export default function ExperienceSection() {
  const t = useTranslations('Experience');

  const EXPERIENCE_DATA = [
    {
      category: t('freelance_cat'),
      bgClass: "bg-accent text-black",
      items: [
        {
          title: t('freelance_title'),
          date: t('freelance_date'),
          description: t('freelance_desc'),
        }
      ]
    },
    {
      category: t('challenges_cat'),
      bgClass: "bg-cyan text-black",
      items: [
        {
          title: t('chal_1_title'),
          date: t('chal_1_date'),
          description: t('chal_1_desc'),
        },
        {
          title: t('chal_2_title'),
          date: t('chal_2_date'),
          description: t('chal_2_desc'),
        },
        {
          title: t('chal_3_title'),
          date: t('chal_3_date'),
          description: t('chal_3_desc'),
        }
      ]
    },
    {
      category: t('volunteering_cat'),
      bgClass: "bg-primary text-black",
      items: [
        {
          title: t('vol_1_title'),
          date: t('vol_1_date'),
          description: t('vol_1_desc'),
        },
        {
          title: t('vol_2_title'),
          date: t('vol_2_date'),
          description: t('vol_2_desc'),
        },
        {
          title: t('vol_3_title'),
          date: t('vol_3_date'),
          description: t('vol_3_desc'),
        }
      ]
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldReduceAnimations, isMobile } = usePerformanceTier();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });

  const group1Y = useTransform(smoothProgress, [0.1, 0.6], shouldReduceAnimations || isMobile ? [0, 0] : [80, 0]);
  const group2Y = useTransform(smoothProgress, [0.1, 0.6], shouldReduceAnimations || isMobile ? [0, 0] : [160, 0]);
  const group3Y = useTransform(smoothProgress, [0.1, 0.6], shouldReduceAnimations || isMobile ? [0, 0] : [240, 0]);

  const parallaxTransforms = [group1Y, group2Y, group3Y];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative pt-24 md:pt-32 pb-4 md:pb-12 border-foreground text-foreground section-deferred overflow-clip"
    >

      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] -rotate-6 flex items-center overflow-hidden z-0 opacity-5 pointer-events-none">
        <m.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex whitespace-nowrap font-black text-4xl md:text-5xl uppercase tracking-widest"
        >
          <span>HARD WORK • DEDICATION • HUSTLE • GRIND • HARD WORK • DEDICATION • HUSTLE • GRIND • HARD WORK • DEDICATION • HUSTLE • GRIND •&nbsp;</span>
          <span>HARD WORK • DEDICATION • HUSTLE • GRIND • HARD WORK • DEDICATION • HUSTLE • GRIND • HARD WORK • DEDICATION • HUSTLE • GRIND •&nbsp;</span>
        </m.div>
      </div>

      <div className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] rotate-12 flex items-center overflow-hidden z-0 opacity-10 pointer-events-none">
        <m.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap font-black text-4xl md:text-5xl uppercase tracking-widest text-transparent"
          style={{ WebkitTextStroke: '2px var(--foreground)' }}
        >
          <span>NO EXCUSES • ONLY RESULTS • NO EXCUSES • ONLY RESULTS • NO EXCUSES • ONLY RESULTS • NO EXCUSES • ONLY RESULTS •&nbsp;</span>
          <span>NO EXCUSES • ONLY RESULTS • NO EXCUSES • ONLY RESULTS • NO EXCUSES • ONLY RESULTS • NO EXCUSES • ONLY RESULTS •&nbsp;</span>
        </m.div>
      </div>

      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] rotate-2 flex items-center overflow-hidden z-0 opacity-5 pointer-events-none">
        <m.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          className="flex whitespace-nowrap font-black text-5xl md:text-6xl uppercase tracking-widest"
        >
          <span>PASSION • CODE • CREATIVITY • PASSION • CODE • CREATIVITY • PASSION • CODE • CREATIVITY • PASSION • CODE • CREATIVITY •&nbsp;</span>
          <span>PASSION • CODE • CREATIVITY • PASSION • CODE • CREATIVITY • PASSION • CODE • CREATIVITY • PASSION • CODE • CREATIVITY •&nbsp;</span>
        </m.div>
      </div>

      <m.div
        className="absolute top-20 right-4 md:right-20 text-[12rem] md:text-[20rem] font-black text-transparent opacity-10 pointer-events-none select-none leading-none"
        style={{ WebkitTextStroke: '4px var(--foreground)' }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        *
      </m.div>

      <m.div
        className="absolute bottom-40 left-[-2rem] md:left-10 text-[15rem] md:text-[25rem] font-black text-transparent opacity-10 pointer-events-none select-none leading-none"
        style={{ WebkitTextStroke: '4px var(--foreground)' }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        +
      </m.div>

      <div className="relative z-10 px-4 md:px-8 mx-auto max-w-7xl">
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="mb-20 md:mb-32 text-center md:text-left"
        >
          <h2 className="text-5xl md:text-8xl font-black uppercase drop-shadow-[6px_6px_0_var(--primary)]">
            {t('title')}
          </h2>
        </m.div>

        <div className="flex flex-col gap-20 md:gap-32">
          {EXPERIENCE_DATA.map((group, index) => (
            <m.div
              key={index}
              style={{ y: parallaxTransforms[index] }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-start`}
            >

              <div className="lg:w-1/3 shrink-0 flex justify-center lg:justify-start w-full">
                <div
                  className={`inline-block w-full lg:w-auto text-center px-8 py-6 border-4 border-foreground font-black uppercase text-3xl lg:text-5xl shadow-[8px_8px_0px_0px_var(--foreground)] 
                  rotate-0 ${index % 2 === 0 ? 'lg:rotate-[-3deg] hover:rotate-[2deg]' : 'lg:rotate-[3deg] hover:rotate-[-2deg]'} 
                  transition-transform duration-300 ${group.bgClass}`}
                >
                  {group.category}
                </div>
              </div>

              <div className="lg:w-2/3 flex flex-col gap-12 w-full">
                {group.items.map((item, iIdx) => (
                  <div key={iIdx} className="relative group/exp">

                    <div className="absolute left-[-2px] top-0 bottom-0 w-1 bg-foreground scale-y-0 origin-top group-hover/exp:scale-y-100 transition-transform duration-300 ease-out z-10"></div>

                    <div className="pl-6 md:pl-8 border-l-4 border-foreground/20 group-hover/exp:border-transparent transition-colors duration-300">
                      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 mb-4">
                        <h4 className="text-3xl md:text-4xl font-black uppercase group-hover/exp:translate-x-2 transition-transform duration-300">{item.title}</h4>
                        <span className="font-mono text-base md:text-lg font-bold bg-foreground text-background px-3 py-1 border-2 border-foreground w-max whitespace-nowrap">
                          {item.date}
                        </span>
                      </div>
                      <p className="font-mono text-xl opacity-90 max-w-3xl leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
