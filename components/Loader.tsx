"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type LoaderProps = {
  isLoading: boolean;
};

/* ═══════════════════════════════════════════════════════════════════════ */
/*  CIRCUIT BOOT LOADER — Tech-inspired loading animation                 */
/*  5 scenes: Terminal boot → Circuit draw → Progress → Text → Expand     */
/*  Palette: Forest Green / Moss Green / Champagne Gold                  */
/* ═══════════════════════════════════════════════════════════════════════ */

// Fixed (non-random) particle configs — identical on server & client,
// which avoids the hydration mismatch that Math.random() caused.
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

  // Detect reduced-motion preference client-side only, after mount,
  // so server and client render identically on first pass.
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const timers = [
      setTimeout(() => setScene(1), 400),  // Scene 1: terminal boot text
      setTimeout(() => setScene(2), 1000), // Scene 2: circuit draws
      setTimeout(() => setScene(3), 1600), // Scene 3: progress bar counts
      setTimeout(() => setScene(4), 2300), // Scene 4: name/text fade in
      setTimeout(() => setScene(5), 2600), // Scene 5: hexagon expand out
    ];

    return () => timers.forEach(clearTimeout);
  }, [isLoading]);

  // Deterministic progress counter (0 -> 100), no randomness.
  useEffect(() => {
    if (scene < 3) return;
    let raf: number;
    let start: number | null = null;
    const durationMs = 650;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(step);
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
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Floating data packets — fixed positions, no hydration mismatch */}
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

            {/* CIRCUIT NODE NETWORK (Scene 1-2) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={scene >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
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
                      scene >= 2
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
                    animate={scene >= 2 ? { scale: 1, opacity: 1 } : {}}
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
                {scene >= 2 && (
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
                )}
              </svg>
            </motion.div>

            {/* TERMINAL BOOT TEXT (Scene 1) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={scene >= 1 ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
              style={{ display: scene >= 1 && scene < 3 ? "flex" : "none" }}
            >
              <span
                className="text-xs tracking-widest"
                style={{ color: MOSS, fontFamily: "monospace" }}
              >
                {"> "}
                {scene >= 2 ? "compiling modules..." : "booting system..."}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: GOLD, fontFamily: "monospace" }}
              >
                _
              </motion.span>
            </motion.div>

            {/* PROGRESS BAR (Scene 3) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={scene >= 3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-2 w-[220px]"
              style={{ display: scene >= 3 ? "flex" : "none" }}
            >
              <div
                className="w-full h-[3px] rounded-full overflow-hidden"
                style={{ background: "rgba(97,122,85,0.2)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${MOSS}, ${GOLD})`,
                    boxShadow: `0 0 8px ${GOLD}`,
                  }}
                />
              </div>
              <span
                className="text-[10px] tracking-[0.2em]"
                style={{ color: GOLD, fontFamily: "monospace" }}
              >
                {progress}%
              </span>
            </motion.div>

            {/* NAME / ROLE (Scene 4) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={
                scene >= 4
                  ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  : {}
              }
              className="text-center mt-2"
              style={{ display: scene >= 4 ? "block" : "none" }}
            >
              <h1
                className="text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase"
                style={{ color: CREAM, fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
              >
                Premkumar Patil
              </h1>
              <p
                className="mt-2 text-xs tracking-[0.35em] uppercase"
                style={{ color: GOLD, fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
              >
                Full Stack Developer
              </p>
            </motion.div>

            {/* HEXAGON EXPAND TRANSITION (Scene 5) */}
            {scene >= 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 1],
                  scale: [0, 1.6, 2.2],
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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
                    transition={{ duration: 0.6 }}
                  />
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
                      stroke={GOLD}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}