"use client";

import { motion } from "framer-motion";
import SectionWrapper, { SectionTitle } from "./SectionWrapper";

const ARRAY_FACTS = [
    {
        title: "8 Solar Array Wings",
        description:
            "The ISS has four sets of solar array wings, mounted on the Integrated Truss Structure. Each set has two wings, giving a total of eight massive solar blankets that track the sun as the station orbits Earth.",
        icon: (
            <svg viewBox="0 0 48 48" className="w-10 h-10">
                <rect x="4" y="20" width="16" height="8" rx="1" fill="#ffb800" opacity="0.8" />
                <rect x="28" y="20" width="16" height="8" rx="1" fill="#ffb800" opacity="0.8" />
                <rect x="21" y="16" width="6" height="16" rx="1" fill="#94a3b8" />
                <line x1="8" y1="22" x2="8" y2="26" stroke="#0a0e27" strokeWidth="0.5" />
                <line x1="12" y1="22" x2="12" y2="26" stroke="#0a0e27" strokeWidth="0.5" />
                <line x1="16" y1="22" x2="16" y2="26" stroke="#0a0e27" strokeWidth="0.5" />
                <line x1="32" y1="22" x2="32" y2="26" stroke="#0a0e27" strokeWidth="0.5" />
                <line x1="36" y1="22" x2="36" y2="26" stroke="#0a0e27" strokeWidth="0.5" />
                <line x1="40" y1="22" x2="40" y2="26" stroke="#0a0e27" strokeWidth="0.5" />
            </svg>
        ),
    },
    {
        title: "35m × 12m Each Wing",
        description:
            "Each solar array wing stretches about 115 feet long and 39 feet wide — roughly the size of a large house. Together, they cover an area larger than a football field and represent the largest solar arrays ever deployed in space.",
        icon: (
            <svg viewBox="0 0 48 48" className="w-10 h-10">
                <rect x="6" y="10" width="36" height="28" rx="2" fill="none" stroke="#ffb800" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="24" y="27" textAnchor="middle" fill="#ffb800" fontSize="8" fontFamily="monospace">35×12</text>
            </svg>
        ),
    },
    {
        title: "Up to 32,800 Cells",
        description:
            "Each power channel can have up to 32,800 individual photovoltaic (solar) cells. These cells are made of silicon and convert sunlight directly into DC electricity — the same technology behind rooftop solar panels, but engineered for the extreme environment of space.",
        icon: (
            <svg viewBox="0 0 48 48" className="w-10 h-10">
                <g fill="#ffb800" opacity="0.7">
                    {[0, 1, 2, 3, 4].map((row) =>
                        [0, 1, 2, 3, 4].map((col) => (
                            <rect
                                key={`${row}-${col}`}
                                x={6 + col * 8}
                                y={6 + row * 8}
                                width="6"
                                height="6"
                                rx="0.5"
                            />
                        ))
                    )}
                </g>
            </svg>
        ),
    },
    {
        title: "Sun-Tracking Gimbals",
        description:
            "Each solar array is mounted on a motorized gimbal — a rotating joint that continuously adjusts the angle of the panels to face the sun as the ISS orbits Earth. This maximizes power output by keeping the solar cells perpendicular to incoming sunlight.",
        icon: (
            <svg viewBox="0 0 48 48" className="w-10 h-10">
                <circle cx="24" cy="24" r="14" fill="none" stroke="#ffb800" strokeWidth="1.5" />
                <circle cx="24" cy="24" r="3" fill="#ffb800" />
                <line x1="24" y1="10" x2="24" y2="6" stroke="#ffb800" strokeWidth="1.5" />
                <line x1="24" y1="38" x2="24" y2="42" stroke="#ffb800" strokeWidth="1.5" />
                <line x1="10" y1="24" x2="6" y2="24" stroke="#ffb800" strokeWidth="1.5" />
                <line x1="38" y1="24" x2="42" y2="24" stroke="#ffb800" strokeWidth="1.5" />
                <path d="M 30 12 A 14 14 0 0 1 36 18" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
];

export default function SolarArrays() {
    return (
        <SectionWrapper id="solar">
            <SectionTitle accent="solar">Solar Arrays — Power Generation</SectionTitle>

            <p className="text-lg text-slate-300 max-w-3xl mb-12 leading-relaxed">
                All electricity on the ISS starts with sunlight. Eight massive solar
                array wings convert photons into direct current (DC) electricity at{" "}
                <span className="text-solar font-semibold">137–173 Vdc</span>. This is
                the &ldquo;primary&rdquo; power that feeds the rest of the system. In
                direct sunlight, the arrays can generate up to{" "}
                <span className="text-solar font-semibold">240 kW</span> of
                electricity — enough to power about 40 average American homes.
            </p>

            {/* Solar Array SVG Illustration */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-gold rounded-2xl p-6 md:p-10 mb-16"
            >
                <svg
                    viewBox="0 0 800 280"
                    className="w-full h-auto"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Truss */}
                    <rect x="350" y="120" width="100" height="40" rx="4" fill="#334155" />
                    <rect x="360" y="130" width="80" height="20" rx="2" fill="#475569" />

                    {/* Labels */}
                    <text x="400" y="145" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                        TRUSS
                    </text>

                    {/* Left arrays */}
                    {[0, 1, 2, 3].map((i) => (
                        <g key={`left-${i}`}>
                            <motion.rect
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                                x={260 - i * 70}
                                y={125 + (i % 2 === 0 ? 0 : 10)}
                                width="60"
                                height="30"
                                rx="2"
                                fill="#ffb800"
                                opacity={0.6 + i * 0.1}
                                style={{ transformOrigin: `${290 - i * 70}px 140px` }}
                            />
                            {/* Cell lines */}
                            {[0, 1, 2, 3, 4].map((line) => (
                                <line
                                    key={`ll-${i}-${line}`}
                                    x1={268 - i * 70 + line * 12}
                                    y1={127 + (i % 2 === 0 ? 0 : 10)}
                                    x2={268 - i * 70 + line * 12}
                                    y2={153 + (i % 2 === 0 ? 0 : 10)}
                                    stroke="#0a0e27"
                                    strokeWidth="0.5"
                                    opacity="0.4"
                                />
                            ))}
                        </g>
                    ))}

                    {/* Right arrays */}
                    {[0, 1, 2, 3].map((i) => (
                        <g key={`right-${i}`}>
                            <motion.rect
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                                x={460 + i * 70}
                                y={125 + (i % 2 === 0 ? 0 : 10)}
                                width="60"
                                height="30"
                                rx="2"
                                fill="#ffb800"
                                opacity={0.6 + i * 0.1}
                                style={{ transformOrigin: `${460 + i * 70}px 140px` }}
                            />
                            {[0, 1, 2, 3, 4].map((line) => (
                                <line
                                    key={`rl-${i}-${line}`}
                                    x1={468 + i * 70 + line * 12}
                                    y1={127 + (i % 2 === 0 ? 0 : 10)}
                                    x2={468 + i * 70 + line * 12}
                                    y2={153 + (i % 2 === 0 ? 0 : 10)}
                                    stroke="#0a0e27"
                                    strokeWidth="0.5"
                                    opacity="0.4"
                                />
                            ))}
                        </g>
                    ))}

                    {/* Sun rays */}
                    <circle cx="400" cy="40" r="20" fill="#ffb800" opacity="0.2" />
                    <circle cx="400" cy="40" r="12" fill="#ffb800" opacity="0.4" />
                    <circle cx="400" cy="40" r="6" fill="#ffb800" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                        <motion.line
                            key={angle}
                            animate={{ opacity: [0.2, 0.6, 0.2] }}
                            transition={{ repeat: Infinity, duration: 2, delay: angle / 360 }}
                            x1={400 + Math.cos((angle * Math.PI) / 180) * 25}
                            y1={40 + Math.sin((angle * Math.PI) / 180) * 25}
                            x2={400 + Math.cos((angle * Math.PI) / 180) * 35}
                            y2={40 + Math.sin((angle * Math.PI) / 180) * 35}
                            stroke="#ffb800"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    ))}

                    {/* Arrows from sun to arrays */}
                    <motion.line
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        x1="400" y1="65" x2="400" y2="115"
                        stroke="#ffb800" strokeWidth="1" strokeDasharray="4 4"
                    />

                    {/* Labels */}
                    <text x="400" y="200" textAnchor="middle" fill="#ffb800" fontSize="12" fontFamily="monospace">
                        137–173 Vdc Primary Power
                    </text>
                    <text x="400" y="220" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        Photovoltaic cells convert sunlight → DC electricity
                    </text>

                    {/* iROSA label */}
                    <rect x="615" y="180" width="80" height="24" rx="12" fill="#00d4ff" opacity="0.15" />
                    <text x="655" y="196" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace">
                        + iROSA +30%
                    </text>
                </svg>
            </motion.div>

            {/* Fact cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {ARRAY_FACTS.map((fact, i) => (
                    <motion.div
                        key={fact.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="glass-gold rounded-xl p-6 group cursor-default"
                    >
                        <div className="flex items-start gap-4">
                            <div className="shrink-0 w-12 h-12 rounded-lg bg-solar/10 flex items-center justify-center border border-solar/20 group-hover:border-solar/40 transition-colors">
                                {fact.icon}
                            </div>
                            <div>
                                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-solar mb-2">
                                    {fact.title}
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {fact.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
