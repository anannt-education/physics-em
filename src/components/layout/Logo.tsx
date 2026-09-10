import { cn } from "@/lib/utils";

export function AnanntLogo({
  className,
  wordmark = true,
  inverse = false,
}: {
  className?: string;
  wordmark?: boolean;
  inverse?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8 shrink-0"
        aria-hidden
        role="img"
      >
        <title>Anannt mark</title>
        <rect width="40" height="40" rx="10" fill={inverse ? "#F6F4EE" : "#0B1F3A"} />
        <circle cx="20" cy="20" r="11" fill="none" stroke={inverse ? "#0B1F3A" : "#C49A3C"} strokeWidth="1.2" strokeDasharray="2.5 2" />
        <circle cx="20" cy="20" r="2.2" fill={inverse ? "#0B1F3A" : "#C49A3C"} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const a = (deg * Math.PI) / 180;
          const x1 = 20 + Math.cos(a) * 4.2;
          const y1 = 20 + Math.sin(a) * 4.2;
          const x2 = 20 + Math.cos(a) * 15.5;
          const y2 = 20 + Math.sin(a) * 15.5;
          return (
            <line
              key={deg}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={inverse ? "#163056" : "#F3E6C4"}
              strokeWidth="1.15"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      {wordmark ? (
        <span className={cn("leading-tight", inverse ? "text-paper" : "text-navy")}>
          <span className="font-heading block text-[1.15rem] font-semibold tracking-tight">
            Anannt
          </span>
          <span className={cn("block text-[0.65rem] tracking-[0.14em] uppercase", inverse ? "text-amber-soft" : "text-muted-foreground")}>
            Physics C · E&amp;M
          </span>
        </span>
      ) : null}
    </span>
  );
}
