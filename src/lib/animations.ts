/**
 * Centralized Framer Motion animation presets and utilities
 * Ensures consistent easing, timing, and animation behavior across the site
 */

import { useReducedMotion } from "framer-motion";

// Easing curves
export const easing = {
  // Primary easing: smooth, professional
  outQuart: [0.22, 1, 0.36, 1] as const,
  // Spring for interactive elements
  spring: { type: "spring", stiffness: 300, damping: 30 } as const,
  // Slow spring for smooth, deliberate motion
  slowSpring: { type: "spring", stiffness: 100, damping: 20 } as const,
};

// Standard transition timings
export const transition = {
  fast: { duration: 0.3, ease: easing.outQuart },
  normal: { duration: 0.5, ease: easing.outQuart },
  slow: { duration: 0.8, ease: easing.outQuart },
  verySlow: { duration: 1.2, ease: easing.outQuart },
};

// Scroll reveal animation: fade in + slide up
export const revealAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: transition.normal,
};

// Staggered container for child animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Individual child animation for staggered containers
export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.normal,
  },
};

// Hero entrance animation
export const heroEntranceAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: transition.verySlow,
};

// Count-up animation for statistics
export const countUpVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: transition.fast,
};

// Button hover effect
export const buttonHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

// Card tilt effect on mouse move
export const cardTiltVariants = {
  initial: { rotateX: 0, rotateY: 0 },
  animate: (custom: { rotateX: number; rotateY: number }) => ({
    rotateX: custom.rotateX,
    rotateY: custom.rotateY,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  }),
};

// Navigation link underline draw-in
export const navUnderlineVariants = {
  initial: { scaleX: 0 },
  whileHover: { scaleX: 1 },
  transition: transition.fast,
};

// Micro-interaction: success checkmark
export const checkmarkVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 400, damping: 15 },
};

// Page load entrance for hero
export const pageLoadAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: easing.outQuart, delay: 0.2 },
};

// Ken Burns zoom for video backgrounds
export const kenBurnsAnimation = {
  initial: { scale: 1 },
  animate: { scale: 1.07 },
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "linear",
  },
};

// Animated transition for dialog/modal
export const dialogEnterVariants = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 10 },
  transition: transition.fast,
};

// Slide-in from right for time slot confirmation
export const slideInFromRightVariants = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
  transition: transition.normal,
};

// Smooth number animation helper
export const numberAnimationVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: transition.fast,
};

// Hook to respect user's motion preferences
export function useAnimationSettings() {
  const reduceMotion = useReducedMotion();

  /**
   * Apply animation variants while respecting prefers-reduced-motion
   * If motion is reduced, returns initial state without animation
   */
  const applyMotionSafety = (variants: any) => {
    if (reduceMotion) {
      return {
        initial: variants.initial,
        animate: variants.initial, // No animation, stay at initial state
        transition: { duration: 0 }, // Instant
      };
    }
    return variants;
  };

  return { reduceMotion, applyMotionSafety };
}

// Reusable animation props object for common scroll-triggered reveals
export const getRevealProps = (reduce: boolean = false) => ({
  initial: reduce ? { opacity: 1 } : { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: reduce ? { duration: 0 } : transition.normal,
});
