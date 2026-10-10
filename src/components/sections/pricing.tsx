import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { bookLabel, plans, pricingNote } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { waLink, waLinkProps, waMessages } from "@/lib/whatsapp";

export function Pricing({ onBook }: { onBook: () => void }) {
  return (
    <section id="pricing" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow n="08">Pricing</Eyebrow>
            <h2 className="mt-4 max-w-[10ch] font-display text-[clamp(2.75rem,12vw,5.5rem)]">
              Priced around growth.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted">
            You’re not buying software seats. You’re investing in a system designed to capture, convert
            and keep more customers — and every plan reports exactly what it produced.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mx-auto md:max-w-xl lg:mt-16 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
          {plans.map((p) => (
            // Plain article, not <Reveal>: Reveal server-renders at opacity 0, which hid these cards
            // (and their monthly prices) with JavaScript off or before the scroll trigger fired.
            <article key={p.name} className="h-full">
              <TiltCard className="h-full rounded-xl">
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-xl p-6 sm:p-8",
                    p.featured ? "glow-border bg-raised" : "bg-surface shadow-[var(--shadow-border)]",
                  )}
                >
                  {p.featured ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-32 left-1/2 size-80 -translate-x-1/2 rounded-full"
                      style={{ background: "radial-gradient(closest-side, rgb(205 255 0 / 0.16), transparent)" }}
                    />
                  ) : null}

                  <div className="relative flex items-center justify-between gap-3">
                    <h3 className="font-display text-4xl leading-none font-extrabold uppercase">{p.name}</h3>
                    {p.featured ? (
                      <span className="rounded-full bg-stone px-2.5 py-1 font-mono text-[0.7rem] font-medium tracking-[0.12em] text-stone-fg uppercase">
                        Recommended
                      </span>
                    ) : null}
                  </div>
                  <p className="relative mt-3 text-sm leading-snug text-muted">{p.tagline}</p>

                  <p className="relative mt-6 border-l-2 border-stone pl-3 text-base leading-snug font-medium text-fg">
                    {p.value}
                  </p>

                  <div className="relative mt-7 flex items-baseline gap-1.5">
                    {p.price ? (
                      <>
                        <span className="font-display text-6xl leading-none font-extrabold tracking-tight">{p.price}</span>
                        <span className="text-sm text-muted">{p.cadence}</span>
                      </>
                    ) : (
                      <span className="font-display text-3xl leading-tight font-extrabold tracking-tight">
                        Quoted after your free audit
                      </span>
                    )}
                  </div>
                  <p className="relative mt-2 text-xs text-muted">{p.setup}</p>
                  <p className="relative mt-1 font-mono text-[0.7rem] tracking-[0.1em] text-subtle uppercase">{p.fit}</p>

                  <ul className="relative mt-7 flex flex-1 flex-col gap-3 border-t border-line pt-6">
                    {p.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-snug">
                        <Check className="mt-0.5 size-4 shrink-0 text-stone" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Magnetic className="relative mt-8 w-full">
                    <Button
                      className={cn("w-full", p.featured && "btn-glow")}
                      variant={p.featured ? "primary" : "ghost"}
                      onClick={onBook}
                    >
                      {bookLabel}
                    </Button>
                  </Magnetic>
                  <a
                    href={waLink(waMessages.plan(p.name))}
                    {...waLinkProps}
                    className="relative mt-2 inline-flex min-h-11 items-center justify-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <WhatsAppIcon className="size-4 text-[#25D366]" />
                    or ask about {p.name} on WhatsApp
                  </a>
                </div>
              </TiltCard>
            </article>
          ))}
        </div>
        {/* Non-breaking hyphen keeps “7-day” together when the line wraps. */}
        <p className="mt-10 text-center text-sm text-balance text-muted">{pricingNote.replace("7-day", "7‑day")}</p>
      </div>
    </section>
  );
}
