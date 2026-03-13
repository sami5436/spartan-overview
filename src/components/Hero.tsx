"use client";

import { motion } from "framer-motion";
import StatCounter from "./StatCounter";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
        >
            {/* Radial glow behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-solar/5 rounded-full blur-[80px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center max-w-4xl relative z-10"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-electric mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-electric animate-pulse-glow" />
                    International Space Station
                </motion.div>

                <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                    Powering the{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-blue-400">
                        ISS
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                    The International Space Station orbits Earth every{" "}
                    <span className="text-electric font-semibold">90 minutes</span> at{" "}
                    <span className="text-electric font-semibold">17,500 mph</span>. Its
                    Electrical Power System is one of the most complex power grids ever
                    built — and it works{" "}
                    <span className="text-solar font-semibold">250 miles</span> above our
                    heads.
                </p>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 glass rounded-2xl px-6 py-8 md:px-10 md:py-10 max-w-3xl mx-auto"
                >
                    <StatCounter end={240} suffix=" kW" label="Peak Power" />
                    <StatCounter end={8} label="Solar Array Wings" />
                    <StatCounter end={90} suffix=" min" label="Orbital Period" />
                    <StatCounter end={120} suffix=" Vdc" label="Secondary Bus" />
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-slate-500 uppercase tracking-widest">
                    Scroll to explore
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-5 h-8 rounded-full border-2 border-slate-600 flex items-start justify-center pt-1.5"
                >
                    <div className="w-1 h-1.5 rounded-full bg-electric" />
                </motion.div>
            </motion.div>
        </section>
    );
}
