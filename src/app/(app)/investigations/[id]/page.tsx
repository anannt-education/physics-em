"use client";

import { use, useState } from "react";
import Link from "next/link";
import { investigationById } from "@/content/investigations";
import { IssueButton } from "@/components/IssueButton";
import { Button } from "@/components/ui/button";
import { Lab } from "@/components/sims/Lab";
import { useStudent } from "@/lib/store/student-store";

export default function InvestigationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const inv = investigationById(id);
  const { log } = useStudent();
  const [phase, setPhase] = useState<"predict" | "lab" | "explain">("predict");
  const [choice, setChoice] = useState<string>();
  const [locked, setLocked] = useState(false);

  if (!inv) return <p>Investigation not found.</p>;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase text-muted-foreground">Simulation · Unit {inv.unit}</p>
        <h1 className="font-heading text-3xl text-navy">{inv.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Assumption: {inv.assumption} Physics is deterministic (see Academic CMS verification). Reduced-motion mode is available in your profile.
        </p>
      </div>

      {phase === "predict" ? (
        <section className="space-y-3">
          <h2 className="font-heading text-xl">Predict</h2>
          <p className="text-sm">{inv.prediction.prompt}</p>
          {inv.prediction.choices.map((c) => (
            <Button
              key={c.id}
              variant={choice === c.id ? "default" : "outline"}
              className="mr-2"
              onClick={() => setChoice(c.id)}
            >
              {c.id}. {c.text}
            </Button>
          ))}
          <div>
            <Button
              disabled={!choice}
              onClick={() => {
                setLocked(true);
                setPhase("lab");
                const ok = inv.prediction.choices.find((c) => c.id === choice)?.correct;
                log({ type: "lesson_prediction", assisted: false, correct: Boolean(ok), notes: inv.id });
              }}
            >
              Lock prediction and open the lab
            </Button>
          </div>
        </section>
      ) : null}

      {phase !== "predict" ? (
        <>
          {locked ? (
            <p className="rounded-md bg-muted/50 p-3 text-sm">
              Your prediction is locked. After you observe, we will show why. {inv.prediction.explanation}
            </p>
          ) : null}
          <Lab id={inv.id} />
          <p className="text-sm text-muted-foreground">Static equivalent: {inv.staticEquivalent}</p>
          <Button variant="outline" onClick={() => setPhase("explain")}>
            I have observed — explain
          </Button>
        </>
      ) : null}

      {phase === "explain" ? (
        <section className="space-y-2 text-sm">
          <h2 className="font-heading text-xl">Explain and transfer</h2>
          <p>{inv.prediction.explanation}</p>
          <p>
            Transfer question:{" "}
            <Link className="underline-offset-2 hover:underline" href={`/practice/${inv.transferItemId}`}>
              open an unseen item
            </Link>
            . Replaying this paragraph does not mark a misconception resolved.
          </p>
        </section>
      ) : null}

      <IssueButton targetType="investigation" targetId={inv.id} />
    </div>
  );
}
