"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

export default function IntroAnimation() {
  const t = useTranslations("UI");
  const [stage, setStage] = useState(() => {
    if (typeof window !== "undefined" && (window as typeof window & { isIntroDone?: boolean }).isIntroDone) {
      return 4;
    }
    return 0;
  });

  const timer1 = useRef<NodeJS.Timeout | null>(null);
  const timer2 = useRef<NodeJS.Timeout | null>(null);
  const timer3 = useRef<NodeJS.Timeout | null>(null);
  const timer4 = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (stage === 4) return;

    document.body.style.overflow = "hidden";

    timer1.current = setTimeout(() => setStage(1), 800);

    timer2.current = setTimeout(() => setStage(2), 1300);

    timer3.current = setTimeout(() => setStage(3), 1700);

    timer4.current = setTimeout(() => {
      setStage(4);
      if (typeof window !== "undefined") (window as typeof window & { isIntroDone?: boolean }).isIntroDone = true;
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("introDone"));
    }, 2200);

    return () => {
      if (timer1.current) clearTimeout(timer1.current);
      if (timer2.current) clearTimeout(timer2.current);
      if (timer3.current) clearTimeout(timer3.current);
      if (timer4.current) clearTimeout(timer4.current);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSkip = () => {
    if (timer1.current) clearTimeout(timer1.current);
    if (timer2.current) clearTimeout(timer2.current);
    if (timer3.current) clearTimeout(timer3.current);
    if (timer4.current) clearTimeout(timer4.current);

    if (stage < 3) {
      setStage(3);
      
      setTimeout(() => {
        setStage(4);
        if (typeof window !== "undefined") (window as typeof window & { isIntroDone?: boolean }).isIntroDone = true;
        document.body.style.overflow = "";
        window.dispatchEvent(new Event("introDone"));
      }, 700);
    }
  };

  if (stage === 4) return null;

  return (
    <div
      className={`fixed inset-0 z-60 flex items-center justify-center overflow-hidden transition-transform duration-700 ease-in-out ${stage === 3 ? "-translate-y-full" : "translate-y-0"
        }`}
    >

      <div className="absolute inset-0 bg-black" />

      <div
        className={`absolute inset-0 bg-primary transition-transform duration-500 ease-in-out origin-bottom ${stage >= 2 ? "scale-y-100" : "scale-y-0"
          }`}
      />

      <div className={`relative z-10 w-full max-w-4xl px-4 transition-opacity duration-300 ${stage >= 2 ? "opacity-0" : "opacity-100"}`}>
        <svg viewBox="0 0 800 200" className="w-full h-auto">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="uppercase"
            style={{
              fontFamily: "var(--font-space-grotesk), monospace",
              fontWeight: 900,
              fontSize: "120px",
              fill: stage >= 1 ? "var(--primary)" : "transparent",
              stroke: "var(--primary)",
              strokeWidth: "2px",
              strokeDasharray: "2000",
              strokeDashoffset: stage >= 1 ? "0" : "2000",
              transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), fill 0.4s ease-in-out",
            }}
          >
            JBDev23
          </text>
        </svg>
      </div>

      {stage < 3 && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 z-50 text-white/50 hover:text-white uppercase tracking-[0.2em] font-space-grotesk text-sm font-bold transition-colors cursor-pointer border border-white/20 px-4 py-2 hover:bg-white/10"
        >
          {t("skip_intro")}
        </button>
      )}
    </div>
  );
}
