"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useStudent } from "@/lib/store/student-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MockResults({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { state, setState } = useStudent();
  const attempt = state.mockAttempts.filter((a) => a.formId === id && a.submittedAt).at(-1);
  const [detail, setDetail] = useState<{
    score: number;
    total: number;
    byUnit: Record<string, { c: number; n: number }>;
    items: { id: string; correct: boolean; picked?: string; key: string; explanation: string }[];
  } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!attempt) return;
    fetch(`/api/mocks/${id}/grade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: attempt.answers, revision: attempt.revision, review: true }),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("Could not load review.");
        setDetail(await r.json());
      })
      .catch((e: Error) => setLoadError(e.message));
  }, [attempt, id]);

  if (!attempt) {
    return (
      <div className="space-y-3">
        <p>No submitted attempt for this form.</p>
        <Button render={<Link href="/mocks" />}>Mock lobby</Button>
      </div>
    );
  }

  const conf = attempt.confidenceAfter;
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl text-navy">Results</h1>
      <p className="text-sm text-muted-foreground">
        Raw MCQ: {attempt.mcqScore ?? "pending"} / {attempt.mcqTotal ?? 42}. FRQ status: {attempt.frqStatus.replaceAll("_", " ")} — pending written work is not scored as zero.
      </p>
      {loadError ? <p className="text-sm text-destructive">{loadError}</p> : null}
      {!detail && !loadError ? <p className="text-sm text-muted-foreground">Loading review…</p> : null}
      {detail ? (
        <Card>
          <CardHeader>
            <CardTitle>MCQ by unit</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {Object.entries(detail.byUnit).map(([u, v]) => (
              <p key={u}>
                Unit {u}: {v.c}/{v.n}
              </p>
            ))}
          </CardContent>
        </Card>
      ) : null}
      <Card>
        <CardHeader>
          <CardTitle>Three repair actions</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <p>1. Open the mistake notebook for any tagged misconception (flux vs field is the signature one).</p>
          <p>2. Sit a delayed retrieval item — not a clone of a missed family.</p>
          <p>3. Complete FRQ self-review against the rubric; request instructor marking only if your entitlement includes it.</p>
        </CardContent>
      </Card>
      <p className="text-sm">
        Anannt readiness: {detail && detail.score / detail.total > 0.75 && attempt.frqStatus !== "not_started" ? "provisional — still insufficient FRQ evidence for a band" : "insufficient evidence for a readiness band"}. No 1–5 conversion is offered.
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => {
            const n = window.prompt("Confidence after (1–5), distinct from competence", String(conf ?? 3));
            if (!n) return;
            setState((s) => ({
              ...s,
              mockAttempts: s.mockAttempts.map((a) => (a.id === attempt.id ? { ...a, confidenceAfter: Number(n) } : a)),
            }));
          }}
        >
          Log post-mock confidence
        </Button>
        <Button render={<Link href="/notebook" />}>Mistake notebook</Button>
      </div>
    </div>
  );
}
