import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { cta } from "@/lib/copy";

export function FinalCta({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(800px 280px at 50% 120%, rgb(212 207 198 / 0.12), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 md:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone">
            {cta.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            {cta.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted">{cta.lede}</p>
          <div className="mt-9 flex justify-center">
            <Magnetic>
              <Button size="lg" onClick={onBook}>
                {cta.button}
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
