"use client";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="bg-[#0e0217] text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl w-full text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Elevate Your Customer Experience with{" "}
            <span className="text-[#8e44ad]">Elite Support</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Our trained agents are available 24/7 to ensure your clients get the
            best support they deserve.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <Link href={"/signup"} className="bg-[#8e44ad] hover:bg-[#732d91] text-white px-6 py-3 rounded-2xl shadow-lg flex items-center">
               Signup
            </Link>
            <Link href={"/login"} className="border border-[#8e44ad] text-[#8e44ad] hover:bg-[#8e44ad]/10 px-6 py-3 rounded-2xl">
              Login
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#8e44ad] mb-4">
            About Us
          </h2>
          <p className="text-gray-300 text-lg">
            At Elite Support, we're redefining the call center experience. With
            cutting-edge technology, multilingual agents, and a passion for
            excellence, we help businesses deliver unforgettable customer
            service. Our mission is simple — empower your brand by being the
            voice of trust.
          </p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-20 bg-[#1a0f2c]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3  gap-8">
          {[
            "24/7 Live Support",
            "Multilingual Assistance",
            "CRM Integration",
            "Custom Training Programs",
            "Real-Time Analytics",
            "Quality Assurance Monitoring",
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#2a1742] min-w-[250px] rounded-2xl p-6 shadow-lg hover:shadow-violet-600 hover:scale-[1.1]   transition-transform"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {service}
              </h3>
              <p className="text-gray-400">
                Professional, personalized, and prompt solutions tailored for
                your business needs.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Satisfied Customers Section */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#8e44ad] mb-4">
            Satisfied Customers
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            We’ve served hundreds of happy clients across the globe. Here’s what
            a few of them had to say:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Game-changer support!",
              "Best service I’ve ever had!",
              "Professional and super friendly staff.",
              "Highly responsive and reliable.",
              "Exceptional follow-through.",
              "Our go-to support partner!",
            ].map((quote, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-[#1a0f2c] rounded-xl p-6 text-left shadow-md hover:shadow-lg transition-all"
              >
                <p className="text-white italic">“{quote}”</p>
                <p className="text-[#8e44ad] font-semibold mt-2">
                  — Happy Client {i + 1}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact CTA Section */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to boost your support?
          </h2>
          <p className="text-gray-300 mb-6">
            Let's get started. Book a free consultation and explore how we can
            help you grow with better customer experiences.
          </p>
          <Link
            href={"/signup"}
            className="bg-[#8e44ad] hover:bg-[#732d91] px-8 py-4 text-white text-lg rounded-full shadow-xl"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
