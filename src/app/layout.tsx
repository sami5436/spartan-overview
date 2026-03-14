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
  title: "ISS EPS — Powering the Station",
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

  openGraph: {
    title: "Powering the ISS",
    description:
      "An interactive visual guide to the International Space Station's Electrical Power System.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Powering the ISS — Electrical Power System Overview",
      },
    ],
    type: "website",
    siteName: "ISS EPS Overview",
  },
  twitter: {
    card: "summary_large_image",
    title: "Powering the ISS",
    description:
      "An interactive visual guide to the International Space Station's Electrical Power System.",
    images: ["/og-image.png"],
  },
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
