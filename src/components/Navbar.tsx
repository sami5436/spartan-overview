"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
    { id: "hero", label: "Home" },
    { id: "solar", label: "Solar Arrays" },
    { id: "batteries", label: "Batteries" },
    { id: "pmad", label: "PMAD" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("hero");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = NAV_ITEMS.map((item) => ({
                id: item.id,
                el: document.getElementById(item.id),
            }));

            const current = sections
                .filter((s) => s.el)
                .reverse()
                .find((s) => {
                    const rect = s.el!.getBoundingClientRect();
                    return rect.top <= 200;
                });

            if (current) setActiveSection(current.id);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-[#0a0d1a]/90 backdrop-blur-xl border-b border-white/[0.06]"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                    <button
                        onClick={() => scrollTo("hero")}
                        className="font-[family-name:var(--font-heading)] text-sm font-bold text-white hover:text-amber-400 transition-colors tracking-wide uppercase"
                    >
                        ISS EPS
                    </button>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className={`relative px-4 py-2 text-xs font-medium rounded-md transition-colors uppercase tracking-wider ${activeSection === item.id
                                    ? "text-amber-400"
                                    : "text-slate-500 hover:text-slate-200"
                                    }`}
                            >
                                {activeSection === item.id && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className="absolute inset-0 bg-amber-400/[0.06] rounded-md border border-amber-400/10"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                                <span className="relative z-10">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className="w-5 h-0.5 bg-slate-300 block"
                        />
                        <motion.span
                            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-5 h-0.5 bg-slate-300 block"
                        />
                        <motion.span
                            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className="w-5 h-0.5 bg-slate-300 block"
                        />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-[#0a0d1a]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
                    >
                        {NAV_ITEMS.map((item, i) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => scrollTo(item.id)}
                                className={`text-2xl font-[family-name:var(--font-heading)] font-bold ${activeSection === item.id ? "text-amber-400" : "text-slate-400"
                                    }`}
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
