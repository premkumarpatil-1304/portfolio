"use client";

import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, FileText, Sparkles } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "./ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeContext";

// In your navbar:

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },

  { name: "Experience", href: "#experience" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Achievements", href: "#achievements" },
  { name: "SkillsOverview", href: "#skillsoverview" },
  { name: "Contact", href: "#contact" },
];

const RESUME_PATH = "/resume/Zensar_resume.pdf";

/* ---------------------------------------------------------------------- */
/*  Palette — same family as the rest of the site, just layered richer     */
/*  Forest: #1E3A2F   Sage: #617A55   Gold: #D8C3A5   Ivory: #F5F1EA       */
/*  Added: a deeper pine for contrast + a warm ember accent for highlights */
/* ---------------------------------------------------------------------- */
const PINE = "#132821";
const EMBER = "#C88A5E";

/* ---------------------------------------------------------------------- */
/*  Resume Viewer Modal — view-only, smooth-scrolling, no download prompt  */
/* ---------------------------------------------------------------------- */

function ResumeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll while the modal is open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0a1512]/88 backdrop-blur-md" />

          {/* Ambient glow behind panel */}
          <div className="pointer-events-none absolute h-[60vh] w-[60vh] rounded-full bg-[#D8C3A5]/8 blur-[100px]" />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[22px]"
            style={{
              background: `linear-gradient(160deg, rgba(96,122,85,0.22) 0%, ${PINE}f0 55%, #0a1512 100%)`,
              border: "1px solid rgba(216,195,165,0.22)",
              boxShadow: "0 30px 70px rgba(6,12,10,0.65), 0 0 0 1px rgba(216,195,165,0.05) inset",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D8C3A5]/60 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#617A55]/20 px-5 py-3.5"
              style={{ background: "linear-gradient(180deg, rgba(30,58,47,0.5) 0%, transparent 100%)" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D8C3A5]/15 border border-[#D8C3A5]/30">
                  <FileText size={15} className="text-[#D8C3A5]" />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-[#F5F1EA]">
                    View Resume
                  </span>
                  <span className="text-[10px] text-[#B8C9B2]">Premkumar Patil</span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close resume viewer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E3A2F]/60 border border-[#617A55]/30 text-[#B8C9B2] transition-all hover:text-[#D8C3A5] hover:border-[#D8C3A5]/40 hover:scale-105 active:scale-95"
              >
                <X size={15} />
              </button>
            </div>

            {/* PDF viewer — wrapped for smooth momentum scrolling; toolbar hidden */}
            <div
              className="relative flex-1 overflow-y-auto"
              style={{
                background: PINE,
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
              }}
            >
              <iframe
                src={`${RESUME_PATH}#toolbar=0&navpanes=0&view=FitH&scrollbar=1`}
                title="Resume preview"
                className="h-full w-full"
                style={{ border: "none", display: "block" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

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
  // Auto-close mobile menu on scroll
  useEffect(() => {
    if (!isOpen) return;

    const closeOnScroll = () => setIsOpen(false);

    window.addEventListener("scroll", closeOnScroll);
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{ fontFamily: "'Soria', 'Century Gothic', sans-serif" }}>
      <div className="mx-auto mt-4 w-[95%] max-w-7xl">
        <div
          className={clsx(
            "flex items-center justify-between rounded-2xl px-6 py-3.5 transition-all duration-500",
            scrolled ? "shadow-xl shadow-[#0a1512]/50" : "shadow-md shadow-[#0a1512]/20"
          )}
          style={{
            background: scrolled
              ? `linear-gradient(135deg, rgba(19,40,33,0.92) 0%, rgba(30,58,47,0.9) 55%, rgba(19,40,33,0.92) 100%)`
              : `linear-gradient(135deg, rgba(19,40,33,0.72) 0%, rgba(30,58,47,0.68) 55%, rgba(19,40,33,0.72) 100%)`,
            border: scrolled
              ? "1px solid rgba(216,195,165,0.18)"
              : "1px solid rgba(97,122,85,0.28)",
            backdropFilter: "blur(18px)",
          }}
        >
          {/* Logo / Brand Name */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-mono font-bold shadow-md transition-transform group-hover:scale-105 group-hover:rotate-3"
              style={{
                background: "linear-gradient(150deg, #D8C3A5 0%, #C88A5E 130%)",
                color: PINE,
                boxShadow: "0 4px 16px rgba(216,195,165,0.3)",
              }}
            >
              PP
            </span>
            <span className="font-semibold text-sm sm:text-base text-[#F5F1EA] transition-colors group-hover:text-[#D8C3A5]">
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
                      ? "text-[#F5F1EA] font-semibold"
                      : "text-[#B8C9B2] hover:text-[#D8C3A5]"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{
                        background: "linear-gradient(120deg, rgba(216,195,165,0.28) 0%, rgba(200,138,94,0.18) 100%)",
                        border: "1px solid rgba(216,195,165,0.35)",
                        boxShadow: "0 2px 14px rgba(216,195,165,0.15)",
                      }}
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55]/50 bg-[#617A55]/15 text-[#D8C3A5] transition-all hover:scale-105 hover:bg-[#617A55]/25 hover:border-[#D8C3A5]/40 active:scale-95 shadow-sm"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-[#D8C3A5]" />
              ) : (
                <Moon size={18} className="text-[#D8C3A5]" />
              )}
            </button>

            {/* Resume Button — opens in-page viewer, no download */}
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #D8C3A5 0%, #C88A5E 140%)",
                color: PINE,
                boxShadow: "0 4px 18px rgba(216,195,165,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(216,195,165,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 18px rgba(216,195,165,0.3)";
              }}
            >
              <FileText size={15} />
              <span>View Resume</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#617A55]/50 bg-[#617A55]/15 text-[#D8C3A5] transition hover:bg-[#617A55]/25 hover:border-[#D8C3A5]/40 lg:hidden"
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
          <div
            className="rounded-2xl p-5 shadow-2xl shadow-[#0a1512]/60 backdrop-blur-xl"
            style={{
              background: `linear-gradient(160deg, rgba(19,40,33,0.96) 0%, rgba(30,58,47,0.96) 100%)`,
              border: "1px solid rgba(97,122,85,0.35)",
            }}
          >
            <nav className="grid grid-cols-2 gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "rounded-xl px-4 py-3 text-sm sm:text-base font-semibold transition-all duration-200 text-center"
                  )}
                  style={
                    activeSection === link.href
                      ? {
                        background: "linear-gradient(135deg, #D8C3A5 0%, #C88A5E 140%)",
                        color: PINE,
                      }
                      : {
                        color: "#B8C9B2",
                        background: "rgba(97,122,85,0.1)",
                        border: "1px solid rgba(97,122,85,0.2)",
                      }
                  }
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-3.5 border-t border-[#617A55]/30 flex justify-center sm:hidden">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setResumeOpen(true);
                }}
                className="w-full inline-flex justify-center items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition"
                style={{
                  background: "linear-gradient(135deg, #D8C3A5 0%, #C88A5E 140%)",
                  color: PINE,
                  boxShadow: "0 4px 18px rgba(216,195,165,0.3)",
                }}
              >
                <FileText size={16} />
                <span>View Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Viewer Modal */}
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </header>
  );
}