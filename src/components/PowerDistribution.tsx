"use client";

import { motion } from "framer-motion";
import PowerFlowDiagram from "./PowerFlowDiagram";

export default function PowerDistribution() {
    return (
        <section id="pmad" className="relative bg-[#080c1a] py-20 md:py-32 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-500/50 mb-3 block">
                        03 / Power Management and Distribution
                    </span>
                    <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mb-6">
                        PMAD
                    </h2>
                    <div className="max-w-2xl space-y-4">
                        <p className="text-base text-slate-300 leading-relaxed">
                            PMAD is the &ldquo;nervous system&rdquo; of the EPS. It takes raw,
                            fluctuating DC power from the solar arrays and batteries and
                            transforms it into clean, reliable electricity that every piece
                            of equipment on the station can use safely.
                        </p>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            <span className="text-slate-300 font-medium">Analogy:</span> Imagine a city&apos;s
                            electrical grid. The power plant generates high-voltage electricity
                            (primary power). It travels on transmission lines to substations, where
                            transformers step it down to the voltage your house uses (secondary
                            power). Circuit breakers in your fuse box protect individual circuits.
                            The ISS has the exact same architecture — just miniaturized for space
                            and running on DC instead of AC.
                        </p>
                    </div>
                </motion.div>

                {/* Voltage conversion formula */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-6 mb-16"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 mb-4 block">
                        Two-Tier Voltage Architecture
                    </span>
                    <div className="bg-black/30 rounded-lg p-4 font-mono text-sm mb-4">
                        <p className="text-cyan-400">
                            Primary bus: ~160 Vdc (range: 137–173 Vdc)
                        </p>
                        <p className="text-slate-600 text-xs mt-1">
                            High voltage → lower current → thinner, lighter cables (P = V × I, so higher V means lower I for same P)
                        </p>
                        <p className="text-purple-400 mt-3">
                            Secondary bus: 120 Vdc (tightly regulated ±2%)
                        </p>
                        <p className="text-slate-600 text-xs mt-1">
                            Clean, stable voltage that equipment is designed to use
                        </p>
                        <p className="text-amber-400 mt-3">
                            Russian segment: 28 Vdc
                        </p>
                        <p className="text-slate-600 text-xs mt-1">
                            Different standard inherited from Soyuz/Mir heritage — converters bridge the gap
                        </p>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        <span className="text-slate-300 font-medium">Why two voltages?</span> Long cable
                        runs along the 109-meter truss lose energy as heat (P_loss = I² × R).
                        Higher voltage means lower current for the same power, which means less
                        heat loss and lighter cables — critical when every kilogram costs
                        ~$10,000 to launch.
                    </p>
                </motion.div>

                {/* Diagram */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 mb-6 block">
                        Interactive Power Flow — Click Any Component
                    </span>
                    <PowerFlowDiagram />
                </motion.div>

                {/* Component deep dive */}
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 mb-6 block">
                    Component Reference
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                    {[
                        {
                            abbr: "SSU",
                            name: "Sequential Shunt Unit",
                            voltage: "137–173 Vdc",
                            color: "#06b6d4",
                            description:
                                `The SSU regulates primary bus voltage by "shunting" (short-circuiting) individual solar cell strings when the arrays produce more power than needed. Think of it like a pressure relief valve on a water pipe — when pressure (voltage) gets too high, it opens to bleed off the excess. Each SSU handles 82 cell strings, switching them on and off in sequence (hence "sequential") to maintain steady ~160 Vdc output.`,
                        },
                        {
                            abbr: "MBSU",
                            name: "Main Bus Switching Unit",
                            voltage: "~160 Vdc",
                            color: "#06b6d4",
                            description:
                                `The main traffic interchange. Four MBSUs route primary power from the SSUs downstream — to DDCUs (for equipment) and BCDUs (for batteries). Critically, each MBSU has fault-isolation switches: if a downstream channel has a short circuit, the MBSU disconnects it without affecting the other channels. This is like having a master breaker panel that can isolate individual circuits.`,
                        },
                        {
                            abbr: "BCDU",
                            name: "Battery Charge/Discharge Unit",
                            voltage: "76–123 Vdc ↔ 160 Vdc",
                            color: "#22c55e",
                            description:
                                `The BCDU is a bidirectional DC-DC converter. During sunlight, it steps DOWN the ~160V bus to the appropriate charging voltage for the Li-ion batteries (max ~4.1V per cell × series cells). During eclipse, it steps UP the battery voltage back to ~160V for the primary bus. It also manages charge profiles — constant current, then constant voltage — to maximize battery life. Each BCDU is paired with one battery ORU.`,
                        },
                        {
                            abbr: "DDCU",
                            name: "DC-to-DC Converter Unit",
                            voltage: "160 → 120 Vdc",
                            color: "#8b5cf6",
                            description:
                                `The DDCU steps primary voltage (~160 Vdc) down to secondary voltage (120 Vdc ±2%). It uses high-frequency switching (not a traditional transformer) to do this efficiently with minimal heat waste. Like your laptop charger converting wall voltage to what your laptop needs. DDCUs are located at the truss-to-module interface, right where power transitions from the external structure into the pressurized crew areas.`,
                        },
                        {
                            abbr: "RPC / RPCM",
                            name: "Remote Power Controller (Module)",
                            voltage: "120 Vdc",
                            color: "#8b5cf6",
                            description:
                                `RPCs are solid-state circuit breakers — no mechanical contacts, just transistors that switch on/off electronically. They distribute 120 Vdc to individual loads inside the modules: experiment racks, pumps, fans, lights. If a load draws too much current (short circuit), the RPC trips in microseconds. RPCs are grouped into Remote Power Controller Modules (RPCMs) — circuit breaker panels that Mission Control can monitor and command remotely.`,
                        },
                        {
                            abbr: "ARCU / RACU",
                            name: "American/Russian Converter Units",
                            voltage: "120 ↔ 28 Vdc",
                            color: "#f472b6",
                            description:
                                `The US segment runs at 120 Vdc; the Russian segment runs at 28 Vdc (from Soyuz/Mir heritage). ARCUs step 120V down to 28V to feed Russian equipment. RACUs do the reverse. This cross-feed capability is critical for contingencies — if one segment's power generation is degraded, the other segment can share its power across the voltage bridge.`,
                        },
                    ].map((c, i) => (
                        <motion.div
                            key={c.abbr}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04 }}
                            className="rounded-xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.025] transition-colors p-5"
                        >
                            <div className="flex items-center gap-2.5 mb-3">
                                <span
                                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                                    style={{ backgroundColor: `${c.color}10`, color: c.color, border: `1px solid ${c.color}18` }}
                                >
                                    {c.abbr}
                                </span>
                                <span className="text-sm font-medium text-white">{c.name}</span>
                                <span className="text-[9px] font-mono text-slate-600 ml-auto hidden md:block">{c.voltage}</span>
                            </div>
                            <p className="text-sm text-slate-400 leading-[1.75]">{c.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Power loss formula */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-cyan-500/10 bg-cyan-500/[0.02] p-6"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-500/40 mb-4 block">
                        Why This Architecture Matters
                    </span>
                    <div className="bg-black/30 rounded-lg p-4 font-mono text-sm mb-4">
                        <p className="text-slate-500 mb-1">Cable power loss:</p>
                        <p className="text-cyan-400">P_loss = I² × R</p>
                        <p className="text-slate-600 text-xs mt-1 mb-3">
                            Loss goes up with the SQUARE of current — so doubling current = 4x loss
                        </p>
                        <p className="text-slate-500 mb-1">For the same power at different voltages:</p>
                        <p className="text-cyan-400">
                            At 160V: I = 90,000W / 160V = 562 A → P_loss = 562² × R
                        </p>
                        <p className="text-cyan-400">
                            At 28V: I = 90,000W / 28V = 3,214 A → P_loss = 3,214² × R
                        </p>
                        <p className="text-slate-600 text-xs mt-1">
                            That&apos;s 33x more power wasted as heat in the cables at 28V vs 160V
                        </p>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        This is exactly why the US segment chose a higher primary voltage.
                        Less current = thinner cables = less weight = less launch cost.
                        The Russian 28V standard predates the ISS and was kept for
                        compatibility with existing Soyuz and Progress vehicles.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
