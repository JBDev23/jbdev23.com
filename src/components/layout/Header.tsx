"use client";

import { Link } from '@/i18n/routing';
import { m, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Header3() {
    const t = useTranslations("Header");
    const [introDone, setIntroDone] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        setIsMenuOpen(false);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `#${targetId}`);

            setTimeout(() => {
                const el = document.getElementById(targetId);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            }, 500);
        }
    };

    const navLinks = [
        { name: t("nav_work"), href: { pathname: '/', hash: 'work' }, id: 'work' },
        { name: t("nav_skills"), href: { pathname: '/', hash: 'skills' }, id: 'skills' },
        { name: t("nav_experience"), href: { pathname: '/', hash: 'experience' }, id: 'experience' },
        { name: t("nav_about"), href: { pathname: '/', hash: 'about' }, id: 'about' },
        { name: t("nav_contact"), href: { pathname: '/', hash: 'contact' }, id: 'contact' },
    ];

    return (
        <m.header
            initial={{ y: -100, opacity: 0 }}
            animate={introDone ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.6 }}
            className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 bg-background border-b-4 border-foreground min-h-[10dvh] flex flex-col justify-center"
        >
            <div className="flex justify-between items-center w-full">
                <Link href="/" onClick={closeMenu}>
                    <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter hover:text-primary transition-colors cursor-pointer group">
                        JBDEV<span className="text-primary group-hover:text-foreground transition-colors">23</span>
                    </h1>
                </Link>
                <button
                    className="md:hidden group relative inline-block w-12 h-12"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <div className="absolute inset-0 bg-primary translate-x-1.5 translate-y-1.5 border-2 border-foreground transition-transform duration-300 group-active:translate-x-0 group-active:translate-y-0"></div>
                    <div className="relative bg-foreground text-background border-2 border-foreground w-full h-full flex items-center justify-center transition-transform duration-300 group-active:translate-x-1.5 group-active:translate-y-1.5">
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
                        )}
                    </div>
                </button>
                <div className="hidden md:flex gap-6 lg:gap-8 items-center pr-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href as React.ComponentProps<typeof Link>['href']}
                            onClick={(e) => handleScroll(e, link.id)}
                            className="group relative inline-block"
                        >
                            <div className="absolute inset-0 bg-primary translate-x-1.5 translate-y-1.5 border-2 border-foreground transition-transform duration-300 group-hover:translate-x-2.5 group-hover:translate-y-2.5"></div>
                            <div className="relative bg-foreground text-background border-2 border-foreground px-4 py-2 font-bold uppercase text-sm md:text-base hover:-translate-y-1 transition-transform duration-300 flex items-center justify-center group-hover:bg-primary group-hover:text-background">
                                {link.name}
                            </div>
                        </Link>
                    ))}
                    <LanguageSwitcher />
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden flex flex-col gap-4 mt-6 pb-4"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href as React.ComponentProps<typeof Link>['href']}
                                onClick={(e) => handleScroll(e, link.id)}
                                className="group relative inline-block mx-4"
                            >
                                <div className="absolute inset-0 bg-primary translate-x-1.5 translate-y-1.5 border-2 border-foreground transition-transform duration-300 group-hover:translate-x-2.5 group-hover:translate-y-2.5"></div>
                                <div className="relative bg-foreground text-background border-2 border-foreground px-4 py-4 font-bold uppercase text-center text-lg hover:-translate-y-1 transition-transform duration-300 flex items-center justify-center group-hover:bg-primary group-hover:text-background">
                                    {link.name}
                                </div>
                            </Link>
                        ))}
                        <div className="flex justify-center mt-2">
                            <LanguageSwitcher />
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </m.header>
    );
}
