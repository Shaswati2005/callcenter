import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
   <div className="w-screen h-screen   pt-10 bg-[#0e0217]">
    <Navbar/>
    <HeroSection/>


   </div>
  );
}
