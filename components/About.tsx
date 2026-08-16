"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Terminal,
  Send,
  Sparkles,
  Code,
  Award,
  Target,
  CheckCircle2,
  Bot,
  User as UserIcon,
} from "lucide-react";

const soria = "'Soria', 'Century Gothic', sans-serif";
const PINE = "#132821";
const EMBER = "#C88A5E";

/* ---------------------------------------------------------------------- */
/*  Chatbot knowledge base — swap in your own answers freely               */
/* ---------------------------------------------------------------------- */

const KNOWLEDGE: { keys: string[]; answer: string }[] = [
  {
    keys: ["About", "Who", "Yourself", "Intro"],
    answer:
      "I'm Premkumar Patil — a Full Stack Developer & AI Engineer. I turn complex backend logic into fast, clean interfaces and like shipping complete products, not just features.",
  },
  {
    keys: ["Skill", "Stack", "Tech"],
    answer:
      "Core stack: React, Next.js, TypeScript, Python, FastAPI, MongoDB, PostgreSQL — comfortable owning a feature from database schema to pixel-perfect UI.",
  },
  {
    keys: ["Project", "Work", "Built", "Portfolio"],
    answer:
      "A few I'm proud of: BeatSync (real-time sync app), FinZer (AI-driven personal finance insights), and a civic reporting platform with live tracking.",
  },
  {
    keys: ["Hackathon", "Compet"],
    answer:
      "I've competed at national-level hackathons — MIT Kurukshetra, Tatva, Smart India Hackathon — and picked up a win at CodeSprint.",
  },
  {
    keys: ["Experience", "Job", "Intern", "Alltius"],
    answer:
      "Currently a Technical Intern at Alltius Pvt Ltd — building REST APIs with FastAPI and React interfaces alongside the core engineering team.",
  },
  {
    keys: ["Certification", "Certificate", "Course"],
    answer:
      "8+ certifications spanning MongoDB, SQL, C programming, and full-stack development — mostly hands-on, not just theory.",
  },
  {
    keys: ["Contact", "Email", "Reach", "Hire"],
    answer:
      "Best way to reach me is the Contact section below, or grab my resume from the navbar to see everything in one place.",
  },
  {
    keys: ["Joke", "Funny"],
    answer: "Why do programmers prefer dark mode? Because light attracts bugs.",
  },
  {
    keys: ["Hello", "Hi", "Hey"],
    answer: "Hey! Try one of the quick commands below, or ask about my skills, projects, or experience.",
  },
];

const QUICK_COMMANDS = ["About", "Skill", "Projects", "Experience", "Hackathons", "Contact"];

function getAnswer(input: string): string {
  const lower = input.toLowerCase();
  const match = KNOWLEDGE.find((entry) => entry.keys.some((k) => lower.includes(k)));
  if (match) return match.answer;
  return "I don't have that one yet — try: about, skills, projects, experience, hackathons, contact";
}

type Message = { role: "bot" | "user"; text: string };

/* ---------------------------------------------------------------------- */
/*  Terminal-style chatbot                                                 */
/* ---------------------------------------------------------------------- */

/* ----------------------------------------------------------------------
   Replace the AskPremTerminal function in your About.tsx with this version.
   Everything else in the file (layout, stats, palette) stays the same —
   only the "brain" of the chatbot changes: instead of local keyword
   matching, it now calls /api/chat, which talks to Claude on the server.
------------------------------------------------------------------------- */

function AskPremTerminal() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi, I'm a chatbot trained on Premkumar's profile — ask me anything, real conversation this time.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;

    const nextMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong reaching the chatbot — try again in a moment." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] rounded-2xl overflow-hidden border border-[#D8C3A5]/20 bg-[#0F1C16] shadow-2xl">
      {/* Title Bar */}
      <div className="flex items-center justify-between bg-[#15251E] px-4 py-3 border-b border-[#D8C3A5]/10">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-[#D8C3A5]" />
          <span className="text-xs font-mono text-[#A8BFA0]">ask_prem.exe</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80"></div>
        </div>
      </div>

      {/* Messages Log */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-[#617A55]/30">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${msg.role === "user" ? "bg-[#C88A5E]/20 text-[#C88A5E]" : "bg-[#617A55]/20 text-[#A8BFA0]"}`}>
                {msg.role === "user" ? <UserIcon size={16} /> : <Bot size={16} />}
              </div>
              <div className={`rounded-xl px-4 py-2 max-w-[80%] ${msg.role === "user" ? "bg-[#C88A5E]/10 text-[#F5F1EA]" : "bg-[#1A2E25] text-[#A8BFA0]"} border border-transparent ${msg.role === "bot" ? "border-[#617A55]/20" : ""}`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#617A55]/20 text-[#A8BFA0]">
                <Bot size={16} />
              </div>
              <div className="rounded-xl px-4 py-2 bg-[#1A2E25] text-[#A8BFA0] border border-[#617A55]/20 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A8BFA0] animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#A8BFA0] animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#A8BFA0] animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Commands & Input */}
      <div className="p-3 bg-[#15251E] border-t border-[#D8C3A5]/10">
        <div className="flex flex-wrap gap-2 mb-3 px-1">
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              onClick={() => send(cmd)}
              disabled={typing}
              className="text-[10px] font-mono px-2 py-1 rounded-md bg-[#617A55]/20 text-[#A8BFA0] hover:bg-[#617A55]/40 hover:text-[#F5F1EA] transition-colors disabled:opacity-50"
            >
              /{cmd.toLowerCase()}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 bg-[#0F1C16] rounded-xl px-3 py-2 border border-[#D8C3A5]/20 focus-within:border-[#C88A5E]/50 transition-colors"
        >
          <span className="text-[#C88A5E] font-mono">~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={typing}
            className="flex-1 bg-transparent border-none outline-none text-[#F5F1EA] font-mono text-sm placeholder:text-[#A8BFA0]/50"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            className="p-1.5 rounded-lg text-[#A8BFA0] hover:text-[#C88A5E] hover:bg-[#C88A5E]/10 transition-colors disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  About section                                                          */
/* ---------------------------------------------------------------------- */

const stats = [
  { value: "10+", label: "Full Stack Projects", icon: Code },
  { value: "8+", label: "Certifications", icon: Award },
  { value: "2+", label: "Hackathon Wins", icon: Target },
  { value: "100%", label: "Clean Code Focus", icon: CheckCircle2 },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#1E3A2F] px-6 py-25 md:px-10 lg:px-16"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(96,122,85,0.1),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(200,138,94,0.06),transparent_55%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center lg:text-left"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8C3A5]"
            style={{ fontFamily: soria }}
          >
            About Me
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1EA] sm:text-4xl md:text-5xl"
            style={{ fontFamily: soria }}
          >
            Ask, don't just read.
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Left: condensed intro + floating stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div className="flex items-center gap-2 text-[#D8C3A5]">
              <Sparkles size={16} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: soria }}>
                Quick intro
              </span>
            </div>

            <p
              className="text-xl font-medium leading-relaxed text-[#F5F1EA] sm:text-2xl"
              style={{ fontFamily: soria }}
            >
              <strong className="text-[#D8C3A5]">Premkumar Patil</strong> — Full Stack
              Developer & AI Engineer. I build complete products, not just
              screens.
            </p>

            <p className="text-sm leading-6 text-[#B8C9B2]" style={{ fontFamily: soria }}>
              The chatbot on the right knows more than this paragraph does —
              try it.
            </p>

            {/* Floating stat badges — scattered, alive */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    animate={{ y: [0, i % 2 === 0 ? -5 : 5, 0] }}
                    style={{
                      transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`,
                    }}
                    whileHover={{ y: -4, rotate: 0, transition: { duration: 0.2 } }}
                    className="rounded-2xl p-4"
                  >
                    <div
                      className="rounded-2xl p-4"
                      style={{
                        background: "linear-gradient(155deg, rgba(97,122,85,0.14) 0%, rgba(19,40,33,0.4) 100%)",
                        border: "1px solid rgba(216,195,165,0.16)",
                        boxShadow: "0 12px 28px rgba(10,21,18,0.35)",
                      }}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D8C3A5]/10 text-[#D8C3A5] mb-3">
                        <Icon size={15} />
                      </div>
                      <h3 className="text-xl font-extrabold text-[#F5F1EA] font-mono tracking-tight">
                        {stat.value}
                      </h3>
                      <p className="mt-1 text-[10px] font-medium leading-relaxed text-[#A8BFA0]">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: chatbot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <AskPremTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}