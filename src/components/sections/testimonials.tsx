import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { testimonials } from "@/lib/copy";

export function Testimonials() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-subtle">
            06 / Owners
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            In their words, not ours.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} as="article">
              <TiltCard className="h-full rounded-xl">
                <blockquote className="flex h-full flex-col rounded-xl bg-bg p-6 shadow-[var(--shadow-border)] sm:p-7">
                  <p className="flex-1 text-base leading-relaxed text-fg">“{t.quote}”</p>
                  <footer className="mt-8">
                    <cite className="not-italic">
                      <span className="block font-display text-sm font-semibold tracking-tight">
                        {t.name}
                      </span>
                      <span className="mt-1 block text-xs text-muted">{t.role}</span>
                    </cite>
                  </footer>
                </blockquote>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
