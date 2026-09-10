"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IssueButton } from "@/components/IssueButton";
import { Button } from "@/components/ui/button";
import { getStore, subscribe } from "@/lib/student-store";

export default function ExpertPage() {
  const [ready, setReady] = useState(false);
  const [expert, setExpert] = useState(false);

  useEffect(() => {
    const sync = () => {
      setExpert(getStore().expertUnlocked);
      setReady(true);
    };
    sync();
    return subscribe(sync);
  }, []);

  if (!ready) return <p className="text-sm text-muted-foreground">Loading…</p>;

  if (!expert) {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <h1 className="text-2xl font-semibold">Expert mode locked</h1>
        <p className="text-sm text-muted-foreground">
          Finish onboarding and complete the diagnostic to unlock the instructor-grade briefing —
          exam profile, AP Classroom mapping, and the 2026 delta.
        </p>
        <Button asChild>
          <Link href="/onboarding">Go to onboarding</Link>
        </Button>
        <IssueButton />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Expert</p>
        <h1 className="text-2xl font-semibold">Instructor briefing</h1>
      </div>
      <section className="rounded-lg border bg-card p-5 text-sm">
        <h2 className="font-medium">Exam profile</h2>
        <p className="mt-2 text-muted-foreground">
          Section I: 40 MCQs, 80 minutes, 50%. Section II: 4 FRQs, 100 minutes, 50% — typically 3
          long + 1 short, with experimental design and paragraph-length reasoning required.
        </p>
      </section>
      <section className="rounded-lg border bg-card p-5 text-sm">
        <h2 className="font-medium">AP Classroom mapping</h2>
        <p className="mt-2 text-muted-foreground">
          Progress, Topic Questions, and Progress Checks are the official practice spine. This
          portal is a study companion — not a substitute for AP Classroom.
        </p>
      </section>
      <section className="rounded-lg border bg-card p-5 text-sm">
        <h2 className="font-medium">2026 CED delta</h2>
        <p className="mt-2 text-muted-foreground">
          The May 2026 exam is the first under the 2024 course framework. Units 8–10 were
          reorganized; Maxwell’s equations in integral form are explicit; electromagnetic waves
          sit in Unit 10. See Resources for the official CED PDF.
        </p>
      </section>
      <IssueButton />
    </div>
  );
}
