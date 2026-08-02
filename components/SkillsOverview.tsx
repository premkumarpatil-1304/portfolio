"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Terminal, Database, Brain, Cpu, Cloud } from "lucide-react";

const soria = "'Soria', 'Century Gothic', sans-serif";

const skillCategories = [
  { name: "Frontend Development", percentage: 92, icon: Code2, desc: "React, Next.js, HTML, CSS, Tailwind, TypeScript" },
  { name: "Backend Development", percentage: 88, icon: Server, desc: "FastAPI, REST APIs, Python, Node.js" },
  { name: "Programming Core", percentage: 90, icon: Terminal, desc: "Java, Python, C, Object-Oriented Architecture" },
  { name: "Databases & Storage", percentage: 85, icon: Database, desc: "MongoDB, MySQL, Schema Design, Querying" },
  { name: "Problem Solving & DSA", percentage: 88, icon: Brain, desc: "Algorithms, Data Structures, Logic Building" },
  { name: "AI & Machine Learning", percentage: 82, icon: Cpu, desc: "Prompt Engineering, ML Basics, Data Analytics" },
  { name: "Cloud & Deployment", percentage: 80, icon: Cloud, desc: "Render, Netlify, Vercel, Git & GitHub workflows" },
];

export default function SkillsOverview() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#1E3A2F] px-6 py-24 md:px-10 lg:px-16"
    >
      {/* No gradients — flat background like other components */}

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center lg:text-left"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8C3A5]"
            style={{ fontFamily: soria }}
          >
            Skills Overview
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1EA] sm:text-4xl md:text-5xl"
            style={{ fontFamily: soria }}
          >
            Core Competency Breakdown
          </h2>
        </motion.div>

        {/* Progress Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-3xl border border-[#D8C3A5]/20 bg-[#617A55]/10 p-6 shadow-lg shadow-[#1E3A2F]/40 backdrop-blur-xl space-y-4 transition-all hover:border-[#D8C3A5]/40 hover:shadow-xl hover:shadow-[#D8C3A5]/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D8C3A5]/10 text-[#D8C3A5] border border-[#D8C3A5]/20 transition-all group-hover:bg-[#D8C3A5]/20 group-hover:scale-105">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3
                        className="text-base font-bold text-[#F5F1EA] group-hover:text-[#D8C3A5] transition-colors duration-300"
                        style={{ fontFamily: soria }}
                      >
                        {skill.name}
                      </h3>
                      <p
                        className="text-xs text-[#B8C9B2]"
                        style={{ fontFamily: soria }}
                      >
                        {skill.desc}
                      </p>
                    </div>
                  </div>

                  <span
                    className="text-lg font-bold text-[#D8C3A5]"
                    style={{ fontFamily: soria }}
                  >
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress Track */}
                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#1E3A2F]/40 border border-[#D8C3A5]/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-[#D8C3A5] shadow-md shadow-[#D8C3A5]/20"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
