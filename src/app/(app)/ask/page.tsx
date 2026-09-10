"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LESSONS } from "@/content/lessons";
import { EVALUATION_SET, HINT_LADDER, assessmentLock, tutorReply } from "@/lib/tutor";
import { addTicket, useStudent } from "@/lib/store/student-store";
import { RichText } from "@/components/math/RichText";

interface ChatLine {
  role: "you" | "anannt";
  text: string;
  href?: string;
}

export default function AskPage() {
  const { state, setState, log, loaded } = useStudent();
  const lastLessonId = [...state.events].reverse().find((e) => e.lessonId)?.lessonId;
  const lastLesson = LESSONS.find((l) => l.id === lastLessonId);
  const locked = assessmentLock(state);
  const [query, setQuery] = useState("");
  const [ladder, setLadder] = useState(0);
  const [lines, setLines] = useState<ChatLine[]>([
    {
      role: "anannt",
      text: "I am an Anannt study assistant grounded in approved lessons. I will not invent physics. If retrieval fails, I will say so and offer an expert ticket. AI is optional — the course works without me.",
    },
  ]);

  const contextLabel = useMemo(() => {
    if (locked) return "Live mock sitting — tutor locked";
    if (lastLesson) return `Current lesson context: ${lastLesson.title}`;
    return "No current lesson — I will match your question to the syllabus map";
  }, [locked, lastLesson]);

  function ask(nextLadder = ladder) {
    const q = query.trim();
    if (!q) return;
    const turn = tutorReply({ query: q, ladderStep: nextLadder, state, lessonId: lastLessonId });
    setLines((prev) => [
      ...prev,
      { role: "you", text: q },
      {
        role: "anannt",
        text: `${turn.title}. ${turn.body}`,
        href: turn.source?.href,
      },
    ]);
    if (!turn.blocked && nextLadder < HINT_LADDER.length - 1) setLadder(nextLadder + 1);
    setQuery("");
  }

  if (!loaded) return <p className="text-sm text-muted-foreground">Loading tutor…</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-navy">Ask Anannt</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Hint ladder: situation → representation → principle → next step → worked explanation in learning mode. Every answer cites an approved lesson. Protected assessments have no key access.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">{contextLabel}</p>
      </div>

      {locked ? (
        <Card>
          <CardContent className="pt-6 text-sm">
            A timed mock is in progress. The tutor is disabled so it cannot retrieve unreleased keys.{" "}
            <Link className="underline-offset-2 hover:underline" href="/mocks">
              Return to the mock lobby
            </Link>
            .
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
        <div className="space-y-3">
          <div className="space-y-3 rounded-lg border border-border bg-card p-4">
            {lines.map((line, i) => (
              <div key={i} className={line.role === "you" ? "text-sm" : "rounded-md bg-paper px-3 py-2 text-sm leading-relaxed"}>
                <p className="text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
                  {line.role === "you" ? "You" : "Anannt"}
                </p>
                <p>
                  <RichText text={line.text} />
                </p>
                {line.href ? (
                  <Link href={line.href} className="mt-1 inline-block text-xs underline-offset-2 hover:underline">
                    Open cited lesson
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
          <Textarea
            rows={4}
            value={query}
            disabled={locked}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe the situation and where you are stuck. Do not paste unreleased mock stems if you are in exam mode — the tutor is already locked."
          />
          <div className="flex flex-wrap gap-2">
            <Button disabled={locked || query.trim().length < 8} onClick={() => ask()}>
              {ladder === 0 ? "Ask for the first hint" : `Next hint (${Math.min(ladder + 1, HINT_LADDER.length)} of ${HINT_LADDER.length})`}
            </Button>
            <Button
              variant="outline"
              disabled={locked}
              onClick={() => {
                setLadder(0);
                setLines((prev) => [
                  ...prev,
                  { role: "anannt", text: "Ladder reset. We will start again from the physical situation." },
                ]);
              }}
            >
              Reset ladder
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                addTicket(setState, {
                  lessonId: lastLessonId,
                  question: query.trim() || "Requesting a human look at my last stuck point.",
                });
                log({ type: "expert_escalation", lessonId: lastLessonId, assisted: false });
                setLines((prev) => [
                  ...prev,
                  { role: "anannt", text: "Escalated to the expert queue. Capacity is bounded; this is not unlimited marking." },
                ]);
              }}
            >
              Escalate to an expert
            </Button>
          </div>
        </div>
        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ladder</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal space-y-1 pl-4 text-xs text-muted-foreground">
                {HINT_LADDER.map((h, i) => (
                  <li key={h.id} className={i === ladder ? "font-medium text-foreground" : undefined}>
                    {h.title}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Evaluation set</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <p>Release gate: a confident wrong physics answer on any of these blocks the tutor until corrected.</p>
              <ul className="list-disc pl-4">
                {EVALUATION_SET.map((e) => (
                  <li key={e.id}>{e.topic}</li>
                ))}
              </ul>
              <p>This build is rule-based retrieval, not a live LLM. The course remains usable if this page is unavailable.</p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
