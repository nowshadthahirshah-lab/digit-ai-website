import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useSmoothNumber } from "@/components/motion/count-up";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { calculator } from "@/lib/copy";
import { cn, gbp } from "@/lib/utils";
import { waLink, waLinkProps, waMessages } from "@/lib/whatsapp";

const JOB_VALUES = [40, 60, 80, 100, 120, 150, 180, 220, 250, 300, 400, 500, 750, 1000, 1500, 2000, 2500];
const WEEKS_PER_MONTH = 4.33;
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const whole = (n: number) => Math.round(n).toLocaleString("en-GB");

export function Results() {
  const [missed, setMissed] = useState(8);
  const [valueIdx, setValueIdx] = useState(JOB_VALUES.indexOf(180));
  const [close, setClose] = useState(35);

  const value = JOB_VALUES[valueIdx] ?? 180;
  const bookings = useMemo(() => missed * WEEKS_PER_MONTH * (close / 100), [missed, close]);
  const monthly = bookings * value;
  const shownMonth = useSmoothNumber(monthly, gbp);
  const shownYear = useSmoothNumber(monthly * 12, gbp);
  const shownBookings = useSmoothNumber(bookings, whole);

  return (
    <section id="results" className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-0 -z-10 h-[600px] w-[600px]"
        style={{ background: "radial-gradient(closest-side, rgb(139 152 255 / 0.08), transparent)" }}
      />
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-20">
        <Reveal>
          <Eyebrow n="06">Examples</Eyebrow>
          <h2 className="mt-4 max-w-[11ch] font-display text-[clamp(2.75rem,12vw,5.5rem)]">{calculator.headline}</h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{calculator.lede}</p>
          <ul className="mt-8 grid max-w-md gap-3 text-sm text-muted">
            <li className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-stone" />
              Only counts enquiries you already lose — not new demand.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-stone" />
              Uses your close rate, not an assumed one.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-stone" />
              {WEEKS_PER_MONTH} weeks per month, 12 months per year.
            </li>
          </ul>
        </Reveal>

        <Reveal delay={80}>
          <div className="glow-border rounded-xl bg-surface p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
              <p className="font-mono text-xs tracking-[0.14em] whitespace-nowrap text-muted uppercase">Growth dashboard</p>
              <span className="rounded-full bg-stone/10 px-2.5 py-1 whitespace-nowrap font-mono text-[0.7rem] tracking-[0.12em] text-stone uppercase shadow-[0_0_0_1px_rgb(205_255_0/0.3)]">
                {calculator.label}
              </span>
            </div>

            <div className="mt-6 divide-y divide-line border-y border-line">
              <Stepper
                label="Missed enquiries / week"
                display={String(missed)}
                onDec={() => setMissed((v) => Math.max(1, v - 1))}
                onInc={() => setMissed((v) => Math.min(40, v + 1))}
                canDec={missed > 1}
                canInc={missed < 40}
              />
              <Stepper
                label="Average job value"
                display={gbp(value)}
                onDec={() => setValueIdx((i) => Math.max(0, i - 1))}
                onInc={() => setValueIdx((i) => Math.min(JOB_VALUES.length - 1, i + 1))}
                canDec={valueIdx > 0}
                canInc={valueIdx < JOB_VALUES.length - 1}
              />
              <Stepper
                label="Your close rate"
                display={`${close}%`}
                onDec={() => setClose((v) => Math.max(5, v - 5))}
                onInc={() => setClose((v) => Math.min(90, v + 5))}
                canDec={close > 5}
                canInc={close < 90}
              />
            </div>

            <div className="@container mt-7" aria-live="polite">
              <p className="eyebrow">Recovered opportunity</p>
              <p className="mt-2 font-display text-[clamp(3rem,22cqw,5.5rem)] leading-[0.9] font-extrabold tracking-tight whitespace-nowrap tabular-nums">
                <motion.span>{shownMonth}</motion.span>
              </p>
              <p className="mt-3 font-mono text-xs tracking-[0.14em] text-muted uppercase">Per month</p>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
                <div className="min-w-0">
                  <p className="truncate font-display text-[clamp(1.5rem,10cqw,2.25rem)] leading-none font-extrabold tabular-nums">
                    <motion.span>{shownYear}</motion.span>
                  </p>
                  <p className="mt-1.5 font-mono text-[0.7rem] tracking-[0.14em] text-muted uppercase">Annualised</p>
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-[clamp(1.5rem,10cqw,2.25rem)] leading-none font-extrabold tabular-nums">
                    ≈ <motion.span>{shownBookings}</motion.span>
                  </p>
                  <p className="mt-1.5 font-mono text-[0.7rem] tracking-[0.14em] text-muted uppercase">Bookings / month</p>
                </div>
              </div>

              <Cumulative />
            </div>

            <a
              href={waLink(
                waMessages.projection({ missed, value: gbp(value), close, monthly: gbp(monthly), annual: gbp(monthly * 12) }),
              )}
              {...waLinkProps}
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-md bg-[#25D366] px-4 text-sm font-semibold text-stone-fg transition-colors hover:bg-[#1fbe5b]"
            >
              <WhatsAppIcon className="size-5" />
              Send these numbers on WhatsApp
            </a>

            <p className="mt-5 text-xs leading-relaxed text-subtle">{calculator.disclaimer}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stepper({
  label,
  display,
  onDec,
  onInc,
  canDec,
  canInc,
}: {
  label: string;
  display: string;
  onDec: () => void;
  onInc: () => void;
  canDec: boolean;
  canInc: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <span className="text-sm text-muted">{label}</span>
      <div className="flex items-center gap-1">
        <StepButton label={`Decrease ${label.toLowerCase()}`} onClick={onDec} disabled={!canDec}>
          <Minus className="size-4" />
        </StepButton>
        <output className="min-w-[4.5rem] text-center font-display text-2xl font-extrabold tabular-nums">{display}</output>
        <StepButton label={`Increase ${label.toLowerCase()}`} onClick={onInc} disabled={!canInc}>
          <Plus className="size-4" />
        </StepButton>
      </div>
    </div>
  );
}

function StepButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid size-11 place-items-center rounded-full text-fg shadow-[var(--shadow-border)] transition-[background-color,color,transform] duration-150 hover:bg-raised active:scale-95",
        "disabled:cursor-not-allowed disabled:opacity-30",
      )}
    >
      {children}
    </button>
  );
}

/** Twelve bars that build up month by month — the shape of recovered revenue over a year. */
function Cumulative() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="mt-6">
      <div className="flex h-20 items-end gap-1.5" aria-hidden="true">
        {MONTHS.map((m, i) => (
          <div key={i} className="flex h-full flex-1 flex-col justify-end">
            <motion.div
              className="origin-bottom rounded-t-sm bg-gradient-to-t from-stone/25 to-stone"
              style={{ height: `${((i + 1) / 12) * 100}%` }}
              initial={reduceMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-1.5 font-mono text-[0.7rem] text-subtle" aria-hidden="true">
        {MONTHS.map((m, i) => (
          <span key={i} className="flex-1 text-center">
            {m}
          </span>
        ))}
      </div>
      <p className="sr-only">Recovered revenue accumulates evenly across twelve months.</p>
    </div>
  );
}
