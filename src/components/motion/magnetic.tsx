import { useRef, type ReactNode } from "react";
import { motion, useMousePosition, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export function Magnetic({
  children,
  strength = 10,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useTransform(mouseX, (val) => {
    if (!ref.current || reduceMotion) return 0;
    const rect = ref.current.getBoundingClientRect();
    return ((val - rect.left) / rect.width - 0.5) * strength;
  });

  const y = useTransform(mouseY, (val) => {
    if (!ref.current || reduceMotion) return 0;
    const rect = ref.current.getBoundingClientRect();
    return ((val - rect.top) / rect.height - 0.5) * strength;
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
      className={`inline-flex ${className ?? ""}`}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
