"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { mockFormById, MOCK1_FRQS } from "@/content/mocks";
import { MOCK1_PUBLIC } from "@/content/mocks/form1-public";
import { ACTIVE_EXAM_PROFILE } from "@/content/exam-profile";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RichText } from "@/components/math/RichText";
import { upsertMockAttempt, useStudent } from "@/lib/store/student-store";
import type { MockAttempt } from "@/lib/types";

function extraFactor(extra?: boolean) {
  return extra ? 1.5 : 1;
}

export default function MockWorkspace({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const form = mockFormById(id);
  const router = useRouter();
  const { state, setState } = useStudent();
  const extra = state.profile?.accessibility.extraTime;
  const scramble = id.endsWith("2");
  const items = useMemo(() => {
    const list = [...MOCK1_PUBLIC];
    if (scramble) list.reverse();
    return list;
  }, [scramble]);

  const existing = state.mockAttempts.find((a) => a.formId === id && !a.submittedAt);
  const [attempt, setAttempt] = useState<MockAttempt | null>(existing ?? null);
  const [idx, setIdx] = useState(0);
  const [saveState, setSaveState] = useState<"saved" | "saving" | "offline">("saved");
  const [now, setNow] = useState(Date.now());
  const debounce = useRef<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (attempt) upsertMockAttempt(setState, attempt);
  }, [attempt, setState]);

  if (!form) return <p>Unknown form.</p>;

  function start() {
    const mcqMs = ACTIVE_EXAM_PROFILE.mcqMinutes * 60 * 1000 * extraFactor(extra);
    const frqMs = ACTIVE_EXAM_PROFILE.frqMinutes * 60 * 1000 * extraFactor(extra);
    const a: MockAttempt = {
      id: crypto.randomUUID(),
      formId: id,
      profileId: ACTIVE_EXAM_PROFILE.id,
      startedAt: Date.now(),
      section: "mcq",
      mcqEndsAt: Date.now() + mcqMs,
      frqEndsAt: Date.now() + mcqMs + frqMs,
      answers: {},
      flags: [],
      frqText: {},
      uploads: [],
      frqStatus: "not_started",
      incidentLog: [],
      revision: 1,
    };
    setAttempt(a);
  }

  function saveAnswer(qid: string, value: string) {
    if (!attempt) return;
    setSaveState("saving");
    if (debounce.current) window.clearTimeout(debounce.current);
    debounce.current = window.setTimeout(() => {
      setAttempt((prev) =>
        prev
          ? {
              ...prev,
              answers: { ...prev.answers, [qid]: value },
              revision: prev.revision + 1,
            }
          : prev,
      );
      setSaveState(typeof navigator !== "undefined" && navigator.onLine ? "saved" : "offline");
    }, 250);
  }

  if (!attempt) {
    return (
      <div className="space-y-4">
        <h1 className="font-heading text-2xl text-navy">{form.title}</h1>
        <p className="text-sm">
          You are about to start a timed {ACTIVE_EXAM_PROFILE.mcqMinutes}+{ACTIVE_EXAM_PROFILE.frqMinutes} minute commitment
          {extra ? " with 1.5× Anannt extra time" : ""}. Solutions are not in this workspace. Reconnection restores answers and remaining time from this device.
        </p>
        <p className="text-sm text-muted-foreground">
          Printable booklet: write FRQs on paper, then upload after the section. Upload time is separate from response time.
        </p>
        <Button onClick={start}>I understand — start MCQ</Button>
      </div>
    );
  }

  const remainingMcq = Math.max(0, attempt.mcqEndsAt - now);
  const remainingFrq = Math.max(0, attempt.frqEndsAt - now);
  if (attempt.section === "mcq" && remainingMcq <= 0 && !attempt.submittedAt) {
    setAttempt((a) => (a ? { ...a, section: "frq" } : a));
  }

  const q = items[idx];
  const flagged = attempt.flags.includes(q.id);

  async function submitAll() {
    if (!attempt) return;
    const res = await fetch(`/api/mocks/${id}/grade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: attempt.answers, revision: attempt.revision }),
    });
    if (!res.ok) {
      setAttempt((a) => (a ? { ...a, incidentLog: [...a.incidentLog, `grade failed ${res.status}`] } : a));
      return;
    }
    const data = (await res.json()) as { score: number; total: number };
    const done: MockAttempt = {
      ...attempt,
      section: "done",
      submittedAt: Date.now(),
      mcqScore: data.score,
      mcqTotal: data.total,
      frqStatus: "submitted",
    };
    setAttempt(done);
    upsertMockAttempt(setState, done);
    router.push(`/mocks/${id}/results`);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="font-medium text-navy">
          {attempt.section === "mcq" ? "MCQ" : "FRQ"} · {saveState === "saving" ? "Saving…" : saveState === "offline" ? "Offline — queued locally" : "Saved"}
        </p>
        <p className="font-mono">
          {attempt.section === "mcq"
            ? `${Math.floor(remainingMcq / 60000)}:${String(Math.floor((remainingMcq / 1000) % 60)).padStart(2, "0")} remaining`
            : `${Math.floor(remainingFrq / 60000)}:${String(Math.floor((remainingFrq / 1000) % 60)).padStart(2, "0")} remaining`}
        </p>
      </div>

      {attempt.section === "mcq" && q ? (
        <>
          <p className="text-xs text-muted-foreground">Question {idx + 1} of {items.length} · Unit {q.unit}</p>
          <p className="text-sm leading-relaxed">
            <RichText text={q.stem} />
          </p>
          <div className="grid gap-2">
            {q.choices.map((c) => (
              <Button
                key={c.id}
                variant={attempt.answers[q.id] === c.id ? "default" : "outline"}
                className="h-auto justify-start whitespace-normal py-2"
                onClick={() => saveAnswer(q.id, c.id)}
              >
                {c.id}. <RichText text={c.text} />
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
              Previous
            </Button>
            <Button variant="outline" disabled={idx === items.length - 1} onClick={() => setIdx(idx + 1)}>
              Next
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                setAttempt((a) =>
                  a
                    ? {
                        ...a,
                        flags: flagged ? a.flags.filter((f) => f !== q.id) : [...a.flags, q.id],
                      }
                    : a,
                )
              }
            >
              {flagged ? "Unflag" : "Flag"}
            </Button>
            <details className="text-xs">
              <summary className="cursor-pointer">Reference (Anannt sheet — not the official booklet)</summary>
              <p className="mt-1 text-muted-foreground">
                k = 8.99×10⁹ N·m²/C² · ε0 · μ0 · e · proton/electron mass · trigonometric identities. Calculators permitted subject to policy.
              </p>
            </details>
          </div>
          <div className="flex flex-wrap gap-1">
            {items.map((it, i) => (
              <button
                key={it.id}
                className={`size-7 rounded text-[0.65rem] ${
                  attempt.answers[it.id] ? "bg-navy text-paper" : "bg-muted"
                } ${attempt.flags.includes(it.id) ? "ring-1 ring-amber" : ""}`}
                onClick={() => setIdx(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <Button variant="outline" onClick={() => setAttempt((a) => (a ? { ...a, section: "frq" } : a))}>
            End MCQ section (early)
          </Button>
        </>
      ) : null}

      {attempt.section === "frq" ? (
        <div className="space-y-4">
          <p className="text-sm">
            FRQ prompts are digital; write on paper if you wish. Typed work is accepted here. Upload completeness is your confirmation — we do not pretend a webcam watched you.
          </p>
          {MOCK1_FRQS.map((f) => (
            <section key={f.id} className="space-y-2 rounded-lg border p-3">
              <h2 className="font-heading text-lg">{f.category.replaceAll("_", " ")}</h2>
              {f.stimulus ? (
                <p className="text-sm">
                  <RichText text={f.stimulus} />
                </p>
              ) : null}
              {f.parts.map((p) => (
                <p key={p.id} className="text-sm">
                  ({p.id}) <RichText text={p.prompt} /> [{p.points}]
                </p>
              ))}
              <Textarea
                rows={6}
                value={attempt.frqText[f.id] ?? ""}
                onChange={(e) =>
                  setAttempt((a) => (a ? { ...a, frqText: { ...a.frqText, [f.id]: e.target.value } } : a))
                }
              />
            </section>
          ))}
          <Button onClick={submitAll}>Submit exam (MCQ keys released after this)</Button>
        </div>
      ) : null}
    </div>
  );
}
