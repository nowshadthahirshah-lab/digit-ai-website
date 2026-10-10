import { ArrowRight, CalendarCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { Galaxy } from "@/components/motion/galaxy";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { bookingLink, bookLabel, contact, cta } from "@/lib/copy";
import { waLink, waLinkProps, waMessages } from "@/lib/whatsapp";

export function FinalCta({ onBook }: { onBook: () => void }) {
  return (
    <section id="contact" className="relative isolate overflow-hidden">
      <Galaxy variant="ambient" className="-z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%]"
        style={{ background: "radial-gradient(60% 80% at 50% 100%, rgb(205 255 0 / 0.14), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 md:py-36">
        <Reveal>
          <Eyebrow className="justify-center">{cta.eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-[12ch] font-display text-[clamp(3rem,13vw,6.5rem)]">{cta.headline}</h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted">{cta.lede}</p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <Button size="lg" className="btn-glow w-full sm:w-auto" onClick={onBook}>
                {bookLabel}
                <ArrowRight className="size-4" />
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Button size="lg" variant="ghost" className="w-full bg-bg/40 backdrop-blur-sm sm:w-auto" asChild>
                <a href={waLink(waMessages.audit)} {...waLinkProps}>
                  <WhatsAppIcon className="text-[#25D366]" />
                  WhatsApp {contact.whatsappDisplay}
                </a>
              </Button>
            </Magnetic>
          </div>
          {bookingLink.url ? (
            <a
              href={bookingLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
            >
              <CalendarCheck className="size-4" />
              {bookingLink.label}
            </a>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
