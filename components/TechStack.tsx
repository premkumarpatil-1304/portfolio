"use client";

import {
  motion,
  useInView,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from "react";

import type { IconType } from "react-icons";

import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiTailwindcss,
  SiBootstrap,
  SiSpringboot,
  SiFastapi,
  SiSocketdotio,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiLinux,
  SiGit,
  SiGithub,
  SiFigma,
  SiJsonwebtokens,
} from "react-icons/si";

import {
  FaJava,
  FaAws,
  FaCss3Alt,
} from "react-icons/fa6";

import {
  VscVscode,
} from "react-icons/vsc";


import { SiNodedotjs } from "react-icons/si";
import {
  ExternalLink,
  ChevronRight,
  Star,
  X,
  Code2,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════ */
/*  BRAND COLOR MAP — CHANGED TO FOREST GREEN / MOSS GREEN / CHAMPAGNE GOLD */
/* ═══════════════════════════════════════════════════════════════════════ */

const BRANDS: Record<string, BrandColors> = {
  React: {
    primary: "#D8C3A5",
    glow: "rgba(216,195,165,0.3)",
    border: "rgba(216,195,165,0.45)",
    bg: "rgba(216,195,165,0.06)",
    text: "#D8C3A5",
  },
  JavaScript: {
    primary: "#D8C3A5",
    glow: "rgba(216,195,165,0.3)",
    border: "rgba(216,195,165,0.45)",
    bg: "rgba(216,195,165,0.06)",
    text: "#D8C3A5",
  },
  TypeScript: {
    primary: "#B8C9B2",
    glow: "rgba(184,201,178,0.3)",
    border: "rgba(184,201,178,0.45)",
    bg: "rgba(184,201,178,0.06)",
    text: "#B8C9B2",
  },
  Java: {
    primary: "#D8C3A5",
    glow: "rgba(216,195,165,0.3)",
    border: "rgba(216,195,165,0.45)",
    bg: "rgba(216,195,165,0.06)",
    text: "#D8C3A5",
  },
  Python: {
    primary: "#B8C9B2",
    glow: "rgba(184,201,178,0.3)",
    border: "rgba(184,201,178,0.45)",
    bg: "rgba(184,201,178,0.06)",
    text: "#B8C9B2",
  },
  HTML5: {
    primary: "#D8C3A5",
    glow: "rgba(216,195,165,0.3)",
    border: "rgba(216,195,165,0.45)",
    bg: "rgba(216,195,165,0.06)",
    text: "#D8C3A5",
  },
  CSS3: {
    primary: "#B8C9B2",
    glow: "rgba(184,201,178,0.3)",
    border: "rgba(184,201,178,0.45)",
    bg: "rgba(184,201,178,0.06)",
    text: "#B8C9B2",
  },
  "Tailwind CSS": {
    primary: "#D8C3A5",
    glow: "rgba(216,195,165,0.3)",
    border: "rgba(216,195,165,0.45)",
    bg: "rgba(216,195,165,0.06)",
    text: "#D8C3A5",
  },
  Bootstrap: {
    primary: "#B8C9B2",
    glow: "rgba(184,201,178,0.3)",
    border: "rgba(184,201,178,0.45)",
    bg: "rgba(184,201,178,0.06)",
    text: "#B8C9B2",
  },
  "Spring Boot": {
    primary: "#D8C3A5",
    glow: "rgba(216,195,165,0.3)",
    border: "rgba(216,195,165,0.45)",
    bg: "rgba(216,195,165,0.06)",
    text: "#D8C3A5",
  },
  FastAPI: {
    primary: "#B8C9B2",
    glow: "rgba(184,201,178,0.3)",
    border: "rgba(184,201,178,0.45)",
    bg: "rgba(184,201,178,0.06)",
    text: "#B8C9B2",
  },
  "REST API": {
    primary: "#D8C3A5",
    glow: "rgba(216,195,165,0.3)",
    border: "rgba(216,195,165,0.45)",
    bg: "rgba(216,195,165,0.06)",
    text: "#D8C3A5",
  },
  JWT: {
    primary: "#B8C9B2",
    glow: "rgba(184,201,178,0.3)",
    border: "rgba(184,201,178,0.45)",
    bg: "rgba(184,201,178,0.06)",
    text: "#B8C9B2",
  },
  "Socket.IO": {
    primary: "#D8C3A5",
    glow: "rgba(216,195,165,0.3)",
    border: "rgba(216,195,165,0.45)",
    bg: "rgba(216,195,165,0.06)",
    text: "#D8C3A5",
  },
  MongoDB: {
    primary: "#B8C9B2",
    glow: "rgba(184,201,178,0.3)",
    border: "rgba(184,201,178,0.45)",
    bg: "rgba(184,201,178,0.06)",
    text: "#B8C9B2",
  },
  MySQL: {
    primary: "#D8C3A5",
    glow: "rgba(216,195,165,0.3)",
    border: "rgba(216,195,165,0.45)",
    bg: "rgba(216,195,165,0.06)",
    text: "#D8C3A5",
  },
  Docker: {
    primary: "#B8C9B2",
    glow: "rgba(184,201,178,0.3)",
    border: "rgba(184,201,178,0.45)",
    bg: "rgba(184,201,178,0.06)",
    text: "#B8C9B2",
  },
  Linux: {
    primary: "#D8C3A5",
    glow: "rgba(216,195,165,0.3)",
    border: "rgba(216,195,165,0.45)",
    bg: "rgba(216,195,165,0.06)",
    text: "#D8C3A5",
  },
  AWS: {
    primary: "#B8C9B2",
    glow: "rgba(184,201,178,0.3)",
    border: "rgba(184,201,178,0.45)",
    bg: "rgba(184,201,178,0.06)",
    text: "#B8C9B2",
  },
  Git: {
    primary: "#D8C3A5",
    glow: "rgba(216,195,165,0.3)",
    border: "rgba(216,195,165,0.45)",
    bg: "rgba(216,195,165,0.06)",
    text: "#D8C3A5",
  },
  GitHub: {
    primary: "#B8C9B2",
    glow: "rgba(184,201,178,0.3)",
    border: "rgba(184,201,178,0.45)",
    bg: "rgba(184,201,178,0.06)",
    text: "#B8C9B2",
  },
  Figma: {
    primary: "#D8C3A5",
    glow: "rgba(216,195,165,0.3)",
    border: "rgba(216,195,165,0.45)",
    bg: "rgba(216,195,165,0.06)",
    text: "#D8C3A5",
  },
  "VS Code": {
    primary: "#B8C9B2",
    glow: "rgba(184,201,178,0.3)",
    border: "rgba(184,201,178,0.45)",
    bg: "rgba(184,201,178,0.06)",
    text: "#B8C9B2",
  },
};

/* ═══════════════════════════════════════════════════════════════════════ */
/*  ICON MAP                                                             */
/* ═══════════════════════════════════════════════════════════════════════ */

const TECH_ICONS: Record<string, IconType> = {
  Java: FaJava,
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  HTML: SiHtml5,
  CSS: FaCss3Alt,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  "Spring Boot": SiSpringboot,
  FastAPI: SiFastapi,
  "Socket.IO": SiSocketdotio,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Docker: SiDocker,
  Linux: SiLinux,
  AWS: FaAws,
  Git: SiGit,
  GitHub: SiGithub,
  Figma: SiFigma,
  "VS Code": VscVscode,
  JWT: SiJsonwebtokens,
};

/* ═══════════════════════════════════════════════════════════════════════ */
/*  SKILL DATA                                                           */
/* ═══════════════════════════════════════════════════════════════════════ */

const SKILLS: Skill[] = [
  {
    name: "Java",
    category: "Programming",
    categoryId: "programming",
    level: "Advanced",
    projects: 12,
    description:
      "Core OOP language with enterprise-grade ecosystem including Spring, Hibernate, and JVM optimization.",
    achievements: [
      "Built scalable microservices architecture",
      "Implemented event-driven systems with Kafka",
      "Optimized JVM performance by 40%",
    ],
    github: "#",
  },
  {
    name: "Python",
    category: "Programming",
    categoryId: "programming",
    level: "Advanced",
    projects: 8,
    description:
      "Versatile language for APIs, data processing, automation, and machine learning pipelines.",
    achievements: [
      "Developed AI-powered data pipelines",
      "Automated CI/CD workflows",
      "Built real-time analytics dashboard",
    ],
    github: "#",
  },
  {
    name: "JavaScript",
    category: "Programming",
    categoryId: "programming",
    level: "Advanced",
    projects: 15,
    description:
      "Core web language with ES6+ features, async patterns, and modern tooling ecosystem.",
    achievements: [
      "Built 15+ full-stack applications",
      "Implemented real-time collaboration features",
      "Created custom npm packages",
    ],
    github: "#",
  },
  {
    name: "TypeScript",
    category: "Programming",
    categoryId: "programming",
    level: "Intermediate",
    projects: 5,
    description:
      "Type-safe JavaScript enabling scalable, maintainable applications with compile-time checks.",
    achievements: [
      "Migrated legacy JS to TypeScript",
      "Reduced runtime errors by 70%",
      "Built type-safe API clients",
    ],
    github: "#",
  },
  {
    name: "React",
    category: "Frontend",
    categoryId: "frontend",
    level: "Advanced",
    projects: 6,
    description:
      "Component-based UI library with hooks, context, and modern state management patterns.",
    achievements: [
      "Built complex dashboard interfaces",
      "Implemented virtual scrolling",
      "Optimized bundle size by 60%",
    ],
    github: "#",
  },
  {
    name: "HTML5",
    category: "Frontend",
    categoryId: "frontend",
    level: "Advanced",
    projects: 15,
    description:
      "Semantic markup with accessibility best practices, ARIA attributes, and progressive enhancement.",
    achievements: [
      "Achieved WCAG AA compliance",
      "Built responsive email templates",
      "Created semantic component libraries",
    ],
  },
  {
    name: "CSS3",
    category: "Frontend",
    categoryId: "frontend",
    level: "Advanced",
    projects: 15,
    description:
      "Modern CSS with custom properties, grid, flexbox, animations, and container queries.",
    achievements: [
      "Built design system from scratch",
      "Implemented complex animation systems",
      "Created CSS-only interactive components",
    ],
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    categoryId: "frontend",
    level: "Advanced",
    projects: 8,
    description:
      "Utility-first CSS framework enabling rapid UI development with consistent design tokens.",
    achievements: [
      "Built 8 production-ready UIs",
      "Created custom Tailwind plugins",
      "Reduced CSS bundle by 80%",
    ],
    github: "#",
  },
  {
    name: "Bootstrap",
    category: "Frontend",
    categoryId: "frontend",
    level: "Intermediate",
    projects: 4,
    description:
      "Responsive component library with grid system, utilities, and customizable theming.",
    achievements: [
      "Built responsive admin dashboards",
      "Customized Bootstrap themes",
      "Implemented accessible form components",
    ],
  },
  {
    name: "Spring Boot",
    category: "Backend",
    categoryId: "backend",
    level: "Intermediate",
    projects: 3,
    description:
      "Enterprise Java framework for building production-ready REST APIs with auto-configuration.",
    achievements: [
      "Built microservices with Spring Cloud",
      "Implemented JWT authentication flows",
      "Integrated with message brokers",
    ],
    github: "#",
  },
  {
    name: "FastAPI",
    category: "Backend",
    categoryId: "backend",
    level: "Advanced",
    projects: 4,
    description:
      "Async Python API framework with automatic OpenAPI docs, validation, and high performance.",
    achievements: [
      "Built high-throughput API services",
      "Implemented WebSocket real-time features",
      "Auto-generated API documentation",
    ],
    github: "#",
  },
  {
    name: "REST API",
    category: "Backend",
    categoryId: "backend",
    level: "Advanced",
    projects: 8,
    description:
      "RESTful service design with proper HTTP semantics, pagination, filtering, and versioning.",
    achievements: [
      "Designed 8+ production APIs",
      "Implemented rate limiting and caching",
      "Built API gateways with load balancing",
    ],
  },
  {
    name: "JWT",
    category: "Backend",
    categoryId: "backend",
    level: "Intermediate",
    projects: 5,
    description:
      "Token-based authentication with refresh tokens, role-based access control, and secure storage.",
    achievements: [
      "Implemented OAuth 2.0 flows",
      "Built RBAC permission systems",
      "Secured APIs with token rotation",
    ],
  },
  {
    name: "Socket.IO",
    category: "Backend",
    categoryId: "backend",
    level: "Intermediate",
    projects: 2,
    description:
      "Real-time bidirectional event-based communication for live features and collaborative apps.",
    achievements: [
      "Built real-time chat application",
      "Implemented live notification system",
      "Created collaborative editing features",
    ],
    github: "#",
  },
  {
    name: "MongoDB",
    category: "Database",
    categoryId: "database",
    level: "Advanced",
    projects: 6,
    description:
      "NoSQL document database with aggregation pipelines, indexing, and horizontal scaling.",
    achievements: [
      "Designed denormalized data models",
      "Built full-text search indexes",
      "Implemented change streams",
    ],
    github: "#",
  },
  {
    name: "MySQL",
    category: "Database",
    categoryId: "database",
    level: "Intermediate",
    projects: 4,
    description:
      "Relational database with complex queries, indexing strategies, and transaction management.",
    achievements: [
      "Optimized slow queries by 5x",
      "Designed normalized schemas",
      "Implemented replication setups",
    ],
  },
  {
    name: "Docker",
    category: "DevOps",
    categoryId: "devops",
    level: "Intermediate",
    projects: 3,
    description:
      "Containerization for consistent development, testing, and production environments.",
    achievements: [
      "Containerized 3 production apps",
      "Optimized Docker images for size",
      "Built multi-stage build pipelines",
    ],
    github: "#",
  },
  {
    name: "Linux",
    category: "DevOps",
    categoryId: "devops",
    level: "Intermediate",
    projects: 5,
    description:
      "Command-line proficiency with system administration, scripting, and server management.",
    achievements: [
      "Managed production Linux servers",
      "Wrote automation bash scripts",
      "Configured firewall and security rules",
    ],
  },
  {
    name: "AWS",
    category: "DevOps",
    categoryId: "devops",
    level: "Beginner",
    projects: 2,
    description:
      "Cloud infrastructure with EC2, S3, Lambda, and infrastructure-as-code deployment.",
    achievements: [
      "Deployed apps on EC2 instances",
      "Set up S3 static hosting",
      "Configured CloudWatch monitoring",
    ],
  },
  {
    name: "Git",
    category: "DevOps",
    categoryId: "devops",
    level: "Advanced",
    projects: 20,
    description:
      "Version control with branching strategies, rebasing, cherry-picking, and conflict resolution.",
    achievements: [
      "Managed 20+ project repositories",
      "Implemented Git Flow workflow",
      "Resolved complex merge conflicts",
    ],
  },
  {
    name: "GitHub",
    category: "DevOps",
    categoryId: "devops",
    level: "Advanced",
    projects: 20,
    description:
      "Repository management with Actions CI/CD, pull requests, code reviews, and issue tracking.",
    achievements: [
      "Built GitHub Actions pipelines",
      "Automated deployment workflows",
      "Managed team collaboration flows",
    ],
  },
  {
    name: "Figma",
    category: "Design",
    categoryId: "design",
    level: "Intermediate",
    projects: 4,
    description:
      "UI/UX design and prototyping with component libraries, auto-layout, and design systems.",
    achievements: [
      "Created component libraries",
      "Designed responsive layouts",
      "Built interactive prototypes",
    ],
  },
  {
    name: "VS Code",
    category: "Design",
    categoryId: "design",
    level: "Advanced",
    projects: 20,
    description:
      "Primary development environment with extensions, snippets, and integrated debugging.",
    achievements: [
      "Customized 20+ workflow extensions",
      "Built VS Code snippets library",
      "Configured multi-root workspaces",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════ */
/*  CONNECTION MAP                                                       */
/* ═══════════════════════════════════════════════════════════════════════ */

const CONNECTIONS: [string, string][] = [
  ["Java", "Spring Boot"],
  ["React", "JavaScript"],
  ["React", "TypeScript"],
  ["FastAPI", "Python"],
  ["Docker", "AWS"],
  ["Git", "GitHub"],
  ["MongoDB", "FastAPI"],
  ["Spring Boot", "MySQL"],
  ["Tailwind CSS", "React"],
  ["JavaScript", "TypeScript"],
  ["REST API", "Spring Boot"],
  ["REST API", "FastAPI"],
  ["JWT", "Spring Boot"],
  ["Socket.IO", "React"],
  ["CSS3", "Tailwind CSS"],
  ["Docker", "Linux"],
  ["GitHub", "Docker"],
];

/* ═══════════════════════════════════════════════════════════════════════ */
/*  CATEGORY ORDER & CONFIG                                              */
/* ═══════════════════════════════════════════════════════════════════════ */

const CATEGORY_ORDER = [
  { id: "programming", label: "Programming" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "devops", label: "DevOps" },
  { id: "design", label: "Design" },
];

const CATEGORY_DOTS: Record<string, string> = {
  programming: "#D8C3A5",
  frontend: "#B8C9B2",
  backend: "#D8C3A5",
  database: "#B8C9B2",
  devops: "#D8C3A5",
  design: "#B8C9B2",
};

/* ═══════════════════════════════════════════════════════════════════════ */
/*  HEXAGON COMPONENT                                                    */
/* ═══════════════════════════════════════════════════════════════════════ */

const hexContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.15 + i * 0.04,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

interface HexagonProps {
  skill: Skill;
  index: number;
  isHovered: boolean;
  isNeighbor: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  reducedMotion: boolean;
}

const Hexagon = memo(function Hexagon({
  skill,
  index,
  isHovered,
  isNeighbor,
  onHover,
  onLeave,
  onClick,
  reducedMotion,
}: HexagonProps) {
  const Icon = TECH_ICONS[skill.name] || SiNodedotjs;
  const brand = BRANDS[skill.name];
  const isActive = isHovered || isNeighbor;

  return (
    <motion.div
      variants={hexContainerVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative"
      style={{
        width: "clamp(88px, 10vw, 115px)",
        height: "clamp(100px, 11.5vw, 132px)",
      }}
    >
      {/* SVG hexagon shape with gradient border */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 115"
        preserveAspectRatio="xMidYMid meet"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          delay: 0.15 + index * 0.04,
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <defs>
          <linearGradient
            id={`border-grad-${skill.name}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={isActive ? brand.primary : `${brand.primary}50`}
            />
            <stop
              offset="100%"
              stopColor={isActive ? `${brand.primary}aa` : `${brand.primary}20`}
            />
          </linearGradient>
        </defs>
        <polygon
          points="50,2 96,27 96,88 50,113 4,88 4,27"
          fill={brand.bg}
          stroke={`url(#border-grad-${skill.name})`}
          strokeWidth={isActive ? 2 : 1}
          style={{
            filter: isActive
              ? `drop-shadow(0 0 8px ${brand.glow})`
              : "none",
            transition: "filter 0.2s ease, stroke-width 0.2s ease",
          }}
        />
      </motion.svg>

      {/* Interactive click area */}
      <motion.button
        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer outline-none z-10"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: isActive
            ? `radial-gradient(ellipse at center, ${brand.glow}, transparent 70%)`
            : "transparent",
          transition: "background 0.25s ease",
        }}
        whileHover={
          reducedMotion
            ? {}
            : {
                scale: 1.12,
                y: -6,
                rotate: 2,
                transition: { duration: 0.2, ease: "easeOut" },
              }
        }
        whileTap={
          reducedMotion
            ? {}
            : {
                scale: 0.92,
                transition: { duration: 0.1 },
              }
        }
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
        aria-label={`${skill.name} - ${skill.category}`}
        role="button"
      >
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -3, 0],
                  transition: {
                    duration: 3 + (index % 5) * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          className="flex flex-col items-center gap-1"
        >
          <motion.div
            animate={
              reducedMotion
                ? {}
                : isHovered
                ? { rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }
                : {}
            }
          >
            <Icon
              size={28}
              className="transition-colors duration-200"
              style={{
                color: isActive ? brand.text : `${brand.text}88`,
              }}
            />
          </motion.div>
          <span
            className="text-[9px] md:text-[10px] font-semibold text-center leading-tight tracking-wide max-w-[68px]"
            style={{
              fontFamily: "'Soria', 'Century Gothic', sans-serif",
              color: isActive ? brand.text : "rgba(245,241,234,0.7)",
              transition: "color 0.2s ease",
            }}
          >
            {skill.name}
          </span>
        </motion.div>
      </motion.button>
    </motion.div>
  );
});

/* ═══════════════════════════════════════════════════════════════════════ */
/*  DETAIL PANEL                                                         */
/* ═══════════════════════════════════════════════════════════════════════ */

interface DetailPanelProps {
  skill: Skill;
  onClose: () => void;
  reducedMotion: boolean;
}

function DetailPanel({ skill, onClose, reducedMotion }: DetailPanelProps) {
  const Icon = TECH_ICONS[skill.name] || SiNodedotjs;
  const brand = BRANDS[skill.name];

  // Calculate proficiency percentage
  const levelPercent = useMemo(() => {
    const map: Record<string, number> = {
      Beginner: 35,
      Intermediate: 60,
      Advanced: 85,
      Expert: 95,
    };
    return map[skill.level] || 50;
  }, [skill.level]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${skill.name} details`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0d1a15]/80 backdrop-blur-md" />

      {/* Panel */}
      <motion.div
        initial={
          reducedMotion
            ? { opacity: 1 }
            : { opacity: 0, y: 40, scale: 0.95 }
        }
        animate={
          reducedMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        exit={
          reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 30, scale: 0.95 }
        }
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(30,58,47,0.95) 0%, rgba(13,26,21,0.98) 100%)",
          border: `1px solid ${brand.border}`,
          boxShadow: `0 0 40px ${brand.glow}, 0 24px 80px rgba(0,0,0,0.5)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-5">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl shrink-0"
            style={{
              background: brand.bg,
              border: `1px solid ${brand.border}`,
              boxShadow: `0 0 20px ${brand.glow}`,
            }}
          >
            <Icon size={30} style={{ color: brand.text }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-xl font-bold tracking-tight truncate"
              style={{
                fontFamily: "'Soria', 'Century Gothic', sans-serif",
                color: brand.text,
              }}
            >
              {skill.name}
            </h3>
            <p
              className="text-xs mt-0.5"
              style={{
                fontFamily: "'Soria', 'Century Gothic', sans-serif",
                color: "rgba(184,201,178,0.8)",
              }}
            >
              {skill.category}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{
              background: "rgba(184,201,178,0.1)",
              border: "1px solid rgba(184,201,178,0.15)",
            }}
            aria-label="Close panel"
          >
            <X size={16} className="text-[#B8C9B2]" />
          </motion.button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-4">
          {/* Description */}
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: "'Soria', 'Century Gothic', sans-serif",
              color: "rgba(184,201,178,0.9)",
            }}
          >
            {skill.description}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] px-3 py-1 rounded-full font-semibold"
              style={{
                fontFamily: "'Soria', 'Century Gothic', sans-serif",
                background: brand.bg,
                border: `1px solid ${brand.border}`,
                color: brand.text,
              }}
            >
              {skill.level}
            </span>
            <span
              className="text-[10px] flex items-center gap-1"
              style={{
                fontFamily: "'Soria', 'Century Gothic', sans-serif",
                color: "rgba(184,201,178,0.7)",
              }}
            >
              <Star size={10} style={{ color: brand.text }} />
              {skill.projects} projects
            </span>
          </div>

          {/* Progress indicator */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{
                  fontFamily: "'Soria', 'Century Gothic', sans-serif",
                  color: "rgba(97,122,85,0.5)",
                }}
              >
                Proficiency
              </span>
              <span
                className="text-[10px] font-bold"
                style={{
                  fontFamily: "'Soria', 'Century Gothic', sans-serif",
                  color: brand.text,
                }}
              >
                {levelPercent}%
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(97,122,85,0.15)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelPercent}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${brand.primary}, ${brand.text})`,
                  boxShadow: `0 0 8px ${brand.glow}`,
                }}
              />
            </div>
          </div>

          {/* Achievements */}
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mb-2"
              style={{
                fontFamily: "'Soria', 'Century Gothic', sans-serif",
                color: "rgba(97,122,85,0.5)",
              }}
            >
              Key Achievements
            </p>
            <ul className="space-y-1.5">
              {skill.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                  className="flex items-start gap-2"
                >
                  <ChevronRight
                    size={12}
                    className="mt-0.5 shrink-0"
                    style={{ color: brand.primary }}
                  />
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: "'Soria', 'Century Gothic', sans-serif",
                      color: "rgba(184,201,178,0.85)",
                    }}
                  >
                    {achievement}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* GitHub link */}
          {skill.github && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              className="pt-3 border-t"
              style={{ borderColor: "rgba(97,122,85,0.15)" }}
            >
              <a
                href={skill.github}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold transition-all duration-200 hover:gap-2.5"
                style={{
                  fontFamily: "'Soria', 'Century Gothic', sans-serif",
                  color: brand.text,
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={12} />
                View on GitHub
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  ANIMATED BACKGROUND LAYERS                                           */
/* ═══════════════════════════════════════════════════════════════════════ */

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient — recolored */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, rgba(216,195,165,0.06), transparent 50%)",
            "radial-gradient(ellipse at 80% 20%, rgba(97,122,85,0.05), transparent 50%)",
            "radial-gradient(ellipse at 50% 80%, rgba(216,195,165,0.04), transparent 50%)",
            "radial-gradient(ellipse at 20% 50%, rgba(216,195,165,0.06), transparent 50%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />

      {/* Soft mesh — recolored */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(135deg, rgba(216,195,165,0.02) 0%, transparent 30%, rgba(97,122,85,0.02) 50%, transparent 70%, rgba(184,201,178,0.02) 100%)",
        }}
      />

      {/* Floating blurred circles — recolored */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full blur-[100px]"
        style={{ background: "rgba(216,195,165,0.05)" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[60%] right-[15%] w-80 h-80 rounded-full blur-[120px]"
        style={{ background: "rgba(97,122,85,0.04)" }}
        animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[30%] w-56 h-56 rounded-full blur-[90px]"
        style={{ background: "rgba(184,201,178,0.03)" }}
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid — recolored */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(184,201,178,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,201,178,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  SVG CONNECTION LINES                                                  */
/* ═══════════════════════════════════════════════════════════════════════ */

interface ConnectionLinesProps {
  hoveredSkill: string | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  positions: Map<string, { x: number; y: number }>;
}

function ConnectionLines({
  hoveredSkill,
  containerRef,
  positions,
}: ConnectionLinesProps) {
  const paths = useMemo(() => {
    if (!hoveredSkill) return [];
    const fromPos = positions.get(hoveredSkill);
    if (!fromPos) return [];

    return CONNECTIONS.filter(
      ([a, b]) => a === hoveredSkill || b === hoveredSkill,
    )
      .map(([a, b]) => {
        const other = a === hoveredSkill ? b : a;
        const toPos = positions.get(other);
        if (!toPos) return null;
        return {
          from: fromPos,
          to: toPos,
          tech: other,
        };
      })
      .filter(Boolean) as {
      from: { x: number; y: number };
      to: { x: number; y: number };
      tech: string;
    }[];
  }, [hoveredSkill, positions]);

  if (paths.length === 0) return null;

  const container = containerRef.current;
  if (!container) return null;
  const rect = container.getBoundingClientRect();

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 20 }}
    >
      <defs>
        {paths.map((p, i) => (
          <linearGradient
            key={`conn-grad-${i}`}
            id={`conn-${i}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor={BRANDS[hoveredSkill!]?.primary || "#D8C3A5"}
              stopOpacity="0.6"
            />
            <stop
              offset="100%"
              stopColor={BRANDS[p.tech]?.primary || "#D8C3A5"}
              stopOpacity="0.3"
            />
          </linearGradient>
        ))}
      </defs>
      {paths.map((p, i) => {
        const x1 = p.from.x - rect.left;
        const y1 = p.from.y - rect.top;
        const x2 = p.to.x - rect.left;
        const y2 = p.to.y - rect.top;
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - 20;

        return (
          <motion.path
            key={`conn-path-${i}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
            stroke={`url(#conn-${i})`}
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 3"
            filter={`drop-shadow(0 0 4px ${BRANDS[hoveredSkill!]?.glow || "rgba(216,195,165,0.3)"})`}
          />
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                       */
/* ═══════════════════════════════════════════════════════════════════════ */

export default function HoneycombSkills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const honeycombRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const reducedMotion = useReducedMotion();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(new Map());

  // Track hexagon positions for SVG connections
  useEffect(() => {
    if (!honeycombRef.current) return;
    const container = honeycombRef.current;

    const updatePositions = () => {
      const newPositions = new Map<string, { x: number; y: number }>();
      SKILLS.forEach((skill) => {
        const el = container.querySelector(
          `[data-skill="${skill.name}"]`,
        ) as HTMLElement | null;
        if (el) {
          const rect = el.getBoundingClientRect();
          newPositions.set(skill.name, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }
      });
      setPositions(newPositions);
    };

    const observer = new MutationObserver(updatePositions);
    observer.observe(container, { childList: true, subtree: true });
    updatePositions();

    const timer = setTimeout(updatePositions, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isInView]);

  const handleHover = useCallback((name: string | null) => setHoveredSkill(name), []);
  const handleClick = useCallback((skill: Skill) => setSelectedSkill(skill), []);
  const handleClose = useCallback(() => setSelectedSkill(null), []);

  // Group skills by category for rendering
  const groupedSkills = useMemo(() => {
    const groups: Record<string, Skill[]> = {};
    CATEGORY_ORDER.forEach((cat) => {
      groups[cat.id] = SKILLS.filter((s) => s.categoryId === cat.id);
    });
    return groups;
  }, []);

  // Ripple state for click effect
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; brand: BrandColors }[]
  >([]);

  const handleRipple = useCallback(
    (skill: Skill, e: React.MouseEvent) => {
      if (reducedMotion) return;
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [
        ...prev,
        { id, x, y, brand: BRANDS[skill.name] },
      ]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    },
    [reducedMotion],
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background: "linear-gradient(180deg, #0d1a15 0%, #1E3A2F 50%, #0d1a15 100%)",
      }}
    >
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 text-center"
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.35em]"
            style={{
              fontFamily: "'Soria', 'Century Gothic', sans-serif",
              background: "linear-gradient(90deg, #D8C3A5, #B8C9B2, #617A55)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Technical Expertise
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              fontFamily: "'Soria', 'Century Gothic', sans-serif",
              color: "#F5F1EA",
            }}
          >
            Skills Universe
          </h2>
          <p
            className="mt-4 max-w-lg mx-auto text-sm leading-relaxed"
            style={{
              fontFamily: "'Soria', 'Century Gothic', sans-serif",
              color: "rgba(184,201,178,0.7)",
            }}
          >
            Every hexagon is a technology I work with. Hover to see connections,
            click to explore depth.
          </p>
        </motion.div>

        {/* Honeycomb Grid */}
        <div
          ref={honeycombRef}
          className="relative"
          style={{ minHeight: "600px" }}
        >
          <ConnectionLines
            hoveredSkill={hoveredSkill}
            containerRef={honeycombRef}
            positions={positions}
          />

          {/* Category rows */}
          {CATEGORY_ORDER.map((cat, catIndex) => (
            <div key={cat.id} className="mb-8 last:mb-0">
              {/* Category label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: catIndex * 0.15, duration: 0.4 }}
                className="flex items-center gap-2 mb-4"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: CATEGORY_DOTS[cat.id] }}
                />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "'Soria', 'Century Gothic', sans-serif",
                    color: "rgba(184,201,178,0.4)",
                  }}
                >
                  {cat.label}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(97,122,85,0.08)" }}
                />
                <span
                  className="text-[10px]"
                  style={{
                    fontFamily: "'Soria', 'Century Gothic', sans-serif",
                    color: "rgba(184,201,178,0.25)",
                  }}
                >
                  {groupedSkills[cat.id].length}
                </span>
              </motion.div>

              {/* Hexagons row */}
              <div
                className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
                style={{
                  marginLeft: catIndex % 2 === 1 ? "clamp(20px, 4vw, 50px)" : 0,
                }}
              >
                {groupedSkills[cat.id].map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    data-skill={skill.name}
                    className="relative"
                  >
                    {/* Ripple effect */}
                    {ripples
                      .filter((r) => r.brand === BRANDS[skill.name])
                      .map((ripple) => (
                        <motion.div
                          key={ripple.id}
                          initial={{ scale: 0, opacity: 0.6 }}
                          animate={{ scale: 3, opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full pointer-events-none z-20"
                          style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: 40,
                            height: 40,
                            marginLeft: -20,
                            marginTop: -20,
                            background: `radial-gradient(circle, ${ripple.brand.glow}, transparent 70%)`,
                          }}
                        />
                      ))}

                    <Hexagon
                      skill={skill}
                      index={
                        CATEGORY_ORDER.findIndex((c) => c.id === cat.id) * 10 +
                        skillIndex
                      }
                      isHovered={hoveredSkill === skill.name}
                      isNeighbor={
                        hoveredSkill
                          ? CONNECTIONS.some(
                              ([a, b]) =>
                                (a === hoveredSkill && b === skill.name) ||
                                (b === hoveredSkill && a === skill.name),
                            )
                          : false
                      }
                      onHover={() => handleHover(skill.name)}
                      onLeave={() => handleHover(null)}
                      onClick={(e: React.MouseEvent) => {
                        handleRipple(skill, e);
                        handleClick(skill);
                      }}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Category Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 2, duration: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-5 md:gap-8"
        >
          {CATEGORY_ORDER.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: CATEGORY_DOTS[cat.id],
                  boxShadow: `0 0 8px ${CATEGORY_DOTS[cat.id]}40`,
                }}
              />
              <span
                className="text-[10px] tracking-wide"
                style={{
                  fontFamily: "'Soria', 'Century Gothic', sans-serif",
                  color: "rgba(184,201,178,0.5)",
                }}
              >
                {cat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 2.2, duration: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-12"
        >
          {[
            { value: SKILLS.length, label: "Technologies" },
            { value: CATEGORY_ORDER.length, label: "Domains" },
            {
              value: SKILLS.reduce((a, s) => a + s.projects, 0),
              label: "Projects",
            },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-6 md:gap-12">
              {i > 0 && (
                <div
                  className="h-8 w-px"
                  style={{ background: "rgba(97,122,85,0.15)" }}
                />
              )}
              <div className="text-center">
                <p
                  className="text-2xl md:text-3xl font-bold"
                  style={{
                    fontFamily: "'Soria', 'Century Gothic', sans-serif",
                    background:
                      "linear-gradient(135deg, #D8C3A5, #B8C9B2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[10px] tracking-wider uppercase mt-1"
                  style={{
                    fontFamily: "'Soria', 'Century Gothic', sans-serif",
                    color: "rgba(184,201,178,0.4)",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedSkill && (
          <DetailPanel
            skill={selectedSkill}
            onClose={handleClose}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
