"use client";

import Link from "next/link";
import { AnanntLogo } from "@/components/layout/Logo";
import { FrameworkStrip } from "@/components/Framework";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudent } from "@/lib/store/student-store";
import { ACTIVE_EXAM_PROFILE } from "@/content/exam-profile";
import { UNITS } from "@/content/curriculum";

export default function LandingPage() {
  const { state, loadSample } = useStudent();
  const started = Boolean(state.profile);

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border bg-navy text-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <AnanntLogo inverse />
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/learn" className="text-paper/80 hover:text-paper">
              Syllabus
            </Link>
            <Link href="/resources" className="text-paper/80 hover:text-paper">
              Resources
            </Link>
            {started ? (
              <Button render={<Link href="/plan" />} size="sm" className="bg-amber text-navy hover:bg-amber/90">
                Continue
              </Button>
            ) : (
              <Button render={<Link href="/onboarding" />} size="sm" className="bg-amber text-navy hover:bg-amber/90">
                Start diagnosis
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-xs tracking-[0.2em] text-amber uppercase">AP Physics C: Electricity &amp; Magnetism · May 2027</p>
            <h1 className="font-heading text-4xl font-semibold text-navy sm:text-5xl">
              Understand a situation. Represent it. Select a principle. Derive, check, and explain.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Anannt is an expert-authored, mastery-led course for calculus-based E&amp;M. It is built so that a student can independently solve unfamiliar, syllabus-aligned problems — not so that a video library can look complete. Watching never certifies mastery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button render={<Link href="/onboarding" />} size="lg">
                Free diagnostic and sample path
              </Button>
              <Button variant="outline" size="lg" render={<Link href="/learn/zero-flux-is-not-zero-field" />}>
                Open the field-and-flux lesson
              </Button>
              <Button variant="ghost" onClick={() => loadSample()}>
                Load a sample learner
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Using Anannt does not register you for the AP exam. Anannt is not affiliated with, and is not endorsed by, the College Board.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Exam profile pinned to this attempt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>{ACTIVE_EXAM_PROFILE.label}</p>
              <p>
                Multiple choice: {ACTIVE_EXAM_PROFILE.mcqCount} questions, {ACTIVE_EXAM_PROFILE.mcqMinutes} minutes (50%).
              </p>
              <p>
                Free response: {ACTIVE_EXAM_PROFILE.frqCount} questions, {ACTIVE_EXAM_PROFILE.frqMinutes} minutes (50%).
              </p>
              <p>{ACTIVE_EXAM_PROFILE.delivery}</p>
              <p className="text-xs text-muted-foreground">
                Source reviewed {ACTIVE_EXAM_PROFILE.sourceReviewDate}. Older 40-question / 80-minute mocks are labelled legacy and are not used for new attempts.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl text-navy">The teaching framework</h2>
          <FrameworkStrip />
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {UNITS.filter((u) => u.id !== "bridge").map((u) => (
            <Card key={u.id}>
              <CardHeader>
                <CardTitle className="text-base">
                  {u.official}: {u.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>MCQ weighting {u.mcqWeight}</p>
                <p className="mt-2">{u.summary}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Diagnostic, one complete sample learning path (field and flux), and a useful gap report.</p>
              <p className="text-muted-foreground">The report explains observed strengths and gaps without exaggerating risk to drive a sale.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Core</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Full Units 8–13 plus bridge, approved hints, practice, revision, and four 2027-profile mocks with clearly labelled self-review.</p>
              <p className="text-muted-foreground">This local build includes the curriculum and two mock sittings. Payment is not processed here; entitlement can be switched in Progress for demonstration.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reviewed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>A defined allocation of instructor-marked FRQs. Expert feedback is bounded — not unlimited. Results stay pending until reviewed; they are never silently scored zero.</p>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-xl border border-border bg-paper px-6 py-8">
          <h2 className="font-heading text-2xl text-navy">What this product will not do</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>It will not convert an uncalibrated mock percentage into an official 1–5 AP score.</li>
            <li>It will not treat video playback as mastery.</li>
            <li>It will not invent testimonials, examiner affiliations, or College Board endorsement.</li>
            <li>Its exam workspace is independent practice, not Bluebook. A link to official familiarisation belongs on the mock lobby.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
