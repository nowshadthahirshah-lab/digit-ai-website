import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight, Check, X } from "lucide-react";
import { LoopVideo } from "@/components/motion/loop-video";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { scenarios } from "@/lib/copy";

export function Scenarios() {
  const [active, setActive] = useState<string>(scenarios[0].key);

  return (
    <section id="scenarios" className="relative border-y border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow n="07">Scenarios</Eyebrow>
            <h2 className="mt-4 max-w-[11ch] font-display text-[clamp(2.75rem,12vw,5.5rem)]">
              Before DIGIT AI. After DIGIT AI.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted">
            Illustrative scenarios showing how the system is designed to work in real business settings.
            They are examples, not client results.
          </p>
        </Reveal>

        <Tabs.Root value={active} onValueChange={setActive} className="mt-12 lg:mt-16">
          <Tabs.List aria-label="Scenarios" className="rail -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 sm:[mask-image:none]">
            {scenarios.map((s, i) => (
              <Tabs.Trigger
                key={s.key}
                value={s.key}
                className="flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-bg px-4 text-sm font-medium whitespace-nowrap text-muted shadow-[var(--shadow-border)] transition-colors hover:text-fg data-[state=active]:bg-stone data-[state=active]:text-stone-fg"
              >
                <span className="font-mono text-[0.7rem] opacity-70">{String(i + 1).padStart(2, "0")}</span>
                {s.tab}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {scenarios.map((s) => (
            <Tabs.Content key={s.key} value={s.key} className="mt-6 rounded-xl">
              <article className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
                <div className="step-in">
                  <div className="relative overflow-hidden rounded-xl shadow-[var(--shadow-border)]">
                    <LoopVideo src={s.video} poster={s.poster} kenBurns className="aspect-[16/10]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-bg/80 px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.14em] text-stone uppercase backdrop-blur-sm">
                      Illustrative scenario
                    </span>
                    <p className="absolute right-4 bottom-4 left-4 font-display text-2xl leading-tight font-extrabold uppercase sm:text-3xl">
                      {s.business}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Journey tone="before" steps={s.before} />
                    <Journey tone="after" steps={s.after} />
                  </div>
                </div>

                <ol className="flex flex-col">
                  <Chapter n="01" title="The business" delay={60}>
                    {s.business}.
                  </Chapter>
                  <Chapter n="02" title="The problem" delay={140}>
                    {s.problem}
                  </Chapter>
                  <Chapter n="03" title="What DIGIT AI builds" delay={220}>
                    {s.built}
                  </Chapter>
                  <Chapter n="04" title="The automation" delay={300}>
                    <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-2">
                      {s.automation.map((a, i) => (
                        <span key={a} className="flex items-center gap-2">
                          <span className="rounded-full bg-bg px-3 py-1.5 text-xs text-fg shadow-[var(--shadow-border)]">{a}</span>
                          {i < s.automation.length - 1 ? <ArrowRight className="size-3.5 text-stone" aria-hidden="true" /> : null}
                        </span>
                      ))}
                    </span>
                  </Chapter>
                  <Chapter n="05" title="The outcome it’s designed for" delay={380} highlight>
                    {s.outcome}
                  </Chapter>
                </ol>
              </article>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}

function Chapter({
  n,
  title,
  children,
  delay,
  highlight = false,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  delay: number;
  highlight?: boolean;
}) {
  return (
    <li
      className="step-in grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-4 first:pt-0 last:border-0"
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      <span className="pt-0.5 font-mono text-xs text-stone">{n}</span>
      <div>
        <p className="font-mono text-[0.7rem] tracking-[0.14em] text-subtle uppercase">{title}</p>
        <div className={highlight ? "mt-1.5 font-display text-2xl leading-tight font-bold text-fg" : "mt-1.5 text-base leading-relaxed text-fg"}>
          {children}
        </div>
      </div>
    </li>
  );
}

function Journey({ tone, steps }: { tone: "before" | "after"; steps: readonly string[] }) {
  const after = tone === "after";
  return (
    <div className={after ? "rounded-lg bg-bg p-4 shadow-[0_0_0_1px_rgb(205_255_0/0.35)]" : "rounded-lg bg-bg/50 p-4 shadow-[var(--shadow-border)]"}>
      <p className={after ? "font-mono text-[0.7rem] tracking-[0.14em] text-stone uppercase" : "font-mono text-[0.7rem] tracking-[0.14em] text-subtle uppercase"}>
        {after ? "After" : "Before"}
      </p>
      <ol className="mt-3 flex flex-col gap-2">
        {steps.map((step, i) => {
          const lastStep = i === steps.length - 1;
          return (
            <li
              key={step}
              className="step-in flex items-center gap-2.5 text-sm"
              style={{ ["--d" as string]: `${(after ? 500 : 200) + i * 140}ms` }}
            >
              {lastStep ? (
                after ? (
                  <Check className="size-4 shrink-0 text-stone" />
                ) : (
                  <X className="size-4 shrink-0 text-subtle" />
                )
              ) : (
                <span className={after ? "size-1.5 shrink-0 rounded-full bg-stone" : "size-1.5 shrink-0 rounded-full bg-subtle"} />
              )}
              <span className={after ? "text-fg" : lastStep ? "text-muted line-through decoration-subtle" : "text-muted"}>{step}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
