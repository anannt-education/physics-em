import Link from "next/link";
import { LEGAL, PUBLIC_LESSONS, SITE_ORIGIN, whatsappHelpUrl } from "@/lib/mount";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-navy px-4 py-8 text-xs text-paper">
      <div className="mx-auto max-w-6xl space-y-3">
        <p className="font-heading text-sm tracking-tight">Anannt Education · Study</p>
        <p>{LEGAL.ap}</p>
        <p>{LEGAL.psat}</p>
        <p>{LEGAL.supplement}</p>
        <p>{LEGAL.nap}</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            <li>
              <Link href="/" className="underline-offset-2 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href={PUBLIC_LESSONS[0].path} className="underline-offset-2 hover:underline">
                Lesson 1: flux
              </Link>
            </li>
            <li>
              <Link href={PUBLIC_LESSONS[1].path} className="underline-offset-2 hover:underline">
                Lesson 2: line of charge
              </Link>
            </li>
            <li>
              <Link href="/exam/2027" className="underline-offset-2 hover:underline">
                2027 exam guide
              </Link>
            </li>
            <li>
              <Link href="/faq" className="underline-offset-2 hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/legal" className="underline-offset-2 hover:underline">
                Legal
              </Link>
            </li>
            <li>
              <a href={`${SITE_ORIGIN}/start?subject=physics-em`} className="underline-offset-2 hover:underline">
                After two lessons
              </a>
            </li>
            <li>
              <a href={whatsappHelpUrl("a sitting-choice call")} className="underline-offset-2 hover:underline">
                WhatsApp Burjuman
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
