import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premkumar Patil | Full Stack Developer & AI Engineer Portfolio",
  description:
    "Personal portfolio of Premkumar Patil - Full Stack Software Engineer specializing in React, Next.js, FastAPI, Python, MongoDB, and AI solutions.",
  keywords: [
    "Premkumar Patil",
    "Prem Patil",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Portfolio",
    "FastAPI Python Developer",
    "AI Engineer",
  ],
  authors: [{ name: "Premkumar Patil" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} dark scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 transition-colors duration-300 font-sans">
        {children}
      </body>
    </html>
  );
}
