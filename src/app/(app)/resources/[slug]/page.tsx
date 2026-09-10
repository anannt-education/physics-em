import { notFound } from "next/navigation";
import Link from "next/link";
import { SIGNATURE_RESOURCES, resourceBySlug } from "@/content/resources";
import { RichText } from "@/components/math/RichText";
import { IssueButton } from "@/components/IssueButton";
import { FrameworkStrip } from "@/components/Framework";

export function generateStaticParams() {
  return SIGNATURE_RESOURCES.map((r) => ({ slug: r.slug }));
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resourceBySlug(slug);
  if (!resource) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        <Link href="/resources" className="hover:underline">
          Signature resources
        </Link>{" "}
        · reviewed {resource.reviewed}
      </p>
      <h1 className="font-heading text-3xl text-navy">{resource.title}</h1>
      <p className="text-base leading-relaxed text-muted-foreground">{resource.dek}</p>
      <FrameworkStrip />
      {resource.sections.map((s) => (
        <section key={s.heading} className="space-y-2">
          <h2 className="font-heading text-xl">{s.heading}</h2>
          <p className="text-sm leading-relaxed">
            <RichText text={s.body} />
          </p>
        </section>
      ))}
      <IssueButton targetType="lesson" targetId={`resource:${resource.slug}`} />
    </article>
  );
}
