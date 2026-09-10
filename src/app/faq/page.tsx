import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { AnanntLogo } from "@/components/layout/Logo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HOME_FAQS, PUBLIC_LESSONS } from "@/lib/mount";
import { faqJsonLd, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Physics C E&M FAQ",
  description:
    "Can you sit Physics 1 and E&M the same afternoon in 2027? No. Two public lessons, no Bluebook, not a complete course. Anannt, Dubai.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border bg-navy px-4 py-4">
        <Link href="/">
          <AnanntLogo inverse />
        </Link>
      </header>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <JsonLd data={faqJsonLd(HOME_FAQS)} />
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Anannt Education</p>
        <h1 className="mt-1 font-heading text-3xl text-navy">Frequently asked questions</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Short answers we are willing to stand behind. If a claim is not here, we probably should
          not be making it.
        </p>
        <dl className="mt-8 space-y-6">
          {HOME_FAQS.map((f) => (
            <div key={f.question}>
              <dt className="font-medium text-navy">{f.question}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-sm">
          <Link href={PUBLIC_LESSONS[0].path} className="underline-offset-2 hover:underline">
            Lesson 1
          </Link>
          <span className="mx-2">·</span>
          <Link href="/exam/2027" className="underline-offset-2 hover:underline">
            2027 exam guide
          </Link>
        </p>
      </article>
      <SiteFooter />
    </div>
  );
}
