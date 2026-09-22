import { cn } from "@/lib/utils";

export function Logo({ className, markOnly = false }: { className?: string; markOnly?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 28 28" className="size-7 shrink-0" aria-hidden="true">
        <rect x="1" y="1" width="26" height="26" rx="7" style={{ fill: "#CDFF00" }} />
        <path
          d="M8.6 8.2h7.4c3.2 0 5.4 1.9 5.4 5 0 3.1-2.2 5.1-5.4 5.1h-4.1V19.8H8.6V8.2zm3.3 2.55v4.9h3.8c1.55 0 2.55-1 2.55-2.45s-1-2.45-2.55-2.45h-3.8z"
          className="fill-bg"
        />
      </svg>
      {markOnly ? (
        <span className="sr-only">DIGIT AI</span>
      ) : (
        <span className="font-display text-lg font-extrabold tracking-tight leading-none" style={{ color: "#CDFF00" }}>
          DIGIT AI
        </span>
      )}
    </span>
  );
}
