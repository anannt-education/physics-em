import { Framework } from "@/components/Framework";
import { IssueButton } from "@/components/IssueButton";

export default function CmsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Content CMS (read-only)</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Items, lessons, investigations, FRQs, and mocks are versioned as TypeScript modules in{" "}
          <code>src/content/</code>. This view is a reminder of the contract — no live editor.
        </p>
      </div>
      <Framework />
      <div className="rounded-lg border bg-card p-5 text-sm">
        <p className="font-medium">Schema</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Item: id, type, unit, topic, difficulty, stem, choices, correctIndex, explanation, tags</li>
          <li>Lesson: id, unit, title, html, relatedItems, investigationId?</li>
          <li>Investigation: id, unit, title, goal, steps, questions, relatedItems</li>
          <li>FRQ: id, year, form, part, prompt, scoringGuidelines, sampleSolution</li>
        </ul>
      </div>
      <IssueButton />
    </div>
  );
}
