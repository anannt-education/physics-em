"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnanntLogo } from "@/components/layout/Logo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { McqCard } from "@/components/practice/McqCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DIAGNOSTIC_ITEMS } from "@/content/items/diagnostic";
import { DIAGNOSTIC_FRQS } from "@/content/frqs";
import { useStudent } from "@/lib/store/student-store";
import { lessonById } from "@/content/lessons";
import { redirectToGate } from "@/lib/gate-client";

export default function DiagnosticPage() {
  const router = useRouter();
  const { state, setState, log } = useStudent();
  const [step, setStep] = useState(0);
  const [written, setWritten] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [summary, setSummary] = useState("");
  const [mcqCorrect, setMcqCorrect] = useState<boolean[]>([]);

  const items = DIAGNOSTIC_ITEMS;
  const current = items[step];
  const isMcq = step < items.length;
  const frq = DIAGNOSTIC_FRQS[step - items.length];

  const progressLabel = useMemo(() => {
    const total = items.length + DIAGNOSTIC_FRQS.length;
    return `Task ${step + 1} of ${total}`;
  }, [step, items.length]);

  if (!state.profile) {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <header className="border-b border-border bg-navy px-4 py-4">
          <AnanntLogo inverse />
        </header>
        <div className="mx-auto w-full max-w-2xl flex-1 p-8">
        <p className="text-sm text-muted-foreground">
          Diagnostic start is public. No account. Submitting sends you to study.anannt.ae/start.
        </p>
        <Button className="mt-3" onClick={() => router.push("/onboarding")}>
          Optional onboarding first
        </Button>
        <Button
          variant="outline"
          className="mt-3 ml-2"
          onClick={() =>
            setState((s) => ({
              ...s,
              profile: {
                name: "Student",
                examYear: 2027,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                weeklyHours: 6,
                priorPhysics: "not stated",
                priorCalculus: "not stated",
                schoolSequence: "Not stated",
                accessibility: { reducedMotion: false, largeText: false, extraTime: false },
                pathway: "16-week",
                onboardingComplete: false,
                diagnosticComplete: false,
                createdAt: Date.now(),
              },
            }))
          }
        >
          Start diagnostic now
        </Button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  function finish(eventsCorrect: boolean[]) {
    const scores = eventsCorrect.length ? eventsCorrect : mcqCorrect;
    const weakFlux =
      state.events.some((e) => e.misconception === "flux-equals-local-field" || (!e.correct && e.itemId === "diag-07")) ||
      items.some((it, i) => it.misconception === "flux-equals-local-field" && scores[i] === false);
    const weakCalc = scores.filter((c, i) => i < 5 && !c).length >= 2;
    const lines = [
      `${state.profile?.name}, this is an Anannt skill profile — not an official AP score and not a 1–5 conversion.`,
      weakCalc
        ? "Prerequisite calculus/graph items were uneven. Bridge lessons will sit alongside Unit 8, not instead of it."
        : "Prerequisite screen looks usable. You can still open any bridge lesson.",
      weakFlux
        ? "Flux was treated as if it were a local field. The field-and-flux path is the first physics priority."
        : "Flux item was handled. Unit 8 still starts with Coulomb and the field model.",
      "Insufficient evidence remains on FRQ handwriting until you submit the written tasks and later independent work.",
    ];
    const text = lines.join(" ");
    setSummary(text);
    setState((s) => ({
      ...s,
      profile: s.profile ? { ...s.profile, diagnosticComplete: true, diagnosticSummary: text } : s.profile,
      entitlement: s.entitlement.tier === "free" ? s.entitlement : s.entitlement,
    }));
    log({ type: "diagnostic_completed", assisted: false, notes: text });
    setDone(true);
    redirectToGate("8", "1:1");
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="border-b border-border bg-navy px-4 py-4">
        <AnanntLogo inverse />
      </header>
      <main className="mx-auto max-w-2xl space-y-6 px-4 py-10">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{progressLabel} · Anannt diagnostic</p>
        <h1 className="font-heading text-2xl text-navy">Baseline</h1>
        <p className="text-sm text-muted-foreground">
          About 30–40 minutes. Hints are off. This routes repair; it does not sell a scare story.
        </p>
        {done ? (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">{summary}</p>
            <p className="text-sm text-muted-foreground">Opening the Burjuman gate — parent WhatsApp is required there.</p>
            <Button onClick={() => redirectToGate("8", "1:1")}>Continue to the study gate</Button>
            {lessonById("u8-flux-misconception") ? (
              <Button variant="outline" onClick={() => router.push("/learn/zero-flux-is-not-zero-field")}>
                Sample path: zero flux is not zero field
              </Button>
            ) : null}
          </div>
        ) : isMcq && current ? (
          <McqCard
            key={current.id}
            item={current}
            mode="assessment"
            onSubmit={(_c, meta) => {
              setMcqCorrect((prev) => {
                const next = [...prev];
                next[step] = meta.correct;
                return next;
              });
              log({
                type: "independent_response_submitted",
                itemId: current.id,
                itemFamily: current.family,
                objectiveId: current.objective,
                correct: meta.correct,
                assisted: false,
                misconception: !meta.correct ? current.misconception : undefined,
                skill: current.sciencePractice === 3 ? "argumentation" : "mathematical_execution",
              });
              if (step + 1 < items.length + DIAGNOSTIC_FRQS.length) setStep(step + 1);
            }}
          />
        ) : frq ? (
          <div className="space-y-3">
            <p className="text-sm font-medium">{frq.parts.map((p) => p.prompt).join(" ")}</p>
            <Textarea
              rows={8}
              value={written[frq.id] ?? ""}
              onChange={(e) => setWritten((w) => ({ ...w, [frq.id]: e.target.value }))}
              placeholder="Write in words and equations. Unreadable symbols will not be graded as if recognition were certain."
            />
            <Button
              disabled={(written[frq.id] ?? "").trim().length < 30}
              onClick={() => {
                log({
                  type: "frq_submitted",
                  itemId: frq.id,
                  objectiveId: frq.objective,
                  assisted: false,
                  notes: (written[frq.id] ?? "").slice(0, 400),
                  skill: "argumentation",
                });
                if (step + 1 < items.length + DIAGNOSTIC_FRQS.length) {
                  setStep(step + 1);
                } else {
                  finish([]);
                }
              }}
            >
              Submit written task
            </Button>
          </div>
        ) : (
          <Button onClick={() => finish([])}>See profile</Button>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
