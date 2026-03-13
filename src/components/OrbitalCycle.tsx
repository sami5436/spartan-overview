"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function OrbitalCycle() {
    const [angle, setAngle] = useState(0);
    const animRef = useRef<number>(0);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const animate = () => {
            setAngle((prev) => (prev + 0.3) % 360);
            animRef.current = requestAnimationFrame(animate);
        };
        animRef.current = requestAnimationFrame(animate);
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [isVisible]);

    const isInSunlight = angle > 180;
    const issX = 160 + 110 * Math.cos(((angle - 90) * Math.PI) / 180);
    const issY = 160 + 110 * Math.sin(((angle - 90) * Math.PI) / 180);

    // Battery level: charges in sunlight, discharges in shadow
    const batteryLevel = isInSunlight
        ? 40 + ((angle - 180) / 180) * 55
        : 95 - (angle / 180) * 55;

    return (
        <div ref={containerRef} className="w-full max-w-[360px]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <svg viewBox="0 0 320 320" className="w-full h-auto">
                    {/* Shadow region (right half = night) */}
                    <defs>
                        <linearGradient id="earthGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#1e40af" />
                            <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>
                        <radialGradient id="sunGlow" cx="0" cy="0.5" r="0.6">
                            <stop offset="0%" stopColor="#ffb800" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#ffb800" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Sunlight half background */}
                    <rect x="0" y="0" width="160" height="320" fill="url(#sunGlow)" opacity="0.5" />

                    {/* Night label */}
                    <text x="240" y="30" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="monospace">
                        ECLIPSE
                    </text>
                    <text x="240" y="42" textAnchor="middle" fill="#475569" fontSize="9">
                        ~35 min
                    </text>

                    {/* Sunlight label */}
                    <text x="80" y="30" textAnchor="middle" fill="#92702a" fontSize="10" fontFamily="monospace">
                        SUNLIGHT
                    </text>
                    <text x="80" y="42" textAnchor="middle" fill="#92702a" fontSize="9">
                        ~55 min
                    </text>

                    {/* Orbit path */}
                    <circle
                        cx="160"
                        cy="160"
                        r="110"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                    />

                    {/* Sunlight arc */}
                    <path
                        d="M 160 50 A 110 110 0 0 0 160 270"
                        fill="none"
                        stroke="#ffb800"
                        strokeWidth="2"
                        opacity="0.4"
                    />

                    {/* Shadow arc */}
                    <path
                        d="M 160 270 A 110 110 0 0 0 160 50"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="2"
                    />

                    {/* Earth */}
                    <circle cx="160" cy="160" r="45" fill="url(#earthGrad)" />
                    <circle cx="160" cy="160" r="45" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5" />
                    <text x="160" y="163" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace">
                        EARTH
                    </text>

                    {/* Earth shadow cone (subtle) */}
                    <path
                        d="M 160 115 L 320 80 L 320 240 L 160 205 Z"
                        fill="#0a0e27"
                        opacity="0.25"
                    />

                    {/* ISS indicator */}
                    <motion.g>
                        <circle
                            cx={issX}
                            cy={issY}
                            r="8"
                            fill={isInSunlight ? "#ffb800" : "#00d4ff"}
                            opacity="0.2"
                        />
                        <circle
                            cx={issX}
                            cy={issY}
                            r="4"
                            fill={isInSunlight ? "#ffb800" : "#00d4ff"}
                        />
                        {/* Solar panels on ISS */}
                        <rect
                            x={issX - 10}
                            y={issY - 1.5}
                            width="7"
                            height="3"
                            rx="0.5"
                            fill={isInSunlight ? "#ffb800" : "#334155"}
                            opacity="0.8"
                        />
                        <rect
                            x={issX + 3}
                            y={issY - 1.5}
                            width="7"
                            height="3"
                            rx="0.5"
                            fill={isInSunlight ? "#ffb800" : "#334155"}
                            opacity="0.8"
                        />
                    </motion.g>

                    {/* Battery indicator */}
                    <rect x="122" y="270" width="76" height="30" rx="6" fill="#0f1538" stroke="#334155" strokeWidth="1" />
                    {/* Battery fill */}
                    <rect
                        x="126"
                        y="274"
                        width={Math.max(0, (batteryLevel / 100) * 68)}
                        height="22"
                        rx="4"
                        fill={
                            batteryLevel > 60
                                ? "#00e676"
                                : batteryLevel > 30
                                    ? "#ffb800"
                                    : "#ff4d6a"
                        }
                        opacity="0.7"
                    />
                    <text x="160" y="289" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">
                        {Math.round(batteryLevel)}%
                    </text>

                    {/* Battery label */}
                    <text x="160" y="312" textAnchor="middle" fill="#94a3b8" fontSize="8">
                        {isInSunlight ? "CHARGING" : "DISCHARGING"}
                    </text>
                </svg>
            </motion.div>

            <div className="text-center mt-4">
                <p className="text-xs text-slate-500">
                    Simulated 90-minute orbital cycle.
                    Batteries charge in sunlight and power the station during eclipse.
                </p>
            </div>
        </div>
    );
}
