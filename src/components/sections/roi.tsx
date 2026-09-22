import { useMemo, useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { CountUp, useSmoothNumber } from "@/components/motion/count-up";
import { gbp } from "@/lib/utils";

export function Roi() {
  const [missed, setMissed] = useState(8);
  const [value, setValue] = useState(180);
  const [close, setClose] = useState(35);

  const monthly = useMemo(
    () => missed * 4.33 * value * (close / 100),
    [missed, value, close],
  );
  const yearly = monthly * 12;
  const shownMonth = useSmoothNumber(monthly);
  const shownYear = useSmoothNumber(yearly);

  return (
    <section id="roi" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <div className="grid items-start gap-12 md:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-subtle">
            05 / The leak
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            What those missed enquiries are actually worth.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Conservative on purpose. This is only the jobs you already know you lose — not the ones
            who never bothered to leave a voicemail.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
            <Field
              label="Missed enquiries a week"
              value={`${missed}`}
            >
              <input
                type="range"
                min={1}
                max={30}
                value={missed}
                onChange={(e) => setMissed(Number(e.target.value))}
                className="w-full accent-stone"
                aria-label="Missed enquiries a week"
              />
            </Field>
            <Field
              label="Average job value"
              value={gbp(value)}
            >
              <input
                type="range"
                min={40}
                max={2500}
                step={10}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full accent-stone"
                aria-label="Average job value"
              />
            </Field>
            <Field
              label="Close rate"
              value={`${close}%`}
            >
              <input
                type="range"
                min={10}
                max={80}
                value={close}
                onChange={(e) => setClose(Number(e.target.value))}
                className="w-full accent-stone"
                aria-label="Close rate"
              />
            </Field>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                  Recovered / month
                </p>
                <p className="mt-2 font-display text-3xl font-extrabold tracking-tight tabular-nums sm:text-4xl">
                  {gbp(shownMonth)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                  Recovered / year
                </p>
                <p className="mt-2 font-display text-3xl font-extrabold tracking-tight tabular-nums sm:text-4xl">
                  {gbp(shownYear)}
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-subtle">
              Aesthetics Beyond was{" "}
              <CountUp value={40} prefix="+" suffix="%" duration={900} className="text-muted" />{" "}
              consultations. Premium Roofing recovered{" "}
              <span className="text-muted">£2,500</span> in month one. Downtown saved{" "}
              <span className="text-muted">2 hrs</span> a day.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <label className="mb-6 block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-fg">{label}</span>
        <span className="font-display text-lg font-bold tabular-nums tracking-tight">{value}</span>
      </span>
      <span className="mt-3 block">{children}</span>
    </label>
  );
}
