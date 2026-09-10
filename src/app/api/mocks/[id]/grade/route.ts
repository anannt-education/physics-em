import { NextResponse } from "next/server";
import { MOCK1_KEYS } from "@/content/mocks/form1-keys";
import { MOCK1_PUBLIC } from "@/content/mocks/form1-public";

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  if (!id.startsWith("mock-2027")) {
    return NextResponse.json({ error: "Unknown form" }, { status: 404 });
  }
  const body = (await req.json()) as { answers?: Record<string, string>; review?: boolean };
  const answers = body.answers ?? {};
  let score = 0;
  const byUnit: Record<string, { c: number; n: number }> = {};
  const items = MOCK1_PUBLIC.map((q) => {
    const key = MOCK1_KEYS[q.id];
    const picked = answers[q.id];
    const correct = Boolean(key && picked === key.correct);
    if (correct) score += 1;
    const u = String(q.unit);
    byUnit[u] = byUnit[u] ?? { c: 0, n: 0 };
    byUnit[u].n += 1;
    if (correct) byUnit[u].c += 1;
    return {
      id: q.id,
      correct,
      picked,
      key: body.review ? key?.correct : undefined,
      explanation: body.review ? key?.explanation : undefined,
    };
  });
  return NextResponse.json({
    score,
    total: MOCK1_PUBLIC.length,
    byUnit,
    items: body.review ? items : undefined,
  });
}
