"use client";

import { useRef, useState } from 'react';
import { m, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslations } from 'next-intl';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { siteConfig } from '@/config/site';

export default function ContactSection() {
  const t = useTranslations('Contact');
  const containerRef = useRef<HTMLElement>(null);
  const { shouldReduceAnimations, isMobile } = usePerformanceTier();
  const disableAnim = shouldReduceAnimations || isMobile;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchema = z.object({
    name: z.string().min(1, { message: t('errors.nameRequired') }),
    email: z.string().min(1, { message: t('errors.emailRequired') }).email({ message: t('errors.emailInvalid') }),
    message: z.string().min(10, { message: t('errors.messageTooShort') }),
    terms: z.boolean().refine((val) => val === true, {
      message: t('errors.termsRequired')
    }),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Network response was not ok');
      }

      toast.success(t('form.success'));
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });

  const badgeY = useTransform(smoothProgress, [0, 1], disableAnim ? [0, 0] : [50, 0]);
  const titleY = useTransform(smoothProgress, [0, 1], disableAnim ? [0, 0] : [100, 0]);
  const emailY = useTransform(smoothProgress, [0, 1], disableAnim ? [0, 0] : [150, 0]);
  const formY = useTransform(smoothProgress, [0, 1], disableAnim ? [0, 0] : [175, 0]);
  const socialY = useTransform(smoothProgress, [0, 1], disableAnim ? [0, 0] : [200, 0]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative pb-24 md:pb-32 text-foreground flex flex-col items-center z-10 section-deferred overflow-clip"
    >

      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] -rotate-4 flex items-center overflow-hidden z-0 opacity-5 pointer-events-none">
        <m.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex whitespace-nowrap font-black text-4xl md:text-5xl uppercase tracking-widest"
        >
          <span>LET&apos;S TALK • CONTACT ME • SAY HELLO • FREELANCE • LET&apos;S TALK • CONTACT ME • SAY HELLO • FREELANCE • LET&apos;S TALK • CONTACT ME • SAY HELLO • FREELANCE •&nbsp;</span>
          <span>LET&apos;S TALK • CONTACT ME • SAY HELLO • FREELANCE • LET&apos;S TALK • CONTACT ME • SAY HELLO • FREELANCE • LET&apos;S TALK • CONTACT ME • SAY HELLO • FREELANCE •&nbsp;</span>
        </m.div>
      </div>

      <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] rotate-6 flex items-center overflow-hidden z-0 opacity-10 pointer-events-none">
        <m.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap font-black text-4xl md:text-5xl uppercase tracking-widest text-transparent"
          style={{ WebkitTextStroke: '2px var(--foreground)' }}
        >
          <span>GET IN TOUCH • SEND A MESSAGE • HIRE ME • GET IN TOUCH • SEND A MESSAGE • HIRE ME • GET IN TOUCH • SEND A MESSAGE • HIRE ME • GET IN TOUCH • SEND A MESSAGE • HIRE ME •&nbsp;</span>
          <span>GET IN TOUCH • SEND A MESSAGE • HIRE ME • GET IN TOUCH • SEND A MESSAGE • HIRE ME • GET IN TOUCH • SEND A MESSAGE • HIRE ME • GET IN TOUCH • SEND A MESSAGE • HIRE ME •&nbsp;</span>
        </m.div>
      </div>

      <div className="relative z-10 px-4 md:px-8 mx-auto w-full max-w-7xl flex flex-col items-center gap-16 mt-8">

        <m.div
          style={{ y: badgeY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 bg-foreground text-background px-6 py-3 border-4 border-foreground shadow-[8px_8px_0px_0px_var(--accent)] rotate-[-2deg] hover:rotate-[1deg] transition-transform duration-300"
        >
          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-background" />
          <span className="font-mono font-black uppercase tracking-widest text-sm md:text-lg">
            {t('badge')}
          </span>
        </m.div>

        <div className="text-center w-full flex flex-col items-center">
          <m.h2
            style={{ y: titleY }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="text-4xl md:text-6xl font-black uppercase mb-12 drop-shadow-[4px_4px_0_var(--primary)]"
          >
            {t('title')}
          </m.h2>
          <m.a
            style={{ y: emailY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href={`mailto:${siteConfig.email}`}
            className="group relative inline-block w-full max-w-6xl"
          >
            <div className="absolute inset-0 bg-magenta translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 border-4 border-foreground transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4 md:group-hover:translate-x-6 md:group-hover:translate-y-6"></div>
            <div className="relative w-full bg-background border-4 border-foreground text-foreground py-8 md:py-16 px-4 hover:-translate-y-2 transition-transform duration-300 flex items-center justify-center overflow-hidden">
              <span className="font-black text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl break-all px-4 z-10 relative">
                {siteConfig.email}
              </span>

              <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 group-hover:rotate-45 group-hover:scale-150 transition-all duration-500">
                ↗
              </div>
            </div>
          </m.a>
        </div>

        <m.div
          style={{ y: formY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl bg-background border-4 border-foreground p-8 md:p-12 shadow-[12px_12px_0px_0px_var(--foreground)] mt-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase tracking-widest text-sm">{t('form.name')}</label>
                <input
                  {...register('name')}
                  placeholder={t('form.namePlaceholder')}
                  className="bg-transparent border-4 border-foreground p-4 outline-none focus:bg-foreground/5 transition-colors placeholder:text-foreground/40 font-mono"
                />
                {errors.name && <span className="text-red-500 font-bold text-sm uppercase">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase tracking-widest text-sm">{t('form.email')}</label>
                <input
                  {...register('email')}
                  placeholder={t('form.emailPlaceholder')}
                  className="bg-transparent border-4 border-foreground p-4 outline-none focus:bg-foreground/5 transition-colors placeholder:text-foreground/40 font-mono"
                />
                {errors.email && <span className="text-red-500 font-bold text-sm uppercase">{errors.email.message}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold uppercase tracking-widest text-sm">{t('form.message')}</label>
              <textarea
                {...register('message')}
                placeholder={t('form.messagePlaceholder')}
                rows={5}
                className="bg-transparent border-4 border-foreground p-4 outline-none focus:bg-foreground/5 transition-colors placeholder:text-foreground/40 font-mono resize-y"
              />
              {errors.message && <span className="text-red-500 font-bold text-sm uppercase">{errors.message.message}</span>}
            </div>

            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                id="terms"
                {...register('terms')}
                className="w-5 h-5 appearance-none border-2 border-foreground checked:bg-primary checked:border-foreground relative cursor-pointer
                  after:content-[''] after:absolute after:hidden checked:after:block after:left-[4px] after:top-[1px] after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-foreground after:rotate-45"
              />
              <label htmlFor="terms" className="text-sm font-bold uppercase cursor-pointer">
                {t('form.termsLabel')} <a href="/politica-privacidad" target="_blank" className="underline decoration-2 underline-offset-2 hover:text-primary transition-colors">{t('form.termsLink')}</a>
              </label>
            </div>
            {errors.terms && <span className="text-red-500 font-bold text-sm uppercase">{errors.terms.message}</span>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 bg-primary text-foreground border-4 border-foreground py-4 px-8 font-black uppercase text-xl md:text-2xl hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--foreground)] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <span className="relative z-10">{isSubmitting ? t('form.submitting') : t('form.submit')}</span>
              <div className="absolute inset-0 bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 opacity-10"></div>
            </button>
          </form>
        </m.div>

        <m.div
          style={{ y: socialY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-8"
        >
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background text-foreground font-black uppercase text-2xl md:text-4xl px-8 py-10 border-4 border-foreground shadow-[10px_10px_0px_0px_var(--cyan)] hover:shadow-[15px_15px_0px_0px_var(--cyan)] hover:-translate-y-2 transition-all duration-300 flex justify-between items-center group"
          >
            <span>LinkedIn</span>
            <span className="text-white group-hover:rotate-45 transition-transform duration-300">↗</span>
          </a>

          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background text-foreground font-black uppercase text-2xl md:text-4xl px-8 py-10 border-4 border-foreground shadow-[10px_10px_0px_0px_var(--cyan)] hover:shadow-[15px_15px_0px_0px_var(--github-bg)] hover:-translate-y-2 transition-all duration-300 flex justify-between items-center group"
          >
            <span>GitHub</span>
            <span className="group-hover:rotate-45 transition-transform duration-300">↗</span>
          </a>
        </m.div>

      </div>
    </section>
  );
}
