"use client";

import { ArrowUp, Mail, Heart, Sparkles, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-[#617A55]/30 bg-[#1E3A2F] pt-10 pb-10 px-6 overflow-hidden"
    style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}>
      {/* Top glowing gradient border line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D8C3A5]/60 to-transparent" />

      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#617A55]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl space-y-12">
        {/* Top Callout Box */}
        <div className="rounded-3xl border border-[#D8C3A5]/25 bg-gradient-to-r from-[#D8C3A5]/10 via-[#617A55]/15 to-transparent p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#D8C3A5]/10 border border-[#D8C3A5]/25 px-3.5 py-1 text-xs font-semibold text-[#D8C3A5]">
              <Sparkles size={13} className="animate-pulse" />
              <span>Let's Build Something Remarkable</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F1EA] tracking-tight">
              Ready to collaborate on your next project?
            </h3>
            <p className="text-sm sm:text-base text-[#B8C9B2] max-w-xl">
              I am open to full-time engineering roles, high-impact freelance builds, and technical consultations.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#D8C3A5] px-7 py-3.5 text-sm font-semibold text-[#1E3A2F] shadow-lg shadow-[#D8C3A5]/30 hover:bg-[#E8DCC8] hover:shadow-[#D8C3A5]/40 transition-all active:scale-95 shrink-0"
          >
            <Send size={16} />
            <span>Get In Touch</span>
          </a>
        </div>

        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-4">
          {/* Brand & Monogram */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D8C3A5] text-[#1E3A2F] font-mono font-bold text-base shadow-lg shadow-[#D8C3A5]/30">
              PP
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#F5F1EA] tracking-tight">
                Premkumar Patil
              </h4>
              <p className="text-sm text-[#A8BFA0] font-medium">
                Full Stack Developer & AI Engineer
              </p>
            </div>
          </div>

          {/* Quick Navigation Links with Larger Font */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm sm:text-base font-semibold underline-offset-8 text-[#B8C9B2]">
            <a href="#about" className="hover:text-[#D8C3A5] transition-colors">About</a>
            <a href="#tech-stack" className="hover:text-[#D8C3A5] transition-colors">Tech Stack</a>
            <a href="#projects" className="hover:text-[#D8C3A5] transition-colors">Projects</a>
            <a href="#experience" className="hover:text-[#D8C3A5] transition-colors">Experience</a>
            <a href="#roadmap" className="hover:text-[#D8C3A5] transition-colors">Roadmap</a>
            <a href="#achievements" className="hover:text-[#D8C3A5] transition-colors">Achievements</a>
            <a href="#contact" className="hover:text-[#D8C3A5] transition-colors">Contact</a>
          </nav>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/premkumarpatil-1304"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55] bg-[#617A55]/15 text-[#D8C3A5] hover:border-[#D8C3A5] hover:bg-[#D8C3A5]/10 hover:scale-110 transition shadow-sm"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/premkumarpatil1304/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55] bg-[#617A55]/15 text-[#D8C3A5] hover:border-[#D8C3A5] hover:bg-[#D8C3A5]/10 hover:scale-110 transition shadow-sm"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="mailto:13premkp@gmail.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55] bg-[#617A55]/15 text-[#D8C3A5] hover:border-[#D8C3A5] hover:bg-[#D8C3A5]/10 hover:scale-110 transition shadow-sm"
              >
                <Mail size={18} />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8C3A5] text-[#1E3A2F] shadow-lg shadow-[#D8C3A5]/30 hover:bg-[#E8DCC8] hover:scale-110 transition active:scale-95"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="border-t border-[#617A55]/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#A8BFA0] font-medium">
          <p>© {new Date().getFullYear()} Premkumar Patil. All rights reserved.</p>

          {/* <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart size={14} className="text-[#D8C3A5] fill-[#D8C3A5] animate-pulse" />
            <span>using Next.js 16 & Tailwind CSS</span>
          </p> */}
        </div>
      </div>
    </footer>
  );
}
