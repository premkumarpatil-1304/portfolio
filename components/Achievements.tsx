"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useMemo } from "react";
import { Award, Trophy, CheckCircle, Sparkles, Star, X, ExternalLink, Clock, Users, Code2 } from "lucide-react";

const soria = "'Soria', 'Century Gothic', sans-serif";
type Certification = {
  title: string;
  issuer: string;
  category: string;
};
const certifications: Certification[] = [
  { title: "MongoDB Certified Developer", issuer: "MongoDB", category: "Database" },
  { title: "HackerRank SQL Certification", issuer: "HackerRank", category: "Database & SQL" },
  { title: "Infosys C Programming", issuer: "Infosys Springboard", category: "Programming" },
  { title: "Udemy Full Stack Development", issuer: "Udemy", category: "Full Stack" },
  { title: "Udemy Java Masterclass", issuer: "Udemy", category: "Programming" },
  { title: "Udemy CSS Deep Dive", issuer: "Udemy", category: "Frontend" },
  { title: "Udemy JavaScript Algorithms", issuer: "Udemy", category: "Frontend" },
  { title: "Udemy Bootstrap UI", issuer: "Udemy", category: "Frontend" },
];

const hackathons = [
  {
    title: "MIT Kurukshetra Hackathon National Level",
    location: "MIT Alandi",
    description:
      "Developed a scalable full-stack software application using React, FastAPI and MongoDB with reusable components, REST APIs and role-based authentication. Designed an intuitive user interface with real-time status tracking, location mapping, community engagement and role-based access for citizens and officials.",
    award: "Participant",
    team: "Solo",
    duration: "48 Hours",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Tatva Hackathon",
    location: "LPU",
    description:
      "Built an AI-enabled personal finance platform using React, FastAPI and MongoDB with secure JWT authentication. Integrated AI-powered spending analysis and budgeting assistance to deliver personalized financial recommendations. Developed REST APIs and response dashboards while ensuring scalable backend architecture.",
    award: "Participant",
    team: "3 Members",
    duration: "36 Hours",
    tech: ["Next.js", "FastAPI", "PostgreSQL"],
  },
  {
    title: "Smart India Hackathon",
    location: "National Level",
    description:
      "Built a civic problem reporting platform with real-time tracking, maps integration, and role-based authentication.",
    award: "Participation Certificate",
    team: "4 Members",
    duration: "72 Hours",
    tech: ["React", "Python", "AWS"],
  },
  {
    title: "CodeSprint Hackathon",
    location: "Regional Level",
    description:
      "Developed a full-stack fintech dashboard with AI-powered spending insights and JWT authentication in 24 hours.",
    award: "Winner",
    team: "3 Members",
    duration: "24 Hours",
    tech: ["TypeScript", "FastAPI", "Redis"],
  },
];

function mulberry32(seed: number) {
  return function rand() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateStarShadow(count: number, seed: number, colors: string[]) {
  const rand = mulberry32(seed);
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(rand() * 2000);
    const y = Math.floor(rand() * 2000);
    const color = colors[Math.floor(rand() * colors.length)];
    parts.push(`${x}px ${y}px ${color}`);
  }
  return parts.join(", ");
}

function StarField() {
  const palette = ["#F5F1EA", "#D8C3A5", "#B8C9B2"];

  const small = useMemo(() => generateStarShadow(420, 11, palette), []);
  const medium = useMemo(() => generateStarShadow(160, 22, palette), []);
  const large = useMemo(() => generateStarShadow(70, 33, ["#D8C3A5", "#F5F1EA"]), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes achv-star-drift {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .achv-star-layer { position: absolute; top: 0; left: 0; background: transparent; }
        .achv-star-layer::after {
          content: "";
          position: absolute;
          top: 2000px;
          left: 0;
          width: inherit;
          height: inherit;
          box-shadow: inherit;
          background: transparent;
        }
      `}</style>
      <div
        className="achv-star-layer opacity-70"
        style={{ width: "1px", height: "1px", boxShadow: small, animation: "achv-star-drift 110s linear infinite" }}
      />
      <div
        className="achv-star-layer opacity-60"
        style={{ width: "2px", height: "2px", boxShadow: medium, animation: "achv-star-drift 180s linear infinite" }}
      />
      <div
        className="achv-star-layer opacity-50"
        style={{ width: "3px", height: "3px", boxShadow: large, animation: "achv-star-drift 260s linear infinite" }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Hackathon Card — Flip + Modal UX                                       */
/*  Card is a glass panel. On hover, a subtle shimmer sweeps across.       */
/*  On click, a modal overlay reveals full details with a cinematic scale  */
/* ---------------------------------------------------------------------- */

function HackathonCard({
  hackathon,
  index,
  onClick,
}: {
  hackathon: (typeof hackathons)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative group cursor-pointer"
      onClick={onClick}
      style={{ perspective: "800px" }}
    >
      {/* Shimmer sweep on hover */}
      <div className="absolute inset-0 rounded-[20px] overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(216,195,165,0.08) 50%, transparent 60%)",
            animation: "shimmer 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className="relative h-[220px] w-[260px] rounded-[20px] overflow-hidden transition-all duration-400 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[#D8C3A5]/10"
        style={{
          background: "linear-gradient(160deg, rgba(96,122,85,0.2) 0%, rgba(30,58,47,0.4) 100%)",
          border: "1px solid rgba(216,195,165,0.2)",
          boxShadow: "0 4px 24px rgba(9,14,12,0.4)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Top gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D8C3A5]/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          {/* Top row: Icon + Award badge */}
          <div className="flex items-start justify-between">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: index * 0.12 + 0.3, type: "spring", stiffness: 200 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D8C3A5]/15 border border-[#D8C3A5]/30"
            >
              <Trophy size={18} className="text-[#D8C3A5]" />
            </motion.div>

            <div className="flex items-center gap-1.5 rounded-full border border-[#D8C3A5]/25 bg-[#1E3A2F]/50 px-2.5 py-1">
              <Star size={10} className="fill-[#D8C3A5] text-[#D8C3A5]" />
              <span className="text-[9px] font-semibold uppercase tracking-wider text-[#D8C3A5]" style={{ fontFamily: soria }}>
                {hackathon.award}
              </span>
            </div>
          </div>

          {/* Middle: Title */}
          <div className="mt-2">
            <h4
              className="text-[15px] font-bold leading-snug text-[#F5F1EA] line-clamp-2"
              style={{ fontFamily: soria }}
            >
              {hackathon.title}
            </h4>
            <p className="mt-1.5 text-[10px] text-[#B8C9B2]" style={{ fontFamily: soria }}>
              {hackathon.location}
            </p>
          </div>

          {/* Bottom: Quick stats + CTA */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#617A55]/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Users size={10} className="text-[#617A55]" />
                <span className="text-[9px] text-[#617A55]" style={{ fontFamily: soria }}>{hackathon.team}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={10} className="text-[#617A55]" />
                <span className="text-[9px] text-[#617A55]" style={{ fontFamily: soria }}>{hackathon.duration}</span>
              </div>
            </div>

            {/* Click indicator */}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D8C3A5]/10 border border-[#D8C3A5]/20 group-hover:bg-[#D8C3A5]/20 transition-colors">
              <ExternalLink size={9} className="text-[#D8C3A5]" />
              <span className="text-[8px] font-semibold text-[#D8C3A5]" style={{ fontFamily: soria }}>
                Details
              </span>
            </div>
          </div>
        </div>

        {/* Corner glow on hover */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#D8C3A5]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Detail Modal — cinematic reveal when a card is clicked                 */
/* ---------------------------------------------------------------------- */

function HackathonModal({
  hackathon,
  onClose,
}: {
  hackathon: (typeof hackathons)[0] | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {hackathon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0d1a15]/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-[24px] overflow-hidden"
            style={{
              background: "linear-gradient(160deg, rgba(96,122,85,0.25) 0%, rgba(30,58,47,0.7) 100%)",
              border: "1px solid rgba(216,195,165,0.25)",
              boxShadow: "0 25px 60px rgba(9,14,12,0.6), 0 0 0 1px rgba(216,195,165,0.05) inset",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D8C3A5]/50 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#1E3A2F]/60 border border-[#617A55]/30 text-[#B8C9B2] hover:text-[#D8C3A5] hover:border-[#D8C3A5]/30 transition-colors"
            >
              <X size={14} />
            </button>

            <div className="p-7">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D8C3A5]/15 border border-[#D8C3A5]/30">
                  <Trophy size={24} className="text-[#D8C3A5]" />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-[#F5F1EA] leading-tight"
                    style={{ fontFamily: soria }}
                  >
                    {hackathon.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center gap-1 rounded-full border border-[#D8C3A5]/25 bg-[#D8C3A5]/10 px-2 py-0.5">
                      <Star size={10} className="fill-[#D8C3A5] text-[#D8C3A5]" />
                      <span className="text-[9px] font-semibold text-[#D8C3A5] uppercase tracking-wider" style={{ fontFamily: soria }}>
                        {hackathon.award}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#B8C9B2]" style={{ fontFamily: soria }}>
                      {hackathon.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 h-px bg-gradient-to-r from-transparent via-[#D8C3A5]/20 to-transparent" />

              {/* Description */}
              <div className="mb-5">
                <p className="text-[10px] font-semibold text-[#617A55] uppercase tracking-wider mb-2" style={{ fontFamily: soria }}>
                  About
                </p>
                <p className="text-[12px] text-[#B8C9B2] leading-relaxed" style={{ fontFamily: soria }}>
                  {hackathon.description}
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-xl bg-[#1E3A2F]/50 border border-[#617A55]/20 p-3">
                  <p className="text-[9px] font-semibold text-[#617A55] uppercase tracking-wider mb-1" style={{ fontFamily: soria }}>
                    Team Size
                  </p>
                  <p className="text-[13px] font-bold text-[#F5F1EA]" style={{ fontFamily: soria }}>
                    {hackathon.team}
                  </p>
                </div>
                <div className="rounded-xl bg-[#1E3A2F]/50 border border-[#617A55]/20 p-3">
                  <p className="text-[9px] font-semibold text-[#617A55] uppercase tracking-wider mb-1" style={{ fontFamily: soria }}>
                    Duration
                  </p>
                  <p className="text-[13px] font-bold text-[#F5F1EA]" style={{ fontFamily: soria }}>
                    {hackathon.duration}
                  </p>
                </div>
              </div>

              {/* Tech stack */}
              <div>
                <p className="text-[10px] font-semibold text-[#617A55] uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ fontFamily: soria }}>
                  <Code2 size={10} />
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {hackathon.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#D8C3A5]/25 bg-[#D8C3A5]/10 px-3 py-1 text-[10px] text-[#D8C3A5] font-medium"
                      style={{ fontFamily: soria }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------------- */
/*  Certifications — Filterable by Issuer with count badges                */
/* ---------------------------------------------------------------------- */

function CertificationsFiltered({
  certifications,
}: {
  certifications: Certification[];
}) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Build unique issuers with counts
  const issuerCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    certifications.forEach((c) => {
      counts[c.issuer] = (counts[c.issuer] || 0) + 1;
    });
    return counts;
  }, [certifications]);

  // Build tab list: All + each issuer
  const tabs = useMemo(() => {
    const allTabs: { name: string; count: number }[] = [
      { name: "All", count: certifications.length },
    ];
    Object.entries(issuerCounts)
      .sort((a, b) => b[1] - a[1]) // most certs first
      .forEach(([name, count]) => {
        allTabs.push({ name, count });
      });
    return allTabs;
  }, [certifications, issuerCounts]);

  // Filtered list
  const filtered = useMemo(() => {
    if (activeFilter === "All") return certifications;
    return certifications.filter((c) => c.issuer === activeFilter);
  }, [activeFilter, certifications]);

  return (
    <div>
      {/* Issuer Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {tabs.map((tab) => (
          <motion.button
            key={tab.name}
            onClick={() => setActiveFilter(tab.name)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300"
            style={{
              fontFamily: soria,
              background:
                activeFilter === tab.name
                  ? "rgba(216,195,165,0.15)"
                  : "rgba(96,122,85,0.08)",
              border:
                activeFilter === tab.name
                  ? "1px solid rgba(216,195,165,0.35)"
                  : "1px solid rgba(96,122,85,0.15)",
              color:
                activeFilter === tab.name
                  ? "#D8C3A5"
                  : "#B8C9B2",
              boxShadow:
                activeFilter === tab.name
                  ? "0 2px 12px rgba(216,195,165,0.1)"
                  : "none",
            }}
          >
            {activeFilter === tab.name && (
              <motion.div
                layoutId="active-tab-bg"
                className="absolute inset-0 rounded-full bg-[#D8C3A5]/15 border border-[#D8C3A5]/35"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span>{tab.name}</span>
            <span
              className="flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-[9px] font-bold"
              style={{
                background:
                  activeFilter === tab.name
                    ? "rgba(216,195,165,0.25)"
                    : "rgba(96,122,85,0.2)",
                color:
                  activeFilter === tab.name
                    ? "#D8C3A5"
                    : "#617A55",
              }}
            >
              {tab.count}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Animated Card Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center py-12"
          >
            <p className="text-sm text-[#B8C9B2]" style={{ fontFamily: soria }}>
              No certifications found for this issuer.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={activeFilter}
            layout
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              initial="hidden"
              animate="show"
              className="contents"
            >
              {filtered.map((cert) => (
                <motion.div
                  key={cert.title}
                  variants={{
                    hidden: { opacity: 0, scale: 0.92, y: 16 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
                    },
                  }}
                  layout
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group rounded-2xl border border-[#617A55]/25 bg-[#617A55]/10 p-5 shadow-md shadow-[#1E3A2F]/40 backdrop-blur-md transition-all hover:border-[#D8C3A5]/30 hover:shadow-lg hover:shadow-[#D8C3A5]/5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D8C3A5]/10 text-[#D8C3A5] border border-[#D8C3A5]/20">
                      <CheckCircle size={16} />
                    </div>
                    <span className="text-[10px] font-mono text-[#617A55]" style={{ fontFamily: soria }}>
                      {cert.issuer}
                    </span>
                  </div>

                  <h4
                    className="text-sm font-bold text-[#F5F1EA] group-hover:text-[#D8C3A5] transition-colors"
                    style={{ fontFamily: soria }}
                  >
                    {cert.title}
                  </h4>

                  <p className="mt-2 text-[11px] font-mono text-[#D8C3A5]/70" style={{ fontFamily: soria }}>
                    {cert.category}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary bar */}
      <div className="mt-6 flex items-center justify-between rounded-xl border border-[#617A55]/15 bg-[#617A55]/5 px-5 py-3">
        <p className="text-[11px] text-[#B8C9B2]" style={{ fontFamily: soria }}>
          Showing <span className="font-bold text-[#D8C3A5]">{filtered.length}</span> of{" "}
          <span className="font-bold text-[#F5F1EA]">{certifications.length}</span> certifications
        </p>
        <div className="flex items-center gap-1">
          {tabs.filter((t) => t.name !== "All").map((tab) => (
            <div
              key={tab.name}
              className="flex items-center gap-1"
              style={{ fontFamily: soria }}
            >
              <div
                className="h-1.5 rounded-full"
                style={{
                  width: `${Math.max(tab.count * 8, 8)}px`,
                  background: "#D8C3A5",
                }}
              />
              <span className="text-[9px] text-[#617A55]">{tab.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Achievements() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const [selectedHackathon, setSelectedHackathon] = useState<(typeof hackathons)[0] | null>(null);

  return (
    <section
      id="achievements"
      className="relative overflow-hidden bg-[#1E3A2F] px-6 py-25 md:px-10 lg:px-16"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_40%,rgba(216,195,165,0.06),transparent_50%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_70%,rgba(96,122,85,0.1),transparent_50%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center lg:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8C3A5]" style={{ fontFamily: soria }}>
            Achievements & Recognition
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1EA] sm:text-4xl md:text-5xl" style={{ fontFamily: soria }}>
            Certifications & Hackathons
          </h2>
        </motion.div>

        {/* Hackathons — starfield backdrop with glass cards */}
        <div className="relative mb-10 overflow-hidden rounded-[30px] border border-[#D8C3A5]/10 px-6 py-14 sm:px-10">
          {/* Cosmic backdrop */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: "radial-gradient(ellipse at bottom, #24413a 0%, #0d1a15 100%)",
            }}
          />
          <StarField />

          <h3
            className="relative z-10 mb-10 flex items-center gap-2 text-xl font-bold text-[#F5F1EA]"
            style={{ fontFamily: soria }}
          >
            <Trophy className="text-[#D8C3A5]" size={22} />
            <span>Hackathons & Competitions</span>
          </h3>

          <div className="relative z-10 flex flex-wrap justify-center gap-8">
            {hackathons.map((h, index) => (
              <HackathonCard
                key={h.title}
                hackathon={h}
                index={index}
                onClick={() => setSelectedHackathon(h)}
              />
            ))}
          </div>
        </div>

        {/* Certifications — Filterable by Issuer */}
        <div>
          <h3 className="text-xl font-bold text-[#F5F1EA] flex items-center gap-2 mb-1" style={{ fontFamily: soria }}>
            <Award className="text-[#D8C3A5]" size={22} />
            <span>Verified Certifications</span>
          </h3>

          <CertificationsFiltered certifications={certifications} />
        </div>
      </div>

      {/* Detail Modal */}
      <HackathonModal
        hackathon={selectedHackathon}
        onClose={() => setSelectedHackathon(null)}
      />
    </section>
  );
}