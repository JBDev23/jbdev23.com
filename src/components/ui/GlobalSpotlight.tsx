"use client";

import { m, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlobalSpotlight() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const cursorSpringConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, cursorSpringConfig);
  const cursorY = useSpring(mouseY, cursorSpringConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setTimeout(() => setMounted(true), 0);
    }
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const maskImageTemplate = useMotionTemplate`radial-gradient(circle max(250px, 35vw) at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  if (!mounted) return null;

  return (
    <>
      <m.div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          maskImage: maskImageTemplate,
          WebkitMaskImage: maskImageTemplate,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: 'radial-gradient(var(--foreground) max(1px, 0.15vw), transparent max(1px, 0.15vw))',
            backgroundSize: 'clamp(14px, 2vw, 24px) clamp(14px, 2vw, 24px)',
          }}
        />
      </m.div>

      <m.div
        className="fixed top-0 left-0 w-10 h-10 mix-blend-difference z-[9999] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <polygon 
            points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" 
            fill="none" 
            stroke="white" 
            strokeWidth="6"
            strokeLinejoin="miter"
          />
        </svg>
      </m.div>

      <m.div
        className="fixed top-0 left-0 w-3 h-3 mix-blend-difference z-[9999] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12 0v24M0 12h24" stroke="white" strokeWidth="4" strokeLinecap="square" />
        </svg>
      </m.div>
    </>
  );
}
