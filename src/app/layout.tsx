import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather",
  description: "A simple weather app.",
};

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100`}
      >
        {/* subtle grid + vignette */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(45rem_45rem_at_50%_-10%,rgba(99,102,241,0.18),transparent)]" />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(60rem_60rem_at_110%_10%,rgba(56,189,248,0.15),transparent)]" />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}