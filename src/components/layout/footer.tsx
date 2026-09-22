import { Logo } from "@/components/brand/logo";
import { footer, nav, site } from "@/lib/copy";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{footer.note}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">On this page</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-muted hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">Studio</p>
          <a
            href={`mailto:${footer.email}`}
            className="mt-4 inline-block text-sm text-muted hover:text-fg"
          >
            {footer.email}
          </a>
          <p className="mt-2 text-sm text-subtle">Manchester · London · remote UK</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-subtle sm:px-8">
          <p>© {new Date().getFullYear()} {site.legal}</p>
          <p>Two slots a month. Built in 14 days.</p>
        </div>
      </div>
    </footer>
  );
}
