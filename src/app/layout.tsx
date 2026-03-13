import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Powering the ISS — Electrical Power System Overview",
  description:
    "An interactive visual guide to the International Space Station's Electrical Power System. Learn how solar arrays, batteries, and power distribution keep the ISS running 250 miles above Earth.",
  keywords: [
    "ISS",
    "International Space Station",
    "EPS",
    "Electrical Power System",
    "NASA",
    "Solar Arrays",
    "Space Power",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <div className="stars" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
