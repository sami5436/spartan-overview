"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative py-16 px-4">
            <div className="section-divider mb-16" />
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center"
            >
                <div className="font-[family-name:var(--font-heading)] text-xl font-bold text-white mb-3">
                    ⚡ ISS EPS Overview
                </div>
                <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto leading-relaxed">
                    Built by a{" "}
                    <span className="text-electric font-semibold">SPARTAN Intern</span> at{" "}
                    <span className="text-white font-semibold">NASA Johnson Space Center</span>.
                    All information is based on publicly available NASA documentation and
                    educational resources.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <a
                        href="https://www.nasa.gov/international-space-station/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono px-4 py-2 rounded-lg glass text-slate-300 hover:text-electric hover:border-electric/30 transition-colors"
                    >
                        NASA ISS Page
                    </a>
                    <a
                        href="https://en.wikipedia.org/wiki/Electrical_system_of_the_International_Space_Station"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono px-4 py-2 rounded-lg glass text-slate-300 hover:text-electric hover:border-electric/30 transition-colors"
                    >
                        Wikipedia — ISS EPS
                    </a>
                </div>

                <div className="text-xs text-slate-600">
                    This site is for educational purposes only and is not an official NASA product.
                </div>
            </motion.div>
        </footer>
    );
}
