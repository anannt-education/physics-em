"use client";

import Link from "next/link";
import { LESSONS } from "@/content/lessons";
import { TOPICS, UNITS } from "@/content/curriculum";
import { useStudent } from "@/lib/store/student-store";
import { masteryForObjective, coverageLabel } from "@/lib/mastery";
import { MasteryChip } from "@/components/Framework";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LearnIndexPage() {
  const { state } = useStudent();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-navy">Learn</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Official numbering 8–13 is preserved. Friendly modules sit beside CED topic identifiers. Enrichment is marked and excluded from readiness. Coverage is objective evidence, not videos watched.
        </p>
      </div>
      {UNITS.map((unit) => {
        const topics = TOPICS.filter((t) => t.unit === unit.id);
        const lessons = LESSONS.filter((l) => l.unit === unit.id);
        return (
          <section key={String(unit.id)} className="space-y-3">
            <h2 className="font-heading text-xl text-navy">
              {unit.official}: {unit.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {unit.summary} MCQ weighting {unit.mcqWeight}.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {lessons.map((lesson) => {
                const m = masteryForObjective(state.events, lesson.objectives[0]);
                const topic = topics.find((t) => lesson.topics.includes(t.id));
                return (
                  <Card key={lesson.id}>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <Link href={`/learn/${lesson.slug}`} className="hover:underline">
                          {lesson.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        {topic?.id} · {lesson.minutes[0]}–{lesson.minutes[1]} min · {coverageLabel(m.state)}
                      </p>
                      <MasteryChip state={m.state} />
                      {lesson.enrichment ? <p className="text-xs text-amber">Enrichment — excluded from readiness.</p> : null}
                      <p className="text-xs">Prereqs: {lesson.prereqs.length ? lesson.prereqs.join(", ") : "none"}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
