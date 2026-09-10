"use client";

import Link from "next/link";
import { PRACTICE_ITEMS } from "@/content/items";
import { PRACTICE_FRQS } from "@/content/frqs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudent } from "@/lib/store/student-store";

export default function PracticeIndex() {
  const { state } = useStudent();
  const mixed = PRACTICE_ITEMS.filter((i) => i.pool === "practice" || i.pool === "retrieval").slice(0, 24);
  const current = mixed.filter((i) => !state.seenFamilies.includes(i.family)).slice(0, 8);
  const weak = PRACTICE_ITEMS.filter((i) =>
    state.mistakes.some((m) => m.objectiveId === i.objective && i.family !== m.family),
  ).slice(0, 6);
  const retrieval = PRACTICE_ITEMS.filter((i) => i.pool === "retrieval").slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-navy">Practice</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Mixed practice starts at about 50% current work, 30% weak prior work, 20% retrieval. Cosmetic clones of the same family are avoided. Learning mode allows hints; they do not mint independence.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Current (50%)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {current.length ? current.map((i) => (
              <Link key={i.id} href={`/practice/${i.id}`} className="block hover:underline">
                {i.topic}: {i.stem.replace(/\$/g, "").slice(0, 72)}…
              </Link>
            )) : <p className="text-muted-foreground">Open a lesson first, or browse retrieval.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weak prior (30%)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {weak.length ? weak.map((i) => (
              <Link key={i.id} href={`/practice/${i.id}`} className="block hover:underline">
                {i.topic} · different family
              </Link>
            )) : <p className="text-muted-foreground">No weak objectives yet — that is a good empty state.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Retrieval (20%)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {retrieval.map((i) => (
              <Link key={i.id} href={`/practice/${i.id}`} className="block hover:underline">
                {i.topic} retrieval
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
      <section>
        <h2 className="font-heading text-xl">Structured FRQ tasks</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {PRACTICE_FRQS.map((f) => (
            <li key={f.id}>
              <Link href={`/practice/frq/${f.id}`} className="hover:underline">
                {f.category.replaceAll("_", " ")} · Unit {f.unit} · {f.totalPoints} pts · ~{f.expectedMinutes} min
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
