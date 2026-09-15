"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Terminal, Send, Sparkles, Code, Award, Target, CheckCircle2, Bot, User as UserIcon, ArrowUpRight, Lightbulb, Compass, Layers3, Cpu } from "lucide-react";

const soria = "'Soria', 'Century Gothic', sans-serif";
const QUICK_COMMANDS = ["About", "Skill", "Projects", "Experience", "Hackathons", "Contact"];
type Message = { role: "bot" | "user"; text: string };

function AskPremTerminal() {
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: "Hi, I'm a chatbot trained on Premkumar's profile — ask me anything." }]);
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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      setMessages((previous) => [...previous, { role: "bot", text: data.reply }]);
    } catch {
      setMessages((previous) => [...previous, { role: "bot", text: "Something went wrong reaching the chatbot — please try again." }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex min-h-[560px] flex-col overflow-hidden rounded-[1.75rem] border border-[#617A55]/45 bg-[#132821] shadow-xl shadow-[#1E3A2F]/50 sm:min-h-[620px]">
      <div className="flex items-center justify-between border-b border-[#617A55]/45 bg-[#1E3A2F] px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D8C3A5]/30 bg-[#617A55]/25 text-[#D8C3A5]"><Terminal size={16} /></div><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F5F1EA]" style={{ fontFamily: soria }}>Ask Prem</p><p className="mt-0.5 text-[10px] text-[#B8C9B2]" style={{ fontFamily: soria }}>Interactive profile assistant</p></div></div>
        <div className="flex gap-1.5" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-[#D8C3A5]" /><span className="h-2.5 w-2.5 rounded-full bg-[#617A55]" /><span className="h-2.5 w-2.5 rounded-full bg-[#B8C9B2]" /></div>
      </div>
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 font-mono text-sm scrollbar-thin scrollbar-thumb-[#617A55]/40 sm:p-6">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => <motion.div key={`${message.role}-${index}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${message.role === "user" ? "bg-[#D8C3A5]/15 text-[#D8C3A5]" : "bg-[#617A55]/25 text-[#B8C9B2]"}`}>{message.role === "user" ? <UserIcon size={16} /> : <Bot size={16} />}</div><div className={`max-w-[84%] rounded-2xl px-4 py-3 leading-6 ${message.role === "user" ? "bg-[#D8C3A5]/12 text-[#F5F1EA]" : "border border-[#617A55]/35 bg-[#1E3A2F] text-[#B8C9B2]"}`}>{message.text}</div></motion.div>)}
          {typing && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#617A55]/25 text-[#B8C9B2]"><Bot size={16} /></div><div className="flex items-center gap-1 rounded-2xl border border-[#617A55]/35 bg-[#1E3A2F] px-4 py-3">{[0, 150, 300].map((delay) => <span key={delay} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D8C3A5]" style={{ animationDelay: `${delay}ms` }} />)}</div></motion.div>}
        </AnimatePresence>
      </div>
      <div className="border-t border-[#617A55]/45 bg-[#1E3A2F] p-3 sm:p-4"><div className="mb-3 flex flex-wrap gap-2">{QUICK_COMMANDS.map((command) => <button key={command} onClick={() => send(command)} disabled={typing} className="rounded-lg border border-[#617A55]/45 bg-[#617A55]/15 px-2.5 py-1.5 text-[10px] text-[#B8C9B2] transition-colors hover:border-[#D8C3A5]/50 hover:bg-[#D8C3A5]/10 hover:text-[#F5F1EA] disabled:opacity-50" style={{ fontFamily: soria }}>/{command.toLowerCase()}</button>)}</div><form onSubmit={(event) => { event.preventDefault(); send(input); }} className="flex items-center gap-2 rounded-xl border border-[#617A55]/50 bg-[#132821] px-3 py-2.5 focus-within:border-[#D8C3A5]/60"><span className="font-mono text-[#D8C3A5]">~$</span><input type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about my work..." disabled={typing} className="min-w-0 flex-1 bg-transparent font-mono text-sm text-[#F5F1EA] outline-none placeholder:text-[#B8C9B2]/50" /><button type="submit" disabled={!input.trim() || typing} aria-label="Send message" className="rounded-lg p-1.5 text-[#B8C9B2] transition-colors hover:bg-[#D8C3A5]/10 hover:text-[#D8C3A5] disabled:opacity-50"><Send size={16} /></button></form></div>
    </div>
  );
}

const stats = [
  { value: "10+", label: "Full Stack Projects", icon: Code },
  { value: "8+", label: "Professional Certifications", icon: Award },
  { value: "2+", label: "Hackathon Wins & Demos", icon: Target },
  { value: "100%", label: "Clean Code & Quality Focus", icon: CheckCircle2 },
];

const reveal = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } } };

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#1E3A2F] px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.header initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }} className="mb-10 flex flex-col gap-4 sm:mb-14 lg:flex-row lg:items-end lg:justify-between" style={{ fontFamily: soria }}>
          <div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8C3A5]">About me</p><h2 className="mt-3 max-w-3xl text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#F5F1EA] sm:text-5xl md:text-6xl">The person behind<br /><span className="text-[#D8C3A5]">the products.</span></h2></div>
          <p className="max-w-sm text-sm leading-6 text-[#B8C9B2] lg:text-right">A clearer look at how I think, build, and keep learning.</p>
        </motion.header>

        {/* Angled introduction panel */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative mb-8 overflow-hidden rounded-[1.75rem] border border-[#617A55]/45 bg-[#617A55]/15">
          <div className="grid min-h-[330px] lg:grid-cols-[1.35fr_0.65fr]">
            <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-14">
              <div className="flex items-center gap-3 text-[#D8C3A5]"><Sparkles size={17} /><span className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ fontFamily: soria }}>Quick introduction</span></div>
              <p className="mt-7 max-w-3xl text-2xl font-medium leading-[1.25] text-[#F5F1EA] sm:text-3xl lg:text-4xl" style={{ fontFamily: soria }}><strong className="text-[#D8C3A5]">Premkumar Patil</strong> is a Full Stack Developer and AI Engineer who builds complete products, not just screens.</p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#B8C9B2] sm:text-base" style={{ fontFamily: soria }}>I move between product thinking, interface design, backend architecture, and the details that make software feel dependable.</p>
              <a href="#projects" className="mt-7 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#D8C3A5] transition-colors hover:text-[#F5F1EA]" style={{ fontFamily: soria }}>Explore my work <ArrowUpRight size={15} /></a>
            </div>
            <div className="relative min-h-[180px] overflow-hidden bg-[#1E3A2F] lg:min-h-0 lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]"><div className="absolute inset-0 flex items-center justify-center p-8 lg:pl-16"><div className="text-center" style={{ fontFamily: soria }}><p className="text-6xl font-bold text-[#D8C3A5]">01</p><p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#B8C9B2]">Mindset / craft / growth</p></div></div></div>
          </div>
        </motion.div>

        {/* Information grid in the former chatbot area */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => { const Icon = stat.icon; return <motion.div key={stat.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08, duration: 0.5 }} whileHover={{ y: -5 }} className="flex min-h-[170px] flex-col justify-between rounded-2xl border border-[#617A55]/45 bg-[#1E3A2F] p-5" style={{ fontFamily: soria }}><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D8C3A5]/20 bg-[#D8C3A5]/10 text-[#D8C3A5]"><Icon size={19} /></div><div><p className="text-3xl font-bold text-[#F5F1EA]">{stat.value}</p><p className="mt-2 text-[11px] leading-5 text-[#B8C9B2]">{stat.label}</p></div></motion.div>; })}
        </div>

        {/* <div className="mb-10 grid gap-4 md:grid-cols-3" style={{ fontFamily: soria }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-[#617A55]/45 bg-[#617A55]/15 p-6 md:col-span-2"><div className="flex items-center gap-3 text-[#D8C3A5]"><Lightbulb size={19} /><h3 className="text-sm font-semibold text-[#F5F1EA]">Engineering mindset</h3></div><p className="mt-4 max-w-2xl text-sm leading-7 text-[#B8C9B2]">My journey began with C and Java, then expanded into React, Next.js, Python, FastAPI, and modern databases. I prioritize maintainable architecture, testing, type safety, and thoughtful interfaces over quick hacks.</p></motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-[#617A55]/45 bg-[#1E3A2F] p-6"><div className="flex items-center gap-3 text-[#D8C3A5]"><Compass size={19} /><h3 className="text-sm font-semibold text-[#F5F1EA]">What&apos;s next</h3></div><p className="mt-4 text-sm leading-7 text-[#B8C9B2]">AI-assisted applications, scalable full-stack systems, and real-time products.</p></motion.div>
        </div> */}

        {/* Chatbot moved below the grid */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7 }}>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between" style={{ fontFamily: soria }}><div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8C3A5]">Interactive profile</p><h3 className="mt-2 text-2xl font-bold text-[#F5F1EA] sm:text-3xl">Ask me anything.</h3></div><p className="text-sm text-[#B8C9B2] sm:text-right">Use a quick command or type your own question.</p></div>
          <AskPremTerminal />
        </motion.div>
      </div>
    </section>
  );
}

/* Palette: 60% Forest Green #1E3A2F, 30% Moss Green #617A55, 10% Champagne Gold #D8C3A5. */
      
