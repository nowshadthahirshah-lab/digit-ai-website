import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { faqs } from "@/lib/copy";

export function Faq() {
  return (
    <section id="faq" className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-subtle">08 / FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Before you book the call.
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <Accordion.Root type="single" collapsible className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <Accordion.Item key={f.q} value={f.q} className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between gap-4 py-5 text-left">
                    <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                      {f.q}
                    </span>
                    <Plus className="size-5 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-45" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
                  <p className="max-w-xl pb-5 text-sm leading-relaxed text-muted sm:text-base">
                    {f.a}
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
