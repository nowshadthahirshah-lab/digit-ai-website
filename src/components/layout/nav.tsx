import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { nav } from "@/lib/copy";
import { cn } from "@/lib/utils";

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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 transition-[background-color,box-shadow] duration-200",
        scrolled || open
          ? "bg-bg/80 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        <a href="#top" className="relative z-10" aria-label="DIGIT home">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link text-sm font-medium text-muted hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Magnetic>
            <Button size="sm" onClick={onBook}>
              Book a slot
            </Button>
          </Magnetic>
        </div>
        <button
          type="button"
          className="relative z-10 grid size-11 place-items-center rounded-md text-fg md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-bg px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center text-base font-medium text-fg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button className="mt-5 w-full" onClick={() => { setOpen(false); onBook(); }}>
            Book a slot
          </Button>
        </div>
      ) : null}
    </header>
  );
}
