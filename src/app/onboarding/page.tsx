"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnanntLogo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useStudent } from "@/lib/store/student-store";
import type { PathwayId, StudentProfile } from "@/lib/types";
import { PATHWAYS } from "@/lib/planner";

export default function OnboardingPage() {
  const router = useRouter();
  const { setState } = useStudent();
  const [name, setName] = useState("");
  const [weeklyHours, setWeeklyHours] = useState(6);
  const [priorPhysics, setPriorPhysics] = useState("");
  const [priorCalculus, setPriorCalculus] = useState("");
  const [schoolSequence, setSchoolSequence] = useState("");
  const [pathway, setPathway] = useState<PathwayId>("16-week");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [extraTime, setExtraTime] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border bg-navy px-4 py-4">
        <AnanntLogo inverse />
      </header>
      <main className="mx-auto max-w-xl space-y-6 px-4 py-10">
        <h1 className="font-heading text-3xl text-navy">Onboarding</h1>
        <p className="text-sm text-muted-foreground">
          We collect exam year, prior study, weekly time, school sequence, and accessibility. The next step is a 30–40 minute Anannt diagnostic — not a miniature official exam.
        </p>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim() || !priorPhysics.trim() || !priorCalculus.trim()) {
              setError("Name, prior physics, and prior calculus are required so the plan can explain itself.");
              return;
            }
            const profile: StudentProfile = {
              name: name.trim(),
              examYear: 2027,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              weeklyHours,
              priorPhysics,
              priorCalculus,
              schoolSequence: schoolSequence || "Not in a school E&M sequence",
              accessibility: { reducedMotion, largeText, extraTime },
              pathway,
              onboardingComplete: true,
              diagnosticComplete: false,
              createdAt: Date.now(),
            };
            setState((s) => ({ ...s, profile }));
            router.push("/diagnostic");
          }}
        >
          <div className="space-y-1">
            <Label htmlFor="name">What should we call you?</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="hours">Hours you can realistically study each week</Label>
            <Input
              id="hours"
              type="number"
              min={2}
              max={20}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Shown later as a range, revised from actual completion — not a guarantee.</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="phys">Prior physics</Label>
            <Textarea id="phys" value={priorPhysics} onChange={(e) => setPriorPhysics(e.target.value)} rows={3} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="calc">Prior calculus</Label>
            <Textarea id="calc" value={priorCalculus} onChange={(e) => setPriorCalculus(e.target.value)} rows={3} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="seq">Current school sequence (if any)</Label>
            <Input id="seq" value={schoolSequence} onChange={(e) => setSchoolSequence(e.target.value)} />
          </div>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Starting pathway (a template, not a promise)</legend>
            {(Object.keys(PATHWAYS) as PathwayId[]).map((id) => (
              <label key={id} className="flex cursor-pointer gap-2 text-sm">
                <input type="radio" name="path" checked={pathway === id} onChange={() => setPathway(id)} />
                <span>
                  <span className="font-medium">{PATHWAYS[id].title}.</span> {PATHWAYS[id].blurb}
                </span>
              </label>
            ))}
          </fieldset>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Accessibility</legend>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={reducedMotion} onCheckedChange={(v) => setReducedMotion(Boolean(v))} />
              Reduced motion (also respects your system setting)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={largeText} onCheckedChange={(v) => setLargeText(Boolean(v))} />
              Larger text
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={extraTime} onCheckedChange={(v) => setExtraTime(Boolean(v))} />
              Extra time on timed sections (1.5×) — an Anannt accommodation, not an official College Board SSD decision
            </label>
          </fieldset>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit">Continue to diagnostic</Button>
        </form>
      </main>
    </div>
  );
}
