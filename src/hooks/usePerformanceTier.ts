"use client";
import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

export type PerformanceTier = 'high' | 'low';

export function usePerformanceTier() {
  const prefersReducedMotion = useReducedMotion();
  const [tier, setTier] = useState<PerformanceTier>('high');
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setTimeout(() => setIsMobile(mediaQuery.matches), 0);
    
    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleResize);

    const cpuCores = navigator.hardwareConcurrency || 4;
    // @ts-expect-error - deviceMemory is not available in Safari/Firefox
    const deviceMemory = navigator.deviceMemory || 4;
    // @ts-expect-error - saveData is not in standard types
    const saveData = navigator.connection?.saveData || false;

    if (cpuCores <= 4 || deviceMemory < 4 || saveData) {
      setTimeout(() => setTier('low'), 0);
    }

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const shouldReduceAnimations = !isMounted || prefersReducedMotion || isMobile || tier === 'low';

  return { tier, prefersReducedMotion, isMobile, shouldReduceAnimations, isMounted };
}
