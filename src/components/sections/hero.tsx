import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { LoopVideo } from "@/components/motion/loop-video";
import { hero } from "@/lib/copy";

export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <LoopVideo
        src="/media/hero.mp4"
        poster="/media/hero-poster.jpg"
        className="absolute inset-0"
        kenBurns
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(10 10 12 / 0.42) 0%, rgb(10 10 12 / 0.55) 42%, rgb(10 10 12 / 0.92) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgb(10 10 12 / 0.55) 0%, rgb(10 10 12 / 0.12) 55%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-28 pt-28 sm:px-8 md:pb-32">
        <p
          className="enter text-xs font-semibold uppercase tracking-[0.22em] text-stone"
          style={{ ["--d" as string]: "40ms" }}
        >
          {hero.eyebrow}
        </p>
        <h1
          className="enter mt-5 max-w-4xl font-display text-5xl font-extrabold tracking-tight text-fg sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ ["--d" as string]: "120ms" }}
        >
          {hero.headline}
        </h1>
        <p
          className="enter mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          style={{ ["--d" as string]: "220ms" }}
        >
          {hero.lede}
        </p>
        <div
          className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ ["--d" as string]: "320ms" }}
        >
          <Magnetic>
            <Button size="lg" onClick={onBook}>
              {hero.primary}
            </Button>
          </Magnetic>
          <Magnetic>
            <Button size="lg" variant="ghost" asChild>
              <a href="#diary">
                {hero.secondary}
                <ArrowDown className="size-4" />
              </a>
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
