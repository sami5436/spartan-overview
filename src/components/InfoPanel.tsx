"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EPSComponent } from "./ISSModel";

interface InfoPanelProps {
    component: EPSComponent | null;
    onClose: () => void;
}

export default function InfoPanel({ component, onClose }: InfoPanelProps) {
    return (
        <AnimatePresence>
            {component && (
                <motion.div
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="absolute top-16 right-0 bottom-0 w-full md:w-[400px] pointer-events-auto overflow-y-auto"
                >
                    <div className="h-full bg-space-900/90 backdrop-blur-xl border-l border-white/5 p-6 md:p-8">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                            aria-label="Close panel"
                        >
                            ✕
                        </button>

                        {/* Color accent bar */}
                        <div
                            className="w-12 h-1 rounded-full mb-6"
                            style={{ backgroundColor: component.color }}
                        />

                        {/* Component name */}
                        <h2
                            className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mb-3"
                            style={{ color: component.color }}
                        >
                            {component.name}
                        </h2>

                        {/* Description */}
                        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-8">
                            {component.description}
                        </p>

                        {/* Details */}
                        <div className="space-y-3">
                            <h3 className="text-xs uppercase tracking-wider text-slate-500 font-mono mb-3">
                                Key Facts
                            </h3>
                            {component.details.map((detail, i) => (
                                <motion.div
                                    key={detail}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.06 }}
                                    className="flex items-start gap-3"
                                >
                                    <div
                                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                                        style={{ backgroundColor: component.color }}
                                    />
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {detail}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Link to section below */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-10"
                        >
                            <a
                                href={`#${getSectionId(component.id)}`}
                                onClick={onClose}
                                className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                                style={{ color: component.color }}
                            >
                                <span>Learn more below</span>
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function getSectionId(componentId: string): string {
    switch (componentId) {
        case "solar-arrays":
            return "solar";
        case "batteries":
            return "batteries";
        case "pmad":
        case "radiators":
            return "pmad";
        case "modules":
            return "pmad";
        default:
            return "solar";
    }
}
