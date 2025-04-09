"use client"

import { domAnimation, LazyMotion, m } from "framer-motion";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b0f30] relative overflow-hidden">
      {/* Sparkling Overlay */}
      <img
        src="/sparkle-bg.svg"
        alt="sparkle background"
        className="absolute top-0 left-0 w-full h-full opacity-10 object-cover pointer-events-none z-0 animate-pulse"
      />

      {/* Signup Card */}
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md p-8 bg-[#f4f0ff] rounded-3xl shadow-2xl border border-[#eae0ff] hover:shadow-purple-300 hover:scale-[1.01] transition-all duration-300"
        >
          <h2 className="text-3xl font-bold text-center text-[#6a4fc3] mb-6 animate-fade-in">
            Create an Account 🚀
          </h2>

          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1c1c2b]">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-3 border border-[#ddd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a29bfe]"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#1c1c2b]">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full mt-1 p-3 border border-[#ddd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a29bfe]"
                placeholder="+1234567890"
                required
              />
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-[#1c1c2b]">
                OTP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="otp"
                className="w-full mt-1 p-3 border border-[#ddd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a29bfe]"
                placeholder="Enter OTP"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1c1c2b]">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-1 p-3 border border-[#ddd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a29bfe]"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-[#1c1c2b]">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full mt-1 p-3 border border-[#ddd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a29bfe]"
                placeholder="Re-enter password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6a4fc3] text-white py-3 rounded-xl font-semibold hover:bg-[#5e43b8] transition duration-200"
            >
              Sign Up
            </button>
          </form>
        </m.div>
      </LazyMotion>
    </div>
  );
};

export default SignupPage;
