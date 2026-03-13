"use client";

import { motion } from "framer-motion";
import SectionWrapper, { SectionTitle } from "./SectionWrapper";
import OrbitalCycle from "./OrbitalCycle";

export default function Batteries() {
    return (
        <SectionWrapper id="batteries" className="overflow-hidden">
            <SectionTitle accent="electric">Batteries — Energy Storage</SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left — Text content */}
                <div>
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                        The ISS orbits Earth every{" "}
                        <span className="text-electric font-semibold">90 minutes</span>.
                        During each orbit, the station spends about{" "}
                        <span className="text-electric font-semibold">55 minutes</span> in
                        sunlight and roughly{" "}
                        <span className="text-electric font-semibold">35 minutes</span> in
                        Earth&apos;s shadow. Without batteries, everything would shut down
                        every time the station flies into the dark side. That&apos;s where
                        the batteries come in.
                    </p>

                    {/* Battery evolution timeline */}
                    <div className="space-y-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass rounded-xl p-5 relative"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-600 rounded-l-xl" />
                            <div className="pl-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                                        Original
                                    </span>
                                    <span className="text-sm text-slate-500">1998 – 2017</span>
                                </div>
                                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white mb-1">
                                    Nickel-Hydrogen (Ni-H₂) Batteries
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    The original battery chemistry. Reliable and well-proven for
                                    space, but heavy and lower capacity. Each Orbital Replacement
                                    Unit (ORU) contained two battery cells.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="glass rounded-xl p-5 relative"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-electric rounded-l-xl" />
                            <div className="pl-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-electric/20 text-electric">
                                        Upgrade
                                    </span>
                                    <span className="text-sm text-slate-500">2017 – Present</span>
                                </div>
                                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-electric mb-1">
                                    Lithium-Ion (Li-ion) Batteries
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    The same type of battery in your phone — but engineered for
                                    space. Lighter, higher capacity (
                                    <span className="text-electric">110 Ah</span>,{" "}
                                    <span className="text-electric">4 kWh</span> per assembly),
                                    and longer-lasting. One Li-ion battery replaces two Ni-H₂
                                    batteries.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Key stat */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-xl p-5 border-l-2 border-solar"
                    >
                        <p className="text-sm text-slate-300 leading-relaxed">
                            <span className="text-solar font-bold text-lg">60%</span> of the
                            electricity generated during sunlight goes toward{" "}
                            <span className="text-solar font-semibold">
                                recharging the batteries
                            </span>
                            . The remaining 40% powers the station in real time. It&apos;s a
                            constant balancing act between using power now and saving it for
                            the dark side of the orbit.
                        </p>
                    </motion.div>
                </div>

                {/* Right — Orbital cycle visualization */}
                <div className="flex flex-col items-center">
                    <OrbitalCycle />
                </div>
            </div>
        </SectionWrapper>
    );
}
