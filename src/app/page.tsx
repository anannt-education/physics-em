import Link from "next/link";
import type { Metadata } from "next";
import { AnanntLogo } from "@/components/layout/Logo";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CLASH_HOME,
  CLASH_OFFICIAL,
  HOME_FAQS,
  HONESTY,
  PHYSICS_1_HREF,
  PUBLIC_LESSONS,
  QUIET_LINE,
  VOICE,
  sittingChoiceHref,
} from "@/lib/mount";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, faqJsonLd, jsonLdGraph, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background">
      <JsonLd data={jsonLdGraph()} />
      <JsonLd data={faqJsonLd(HOME_FAQS)} />
      <header className="border-b border-border bg-navy text-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/">
            <AnanntLogo inverse />
          </Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm">
            <Link href={PUBLIC_LESSONS[0].path} className="text-paper/80 hover:text-paper">
              Lesson 1
            </Link>
            <Link href={PUBLIC_LESSONS[1].path} className="text-paper/80 hover:text-paper">
              Lesson 2
            </Link>
            <Link href="/exam/2027" className="text-paper/80 hover:text-paper">
              Exam guide
            </Link>
            <Link href="/faq" className="text-paper/80 hover:text-paper">
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6">
        <section className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber">
            Self-prep desk · May 2027 · Physics C: E&amp;M
          </p>
          <h1 className="font-heading text-4xl leading-tight text-navy sm:text-5xl">
            {VOICE}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{CLASH_HOME}</p>
          <p className="rounded-xl border border-amber/40 bg-amber-soft/40 p-4 text-sm leading-relaxed text-navy">
            {CLASH_OFFICIAL}
          </p>
          <p className="text-sm text-muted-foreground">{QUIET_LINE}</p>
          <p className="text-sm text-muted-foreground">{HONESTY}</p>
        </section>

        <ol className="space-y-4">
          {PUBLIC_LESSONS.map((lesson, i) => (
            <li key={lesson.id} className="rounded-2xl border border-border bg-paper p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">
                Lesson {i + 1} · public · Unit 8
              </p>
              <h2 className="mt-1 font-heading text-2xl text-navy">{lesson.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{lesson.blurb}</p>
              <Link
                href={lesson.path}
                className={
                  i === 0
                    ? "mt-4 inline-flex rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                    : "mt-4 inline-flex rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium"
                }
              >
                {i === 0 ? "Start lesson 1 — free, no account" : "Open lesson 2"}
              </Link>
            </li>
          ))}
        </ol>

        <Card>
          <CardHeader>
            <CardTitle>If Physics 1 is also on the form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Do not take both on 5 May. The usual next human step is a 1:1 sitting-choice conversation
              at Office 105 — not a second enrolment.
            </p>
            <p>
              Graph-reading still feels like a picture? Finish{" "}
              <a className="underline-offset-2 hover:underline" href={PHYSICS_1_HREF}>
                Physics 1
              </a>{" "}
              first. This desk is calculus-based E&amp;M, not a substitute for that algebra course.
            </p>
            <a
              href={sittingChoiceHref()}
              className="inline-flex rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
            >
              Ask Burjuman which sitting to keep
            </a>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl text-navy">Short answers</h2>
          <dl className="space-y-4 text-sm">
            {HOME_FAQS.map((f) => (
              <div key={f.question}>
                <dt className="font-medium text-navy">{f.question}</dt>
                <dd className="mt-1 text-muted-foreground">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
