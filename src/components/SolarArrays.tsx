"use client";

import { motion } from "framer-motion";

export default function SolarArrays() {
    return (
        <section id="solar" className="relative bg-[#080c1a] py-20 md:py-32 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500/50 mb-3 block">
                        01 / Power Generation
                    </span>
                    <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mb-6">
                        Solar Arrays
                    </h2>
                    <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
                        Everything on the ISS starts with light from the Sun hitting
                        silicon. The station uses <span className="text-amber-400 font-medium">photovoltaic (PV) cells</span> —
                        the same basic technology as rooftop solar panels on Earth — to
                        convert sunlight directly into DC electricity. No turbines, no
                        steam, no moving parts. Just photons knocking electrons loose
                        inside semiconductor wafers.
                    </p>
                </motion.div>

                {/* The Big Number */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="font-[family-name:var(--font-heading)] text-7xl md:text-[120px] font-bold text-amber-400/10 leading-none select-none">
                        240 kW
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                        Peak output — enough for roughly 40 U.S. homes
                    </p>
                </motion.div>

                {/* The Photovoltaic Effect */}
                <div className="mb-16">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 mb-6 block">
                        The Photovoltaic Effect
                    </span>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-6 md:p-8 mb-8"
                    >
                        <p className="text-sm text-slate-400 leading-[1.8] mb-4">
                            When a photon (a packet of light energy) hits a silicon PV cell,
                            it can knock an electron free from its atom. The cell is
                            constructed with two layers of silicon — one doped with extra
                            electrons (n-type) and one with &ldquo;holes&rdquo; (p-type). This creates
                            an electric field at the junction that pushes freed electrons in
                            one direction, creating a current.
                        </p>
                        <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                            <p className="text-slate-500 mb-2">Basic relationship:</p>
                            <p className="text-amber-400">
                                P = V × I
                            </p>
                            <p className="text-slate-600 text-xs mt-1">
                                Power (watts) = Voltage (volts) × Current (amps)
                            </p>
                            <p className="text-slate-500 mt-3 mb-2">Cell efficiency:</p>
                            <p className="text-amber-400">
                                η = P_out / P_in = (electrical power output) / (solar irradiance × cell area)
                            </p>
                            <p className="text-slate-600 text-xs mt-1">
                                ISS silicon cells: ~14% efficiency | Modern iROSA cells: ~20%+
                            </p>
                        </div>
                        <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                            <span className="text-slate-300 font-medium">Analogy:</span> Imagine a waterfall
                            hitting a waterwheel. The sunlight is the falling water, the PV cell is the wheel,
                            and the spinning motion is the electrical current. More water (light) = more spin (current),
                            and a taller fall (voltage across the junction) = more power.
                        </p>
                    </motion.div>
                </div>

                {/* How sunlight becomes usable power */}
                <div className="mb-16">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 mb-8 block">
                        From Sunlight to Usable Power
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                num: "01",
                                title: "Solar Array Wings (SAWs)",
                                body: `The station has 8 Solar Array Wings, arranged as 4 pairs on the Integrated Truss Structure (ITS). Each wing is about 35m long and 12m wide — picture a wing the size of a small house. Each wing contains two "blankets" of PV cells that fold out like an accordion. Together, the 8 wings cover roughly 2,500 m² — larger than a football field. When fully illuminated, they produce up to 240 kW of raw DC power at 137–173 Vdc.`,
                            },
                            {
                                num: "02",
                                title: "iROSA Upgrades (2021+)",
                                body: `Starting in 2021, NASA began deploying ISS Roll-Out Solar Arrays (iROSA) — thin, lightweight panels that literally roll out like a yoga mat on top of the existing wings. They use more advanced multi-junction cells with higher efficiency, and they don't require the old accordion-fold mechanism. Six iROSA arrays were installed, boosting total station power capability by about 20–30%.`,
                            },
                            {
                                num: "03",
                                title: "Sun Tracking — BGA & SARJ",
                                body: `Solar panels are only efficient when pointed directly at the Sun. But the ISS orbits Earth every 90 minutes, so the Sun's position is constantly changing. Two types of rotary joints solve this. The Beta Gimbal Assembly (BGA) sits at the base of each SAW pair and rotates the wings around one axis — think of it like tilting your hand to catch the sun. The Solar Alpha Rotary Joint (SARJ) is a massive 10-foot-diameter bearing that rotates the entire outboard truss segment (and all its solar arrays) around the main truss axis. Combined, BGA + SARJ give each array two degrees of freedom for sun-tracking.`,
                            },
                            {
                                num: "04",
                                title: "TRRJ — Thermal Radiator Rotary Joint",
                                body: `While the SARJ rotates the solar arrays to face the Sun, the Thermal Radiator Rotary Joint (TRRJ) rotates the thermal radiator panels to face away from the Sun — into the cold of deep space. This is critical: the radiators need to dump heat as efficiently as possible, so they're angled edge-on to the Sun (to minimize solar heating) and face-on to dark space (to maximize infrared radiation). Each TRRJ has a diameter of about 50 inches and can rotate 230°.`,
                            },
                        ].map((step, i) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                className="rounded-xl border border-white/[0.04] bg-white/[0.015] p-5"
                            >
                                <span className="text-4xl font-bold text-amber-400/10 font-[family-name:var(--font-heading)] leading-none">{step.num}</span>
                                <h4 className="font-[family-name:var(--font-heading)] text-base font-bold text-white mt-1 mb-3">
                                    {step.title}
                                </h4>
                                <p className="text-sm text-slate-400 leading-[1.8]">{step.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Specs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-amber-500/10 bg-amber-500/[0.02] p-6"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500/40 mb-5 block">
                        Quick Reference
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {[
                            { value: "8", unit: "SAWs", desc: "4 pairs on the ITS" },
                            { value: "~2,500", unit: "m²", desc: "Total array area" },
                            { value: "137–173", unit: "Vdc", desc: "Primary voltage range" },
                            { value: "14 → 20%+", unit: "efficiency", desc: "Si cells → iROSA cells" },
                        ].map((spec) => (
                            <div key={spec.unit}>
                                <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-amber-400">{spec.value}</div>
                                <div className="text-[9px] text-amber-500/40 font-mono uppercase tracking-wider mb-0.5">{spec.unit}</div>
                                <p className="text-xs text-slate-500">{spec.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
