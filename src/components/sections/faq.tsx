import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { contact, faqs } from "@/lib/copy";
import { waLink, waLinkProps, waMessages } from "@/lib/whatsapp";

/** Turns the WhatsApp number inside an answer into a tap-to-chat link. */
function LinkWhatsApp({ text }: { text: string }) {
  const [before, after] = text.split(contact.whatsappDisplay);
  if (after === undefined) return <>{text}</>;
  return (
    <>
      {before}
      <a
        href={waLink(waMessages.general)}
        {...waLinkProps}
        className="font-medium whitespace-nowrap text-fg underline decoration-[#25D366] decoration-2 underline-offset-4 hover:text-[#25D366]"
      >
        {contact.whatsappDisplay}
      </a>
      {after}
    </>
  );
}

export function Faq() {
  return (
    <section id="faq" className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow n="09">FAQ</Eyebrow>
          <h2 className="mt-4 max-w-[11ch] font-display text-[clamp(2.75rem,12vw,5.5rem)]">Questions, answered.</h2>
        </Reveal>
        <Reveal delay={60}>
          <Accordion.Root type="single" collapsible className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <Accordion.Item key={f.q} value={f.q} className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left">
                    <span className="font-display text-xl leading-tight font-bold sm:text-2xl">{f.q}</span>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full shadow-[var(--shadow-border)] transition-colors group-data-[state=open]:bg-stone group-data-[state=open]:text-stone-fg">
                      <Plus className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-45" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden">
                  <p className="max-w-xl pb-6 text-base leading-relaxed text-muted">
                    <LinkWhatsApp text={f.a} />
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
