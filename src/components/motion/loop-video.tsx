import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export function LoopVideo({
  src,
  poster,
  className,
  kenBurns = false,
}: {
  src: string;
  poster: string;
  className?: string;
  kenBurns?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { amount: "some" });

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-raised", className)}>
      <img
        src={poster}
        alt=""
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
        preload="metadata"
        aria-hidden="true"
        autoPlay={isInView}
        onPlay={() => {
          if (videoRef.current && isInView) {
            videoRef.current.play().catch(() => undefined);
          }
        }}
        onPause={() => {
          if (videoRef.current && !isInView) {
            videoRef.current.pause();
          }
        }}
        animate={
          kenBurns && isInView
            ? { scale: 1.12, opacity: 0.95 }
            : { scale: 1, opacity: 1 }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <source src={src} type="video/mp4" />
      </motion.video>
    </div>
  );
}
