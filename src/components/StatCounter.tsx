"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatCounterProps {
    end: number;
    suffix?: string;
    prefix?: string;
    label: string;
    duration?: number;
}

export default function StatCounter({
    end,
    suffix = "",
    prefix = "",
    label,
    duration = 2,
}: StatCounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <div className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-electric mb-1">
                {prefix}
                {count}
                {suffix}
            </div>
            <div className="text-sm md:text-base text-slate-400 uppercase tracking-wider">
                {label}
            </div>
        </motion.div>
    );
}
