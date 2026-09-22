import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: "some" });
  const reduceMotion = useReducedMotion();

  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (v) => {
    const rounded = Number.isInteger(value) ? Math.round(v) : Math.round(v * 100) / 100;
    return prefix === "£" ? rounded.toLocaleString("en-GB") : String(rounded);
  });

  // Trigger animation when in view
  if (isInView && !reduceMotion) {
    motionValue.set(value, {
      duration: duration,
      ease: [0.22, 1, 0.36, 1], // cubic-bezier easing
    });
  } else if (reduceMotion || !isInView) {
    motionValue.set(reduceMotion ? value : 0);
  }

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}

export function useSmoothNumber(target: number, duration = 0.42) {
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(reduceMotion ? target : 0);

  const display = useTransform(motionValue, (v) => {
    const rounded = Number.isInteger(target) ? Math.round(v) : Math.round(v * 100) / 100;
    return String(rounded);
  });

  // Animate to target when it changes
  if (!reduceMotion) {
    motionValue.set(target, {
      duration: duration,
      ease: [0.22, 1, 0.36, 1],
    });
  } else {
    motionValue.set(target);
  }

  return display;
}
