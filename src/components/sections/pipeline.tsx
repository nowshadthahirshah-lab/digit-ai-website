import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Bot,
  CalendarCheck,
  Inbox,
  ListFilter,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { Galaxy } from "@/components/motion/galaxy";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { chatDemo, pipeline } from "@/lib/copy";
import { cn } from "@/lib/utils";

const ICONS = {
  leads: Inbox,
  response: Bot,
  qualify: ListFilter,
  follow: RefreshCw,
  booking: CalendarCheck,
  customer: BadgeCheck,
  revenue: TrendingUp,
} as const;

// The system log mirrors the example conversation, message by message.
const LOG = [
  { at: "19:42:03", text: "Missed call detected", step: 0 },
  { at: "19:42:05", text: "Text-back sent by AI assistant", step: 1 },
  { at: "19:43:10", text: "Qualified: leak, this week, local", step: 4 },
  { at: "19:44:02", text: "Site visit booked · Thu 08:30", step: 7 },
  { at: "19:44:03", text: "Added to CRM · reminder scheduled", step: 7 },
  { at: "Wed 08:30", text: "Reminder sent automatically", step: 8 },
] as const;

const FLOW_DOTS = [0, 1, 2, 3];

export function Pipeline() {
  return (
    <section id="how-it-works" className="relative isolate overflow-hidden border-y border-line bg-surface">
      <Galaxy variant="quiet" className="-z-10 opacity-80" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2"
        style={{ background: "radial-gradient(closest-side, rgb(205 255 0 / 0.07), transparent)" }}
      />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-32">
        <Reveal className="max-w-3xl">
          <Eyebrow n="03">How it works</Eyebrow>
          <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2.75rem,12vw,5.5rem)]">
            From missed call to booked customer.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Every opportunity moves through the same system, automatically. DIGIT AI finds it, responds
            instantly, follows up, books — and tracks what it turns into.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ol className="relative mt-14 lg:mt-20 lg:grid lg:grid-cols-7 lg:gap-3" aria-label="The DIGIT AI growth pipeline">
            {/* Desktop: horizontal track through the node centres */}
            <div
              aria-hidden="true"
              className="flow-track-x absolute top-9 right-[7.14%] left-[7.14%] hidden h-px bg-gradient-to-r from-line-strong via-stone/40 to-line-strong lg:block"
            >
              {FLOW_DOTS.map((i) => (
                <span
                  key={i}
                  className="flow-dot-x absolute -top-[3px] left-0 size-[7px] rounded-full bg-stone shadow-[0_0_14px_3px_rgb(205_255_0/0.55)]"
                  style={{ ["--d" as string]: `${i * 1.4}s` }}
                />
              ))}
            </div>
            {/* Phones/tablets: the same flow, vertical */}
            <div
              aria-hidden="true"
              className="flow-track-y absolute top-[2.375rem] bottom-[2.375rem] left-[1.375rem] w-px bg-gradient-to-b from-line-strong via-stone/40 to-line-strong lg:hidden"
            >
              {FLOW_DOTS.map((i) => (
                <span
                  key={i}
                  className="flow-dot-y absolute top-0 -left-[3px] size-[7px] rounded-full bg-stone shadow-[0_0_14px_3px_rgb(205_255_0/0.55)]"
                  style={{ ["--d" as string]: `${i * 1.75}s` }}
                />
              ))}
            </div>

            {pipeline.map((s, i) => {
              const Icon = ICONS[s.key];
              return (
                <li
                  key={s.key}
                  className="relative grid grid-cols-[2.75rem_1fr] items-start gap-4 py-4 lg:flex lg:flex-col lg:items-center lg:py-0 lg:text-center"
                >
                  <span
                    className="node-pulse relative z-10 grid size-11 place-items-center rounded-full bg-bg lg:size-[4.5rem]"
                    style={{ ["--d" as string]: `${i * 0.85}s` }}
                  >
                    <Icon className="size-[1.1rem] lg:size-6" strokeWidth={1.6} />
                  </span>
                  <div className="lg:mt-5">
                    <p className="eyebrow text-[0.7rem]">
                      {String(i + 1).padStart(2, "0")} · {s.meta}
                    </p>
                    <h3 className="mt-1 font-display text-xl leading-none font-extrabold uppercase lg:text-[1.35rem]">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-snug text-muted">{s.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <ChatAndLog />
        </div>
      </div>
    </section>
  );
}

function ChatAndLog() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const messages: readonly { from: string; text: string }[] = chatDemo.messages;
  const total = messages.length;
  // step = number of messages shown; runs past the end briefly, then replays.
  const [step, setStep] = useState<number>(total);

  useEffect(() => {
    if (reduceMotion) {
      setStep(total + 1);
      return;
    }
    if (!inView) return;
    setStep(2);
    const id = window.setInterval(() => {
      setStep((s) => (s >= total + 3 ? 2 : s + 1));
    }, 1500);
    return () => window.clearInterval(id);
  }, [inView, reduceMotion, total]);

  return (
    <>
      <Reveal>
        <div ref={ref} className="glow-border rounded-xl bg-bg p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-stone text-stone-fg">
                <Bot className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">AI assistant</p>
                <p className="font-mono text-[0.7rem] tracking-[0.08em] text-subtle uppercase">{chatDemo.channel}</p>
              </div>
            </div>
            <span className="rounded-full px-2.5 py-1 font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase shadow-[var(--shadow-border)]">
              Demo
            </span>
          </div>

          {/* A fixed-height chat window: new messages land at the bottom and push older ones up,
              like a real thread, so the page around it never moves. */}
          <div
            className="mt-4 flex h-[21rem] flex-col justify-end gap-2.5 overflow-hidden sm:h-[22rem]"
            style={{ maskImage: "linear-gradient(to bottom, transparent, #000 18%)" }}
          >
            {messages.slice(0, step).map((m) => (
              <p
                key={m.text}
                className={cn(
                  "confirm-enter max-w-[85%] shrink-0 rounded-lg px-3.5 py-2.5 text-sm leading-snug",
                  m.from === "ai"
                    ? "self-start rounded-bl-sm bg-raised text-fg"
                    : "self-end rounded-br-sm bg-stone font-medium text-stone-fg",
                )}
              >
                {m.text}
              </p>
            ))}
            {messages[step]?.from === "ai" ? (
              <span className="typing flex shrink-0 gap-1 self-start rounded-lg bg-raised px-3.5 py-3" aria-hidden="true">
                <span className="size-1.5 rounded-full bg-muted" />
                <span className="size-1.5 rounded-full bg-muted" />
                <span className="size-1.5 rounded-full bg-muted" />
              </span>
            ) : null}
          </div>
          <p className="mt-4 font-mono text-[0.7rem] tracking-[0.12em] text-subtle uppercase">{chatDemo.label}</p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="h-full rounded-xl bg-bg/60 p-4 shadow-[var(--shadow-border)] sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
            <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">System log</p>
            <span className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.12em] text-stone uppercase">
              <span className="size-1.5 animate-pulse rounded-full bg-stone" />
              Automated
            </span>
          </div>
          <ol className="mt-4 flex flex-col">
            {LOG.map((l) => {
              const done = step > l.step;
              return (
                <li
                  key={l.text}
                  className={cn(
                    "grid grid-cols-[5.25rem_1fr] gap-3 border-b border-line py-3 font-mono text-xs transition-opacity duration-500 last:border-0",
                    done ? "opacity-100" : "opacity-25",
                  )}
                >
                  <span className="text-subtle tabular-nums">{l.at}</span>
                  <span className={cn("flex items-start gap-2", done ? "text-fg" : "text-muted")}>
                    <span
                      className={cn(
                        "mt-1 size-1.5 shrink-0 rounded-full transition-colors duration-500",
                        done ? "bg-stone shadow-[0_0_8px_rgb(205_255_0/0.8)]" : "bg-line-strong",
                      )}
                    />
                    {l.text}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Every step is logged, so you can see exactly what the system did — and what it turned into.
          </p>
          <p className="mt-3 font-mono text-[0.7rem] tracking-[0.12em] text-subtle uppercase">Illustrative example</p>
        </div>
      </Reveal>
    </>
  );
}
