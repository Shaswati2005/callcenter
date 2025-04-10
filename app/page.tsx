import ConstellationLayer from "./components/ConstellationLayer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import StarField from "./components/Starfield";

export default function Home() {
  return (
    <div className="w-screen h-screen   pt-10 bg-[#0e0217]">
      <Navbar />
      <HeroSection />
      <StarField />
      <ConstellationLayer />
      <ConstellationLayer />
      <ConstellationLayer />
    </div>
  );
}
