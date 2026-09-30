"use client";

import { useRef } from 'react';
import { Link } from '@/i18n/routing';
import { m, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslations } from 'next-intl';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const t = useTranslations('Footer');
  const containerRef = useRef<HTMLElement>(null);
  const { shouldReduceAnimations, isMobile } = usePerformanceTier();
  const disableAnim = shouldReduceAnimations || isMobile;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const y = useTransform(smoothProgress, [0, 1], disableAnim ? [0, 0] : [150, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], disableAnim ? [1, 1, 1] : [0, 1, 1]);


  return (
    <footer ref={containerRef} className="w-full relative z-20 overflow-hidden bg-background">
      <m.div
        style={{ y, opacity }}
        className="w-full bg-foreground text-background relative flex flex-col items-center pb-8 border-t-8 border-foreground shadow-[0_-8px_0_0_var(--primary)]"
      >


        <div className="max-w-[90%] w-full flex flex-col md:flex-row justify-between items-center gap-12 z-10 relative pt-16 px-4 md:px-8">

          <div className="flex flex-col gap-4 text-center md:text-left">
            <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none hover:text-primary transition-colors duration-300">
              JBDev23
            </h3>
            <p className="font-mono text-xl uppercase font-bold text-accent px-3 py-1 bg-foreground border-2 border-background inline-block w-max mx-auto md:mx-0 shadow-[4px_4px_0_0_var(--background)]">
              {t('software_engineer')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-end gap-6 items-center pt-8 md:pt-0 max-w-lg">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group relative inline-block w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-background translate-x-2 translate-y-2 border-4 border-background transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>
              <div className="relative bg-background text-foreground border-4 border-background px-8 py-4 font-black text-xl uppercase hover:-translate-y-1 transition-transform duration-300 flex items-center justify-center group-hover:bg-foreground group-hover:text-background group-hover:border-background">
                {t('email')}
              </div>
            </a>

            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 border-4 border-background transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>
              <div className="relative bg-background text-foreground border-4 border-background px-8 py-4 font-black text-xl uppercase hover:-translate-y-1 transition-transform duration-300 flex items-center justify-center group-hover:bg-primary group-hover:text-background group-hover:border-background">
                {t('github')}
              </div>
            </a>

            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-accent translate-x-2 translate-y-2 border-4 border-background transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>
              <div className="relative bg-background text-foreground border-4 border-background px-8 py-4 font-black text-xl uppercase hover:-translate-y-1 transition-transform duration-300 flex items-center justify-center group-hover:bg-accent group-hover:text-foreground group-hover:border-background">
                {t('linkedin')}
              </div>
            </a>
          </div>
        </div>

        <div className="w-full mt-24 px-4 md:px-8 max-w-[90%] z-10 relative">
          <div className="w-full border-t-4 border-background pt-8 flex flex-col lg:flex-row justify-between items-center gap-8 font-mono uppercase font-bold text-xs md:text-sm opacity-90">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <span>© {new Date().getFullYear()} {siteConfig.name}</span>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
                <Link href="/aviso-legal" className="hover:text-primary hover:underline decoration-2 underline-offset-4 transition-colors">
                  {t('legal_notice')}
                </Link>
                <Link href="/politica-privacidad" className="hover:text-primary hover:underline decoration-2 underline-offset-4 transition-colors">
                  {t('privacy_policy')}
                </Link>
                <Link href="/politica-cookies" className="hover:text-primary hover:underline decoration-2 underline-offset-4 transition-colors">
                  {t('cookies_policy')}
                </Link>
              </div>
            </div>

            <span className="flex items-center gap-2">
              {t('built_with')}
              <span className="text-primary animate-pulse text-xl">❤</span>
              {t('and_brutalism')}
            </span>
          </div>
        </div>

        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 text-[20rem] md:text-[30rem] opacity-5 pointer-events-none font-black text-background leading-none select-none">
          *
        </div>
        <div className="absolute bottom-0 right-10 translate-y-1/4 text-[15rem] md:text-[25rem] opacity-5 pointer-events-none font-black text-background leading-none select-none">
          *
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] md:text-[45rem] opacity-5 pointer-events-none font-black text-background leading-none select-none">
          *
        </div>
        <div className="absolute top-1/4 right-1/4 text-[10rem] md:text-[15rem] opacity-5 pointer-events-none font-black text-background leading-none select-none">
          *
        </div>
      </m.div>
    </footer>
  );
}
