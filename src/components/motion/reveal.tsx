import { useRef, type ReactNode } from "react";
import { motion, useInView as useInViewMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { transition } from "@/lib/animations";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "section";
}) {
  const ref = useRef<any>(null);
  const isInView = useInViewMotion(ref, {
    once: true,
    amount: "some",
    margin: "0px 0px -60px 0px"
  });

  // Map tag to motion component
  const MotionTag =
    Tag === "li" ? (motion.li as any) :
    Tag === "article" ? (motion.article as any) :
    Tag === "section" ? (motion.section as any) :
    motion.div;

  return (
    <MotionTag
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ ...transition.normal, delay: delay / 1000 }}
    >
      {children}
    </MotionTag>
  );
}
