"use client";

import { useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export interface EPSComponent {
    id: string;
    name: string;
    shortName: string;
    description: string;
    details: string[];
    color: string;
    hoverColor: string;
}

export const EPS_COMPONENTS: EPSComponent[] = [
    {
        id: "solar-arrays",
        name: "Solar Array Wings",
        shortName: "Solar Arrays",
        description:
            "Eight massive photovoltaic wings that convert sunlight into DC electricity. Each wing is about 35m × 12m — together they cover an area larger than a football field.",
        details: [
            "8 wings generating up to 240 kW peak",
            "Up to 32,800 solar cells per power channel",
            "Output: 137–173 Vdc (primary power)",
            "Sun-tracking gimbals maximize efficiency",
            "iROSA roll-out arrays added +30% capacity",
        ],
        color: "#ffb800",
        hoverColor: "#ffd54f",
    },
    {
        id: "batteries",
        name: "Lithium-Ion Battery Assemblies",
        shortName: "Batteries",
        description:
            "Store energy for use during the ~35 minutes of darkness each orbit. Upgraded from Ni-H₂ to Li-ion starting in 2017 — same chemistry as your phone, but engineered for space.",
        details: [
            "Li-ion replaced Ni-H₂ (2017–present)",
            "110 Ah capacity, 4 kWh per assembly",
            "60% of sunlight power used for recharging",
            "Located on the Integrated Truss Structure",
            "Critical for continuous station operation",
        ],
        color: "#00e676",
        hoverColor: "#69f0ae",
    },
    {
        id: "radiators",
        name: "Thermal Radiator Panels",
        shortName: "Radiators",
        description:
            "Massive white panels that reject waste heat into space. The EPS generates significant heat — without radiators, equipment would overheat and fail.",
        details: [
            "Dissipate excess heat from EPS components",
            "Use ammonia as coolant fluid",
            "Work by radiating infrared energy to space",
            "Critical thermal management for power system",
            "Located on truss alongside power equipment",
        ],
        color: "#e0e0e0",
        hoverColor: "#ffffff",
    },
    {
        id: "pmad",
        name: "Power Management & Distribution",
        shortName: "PMAD",
        description:
            "The 'nervous system' of the EPS — SSUs, MBSUs, BCDUs, DDCUs, and RPCs work together to regulate, route, and convert power from 160 Vdc primary to 120 Vdc secondary.",
        details: [
            "SSU: Shunts excess solar power",
            "MBSU: Main bus switching & routing",
            "BCDU: Battery charge/discharge control",
            "DDCU: Converts 160V → 120V secondary",
            "RPC: Smart circuit breakers for loads",
        ],
        color: "#00d4ff",
        hoverColor: "#4de8ff",
    },
    {
        id: "modules",
        name: "Pressurized Modules (Loads)",
        shortName: "Modules",
        description:
            "Where astronauts live and work. All module equipment — life support, experiments, computers, lights — runs on 120 Vdc secondary power delivered by the PMAD system.",
        details: [
            "US Lab (Destiny), Node 1/2/3, Columbus, JEM",
            "Life support: O₂, CO₂ scrubbing, water",
            "Science experiments & communications",
            "Runs on 120 Vdc secondary power",
            "Russian segment uses 28 Vdc (via converters)",
        ],
        color: "#a78bfa",
        hoverColor: "#c4b5fd",
    },
];

interface ISSModelProps {
    onSelectComponent: (component: EPSComponent | null) => void;
    selectedId: string | null;
}

function ClickablePart({
    component,
    isSelected,
    onSelect,
    children,
}: {
    component: EPSComponent;
    isSelected: boolean;
    onSelect: (c: EPSComponent) => void;
    children: React.ReactNode;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <group
            onClick={(e) => {
                e.stopPropagation();
                onSelect(component);
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
                setHovered(false);
                document.body.style.cursor = "auto";
            }}
        >
            {children}
            {hovered && !isSelected && (
                <Html center distanceFactor={15} style={{ pointerEvents: "none" }}>
                    <div
                        className="px-3 py-1.5 rounded-lg backdrop-blur-md text-xs font-mono whitespace-nowrap border"
                        style={{
                            backgroundColor: "rgba(5, 8, 22, 0.85)",
                            borderColor: `${component.color}40`,
                            color: component.color,
                        }}
                    >
                        {component.shortName}
                    </div>
                </Html>
            )}
        </group>
    );
}

/** Single solar array wing panel */
function SolarPanel({
    position,
    rotation,
    isActive,
}: {
    position: [number, number, number];
    rotation?: [number, number, number];
    isActive: boolean;
}) {
    const color = isActive ? "#ffd54f" : "#ffb800";
    const emissive = isActive ? "#ffb800" : "#332200";
    return (
        <group position={position} rotation={rotation}>
            <mesh>
                <boxGeometry args={[4.5, 0.05, 1.5]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={isActive ? 0.6 : 0.15}
                    metalness={0.4}
                    roughness={0.5}
                />
            </mesh>
            {/* Panel grid lines */}
            {[-1.5, -0.75, 0, 0.75, 1.5].map((x) => (
                <mesh key={`v${x}`} position={[x, 0.03, 0]}>
                    <boxGeometry args={[0.02, 0.02, 1.5]} />
                    <meshStandardMaterial color="#aa7700" />
                </mesh>
            ))}
            {[-0.5, 0, 0.5].map((z) => (
                <mesh key={`h${z}`} position={[0, 0.03, z]}>
                    <boxGeometry args={[4.5, 0.02, 0.02]} />
                    <meshStandardMaterial color="#aa7700" />
                </mesh>
            ))}
            {/* Support mast */}
            <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[0.08, 0.15, 0.08]} />
                <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.3} />
            </mesh>
        </group>
    );
}

/** Truss segment with cross-bracing */
function TrussSegment({ position, length }: { position: [number, number, number]; length: number }) {
    return (
        <group position={position}>
            {/* Main beams - top/bottom rails */}
            <mesh position={[0, 0.15, 0.15]}>
                <boxGeometry args={[length, 0.06, 0.06]} />
                <meshStandardMaterial color="#8899aa" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.15, -0.15]}>
                <boxGeometry args={[length, 0.06, 0.06]} />
                <meshStandardMaterial color="#8899aa" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, -0.15, 0.15]}>
                <boxGeometry args={[length, 0.06, 0.06]} />
                <meshStandardMaterial color="#8899aa" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, -0.15, -0.15]}>
                <boxGeometry args={[length, 0.06, 0.06]} />
                <meshStandardMaterial color="#8899aa" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Cross bracing */}
            {Array.from({ length: Math.floor(length / 0.8) }, (_, i) => {
                const x = -length / 2 + 0.4 + i * 0.8;
                return (
                    <group key={i}>
                        <mesh position={[x, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                            <boxGeometry args={[0.03, 0.42, 0.03]} />
                            <meshStandardMaterial color="#667788" metalness={0.6} roughness={0.4} />
                        </mesh>
                        <mesh position={[x, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
                            <boxGeometry args={[0.03, 0.42, 0.03]} />
                            <meshStandardMaterial color="#667788" metalness={0.6} roughness={0.4} />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}

/** Pressurized module cylinder */
function Module({
    position,
    radius,
    length,
    color,
    isActive,
    rotation,
}: {
    position: [number, number, number];
    radius: number;
    length: number;
    color: string;
    isActive: boolean;
    rotation?: [number, number, number];
}) {
    return (
        <group position={position} rotation={rotation}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[radius, radius, length, 20]} />
                <meshStandardMaterial
                    color={isActive ? "#c4b5fd" : color}
                    emissive={isActive ? "#a78bfa" : "#110033"}
                    emissiveIntensity={isActive ? 0.4 : 0.05}
                    metalness={0.4}
                    roughness={0.5}
                />
            </mesh>
            {/* End cap rings */}
            <mesh position={[0, 0, length / 2]} rotation={[0, 0, 0]}>
                <torusGeometry args={[radius, 0.02, 8, 20]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0, -length / 2]}>
                <torusGeometry args={[radius, 0.02, 8, 20]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />
            </mesh>
        </group>
    );
}

export default function ISSModel({
    onSelectComponent,
    selectedId,
}: ISSModelProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (groupRef.current && !selectedId) {
            groupRef.current.rotation.y += delta * 0.06;
        }
    });

    const handleSelect = useCallback(
        (component: EPSComponent) => {
            onSelectComponent(selectedId === component.id ? null : component);
        },
        [onSelectComponent, selectedId]
    );

    const solarActive = selectedId === "solar-arrays";
    const batteryActive = selectedId === "batteries";
    const radiatorActive = selectedId === "radiators";
    const pmadActive = selectedId === "pmad";
    const modulesActive = selectedId === "modules";

    const solarComp = EPS_COMPONENTS.find((c) => c.id === "solar-arrays")!;
    const batteryComp = EPS_COMPONENTS.find((c) => c.id === "batteries")!;
    const radiatorComp = EPS_COMPONENTS.find((c) => c.id === "radiators")!;
    const pmadComp = EPS_COMPONENTS.find((c) => c.id === "pmad")!;
    const modulesComp = EPS_COMPONENTS.find((c) => c.id === "modules")!;

    return (
        <group ref={groupRef} rotation={[0.15, 0, 0.05]}>
            {/* ===== INTEGRATED TRUSS STRUCTURE ===== */}
            <TrussSegment position={[0, 0, 0]} length={22} />

            {/* ===== SOLAR ARRAY WINGS (clickable) ===== */}
            <ClickablePart component={solarComp} isSelected={solarActive} onSelect={handleSelect}>
                {/* Starboard arrays (+X) */}
                <group position={[8, 0, 0]}>
                    <mesh><cylinderGeometry args={[0.2, 0.2, 0.4, 8]} /><meshStandardMaterial color="#94a3b8" metalness={0.6} /></mesh>
                    <SolarPanel position={[0, 0, 1.5]} isActive={solarActive} />
                    <SolarPanel position={[0, 0, -1.5]} isActive={solarActive} />
                </group>
                <group position={[5.5, 0, 0]}>
                    <mesh><cylinderGeometry args={[0.15, 0.15, 0.35, 8]} /><meshStandardMaterial color="#94a3b8" metalness={0.6} /></mesh>
                    <SolarPanel position={[0, 0, 1.5]} isActive={solarActive} />
                    <SolarPanel position={[0, 0, -1.5]} isActive={solarActive} />
                </group>
                {/* Port arrays (-X) */}
                <group position={[-8, 0, 0]}>
                    <mesh><cylinderGeometry args={[0.2, 0.2, 0.4, 8]} /><meshStandardMaterial color="#94a3b8" metalness={0.6} /></mesh>
                    <SolarPanel position={[0, 0, 1.5]} isActive={solarActive} />
                    <SolarPanel position={[0, 0, -1.5]} isActive={solarActive} />
                </group>
                <group position={[-5.5, 0, 0]}>
                    <mesh><cylinderGeometry args={[0.15, 0.15, 0.35, 8]} /><meshStandardMaterial color="#94a3b8" metalness={0.6} /></mesh>
                    <SolarPanel position={[0, 0, 1.5]} isActive={solarActive} />
                    <SolarPanel position={[0, 0, -1.5]} isActive={solarActive} />
                </group>
            </ClickablePart>

            {/* ===== BATTERY ASSEMBLIES (clickable) ===== */}
            <ClickablePart component={batteryComp} isSelected={batteryActive} onSelect={handleSelect}>
                {[6.5, 7.5, -6.5, -7.5].map((x) =>
                    [0.4, -0.4].map((z) => (
                        <mesh key={`bat-${x}-${z}`} position={[x, 0.35, z]}>
                            <boxGeometry args={[0.6, 0.35, 0.5]} />
                            <meshStandardMaterial
                                color={batteryActive ? "#69f0ae" : "#00e676"}
                                emissive={batteryActive ? "#00e676" : "#002200"}
                                emissiveIntensity={batteryActive ? 0.6 : 0.1}
                                metalness={0.4}
                                roughness={0.5}
                            />
                        </mesh>
                    ))
                )}
            </ClickablePart>

            {/* ===== THERMAL RADIATORS (clickable) ===== */}
            <ClickablePart component={radiatorComp} isSelected={radiatorActive} onSelect={handleSelect}>
                {[3.5, -3.5].map((x) => (
                    <group key={`rad-${x}`} position={[x, 0, 0]}>
                        <mesh position={[0, 0, 1.8]} rotation={[0.1, 0, 0]}>
                            <boxGeometry args={[2.5, 0.04, 1.2]} />
                            <meshStandardMaterial color={radiatorActive ? "#fff" : "#e0e0e0"} emissive={radiatorActive ? "#e0e0e0" : "#111"} emissiveIntensity={radiatorActive ? 0.4 : 0.05} metalness={0.2} roughness={0.8} />
                        </mesh>
                        <mesh position={[0, 0, -1.8]} rotation={[-0.1, 0, 0]}>
                            <boxGeometry args={[2.5, 0.04, 1.2]} />
                            <meshStandardMaterial color={radiatorActive ? "#fff" : "#e0e0e0"} emissive={radiatorActive ? "#e0e0e0" : "#111"} emissiveIntensity={radiatorActive ? 0.4 : 0.05} metalness={0.2} roughness={0.8} />
                        </mesh>
                    </group>
                ))}
            </ClickablePart>

            {/* ===== PMAD EQUIPMENT (clickable) ===== */}
            <ClickablePart component={pmadComp} isSelected={pmadActive} onSelect={handleSelect}>
                {[4.5, 2.5, -2.5, -4.5].map((x) => (
                    <mesh key={`pmad-${x}`} position={[x, -0.35, 0]}>
                        <boxGeometry args={[0.7, 0.4, 0.5]} />
                        <meshStandardMaterial color={pmadActive ? "#4de8ff" : "#00d4ff"} emissive={pmadActive ? "#00d4ff" : "#001122"} emissiveIntensity={pmadActive ? 0.6 : 0.1} metalness={0.5} roughness={0.3} />
                    </mesh>
                ))}
                {[1.2, -1.2].map((x) => (
                    <mesh key={`ddcu-${x}`} position={[x, -0.3, 0]}>
                        <boxGeometry args={[0.5, 0.35, 0.4]} />
                        <meshStandardMaterial color={pmadActive ? "#4de8ff" : "#0099bb"} emissive={pmadActive ? "#00d4ff" : "#001122"} emissiveIntensity={pmadActive ? 0.5 : 0.08} metalness={0.5} roughness={0.3} />
                    </mesh>
                ))}
            </ClickablePart>

            {/* ===== PRESSURIZED MODULES (clickable) ===== */}
            <ClickablePart component={modulesComp} isSelected={modulesActive} onSelect={handleSelect}>
                {/* US Lab (Destiny) */}
                <Module position={[0, 0, -1.5]} radius={0.55} length={2.8} color="#8877cc" isActive={modulesActive} />
                {/* Node 2 (Harmony) */}
                <Module position={[0, 0, 0]} radius={0.45} length={1.2} color="#7766bb" isActive={modulesActive} />
                {/* Node 1 (Unity) */}
                <Module position={[0, 0, -3.2]} radius={0.5} length={1.2} color="#9988dd" isActive={modulesActive} />
                {/* Columbus */}
                <Module position={[0, 0, -3.2]} radius={0.4} length={1.8} color="#6655aa" isActive={modulesActive} rotation={[0, 0, Math.PI / 2]} />
                {/* JEM (Kibo) */}
                <Module position={[0, 0, 1.5]} radius={0.5} length={2} color="#7766bb" isActive={modulesActive} />
                {/* Russian segment */}
                <Module position={[0, 0, -5]} radius={0.5} length={2.5} color="#5544aa" isActive={modulesActive} />
                {/* Node 3 (Tranquility) */}
                <mesh position={[0, -1, -3.2]}>
                    <cylinderGeometry args={[0.4, 0.4, 1.4, 16]} />
                    <meshStandardMaterial color={modulesActive ? "#c4b5fd" : "#6655aa"} emissive={modulesActive ? "#a78bfa" : "#110033"} emissiveIntensity={modulesActive ? 0.3 : 0.05} metalness={0.4} roughness={0.5} />
                </mesh>
                {/* Cupola */}
                <mesh position={[0, -1.9, -3.2]}>
                    <sphereGeometry args={[0.3, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color={modulesActive ? "#93c5fd" : "#60a5fa"} emissive={modulesActive ? "#3b82f6" : "#000"} emissiveIntensity={modulesActive ? 0.5 : 0} transparent opacity={0.7} metalness={0.1} roughness={0.2} />
                </mesh>
            </ClickablePart>
        </group>
    );
}
