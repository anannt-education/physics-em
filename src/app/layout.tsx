import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StudentProvider } from "@/lib/store/student-store";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_ORIGIN } from "@/lib/site";

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
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · Anannt Study",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "Anannt Study · Physics C E&M",
  authors: [{ name: "Anannt Education" }],
  creator: "Anannt Education",
  publisher: "Anannt Education",
  robots: { index: true, follow: true },
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
