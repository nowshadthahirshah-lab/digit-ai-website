import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { stats } from "@/lib/copy";

export function StatsBar() {
  return (
    <section aria-label="Results" className="relative z-10 -mt-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="grid grid-cols-2 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 px-5 py-6 sm:px-7 sm:py-8"
              style={{
                boxShadow: i > 0 ? "inset 1px 0 0 0 var(--color-line)" : undefined,
              }}
            >
              <p className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
