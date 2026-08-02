"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/ThemeContext";
import Loader from "@/components/Loader";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientBackground from "@/components/AmbientBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechRoadmap from "@/components/TechRoadmap";
import Achievements from "@/components/Achievements";
import SkillsOverview from "@/components/SkillsOverview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack";
import StickyCursor from "@/components/StickyCursor";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Loader isLoading={isLoading} />
      
      <ScrollProgress />
      <AmbientBackground />
      <StickyCursor />

      {!isLoading && (
        <div className="relative min-h-screen flex flex-col selection:bg-blue-500 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Hero />
            <About />
            <TechStack />
            <Projects />
            <Experience />
            <TechRoadmap />
            <Achievements />
            <SkillsOverview />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </ThemeProvider>
  );
}