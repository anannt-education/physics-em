"use client";

import { gateHref } from "@/lib/mount";

export function redirectToGate(unit = "8", intent?: string) {
  window.location.assign(gateHref(unit, intent));
}
