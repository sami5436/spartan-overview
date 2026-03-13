"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative py-20 px-4 border-t border-white/[0.04]">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left — About */}
                    <div>
                        <div className="font-[family-name:var(--font-heading)] text-lg font-bold text-white mb-3">
                            ISS EPS Overview
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                            Built by a{" "}
                            <span className="text-electric font-medium">SPARTAN Intern</span> at{" "}
                            <span className="text-white font-medium">NASA Johnson Space Center</span>.
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            All information is based on publicly available NASA documentation, research
                            papers, and educational resources. This is not an official NASA product.
                        </p>
                    </div>

                    {/* Right — References */}
                    <div>
                        <div className="text-xs font-mono uppercase tracking-[0.2em] text-slate-600 mb-4">
                            References
                        </div>
                        <div className="space-y-2">
                            {[
                                {
                                    label: "NASA ISS Program",
                                    url: "https://www.nasa.gov/international-space-station/",
                                },
                                {
                                    label: "Wikipedia — ISS Electrical System",
                                    url: "https://en.wikipedia.org/wiki/Electrical_system_of_the_International_Space_Station",
                                },
                                {
                                    label: "NASA Technical Reports",
                                    url: "https://ntrs.nasa.gov/",
                                },
                            ].map((ref) => (
                                <a
                                    key={ref.label}
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-sm text-slate-500 hover:text-electric transition-colors"
                                >
                                    {ref.label} →
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-white/[0.04] text-center">
                    <p className="text-[10px] text-slate-700 uppercase tracking-wider">
                        For educational purposes only · Not an official NASA product
                    </p>
                </div>
            </motion.div>
        </footer>
    );
}
