"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { MOCK1_FRQS } from "@/content/mocks";
import { ACTIVE_EXAM_PROFILE } from "@/content/exam-profile";
import { apiFetch } from "@/lib/api";
import { RichText } from "@/components/math/RichText";
import { useStudent } from "@/lib/store/student-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MockResults({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { state, setState, loaded } = useStudent();
  const attempt = state.mockAttempts.filter((a) => a.formId === id && a.submittedAt).at(-1);
  const answers = attempt?.answers;
  const revision = attempt?.revision;
  const [detail, setDetail] = useState<{
    score: number;
    total: number;
    byUnit: Record<string, { c: number; n: number }>;
    items: { id: string; correct: boolean; picked?: string; key: string; explanation: string }[];
  } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!answers) return;
    apiFetch(`/api/mocks/${id}/grade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, revision, review: true }),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("Could not load review.");
        setDetail(await r.json());
      })
      .catch((e: Error) => setLoadError(e.message));
  }, [answers, revision, id]);

  if (!loaded) return <p>Restoring results…</p>;

  if (!attempt) {
    return (
      <div className="space-y-3">
        <p>No submitted attempt for this form.</p>
        <Button render={<Link href="/mocks" />}>Mock lobby</Button>
      </div>
    );
  }

  const conf = attempt.confidenceAfter;
  const rubric = MOCK1_FRQS.flatMap((f) => f.rubric.map((r) => ({ ...r, key: `${f.id}:${r.id}` })));
  const complete = rubric.every((r) => typeof attempt.selfRubric?.[r.key] === "boolean");
  const frqScore = rubric.reduce((n, r) => n + (attempt.selfRubric?.[r.key] ? r.points : 0), 0);
  const frqMax = MOCK1_FRQS.reduce((n, f) => n + f.totalPoints, 0);
  const composite = complete && attempt.mcqScore !== undefined && attempt.mcqTotal
    ? 100 * (ACTIVE_EXAM_PROFILE.mcqWeight * attempt.mcqScore / attempt.mcqTotal + ACTIVE_EXAM_PROFILE.frqWeight * frqScore / frqMax) : null;
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
        <CardHeader><CardTitle>FRQ self-review</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>Mark each criterion earned or not earned. Each criterion is all-or-nothing.</p>
          {(id.endsWith("2") ? [...MOCK1_FRQS].reverse() : MOCK1_FRQS).map((f, i) => <section key={f.id} className="space-y-2">
            <h2 className="font-semibold">Question {i + 1} ({f.totalPoints} points)</h2>
            <p><strong>Your response:</strong> {attempt.frqText[f.id] || "No typed response"}</p>
            <p><strong>Model solution:</strong> <RichText text={f.modelSolution} /></p>
            {f.rubric.map((r) => {
              const key = `${f.id}:${r.id}`;
              return <fieldset key={key} className="rounded border p-2">
                <legend><RichText text={r.earns} /> ({r.points} points)</legend>
                {([true, false] as const).map((earned) => <label key={String(earned)} className="mr-4">
                  <input type="radio" name={key} checked={attempt.selfRubric?.[key] === earned} onChange={() => setState((s) => ({ ...s, mockAttempts: s.mockAttempts.map((a) => {
                    if (a.id !== attempt.id) return a;
                    const selfRubric = { ...a.selfRubric, [key]: earned };
                    return { ...a, selfRubric, frqStatus: rubric.every((entry) => typeof selfRubric[entry.key] === "boolean") ? "self_reviewed" : "submitted" };
                  }) }))} /> {earned ? "Earned" : "Not earned"}
                </label>)}
              </fieldset>;
            })}
          </section>)}
          <p>{complete ? `FRQ self-score: ${frqScore} / ${frqMax}. Weighted composite: ${composite?.toFixed(1)}% (50% MCQ, 50% FRQ).` : "FRQ self-score and weighted composite pending until every criterion is reviewed."}</p>
        </CardContent>
      </Card>
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
