import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { AnanntLogo } from "@/components/layout/Logo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ACTIVE_EXAM_PROFILE } from "@/content/exam-profile";
import {
  CLASH_OFFICIAL,
  EXAM_SITTING,
  HONESTY,
  PUBLIC_LESSONS,
  sittingChoiceHref,
} from "@/lib/mount";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "May 2027 Physics C E&M exam guide",
  description:
    "Wednesday 5 May 2027 Session 2. Same afternoon as Physics 1. 42/85 + 4/95 hybrid. Two lessons open. Not a complete E&M course. Dubai.",
  path: "/exam/2027",
});

export default function Exam2027Page() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border bg-navy px-4 py-4">
        <Link href="/">
          <AnanntLogo inverse />
        </Link>
      </header>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "2027 exam guide", path: "/exam/2027" },
          ])}
        />
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Anannt Exam Review · commentary
        </p>
        <h1 className="mt-1 font-heading text-3xl text-navy">2027 AP Physics C: E&amp;M exam guide</h1>
        <p className="mt-3 text-base leading-relaxed">
          This page is Anannt commentary on the May 2027 Physics C: Electricity and Magnetism sitting.
          It is a self-study supplement. It is not a College Board document. When a count, timer, or
          calculator rule matters for an official sitting, follow the dated official source.
        </p>

        <section className="mt-8 space-y-3 text-sm">
          <h2 className="font-heading text-xl text-navy">Date, session, and the Physics 1 clash</h2>
          <p>
            Physics C: E&amp;M sits <strong>{EXAM_SITTING.dateLabel}, {EXAM_SITTING.session}</strong>.
            In Dubai (UTC+4 in May) Session 2 starts at {EXAM_SITTING.localTime.split(" ")[0]} local.
          </p>
          <p className="rounded-lg border border-amber/40 bg-amber-soft/40 p-3 text-navy">{CLASH_OFFICIAL}</p>
          <p>
            If a family also named Physics 1, the next human step is a sitting-choice call — never
            “take both on 5 May.”
          </p>
        </section>

        <section className="mt-8 space-y-3 text-sm">
          <h2 className="font-heading text-xl text-navy">Shape we may print</h2>
          <p>{EXAM_SITTING.mode}. {EXAM_SITTING.shape}</p>
          <p>
            Profile on this desk: {ACTIVE_EXAM_PROFILE.label}. Source reviewed{" "}
            {ACTIVE_EXAM_PROFILE.sourceReviewDate}. {ACTIVE_EXAM_PROFILE.delivery}
          </p>
          <p>
            FRQ types you may name, in 2027 order: Mathematical Routines; Translation Between
            Representations; Experimental Design and Analysis; Qualitative/Quantitative
            Translation. We do not paste released stems.
          </p>
          <p>
            Older 40-question / 80-minute MCQ timing is legacy. It is labelled if it appears. New
            sittings on this desk use the 2027 profile.
          </p>
        </section>

        <section className="mt-8 space-y-3 text-sm">
          <h2 className="font-heading text-xl text-navy">What this desk actually opens</h2>
          <p>{HONESTY}</p>
          <p>
            Form A may sit behind the gate as a timed practice. Mock B reuses Mock A’s public stems
            in reverse order. It is not a second paper. Do not treat two lobby cards as two
            independent exams.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link href={PUBLIC_LESSONS[0].path} className="underline-offset-2 hover:underline">
            Lesson 1
          </Link>
          <Link href={PUBLIC_LESSONS[1].path} className="underline-offset-2 hover:underline">
            Lesson 2
          </Link>
          <a href={sittingChoiceHref()} className="underline-offset-2 hover:underline">
            Sitting-choice gate
          </a>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
