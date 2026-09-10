import Link from "next/link";
import { AnanntLogo } from "@/components/layout/Logo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center gap-4 px-4">
      <AnanntLogo />
      <h1 className="font-heading text-3xl text-navy">That page is not on the syllabus map</h1>
      <p className="text-sm text-muted-foreground">
        The route does not match a published lesson, item, investigation, or mock. If you followed a plan link, the content may have been withdrawn in the CMS.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button render={<Link href="/" />}>Home</Button>
        <Button variant="outline" render={<Link href="/learn/zero-flux-is-not-zero-field" />}>
          Lesson 1
        </Button>
      </div>
      </div>
      <SiteFooter />
    </div>
  );
}
