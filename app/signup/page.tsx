"use client";

import { SignUp } from "@clerk/nextjs";
import { domAnimation, LazyMotion, m } from "framer-motion";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b0f30] relative overflow-hidden">
      {/* Sparkling Overlay */}
      <img
        src="/sparkle.svg"
        alt="sparkle background"
        className="absolute top-0 left-0 w-full h-full opacity-10 object-cover pointer-events-none z-0 animate-pulse"
      />

      {/* Signup Card */}
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-fit  bg-transparent rounded-3xl shadow-2xl   hover:shadow-purple-300 hover:scale-[1.01] transition-all duration-300"
        >
          <SignUp />
        </m.div>
      </LazyMotion>
    </div>
  );
};

export default SignupPage;
