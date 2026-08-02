"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type LoaderProps = {
  isLoading: boolean;
};

/* ═══════════════════════════════════════════════════════════════════════ */
/*  SEED SAPLING LOADER — Premium nature-inspired loading animation      */
/*  5 scenes: Seed fall → Roots → Sprout → Text → Hexagon transition    */
/*  60/30/10 palette: Forest Green / Moss Green / Champagne Gold        */
/* ═══════════════════════════════════════════════════════════════════════ */

export default function SeedSaplingLoader({ isLoading }: LoaderProps) {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const timers = [
      setTimeout(() => setScene(1), 500),   // Scene 1: Seed falls
      setTimeout(() => setScene(2), 1200),   // Scene 2: Roots grow
      setTimeout(() => setScene(3), 1800),   // Scene 3: Sprout emerges
      setTimeout(() => setScene(4), 2300),   // Scene 4: Text fades in
      setTimeout(() => setScene(5), 2500),   // Scene 5: Hexagon transition
    ];

    return () => timers.forEach(clearTimeout);
  }, [isLoading]);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#1E3A2F" }}
        >
          {/* Ambient background — fog particles */}
          {!prefersReducedMotion && (
            <>
              {/* Slow fog layers */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 2, delay: 0.3 }}
                className="absolute inset-0"
              >
                <div
                  className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
                  style={{
                    top: "-10%",
                    right: "-10%",
                    background: "#617A55",
                    opacity: 0.15,
                  }}
                />
                <div
                  className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
                  style={{
                    bottom: "-15%",
                    left: "-10%",
                    background: "#617A55",
                    opacity: 0.1,
                  }}
                />
              </motion.div>

              {/* Floating dust particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    opacity: 0,
                  }}
                  animate={{
                    opacity: [0, 0.3, 0.1, 0.4, 0],
                    y: [null, -30 - Math.random() * 40],
                    x: [null, (Math.random() - 0.5) * 60],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 1.5,
                    delay: Math.random() * 1,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2,
                  }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 2 + Math.random() * 2,
                    height: 2 + Math.random() * 2,
                    background: "#D8C3A5",
                    filter: `blur(${Math.random()}px)`,
                  }}
                />
              ))}
            </>
          )}

          {/* Center stage — SVG animations */}
          <div className="relative flex flex-col items-center justify-center">

            {/* SEED (Scene 0-1) */}
            <motion.div
              initial={{ y: -200, opacity: 0, rotate: -15 }}
              animate={
                scene >= 1
                  ? {
                      y: 0,
                      opacity: 1,
                      rotate: 0,
                      transition: {
                        duration: 0.5,
                        type: "spring",
                        stiffness: 60,
                        damping: 12,
                      },
                    }
                  : {}
              }
              className="relative"
              style={{ display: scene >= 1 ? "block" : "none" }}
            >
              {/* Seed SVG */}
              <svg width="32" height="42" viewBox="0 0 32 42" fill="none">
                <path
                  d="M16 0C10 0 4 8 4 20C4 32 10 40 16 42C22 40 28 32 28 20C28 8 22 0 16 0Z"
                  fill="#D8C3A5"
                  opacity="0.9"
                />
                <path
                  d="M16 8C16 8 16 34 16 34"
                  stroke="#617A55"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <path
                  d="M16 14C12 12 8 10 6 12"
                  stroke="#617A55"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
                <path
                  d="M16 14C20 12 24 10 26 12"
                  stroke="#617A55"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
                {/* Golden crack glow */}
                <motion.path
                  d="M16 6C16 6 16 18 16 18"
                  stroke="#D8C3A5"
                  strokeWidth="1.5"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={
                    scene >= 2
                      ? { opacity: [0, 0.8, 0.6], pathLength: [0, 1], transition: { duration: 0.6 } }
                      : {}
                  }
                />
              </svg>

              {/* Seed glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  scene >= 1
                    ? { opacity: [0, 0.3, 0.15], scale: [0, 1.5, 1.2] }
                    : {}
                }
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(216,195,165,0.3) 0%, transparent 70%)",
                  width: "80px",
                  height: "80px",
                  left: "-24px",
                  top: "-19px",
                }}
              />
            </motion.div>

            {/* ROOTS (Scene 2) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={scene >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                position: "absolute",
                top: "42px",
                display: scene >= 2 ? "block" : "none",
              }}
            >
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
                {/* Main root */}
                <motion.path
                  d="M40 0C40 15 38 30 35 45"
                  stroke="#617A55"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={scene >= 2 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Branch root left */}
                <motion.path
                  d="M37 25C30 30 22 32 15 38"
                  stroke="#617A55"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={scene >= 2 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                {/* Branch root right */}
                <motion.path
                  d="M36 30C44 35 52 38 60 42"
                  stroke="#617A55"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={scene >= 2 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                {/* Tiny root hairs */}
                <motion.path
                  d="M20 35C18 40 16 44 14 48"
                  stroke="#617A55"
                  strokeWidth="0.8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={scene >= 2 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                />
                <motion.path
                  d="M55 40C58 44 60 47 62 50"
                  stroke="#617A55"
                  strokeWidth="0.8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={scene >= 2 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                />
                {/* Golden glow at root tips */}
                {scene >= 2 && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0.2] }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="absolute rounded-full"
                      style={{
                        width: 6,
                        height: 6,
                        background: "#D8C3A5",
                        bottom: -2,
                        left: 32,
                        filter: "blur(3px)",
                      }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.4, 0.1] }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="absolute rounded-full"
                      style={{
                        width: 5,
                        height: 5,
                        background: "#D8C3A5",
                        bottom: 18,
                        left: 10,
                        filter: "blur(2px)",
                      }}
                    />
                  </>
                )}
              </svg>
            </motion.div>

            {/* SPROUT (Scene 3) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={scene >= 3 ? { opacity: 1 } : {}}
              style={{
                position: "absolute",
                bottom: scene >= 3 ? "auto" : undefined,
                top: scene >= 3 ? undefined : "-60px",
                display: scene >= 3 ? "block" : "none",
              }}
            >
              <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
                {/* Stem */}
                <motion.path
                  d="M30 80C30 60 28 40 30 20"
                  stroke="#617A55"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={scene >= 3 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Left leaf */}
                <motion.path
                  d="M30 35C20 28 12 22 8 28C12 32 20 34 30 38"
                  fill="#617A55"
                  opacity="0.7"
                  initial={{ pathLength: 0 }}
                  animate={scene >= 3 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                {/* Right leaf */}
                <motion.path
                  d="M30 28C40 22 48 18 52 24C48 28 40 30 30 32"
                  fill="#617A55"
                  opacity="0.7"
                  initial={{ pathLength: 0 }}
                  animate={scene >= 3 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 }}
                />
                {/* Leaf vein left */}
                <motion.path
                  d="M30 35C24 31 18 27 12 28"
                  stroke="#D8C3A5"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={scene >= 3 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 }}
                />
                {/* Leaf vein right */}
                <motion.path
                  d="M30 30C38 26 44 23 50 24"
                  stroke="#D8C3A5"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={scene >= 3 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.75 }}
                />
                {/* Top bud */}
                <motion.circle
                  cx="30"
                  cy="18"
                  r="3"
                  fill="#D8C3A5"
                  initial={{ scale: 0 }}
                  animate={scene >= 3 ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.8 }}
                />
                {/* Sway animation on stem */}
                {scene >= 3 && (
                  <motion.g
                    animate={{ rotate: [-1, 1, -0.5, 0.5, -1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "30px 80px" }}
                  >
                    {/* Invisible rect for sway reference */}
                  </motion.g>
                )}
              </svg>

              {/* Pollen particles floating up */}
              {!prefersReducedMotion && scene >= 3 && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`pollen-${i}`}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{
                        opacity: [0, 0.5, 0],
                        y: [-10 - i * 15, -40 - i * 20],
                        x: [(Math.random() - 0.5) * 20],
                      }}
                      transition={{
                        duration: 1.2 + Math.random() * 0.5,
                        delay: i * 0.15,
                      }}
                      className="absolute rounded-full"
                      style={{
                        width: 2,
                        height: 2,
                        background: "#D8C3A5",
                        left: `${25 + (Math.random() - 0.5) * 20}px`,
                        top: `${20 + i * 10}px`,
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>

            {/* TEXT (Scene 4) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={
                scene >= 4
                  ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  : {}
              }
              className="relative z-10 text-center mt-6"
              style={{ display: scene >= 4 ? "block" : "none" }}
            >
              <h1
                className="text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase"
                style={{ color: "#F5F1EA", fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
              >
                Premkumar Patil
              </h1>
              <p
                className="mt-2 text-xs tracking-[0.35em] uppercase"
                style={{ color: "#D8C3A5", fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
              >
                Full Stack Developer
              </p>
            </motion.div>

            {/* HEXAGON TRANSITION (Scene 5) */}
            {scene >= 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 1],
                  scale: [0, 1.5, 2],
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {/* Central hexagon */}
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <motion.polygon
                    points="60,5 105,30 105,90 60,115 15,90 15,30"
                    stroke="#D8C3A5"
                    strokeWidth="1.5"
                    fill="rgba(216,195,165,0.08)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* Surrounding hexagons */}
                  {[
                    { cx: 60, cy: -35, delay: 0.1 },
                    { cx: 105, cy: 10, delay: 0.2 },
                    { cx: 105, cy: 110, delay: 0.3 },
                    { cx: 60, cy: 155, delay: 0.4 },
                    { cx: 15, cy: 110, delay: 0.5 },
                    { cx: 15, cy: 10, delay: 0.6 },
                  ].map((hex, i) => (
                    <motion.polygon
                      key={i}
                      points={`${hex.cx},${hex.cy - 25} ${hex.cx + 22},${hex.cy - 12.5} ${hex.cx + 22},${hex.cy + 12.5} ${hex.cx},${hex.cy + 25} ${hex.cx - 22},${hex.cy + 12.5} ${hex.cx - 22},${hex.cy - 12.5}`}
                      stroke="#D8C3A5"
                      strokeWidth="0.8"
                      fill="rgba(216,195,165,0.04)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0.8] }}
                      transition={{ duration: 0.6, delay: hex.delay + 0.2 }}
                    />
                  ))}
                </svg>
              </motion.div>
            )}
          </div>

          {/* Golden sunlight from above */}
          {scene >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.06 }}
              transition={{ duration: 1 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[400px]"
              style={{
                background: "linear-gradient(to bottom, rgba(216,195,165,0.15) 0%, transparent 100%)",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
