import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import "./globals.css";
import "katex/dist/katex.min.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Zhiyao Chen — Research",
  description:
    "Nonlinear systems, geophysics, scientific visualization, and computational modeling at Penn VIPER.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${sourceSerif.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
