import { capabilities } from "@/lib/copy";

export function Capabilities() {
  // Two copies so the -50% loop is seamless; the second is hidden from assistive tech.
  return (
    <section aria-label="Capabilities" className="relative border-y border-line bg-surface/60 py-5 backdrop-blur-sm">
      <div className="marquee overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 ? true : undefined}>
              {capabilities.map((c) => (
                <li key={c} className="flex items-center gap-6 px-6 font-mono text-xs tracking-[0.14em] whitespace-nowrap text-muted uppercase">
                  <span aria-hidden="true" className="size-1 rotate-45 bg-stone" />
                  {c}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
