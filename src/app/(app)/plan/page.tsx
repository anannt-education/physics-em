"use client";

import Link from "next/link";
import { recommendedTask, PATHWAYS, weeklyLoadHours } from "@/lib/planner";
import { useStudent } from "@/lib/store/student-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FrameworkStrip } from "@/components/Framework";
import { LESSONS } from "@/content/lessons";
import { MasteryChip } from "@/components/Framework";
import { masteryForObjective } from "@/lib/mastery";

export default function PlanPage() {
  const { state, loaded } = useStudent();
  if (!loaded) {
    return <p className="text-sm text-muted-foreground">Loading your plan…</p>;
  }
  if (!state.profile) {
    return (
      <div className="space-y-3">
        <h1 className="font-heading text-3xl text-navy">My Plan</h1>
        <p className="text-sm">No learner profile on this device yet.</p>
        <Button render={<Link href="/onboarding" />}>Start onboarding</Button>
      </div>
    );
  }

  const task = recommendedTask(state.profile, state.events, state.completedLessons, state.mistakes);
  const [lo, hi] = weeklyLoadHours(state.profile.weeklyHours);
  const remainingLessons = LESSONS.filter((l) => !state.completedLessons.includes(l.id));
  const remainingMin = remainingLessons.reduce((acc, l) => acc + (l.minutes[0] + l.minutes[1]) / 2, 0);
  const weeks = PATHWAYS[state.profile.pathway].weeks;
  const available = state.profile.weeklyHours * 60 * weeks;
  const gap = remainingMin - available;
  const nextLesson = remainingLessons[0];
  const obj = nextLesson ? masteryForObjective(state.events, nextLesson.objectives[0]) : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-navy">My Plan</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {state.profile.name} · {PATHWAYS[state.profile.pathway].title} · {lo}–{hi} h/week (range, not a promise) · {state.profile.timezone}
        </p>
      </div>

      <Card className="border-amber/40">
        <CardHeader>
          <CardTitle>Start here</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="font-heading text-xl text-navy">{task.title}</p>
          <p className="text-sm leading-relaxed">{task.why}</p>
          <p className="text-xs text-muted-foreground">
            About {task.minutes[0]}–{task.minutes[1]} minutes. A 45-minute session is 5 retrieval / 12 instruction / 18 application / 7 error / 3 next action — or pick a shorter session in Session.
          </p>
          <Button render={<Link href={task.href} />}>Open recommended task</Button>
          <Button variant="outline" render={<Link href="/session" />}>
            Shorter session
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
      ) : null}

      {gap > 120 ? (
        <Card>
          <CardHeader>
            <CardTitle>Honest shortfall</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Remaining lesson time is about {Math.round(remainingMin / 60)} hours of instruction-plus-practice. Your template supplies about {Math.round(available / 60)} hours. The shortfall is real. Priority: overdue retrieval, Unit 8 field/flux, then high-weight Unit 11, then mocks. This is not a claim that you will finish.
          </CardContent>
        </Card>
      ) : null}

      <FrameworkStrip />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Due and overdue</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {state.mistakes.filter((m) => !m.repaired).length === 0 ? (
              <p className="text-muted-foreground">No open repair items. Errors will appear here after a scored miss.</p>
            ) : (
              <ul className="list-disc pl-4">
                {state.mistakes
                  .filter((m) => !m.repaired)
                  .map((m) => (
                    <li key={m.id}>
                      {m.misconception ?? m.family} ·{" "}
                      <Link className="underline-offset-2 hover:underline" href="/notebook">
                        notebook
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Evidence, not completion bars</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {obj ? (
              <p>
                Next lesson objective: <MasteryChip state={obj.state} /> — {obj.reason}
              </p>
            ) : (
              <p>Syllabus lessons introduced. Mixed practice and mocks are in front.</p>
            )}
            <p className="text-muted-foreground">
              {state.completedLessons.length} lessons opened · {state.events.filter((e) => e.type === "independent_response_submitted" && !e.assisted).length} unaided submissions
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
