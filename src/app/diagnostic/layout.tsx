import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Physics C E&M diagnostic start",
  description:
    "Start a flux-versus-field check with no account. Submit sends you to study.anannt.ae/start. Placement help, not a predicted AP score.",
  path: "/diagnostic",
});

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  return children;
}
