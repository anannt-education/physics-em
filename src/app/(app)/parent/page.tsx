"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/lib/store/student-store";
import { recommendedTask } from "@/lib/planner";
import { allObjectiveMastery, skillScores } from "@/lib/mastery";
import { MasteryChip } from "@/components/Framework";
import { SKILL_TRACKS } from "@/content/curriculum";

export default function ParentPage() {
  const { state, loaded } = useStudent();

  if (!loaded) return <p className="text-sm text-muted-foreground">Loading guardian summary…</p>;
  if (!state.profile) {
    return (
      <div className="space-y-3">
        <h1 className="font-heading text-3xl text-navy">Guardian summary</h1>
        <p className="text-sm">No authorised learner on this device. Completing onboarding creates the profile this page is allowed to show.</p>
        <Button render={<Link href="/onboarding" />}>Onboarding</Button>
      </div>
    );
  }

  const next = recommendedTask(state.profile, state.events, state.completedLessons, state.mistakes);
  const mastery = allObjectiveMastery(state.events);
  const skills = skillScores(state.events);
  const openMistakes = state.mistakes.filter((m) => !m.repaired).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-navy">Guardian summary</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Only agreed progress fields are shown: next action, evidence states, and skill-track counts. Raw student writing and uploads are omitted. In a hosted product this page would require an authorised guardian link (PAR-01). This local build is bound to the learner stored on the device.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{state.profile.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>Intended sitting: May {state.profile.examYear}. Pathway template: {state.profile.pathway}. Timezone: {state.profile.timezone}.</p>
          <p>
            Next action: <span className="font-medium">{next.title}</span> ({next.minutes[0]}–{next.minutes[1]} min). {next.why}
          </p>
          <Button size="sm" render={<Link href={next.href} />}>
            Open that task (student)
          </Button>
        </CardContent>
      </Card>

      {state.profile.diagnosticSummary ? (
        <Card>
          <CardHeader>
            <CardTitle>Diagnostic reading</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">{state.profile.diagnosticSummary}</CardContent>
        </Card>
      ) : (
        <p className="text-sm text-muted-foreground">Diagnostic not yet completed — no scare-story risk language is shown in its place.</p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>What they can do independently</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            {mastery.filter((m) => m.state === "independent" || m.state === "retained").length} objectives at independent or retained.{" "}
            {mastery.filter((m) => m.state === "needs_review").length} need review. {openMistakes} unrepaired notebook entries.
          </p>
          <p className="text-xs text-muted-foreground">
            Completion percentages of videos watched are not used. This is not an official AP 1–5. Using Anannt does not register the student for the exam.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {mastery
              .filter((m) => m.state !== "not_assessed")
              .slice(0, 10)
              .map((m) => (
                <li key={m.objectiveId} className="flex items-center justify-between gap-2">
                  <span>{m.objectiveId}</span>
                  <MasteryChip state={m.state} />
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill tracks (counts only)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2 text-sm">
          {SKILL_TRACKS.map((s) => (
            <p key={s.id}>
              {s.label}: {skills[s.id].n === 0 ? "not assessed" : `${skills[s.id].correct}/${skills[s.id].n} unaided`}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
