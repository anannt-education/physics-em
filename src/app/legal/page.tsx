import Link from "next/link";
import type { Metadata } from "next";
import { AnanntLogo } from "@/components/layout/Logo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LEGAL } from "@/lib/mount";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy, local data, and College Board line",
  description:
    "Progress stays in this browser. No cart. Anannt Education is not affiliated with the College Board. Self-study supplement in Dubai.",
  path: "/legal",
});

export default function LegalPage() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border bg-navy px-4 py-4">
        <Link href="/">
          <AnanntLogo inverse />
        </Link>
      </header>
      <article className="mx-auto max-w-3xl space-y-8 px-4 py-10">
        <h1 className="font-heading text-3xl text-navy">Privacy, local data, and non-affiliation</h1>
        <section className="space-y-3 text-sm">
          <h2 className="font-heading text-xl text-navy">What is stored on this device</h2>
          <p>
            Progress, onboarding answers, practice attempts, and notebook entries live in this
            browser’s <code>localStorage</code>. This slice does not create an account, does not take
            payment, and does not sell student data.
          </p>
        </section>
        <section className="space-y-3 text-sm">
          <h2 className="font-heading text-xl text-navy">College Board and Bluebook</h2>
          <p>{LEGAL.ap}</p>
          <p>{LEGAL.supplement}</p>
        </section>
        <section className="space-y-3 text-sm">
          <h2 className="font-heading text-xl text-navy">Why parent WhatsApp is on the gate</h2>
          <p>
            After two public lessons the study gate on study.anannt.ae asks for a parent WhatsApp.
            That is how a counsellor in Dubai can reach a family about a minor. Under 13: a parent
            completes that form. We do not collect date of birth, Emirates ID, or photos here.
          </p>
        </section>
        <p className="text-sm text-muted-foreground">{LEGAL.nap}</p>
      </article>
      <SiteFooter />
    </div>
  );
}
