"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recommendedTask } from "@/lib/planner";
import { useStudent } from "@/lib/store/student-store";

const STANDARD = [
  { id: "retrievalDone", minutes: 5, label: "Retrieval", href: "/notebook", copy: "One overdue error or a short delayed check. Not a new family clone." },
  { id: "instructionDone", minutes: 12, label: "Instruction", href: "/learn", copy: "Read the next lesson’s prediction and explanation. Video is optional." },
  { id: "applicationDone", minutes: 18, label: "Independent application", href: "/practice", copy: "Submit unaided items. Hints are allowed but will not mint independence." },
  { id: "errorReviewDone", minutes: 7, label: "Review one error", href: "/notebook", copy: "Repair the tagged misconception, then attempt the unseen retrieval item." },
  { id: "planDone", minutes: 3, label: "Plan the next action", href: "/plan", copy: "Confirm tomorrow’s first task and why it is next." },
] as const;

export default function SessionPage() {
  const { state, setState, loaded } = useStudent();
  const [now, setNow] = useState(Date.now());
  const next = recommendedTask(state.profile, state.events, state.completedLessons, state.mistakes);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const session = state.currentSession;
  const elapsed = session ? Math.max(0, Math.floor((now - session.startedAt) / 1000)) : 0;
  const target = session?.kind === "short" ? 20 * 60 : 45 * 60;
  const remaining = Math.max(0, target - elapsed);
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  const steps = useMemo(() => {
    if (session?.kind === "short") {
      return [
        STANDARD[0],
        { ...STANDARD[2], minutes: 10 },
        STANDARD[3],
        STANDARD[4],
      ];
    }
    return [...STANDARD];
  }, [session?.kind]);

  if (!loaded) return <p className="text-sm text-muted-foreground">Loading session…</p>;

  function start(kind: "standard" | "short") {
    setState((s) => ({
      ...s,
      currentSession: {
        id: crypto.randomUUID(),
        startedAt: Date.now(),
        kind,
        retrievalDone: false,
        instructionDone: false,
        applicationDone: false,
        errorReviewDone: false,
        planDone: false,
      },
    }));
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-navy">Daily session</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          A suggested 45-minute block is 5 minutes of retrieval, 12 of instruction, 18 of independent application, 7 reviewing one error, and 3 planning the next action. A shorter session keeps the plan; it does not skip repair forever. This timer is a pacing aid, not a speed leaderboard.
        </p>
      </div>

      {!session ? (
        <Card>
          <CardHeader>
            <CardTitle>Start a block</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              Recommended first task: <span className="font-medium">{next.title}</span>. {next.why}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => start("standard")}>Start 45-minute session</Button>
              <Button variant="outline" onClick={() => start("short")}>
                Shorter session (~20 min)
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-amber/40">
            <CardHeader>
              <CardTitle>
                {session.kind === "short" ? "Shorter session" : "45-minute session"} · {mm}:{ss} remaining
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Elapsed {Math.floor(elapsed / 60)} min. When the clock hits zero the plan still exists — finish the current step rather than racing.
            </CardContent>
          </Card>
          <ol className="space-y-3">
            {steps.map((step) => {
              const done = Boolean(session[step.id]);
              return (
                <li key={step.id}>
                  <Card>
                    <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-navy">
                          {step.label} · ~{step.minutes} min
                        </p>
                        <p className="text-sm text-muted-foreground">{step.copy}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" render={<Link href={step.href} />}>
                          Open
                        </Button>
                        <Button
                          size="sm"
                          variant={done ? "secondary" : "default"}
                          onClick={() =>
                            setState((s) =>
                              s.currentSession
                                ? { ...s, currentSession: { ...s.currentSession, [step.id]: true } }
                                : s,
                            )
                          }
                        >
                          {done ? "Done" : "Mark done"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ol>
          <Button
            variant="ghost"
            onClick={() => setState((s) => ({ ...s, currentSession: null }))}
          >
            End session
          </Button>
        </>
      )}
    </div>
  );
}
