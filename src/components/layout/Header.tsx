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

    const navLinks = [
        { name: t("nav_work"), href: { pathname: '/', hash: 'work' }, bgClass: "bg-accent text-black" },
        { name: t("nav_skills"), href: { pathname: '/', hash: 'skills' }, bgClass: "bg-white text-black" },
        { name: t("nav_about"), href: { pathname: '/', hash: 'about' }, bgClass: "bg-white text-black" },
        { name: t("nav_contact"), href: { pathname: '/', hash: 'contact' }, bgClass: "bg-primary text-white" },
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
                    className="md:hidden p-2 border-4 border-black shadow-[8px_8px_0px_0px_var(--foreground)] bg-white text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
                    )}
                </button>
                <div className="hidden md:flex gap-6 lg:gap-8 items-center pr-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href as React.ComponentProps<typeof Link>['href']}
                            className={`font-bold uppercase px-4 py-2 text-sm md:text-base brutalist-border brutalist-shadow-dark hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all ${link.bgClass}`}
                        >
                            {link.name}
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
                                onClick={closeMenu}
                                className={`font-bold uppercase px-4 py-4 text-center text-lg brutalist-border ${link.bgClass}`}
                            >
                                {link.name}
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
