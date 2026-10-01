import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LoopVideo({
  src,
  poster,
  className,
  kenBurns = false,
  priority = false,
}: {
  src: string;
  poster: string;
  className?: string;
  kenBurns?: boolean;
  /** Above-the-fold media: load the poster eagerly at high priority. */
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { amount: "some" });
  const reduceMotion = useReducedMotion();

  // Only decode while on screen; skip entirely for reduced motion or Data Saver,
  // where the poster image stands in for the clip.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const saveData =
      typeof navigator !== "undefined" &&
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (isInView && !reduceMotion && !saveData) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isInView, reduceMotion]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-raised", className)}>
      <img
        src={poster}
        alt=""
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={cn("absolute inset-0 size-full object-cover", kenBurns && "brightness-90")}
      />
      <motion.video
        ref={videoRef}
        className={cn(
          "motion-video absolute inset-0 size-full object-cover",
          kenBurns && "brightness-90",
        )}
        poster={poster}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        aria-hidden="true"
        animate={
          kenBurns && isInView && !reduceMotion
            ? { scale: 1.12, opacity: 0.95 }
            : { scale: 1, opacity: 1 }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          // Drift in and back out instead of snapping to scale 1 every 12s.
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <source src={src} type="video/mp4" />
      </motion.video>
    </div>
  );
}
