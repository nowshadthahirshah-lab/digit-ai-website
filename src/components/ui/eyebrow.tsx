import { cn } from "@/lib/utils";

export function Eyebrow({ n, children, className }: { n?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-2", className)}>
      {n ? <span className="text-stone">{n}</span> : null}
      {n ? <span aria-hidden="true">/</span> : null}
      <span>{children}</span>
    </p>
  );
}
