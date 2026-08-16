"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, FileDown, Code2, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const skillsToType = [
  "Full Stack Developer",
  "React & Next.js Architect",
  "FastAPI & REST API Specialist",
  "Spring Boot and Spring Framework",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
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

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [skillIndex, setSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = skillsToType[skillIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentFullText.substring(0, typedText.length + 1));
        if (typedText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypedText(currentFullText.substring(0, typedText.length - 1));
        if (typedText === "") {
          setIsDeleting(false);
          setSkillIndex((prev) => (prev + 1) % skillsToType.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, skillIndex, isDeleting]);

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#1E3A2F] px-6 pt-36 pb-20 md:px-10 lg:px-16"
    >
      {/* Subtle ambient background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(96,122,85,0.12),transparent_55%)]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Column: Text & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left space-y-6"
          style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-[#D8C3A5]/25 bg-[#617A55]/20 px-4 py-1.5 text-xs font-semibold text-[#D8C3A5] backdrop-blur-md"
          >
            <Sparkles size={14} className="text-[#D8C3A5]" />
            <span>Available for Full-time Roles & Projects</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight text-[#F5F1EA] sm:text-5xl md:text-6xl xl:text-7xl leading-[1.1]"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-[#D8C3A5] to-[#E8DCC8] bg-clip-text text-transparent">
              Premkumar Patil
            </span>
          </motion.h1>

          {/* Dynamic Typing Title */}
          <motion.div
            variants={itemVariants}
            className="h-10 text-xl font-semibold text-[#A8BFA0] sm:text-2xl md:text-3xl flex items-center justify-center lg:justify-start gap-2"
          >
            <Code2 size={24} className="text-[#D8C3A5] shrink-0" />
            <span>{typedText}</span>
            <span className="w-0.5 h-6 bg-[#D8C3A5] animate-pulse ml-0.5" />
          </motion.div>

          {/* Introduction */}
          <motion.p
            variants={itemVariants}
            className="mx-auto lg:mx-0 max-w-2xl text-base leading-8 text-[#B8C9B2] md:text-lg"
          >
            Passionate Software Engineer dedicated to crafting high-performance
            full stack web applications, intelligent AI services, and intuitive
            UI experiences using React, Next.js, FastAPI, and MongoDB.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <a
              href="/resume/Zensar_resume.pdf"
              download="Premkumar_Patil_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D8C3A5] px-6 py-3.5 text-sm font-semibold text-[#1E3A2F] shadow-md shadow-[#D8C3A5]/20 transition-all duration-300 hover:bg-[#E8DCC8] hover:shadow-[#D8C3A5]/30 hover:-translate-y-0.5 active:scale-95"
            >
              <FileDown size={16} />
              <span>Download Resume</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#617A55] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#D8C3A5] backdrop-blur-md transition-all duration-300 hover:bg-[#617A55]/20 hover:border-[#D8C3A5]/50 hover:-translate-y-0.5 active:scale-95"
            >
              <span>Contact Me</span>
              <ArrowUpRight size={16} />
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <a
              href="https://github.com/premkumarpatil-1304"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55] bg-[#617A55]/15 text-[#D8C3A5] transition hover:scale-110 hover:border-[#D8C3A5] hover:bg-[#D8C3A5]/10 shadow-sm"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com/premkumarpatil"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55] bg-[#617A55]/15 text-[#D8C3A5] transition hover:scale-110 hover:border-[#D8C3A5] hover:bg-[#D8C3A5]/10 shadow-sm"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="mailto:13premkp@gmail.com"
              aria-label="Email Me"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55] bg-[#617A55]/15 text-[#D8C3A5] transition hover:scale-110 hover:border-[#D8C3A5] hover:bg-[#D8C3A5]/10 shadow-sm"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex justify-center"
          style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}
        >
          <div className="relative group w-full max-w-md">
            {/* Soft refined glow */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#D8C3A5] to-[#617A55] opacity-15 blur-2xl group-hover:opacity-20 transition duration-500" />

            <div className="relative overflow-hidden rounded-3xl border border-[#617A55]/40 bg-[#617A55]/10 p-4 shadow-xl shadow-[#1E3A2F]/50">
              <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden rounded-2xl bg-[#1E3A2F]/60">
                {/* Photo + overlay content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  {/* Background image (your standing photo) */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: "url('/prem_photo/prem')",
                    }}
                  />
                  {/* Dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A2F]/90 via-[#1E3A2F]/50 to-[#1E3A2F]/20" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center px-6">
                    {/* Avatar frame */}
                    <div className="mt-16 relative mb-6 h-80 w-60 rounded-full border border-[#D8C3A5]/40 p-1 shadow-xl shadow-black/20 overflow-hidden">
                      <div
                        className="h-full w-full rounded-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/prem_photo/prem.jpg')",
                        }}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-[#F5F1EA]">
                      Premkumar Patil
                    </h3>
                    <p className="mt-1 text-xs font-mono text-[#D8C3A5]">
                      Full Stack Software Engineer
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      <span className="rounded-full bg-[#617A55]/30 border border-[#617A55]/40 px-3 py-1 text-[11px] font-medium text-[#D8C3A5]">
                        React & Next.js
                      </span>
                      <span className="rounded-full bg-[#617A55]/30 border border-[#617A55]/40 px-3 py-1 text-[11px] font-medium text-[#D8C3A5]">
                        FastAPI & Python
                      </span>
                      <span className="rounded-full bg-[#617A55]/30 border border-[#617A55]/40 px-3 py-1 text-[11px] font-medium text-[#D8C3A5]">
                        MongoDB & MySQL
                      </span>
                    </div>

                    <div className="mt-8 mb-5 flex items-center gap-2 rounded-full bg-[#D8C3A5]/10 px-4 py-2 text-xs text-[#D8C3A5] border border-[#D8C3A5]/20">
                      <span className="h-2 w-2 rounded-full bg-[#D8C3A5] animate-ping" />
                      <span>Open for Opportunities</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
