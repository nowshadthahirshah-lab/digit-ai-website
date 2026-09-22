import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TIMES = [
  "09:00",
  "09:45",
  "10:30",
  "11:15",
  "13:30",
  "14:15",
  "15:00",
  "15:45",
  "16:30",
] as const;

function nextDays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (out.length < n) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

function bookedFor(day: Date) {
  const seed = day.getDate() + day.getMonth() * 3;
  return new Set(
    TIMES.filter((_, i) => (seed + i * 2) % 5 === 0 || (seed + i) % 7 === 1),
  );
}

function formatDay(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "short" });
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function formatLong(d: Date) {
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function LiveDiary() {
  const days = useMemo(() => nextDays(5), []);
  const [dayIdx, setDayIdx] = useState(1);
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const day = days[dayIdx] ?? days[0]!;
  const booked = useMemo(() => bookedFor(day), [day]);

  function pick(time: (typeof TIMES)[number]) {
    if (booked.has(time)) return;
    setSlot(time);
    setConfirmed(false);
  }

  function confirm() {
    setConfirmed(true);
  }

  function reset() {
    setSlot(null);
    setConfirmed(false);
  }

  return (
    <section id="diary" className="border-y border-line bg-surface">
      <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-12 px-5 py-24 sm:px-8 md:grid-cols-2 md:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-subtle">
            04 / Live diary
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            They pick a time. It’s in the book.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            This is a working slice of the diary we install — Aesthetics Beyond’s week, live. Try a
            slot. The confirmation is what your customer sees, not a “we’ll email you.”
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-xl bg-bg p-5 shadow-border sm:p-6 min-w-0 overflow-hidden">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                  Live diary
                </p>
                <p className="mt-1 font-display text-lg font-bold tracking-tight">
                  Aesthetics Beyond
                </p>
              </div>
              <p className="text-xs text-muted">Hydrafacial · 45 min</p>
            </div>

            <div className="mt-5 flex min-w-0 gap-2">
              {days.map((d, i) => (
                <button
                  key={d.toISOString()}
                  type="button"
                  onClick={() => {
                    setDayIdx(i);
                    setSlot(null);
                    setConfirmed(false);
                  }}
                  className={cn(
                    "flex min-w-0 flex-1 flex-col items-center rounded-md px-1 py-2 text-center transition-[background-color,color,transform] duration-150",
                    i === dayIdx
                      ? "bg-stone text-stone-fg"
                      : "bg-raised text-muted hover:text-fg",
                  )}
                >
                  <span className="text-xs font-medium">{formatDay(d)}</span>
                  <span className="font-display text-lg font-bold leading-tight">
                    {d.getDate()}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-3">
              {TIMES.map((t) => {
                const taken = booked.has(t);
                const on = slot === t;
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={taken}
                    onClick={() => pick(t)}
                    className={cn(
                      "h-11 rounded-sm text-sm font-medium tabular-nums transition-[background-color,color,transform] duration-150 active:scale-[0.96]",
                      taken && "cursor-not-allowed bg-raised text-subtle line-through",
                      !taken && !on && "bg-raised text-fg hover:bg-line-strong",
                      on && "bg-stone text-stone-fg",
                    )}
                  >
                    {taken ? "Booked" : t}
                  </button>
                );
              })}
            </div>

            <div className="relative mt-5 min-h-28 overflow-hidden rounded-md bg-raised px-4 py-4">
              {!slot ? (
                <p className="text-sm text-muted">
                  Choose a time for {formatDate(day)}. Taken slots stay grey — that’s a real diary,
                  not a form.
                </p>
              ) : confirmed ? (
                <div key={`${slot}-ok`} className="confirm-enter flex items-start gap-3">
                  <SuccessMark />
                  <div>
                    <p className="font-display text-base font-bold tracking-tight">
                      You’re in the book.
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {formatLong(day)} · {slot}. We’ll send a reminder the morning of.
                    </p>
                    <button
                      type="button"
                      className="mt-3 text-xs font-semibold text-stone hover:text-fg"
                      onClick={reset}
                    >
                      Book another
                    </button>
                  </div>
                </div>
              ) : (
                <div key={slot} className="confirm-enter flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-base font-bold tracking-tight">
                      Hold {slot} on {formatDate(day)}?
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      We’ll lock it for ten minutes while you confirm.
                    </p>
                  </div>
                  <Button size="sm" onClick={confirm}>
                    Confirm slot
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SuccessMark() {
  return (
    <svg viewBox="0 0 32 32" className="mt-0.5 size-8 shrink-0" aria-hidden="true">
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="check-ring is-on text-stone"
      />
      <path
        d="M9.5 16.4 13.8 20.5 22.5 11.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="check-draw is-on text-stone"
      />
    </svg>
  );
}
