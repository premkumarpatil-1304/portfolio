"use client";

import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, FileText, Sparkles } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Tech Stack", href: "#tech-stack" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Achievements", href: "#achievements" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-30% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}>
      <div className="mx-auto mt-4 w-[95%] max-w-7xl">
        <div
          className={clsx(
            "flex items-center justify-between rounded-2xl px-6 py-3.5 transition-all duration-300",
            scrolled
              ? "bg-[#1E3A2F]/90 backdrop-blur-xl shadow-xl shadow-[#1E3A2F]/40 border border-[#D8C3A5]/15"
              : "bg-[#1E3A2F]/70 backdrop-blur-md border border-[#617A55]/25"
          )}
        >
          {/* Logo / Brand Name */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D8C3A5] text-[#1E3A2F] font-mono font-bold text-sm shadow-md shadow-[#D8C3A5]/25 group-hover:scale-105 transition-transform">
              PP
            </span>
            <span className="font-semibold text-sm sm:text-base text-[#F5F1EA] group-hover:text-[#D8C3A5] transition-colors">
              Premkumar Patil
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "relative rounded-full px-4 py-2 text-[15px] font-medium transition-all duration-200",
                    isActive
                      ? "text-[#D8C3A5] font-semibold"
                      : "text-[#B8C9B2] hover:text-[#D8C3A5]"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-[#D8C3A5]/12 border border-[#D8C3A5]/25 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Resume & Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55] bg-[#617A55]/15 text-[#D8C3A5] transition-all hover:scale-105 hover:bg-[#617A55]/25 hover:border-[#D8C3A5]/40 active:scale-95 shadow-sm"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-[#D8C3A5]" />
              ) : (
                <Moon size={18} className="text-[#D8C3A5]" />
              )}
            </button>

            {/* Resume Button */}
            <a
              href="/resume/Zensar_resume.pdf"
              download="Premkumar_Patil_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#D8C3A5] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#1E3A2F] shadow-md shadow-[#D8C3A5]/25 hover:bg-[#E8DCC8] hover:shadow-[#D8C3A5]/40 transition-all active:scale-95"
            >
              <FileText size={15} />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55] bg-[#617A55]/15 text-[#D8C3A5] transition hover:bg-[#617A55]/25 hover:border-[#D8C3A5]/40 lg:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={clsx(
            "overflow-hidden transition-all duration-300 lg:hidden",
            isOpen ? "max-h-[420px] opacity-100 mt-2.5" : "max-h-0 opacity-0"
          )}
        >
          <div className="rounded-2xl border border-[#617A55]/30 bg-[#1E3A2F]/95 p-5 shadow-2xl shadow-[#1E3A2F]/60 backdrop-blur-xl">
            <nav className="grid grid-cols-2 gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "rounded-xl px-4 py-3 text-sm sm:text-base font-semibold transition-all duration-200 text-center",
                    activeSection === link.href
                      ? "bg-[#D8C3A5] text-[#1E3A2F] font-bold"
                      : "text-[#B8C9B2] bg-[#617A55]/10 border border-[#617A55]/20 hover:bg-[#617A55]/20 hover:text-[#D8C3A5] hover:border-[#D8C3A5]/30"
                  )}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-3.5 border-t border-[#617A55]/30 flex justify-center sm:hidden">
              <a
                href="/resume.pdf"
                download="Premkumar_Patil_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-[#D8C3A5] px-5 py-2.5 text-sm font-semibold text-[#1E3A2F] shadow-md shadow-[#D8C3A5]/25 hover:bg-[#E8DCC8] transition"
              >
                <FileText size={16} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
