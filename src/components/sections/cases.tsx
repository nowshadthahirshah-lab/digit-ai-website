import { CountUp } from "@/components/motion/count-up";
import { LoopVideo } from "@/components/motion/loop-video";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { cases } from "@/lib/copy";

export function Cases() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-subtle">01 / Work</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Three businesses. Same leak. Different rooms.
        </h2>
      </Reveal>

      <div className="mt-14 flex flex-col gap-20 md:gap-28">
        {cases.map((c, i) => (
          <article key={c.id} className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <Reveal delay={40} className={i % 2 === 1 ? "md:order-2" : undefined}>
              <TiltCard className="rounded-xl">
                <div className="overflow-hidden rounded-xl bg-raised shadow-[var(--shadow-border)]">
                  <LoopVideo
                    src={c.video}
                    poster={c.poster}
                    kenBurns
                    className="aspect-video"
                  />
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={120} className={i % 2 === 1 ? "md:order-1" : undefined}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">
                {c.sector}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {c.client}
              </h3>
              <p className="mt-4 text-lg leading-snug text-fg">{c.title}</p>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted">{c.body}</p>
              <dl className="mt-8 grid grid-cols-3 gap-4">
                {c.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                      <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
