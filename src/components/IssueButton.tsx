"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { addIssue, useStudent } from "@/lib/store/student-store";
import type { ContentIssue } from "@/lib/types";

export function IssueButton({
  targetType = "lesson",
  targetId = "desk",
}: {
  targetType?: ContentIssue["targetType"];
  targetId?: string;
}) {
  const { setState } = useStudent();
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-xs text-muted-foreground underline-offset-2 hover:underline">
        Report an issue
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report a content issue</DialogTitle>
          <DialogDescription>
            High-impact answer-key or physics errors should be triaged within one business day in a staffed release. This local build stores the report on this device for the academic CMS.
          </DialogDescription>
        </DialogHeader>
        {sent ? (
          <p className="text-sm">Logged. Thank you — the author cannot self-approve a correction.</p>
        ) : (
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              addIssue(setState, {
                targetType,
                targetId,
                note: note.trim() || "(no detail)",
                severity: /wrong|incorrect|sign|key/i.test(note) ? "high" : "low",
              });
              setSent(true);
            }}
          >
            <Textarea
              required
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe the error. Include the part, the claimed answer, and what you think is right."
              rows={5}
            />
            <Button type="submit">Submit report</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
