import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SolarArrays from "@/components/SolarArrays";
import Batteries from "@/components/Batteries";
import PowerDistribution from "@/components/PowerDistribution";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <SolarArrays />
      <div className="section-divider" />
      <Batteries />
      <div className="section-divider" />
      <PowerDistribution />
      <Footer />
    </main>
  );
}
