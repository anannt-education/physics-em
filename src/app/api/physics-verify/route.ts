import { runPhysicsVerification } from "@/lib/physics/verify";

export async function GET() {
  const checks = runPhysicsVerification();
  const failed = checks.filter((c) => !c.pass);
  return Response.json({
    generatedAt: new Date().toISOString(),
    passed: failed.length === 0,
    total: checks.length,
    failed: failed.length,
    checks,
    note: "Deterministic library tests. Idealizations are listed on each check. These are not LLM-invented numbers.",
  });
}
