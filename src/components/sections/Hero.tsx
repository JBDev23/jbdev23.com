"use client";

import Marquee from "@/components/ui/Marquee";
import { m, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from '@/i18n/routing';
import { useTranslations } from "next-intl";
import { usePerformanceTier } from '@/hooks/usePerformanceTier';

export default function Hero() {
  const t = useTranslations("Hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const { tier, isMobile } = usePerformanceTier();
  const disableHeavyMask = tier === 'low' || isMobile;

  useEffect(() => {
    if (typeof window !== "undefined" && (window as typeof window & { isIntroDone?: boolean }).isIntroDone) {
      setTimeout(() => setIntroDone(true), 0);
    }

    const handleIntroDone = () => setIntroDone(true);
    window.addEventListener("introDone", handleIntroDone);

    return () => {
      window.removeEventListener("introDone", handleIntroDone);
    };
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const size = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothSize = useSpring(size, { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => size.set(300);
  const handleMouseLeave = () => size.set(0);

  const octoMaskUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,0 70,0 100,30 100,70 70,100 30,100 0,70 0,30' fill='black'/%3E%3C/svg%3E")`;
  const maskSizeTemplate = useMotionTemplate`${smoothSize}px ${smoothSize}px`;
  const maskPositionTemplate = useMotionTemplate`calc(${smoothX}px - (${smoothSize}px / 2)) calc(${smoothY}px - (${smoothSize}px / 2))`;

  return (
    <section className="flex flex-col min-h-[90dvh] w-full relative">
      <div className="flex-1 flex flex-col justify-center py-4 md:py-8">
        <div
          className="w-full relative cursor-none"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <m.svg
            initial={{ opacity: 1, scale: 0.9 }}
            animate={introDone ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 0.9 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            viewBox="0 0 1000 180"
            className="w-full h-auto select-none relative z-0"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="64%"
              textLength="1000"
              lengthAdjust="spacing"
              dominantBaseline="middle"
              textAnchor="middle"
              className="font-black uppercase"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "240px",
                fontWeight: 900
              }}
              fill="var(--foreground)"
            >
              JBDEV<tspan fill="var(--primary)">23</tspan>
            </text>
          </m.svg>

          {!disableHeavyMask ? (
            <m.div
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
              style={{
                maskImage: octoMaskUrl,
                WebkitMaskImage: octoMaskUrl,
                maskSize: maskSizeTemplate,
                WebkitMaskSize: maskSizeTemplate,
                maskPosition: maskPositionTemplate,
                WebkitMaskPosition: maskPositionTemplate,
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                willChange: "mask-position, -webkit-mask-position"
              }}
            >
              <m.svg
                initial={{ opacity: 1, scale: 0.9 }}
                animate={introDone ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 0.9 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                viewBox="0 0 1000 180"
                className="w-full h-auto select-none relative"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <pattern id="dotsForeground" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <circle cx="7" cy="7" r="1.5" fill="var(--foreground)" />
                  </pattern>
                  <pattern id="dotsPrimary" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <circle cx="7" cy="7" r="1.5" fill="var(--primary)" />
                  </pattern>
                </defs>

                <text
                  x="50%"
                  y="64%"
                  textLength="1000"
                  lengthAdjust="spacing"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="font-black uppercase"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "240px",
                    fontWeight: 900
                  }}
                  fill="var(--primary)"
                >
                  JBDEV<tspan fill="var(--foreground)">23</tspan>
                </text>

                <text
                  x="50%"
                  y="64%"
                  textLength="1000"
                  lengthAdjust="spacing"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="font-black uppercase"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "240px",
                    fontWeight: 900
                  }}
                  fill="url(#dotsForeground)"
                >
                  JBDEV<tspan fill="url(#dotsPrimary)">23</tspan>
                </text>
              </m.svg>
            </m.div>
          ) : null}

          <m.h2
            initial={{ opacity: 1, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 1, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full text-center font-space-grotesk uppercase tracking-[0.15em] md:tracking-[0.3em] text-sm md:text-xl lg:text-2xl font-medium text-foreground z-10 pointer-events-none"
          >
            Jordi Barrachina Méndez
          </m.h2>
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute hidden sm:block left-8 md:left-16 top-[75%] -translate-y-1/2 text-primary font-mono text-6xl md:text-9xl animate-float pointer-events-none select-none font-black z-0"
        >
          {"{ }"}
        </m.div>
        <m.div
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute hidden sm:block right-8 md:right-16 top-[75%] -translate-y-1/2 text-primary font-mono text-6xl md:text-9xl animate-float-delayed pointer-events-none select-none font-black tracking-tighter z-0"
        >
          {"</>"}
        </m.div>

        <div className="w-full px-4 flex flex-col items-center gap-6 mt-8 sm:mt-20 z-10 relative">
          <m.p
            initial={{ opacity: 1, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 1, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-3xl max-w-3xl font-bold text-center mx-auto text-foreground drop-shadow-md"
          >
            {t.rich('subtitle', {
              br: () => <br />,
              primary: (chunks) => <span className="text-primary">{chunks}</span>
            })}
          </m.p>

          <m.div
            initial={{ opacity: 1, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 1, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full px-4 sm:px-0"
          >
            <Link href={{ pathname: '/', hash: 'work' }} className="font-bold uppercase bg-primary text-white px-8 py-3 sm:py-4 brutalist-border brutalist-shadow hover:bg-white hover:text-black transition-colors text-center w-full sm:w-auto">
              {t('btn_projects')}
            </Link>
            <Link href={{ pathname: '/', hash: 'contact' }} className="font-bold uppercase bg-white text-black px-8 py-3 sm:py-4 brutalist-border brutalist-shadow hover:bg-primary hover:text-white transition-colors text-center w-full sm:w-auto">
              {t('btn_contact')}
            </Link>
          </m.div>
        </div>
      </div>

      <m.div
        initial={{ opacity: 0, y: 50 }}
        animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, type: "spring", delay: 0.5 }}
        className="absolute bottom-0 left-0 w-full overflow-hidden"
      >
        <Marquee items={t.raw('marquee_items')} />
      </m.div>
    </section>
  );
}
