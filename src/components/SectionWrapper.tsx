"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
    children: ReactNode;
    id: string;
    className?: string;
}

export default function SectionWrapper({
    children,
    id,
    className = "",
}: SectionWrapperProps) {
    return (
        <section id={id} className={`relative py-20 md:py-32 px-4 ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-6xl mx-auto"
            >
                {children}
            </motion.div>
        </section>
    );
}

export function SectionTitle({
    children,
    accent = "electric",
}: {
    children: ReactNode;
    accent?: "electric" | "solar";
}) {
    const accentColor =
        accent === "electric" ? "text-electric" : "text-solar";
    const lineColor =
        accent === "electric"
            ? "from-transparent via-electric to-transparent"
            : "from-transparent via-solar to-transparent";

    return (
        <div className="mb-12 md:mb-16">
            <h2
                className={`font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold ${accentColor} mb-4`}
            >
                {children}
            </h2>
            <div
                className={`h-px w-24 bg-gradient-to-r ${lineColor} opacity-60`}
            />
        </div>
    );
}
