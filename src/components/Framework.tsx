import { FRAMEWORK } from "@/content/curriculum";
import { cn } from "@/lib/utils";

export function FrameworkStrip({ active }: { active?: string }) {
  return (
    <ol className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      {FRAMEWORK.steps.map((s, i) => (
        <li
          key={s.id}
          className={cn(
            "rounded-lg border border-border bg-card px-3 py-2",
            active === s.id && "border-amber ring-1 ring-amber/40",
          )}
        >
          <p className="font-heading text-sm font-medium text-navy">
            {i + 1}. {s.title}
          </p>
          <p className="mt-1 text-[0.7rem] leading-snug text-muted-foreground">{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function MasteryChip({ state }: { state: string }) {
  const map: Record<string, string> = {
    not_assessed: "bg-muted text-muted-foreground",
    learning: "bg-secondary text-secondary-foreground",
    provisional: "bg-amber-soft text-navy",
    independent: "bg-navy text-paper",
    retained: "bg-navy text-amber-soft",
    needs_review: "bg-destructive/10 text-destructive",
  };
  const label: Record<string, string> = {
    not_assessed: "Not assessed",
    learning: "Learning with support",
    provisional: "Provisional",
    independent: "Independent",
    retained: "Retained",
    needs_review: "Needs review",
  };
  return (
    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[0.7rem] font-medium", map[state] ?? "bg-muted")}>
      {label[state] ?? state}
    </span>
  );
}
