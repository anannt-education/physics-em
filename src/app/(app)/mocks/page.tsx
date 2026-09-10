"use client";

import Link from "next/link";
import { MOCK_FORMS } from "@/content/mocks";
import { ACTIVE_EXAM_PROFILE } from "@/content/exam-profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/lib/store/student-store";

export default function MocksLobby() {
  const { state } = useStudent();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-navy">Mock exams</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Fixed-form practice using the {ACTIVE_EXAM_PROFILE.label}. Anannt is an independent practice
          environment — not Bluebook. Mock B is not a second paper: it reuses Mock A stems in reverse
          order. Do not treat two lobby cards as two independent exams. A website cannot guarantee you
          stopped writing when its timer ended.
        </p>
      </div>
      {MOCK_FORMS.map((form) => {
        const attempt = state.mockAttempts.find((a) => a.formId === form.id);
        return (
          <Card key={form.id}>
            <CardHeader>
              <CardTitle>{form.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                {ACTIVE_EXAM_PROFILE.mcqCount} MCQs / {ACTIVE_EXAM_PROFILE.mcqMinutes} min, then {ACTIVE_EXAM_PROFILE.frqCount} FRQs / {ACTIVE_EXAM_PROFILE.frqMinutes} min.
              </p>
              <p>Calculator: {ACTIVE_EXAM_PROFILE.calculator} Reference information: available in the workspace.</p>
              <p className="text-muted-foreground">{form.notes}</p>
              {attempt?.submittedAt ? (
                <Button render={<Link href={`/mocks/${form.id}/results`} />}>View results</Button>
              ) : attempt ? (
                <Button render={<Link href={`/mocks/${form.id}`} />}>Resume attempt</Button>
              ) : (
                <Button render={<Link href={`/mocks/${form.id}`} />}>Begin timed commitment</Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
