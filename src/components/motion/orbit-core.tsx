import { hero } from "@/lib/copy";

/**
 * The hero's "AI core": concentric orbits with nodes, data streams flowing inward from the
 * growth stages. Pure SVG + CSS transforms, so it costs almost nothing to animate.
 */
export function OrbitCore() {
  const labels = [
    { text: hero.steps[0], x: 6, y: 18 },
    { text: hero.steps[1], x: 78, y: 10 },
    { text: hero.steps[4], x: 86, y: 70 },
    { text: hero.steps[5], x: 10, y: 80 },
  ];

  return (
    <div className="relative aspect-square w-full" aria-hidden="true">
      <svg viewBox="0 0 600 600" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <radialGradient id="core-glow">
            <stop offset="0%" stopColor="#cdff00" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#cdff00" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#cdff00" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ring-fade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4f5f7" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#8b98ff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#f4f5f7" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <circle cx="300" cy="300" r="170" fill="url(#core-glow)" />

        {/* Data streams from each stage label into the core */}
        {labels.map((l) => (
          <line
            key={l.text}
            x1={(l.x / 100) * 600}
            y1={(l.y / 100) * 600}
            x2="300"
            y2="300"
            stroke="#cdff00"
            strokeOpacity="0.35"
            strokeWidth="1"
            className="dash-flow"
          />
        ))}

        <circle cx="300" cy="300" r="120" fill="none" stroke="url(#ring-fade)" />
        <circle cx="300" cy="300" r="190" fill="none" stroke="url(#ring-fade)" strokeDasharray="2 6" />
        <circle cx="300" cy="300" r="262" fill="none" stroke="url(#ring-fade)" />

        <g className="orbit-spin">
          <circle cx="300" cy="300" r="120" fill="none" stroke="transparent" />
          <circle cx="420" cy="300" r="4" fill="#cdff00" />
          <circle cx="180" cy="300" r="2.5" fill="#f4f5f7" fillOpacity="0.7" />
        </g>
        <g className="orbit-spin-rev">
          <circle cx="300" cy="300" r="190" fill="none" stroke="transparent" />
          <circle cx="300" cy="110" r="3.5" fill="#8b98ff" />
          <circle cx="490" cy="300" r="2" fill="#f4f5f7" fillOpacity="0.6" />
          <circle cx="166" cy="434" r="3" fill="#cdff00" fillOpacity="0.8" />
        </g>
        <g className="orbit-spin">
          <circle cx="300" cy="300" r="262" fill="none" stroke="transparent" />
          <circle cx="300" cy="562" r="3" fill="#f4f5f7" fillOpacity="0.7" />
          <circle cx="38" cy="300" r="4.5" fill="#cdff00" fillOpacity="0.9" />
        </g>

        {/* Core: the DIGIT mark */}
        <g transform="translate(258 258) scale(3)">
          <rect x="1" y="1" width="26" height="26" rx="7" fill="#cdff00" />
          <path
            d="M8.6 8.2h7.4c3.2 0 5.4 1.9 5.4 5 0 3.1-2.2 5.1-5.4 5.1h-4.1V19.8H8.6V8.2zm3.3 2.55v4.9h3.8c1.55 0 2.55-1 2.55-2.45s-1-2.45-2.55-2.45h-3.8z"
            fill="#05060a"
          />
        </g>
      </svg>

      {labels.map((l) => (
        <span
          key={l.text}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg/80 px-3 py-1.5 font-mono text-[0.7rem] font-medium tracking-[0.14em] text-fg uppercase shadow-[var(--shadow-border)] backdrop-blur-sm"
          style={{ left: `${l.x}%`, top: `${l.y}%` }}
        >
          <span className="mr-2 inline-block size-1.5 rounded-full bg-stone align-middle" />
          {l.text}
        </span>
      ))}
    </div>
  );
}
