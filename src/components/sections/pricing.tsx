import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { plans } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function Pricing({ onBook }: { onBook: () => void }) {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-subtle">
          07 / Pricing
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-5xl font-black tracking-tighter sm:text-6xl leading-none">
          One-off builds. No hostage retainers.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 80} as="article">
            <TiltCard className="h-full rounded-xl">
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl p-6 sm:p-7",
                  p.featured
                    ? "bg-fg text-bg"
                    : "bg-surface text-fg shadow-[var(--shadow-border)]",
                )}
              >
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h3 className="font-display text-xl font-extrabold tracking-tight leading-none">{p.name}</h3>
                  {p.featured ? (
                    <span className="rounded-full bg-bg px-2.5 py-1 text-xs font-semibold text-fg tracking-tight">
                      Most chosen
                    </span>
                  ) : null}
                </div>
                <div className={cn("mt-4 mb-2 font-display font-bold tracking-tight leading-none", p.featured ? "text-6xl" : "text-5xl")}>
                  {p.price}
                </div>
                <p className={cn("text-xs font-medium tracking-tight", p.featured ? "text-bg/65" : "text-muted")}>
                  {p.cadence}
                </p>
                <p className={cn("mt-5 text-sm leading-relaxed font-medium", p.featured ? "text-bg/80" : "text-muted")}>
                  {p.blurb}
                </p>
                <ul className="mt-7 flex flex-1 flex-col gap-3.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-snug font-medium tracking-tight">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          p.featured ? "text-bg" : "text-stone",
                        )}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Magnetic className="mt-8 w-full">
                  <Button
                    className="w-full"
                    variant={p.featured ? "ink" : "primary"}
                    onClick={onBook}
                  >
                    Claim this slot
                  </Button>
                </Magnetic>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
