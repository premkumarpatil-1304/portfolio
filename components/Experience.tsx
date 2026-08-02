"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle } from "lucide-react";

const experiences = [
  {
    company: "Alltius Pvt Ltd",
    role: "Technical Intern",
    period: "2024 - Present",
    location: "Remote / On-site",
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
      className="relative overflow-hidden bg-[#1E3A2F] px-6 py-24 md:px-10 lg:px-16"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(96,122,85,0.08),transparent_60%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center lg:text-left"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8C3A5]"
            style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
          >
            Work Experience
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1EA] sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
          >
            Professional Industry Journey
          </h2>
        </motion.div>

        {/* Horizontal Timeline Container */}
        <div className="relative">
          {/* Horizontal timeline line */}
          <div className="absolute top-6 left-0 right-0 h-[2px] bg-[#617A55]/30 hidden md:block" />

          <div className="flex flex-col md:flex-row gap-8 md:gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="relative flex-1 flex flex-col items-center"
              >
                {/* Timeline Node Point */}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#D8C3A5] text-[#1E3A2F] shadow-lg shadow-[#D8C3A5]/30 ring-4 ring-[#1E3A2F] mb-6">
                  <Briefcase size={18} />
                </div>

                {/* Experience Card — compact */}
                <div className="w-full rounded-2xl border border-[#D8C3A5]/20 bg-[#617A55]/12 p-5 shadow-xl shadow-[#1E3A2F]/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider text-[#D8C3A5]"
                        style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
                      >
                        {exp.company}
                      </span>
                      <h3
                        className="text-lg font-bold text-[#F5F1EA] mt-0.5"
                        style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
                      >
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#A8BFA0]">
                      <span className="inline-flex items-center gap-1 font-mono bg-[#617A55]/20 px-2.5 py-1 rounded-full border border-[#617A55]/30">
                        <Calendar size={11} />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono bg-[#617A55]/20 px-2.5 py-1 rounded-full border border-[#617A55]/30">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs leading-6 text-[#B8C9B2]">
                    {exp.description}
                  </p>

                  {/* Bullets — compact */}
                  <div className="space-y-1.5 pt-1">
                    {exp.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-[#A8BFA0] leading-5">
                        <CheckCircle size={13} className="text-[#D8C3A5] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div className="pt-3 flex flex-wrap gap-1.5 border-t border-[#617A55]/25">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[#D8C3A5]/10 text-[#D8C3A5] px-2.5 py-0.5 text-[10px] font-medium border border-[#D8C3A5]/20"
                        style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
                      >
                        {t}
                      </span>
                    ))}
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
  