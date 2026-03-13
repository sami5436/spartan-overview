"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlowNode {
    id: string;
    label: string;
    shortLabel: string;
    x: number;
    y: number;
    color: string;
    description: string;
}

const NODES: FlowNode[] = [
    {
        id: "solar",
        label: "Solar Arrays",
        shortLabel: "SA",
        x: 80,
        y: 60,
        color: "#ffb800",
        description:
            "Eight photovoltaic array wings convert sunlight into DC electricity at 137–173 Vdc. Each wing has thousands of silicon solar cells wired in series and parallel.",
    },
    {
        id: "ssu",
        label: "Sequential Shunt Unit",
        shortLabel: "SSU",
        x: 230,
        y: 60,
        color: "#00d4ff",
        description:
            "Regulates the primary bus voltage. When the arrays produce more power than needed, the SSU 'shunts' (bypasses) extra solar cell strings to prevent overvoltage. Think of it as a smart dimmer switch.",
    },
    {
        id: "mbsu",
        label: "Main Bus Switching Unit",
        shortLabel: "MBSU",
        x: 380,
        y: 60,
        color: "#00d4ff",
        description:
            "Routes primary power from the SSU to downstream equipment. It acts like a circuit breaker panel — it can connect or disconnect power channels for maintenance or fault isolation.",
    },
    {
        id: "bcdu",
        label: "Battery Charge/Discharge Unit",
        shortLabel: "BCDU",
        x: 380,
        y: 170,
        color: "#00e676",
        description:
            "Controls the charging of Li-ion batteries during sunlight and their discharge during eclipse. It boosts battery voltage up to match the primary bus voltage (~160 Vdc) when the station is in shadow.",
    },
    {
        id: "battery",
        label: "Li-ion Batteries",
        shortLabel: "BAT",
        x: 230,
        y: 170,
        color: "#00e676",
        description:
            "Store energy for use during eclipse periods (~35 min per orbit). The ISS upgraded from Ni-H₂ to Li-ion starting in 2017, gaining higher capacity (110 Ah) and lighter weight.",
    },
    {
        id: "ddcu",
        label: "DC-DC Converter Unit",
        shortLabel: "DDCU",
        x: 530,
        y: 60,
        color: "#a78bfa",
        description:
            "Converts primary power (~160 Vdc) down to a tightly regulated 120 Vdc secondary power. This cleaner, more stable voltage is what the station's equipment actually uses.",
    },
    {
        id: "rpc",
        label: "Remote Power Controller",
        shortLabel: "RPC",
        x: 530,
        y: 170,
        color: "#a78bfa",
        description:
            "Smart circuit breakers inside the modules. RPCs distribute secondary 120 Vdc power to individual loads — experiments, lights, computers, life support systems, etc. They can be remotely commanded on/off.",
    },
    {
        id: "loads",
        label: "Station Loads",
        shortLabel: "LOADS",
        x: 680,
        y: 115,
        color: "#f472b6",
        description:
            "Everything that uses electricity on the ISS: life support (O₂ generation, CO₂ scrubbing, water recycling), science experiments, communications, computers, lighting, thermal control pumps, and the robotic arm (Canadarm2).",
    },
];

const CONNECTIONS = [
    { from: "solar", to: "ssu" },
    { from: "ssu", to: "mbsu" },
    { from: "mbsu", to: "bcdu" },
    { from: "bcdu", to: "battery" },
    { from: "mbsu", to: "ddcu" },
    { from: "ddcu", to: "rpc" },
    { from: "ddcu", to: "loads" },
    { from: "rpc", to: "loads" },
];

export default function PowerFlowDiagram() {
    const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);

    const getNodeCenter = (node: FlowNode) => ({
        cx: node.x + 40,
        cy: node.y + 20,
    });

    return (
        <div className="w-full">
            <div className="glass rounded-2xl p-4 md:p-8 overflow-x-auto">
                <svg
                    viewBox="0 0 780 240"
                    className="w-full h-auto min-w-[600px]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Connection lines */}
                    {CONNECTIONS.map((conn) => {
                        const from = NODES.find((n) => n.id === conn.from)!;
                        const to = NODES.find((n) => n.id === conn.to)!;
                        const fromC = getNodeCenter(from);
                        const toC = getNodeCenter(to);

                        return (
                            <line
                                key={`${conn.from}-${conn.to}`}
                                x1={fromC.cx}
                                y1={fromC.cy}
                                x2={toC.cx}
                                y2={toC.cy}
                                stroke="#334155"
                                strokeWidth="2"
                                className="flow-line"
                            />
                        );
                    })}

                    {/* Arrow heads on connections */}
                    {CONNECTIONS.map((conn) => {
                        const from = NODES.find((n) => n.id === conn.from)!;
                        const to = NODES.find((n) => n.id === conn.to)!;
                        const fromC = getNodeCenter(from);
                        const toC = getNodeCenter(to);

                        // Place arrowhead at 70% along the line
                        const t = 0.7;
                        const mx = fromC.cx + (toC.cx - fromC.cx) * t;
                        const my = fromC.cy + (toC.cy - fromC.cy) * t;
                        const angle = (Math.atan2(toC.cy - fromC.cy, toC.cx - fromC.cx) * 180) / Math.PI;

                        return (
                            <polygon
                                key={`arrow-${conn.from}-${conn.to}`}
                                points="-5,-4 5,0 -5,4"
                                fill="#475569"
                                transform={`translate(${mx},${my}) rotate(${angle})`}
                            />
                        );
                    })}

                    {/* Nodes */}
                    {NODES.map((node) => {
                        const isSelected = selectedNode?.id === node.id;
                        return (
                            <g
                                key={node.id}
                                onClick={() =>
                                    setSelectedNode(isSelected ? null : node)
                                }
                                className="cursor-pointer"
                            >
                                {/* Glow */}
                                {isSelected && (
                                    <rect
                                        x={node.x - 4}
                                        y={node.y - 4}
                                        width="88"
                                        height="48"
                                        rx="14"
                                        fill={node.color}
                                        opacity="0.15"
                                    />
                                )}
                                {/* Box */}
                                <rect
                                    x={node.x}
                                    y={node.y}
                                    width="80"
                                    height="40"
                                    rx="10"
                                    fill="#0f1538"
                                    stroke={isSelected ? node.color : "#334155"}
                                    strokeWidth={isSelected ? 2 : 1}
                                    className="transition-all"
                                />
                                {/* Label */}
                                <text
                                    x={node.x + 40}
                                    y={node.y + 17}
                                    textAnchor="middle"
                                    fill={node.color}
                                    fontSize="11"
                                    fontWeight="bold"
                                    fontFamily="monospace"
                                >
                                    {node.shortLabel}
                                </text>
                                <text
                                    x={node.x + 40}
                                    y={node.y + 32}
                                    textAnchor="middle"
                                    fill="#94a3b8"
                                    fontSize="7"
                                >
                                    {node.label.length > 14
                                        ? node.label.slice(0, 14) + "…"
                                        : node.label}
                                </text>
                            </g>
                        );
                    })}

                    {/* Legend */}
                    <g>
                        <rect x="10" y="210" width="8" height="8" rx="2" fill="#ffb800" />
                        <text x="22" y="217" fill="#94a3b8" fontSize="7">Generation</text>
                        <rect x="90" y="210" width="8" height="8" rx="2" fill="#00d4ff" />
                        <text x="102" y="217" fill="#94a3b8" fontSize="7">Primary PMAD</text>
                        <rect x="190" y="210" width="8" height="8" rx="2" fill="#00e676" />
                        <text x="202" y="217" fill="#94a3b8" fontSize="7">Energy Storage</text>
                        <rect x="300" y="210" width="8" height="8" rx="2" fill="#a78bfa" />
                        <text x="312" y="217" fill="#94a3b8" fontSize="7">Secondary PMAD</text>
                        <rect x="420" y="210" width="8" height="8" rx="2" fill="#f472b6" />
                        <text x="432" y="217" fill="#94a3b8" fontSize="7">Loads</text>
                    </g>
                </svg>
            </div>

            {/* Info panel */}
            <AnimatePresence mode="wait">
                {selectedNode && (
                    <motion.div
                        key={selectedNode.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="glass rounded-xl p-5 mt-4"
                        style={{ borderLeft: `3px solid ${selectedNode.color}` }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span
                                className="text-xs font-mono px-2 py-0.5 rounded-full"
                                style={{
                                    backgroundColor: `${selectedNode.color}20`,
                                    color: selectedNode.color,
                                }}
                            >
                                {selectedNode.shortLabel}
                            </span>
                            <h4
                                className="font-[family-name:var(--font-heading)] font-bold text-lg"
                                style={{ color: selectedNode.color }}
                            >
                                {selectedNode.label}
                            </h4>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            {selectedNode.description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {!selectedNode && (
                <p className="text-center text-sm text-slate-500 mt-4">
                    Tap any component in the diagram to learn what it does
                </p>
            )}
        </div>
    );
}
