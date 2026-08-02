"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, FileText, Send, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const soria = "'Soria', 'Century Gothic', sans-serif";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#1E3A2F] px-6 py-25 md:px-10 lg:px-16"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_30%,rgba(96,122,85,0.1),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_70%,rgba(216,195,165,0.06),transparent_50%)]" />

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
            Get In Touch
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1EA] sm:text-4xl md:text-5xl"
            style={{ fontFamily: soria }}
          >
            Let's build something great together
          </h2>
          <p
            className="mt-3 max-w-2xl text-base text-[#B8C9B2]"
            style={{ fontFamily: soria }}
          >
            Have a project in mind, a job opportunity, or just want to connect?
            Send me a message and I'll get back to you promptly.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Direct Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-3xl border border-[#617A55]/25 bg-[#617A55]/10 p-8 shadow-xl shadow-[#1E3A2F]/40 backdrop-blur-xl space-y-6">
              <h3
                className="text-xl font-bold text-[#F5F1EA]"
                style={{ fontFamily: soria }}
              >
                Contact Information
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:13premkp@gmail.com"
                  className="flex items-center gap-4 rounded-2xl border border-[#617A55]/20 bg-[#1E3A2F]/40 p-4 transition-all hover:border-[#D8C3A5]/30 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#D8C3A5]/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D8C3A5]/10 text-[#D8C3A5] border border-[#D8C3A5]/20">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p
                      className="text-[11px] font-mono text-[#617A55]"
                      style={{ fontFamily: soria }}
                    >
                      Email Me
                    </p>
                    <p
                      className="text-sm font-semibold text-[#F5F1EA]"
                      style={{ fontFamily: soria }}
                    >
                      prempatil@example.com
                    </p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-[#617A55]/20 bg-[#1E3A2F]/40 p-4 transition-all hover:border-[#D8C3A5]/30 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#D8C3A5]/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D8C3A5]/10 text-[#D8C3A5] border border-[#D8C3A5]/20">
                    <LinkedinIcon size={20} />
                  </div>
                  <div>
                    <p
                      className="text-[11px] font-mono text-[#617A55]"
                      style={{ fontFamily: soria }}
                    >
                      LinkedIn Profile
                    </p>
                    <p
                      className="text-sm font-semibold text-[#F5F1EA]"
                      style={{ fontFamily: soria }}
                    >
                      Connect on LinkedIn
                    </p>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-[#617A55]/20 bg-[#1E3A2F]/40 p-4 transition-all hover:border-[#D8C3A5]/30 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#D8C3A5]/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D8C3A5]/10 text-[#D8C3A5] border border-[#D8C3A5]/20">
                    <GithubIcon size={20} />
                  </div>
                  <div>
                    <p
                      className="text-[11px] font-mono text-[#617A55]"
                      style={{ fontFamily: soria }}
                    >
                      GitHub Profile
                    </p>
                    <p
                      className="text-sm font-semibold text-[#F5F1EA]"
                      style={{ fontFamily: soria }}
                    >
                      Explore Repositories
                    </p>
                  </div>
                </a>
              </div>

              {/* Resume Download CTA */}
              <div className="pt-2">
                <a
                  href="/resume/Zensar_resume.pdf"
                  download="Premkumar_Patil_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-2 rounded-2xl bg-[#D8C3A5] px-6 py-3.5 text-sm font-semibold text-[#1E3A2F] shadow-lg shadow-[#D8C3A5]/25 transition-all hover:bg-[#c4b091] active:scale-95"
                  style={{ fontFamily: soria }}
                >
                  <FileText size={18} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-[#617A55]/25 bg-[#617A55]/10 p-8 shadow-xl shadow-[#1E3A2F]/40 backdrop-blur-xl">
              <h3
                className="text-xl font-bold text-[#F5F1EA] mb-6"
                style={{ fontFamily: soria }}
              >
                Send a Message
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-[#D8C3A5]/30 bg-[#D8C3A5]/10 p-8 text-center space-y-3"
                >
                  <div className="flex justify-center">
                    <CheckCircle2
                      size={48}
                      className="text-[#D8C3A5] animate-bounce"
                    />
                  </div>
                  <h4
                    className="text-xl font-bold text-[#F5F1EA]"
                    style={{ fontFamily: soria }}
                  >
                    Message Sent Successfully!
                  </h4>
                  <p
                    className="text-xs text-[#B8C9B2]"
                    style={{ fontFamily: soria }}
                  >
                    Thank you for reaching out. I will get back to your message
                    as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#D8C3A5] hover:underline"
                    style={{ fontFamily: soria }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        className="block text-xs font-semibold text-[#B8C9B2] mb-1"
                        style={{ fontFamily: soria }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#617A55]/25 bg-[#1E3A2F]/50 px-4 py-3 text-xs text-[#F5F1EA] placeholder:text-[#617A55]/50 outline-none focus:border-[#D8C3A5]/40 transition"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-xs font-semibold text-[#B8C9B2] mb-1"
                        style={{ fontFamily: soria }}
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#617A55]/25 bg-[#1E3A2F]/50 px-4 py-3 text-xs text-[#F5F1EA] placeholder:text-[#617A55]/50 outline-none focus:border-[#D8C3A5]/40 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold text-[#B8C9B2] mb-1"
                      style={{ fontFamily: soria }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Stack Developer Role / Collaboration"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#617A55]/25 bg-[#1E3A2F]/50 px-4 py-3 text-xs text-[#F5F1EA] placeholder:text-[#617A55]/50 outline-none focus:border-[#D8C3A5]/40 transition"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold text-[#B8C9B2] mb-1"
                      style={{ fontFamily: soria }}
                    >
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#617A55]/25 bg-[#1E3A2F]/50 px-4 py-3 text-xs text-[#F5F1EA] placeholder:text-[#617A55]/50 outline-none focus:border-[#D8C3A5]/40 transition resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#D8C3A5] px-6 py-3.5 text-xs font-semibold text-[#1E3A2F] shadow-md shadow-[#D8C3A5]/20 hover:bg-[#c4b091] transition disabled:opacity-50"
                    style={{ fontFamily: soria }}
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-[#1E3A2F] border-t-transparent animate-spin" />
                        <span>Sending...</span>
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
