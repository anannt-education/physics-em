"use client";

import Link from "next/link";
import { investigations } from "@/content/investigations";
import { IssueButton } from "@/components/IssueButton";

export default function InvestigationsIndexPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Investigations</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Guided labs matching the AP Physics C Science Practices. Each investigation has a
          goal, procedure, analysis questions, and linked practice items.
        </p>
      </div>
      <ul className="space-y-3">
        {investigations.map((lab) => (
          <li key={lab.id}>
            <Link
              href={`/investigations/${lab.id}`}
              className="block rounded-lg border bg-card p-4 transition-colors hover:bg-muted/40"
            >
              <p className="text-xs text-muted-foreground">Unit {lab.unit}</p>
              <p className="font-medium">{lab.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{lab.goal}</p>
            </Link>
          </li>
        ))}
      </ul>
      <IssueButton />
    </div>
  );
}
