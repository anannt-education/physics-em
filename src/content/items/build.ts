import type { McqItem } from "@/lib/types";

const provenance = {
  author: "Anannt physics author",
  reviewer: "Independent physics reviewer",
  reviewed: "2026-09-10",
  version: "1.0",
};

type Draft = Omit<McqItem, "provenance" | "status" | "version" | "allowedResources"> & {
  allowedResources?: string[];
};

export function mcq(d: Draft): McqItem {
  return {
    version: "1.0",
    status: "published",
    allowedResources: d.allowedResources ?? ["calculator", "Anannt reference sheet"],
    provenance,
    ...d,
  };
}
