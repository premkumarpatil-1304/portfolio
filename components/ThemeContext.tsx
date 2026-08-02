"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/* ═══════════════════════════════════════════════════════════════════════ */
/*  COFFEE CUP TOGGLE BUTTON                                             */
/*  A creative dark/light mode toggle shaped like a coffee cup           */
/*  Steam rises in light mode, steam disappears in dark mode             */
/* ═══════════════════════════════════════════════════════════════════════ */

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 500);
    toggleTheme();
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={handleClick}
      className="relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30"
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(59,42,33,0.8) 0%, rgba(138,98,64,0.4) 100%)"
          : "linear-gradient(135deg, rgba(217,164,65,0.15) 0%, rgba(138,98,64,0.1) 100%)",
        border: `1px solid ${isDark ? "rgba(217,164,65,0.3)" : "rgba(138,98,64,0.25)"}`,
        boxShadow: isDark
          ? "0 4px 20px rgba(59,42,33,0.4), inset 0 1px 0 rgba(217,164,65,0.1)"
          : "0 4px 20px rgba(138,98,64,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            background: "rgba(217,164,65,0.4)",
            animation: "ripple 0.5s ease-out forwards",
          }}
        />
      ))}

      {/* Coffee cup SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300"
      >
        {/* Cup body */}
        <path
          d="M4 9V17C4 19.2091 5.79086 21 8 21H12C14.2091 21 16 19.2091 16 17V9"
          stroke={isDark ? "#D9A441" : "#8A6240"}
          strokeWidth="1.5"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />

        {/* Cup handle */}
        <path
          d="M16 11H17C18.6569 11 20 12.3431 20 14C20 15.6569 18.6569 17 17 17H16"
          stroke={isDark ? "#D9A441" : "#8A6240"}
          strokeWidth="1.5"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />

        {/* Coffee surface */}
        <ellipse
          cx="10"
          cy="9"
          rx="6"
          ry="1.5"
          fill={isDark ? "rgba(217,164,65,0.2)" : "rgba(138,98,64,0.15)"}
          stroke={isDark ? "#D9A441" : "#8A6240"}
          strokeWidth="1"
          className="transition-all duration-300"
        />

        {/* Steam lines — visible in dark mode (hot coffee) */}
        {isDark && (
          <>
            <motion.path
              d="M8 6C8 5 7.5 4.5 8 3.5"
              stroke="#D9A441"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0,
              }}
            />
            <motion.path
              d="M10 5.5C10 4.5 9.5 4 10 3"
              stroke="#D9A441"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity: [0, 0.5, 0],
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.4,
              }}
            />
            <motion.path
              d="M12 6C12 5 11.5 4.5 12 3.5"
              stroke="#D9A441"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.8,
              }}
            />
          </>
        )}

        {/* Sun rays — visible in light mode */}
        {!isDark && (
          <>
            <motion.path
              d="M10 5V3"
              stroke="#8A6240"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.path
              d="M6.5 6L5.5 5"
              stroke="#8A6240"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.path
              d="M13.5 6L14.5 5"
              stroke="#8A6240"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </>
        )}
      </svg>

      {/* Saucer shadow underneath */}
      <div
        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full transition-all duration-300"
        style={{
          background: isDark
            ? "rgba(217,164,65,0.15)"
            : "rgba(138,98,64,0.1)",
          boxShadow: isDark
            ? "0 2px 8px rgba(217,164,65,0.1)"
            : "0 2px 8px rgba(138,98,64,0.05)",
        }}
      />

      {/* Ripple keyframe animation */}
      <style>{`
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(4); opacity: 0; }
        }
      `}</style>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  THEME PROVIDER — CHOCOLATE & CARAMEL PALETTE                         */
/* ═══════════════════════════════════════════════════════════════════════ */

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      if (stored === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Default to dark mode
      document.documentElement.classList.add("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return <div className="dark">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Re-export the toggle for use in Navbar
export { ThemeToggle };
