"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { itemById } from "@/content/items";
import { McqCard } from "@/components/practice/McqCard";
import { addMistake, useStudent } from "@/lib/store/student-store";
import { Button } from "@/components/ui/button";

export default function PracticeItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = itemById(id);
  const { setState, log } = useStudent();
  if (!item) {
    return (
      <div className="space-y-3">
        <h1 className="font-heading text-2xl">Item not found</h1>
        <p className="text-sm text-muted-foreground">That practice id is not in the published bank.</p>
        <Button render={<Link href="/practice" />}>Back to practice</Button>
      </div>
    );
  }
  if (item.pool === "mock") notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {item.topic} · {item.pool} · family {item.family} · ~{item.expectedSeconds}s
      </p>
      <h1 className="font-heading text-2xl text-navy">Practice</h1>
      <McqCard
        item={item}
        mode="learning"
        onHint={() =>
          log({ type: "hint_opened", itemId: item.id, itemFamily: item.family, objectiveId: item.objective, assisted: true })
        }
        onSolution={() =>
          log({ type: "solution_viewed", itemId: item.id, itemFamily: item.family, objectiveId: item.objective, assisted: true })
        }
        onSubmit={(choice, meta) => {
          log({
            type: "independent_response_submitted",
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
              retrievalItemId: item.id,
            });
          }
        }}
      />
    </div>
  );
}
