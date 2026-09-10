"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { McqCard } from "@/components/practice/McqCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { itemById } from "@/content/items";
import { LESSONS } from "@/content/lessons";
import { SIGNATURE_RESOURCES } from "@/content/resources";
import { useStudent } from "@/lib/store/student-store";

export default function NotebookPage() {
  const { state, setState, log, loaded } = useStudent();
  const [activeId, setActiveId] = useState<string | null>(null);

  const open = useMemo(
    () => state.mistakes.filter((m) => !m.repaired || (m.retrievalDueAt <= Date.now() && !m.retrievalCorrect)),
    [state.mistakes],
  );
  const repaired = state.mistakes.filter((m) => m.repaired);
  const active = state.mistakes.find((m) => m.id === (activeId ?? open[0]?.id));
  const retrieval = active ? itemById(active.retrievalItemId) : undefined;
  const original = active ? itemById(active.itemId) : undefined;
  const lesson = LESSONS.find((l) => l.objectives.includes(active?.objectiveId ?? ""));
  const atlas = SIGNATURE_RESOURCES.find((r) => r.slug === "error-atlas");

  if (!loaded) return <p className="text-sm text-muted-foreground">Loading the notebook…</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-navy">Mistake notebook</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          A scored error creates a linked repair and an unseen retrieval item from a different family. Replaying the explanation does not restore independence. After two unsuccessful repairs, change representation and consider expert escalation.
        </p>
      </div>

      {!open.length ? (
        <Card>
          <CardContent className="pt-6 text-sm">
            {state.mistakes.length === 0
              ? "No scored misses on this device yet. Independent practice will land errors here instead of burying them in a percentage."
              : "Nothing is due. Repaired items wait for their 7–14 day retrieval window."}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
          <ul className="space-y-2">
            {open.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(m.id)}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-left text-sm hover:border-navy"
                >
                  <p className="font-medium text-navy">{m.objectiveId}</p>
                  <p className="text-xs text-muted-foreground">
                    {m.misconception ?? "untagged"} · {m.repaired ? "retrieval due" : "needs repair"}
                  </p>
                </button>
              </li>
            ))}
          </ul>
          {active ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Repair, then retrieve</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-relaxed">
                  <p>
                    You answered {active.studentAnswer} on item {active.itemId} (family {active.family}).
                    {original?.misconception
                      ? ` Tagged misconception: ${original.misconception}.`
                      : ""}
                  </p>
                  {original?.explanation ? (
                    <p>
                      Original item’s physics, for repair — this is learning evidence, not a second independent mark: {original.explanation.replace(/\$/g, "")}
                    </p>
                  ) : null}
                  <p>
                    Compare field and flux (or the analogous pair for this objective) in words before you touch the retrieval item. A uniform-field closed surface has zero net flux and nonzero $E$. An external charge does the same. That is the comparison the flux misconception requires.
                  </p>
                  {lesson ? (
                    <p>
                      Approved lesson:{" "}
                      <Link className="underline-offset-2 hover:underline" href={`/learn/${lesson.slug}`}>
                        {lesson.title}
                      </Link>
                    </p>
                  ) : null}
                  <p>
                    Atlas:{" "}
                    <Link className="underline-offset-2 hover:underline" href="/resources/error-atlas">
                      {atlas?.title}
                    </Link>
                  </p>
                </CardContent>
              </Card>
              {retrieval ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Unseen retrieval</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 text-xs text-muted-foreground">
                      Family {retrieval.family} — not a clone of {active.family}. Hints keep this as learning evidence.
                    </p>
                    <McqCard
                      key={active.id + retrieval.id}
                      item={retrieval}
                      mode="learning"
                      onHint={() =>
                        log({
                          type: "hint_opened",
                          itemId: retrieval.id,
                          itemFamily: retrieval.family,
                          objectiveId: retrieval.objective,
                          assisted: true,
                        })
                      }
                      onSubmit={(choice, meta) => {
                        log({
                          type: "independent_response_submitted",
                          itemId: retrieval.id,
                          itemFamily: retrieval.family,
                          objectiveId: retrieval.objective,
                          correct: meta.correct,
                          assisted: meta.assisted,
                          skill: "argumentation",
                        });
                        setState((s) => ({
                          ...s,
                          mistakes: s.mistakes.map((m) =>
                            m.id === active.id
                              ? {
                                  ...m,
                                  repaired: true,
                                  retrievalAttempted: true,
                                  retrievalCorrect: meta.correct && !meta.assisted,
                                  retrievalDueAt: Date.now() + 14 * 86400000,
                                }
                              : m,
                          ),
                        }));
                        if (meta.correct) {
                          log({
                            type: "review_completed",
                            itemId: retrieval.id,
                            objectiveId: retrieval.objective,
                            assisted: meta.assisted,
                            correct: true,
                          });
                        }
                        void choice;
                      }}
                    />
                  </CardContent>
                </Card>
              ) : (
                <p className="text-sm text-destructive">
                  Retrieval item {active.retrievalItemId} is missing from the published bank — coverage gap.
                </p>
              )}
              <Button variant="outline" render={<Link href="/expert" />}>
                Escalate after two failed repairs
              </Button>
            </div>
          ) : null}
        </div>
      )}

      {repaired.length ? (
        <section>
          <h2 className="font-heading text-xl">Repaired, awaiting later check</h2>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {repaired.map((m) => (
              <li key={m.id}>
                {m.objectiveId} · next retrieval {new Date(m.retrievalDueAt).toLocaleDateString()} ·
                {m.retrievalCorrect ? " last unseen check correct (unaided only if no hint)" : " not yet retained"}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
