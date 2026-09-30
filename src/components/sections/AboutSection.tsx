"use client";

import { useRef } from 'react';
import { m, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslations } from 'next-intl';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';

const aboutText = Array(20).fill("ABOUT ME").join(" • ") + " • ";
const alcoyText = Array(20).fill("ALCOY UPV").join(" • ") + " • ";
const softwareText = Array(20).fill("SOFTWARE ENGINEER").join(" • ") + " • ";

export default function AboutSection() {
  const t = useTranslations('About');
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldReduceAnimations, isMobile } = usePerformanceTier();
  const disableAnim = shouldReduceAnimations || isMobile;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });

  const bgText1X = useTransform(smoothProgress, [0, 1], disableAnim ? ["0%", "0%"] : ["0%", "-30%"]);
  const bgText2X = useTransform(smoothProgress, [0, 1], disableAnim ? ["0%", "0%"] : ["-30%", "0%"]);
  const rotate = useTransform(smoothProgress, [0, 1], disableAnim ? [0, 0] : [0, 360]);
  const rotateReverse = useTransform(smoothProgress, [0, 1], disableAnim ? [0, 0] : [0, -360]);



  return (
    <section
      id="about"
      ref={containerRef}
      className="relative pt-24 pb-16 md:pt-48 md:pb-16 lg:pb-32 bg-foreground text-background overflow-clip border-b-4 border-foreground section-deferred"
    >

      <div className="absolute inset-0 overflow-clip pointer-events-none select-none opacity-5 z-0">
        <div className="sticky top-0 h-[100dvh] flex flex-col justify-center gap-12 md:gap-20 overflow-hidden">
          <m.div style={{ x: bgText1X }}>
            <m.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="flex whitespace-nowrap font-black text-[12rem] md:text-[20rem] leading-none tracking-tighter">
              <span>{aboutText}</span>
              <span>{aboutText}</span>
            </m.div>
          </m.div>

          <m.div style={{ x: bgText2X }}>
            <m.div animate={{ x: ["-50%", "0%"] }} transition={{ repeat: Infinity, duration: 45, ease: "linear" }} className="flex whitespace-nowrap font-black text-[12rem] md:text-[20rem] leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: '4px var(--background)' }}>
              <span>{alcoyText}</span>
              <span>{alcoyText}</span>
            </m.div>
          </m.div>

          <m.div style={{ x: bgText1X }}>
            <m.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }} className="flex whitespace-nowrap font-black text-[12rem] md:text-[20rem] leading-none tracking-tighter">
              <span>{softwareText}</span>
              <span>{softwareText}</span>
            </m.div>
          </m.div>

          <m.div style={{ x: bgText2X }}>
            <m.div animate={{ x: ["-50%", "0%"] }} transition={{ repeat: Infinity, duration: 50, ease: "linear" }} className="flex whitespace-nowrap font-black text-[12rem] md:text-[20rem] leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: '4px var(--background)' }}>
              <span>{aboutText}</span>
              <span>{aboutText}</span>
            </m.div>
          </m.div>
        </div>
      </div>

      <m.div
        style={{ rotate }}
        className="absolute top-10 right-10 md:top-20 md:right-20 text-[10rem] md:text-[15rem] text-primary opacity-20 pointer-events-none font-black leading-none select-none z-0"
      >
        *
      </m.div>
      <m.div
        style={{ rotate: rotateReverse }}
        className="absolute bottom-40 left-4 md:bottom-80 md:left-10 text-[8rem] md:text-[12rem] text-accent opacity-20 pointer-events-none font-black leading-none select-none z-0"
      >
        *
      </m.div>
      <m.div
        style={{ rotate }}
        className="absolute top-1/2 left-1/3 text-[12rem] md:text-[18rem] text-magenta opacity-10 pointer-events-none font-black leading-none select-none z-0"
      >
        *
      </m.div>

      <div className="relative z-10 px-4 md:px-8 mx-auto max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

        <div className="lg:w-5/12 flex flex-col gap-6 w-full z-10 lg:pb-8">

          <div className="inline-block px-4 py-2 bg-primary text-black font-black uppercase text-xl md:text-2xl w-max mb-2 rotate-[-2deg] border-2 border-background">
            {t('title')}
          </div>
          <h2 className="text-6xl md:text-8xl lg:text-7xl xl:text-8xl font-black uppercase drop-shadow-[6px_6px_0_var(--accent)] text-background leading-none">
            Software<br />Engineer
          </h2>
          <div className="w-32 h-4 bg-accent mt-2 mb-2" />
          <p className="text-xl md:text-2xl font-mono leading-relaxed font-bold bg-background text-foreground p-6 inline-block shadow-[8px_8px_0px_0px_var(--primary)] rotate-0 md:rotate-[1deg]">
            {t.rich('description', {
              scratch: (chunks) => <strong className="text-primary underline decoration-4 uppercase">{chunks}</strong>
            })}
          </p>

          <div className="mt-6 flex flex-col gap-8 w-full">

            <m.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0 }}
              className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-8 items-center lg:items-start xl:items-center"
            >

              <div className="w-48 h-48 sm:w-56 sm:h-56 bg-background border-4 border-background shadow-[10px_10px_0px_0px_var(--primary)] rotate-[-3deg] hover:rotate-[2deg] hover:scale-105 transition-transform duration-300 relative overflow-hidden flex-shrink-0 flex items-center justify-center">
                <span className="font-mono text-foreground font-black text-center opacity-40 leading-tight">
                  {t.rich('photo_placeholder', {
                    br: () => <br />
                  })}
                </span>


              </div>

              <div className="flex flex-col gap-4 w-full">
                <a href="#" className="bg-background text-foreground font-black uppercase text-xl px-6 py-4 border-4 border-background shadow-[6px_6px_0px_0px_var(--accent)] hover:translate-x-2 transition-transform duration-300 flex justify-between items-center group">
                  <span>LinkedIn</span>
                  <span className="text-accent group-hover:rotate-45 transition-transform duration-300">↗</span>
                </a>
                <a href="#" className="bg-background text-foreground font-black uppercase text-xl px-6 py-4 border-4 border-background shadow-[6px_6px_0px_0px_var(--cyan)] hover:translate-x-2 transition-transform duration-300 flex justify-between items-center group">
                  <span>GitHub</span>
                  <span className="text-cyan group-hover:rotate-45 transition-transform duration-300">↗</span>
                </a>
              </div>
            </m.div>

            <m.a
              href="#contact"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="block relative w-full group cursor-pointer hover:-translate-y-1 transition-transform duration-300 mt-2"
            >
              <div className="absolute inset-0 bg-accent translate-x-3 translate-y-3 border-4 border-foreground transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4"></div>
              <div className="relative w-full bg-background border-4 border-foreground text-foreground px-8 py-6 rotate-0 md:rotate-[-1deg] group-hover:rotate-[0deg] transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-foreground" />
                    <span className="font-mono font-bold uppercase tracking-widest text-sm opacity-70">{t('availability_title')}</span>
                  </div>
                  <h3 className="font-black text-3xl md:text-4xl uppercase leading-none">
                    {t.rich('availability_status', {
                      freelance: (chunks) => <span className="text-accent underline decoration-4 underline-offset-4" style={{ textShadow: '2px 2px 0 var(--foreground)' }}>{chunks}</span>
                    })}
                  </h3>
                </div>

                <div className="bg-foreground text-background font-black uppercase px-4 py-2 border-2 border-transparent group-hover:bg-accent group-hover:text-foreground group-hover:border-foreground transition-colors whitespace-nowrap flex items-center gap-2">
                  <span>{t('btn_contact')}</span>
                  <span className="text-xl leading-none group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </m.a>

            <m.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="bg-background text-foreground p-6 md:p-8 border-4 border-background shadow-[10px_10px_0px_0px_var(--primary)] hover:-translate-y-1 hover:shadow-[14px_14px_0px_0px_var(--primary)] transition-all duration-300 mt-2"
            >
              <h3 className="text-2xl font-black uppercase bg-primary text-black inline-block px-3 py-1 mb-6">{t('languages_title')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-lg">
                <div className="border-l-4 border-foreground pl-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="font-black uppercase">{t('lang_es')}</div>
                  <div className="text-sm opacity-80 font-bold">{t('lang_es_lvl')}</div>
                </div>
                <div className="border-l-4 border-foreground pl-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="font-black uppercase">{t('lang_va')}</div>
                  <div className="text-sm opacity-80 font-bold">{t('lang_va_lvl')}</div>
                </div>
                <div className="border-l-4 border-foreground pl-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="font-black uppercase">{t('lang_en')}</div>
                  <div className="text-sm opacity-80 font-bold">{t('lang_en_lvl')}</div>
                </div>
                <div className="border-l-4 border-foreground pl-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="font-black uppercase">{t('lang_fr')}</div>
                  <div className="text-sm opacity-80 font-bold">{t('lang_fr_lvl')}</div>
                </div>
              </div>
            </m.div>

            <m.a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="block relative w-full group cursor-pointer hover:-translate-y-1 transition-transform duration-300 mt-2"
            >
              <div className="absolute inset-0 bg-magenta translate-x-3 translate-y-3 border-4 border-foreground transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4"></div>
              <div className="relative w-full bg-background border-4 border-foreground text-foreground px-8 py-6 rotate-0 md:rotate-[1deg] group-hover:rotate-[0deg] transition-all duration-300 flex justify-between items-center">
                <div>
                  <h3 className="font-black text-2xl md:text-3xl uppercase leading-none mb-2">{t('cv_title')}</h3>
                  <span className="font-mono font-bold uppercase tracking-widest text-sm opacity-70 underline decoration-2 underline-offset-4">{t('cv_download')}</span>
                </div>
                <span className="text-5xl font-black group-hover:animate-bounce">↓</span>
              </div>
            </m.a>

          </div>

        </div>

        <div className="lg:w-7/12 flex flex-col gap-10 w-full z-10">

          <m.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0 }}
            className="bg-background text-foreground p-6 md:p-8 border-4 border-background shadow-[10px_10px_0px_0px_var(--accent)] hover:-translate-y-1 hover:shadow-[14px_14px_0px_0px_var(--accent)] transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-black uppercase bg-accent text-black inline-block px-3 py-1">{t('status_title')}</h3>
              <div className="w-6 h-6 bg-status-green rounded-full animate-pulse border-2 border-foreground shadow-[0_0_10px_var(--status-green-glow)]" />
            </div>
            <p className="font-mono text-xl md:text-2xl font-black uppercase underline decoration-accent decoration-4 underline-offset-4 mb-2">
              {t('status_subtitle')}
            </p>
            <p className="font-mono text-base md:text-lg opacity-90 font-medium">
              {t('status_desc')}
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="bg-background text-foreground p-6 md:p-8 border-4 border-background shadow-[10px_10px_0px_0px_var(--primary)] hover:-translate-y-1 hover:shadow-[14px_14px_0px_0px_var(--primary)] transition-all duration-300"
          >
            <h3 className="text-2xl font-black uppercase bg-primary text-black inline-block px-3 py-1 mb-6">{t('edu_title')}</h3>
            <p className="font-mono text-lg leading-relaxed">
              {t.rich('edu_desc', {
                alcoy: (chunks) => <strong className="uppercase">{chunks}</strong>,
                engineering: (chunks) => <strong className="bg-foreground text-background px-2 py-1">{chunks}</strong>,
                upv: (chunks) => <strong className="underline decoration-primary decoration-4">{chunks}</strong>,
                software: (chunks) => <strong>{chunks}</strong>
              })}
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="bg-background text-foreground p-6 md:p-8 border-4 border-background shadow-[10px_10px_0px_0px_var(--magenta)] hover:-translate-y-1 hover:shadow-[14px_14px_0px_0px_var(--magenta)] transition-all duration-300"
          >
            <h3 className="text-2xl font-black uppercase bg-magenta text-black inline-block px-3 py-1 mb-6">{t('maker_title')}</h3>
            <ul className="font-mono text-lg flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <span className="text-magenta font-black text-xl leading-none">{'>'}</span>
                <span>{t.rich('maker_1', { bold: (chunks) => <strong>{chunks}</strong> })}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-magenta font-black text-xl leading-none">{'>'}</span>
                <span>{t.rich('maker_2', { bold: (chunks) => <strong>{chunks}</strong> })}</span>
              </li>
            </ul>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="bg-background text-foreground p-6 md:p-8 border-4 border-background shadow-[10px_10px_0px_0px_var(--cyan)] hover:-translate-y-1 hover:shadow-[14px_14px_0px_0px_var(--cyan)] transition-all duration-300"
          >
            <h3 className="text-2xl font-black uppercase bg-cyan text-black inline-block px-3 py-1 mb-6">{t('skills_title')}</h3>
            <div className="flex flex-wrap gap-3">
              {t.raw('skills_list').map((skill: string) => (
                <span key={skill} className="font-mono text-sm md:text-base font-bold border-2 border-foreground px-3 py-1 uppercase bg-background hover:bg-foreground hover:text-background transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="bg-background text-foreground p-6 md:p-8 border-4 border-background shadow-[10px_10px_0px_0px_var(--accent)] hover:-translate-y-1 hover:shadow-[14px_14px_0px_0px_var(--accent)] transition-all duration-300"
          >
            <h3 className="text-2xl font-black uppercase bg-accent text-black inline-block px-3 py-1 mb-6">{t('hobbies_title')}</h3>
            <ul className="font-mono text-lg flex flex-col gap-6">
              <li className="flex items-start gap-3">
                <span className="text-accent font-black text-xl leading-none">*</span>
                <span>{t.rich('hobbies_1', { bold: (chunks) => <strong>{chunks}</strong> })}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-black text-xl leading-none">*</span>
                <span>{t.rich('hobbies_2', { bold: (chunks) => <strong>{chunks}</strong> })}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-black text-xl leading-none">*</span>
                <span>{t.rich('hobbies_3', { bold: (chunks) => <strong>{chunks}</strong> })}</span>
              </li>
            </ul>
          </m.div>

        </div>
      </div>

    </section>
  );
}
