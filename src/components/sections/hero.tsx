import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Galaxy } from "@/components/motion/galaxy";
import { OrbitCore } from "@/components/motion/orbit-core";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { bookLabel, contact, hero } from "@/lib/copy";
import { waLink, waLinkProps, waMessages } from "@/lib/whatsapp";

export function Hero({ onBook }: { onBook: () => void }) {
  const last = hero.lines.length - 1;

  return (
    <section id="top" className="relative isolate flex min-h-[92svh] items-end overflow-hidden sm:min-h-[100svh] sm:items-center">
      {/* Backdrop: nebula light, grid, starfield/network, then a fade into the page. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="nebula -top-[20%] -right-[15%] size-[80vmax] opacity-70"
          style={{ background: "radial-gradient(closest-side, rgb(205 255 0 / 0.13), transparent 70%)" }}
        />
        <div
          className="nebula -bottom-[30%] -left-[20%] size-[75vmax] opacity-80"
          style={{
            background: "radial-gradient(closest-side, rgb(139 152 255 / 0.14), transparent 70%)",
            animationDelay: "-9s",
          }}
        />
        <div className="space-grid absolute inset-0" />
        <Galaxy variant="hero" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-12 sm:px-8 sm:pt-28 sm:pb-16 lg:pb-20">
        <div className="pointer-events-none absolute top-1/2 right-0 hidden w-[min(44vw,560px)] -translate-y-1/2 opacity-90 lg:block xl:right-4">
          <OrbitCore />
        </div>

        <div className="relative max-w-3xl">
          <p className="enter eyebrow flex items-center gap-2.5" style={{ ["--d" as string]: "60ms" }}>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-stone opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-stone" />
            </span>
            {hero.eyebrow}
          </p>

          <h1 className="mt-5 font-display text-[clamp(3rem,min(14.5vw,13.5svh),7.5rem)] text-fg sm:mt-6">
            {hero.lines.map((line, i) => (
              <span key={line} className="line-mask">
                <span style={{ ["--d" as string]: `${140 + i * 110}ms` }}>
                  {i === last ? <span className="text-shine">{line}</span> : line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="enter mt-6 max-w-[34rem] text-base leading-relaxed text-muted sm:mt-7 sm:text-lg"
            style={{ ["--d" as string]: "620ms" }}
          >
            {hero.lede}
          </p>

          <div
            className="enter mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ ["--d" as string]: "740ms" }}
          >
            <Magnetic className="w-full sm:w-auto">
              <Button size="lg" className="btn-glow w-full sm:w-auto" asChild>
                <a href="#how-it-works">
                  {hero.primary}
                  <ArrowDown className="size-4" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Button size="lg" variant="ghost" className="w-full bg-bg/40 backdrop-blur-sm sm:w-auto" onClick={onBook}>
                {bookLabel}
                <ArrowRight className="size-4" />
              </Button>
            </Magnetic>
          </div>

          <a
            href={waLink(waMessages.general)}
            {...waLinkProps}
            className="enter mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            style={{ ["--d" as string]: "820ms" }}
          >
            <WhatsAppIcon className="size-4 text-[#25D366]" />
            Prefer WhatsApp? Message <span className="font-medium whitespace-nowrap text-fg">{contact.whatsappDisplay}</span>
          </a>

          <ol
            className="enter mt-6 hidden flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.7rem] tracking-[0.14em] text-subtle uppercase sm:flex"
            style={{ ["--d" as string]: "880ms" }}
            aria-label="How the system works"
          >
            {hero.steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span className={i === hero.steps.length - 1 ? "text-stone" : undefined}>{s}</span>
                {i < hero.steps.length - 1 ? <span aria-hidden="true" className="h-px w-5 bg-line-strong" /> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
