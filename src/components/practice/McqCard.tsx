"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RichText } from "@/components/math/RichText";
import { IssueButton } from "@/components/IssueButton";
import type { McqItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const HINTS = [
  "Clarify the physical situation: what objects, what is given, what is asked, and what is idealised?",
  "Identify a representation: sketch, coordinates, graph, or circuit map.",
  "Identify a principle: Coulomb, superposition, Gauss, energy, Kirchhoff, Faraday…",
  "Suggest the next mathematical step — do not jump to the boxed answer yet.",
];

export function McqCard({
  item,
  mode,
  onSubmit,
  onHint,
  onSolution,
}: {
  item: McqItem;
  mode: "learning" | "assessment" | "exam";
  onSubmit: (choice: string, meta: { correct: boolean; assisted: boolean; hintLevel: number; solutionViewed: boolean }) => void;
  onHint?: () => void;
  onSolution?: () => void;
}) {
  const [choice, setChoice] = useState<string>();
  const [hintLevel, setHintLevel] = useState(0);
  const [solutionViewed, setSolutionViewed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canReveal = mode === "learning" && submitted;
  const correct = item.correct;

  const result = useMemo(() => {
    if (!submitted || !choice || !correct) return null;
    return choice === correct;
  }, [submitted, choice, correct]);

  return (
    <article className="space-y-4">
      {item.stimulus ? (
        <div className="rounded-lg bg-muted/60 px-3 py-2 text-sm">
          <RichText text={item.stimulus} />
        </div>
      ) : null}
      <p className="text-[0.95rem] leading-relaxed">
        <RichText text={item.stem} />
      </p>
      <RadioGroup
        value={choice}
        onValueChange={(v) => {
          if (!submitted) setChoice(String(v));
        }}
        disabled={submitted && mode !== "learning"}
        className="gap-2"
      >
        {item.choices.map((c) => {
          const show = submitted && mode !== "exam";
          const isCorrect = c.id === correct;
          const isPicked = c.id === choice;
          return (
            <Label
              key={c.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-sm",
                isPicked && !show && "border-navy",
                show && isCorrect && "border-navy bg-secondary",
                show && isPicked && !isCorrect && "border-destructive/50 bg-destructive/5",
              )}
            >
              <RadioGroupItem value={c.id} className="mt-0.5" />
              <span>
                <span className="mr-2 font-medium">{c.id}.</span>
                <RichText text={c.text} />
              </span>
            </Label>
          );
        })}
      </RadioGroup>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex flex-wrap items-center gap-2">
        {!submitted ? (
          <Button
            onClick={() => {
              if (!choice) {
                setError("Select an option, or flag that you want to skip after attempting a representation.");
                return;
              }
              if (!correct && mode !== "exam") {
                setError("This item is missing a published key. It should not have been released.");
                return;
              }
              setError(null);
              setSubmitted(true);
              onSubmit(choice, {
                correct: choice === correct,
                assisted: hintLevel > 0 || solutionViewed,
                hintLevel,
                solutionViewed,
              });
            }}
          >
            Submit
          </Button>
        ) : null}
        {mode === "learning" && hintLevel < HINTS.length ? (
          <Button
            variant="outline"
            onClick={() => {
              setHintLevel((h) => h + 1);
              onHint?.();
            }}
          >
            Hint {hintLevel + 1} of {HINTS.length}
          </Button>
        ) : null}
        {mode === "learning" && submitted && !solutionViewed ? (
          <Button
            variant="ghost"
            onClick={() => {
              setSolutionViewed(true);
              onSolution?.();
            }}
          >
            View worked explanation
          </Button>
        ) : null}
        <IssueButton targetType="item" targetId={item.id} />
      </div>

      {hintLevel > 0 && mode !== "exam" ? (
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          {HINTS.slice(0, hintLevel).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ol>
      ) : null}

      {canReveal && result !== null ? (
        <div className="space-y-2 rounded-lg border border-border bg-paper px-4 py-3 text-sm">
          <p className="font-medium text-navy">
            {result ? "Correct — unaided only if you used no hint and did not open the solution first." : "Not yet independent on this family."}
          </p>
          {solutionViewed || result === false ? (
            <>
              <p>
                <RichText text={item.explanation ?? "Explanation pending review."} />
              </p>
              {item.distractorRationales ? (
                <ul className="mt-2 space-y-1">
                  {item.choices.map((c) => (
                    <li key={c.id}>
                      <span className="font-medium">{c.id}:</span>{" "}
                      <RichText text={item.distractorRationales?.[c.id] ?? (c.id === item.correct ? "This is the key." : "")} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : (
            <p className="text-muted-foreground">Open the worked explanation if you want distractor-by-distractor commentary. Doing so keeps this attempt as learning evidence.</p>
          )}
        </div>
      ) : null}
    </article>
  );
}
