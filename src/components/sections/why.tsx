import { Reveal } from "@/components/motion/reveal";
import { why } from "@/lib/copy";

export function WhyUs() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-subtle">03 / Why us</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            A small studio on purpose.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            We don’t run ads for anyone with a card. Two builds a month, owner-run businesses, a
            diary that is live before we talk about brand colours.
          </p>
        </Reveal>
        <ol className="divide-y divide-line border-y border-line">
          {why.map((line, i) => (
            <Reveal key={line} delay={i * 60} as="li">
              <div className="flex gap-5 py-5 sm:py-6">
                <span className="font-display text-sm font-semibold tabular-nums text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-relaxed text-fg sm:text-lg">{line}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
