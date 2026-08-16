"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type LoaderProps = {
  isLoading: boolean;
};

/* ═══════════════════════════════════════════════════════════════════════ */
/*  CIRCUIT BOOT LOADER — Total: 3.5 seconds                              */
/*  Palette: Forest Green / Moss Green / Champagne Gold                  */
/* ═══════════════════════════════════════════════════════════════════════ */

const DATA_PACKETS = [
  { x: 12, y: 20, size: 3, delay: 0.1, duration: 2.4 },
  { x: 78, y: 15, size: 2, delay: 0.4, duration: 2.1 },
  { x: 34, y: 68, size: 3, delay: 0.8, duration: 2.6 },
  { x: 88, y: 55, size: 2, delay: 0.2, duration: 2.3 },
  { x: 55, y: 82, size: 2, delay: 0.6, duration: 2.0 },
  { x: 18, y: 45, size: 3, delay: 1.0, duration: 2.5 },
  { x: 92, y: 30, size: 2, delay: 0.3, duration: 2.2 },
  { x: 45, y: 10, size: 3, delay: 0.7, duration: 2.7 },
  { x: 65, y: 40, size: 2, delay: 0.5, duration: 2.1 },
  { x: 25, y: 90, size: 3, delay: 0.9, duration: 2.4 },
  { x: 70, y: 72, size: 2, delay: 0.15, duration: 2.3 },
  { x: 8, y: 60, size: 2, delay: 1.1, duration: 2.6 },
];

const GOLD = "#D8C3A5";
const MOSS = "#617A55";
const CREAM = "#F5F1EA";
const FOREST = "#1E3A2F";

export default function SeedSaplingLoader({ isLoading }: LoaderProps) {
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const hasCounted = useRef(false);

  // Detect reduced-motion preference client-side only.
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Scene timeline — total ~3.5 seconds
  // Scene 1: 300ms  → circuit draws, percentage starts counting at 0
  // Scene 2: 2800ms → progress hits 100%, name reveals
  // Scene 3: 3200ms → hexagon expand out
  useEffect(() => {
    if (!isLoading) return;

    const timers = [
      setTimeout(() => setScene(1), 300),
      setTimeout(() => setScene(2), 2800),
      setTimeout(() => setScene(3), 3200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isLoading]);

  // Progress counter: starts immediately when scene 1 fires (300ms)
  // Counts 0 → 100 over 2500ms (300ms + 2500ms = 2800ms → hits 100 exactly at name reveal)
  useEffect(() => {
    if (scene < 1 || hasCounted.current) return;
    hasCounted.current = true;

    let raf: number;
    let start: number | null = null;
    const durationMs = 2500;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [scene]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: FOREST }}
        >
          {/* Ambient glow blobs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute inset-0"
          >
            <div
              className="absolute w-[600px] h-[600px] rounded-full blur-[130px]"
              style={{ top: "-15%", right: "-10%", background: MOSS, opacity: 0.15 }}
            />
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[110px]"
              style={{ bottom: "-15%", left: "-10%", background: MOSS, opacity: 0.1 }}
            />
          </motion.div>

          {/* Subtle grid backdrop */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(${GOLD} 1px, transparent 1px),
                linear-gradient(90deg, ${GOLD} 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Floating data packets */}
          {!reducedMotion &&
            DATA_PACKETS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: `${p.x}%`, y: `${p.y}%` }}
                animate={{
                  opacity: [0, 0.5, 0.2, 0.5, 0],
                  y: [`${p.y}%`, `${p.y - 6}%`],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
                className="absolute rounded-sm pointer-events-none"
                style={{
                  width: p.size,
                  height: p.size,
                  background: GOLD,
                  boxShadow: `0 0 ${p.size * 2}px ${GOLD}`,
                }}
              />
            ))}

          {/* Center stage */}
          <div className="relative flex flex-col items-center justify-center gap-6 z-10">

            {/* CIRCUIT NODE NETWORK */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={scene >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <svg width="200" height="200" viewBox="0 0 140 140" fill="none">
                {/* Connection lines */}
                {[
                  "M70,70 L30,30",
                  "M70,70 L110,30",
                  "M70,70 L30,110",
                  "M70,70 L110,110",
                  "M70,70 L70,20",
                  "M70,70 L70,120",
                ].map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    stroke={GOLD}
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      scene >= 1
                        ? { pathLength: 1, opacity: 0.6 }
                        : {}
                    }
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  />
                ))}

                {/* Outer nodes */}
                {[
                  { cx: 30, cy: 30 },
                  { cx: 110, cy: 30 },
                  { cx: 30, cy: 110 },
                  { cx: 110, cy: 110 },
                  { cx: 70, cy: 20 },
                  { cx: 70, cy: 120 },
                ].map((n, i) => (
                  <motion.circle
                    key={i}
                    cx={n.cx}
                    cy={n.cy}
                    r="4"
                    fill={MOSS}
                    stroke={GOLD}
                    strokeWidth="1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={scene >= 1 ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                  />
                ))}

                {/* Center core node */}
                <motion.circle
                  cx="70"
                  cy="70"
                  r="7"
                  fill={GOLD}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={scene >= 1 ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                />
                {/* Pulse ring around core */}
                <motion.circle
                  cx="70"
                  cy="70"
                  r="7"
                  stroke={GOLD}
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                />
              </svg>
            </motion.div>

            {/* PERCENTAGE — Big bold counter that visibly counts to 100 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={scene >= 1 ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <span
                className="text-5xl sm:text-6xl font-bold font-mono tracking-tight tabular-nums"
                style={{ color: GOLD }}
              >
                {progress}%
              </span>
            </motion.div>

            {/* TERMINAL TEXT — changes when complete */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={scene >= 1 ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 -mt-1"
            >
              <span
                className="text-sm tracking-widest"
                style={{ color: MOSS, fontFamily: "monospace" }}
              >
                {"> "}
                {progress >= 100 ? "system ready" : "initializing..."}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: GOLD, fontFamily: "monospace" }}
              >
                _
              </motion.span>
            </motion.div>

            {/* PROGRESS BAR */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={scene >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-0 w-[300px] sm:w-[380px]"
            >
              <div
                className="w-full h-[4px] rounded-full overflow-hidden"
                style={{ background: "rgba(97,122,85,0.2)" }}
              >
                <div
                  className="h-full rounded-full transition-none"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${MOSS}, ${GOLD})`,
                    boxShadow: `0 0 8px ${GOLD}`,
                  }}
                />
              </div>
            </motion.div>

            {/* NAME / ROLE — reveals when progress hits 100% */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={
                scene >= 2
                  ? { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                  : {}
              }
              className="text-center"
              style={{ display: scene >= 2 ? "block" : "none" }}
            >
              <h1
                className="text-3xl sm:text-4xl font-bold tracking-[0.2em] uppercase"
                style={{ color: CREAM, fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
              >
                Premkumar Patil
              </h1>
              <p
                className="mt-2 text-sm tracking-[0.35em] uppercase"
                style={{ color: GOLD, fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
              >
                Full Stack Developer
              </p>
            </motion.div>

            {/* HEXAGON EXPAND TRANSITION */}
            {scene >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 1],
                  scale: [0, 1.6, 2.2],
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <motion.polygon
                    points="60,5 105,30 105,90 60,115 15,90 15,30"
                    stroke={GOLD}
                    strokeWidth="1.5"
                    fill="rgba(216,195,165,0.08)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  {[
                    { cx: 60, cy: -35, delay: 0.1 },
                    { cx: 105, cy: 10, delay: 0.15 },
                    { cx: 105, cy: 110, delay: 0.2 },
                    { cx: 60, cy: 155, delay: 0.25 },
                    { cx: 15, cy: 110, delay: 0.3 },
                    { cx: 15, cy: 10, delay: 0.35 },
                  ].map((hex, i) => (
                    <motion.polygon
                      key={i}
                      points={`${hex.cx},${hex.cy - 25} ${hex.cx + 22},${hex.cy - 12.5} ${hex.cx + 22},${hex.cy + 12.5} ${hex.cx},${hex.cy + 25} ${hex.cx - 22},${hex.cy + 12.5} ${hex.cx - 22},${hex.cy - 12.5}`}
                      stroke={GOLD}
                      strokeWidth="0.8"
                      fill="rgba(216,195,165,0.04)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0.8] }}
                      transition={{ duration: 0.5, delay: hex.delay + 0.1 }}
                    />
                  ))}
                </svg>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
  