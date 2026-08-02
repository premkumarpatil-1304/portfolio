"use client";

import { motion } from "framer-motion";
import { User, Target, Lightbulb, Compass, Award, Code, CheckCircle2 } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const stats = [
  { value: "10+", label: "Full Stack Projects", icon: Code },
  { value: "8+", label: "Professional Certifications", icon: Award },
  { value: "2+", label: "Hackathon Wins & Demos", icon: Target },
  { value: "100%", label: "Clean Code & Quality Focus", icon: CheckCircle2 },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#1E3A2F] px-6 py-20  md:px-10 lg:px-16"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(96,122,85,0.1),transparent_60%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center lg:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8C3A5] "
          style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}>
            About Me
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1EA] sm:text-4xl md:text-5xl"
          style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}>
            Engineering with passion, clarity & speed
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Story & Journey */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="space-y-4 text-base leading-8 text-[#B8C9B2]"
              style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
            >
              <p className="text-lg font-medium text-[#F5F1EA] leading-relaxed">
                Hello! I'm{" "}
                <strong className="text-[#D8C3A5]"style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}>Premkumar Patil</strong>, a
                Full Stack Developer & AI Engineer focused on building robust
                web solutions that bridge complex backend logic with fluid,
                high-conversion frontend user interfaces.
              </p>

              <p>
                My journey began with C and Java programming, where I discovered
                the elegance of algorithms and structured object-oriented
                thinking. As I expanded into full-stack development with modern
                JavaScript, React, Next.js, and Python FastAPI, I found my true
                passion: crafting complete digital products from ground up.
              </p>

              <p>
                Whether it's architecting real-time synchronization in
                BeatSync, designing AI-driven financial insights in FinZer, or
                creating civic reporting tools with live tracking, I treat
                software engineering as a craft that requires discipline, speed,
                and continuous improvement.
              </p>
            </motion.div>

            {/* Mindset Pill Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
              style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
            >
              <div className="rounded-2xl border border-[#617A55]/30 bg-[#617A55]/10 p-5 shadow-md shadow-[#1E3A2F]/40">
                <div className="flex items-center gap-3 text-[#D8C3A5] mb-2">
                  <Lightbulb size={20} />
                  <h4 className="font-semibold text-[#F5F1EA] text-sm">
                    Engineering Mindset
                  </h4>
                </div>
                <p className="text-xs leading-6 text-[#A8BFA0]">
                  Prioritizing maintainable architecture, clean design patterns,
                  thorough testing, and type safety over quick hacks.
                </p>
              </div>

              <div className="rounded-2xl border border-[#617A55]/30 bg-[#617A55]/10 p-5 shadow-md shadow-[#1E3A2F]/40">
                <div className="flex items-center gap-3 text-[#D8C3A5] mb-2">
                  <Compass size={20} />
                  <h4 className="font-semibold text-[#F5F1EA] text-sm">
                    Passion & Goals
                  </h4>
                </div>
                <p className="text-xs leading-6 text-[#A8BFA0]">
                  Driven to push boundaries in AI-assisted applications,
                  full-stack scalability, and real-time distributed systems.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Stats Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
            style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-2xl border border-[#617A55]/30 bg-[#617A55]/10 p-6 shadow-xl shadow-[#1E3A2F]/50 flex flex-col justify-between"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D8C3A5]/10 text-[#D8C3A5] mb-4">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="text-3xl font-extrabold text-[#F5F1EA] font-mono tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-[#A8BFA0] leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
