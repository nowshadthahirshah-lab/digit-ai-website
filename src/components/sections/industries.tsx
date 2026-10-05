import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {
  Briefcase,
  Building2,
  Calculator,
  Car,
  Droplets,
  Dumbbell,
  Hammer,
  HeartPulse,
  House,
  Scale,
  Scissors,
  ShoppingBag,
  Smile,
  Sparkles,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { industries, type IndustryIcon } from "@/lib/copy";
import { waLink, waLinkProps, waMessages } from "@/lib/whatsapp";

const ICONS: Record<IndustryIcon, typeof Sparkles> = {
  sparkles: Sparkles,
  smile: Smile,
  heart: HeartPulse,
  scale: Scale,
  calculator: Calculator,
  house: House,
  droplets: Droplets,
  zap: Zap,
  car: Car,
  dumbbell: Dumbbell,
  scissors: Scissors,
  utensils: UtensilsCrossed,
  building: Building2,
  hammer: Hammer,
  bag: ShoppingBag,
  briefcase: Briefcase,
};

export function Industries() {
  const [active, setActive] = useState(industries[0]!.key);

  return (
    <section id="industries" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow n="04">Industries</Eyebrow>
            <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2.75rem,12vw,5.5rem)]">
              Built for modern businesses.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted">
            The system adapts to how your customers actually get in touch. Pick your industry to see the
            journey DIGIT AI automates.
          </p>
        </Reveal>

        <Tabs.Root value={active} onValueChange={setActive} className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <Tabs.List
            aria-label="Industries"
            className="rail -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-2 lg:content-start lg:gap-2 lg:overflow-visible lg:px-0 lg:[mask-image:none]"
          >
            {industries.map((ind) => {
              const Icon = ICONS[ind.icon];
              return (
                <Tabs.Trigger
                  key={ind.key}
                  value={ind.key}
                  className="group flex min-h-11 shrink-0 items-center gap-2.5 rounded-full bg-surface px-4 text-sm font-medium whitespace-nowrap text-muted shadow-[var(--shadow-border)] transition-[background-color,color,box-shadow] duration-200 hover:text-fg data-[state=active]:bg-stone data-[state=active]:text-stone-fg data-[state=active]:shadow-[0_0_24px_-4px_rgb(205_255_0/0.6)] lg:rounded-lg lg:py-3"
                >
                  <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                  {ind.name}
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>

          {industries.map((ind) => {
            const Icon = ICONS[ind.icon];
            return (
              <Tabs.Content key={ind.key} value={ind.key} className="rounded-xl lg:sticky lg:top-28 lg:self-start">
                <article className="glow-border relative overflow-hidden rounded-xl bg-surface p-5 sm:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full"
                    style={{ background: "radial-gradient(closest-side, rgb(205 255 0 / 0.12), transparent)" }}
                  />
                  <div className="step-in flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-full bg-stone text-stone-fg">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display text-3xl leading-none font-extrabold uppercase sm:text-4xl">{ind.name}</h3>
                  </div>

                  <div className="mt-7 grid gap-7 sm:grid-cols-[1fr_1.1fr]">
                    <div className="step-in" style={{ ["--d" as string]: "80ms" }}>
                      <p className="eyebrow">Common problem</p>
                      <p className="mt-2 text-lg leading-snug text-fg">{ind.problem}</p>
                    </div>

                    <div>
                      <p className="eyebrow step-in" style={{ ["--d" as string]: "120ms" }}>
                        DIGIT AI automation
                      </p>
                      <ol className="relative mt-3">
                        <span
                          aria-hidden="true"
                          className="draw-y absolute top-2 bottom-2 left-[0.3125rem] w-px bg-gradient-to-b from-stone to-stone/20"
                          style={{ ["--d" as string]: "160ms" }}
                        />
                        {ind.flow.map((step, i) => (
                          <li
                            key={step}
                            className="step-in relative flex items-start gap-3 py-1.5"
                            style={{ ["--d" as string]: `${200 + i * 110}ms` }}
                          >
                            <span className="relative z-10 mt-1.5 size-[0.6875rem] shrink-0 rounded-full border-2 border-stone bg-bg" />
                            <span className="text-sm leading-snug text-fg">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div
                    className="step-in mt-7 border-l-2 border-stone pl-4"
                    style={{ ["--d" as string]: "760ms" }}
                  >
                    <p className="eyebrow">Business outcome</p>
                    <p className="mt-1.5 font-display text-2xl leading-tight font-bold">{ind.outcome}</p>
                  </div>

                  <a
                    href={waLink(waMessages.industry(ind.audience))}
                    {...waLinkProps}
                    className="step-in mt-7 inline-flex min-h-11 items-center gap-2.5 rounded-full px-4 text-sm font-semibold text-fg shadow-[0_0_0_1px_rgb(37_211_102/0.45)] transition-colors hover:bg-[#25D366]/10"
                    style={{ ["--d" as string]: "860ms" }}
                  >
                    <WhatsAppIcon className="size-[1.1rem] text-[#25D366]" />
                    Ask how it works for {ind.audience}
                  </a>
                </article>
              </Tabs.Content>
            );
          })}
        </Tabs.Root>
      </div>
    </section>
  );
}
