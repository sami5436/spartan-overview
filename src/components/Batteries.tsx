"use client";

import { motion } from "framer-motion";
import OrbitalCycle from "./OrbitalCycle";

export default function Batteries() {
    return (
        <section id="batteries" className="relative bg-[#060a16] py-20 md:py-32 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-500/50 mb-3 block">
                        02 / Energy Storage
                    </span>
                    <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mb-6">
                        Batteries
                    </h2>
                    <div className="max-w-2xl space-y-4">
                        <p className="text-base text-slate-300 leading-relaxed">
                            The ISS orbits Earth every <span className="text-emerald-400 font-medium">90 minutes</span>.
                            Each orbit has about 55 minutes of sunlight and 35 minutes of eclipse
                            (Earth&apos;s shadow). During eclipse, the solar arrays produce zero power.
                            Batteries bridge that gap — storing energy during sunlight and
                            releasing it during darkness. Without them, the station goes dark.
                        </p>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            <span className="text-slate-300 font-medium">Analogy:</span> Think of a water
                            tower. During the day, pumps fill the tower (solar arrays charge the
                            batteries). At night when the pumps shut off, gravity feeds water
                            from the tower to the town (batteries discharge to power the station).
                            The tower needs to be big enough to supply the entire town until
                            morning.
                        </p>
                    </div>
                </motion.div>

                {/* Energy balance formula */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-6 mb-16"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 mb-4 block">
                        Energy Balance per Orbit
                    </span>
                    <div className="bg-black/30 rounded-lg p-4 font-mono text-sm mb-4">
                        <p className="text-slate-500 mb-2">During sunlight (55 min):</p>
                        <p className="text-emerald-400">
                            P_solar = P_station + P_charge
                        </p>
                        <p className="text-slate-600 text-xs mt-1">
                            Solar output must cover station loads AND recharge batteries
                        </p>
                        <p className="text-slate-500 mt-3 mb-2">During eclipse (35 min):</p>
                        <p className="text-emerald-400">
                            P_battery = P_station
                        </p>
                        <p className="text-slate-600 text-xs mt-1">
                            Batteries are the sole power source — they must supply everything
                        </p>
                        <p className="text-slate-500 mt-3 mb-2">This means:</p>
                        <p className="text-amber-400">
                            ~60% of energy generated during sunlight goes to charging
                        </p>
                        <p className="text-slate-600 text-xs mt-1">
                            Only ~40% of daytime solar output powers the station in real time
                        </p>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        This is why the ISS needs 240 kW of solar capacity even though
                        average station loads are around 75–90 kW. The system must
                        generate enough surplus during 55 minutes of sun to fill
                        batteries that have to last 35 minutes of darkness — 16 times a day.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
                    {/* Left: Tech evolution */}
                    <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 mb-6 block">
                            Technology Evolution
                        </span>

                        <div className="relative pl-7 border-l border-slate-800 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-slate-700 -translate-x-[6px] mt-1.5" />
                                <div className="text-[10px] text-slate-600 font-mono mb-1">1998 – 2017</div>
                                <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-slate-300 mb-2">
                                    Nickel-Hydrogen (Ni-H2)
                                </h4>
                                <p className="text-sm text-slate-500 leading-[1.8]">
                                    Inherited from the Hubble Space Telescope program. Each ORU
                                    (Orbital Replacement Unit) weighed over 350 lbs. They worked
                                    reliably for years, but had lower energy density and limited
                                    cycle life. A pair of Ni-H2 ORUs occupied two slots on the truss.
                                </p>
                                <div className="bg-black/20 rounded-lg p-3 font-mono text-xs mt-3">
                                    <span className="text-slate-600">Capacity:</span>{" "}
                                    <span className="text-slate-400">81 Ah per ORU</span>
                                    <br />
                                    <span className="text-slate-600">Voltage:</span>{" "}
                                    <span className="text-slate-400">76–123 Vdc (varies with state of charge)</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-emerald-500 -translate-x-[6px] mt-1.5 shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
                                <div className="text-[10px] text-emerald-500/60 font-mono mb-1">2017 – Present</div>
                                <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-emerald-400 mb-2">
                                    Lithium-Ion (Li-ion)
                                </h4>
                                <p className="text-sm text-slate-400 leading-[1.8]">
                                    Same fundamental chemistry as your phone or Tesla — lithium
                                    ions shuttle between a graphite anode and a lithium-cobalt-oxide
                                    cathode — but these cells are aerospace-grade with much
                                    tighter thermal management, deeper cycle tolerance, and
                                    redundant safety circuits.
                                </p>
                                <div className="bg-black/20 rounded-lg p-3 font-mono text-xs mt-3 space-y-1">
                                    <div><span className="text-slate-600">Capacity:</span>{" "}<span className="text-emerald-400">110 Ah per ORU</span></div>
                                    <div><span className="text-slate-600">Energy:</span>{" "}<span className="text-emerald-400">4 kWh per ORU (~50x your phone)</span></div>
                                    <div><span className="text-slate-600">Key win:</span>{" "}<span className="text-slate-400">1 Li-ion ORU replaces 2 Ni-H2 ORUs</span></div>
                                    <div><span className="text-slate-600">Adapter plates:</span>{" "}<span className="text-slate-400">fill the empty slot electrically</span></div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right: Orbital cycle viz */}
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 mb-6 self-start">
                            Orbital Day/Night Cycle
                        </span>
                        <OrbitalCycle />
                        <p className="text-sm text-slate-500 mt-6 max-w-sm text-center leading-relaxed">
                            The ISS completes 16 orbits per day. Each orbit has a sunlit
                            phase (batteries charge) and an eclipse phase (batteries discharge).
                            That&apos;s 16 charge-discharge cycles every 24 hours.
                        </p>
                    </div>
                </div>

                {/* Battery math */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] p-6"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-500/40 mb-4 block">
                        Battery Sizing Formula
                    </span>
                    <div className="bg-black/30 rounded-lg p-4 font-mono text-sm mb-4">
                        <p className="text-emerald-400">
                            E_required = P_load × t_eclipse / η_discharge
                        </p>
                        <p className="text-slate-600 text-xs mt-2">
                            E_required ≈ 90 kW × 35 min × (1h/60min) / 0.90 ≈ 58 kWh per orbit
                        </p>
                        <p className="text-slate-600 text-xs mt-1">
                            With 24 Li-ion ORUs at 4 kWh each = 96 kWh total capacity (includes margin and depth-of-discharge limits)
                        </p>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Batteries are never fully drained — the Depth of Discharge (DOD)
                        is typically limited to ~35–50% to maximize cycle life. With
                        thousands of cycles per year for 10+ years, battery longevity
                        depends heavily on staying within thermal and DOD limits.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
