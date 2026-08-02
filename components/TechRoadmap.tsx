"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  CheckCircle2,
  Zap,
  Star,
  Rocket,
  Code2,
  Layout,
  Server,
  Cpu,
  Wrench,
  Trophy,
} from "lucide-react";

const soria = "'Soria', 'Century Gothic', sans-serif";

const branches = [
  {
    name: "Foundation",
    icon: Code2,
    skills: ["C", "Java", "DSA"],
    color: "#617A55",
  },
  {
    name: "Frontend",
    icon: Layout,
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
    color: "#617A55",
  },
  {
    name: "Backend",
    icon: Server,
    skills: ["Python", "FastAPI", "REST APIs", "MongoDB"],
    color: "#617A55",
  },
  {
    name: "DevOps",
    icon: Wrench,
    skills: ["Git", "CI/CD", "Cloud"],
    color: "#617A55",
  },
  {
    name: "AI & ML",
    icon: Cpu,
    skills: ["Prompt Engineering", "Machine Learning"],
    color: "#D8C3A5",
    status: "in-progress",
  },
  {
    name: "Milestones",
    icon: Trophy,
    skills: ["Full Stack Projects", "Hackathons", "Internship", "Open Source"],
    color: "#D8C3A5",
    status: "active",
  },
];

function GrowingBranch({
  branch,
  index,
}: {
  branch: (typeof branches)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = branch.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center"
    >
      {/* Branch connecting line — grows from top */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "40px" }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-[2px] bg-gradient-to-b from-transparent to-[#617A55]/60"
      />

      {/* Node with glow */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: index * 0.1 + 0.15,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        className="relative my-3"
      >
        <div
          className={`absolute inset-0 rounded-full blur-lg ${
            branch.status === "active" || branch.status === "in-progress"
              ? "bg-[#D8C3A5]/25"
              : "bg-[#617A55]/20"
          }`}
          style={{ transform: "scale(2)" }}
        />
        <div
          className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-lg ${
            branch.status === "active" || branch.status === "in-progress"
              ? "border-[#D8C3A5] bg-[#D8C3A5] shadow-[#D8C3A5]/40"
              : "border-[#617A55] bg-[#1E3A2F] shadow-[#617A55]/30"
          }`}
        >
          <Icon
            size={22}
            className={
              branch.status === "active" || branch.status === "in-progress"
                ? "text-[#1E3A2F]"
                : "text-[#D8C3A5]"
            }
          />
        </div>
      </motion.div>

      {/* Branch label */}
      <motion.h4
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        className="text-sm font-bold text-[#F5F1EA] mb-4 text-center"
        style={{ fontFamily: soria }}
      >
        {branch.name}
      </motion.h4>

      {/* Skill leaves — grow outward */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
        className="relative w-full max-w-[220px]"
      >
        {/* Central stem line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#617A55]/20" />

        <div className="space-y-2.5 relative">
          {branch.skills.map((skill, si) => {
            const isLeft = si % 2 === 0;
            return (
              <motion.div
                key={skill}
                initial={{
                  opacity: 0,
                  x: isLeft ? -20 : 20,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.5 + si * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* Leaf branch line */}
                <div
                  className={`absolute top-1/2 h-[1px] w-4 bg-[#617A55]/30 ${
                    isLeft ? "right-full mr-2" : "left-full ml-2"
                  }`}
                />

                <div
                  className={`relative rounded-lg px-3 py-1.5 text-center text-[11px] font-medium border ${
                    branch.status === "active" ||
                    branch.status === "in-progress"
                      ? "border-[#D8C3A5]/25 bg-[#D8C3A5]/10 text-[#D8C3A5]"
                      : "border-[#617A55]/20 bg-[#617A55]/10 text-[#B8C9B2]"
                  }`}
                  style={{ fontFamily: soria }}
                >
                  {skill}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TechRoadmap() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const trunkHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="roadmap"
      className="relative overflow-hidden bg-[#1E3A2F] px-6 py-24 md:px-10 lg:px-16"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center_top,rgba(96,122,85,0.1),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(216,195,165,0.06),transparent_50%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8C3A5]"
            style={{ fontFamily: soria }}
          >
            Tech Journey Roadmap
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1EA] sm:text-4xl md:text-5xl"
            style={{ fontFamily: soria }}
          >
            My Path of Continuous Learning
          </h2>
          <p
            className="mt-3 max-w-xl mx-auto text-sm text-[#B8C9B2]"
            style={{ fontFamily: soria }}
          >
            From roots of programming to branches of innovation — watch my
            journey grow.
          </p>
        </motion.div>

        {/* Tree Structure */}
        <div ref={containerRef} className="relative">
          {/* Main trunk line — scrolls with progress */}
          <motion.div
            style={{ height: trunkHeight }}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#617A55] via-[#D8C3A5]/40 to-transparent hidden md:block"
          />

          {/* Branches grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 relative z-10">
            {branches.map((branch, index) => (
              <GrowingBranch key={branch.name} branch={branch} index={index} />
            ))}
          </div>

          {/* Root glow at bottom */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="mt-5 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#D8C3A5]/10 blur-2xl" />
              <div className="relative flex items-center gap-3 rounded-full border border-[#D8C3A5]/30 bg-gradient-to-r from-[#D8C3A5]/10 to-[#617A55]/10 px-6 py-3 shadow-lg">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-2.5 w-2.5 rounded-full bg-[#D8C3A5]"
                />
                <span
                  className="text-sm font-bold text-[#D8C3A5] tracking-wide"
                  style={{ fontFamily: soria }}
                >
                  Full Stack AI Software Engineer
                </span>
                <Rocket size={14} className="text-[#D8C3A5]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
