"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, ShieldCheck, MapPin, Radio, Wallet } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  tech: string[];
  description: string;
  features: string[];
  githubUrl: string;
  liveUrl: string;
  icon: any;
  accent: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "CrowdSourced Civic Sense Platform",
    subtitle: "Civic Problem Reporting & Resolution Platform",
    category: "Full Stack Web App",
    tech: ["React", "FastAPI", "MongoDB", "Maps API"],
    description:
      "A comprehensive civic engagement application allowing citizens to report community issues, monitor real-time resolution progress, and engage local authorities.",
    features: [
      "Issue Reporting",
      "Role Based Authentication",
      "Community Engagement",
      "Live Tracking",
      "Maps Integration",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    icon: MapPin,
    accent: "#D8C3A5",
  },
  {
    id: 2,
    title: "FinZer",
    subtitle: "AI-Powered Personal Finance & Dashboard",
    category: "Fintech & AI",
    tech: ["React", "FastAPI", "MongoDB", "AWS"],
    description:
      "An intelligent financial tracking platform that analyzes spending patterns, provides AI-driven budgeting advice, and secures user data with JWT authentication.",
    features: [
      "AI Finance Insights",
      "Interactive Analytics Dashboard",
      "JWT Authentication",
      "Secure REST APIs",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://finzer-financial-advisor.vercel.app/",
    icon: Wallet,
    accent: "#D8C3A5",
  },
  {
    id: 3,
    title: "BeatSync",
    subtitle: "Real-time Collaborative Music & Chat Rooms",
    category: "Real-time Distributed",
    tech: ["React", "FastAPI", "WebSockets", "WebGL"],
    description:
      "A real-time audio playback synchronization application featuring chat rooms, WebGL dynamic visualizers, and low-latency WebSocket communication.",
    features: [
      "Music Synchronization",
      "Live Chat & Messaging",
      "Custom Audio Rooms",
      "WebGL Visualizer",
      "Real-time Playback",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://beatxsync.vercel.app/",
    icon: Radio,
    accent: "#D8C3A5",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
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

export default function Projects() {
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(
    () =>
      projectsData.filter((p) =>
        `${p.title} ${p.category} ${p.tech.join(" ")} ${p.description} ${p.features.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#1E3A2F] px-6 py-24 md:px-10 lg:px-16"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(96,122,85,0.1),transparent_60%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8C3A5]">
            Featured Projects
          </p>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mt-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#F5F1EA] sm:text-4xl md:text-5xl">
                Innovative software product builds
              </h2>
              <p className="mt-3 max-w-2xl text-base text-[#B8C9B2]">
                Explore key projects highlighting full-stack execution, backend
                scalability, AI intelligence, and real-time WebSocket
                architecture.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full max-w-sm">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#617A55]"
              />
              <input
                type="text"
                placeholder="Search project or technology..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 w-full rounded-full border border-[#617A55]/30 bg-[#617A55]/10 pl-10 pr-4 text-xs text-[#F5F1EA] outline-none placeholder:text-[#617A55] focus:border-[#D8C3A5]/60 focus:bg-[#617A55]/15 transition"
              />
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const Icon = project.icon;

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#D8C3A5]/25 bg-[#617A55]/15 p-6 shadow-xl shadow-[#1E3A2F]/60 transition-all hover:border-[#D8C3A5]/50 hover:shadow-2xl hover:shadow-[#D8C3A5]/15 hover:bg-[#617A55]/20"
                >
                  {/* Top accent border line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D8C3A5]/60 via-[#D8C3A5]/80 to-[#D8C3A5]/60" />

                  {/* Glowing background blur */}
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-15 blur-3xl group-hover:opacity-30 transition-opacity"
                    style={{ background: project.accent }}
                  />

                  <div>
                    {/* Header icon & category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D8C3A5]/15 text-[#D8C3A5] border border-[#D8C3A5]/30 shadow-md shadow-[#D8C3A5]/10">
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full bg-[#D8C3A5]/12 border border-[#D8C3A5]/25 px-3 py-1 text-[11px] font-semibold text-[#D8C3A5] shadow-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl font-bold text-[#F5F1EA] group-hover:text-[#D8C3A5] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs font-mono text-[#A8BFA0]">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="mt-4 text-xs leading-6 text-[#B8C9B2] line-clamp-3">
                      {project.description}
                    </p>

                    {/* Features list */}
                    <div className="mt-5 space-y-1.5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#D8C3A5]/70">
                        Key Features:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.features.map((feat) => (
                          <span
                            key={feat}
                            className="inline-flex items-center gap-1 rounded-md bg-[#D8C3A5]/12 text-[#D8C3A5] border border-[#D8C3A5]/25 px-2 py-0.5 text-[10px] font-medium shadow-sm"
                          >
                            <ShieldCheck size={10} />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Tech Stack & Action Links */}
                  <div className="mt-6 pt-4 border-t border-[#D8C3A5]/15 space-y-4">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-[#617A55]/25 border border-[#617A55]/35 px-2.5 py-0.5 text-[11px] font-mono text-[#D8C3A5]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-[#D8C3A5]/30 bg-[#617A55]/20 px-3 py-2 text-xs font-semibold text-[#D8C3A5] hover:bg-[#D8C3A5]/15 hover:border-[#D8C3A5]/50 transition"
                      >
                        <GithubIcon size={14} />
                        <span>GitHub</span>
                      </a>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#D8C3A5] px-3 py-2 text-xs font-semibold text-[#1E3A2F] shadow-md shadow-[#D8C3A5]/30 hover:bg-[#E8DCC8] transition"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="mt-10 rounded-2xl border border-[#D8C3A5]/20 bg-[#617A55]/15 p-8 text-center">
            <p className="text-[#A8BFA0] text-sm">
              No projects found matching &quot;{query}&quot;.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
