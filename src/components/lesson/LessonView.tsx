"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Lesson } from "@/lib/types";
import { FrameworkStrip } from "@/components/Framework";
import { IssueButton } from "@/components/IssueButton";
import { RichText } from "@/components/math/RichText";
import { McqCard } from "@/components/practice/McqCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { itemById } from "@/content/items";
import { lessonById } from "@/content/lessons";
import { addMistake, useStudent } from "@/lib/store/student-store";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function LessonView({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const { state, setState, log } = useStudent();
  const [pred, setPred] = useState<string>();
  const [predDone, setPredDone] = useState(false);
  const [faded, setFaded] = useState(0);
  const [rep, setRep] = useState("");
  const [repDone, setRepDone] = useState(false);
  const [independentDone, setIndependentDone] = useState(false);

  const items = useMemo(
    () => lesson.independentItemIds.map(itemById).filter((i): i is NonNullable<typeof i> => Boolean(i)),
    [lesson.independentItemIds],
  );

  useEffect(() => {
    if (!state.events.some((e) => e.lessonId === lesson.id && e.type === "lesson_started")) {
      log({ type: "lesson_started", lessonId: lesson.id, objectiveId: lesson.objectives[0], assisted: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- log once on mount
  }, [lesson.id]);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          {lesson.unit === "bridge" ? "Bridge" : `Unit ${lesson.unit}`} · {lesson.topics.join(", ")} · {lesson.minutes[0]}–{lesson.minutes[1]} min
        </p>
        <h1 className="font-heading text-3xl font-semibold text-navy">{lesson.title}</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">You will be able to: </span>
          {lesson.capability}
        </p>
        {lesson.prereqs.length ? (
          <p className="text-sm">
            Prerequisites:{" "}
            {lesson.prereqs.map((p) => {
              const pre = lessonById(p);
              return (
                <Link key={p} href={pre ? `/learn/${pre.slug}` : "/learn"} className="mr-2 underline-offset-2 hover:underline">
                  {pre?.title ?? p}
                </Link>
              );
            })}
            — recommended, not a permanent lock.
          </p>
        ) : null}
        <FrameworkStrip />
        <p className="text-[0.7rem] text-muted-foreground">
          Reviewed {lesson.reviewDate} · v{lesson.version} · {lesson.authors.map((a) => `${a.name} (${a.role})`).join(" · ")} · Video is never required for mastery.
        </p>
        <IssueButton targetType="lesson" targetId={lesson.id} />
      </header>

      <Card>
        <CardHeader>
          <CardTitle>1. Predict before the explanation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            <RichText text={lesson.prediction.prompt} />
          </p>
          <div className="grid gap-2">
            {lesson.prediction.choices.map((c) => (
              <Button
                key={c.id}
                variant={pred === c.id ? "default" : "outline"}
                className="h-auto justify-start whitespace-normal py-2 text-left"
                disabled={predDone}
                onClick={() => setPred(c.id)}
              >
                <span className="mr-2 font-medium">{c.id}.</span>
                <RichText text={c.text} />
              </Button>
            ))}
          </div>
          {!predDone ? (
            <Button
              disabled={!pred}
              onClick={() => {
                setPredDone(true);
                const choice = lesson.prediction.choices.find((c) => c.id === pred);
                log({
                  type: "lesson_prediction",
                  lessonId: lesson.id,
                  objectiveId: lesson.objectives[0],
                  correct: Boolean(choice?.correct),
                  assisted: false,
                  misconception: choice?.misconception,
                });
              }}
            >
              Lock prediction
            </Button>
          ) : (
            <div className="rounded-md bg-muted/50 p-3 text-sm">
              <RichText text={lesson.prediction.explanation} />
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="font-heading text-xl">2. Explanation (text route)</h2>
        <p className="text-sm text-muted-foreground">{lesson.videoAlt}</p>
        <Accordion multiple defaultValue={["model"]}>
          {(
            [
              ["model", "Model", lesson.explanation.model],
              ["represent", "Represent", lesson.explanation.represent],
              ["derive", "Derive", lesson.explanation.derive],
              ["check", "Check", lesson.explanation.check],
              ["explain", "Explain", lesson.explanation.explain],
            ] as const
          ).map(([id, title, body]) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed">
                  <RichText text={body} />
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl">3. Worked example</h2>
        <Card>
          <CardHeader>
            <CardTitle>{lesson.workedExample.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed">
            <p>
              <span className="font-medium">Situation. </span>
              <RichText text={lesson.workedExample.situation} />
            </p>
            <p>
              <span className="font-medium">Assumptions. </span>
              {lesson.workedExample.assumptions.join(" ")}
            </p>
            <p>
              <span className="font-medium">Derivation. </span>
              <RichText text={lesson.workedExample.derivation} />
            </p>
            <p>
              <span className="font-medium">Units. </span>
              {lesson.workedExample.units}
            </p>
            <p>
              <span className="font-medium">Interpretation. </span>
              <RichText text={lesson.workedExample.interpretation} />
            </p>
            <p>
              <span className="font-medium">Why tempting alternatives fail. </span>
              <RichText text={lesson.workedExample.whyAlternativesFail} />
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl">4. Faded example</h2>
        <p className="text-sm">
          <RichText text={lesson.fadedExample.situation} />
        </p>
        {lesson.fadedExample.steps.map((step, i) => (
          <Card key={i} className={i > faded ? "opacity-60" : undefined}>
            <CardContent className="space-y-2 pt-4 text-sm">
              <p>
                <RichText text={step.prompt} />
              </p>
              {i <= faded ? (
                <>
                  <p className="text-muted-foreground">
                    Hint: <RichText text={step.hint} />
                  </p>
                  <p>
                    <RichText text={step.expected} />
                  </p>
                  {i === faded && faded < lesson.fadedExample.steps.length - 1 ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setFaded(i + 1);
                        if (i + 1 === lesson.fadedExample.steps.length - 1) {
                          setState((s) => ({
                            ...s,
                            fadedCompleted: Array.from(new Set([...s.fadedCompleted, lesson.id])),
                          }));
                        }
                      }}
                    >
                      Next step (fewer hints)
                    </Button>
                  ) : null}
                </>
              ) : (
                <p className="text-muted-foreground">Complete the previous step first.</p>
              )}
            </CardContent>
          </Card>
        ))}
      </section>

      {lesson.representationTask ? (
        <section className="space-y-3">
          <h2 className="font-heading text-xl">5. Representation task</h2>
          <p className="text-sm">
            <RichText text={lesson.representationTask.prompt} />
          </p>
          <Textarea rows={5} value={rep} onChange={(e) => setRep(e.target.value)} placeholder="Describe your diagram, graph, or reasoning in words. This counts toward independence; video does not." />
          {!repDone ? (
            <Button
              disabled={rep.trim().length < 20}
              onClick={() => {
                setRepDone(true);
                log({
                  type: "representation_submitted",
                  lessonId: lesson.id,
                  objectiveId: lesson.objectives[0],
                  assisted: false,
                  notes: rep.slice(0, 500),
                  skill: "representations",
                });
              }}
            >
              Submit representation
            </Button>
          ) : (
            <div className="rounded-md bg-muted/50 p-3 text-sm">
              <p className="font-medium">What a complete response includes</p>
              <p>
                <RichText text={lesson.representationTask.expected} />
              </p>
            </div>
          )}
        </section>
      ) : null}

      <section className="space-y-4">
        <h2 className="font-heading text-xl">6. Independent questions (different situations)</h2>
        <p className="text-sm text-muted-foreground">
          These submissions are required for evidence. Watching or reading the explanation does not advance mastery.
        </p>
        {items.length === 0 ? (
          <p className="text-sm text-destructive">No published items linked — coverage gap. This lesson cannot carry a complete-course label until items exist.</p>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-4">
                <McqCard
                  item={item}
                  mode="learning"
                  onHint={() =>
                    log({
                      type: "hint_opened",
                      lessonId: lesson.id,
                      itemId: item.id,
                      itemFamily: item.family,
                      objectiveId: item.objective,
                      assisted: true,
                    })
                  }
                  onSolution={() =>
                    log({
                      type: "solution_viewed",
                      lessonId: lesson.id,
                      itemId: item.id,
                      itemFamily: item.family,
                      objectiveId: item.objective,
                      assisted: true,
                    })
                  }
                  onSubmit={(choice, meta) => {
                    log({
                      type: "independent_response_submitted",
                      lessonId: lesson.id,
                      itemId: item.id,
                      itemFamily: item.family,
                      objectiveId: item.objective,
                      correct: meta.correct,
                      assisted: meta.assisted,
                      misconception: !meta.correct ? item.misconception : undefined,
                      skill: "mathematical_execution",
                    });
                    if (!meta.correct) {
                      addMistake(setState, {
                        itemId: item.id,
                        family: item.family,
                        objectiveId: item.objective,
                        misconception: item.misconception,
                        studentAnswer: choice,
                        retrievalItemId: lesson.retrievalItemId ?? item.id,
                      });
                      if (item.misconception) {
                        log({
                          type: "misconception_tagged",
                          lessonId: lesson.id,
                          itemId: item.id,
                          objectiveId: item.objective,
                          misconception: item.misconception,
                          assisted: meta.assisted,
                        });
                      }
                    }
                    setIndependentDone(true);
                  }}
                />
              </CardContent>
            </Card>
          ))
        )}
      </section>

      {lesson.investigationId ? (
        <p className="text-sm">
          Related investigation:{" "}
          <Link className="underline-offset-2 hover:underline" href={`/investigations/${lesson.investigationId}`}>
            open the lab
          </Link>
          . Simulations are labelled as simulations.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => {
            if (!independentDone && items.length) {
              return;
            }
            setState((s) => ({
              ...s,
              completedLessons: Array.from(new Set([...s.completedLessons, lesson.id])),
            }));
            router.push("/plan");
          }}
          disabled={!independentDone && items.length > 0}
        >
          Mark lesson reading complete (mastery still requires independent evidence)
        </Button>
        <Button variant="outline" onClick={() => router.push("/plan")}>
          Back to plan
        </Button>
      </div>
    </div>
  );
}
