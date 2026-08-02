"use client";

import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useMemo, useCallback } from "react";

const soria = "'Soria', 'Century Gothic', sans-serif";

const skills = [
  "Java", "Spring Boot", "React", "JavaScript", "TypeScript",
  "HTML", "CSS", "Tailwind CSS", "Bootstrap", "FastAPI",
  "Python", "MySQL", "MongoDB", "Git", "GitHub",
  "Docker", "Linux", "AWS", "REST APIs", "JWT",
  "Socket.IO", "Firebase", "Figma", "VS Code",
];

/* ---------------------------------------------------------------------- */
/*  SVG Spider Web — radial + concentric threads with golden shimmer       */
/* ---------------------------------------------------------------------- */

function SpiderWeb({
  mouseX,
  mouseY,
}: {
  mouseX: number;
  mouseY: number;
}) {
  const cx = 500;
  const cy = 400;
  const numRadials = 16;
  const numRings = 7;
  const maxRadius = 380;

  const webRadius = useSpring(maxRadius, { stiffness: 30, damping: 20 });

  const lines = useMemo(() => {
    const radialLines: string[] = [];
    const ringLines: string[] = [];

    // Radial threads
    for (let i = 0; i < numRadials; i++) {
      const angle = (i / numRadials) * Math.PI * 2;
      const x2 = cx + Math.cos(angle) * maxRadius;
      const y2 = cy + Math.sin(angle) * maxRadius;
      radialLines.push(`M ${cx} ${cy} L ${x2} ${y2}`);
    }

    // Concentric rings
    for (let r = 1; r <= numRings; r++) {
      const radius = (r / numRings) * maxRadius;
      const points: string[] = [];
      for (let i = 0; i <= numRadials; i++) {
        const angle = (i / numRadials) * Math.PI * 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      ringLines.push(points.join(" "));
    }

    return { radialLines, ringLines };
  }, []);

  // Mouse distortion — subtle bend when cursor is near the web center
  const distortX = useTransform(mouseX, [0, 500, 1000], [0, 20, 0]);
  const distortY = useTransform(mouseY, [0, 400, 800], [0, 15, 0]);

  return (
    <motion.svg
      viewBox="0 0 1000 800"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ filter: "drop-shadow(0 0 20px rgba(216,195,165,0.08))" }}
    >
      <defs>
        <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(96,122,85,0.3)" />
          <stop offset="50%" stopColor="rgba(216,195,165,0.25)" />
          <stop offset="100%" stopColor="rgba(96,122,85,0.3)" />
        </linearGradient>
      </defs>

      {/* Radial threads */}
      {lines.radialLines.map((d, i) => (
        <motion.path
          key={`r-${i}`}
          d={d}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: i * 0.04,
            ease: "easeOut",
          }}
          stroke="url(#webGrad)"
          strokeWidth="0.8"
          fill="none"
          style={{
            transform: `translate(${distortX.get()}px, ${distortY.get()}px)`,
          }}
        />
      ))}

      {/* Concentric rings */}
      {lines.ringLines.map((d, i) => (
        <motion.path
          key={`c-${i}`}
          d={d}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.5 + i * 0.1,
            ease: "easeOut",
          }}
          stroke="rgba(216,195,165,0.15)"
          strokeWidth="0.6"
          fill="none"
        />
      ))}

      {/* Center node — golden glow */}
      <motion.circle
        cx={cx}
        cy={cy}
        r="4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.2, type: "spring" }}
        fill="rgba(216,195,165,0.6)"
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r="12"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.15, 0.3, 0] }}
        transition={{ delay: 2.2, duration: 2, repeat: Infinity, repeatDelay: 3 }}
        fill="rgba(216,195,165,0.15)"
      />
    </motion.svg>
  );
}

/* ---------------------------------------------------------------------- */
/*  Hanging Skill Badge — swings from a silk thread                       */
/* ---------------------------------------------------------------------- */

function HangingSkill({
  name,
  x,
  y,
  delay,
  mouseX,
  mouseY,
}: {
  name: string;
  x: number;
  y: number;
  delay: number;
  mouseX: number;
  mouseY: number;
}) {
  const badgeRef = useRef<HTMLDivElement>(null);

  // Pendulum swing — each badge has unique timing
  const swingX = useTransform(
    () => Math.sin(Date.now() * 0.001 + delay * 0.5) * 3 + Math.sin(Date.now() * 0.0007 + delay) * 2
  );
  const swingY = useTransform(
    () => Math.cos(Date.now() * 0.0009 + delay * 0.3) * 1.5 + Math.sin(Date.now() * 0.0012 + delay * 0.8) * 1
  );

  // Continuous animation frame for organic swing
  const time = useMotionValue(0);

  const swingRotate = useTransform(time, (t) => {
    const base = Math.sin(t * 0.001 + delay * 0.7) * 4; // degrees
    const wobble = Math.sin(t * 0.0023 + delay * 1.1) * 1.5;
    return base + wobble;
  });

  const swingTranslateX = useTransform(time, (t) => {
    const base = Math.sin(t * 0.001 + delay * 0.7) * 12;
    const wobble = Math.sin(t * 0.0017 + delay * 0.9) * 5;
    return base + wobble;
  });

  const swingTranslateY = useTransform(time, (t) => {
    return Math.cos(t * 0.0008 + delay * 0.4) * 4;
  });

  // Mouse proximity reaction
  const proximity = useTransform(
    [mouseX, mouseY],
    ([mx, my]) => {
      const dx = mx - x;
      const dy = my - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return Math.max(0, 1 - dist / 250);
    },
    [0]
  );

  const mouseRotate = useTransform(proximity, (p) => p * 15);
  const mouseScale = useTransform(proximity, (p) => 1 + p * 0.12);
  const mouseY_offset = useTransform(proximity, (p) => -p * 20);

  const rotate = useSpring(useTransform(
    [swingRotate, mouseRotate],
    ([s, m]) => s + m
  ), { stiffness: 100, damping: 15 });

  const translateX = useSpring(useTransform(
    [swingTranslateX, mouseRotate],
    ([s, m]) => s + m * 0.8
  ), { stiffness: 80, damping: 12 });

  const translateY = useSpring(useTransform(
    [swingTranslateY, mouseY_offset],
    ([s, m]) => s + m
  ), { stiffness: 80, damping: 12 });

  const scale = useSpring(mouseScale, { stiffness: 120, damping: 20 });

  // Start the time animation
  const isInView = useInView(badgeRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={badgeRef}
      initial={{ opacity: 0, y: -60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      className="absolute"
      style={{
        left: x,
        top: y,
        zIndex: 10,
      }}
    >
      {/* Silk thread */}
      <motion.div
        style={{
          width: "1px",
          height: "30px",
          background: "linear-gradient(to bottom, rgba(216,195,165,0.3), rgba(216,195,165,0.05))",
          marginLeft: "50%",
          transformOrigin: "top center",
          rotate: rotate,
          translateX: translateX,
        }}
      />

      {/* Badge */}
      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -60 }}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
        style={{
          transform: `translate(${translateX.get()}px, ${translateY.get()}px)`,
          scale,
        }}
        whileHover={{
          scale: 1.06,
          y: -6,
          transition: { duration: 0.3 },
        }}
        className="relative cursor-pointer"
        onMouseEnter={() => {
          // Add time-based animation on mount
          startSwingAnimation(time);
        }}
      >
        <div
          className="px-4 py-2 rounded-full backdrop-blur-md border shadow-lg whitespace-nowrap transition-all duration-300 hover:shadow-[0_0_20px_rgba(216,195,165,0.15)]"
          style={{
            background: "linear-gradient(135deg, rgba(96,122,85,0.25), rgba(96,122,85,0.12))",
            border: "1px solid rgba(216,195,165,0.3)",
            boxShadow: "0 4px 15px rgba(30,58,47,0.3)",
          }}
        >
          <span
            className="text-[11px] font-semibold text-[#F5F1EA] tracking-wide"
            style={{ fontFamily: soria }}
          >
            {name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Helper to start continuous swing animation
function startSwingAnimation(time: any) {
  if (typeof time === "number") return;
  // Use requestAnimationFrame for organic continuous motion
  let startTime = Date.now();
  const tick = () => {
    time.set(Date.now() - startTime);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------------------------------------------------------------------- */
/*  Dust Particles — subtle floating particles                            */
/* ---------------------------------------------------------------------- */

function DustParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "rgba(216,195,165,0.4)",
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [p.opacity, p.opacity * 0.5, p.opacity, p.opacity * 0.3, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Main Component                                                         */
/* ---------------------------------------------------------------------- */

export default function SpiderWebSkills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Mouse tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(400);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  // Position skills around the web in a natural distribution
  const skillPositions = useMemo(() => {
    const positions: { name: string; x: number; y: number; delay: number }[] = [];
    const cx = 500;
    const cy = 400;
    const rings = [
      { radius: 180, count: 6, angleOffset: 0 },
      { radius: 260, count: 8, angleOffset: 0.3 },
      { radius: 340, count: 10, angleOffset: 0.15 },
    ];

    let skillIndex = 0;
    rings.forEach((ring) => {
      for (let i = 0; i < ring.count && skillIndex < skills.length; i++) {
        const angle = (i / ring.count) * Math.PI * 2 + ring.angleOffset;
        const x = cx + Math.cos(angle) * ring.radius - 35; // center the badge
        const y = cy + Math.sin(angle) * ring.radius - 12;
        positions.push({
          name: skills[skillIndex],
          x,
          y,
          delay: skillIndex * 0.08,
        });
        skillIndex++;
      }
    });

    // Add remaining skills at outer positions
    while (skillIndex < skills.length) {
      const angle = (skillIndex / skills.length) * Math.PI * 2 + 0.1;
      const radius = 390;
      const x = cx + Math.cos(angle) * radius - 35;
      const y = cy + Math.sin(angle) * radius - 12;
      positions.push({
        name: skills[skillIndex],
        x,
        y,
        delay: skillIndex * 0.08,
      });
      skillIndex++;
    }

    return positions;
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#1E3A2F] px-6 py-24 md:px-10 lg:px-16"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,rgba(96,122,85,0.08),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_80%,rgba(216,195,165,0.04),transparent_50%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8C3A5]"
            style={{ fontFamily: soria }}
          >
            Skills & Technologies
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1EA] sm:text-4xl md:text-5xl"
            style={{ fontFamily: soria }}
          >
            The Web of Craftsmanship
          </h2>
          <p
            className="mt-3 max-w-xl mx-auto text-sm text-[#B8C9B2]"
            style={{ fontFamily: soria }}
          >
            Each skill hangs from the web of knowledge — hover to explore, move
            your cursor to feel the threads respond.
          </p>
        </motion.div>

        {/* Spider Web Container */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative mx-auto rounded-[30px] overflow-hidden"
          style={{
            maxWidth: "1000px",
            height: "800px",
            background: "radial-gradient(ellipse at center, #1a3329 0%, #0d1a15 100%)",
            border: "1px solid rgba(216,195,165,0.08)",
            boxShadow: "inset 0 0 60px rgba(30,58,47,0.5), 0 20px 60px rgba(9,14,12,0.4)",
          }}
        >
          {/* Dust particles */}
          <DustParticles />

          {/* Mist layer */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(96,122,85,0.15),transparent_70%)]" />

          {/* SVG Spider Web */}
          <SpiderWeb mouseX={mouseX} mouseY={mouseY} />

          {/* Hanging Skills */}
          <div className="absolute inset-0">
            {skillPositions.map((skill) => (
              <HangingSkill
                key={skill.name}
                name={skill.name}
                x={skill.x}
                y={skill.y}
                delay={skill.delay}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            ))}
          </div>

          {/* Vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 50%, rgba(13,26,21,0.6) 100%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
