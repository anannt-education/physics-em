import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StudentProvider } from "@/lib/store/student-store";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anannt · AP Physics C: Electricity & Magnetism",
    template: "%s · Anannt E&M",
  },
  description:
    "Mastery-led AP Physics C: E&M preparation. Diagnose, learn the field-and-flux cycle, practise under the May 2027 exam profile, and repair errors with evidence — not video-watching percentages.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} ${ibmMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <StudentProvider>{children}</StudentProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
