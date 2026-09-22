import { useRef, type ReactNode } from "react";
import { motion, useMousePosition, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  max = 4.5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, (val) => {
    if (!ref.current || reduceMotion) return 0;
    const rect = ref.current.getBoundingClientRect();
    const py = (val - rect.top) / rect.height;
    return (0.5 - py) * max;
  });

  const rotateY = useTransform(mouseX, (val) => {
    if (!ref.current || reduceMotion) return 0;
    const rect = ref.current.getBoundingClientRect();
    const px = (val - rect.left) / rect.width;
    return (px - 0.5) * max;
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    // Check if pointer is coarse (touch device)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        perspective: 900,
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
