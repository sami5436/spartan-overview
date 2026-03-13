"use client";

import { motion } from "framer-motion";
import SectionWrapper, { SectionTitle } from "./SectionWrapper";
import PowerFlowDiagram from "./PowerFlowDiagram";

const PMAD_CONCEPTS = [
    {
        title: "Primary Power Bus",
        voltage: "~160 Vdc",
        description:
            "The 'highway' for raw power coming from the solar arrays. Eight independent power channels run along the truss structure, each capable of providing about 30 kW. Running multiple independent channels means a failure in one doesn't knock out the whole station.",
        color: "#00d4ff",
    },
    {
        title: "Secondary Power Bus",
        voltage: "120 Vdc",
        description:
            "After the DC-DC Converter Units (DDCUs) step down the voltage, this cleaner, regulated power is distributed to equipment inside the pressurized modules. Think of it like the outlets in your house — everything plugs into this.",
        color: "#a78bfa",
    },
    {
        title: "US ↔ Russian Interoperability",
        voltage: "120 Vdc ↔ 28 Vdc",
        description:
            "The Russian segment runs on 28 Vdc (like a car battery), while the US side uses 120 Vdc. Special converters — ARCUs (American-to-Russian) and RACUs (Russian-to-American) — let both sides share power when needed.",
        color: "#f472b6",
    },
];

export default function PowerDistribution() {
    return (
        <SectionWrapper id="pmad">
            <SectionTitle accent="electric">
                Power Distribution — PMAD
            </SectionTitle>

            <p className="text-lg text-slate-300 max-w-3xl mb-6 leading-relaxed">
                <span className="text-electric font-semibold">
                    Power Management and Distribution (PMAD)
                </span>{" "}
                is the backbone that gets electricity from the solar arrays and
                batteries to every corner of the station. It&apos;s essentially a
                miniature power grid — in space — with smart switches, voltage
                converters, and circuit breakers all managed by software.
            </p>

            <p className="text-base text-slate-400 max-w-3xl mb-12 leading-relaxed">
                The diagram below shows how power flows from generation (left) through
                various management units all the way to the loads (right). Click on any
                component to learn what it does in plain English.
            </p>

            {/* Interactive diagram */}
            <div className="mb-16">
                <PowerFlowDiagram />
            </div>

            {/* Voltage concept cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {PMAD_CONCEPTS.map((concept, i) => (
                    <motion.div
                        key={concept.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12, duration: 0.5 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="glass rounded-xl p-6 group cursor-default"
                        style={{ borderTop: `2px solid ${concept.color}` }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h3
                                className="font-[family-name:var(--font-heading)] text-base font-bold"
                                style={{ color: concept.color }}
                            >
                                {concept.title}
                            </h3>
                            <span
                                className="text-xs font-mono px-2 py-0.5 rounded-full"
                                style={{
                                    backgroundColor: `${concept.color}15`,
                                    color: concept.color,
                                }}
                            >
                                {concept.voltage}
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {concept.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
