"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import SolarArrays from "@/components/SolarArrays";
import Batteries from "@/components/Batteries";
import PowerDistribution from "@/components/PowerDistribution";
import Footer from "@/components/Footer";

const ISSViewer = dynamic(() => import("@/components/ISSViewer"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-[#050816]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-electric border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-500 font-mono">Loading 3D Model...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main>
      <Navbar />
      <ISSViewer />
      <SolarArrays />
      <Batteries />
      <PowerDistribution />
      <Footer />
    </main>
  );
}
