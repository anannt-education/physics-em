import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Mock exams (gated)",
  description: "Timed practice behind the study gate. Mock B is not a second paper.",
  path: "/mocks",
  index: false,
});

export default function MocksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
