"use client"
import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-[#0e0217] text-white min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl w-full text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Elevate Your Customer Experience with <span className="text-[#8e44ad]">Elite Support</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Our trained agents are available 24/7 to ensure your clients get the best support they deserve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <button className="bg-[#8e44ad] hover:bg-[#732d91] text-white px-6 py-3 rounded-2xl shadow-lg">
            <PhoneCall className="mr-2 h-5 w-5" /> Contact Sales
          </button>
          <button  className="border-[#8e44ad] text-[#8e44ad] hover:bg-[#8e44ad]/10 px-6 py-3 rounded-2xl">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
