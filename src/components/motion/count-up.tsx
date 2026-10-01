import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.1,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: "some" });
  const reduceMotion = useReducedMotion();

  // Starts at the final value so the server-rendered HTML carries the real number.
  const motionValue = useMotionValue(value);
  const display = useTransform(motionValue, (v) => {
    const rounded = Number.isInteger(value) ? Math.round(v) : Math.round(v * 100) / 100;
    return prefix === "£" ? rounded.toLocaleString("en-GB") : String(rounded);
  });

  useEffect(() => {
    if (reduceMotion) {
      motionValue.set(value);
      return;
    }
    if (!isInView) {
      motionValue.set(0);
      return;
    }
    const controls = animate(motionValue, value, { duration, ease: EASE });
    return () => controls.stop();
  }, [isInView, reduceMotion, value, duration, motionValue]);

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={isInView || reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}

/** Eases a changing number towards its target and returns it already formatted. */
export function useSmoothNumber(
  target: number,
  format: (n: number) => string = (n) => String(Math.round(n)),
  duration = 0.42,
) {
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(target);
  const display = useTransform(motionValue, format);

  useEffect(() => {
    if (reduceMotion) {
      motionValue.set(target);
      return;
    }
    const controls = animate(motionValue, target, { duration, ease: EASE });
    return () => controls.stop();
  }, [target, reduceMotion, duration, motionValue]);

  return display;
}
