"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";

const soria = "'Soria', 'Century Gothic', sans-serif";

const PINE = "#132821";
const EMBER = "#C88A5E";

const experiences = [
  {
    company: "Alltius Pvt. Ltd.",
    role: "Technical Intern",
    period: "2024 - Present",
    location: "On-site",
    description:
      "Worked closely with core engineering teams to architect scalable REST APIs, build modern React interfaces, and implement real-time communication modules.",
    bullets: [
      "Engineered backend RESTful microservices using Python FastAPI, reducing API latency and improving query throughput.",
      "Collaborated on frontend feature development with React and TypeScript, delivering pixel-perfect responsive layouts.",
      "Integrated secure authentication protocols, database caching, and real-time state synchronization.",
      "Participated in agile code reviews, automated CI/CD pipeline deployments, and continuous system monitoring.",
    ],
    tech: ["FastAPI", "React", "Python", "REST APIs", "MongoDB", "Git"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#1E3A2F] px-6 py-26 md:px-10 lg:px-16"
    >
      {/* Ambient glows — matches navbar/modal upgrade */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_20%,rgba(216,195,165,0.06),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_75%,rgba(200,138,94,0.07),transparent_55%)]" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center lg:text-left"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8C3A5]"
            style={{ fontFamily: soria }}
          >
            Work Experience
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1EA] sm:text-4xl md:text-5xl"
            style={{ fontFamily: soria }}
          >
            Professional Industry Journey
          </h2>
        </motion.div>

        {/* Vertical editorial timeline */}
        <div className="relative">
          {/* Spine line */}
          <div
            className="absolute left-[27px] top-3 bottom-3 w-px md:left-[35px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(216,195,165,0.5) 0%, rgba(97,122,85,0.25) 70%, transparent 100%)",
            }}
          />

          <div className="space-y-14">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-6 md:gap-9"
              >
                {/* Node */}
                <div className="relative z-10 shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 220 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl md:h-[70px] md:w-[70px]"
                    style={{
                      background: "linear-gradient(150deg, #D8C3A5 0%, #C88A5E 130%)",
                      boxShadow: "0 8px 26px rgba(216,195,165,0.3)",
                    }}
                  >
                    <Briefcase size={22} color={PINE} />
                  </motion.div>
                </div>

                {/* Content card */}
                <div className="flex-1 min-w-0">
                  <div
                    className="group relative overflow-hidden rounded-[22px] p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1"
                    style={{
                      background:
                        "linear-gradient(155deg, rgba(97,122,85,0.14) 0%, rgba(19,40,33,0.55) 100%)",
                      border: "1px solid rgba(216,195,165,0.16)",
                      boxShadow: "0 20px 50px rgba(10,21,18,0.4)",
                    }}
                  >
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D8C3A5]/50 to-transparent" />
                    {/* Corner glow on hover */}
                    <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#C88A5E]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Header row */}
                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[12px] font-extrabold  uppercase tracking-[0.3em]"
                            style={{ fontFamily: soria, color: EMBER }}
                          >
                            {exp.company}
                          </span>
                          <ArrowUpRight size={12} className="text-[#D8C3A5]/60" />
                        </div>
                        <h3
                          className="mt-1 text-2xl font-extrabold text-[#F5F1EA] sm:text-3xl"
                          style={{ fontFamily: soria }}
                        >
                          {exp.role}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#B8C9B2] sm:flex-col sm:items-end sm:gap-1.5">
                        <span className="inline-flex items-center gap-1.5 font-mono">
                          <Calendar size={12} className="text-[#D8C3A5]" />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono">
                          <MapPin size={12} className="text-[#D8C3A5]" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="relative mt-3 text-[15px] leading-6 text-[#B8C9B2] sm:text-m">
                      {exp.description}
                    </p>

                    {/* Divider */}
                    <div className="my-2 h-px bg-gradient-to-r from-transparent via-[#617A80]/30 to-transparent" />

                    {/* Bullets — two-column on larger screens */}
                    <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {exp.bullets.map((bullet, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.3 + i * 0.08, duration: 0.4 }}
                          className="flex items-start gap-2 text-[13.3px] leading-5 text-[#A8BFA0]"
                        >
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#D8C3A5]" />
                          <span>{bullet}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tech tags */}
                    <div className="relative mt-6 flex flex-wrap gap-1.5 border-t border-[#617A55]/20 pt-4">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full px-2.5 py-1 text-[12  px] font-medium transition-colors"
                          style={{
                            fontFamily: soria,
                            color: "#D8C3A5",
                            background: "rgba(216,195,165,0.08)",
                            border: "1px solid rgba(216,195,165,0.2)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}