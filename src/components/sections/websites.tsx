import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { websites } from "@/lib/copy";

export function Websites({ onWebsite }: { onWebsite: () => void }) {
  const { offer } = websites;
  return (
    <section id="websites" className="relative border-y border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <Eyebrow n="02">{websites.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.5rem,10vw,4.75rem)]">{websites.headline}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{websites.intro}</p>
          <ul className="mt-8 flex flex-col gap-4">
            {websites.features.map((f) => (
              <li key={f.title} className="flex gap-3 text-base leading-snug">
                <Check className="mt-0.5 size-4 shrink-0 text-stone" />
                <span>
                  <strong className="font-semibold text-fg">{f.title}:</strong> <span className="text-muted">{f.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80}>
          <div className="glow-border relative flex h-full flex-col overflow-hidden rounded-xl bg-raised p-6 sm:p-8">
            <p className="font-mono text-[0.7rem] tracking-[0.12em] text-stone uppercase">{offer.label}</p>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-6xl leading-none font-extrabold tracking-tight">{offer.price}</span>
              <span className="text-sm text-muted">{offer.priceNote}</span>
            </div>
            <p className="mt-2 text-sm text-subtle">{offer.standard}</p>

            <ul className="mt-7 flex flex-col gap-5 border-t border-line pt-6">
              {offer.terms.map((t) => (
                <li key={t.title} className="text-sm leading-relaxed">
                  <strong className="font-semibold text-fg">{t.title}:</strong> <span className="text-muted">{t.body}</span>
                </li>
              ))}
            </ul>

            <Magnetic className="mt-8 w-full">
              <Button size="lg" className="btn-glow w-full" onClick={onWebsite}>
                {websites.cta}
                <ArrowRight className="size-4" />
              </Button>
            </Magnetic>
            <p className="mt-4 text-xs leading-relaxed text-subtle">{websites.smallPrint}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
