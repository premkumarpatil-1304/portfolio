"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      {/* Top right gradient blob — Moss Green */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -right-32 h-[550px] w-[550px] rounded-full bg-[#617A55]/10 blur-[130px]"
      />

      {/* Bottom left gradient blob — Champagne Gold */}
      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 -left-32 h-[600px] w-[600px] rounded-full bg-[#D8C3A5]/8 blur-[140px]"
      />

      {/* Floating subtle particle dots — recolored to palette */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/5 h-1.5 w-1.5 rounded-full bg-[#D8C3A5] animate-pulse" />
        <div className="absolute top-2/3 right-1/4 h-2 w-2 rounded-full bg-[#617A55] animate-pulse duration-1000" />
        <div className="absolute top-1/3 right-1/3 h-1 w-1 rounded-full bg-[#F5F1EA] animate-pulse duration-700" />
        <div className="absolute bottom-1/4 left-1/3 h-1.5 w-1.5 rounded-full bg-[#D8C3A5]/70 animate-pulse duration-1500" />
      </div>
    </div>
  );
}
