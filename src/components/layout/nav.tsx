import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { bookLabel, nav } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { waLink, waLinkProps, waMessages } from "@/lib/whatsapp";

export function SiteNav({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Rotating a tablet past the breakpoint would otherwise leave the body locked.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 transition-[background-color,box-shadow] duration-300",
        scrolled || open
          ? "bg-bg/80 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8",
          scrolled && !open ? "h-14 sm:h-16" : "h-16 sm:h-20",
        )}
      >
        <a
          href="#top"
          className="relative z-10 inline-flex min-h-11 items-center"
          aria-label="DIGIT AI home"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </a>
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group inline-flex min-h-11 min-w-11 items-center justify-center text-sm font-medium text-muted hover:text-fg"
            >
              <span className="nav-link">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={waLink(waMessages.general)}
            {...waLinkProps}
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
            className="grid size-11 place-items-center rounded-md text-[#25D366] shadow-[var(--shadow-border)] transition-colors hover:bg-raised"
          >
            <WhatsAppIcon />
          </a>
          <Magnetic>
            <Button size="sm" className="h-11 px-4 font-mono text-[0.7rem] tracking-[0.12em] uppercase" onClick={onBook}>
              {bookLabel}
            </Button>
          </Magnetic>
        </div>
        <button
          type="button"
          className="relative z-10 -mr-2 grid size-11 place-items-center rounded-md text-fg lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open ? (
        <div
          id="mobile-menu"
          className="menu-enter flex h-[calc(100svh-4rem)] flex-col overflow-y-auto border-t border-line bg-bg px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:h-[calc(100svh-5rem)] sm:px-8 lg:hidden"
        >
          <nav className="flex flex-col divide-y divide-line" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex min-h-14 items-center font-display text-3xl font-extrabold uppercase text-fg active:text-stone"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-2 pt-8">
            <Button
              size="lg"
              variant="ghost"
              className="w-full"
              asChild
            >
              <a href={waLink(waMessages.general)} {...waLinkProps} onClick={() => setOpen(false)}>
                <WhatsAppIcon className="text-[#25D366]" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                setOpen(false);
                onBook();
              }}
            >
              {bookLabel}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
