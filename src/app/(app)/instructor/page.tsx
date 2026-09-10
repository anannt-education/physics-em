"use client";

import { useEffect, useMemo, useState } from "react";
import { IssueButton } from "@/components/IssueButton";
import { Button } from "@/components/ui/button";
import { allItems } from "@/content/items";
import { investigations } from "@/content/investigations";
import { allLessons } from "@/content/lessons";
import { getStore, resetStore, subscribe } from "@/lib/student-store";

export default function InstructorPage() {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const sync = () => {
      const s = getStore();
      setUnlocked(s.instructorUnlocked);
      setAttempts(s.attempts.length);
      setReady(true);
    };
    sync();
    return subscribe(sync);
  }, []);

  const coverage = useMemo(() => {
    const byUnit = new Map<number, { items: number; lessons: number; labs: number }>();
    for (let u = 8; u <= 15; u++) byUnit.set(u, { items: 0, lessons: 0, labs: 0 });
    for (const i of allItems) {
      const row = byUnit.get(i.unit)!;
      row.items += 1;
    }
    for (const l of allLessons) {
      const row = byUnit.get(l.unit);
      if (row) row.lessons += 1;
    }
    for (const lab of investigations) {
      const row = byUnit.get(lab.unit);
      if (row) row.labs += 1;
    }
    return [...byUnit.entries()];
  }, []);

  if (!ready) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Instructor</p>
        <h1 className="text-2xl font-semibold">Classroom dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Local-only view of this browser’s student store. No roster sync.
        </p>
      </div>
      {!unlocked && (
        <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          Unlock instructor mode from the header to see coverage tables. Student data on this
          device is still shown below.
        </p>
      )}
      {unlocked && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-3 py-2">Unit</th>
                <th className="px-3 py-2">Items</th>
                <th className="px-3 py-2">Lessons</th>
                <th className="px-3 py-2">Labs</th>
              </tr>
            </thead>
            <tbody>
              {coverage.map(([u, row]) => (
                <tr key={u} className="border-t">
                  <td className="px-3 py-2">Unit {u}</td>
                  <td className="px-3 py-2">{row.items}</td>
                  <td className="px-3 py-2">{row.lessons}</td>
                  <td className="px-3 py-2">{row.labs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-sm text-muted-foreground">Attempts stored on this device: {attempts}</p>
      <Button variant="outline" onClick={() => resetStore()}>
        Reset local student data
      </Button>
      <IssueButton />
    </div>
  );
}
