import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { services } from "@/lib/copy";

export function Services() {
  return (
    <section id="services" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-subtle">
            02 / Services
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            The stack that actually books the job.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 70} as="article">
              <TiltCard className="h-full rounded-xl">
                <div className="flex h-full flex-col rounded-xl bg-bg p-6 shadow-[var(--shadow-border)] sm:p-7">
                  <span className="font-display text-sm font-semibold tracking-tight text-subtle">
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
