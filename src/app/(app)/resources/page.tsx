import Link from "next/link";
import { SIGNATURE_RESOURCES } from "@/content/resources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResourcesIndex() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-navy">Signature resources</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Named teaching assets used across lessons, mock review, and instructor feedback. They are not a video library and not a substitute for independent items. Review dates are shown; Anannt does not claim College Board endorsement.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {SIGNATURE_RESOURCES.map((r) => (
          <Card key={r.slug}>
            <CardHeader>
              <CardTitle>
                <Link href={`/resources/${r.slug}`} className="hover:underline">
                  {r.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {r.dek}
              <p className="mt-2 text-xs">Reviewed {r.reviewed}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
