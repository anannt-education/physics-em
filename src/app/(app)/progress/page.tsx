"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MasteryChip } from "@/components/Framework";
import { SKILL_TRACKS, TOPICS, UNITS } from "@/content/curriculum";
import { LESSONS } from "@/content/lessons";
import { allObjectiveMastery, skillScores } from "@/lib/mastery";
import { recommendedTask } from "@/lib/planner";
import { setEntitlement, useStudent } from "@/lib/store/student-store";
import type { Entitlement } from "@/lib/types";

const TIERS: { tier: Entitlement["tier"]; label: string; detail: string; mocks: number; reviews: number }[] = [
  { tier: "free", label: "Free diagnostic", detail: "Diagnostic, one sample learning path, and a gap report. Not a complete course.", mocks: 0, reviews: 0 },
  { tier: "core", label: "Core", detail: "Full curriculum, approved hints, practice, revision, and four mocks with labelled self-review.", mocks: 4, reviews: 0 },
  { tier: "reviewed", label: "Reviewed", detail: "Core plus a defined instructor-marking allowance. Queue is bounded; this is not unlimited expert review.", mocks: 4, reviews: 12 },
];

export default function ProgressPage() {
  const { state, setState, loaded, reset, loadSample } = useStudent();
  const mastery = useMemo(() => allObjectiveMastery(state.events), [state.events]);
  const skills = useMemo(() => skillScores(state.events), [state.events]);
  const next = recommendedTask(state.profile, state.events, state.completedLessons, state.mistakes);

  const independent = mastery.filter((m) => m.state === "independent" || m.state === "retained").length;
  const sparse = mastery.filter((m) => m.state === "not_assessed" || m.state === "provisional").length;
  const assistedOnly = state.events.filter((e) => e.assisted && e.type === "independent_response_submitted").length;
  const unaided = state.events.filter((e) => !e.assisted && e.type === "independent_response_submitted").length;

  if (!loaded) return <p className="text-sm text-muted-foreground">Loading evidence…</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-navy">Progress</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Separate concept and practice evidence. Video completion is not shown as mastery. Anannt does not convert uncalibrated percentages into official 1–5 scores. If evidence is thin, the readiness conclusion is withheld.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Readiness band (Anannt, not College Board)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {unaided < 10 ? (
            <p>
              Insufficient evidence for a readiness conclusion. {unaided} unaided scored responses and {assistedOnly} hint- or solution-assisted attempts are on file. Assisted work remains learning evidence.
            </p>
          ) : independent < 8 ? (
            <p>
              Emerging syllabus coverage. {independent} objectives meet the independent rule (10 unaided items, two sessions, six families, a representation task, ≥80%). That is not an AP score prediction.
            </p>
          ) : (
            <p>
              Substantial independent evidence on {independent} objectives. Still not a 1–5 conversion. Timed mocks and delayed retrieval remain required before any stronger claim.
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Next recommended task: {next.title} — {next.why}{" "}
            <Link className="underline-offset-2 hover:underline" href={next.href}>
              Open
            </Link>
          </p>
        </CardContent>
      </Card>

      <section>
        <h2 className="font-heading text-xl">Skill tracks</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Science practices stay 1–3. These six tracks are Anannt product skills. FRQ categories are a separate field.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_TRACKS.map((s) => {
            const row = skills[s.id];
            return (
              <Card key={s.id}>
                <CardHeader>
                  <CardTitle className="text-base">{s.label}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  {row.n === 0 ? (
                    <p className="text-muted-foreground">Not assessed.</p>
                  ) : (
                    <p>
                      {row.correct}/{row.n} unaided.{" "}
                      {row.n < 4 ? "Provisional — sparse." : null}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-xl">Objective evidence</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {sparse} objectives remain not assessed or provisional. Coverage is not “percent of lessons opened.”
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2 pr-3">Objective</th>
                <th className="py-2 pr-3">Topic</th>
                <th className="py-2 pr-3">State</th>
                <th className="py-2 pr-3">Unaided</th>
                <th className="py-2">Why</th>
              </tr>
            </thead>
            <tbody>
              {mastery.map((m) => {
                const topic = TOPICS.find((t) => t.objectiveIds.includes(m.objectiveId) || t.id === m.objectiveId.split(".").slice(0, 2).join("."));
                const unit = UNITS.find((u) => u.id === topic?.unit);
                return (
                  <tr key={m.objectiveId} className="border-b border-border/60 align-top">
                    <td className="py-2 pr-3 font-medium">{m.objectiveId}</td>
                    <td className="py-2 pr-3 text-muted-foreground">
                      {unit?.official} {topic?.title}
                    </td>
                    <td className="py-2 pr-3">
                      <MasteryChip state={m.state} />
                    </td>
                    <td className="py-2 pr-3">
                      {m.correctUnaided}/{m.scored} · {m.families} families
                    </td>
                    <td className="py-2 text-xs text-muted-foreground">{m.reason}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Entitlement (demo)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            Current tier: <span className="font-medium">{state.entitlement.tier}</span>. Changing tier updates access and does not delete learning history (PAY-01). There is no live payment processor in this build — this switcher stands in for an idempotent entitlement event.
          </p>
          <div className="flex flex-wrap gap-2">
            {TIERS.map((t) => (
              <Button
                key={t.tier}
                variant={state.entitlement.tier === t.tier ? "default" : "outline"}
                onClick={() =>
                  setEntitlement(setState, {
                    tier: t.tier,
                    mocksIncluded: t.mocks,
                    frqReviewsRemaining: t.reviews,
                  })
                }
              >
                {t.label}
              </Button>
            ))}
          </div>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            {TIERS.map((t) => (
              <li key={t.tier}>
                {t.label}: {t.detail}
              </li>
            ))}
          </ul>
          <p>
            Instructor FRQ reviews remaining: {state.entitlement.frqReviewsRemaining}. Mock sittings included: {state.entitlement.mocksIncluded}.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => loadSample()}>
              Load sample learner
            </Button>
            <Button variant="ghost" onClick={() => reset()}>
              Reset this device
            </Button>
            <Button variant="outline" render={<Link href="/parent" />}>
              Guardian view of the same evidence
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Lessons completed as reading: {state.completedLessons.length} of {LESSONS.length}. Reading is not independence.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
