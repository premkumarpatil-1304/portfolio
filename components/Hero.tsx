"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, FileDown, Code2, Sparkles, MapPin, Plus } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const skillsToType = [
  "Full Stack Developer",
  "React & Next.js Architect",
  "FastAPI & REST API Specialist",
  "Spring Boot and Spring Framework",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const soria = "'Soria', 'Century Gothic', sans-serif";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [skillIndex, setSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = skillsToType[skillIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentFullText.substring(0, typedText.length + 1));
        if (typedText === currentFullText) setTimeout(() => setIsDeleting(true), 1800);
      } else {
        setTypedText(currentFullText.substring(0, typedText.length - 1));
        if (typedText === "") {
          setIsDeleting(false);
          setSkillIndex((prev) => (prev + 1) % skillsToType.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timer);
  }, [typedText, skillIndex, isDeleting]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#1E3A2F] px-4 py-22 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(90vh-2rem)] max-w-[1440px] flex-col overflow-hidden rounded-[2rem] border border-[#617A55]/40 bg-[#1E3A2F] shadow-2xl shadow-[#1E3A2F]/60">
        <header className="relative z-30 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-14">
          

         

          <a href="#contact" className="rounded-full border border-[#D8C3A5]/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D8C3A5] md:hidden" style={{ fontFamily: soria }}>Contact</a>
        </header>

        <div className="relative grid flex-1 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="relative z-20 flex flex-col justify-center px-6 pb-14 pt-10 sm:px-12 lg:px-16 lg:py-16" style={{ fontFamily: soria }}>
            <div className="max-w-xl">
              <motion.div variants={itemVariants} className="mb-7 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#D8C3A5]">
                <span className="h-px w-10 bg-[#D8C3A5]" />
                <span>Digital builder · AI enthusiast</span>
              </motion.div>

              <motion.p variants={itemVariants} className="text-xl font-semibold text-[#F5F1EA] sm:text-2xl">Hi, I am</motion.p>
              <motion.h1 variants={itemVariants} className="mt-3 max-w-2xl text-5xl font-bold leading-[0.94] tracking-[-0.055em] text-[#F5F1EA] sm:text-6xl lg:text-7xl xl:text-8xl">
                Premkumar
                <span className="block text-[#D8C3A5]">Patil</span>
              </motion.h1>

              <motion.div variants={itemVariants} className="mt-6 flex min-h-8 items-center gap-3 text-base font-semibold text-[#B8C9B2] sm:text-xl">
                <Code2 size={20} className="shrink-0 text-[#D8C3A5]" />
                <span>{typedText}</span>
                <span className="h-6 w-0.5 animate-pulse bg-[#D8C3A5]" />
              </motion.div>

              <motion.p variants={itemVariants} className="mt-6 max-w-lg text-sm leading-7 text-[#B8C9B2] sm:text-base">
                I design and engineer thoughtful digital products where clean interfaces, dependable systems, and intelligent technology meet.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3">
                <a href="/resume/Zensar_resume.pdf" download="Premkumar_Patil_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#D8C3A5] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#1E3A2F] transition-transform hover:-translate-y-1 active:scale-95">
                  <FileDown size={15} /> Download resume
                </a>
                <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-[#617A55] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#D8C3A5] transition-colors hover:border-[#D8C3A5] hover:bg-[#617A55]/30">
                  View work <ArrowUpRight size={15} />
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-10 flex items-center gap-3">
                <a href="https://github.com/premkumarpatil-1304" target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55] bg-[#617A55]/20 text-[#D8C3A5] transition hover:-translate-y-1 hover:border-[#D8C3A5]"><GithubIcon size={17} /></a>
                <a href="https://linkedin.com/premkumarpatil" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55] bg-[#617A55]/20 text-[#D8C3A5] transition hover:-translate-y-1 hover:border-[#D8C3A5]"><LinkedinIcon size={17} /></a>
                <a href="mailto:13premkp@gmail.com" aria-label="Email me" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55] bg-[#617A55]/20 text-[#D8C3A5] transition hover:-translate-y-1 hover:border-[#D8C3A5]"><Mail size={17} /></a>
                <span className="ml-2 h-px w-12 bg-[#617A55]" />
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#A8BFA0]">Let’s build something useful</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="relative min-h-[520px] overflow-hidden bg-[#617A55] lg:min-h-0 lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]">
            <div className="absolute inset-0 bg-[#617A55]" />
            <div className="absolute inset-0 bg-[#1E3A2F]/25" />
            <div className="absolute inset-0 bg-cover bg-center lg:bg-[center_20%]" style={{ backgroundImage: "url('/prem_photo/prem.jpg')" }} />
            <div className="absolute inset-0 bg-[#1E3A2F]/30" />

          

            <div className="absolute bottom-7 right-5 z-10 max-w-[230px] border-l border-[#D8C3A5] pl-4 text-[#F5F1EA] lg:right-12">
              <p className="text-xs uppercase tracking-[0.18em] text-[#D8C3A5]" style={{ fontFamily: soria }}>01 / Profile</p>
              <p className="mt-2 text-sm leading-6 text-[#F5F1EA]/90" style={{ fontFamily: soria }}>Building reliable products with a human point of view.</p>
            </div>

            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 text-xs text-[#F5F1EA] lg:left-[17%]" style={{ fontFamily: soria }}><MapPin size={14} className="text-[#D8C3A5]" /> India · Working globally</div>
          </motion.div>
        </div>

        <div className="relative z-20 grid border-t border-[#617A55]/50 bg-[#1E3A2F] sm:grid-cols-3" style={{ fontFamily: soria }}>
          <div className="border-b border-[#617A55]/50 px-6 py-5 sm:border-b-0 sm:border-r sm:px-10"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D8C3A5]"><Sparkles size={14} /> What I do</p><p className="mt-2 text-xs leading-5 text-[#B8C9B2]">Full-stack products, APIs, AI services, and polished interfaces.</p></div>
          <div className="border-b border-[#617A55]/50 px-6 py-5 sm:border-b-0 sm:border-r sm:px-10"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D8C3A5]"><Plus size={14} /> Core stack</p><p className="mt-2 text-xs leading-5 text-[#B8C9B2]">React · Next.js · FastAPI · Spring Boot · MongoDB</p></div>
          <div className="px-6 py-5 sm:px-10"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D8C3A5]">Currently exploring</p><p className="mt-2 text-xs leading-5 text-[#B8C9B2]">AI engineering, scalable systems, and better product thinking.</p></div>
        </div>
      </div>
    </section>
  );
}

/* Palette note: keep Forest Green #1E3A2F as the main 60% background,
   Moss Green #617A55 as the 30% supporting panel color, and
   Champagne Gold #D8C3A5 as the 10% accent. No palette change is needed. */
      
