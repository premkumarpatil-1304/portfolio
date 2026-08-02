"use client";

import { AnimatePresence, motion } from "framer-motion";

type LoaderProps = {
  isLoading: boolean;
};

export default function Loader({ isLoading }: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 text-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Ambient Loader Glow */}
            <div className="absolute -inset-10 rounded-full bg-violet-600/20 blur-3xl" />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-center"
            >
              <h1 className="text-3xl font-bold tracking-[0.2em] uppercase text-white sm:text-4xl">
                Premkumar Patil
              </h1>
              <p className="mt-2 text-xs tracking-[0.35em] text-violet-400 font-mono uppercase">
                Full Stack Developer & AI Engineer
              </p>
            </motion.div>

            {/* Progress line */}
            <div className="relative z-10 mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-violet-600 to-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.9)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}