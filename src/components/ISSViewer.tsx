"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import {
    EffectComposer,
    Bloom,
    Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import ISSModel, { EPSComponent } from "./ISSModel";
import InfoPanel from "./InfoPanel";
import { motion } from "framer-motion";

function Scene({
    selected,
    onSelect,
}: {
    selected: EPSComponent | null;
    onSelect: (c: EPSComponent | null) => void;
}) {
    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight position={[15, 10, 10]} intensity={2.2} color="#fffaf0" />
            <directionalLight position={[-10, 5, -8]} intensity={0.5} color="#4488ff" />
            <pointLight position={[0, 8, 0]} intensity={0.6} color="#f59e0b" distance={30} />
            <pointLight position={[5, -3, 5]} intensity={0.3} color="#ffb800" distance={20} />
            <hemisphereLight color="#1a2a5e" groundColor="#0a0e27" intensity={0.4} />

            <Stars radius={80} depth={40} count={4000} factor={3} saturation={0} fade speed={0.3} />

            <ISSModel onSelectComponent={onSelect} selectedId={selected?.id ?? null} />

            <OrbitControls
                enablePan={false}
                minDistance={8}
                maxDistance={30}
                autoRotate={!selected}
                autoRotateSpeed={0.5}
                enableDamping
                dampingFactor={0.05}
                maxPolarAngle={Math.PI * 0.85}
                minPolarAngle={Math.PI * 0.15}
            />

            <EffectComposer>
                <Bloom intensity={0.6} luminanceThreshold={0.35} luminanceSmoothing={0.9} mipmapBlur />
                <Vignette offset={0.3} darkness={0.6} blendFunction={BlendFunction.NORMAL} />
            </EffectComposer>
        </>
    );
}

export default function ISSViewer() {
    const [selected, setSelected] = useState<EPSComponent | null>(null);

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden">
            {/* NASA disclaimer banner */}
            <div className="absolute top-14 left-0 right-0 z-30 bg-amber-500/10 border-b border-amber-500/20 px-4 py-2">
                <p className="text-[10px] md:text-xs text-amber-400/80 text-center font-mono">
                    All information sourced from publicly available NASA documentation,
                    technical reports, and educational resources.
                    This is not an official NASA product.
                </p>
            </div>

            {/* 3D Canvas */}
            <div className="absolute inset-0 bg-[#050816]">
                <Canvas
                    camera={{ position: [14, 7, 14], fov: 42 }}
                    gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
                    dpr={[1, 2]}
                    onPointerMissed={() => setSelected(null)}
                    style={{ background: "#050816" }}
                >
                    <Suspense fallback={null}>
                        <Scene selected={selected} onSelect={setSelected} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Overlay UI */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="absolute top-28 md:top-32 left-4 md:left-8 max-w-sm md:max-w-lg"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-amber-400/80 mb-4 pointer-events-auto font-mono uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        ISS Electrical Power System
                    </div>
                    <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
                        How the ISS{" "}
                        <span className="text-amber-400">
                            Stays Powered
                        </span>
                    </h1>
                    <p className="text-xs md:text-sm text-slate-400 max-w-md leading-relaxed">
                        The most complex off-grid power system ever built.
                        Click any <span className="text-amber-400 font-medium">highlighted component</span> on the
                        model to learn how it works.
                    </p>
                </motion.div>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="absolute top-32 right-4 md:right-8 hidden lg:block"
                >
                    <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/[0.05]">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600 mb-3 font-mono">
                            EPS Subsystems
                        </p>
                        <div className="space-y-2.5">
                            {[
                                { color: "#f59e0b", name: "Solar Arrays", desc: "Generation" },
                                { color: "#22c55e", name: "Batteries", desc: "Storage" },
                                { color: "#06b6d4", name: "PMAD", desc: "Distribution" },
                                { color: "#d4d4d4", name: "Radiators", desc: "Thermal" },
                                { color: "#8b5cf6", name: "Modules", desc: "Loads" },
                            ].map((item) => (
                                <div key={item.name} className="flex items-center gap-2.5">
                                    <div
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}30` }}
                                    />
                                    <span className="text-[11px] text-slate-400">{item.name}</span>
                                    <span className="text-[9px] text-slate-600 ml-auto font-mono">{item.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-6 left-4 right-4 md:left-8 md:right-8"
                >
                    <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/[0.05] px-5 py-3 flex flex-wrap justify-center md:justify-around gap-6 max-w-3xl mx-auto pointer-events-auto">
                        {[
                            { value: "240 kW", label: "Peak Power", color: "#f59e0b" },
                            { value: "8", label: "Solar Wings", color: "#f59e0b" },
                            { value: "90 min", label: "Orbit Period", color: "#06b6d4" },
                            { value: "160 Vdc", label: "Primary Bus", color: "#8b5cf6" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-bold" style={{ color: stat.color }}>
                                    {stat.value}
                                </div>
                                <div className="text-[9px] text-slate-600 uppercase tracking-wider mt-0.5 font-mono">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Scroll hint */}
                {!selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                        className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-[9px] text-slate-600 font-mono tracking-wider uppercase">
                            Scroll to explore
                        </span>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" className="opacity-30">
                                <rect x="1" y="1" width="12" height="18" rx="6" stroke="#64748b" strokeWidth="1.5" />
                                <circle cx="7" cy="7" r="1.5" fill="#f59e0b" />
                            </svg>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            {/* Info Panel */}
            <InfoPanel component={selected} onClose={() => setSelected(null)} />
        </section>
    );
}
