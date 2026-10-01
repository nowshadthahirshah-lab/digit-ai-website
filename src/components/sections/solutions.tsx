import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { BadgeCheck, CalendarCheck, ListFilter, MessageSquareText, Radar, RefreshCw, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { solutions } from "@/lib/copy";

const ICONS = {
  capture: Radar,
  respond: MessageSquareText,
  qualify: ListFilter,
  follow: RefreshCw,
  book: CalendarCheck,
  convert: BadgeCheck,
  grow: TrendingUp,
} as const;

export function Solutions() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="solutions" className="relative">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow n="01">Solutions</Eyebrow>
          <h2 className="mt-4 max-w-[9ch] font-display text-[clamp(2.75rem,12vw,5.5rem)]">What we actually do.</h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
            DIGIT AI doesn’t just “build AI”. We build the system around it — so more opportunities are
            captured, answered, followed up and booked, without adding to your workload.
          </p>
        </Reveal>

        <ol ref={listRef} className="relative">
          {/* Progress line draws as you scroll through the system */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-line" />
          <motion.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[1.375rem] w-px origin-top bg-stone shadow-[0_0_12px_rgb(205_255_0/0.6)]"
            style={{ scaleY: reduceMotion ? 1 : progress }}
          />
          {solutions.map((s, i) => {
            const Icon = ICONS[s.key];
            return (
              <Reveal key={s.key} as="li" delay={40} className="relative grid grid-cols-[2.75rem_1fr] gap-5 pb-10 last:pb-0 sm:gap-7">
                <span className="relative z-10 grid size-11 place-items-center rounded-full bg-bg text-stone shadow-[0_0_0_1px_rgb(205_255_0/0.35)]">
                  <Icon className="size-[1.1rem]" strokeWidth={1.75} />
                </span>
                <div className="pt-1">
                  <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-display text-[clamp(2rem,8vw,3.25rem)] leading-none font-extrabold uppercase">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-lg font-medium text-fg">{s.line}</p>
                  <p className="mt-2 max-w-md text-base leading-relaxed text-muted">{s.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.1em] text-muted uppercase shadow-[var(--shadow-border)]"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
