"use client";

import { use, useState } from "react";
import { frqById } from "@/content/frqs";
import { RichText } from "@/components/math/RichText";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useStudent } from "@/lib/store/student-store";
import { IssueButton } from "@/components/IssueButton";

export default function FrqPracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const frq = frqById(id);
  const { log } = useStudent();
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [complete, setComplete] = useState(false);
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  if (!frq) return <p>FRQ not found.</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <p className="text-xs uppercase text-muted-foreground">
        {frq.category.replaceAll("_", " ")} · Unit {frq.unit} · {frq.totalPoints} points
      </p>
      <h1 className="font-heading text-2xl text-navy">Written response</h1>
      {frq.stimulus ? (
        <p className="text-sm">
          <RichText text={frq.stimulus} />
        </p>
      ) : null}
      <ol className="list-decimal space-y-2 pl-5 text-sm">
        {frq.parts.map((p) => (
          <li key={p.id}>
            <RichText text={p.prompt} /> <span className="text-muted-foreground">({p.points} pts)</span>
          </li>
        ))}
      </ol>
      <Textarea rows={12} value={text} onChange={(e) => setText(e.target.value)} placeholder="Typed mathematics is accepted for ordinary practice. You may also attach a photo of paper work." />
      <label className="block text-sm">
        Optional page image (stored locally as a data URL; keep it small)
        <input
          className="mt-1 block"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setFileName(file.name);
          }}
        />
      </label>
      {fileName ? <p className="text-xs">Attached: {fileName}. Original kept; we will not grade an unreadable symbol as if OCR were certain.</p> : null}
      <label className="flex items-center gap-2 text-sm">
        <Checkbox checked={complete} onCheckedChange={(v) => setComplete(Boolean(v))} />
        I confirm the pages are complete, in order, and as legible as I can make them.
      </label>
      {!submitted ? (
        <Button
          disabled={!complete || text.trim().length < 40}
          onClick={() => {
            setSubmitted(true);
            log({ type: "frq_submitted", itemId: frq.id, objectiveId: frq.objective, assisted: false, skill: "argumentation" });
          }}
        >
          Submit for self-review
        </Button>
      ) : (
        <div className="space-y-3 rounded-lg border border-border bg-paper p-4 text-sm">
          <p className="font-medium">
            Status: self-reviewed (not instructor-reviewed). Ungraded work is not converted to zero.
          </p>
          <p>
            <span className="font-medium">Model solution. </span>
            <RichText text={frq.modelSolution} />
          </p>
          <ul className="space-y-2">
            {frq.rubric.map((r) => (
              <li key={r.id} className="flex gap-2">
                <Checkbox checked={!!checks[r.id]} onCheckedChange={(v) => setChecks((c) => ({ ...c, [r.id]: Boolean(v) }))} />
                <span>
                  {r.points} pt: {r.earns}
                  {r.alternate ? ` Alternate: ${r.alternate}` : ""}
                  {r.afterError ? ` After an earlier error: ${r.afterError}` : ""}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground">Self-checks: {frq.selfChecks.join(" · ")}</p>
          <IssueButton targetType="frq" targetId={frq.id} />
        </div>
      )}
    </div>
  );
}
