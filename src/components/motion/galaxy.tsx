import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Deep-space starfield + AI network, drawn on one 2D canvas.
 *
 * Cheap by construction: point counts scale with the canvas area (so phones draw far
 * fewer), device-pixel-ratio is capped, the loop only runs while the canvas is on screen
 * and the tab is visible, and reduced-motion users get a single static frame.
 */

type Variant = "hero" | "ambient" | "quiet";

const CONFIG: Record<
  Variant,
  { starArea: number; maxStars: number; nodeArea: number; maxNodes: number; link: number; packets: number; parallax: number }
> = {
  hero: { starArea: 2400, maxStars: 280, nodeArea: 24000, maxNodes: 44, link: 150, packets: 6, parallax: 28 },
  ambient: { starArea: 3800, maxStars: 170, nodeArea: 38000, maxNodes: 24, link: 135, packets: 3, parallax: 16 },
  quiet: { starArea: 5200, maxStars: 110, nodeArea: 0, maxNodes: 0, link: 0, packets: 0, parallax: 10 },
};

const TINTS = ["244,245,247", "205,255,0", "139,152,255"] as const;

type Star = { x: number; y: number; z: number; r: number; phase: number; speed: number; tint: number };
type Node = { x: number; y: number; vx: number; vy: number; r: number; phase: number };
type Packet = { a: number; b: number; t: number; speed: number };

export function Galaxy({ variant = "ambient", className }: { variant?: Variant; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cfg = CONFIG[variant];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let raf = 0;
    let last = 0;
    let inView = false;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function seed() {
      const area = w * h;
      const starCount = Math.min(cfg.maxStars, Math.round(area / cfg.starArea));
      stars = Array.from({ length: starCount }, () => {
        const z = Math.random() ** 1.7; // most stars far away, a few close
        const roll = Math.random();
        return {
          x: rand(0, w),
          y: rand(0, h),
          z,
          r: 0.35 + z * 1.35,
          phase: rand(0, Math.PI * 2),
          speed: rand(0.35, 1.3),
          tint: roll < 0.1 ? 1 : roll < 0.2 ? 2 : 0,
        };
      });
      const nodeCount = cfg.nodeArea ? Math.min(cfg.maxNodes, Math.round(area / cfg.nodeArea)) : 0;
      nodes = Array.from({ length: nodeCount }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-1, 1) * 0.012,
        vy: rand(-1, 1) * 0.012,
        r: rand(1, 2.1),
        phase: rand(0, Math.PI * 2),
      }));
      packets = [];
    }

    function linked(a: Node, b: Node) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return dx * dx + dy * dy < cfg.link * cfg.link;
    }

    function spawnPacket(from?: number) {
      for (let tries = 0; tries < 14; tries++) {
        const a = from ?? Math.floor(Math.random() * nodes.length);
        const b = Math.floor(Math.random() * nodes.length);
        if (a === b || !nodes[a] || !nodes[b] || !linked(nodes[a], nodes[b])) continue;
        packets.push({ a, b, t: 0, speed: rand(0.00035, 0.0007) });
        return;
      }
    }

    function draw(now: number, dt: number) {
      ctx!.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      const t = now / 1000;

      // Stars: slow leftward drift, depth parallax, gentle twinkle.
      for (const s of stars) {
        s.x -= (2 + 9 * s.z) * (dt / 1000);
        if (s.x < -2) s.x = w + 2;
        const x = s.x + pointer.x * cfg.parallax * s.z;
        const y = s.y + pointer.y * cfg.parallax * s.z;
        const alpha = (0.18 + 0.62 * s.z) * (0.62 + 0.38 * Math.sin(t * s.speed + s.phase));
        ctx!.fillStyle = `rgba(${TINTS[s.tint]},${alpha.toFixed(3)})`;
        if (s.r < 1.1) {
          ctx!.fillRect(x, y, s.r, s.r);
        } else {
          ctx!.beginPath();
          ctx!.arc(x, y, s.r * 0.6, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      if (!nodes.length) return;

      // Network: nodes drift and bounce; nearby nodes are linked by faint lines.
      const ox = pointer.x * cfg.parallax * 0.6;
      const oy = pointer.y * cfg.parallax * 0.6;
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > cfg.link * cfg.link) continue;
          const alpha = (1 - Math.sqrt(d2) / cfg.link) * 0.2;
          ctx!.strokeStyle = `rgba(160,172,255,${alpha.toFixed(3)})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x + ox, a.y + oy);
          ctx!.lineTo(b.x + ox, b.y + oy);
          ctx!.stroke();
        }
      }
      for (const n of nodes) {
        const glow = 0.55 + 0.45 * Math.sin(t * 0.9 + n.phase);
        ctx!.fillStyle = `rgba(205,255,0,${(0.08 * glow).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(n.x + ox, n.y + oy, n.r * 4, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = `rgba(222,255,120,${(0.55 + 0.35 * glow).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(n.x + ox, n.y + oy, n.r * 0.85, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Data packets travelling along links, hopping on to the next node when they arrive.
      while (packets.length < cfg.packets) spawnPacket();
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]!;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b || !linked(a, b)) {
          packets.splice(i, 1);
          continue;
        }
        p.t += p.speed * dt;
        if (p.t >= 1) {
          packets.splice(i, 1);
          if (Math.random() < 0.7) spawnPacket(p.b);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t + ox;
        const y = a.y + (b.y - a.y) * p.t + oy;
        ctx!.fillStyle = "rgba(205,255,0,0.16)";
        ctx!.beginPath();
        ctx!.arc(x, y, 5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = "rgba(240,255,190,0.95)";
        ctx!.beginPath();
        ctx!.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop(now: number) {
      const dt = Math.min(48, now - last || 16);
      last = now;
      draw(now, dt);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (raf || reduce || !inView || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, w < 768 ? 1.5 : 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(performance.now(), 0); // paint immediately so there's never a blank frame
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
      pointer.ty = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const io = new IntersectionObserver(([entry]) => {
      inView = !!entry?.isIntersecting;
      if (inView) start();
      else stop();
    });
    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    });

    resize();
    io.observe(canvas);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    if (finePointer && !reduce) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      stop();
      cancelAnimationFrame(resizeRaf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [variant]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    />
  );
}
